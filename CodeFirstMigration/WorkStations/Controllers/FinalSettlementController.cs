using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TravelManagement.Context;
using TravelManagement.Gateway;
using TravelManagement.Models;
using TravelManagement.Utilities;

namespace CodeFirstMigration.WorkStations.Controllers
{
    public class FinalSettlementController : Controller
    {
        [Route("a/finalSettlements")]

        //Function For EmployeeInformations Page - Session  *
        public ActionResult Index()
        {
            if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            {
                return Redirect("~/admin/sign_in");
            }
            if (!MySession.Current.NavList.Contains("finalSettlements"))
            {
                return Json(RequstStatus.Return(RequestStatusType.AccessDenied), JsonRequestBehavior.AllowGet);
            }
            return View("~/WorkStations/Views/FinalSettlement/Index.cshtml");
        }



        [HttpPost]
        public ActionResult ShowFinalSettlement(
                 int CompanyId,
                 int DepartmentId,
                 int DesignationId,
                 string TRFNoText,
                 string VisaRequisitionNo
                 )
        {
            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                FinalSettlementGateway finalSettlementGateway = new FinalSettlementGateway();

                var data = finalSettlementGateway.ShowFinalSettlement(
                                                 CompanyId,
                                                 DepartmentId,
                                                 DesignationId,
                                                 TRFNoText,
                                                 VisaRequisitionNo,
                                                 dBcontext);

                if (data == null)
                {
                    return Json(new { error = true, message = "Data Not Found." }, JsonRequestBehavior.AllowGet);
                }

                return Json(data);

            }
        }



        [HttpPost]
        public ActionResult AddFinalSettlement([Bind(Include = @"TRFNo, Cost, RemainingBalance, DisbursedAmount, Comments, 
                      Remarks, FinalSettlementsDetails")] FinalSettlement finalSettlement)
        {

            using (TravelManagementDBcontext dbContext = new TravelManagementDBcontext())
            {

                finalSettlement.InsertedBy = MySession.Current.UserNo;
                finalSettlement.UserNo = MySession.Current.UserNo;

                int TRFId = dbContext.BudgetFormTRFMasters
                    .Where(e => e.TRFNoText == finalSettlement.TRFNo)
                    .Select(e => e.Id)
                    .FirstOrDefault();

                finalSettlement.TRFMasterId = TRFId;




                using (var dbTransaction = dbContext.Database.BeginTransaction())
                {
                    try
                    {

                        FinalSettlementGateway finalSettlementGateway = new FinalSettlementGateway();

                        List<FinalSettlementsDetails> orderQuantities = finalSettlement.FinalSettlementsDetails;
                        finalSettlement.FinalSettlementsDetails = null;

                        finalSettlement.Id = finalSettlementGateway.AddFinalSettlement(finalSettlement, dbContext);

                        if (finalSettlement.Id <= 0)
                        {
                            throw new Exception("Information saving failed.");
                        }

                        foreach (FinalSettlementsDetails orderQuantity in orderQuantities)
                        {
                            orderQuantity.InsertedBy = MySession.Current.UserNo;
                            orderQuantity.FinalSettlementid = finalSettlement.Id;
                            orderQuantity.TRFNo = finalSettlement.TRFNo;


                            int rowAffected = finalSettlementGateway.AddFinalSettlementDetEntry(orderQuantity, dbContext);
                            if (rowAffected <= 0)
                            {
                                throw new Exception("Order Quantity information saving failed.");
                            }
                        }


                        //File Attachment

                        for (int i = 0; i < Request.Files.Count; i++)
                        {
                            HttpPostedFileBase file = Request.Files[i];
                            FinalSettlementFiles finalSettlementFiles = new FinalSettlementFiles
                            {
                                FileName = "Files",
                                UserNo = MySession.Current.UserNo,
                                FinalSettlementId = finalSettlement.Id
                            };

                            switch (Request.Files.AllKeys[i])
                            {
                                case "FilesFlight":
                                    finalSettlementFiles.FileType = "Flight";
                                    finalSettlementFiles = SaveOrderFileFlight(file, finalSettlementFiles);
                                    break;
                                case "FilesHotel":
                                    finalSettlementFiles.FileType = "Hotel";
                                    finalSettlementFiles = SaveOrderFileHotel(file, finalSettlementFiles);
                                    break;
                                case "FilesFood":
                                    finalSettlementFiles.FileType = "Food";
                                    finalSettlementFiles = SaveOrderFileFood(file, finalSettlementFiles);
                                    break;
                                case "FilesTransportation":
                                    finalSettlementFiles.FileType = "Transportation";
                                    finalSettlementFiles = SaveOrderFileTransportation(file, finalSettlementFiles);
                                    break;
                                case "FilesOthers":
                                    finalSettlementFiles.FileType = "Others";
                                    finalSettlementFiles = SaveOrderFileOther(file, finalSettlementFiles);
                                    break;
                                default:
                                    throw new Exception("Unknown file type.");
                            }

                            if (finalSettlementFiles == null || finalSettlementFiles.UserNo <= 0)
                            {
                                throw new Exception("File saving failed.");
                            }

                            int rowAffected = finalSettlementGateway.AddSettlementFiles(finalSettlementFiles, dbContext);
                            if (rowAffected <= 0)
                            {
                                throw new Exception("File information saving failed.");
                            }
                        }

                        //Email

                        var SupUserNo = dbContext.EnrollSuperVisors.Where(t => t.UserId == finalSettlement.UserNo).Select(s => s.SupervisorId).FirstOrDefault();
                        var SupEmail = dbContext.Users.Where(t => t.UserNo == SupUserNo).Select(s => s.Email).FirstOrDefault();

                        if (SupEmail == null)
                        {
                            return Json(new { error = true, message = "No Available Supervisor for the user. Email could not be sent." }, JsonRequestBehavior.AllowGet);
                        }

                        string userName = dbContext.Users.Where(t => t.UserNo == finalSettlement.UserNo).Select(s => s.FullName).FirstOrDefault();


                        int emailFlag = finalSettlementGateway.SendEmailFromUser(SupEmail, userName, finalSettlement, dbContext);

                        if (emailFlag <= 0)
                        {
                            throw new Exception("Email couldn't be sent.");
                        }

                        dbContext.SaveChanges();
                        dbTransaction.Commit();
                        return Json(new { error = false, message = "Saved successfully." }, JsonRequestBehavior.AllowGet);

                    }
                    catch (Exception ex)
                    {
                        dbTransaction.Rollback();
                        return Json(new { error = true, message = "Oops! Saving unsuccessful. Please try again later. " + ex.Message }, JsonRequestBehavior.AllowGet);

                    }
                }
            }
        }

        public FinalSettlementFiles SaveOrderFileOther(HttpPostedFileBase file, FinalSettlementFiles finalSettlementFiles)
        {
            try
            {
                BaseClassUtilitiesNonStatic baseClassUtilitiesNonStatic = new BaseClassUtilitiesNonStatic();

                //finalSettlementFiles.FileName = "File_" + baseClassUtilitiesNonStatic.RandomString(6) + Path.GetExtension(file.FileName);
                finalSettlementFiles.FileName = "File_" + Guid.NewGuid() + Path.GetExtension(file.FileName);
                string directoryPath = Server.MapPath("/Files/FinalSettlement/Other");
                if (!Directory.Exists(directoryPath))
                {
                    Directory.CreateDirectory(directoryPath);
                }
                string serverPath = Path.Combine(Server.MapPath("/Files/FinalSettlement/Other"), finalSettlementFiles.FileName);
                string location = "/Files/FinalSettlement/Other/" + finalSettlementFiles.FileName;
                finalSettlementFiles.location = location;
                bool fileExist = System.IO.File.Exists(serverPath);
                if (fileExist)
                {
                    throw new Exception("File duplicate");
                }
                file.SaveAs(serverPath);

                return finalSettlementFiles;

            }
            catch (Exception ex)
            {
                return null;
            }
        }


        public FinalSettlementFiles SaveOrderFileTransportation(HttpPostedFileBase file, FinalSettlementFiles finalSettlementFiles)
        {
            try
            {
                BaseClassUtilitiesNonStatic baseClassUtilitiesNonStatic = new BaseClassUtilitiesNonStatic();

                finalSettlementFiles.FileName = "File_" + Guid.NewGuid() + Path.GetExtension(file.FileName);
                //finalSettlementFiles.FileName = "File_" + baseClassUtilitiesNonStatic.RandomString(6) + Path.GetExtension(file.FileName);
                string directoryPath = Server.MapPath("/Files/FinalSettlement/Transportation");
                if (!Directory.Exists(directoryPath))
                {
                    Directory.CreateDirectory(directoryPath);
                }
                string serverPath = Path.Combine(Server.MapPath("/Files/FinalSettlement/Transportation"), finalSettlementFiles.FileName);
                string location = "/Files/FinalSettlement/Transportation/" + finalSettlementFiles.FileName;
                finalSettlementFiles.location = location;
                bool fileExist = System.IO.File.Exists(serverPath);
                if (fileExist)
                {
                    throw new Exception("File duplicate");
                }
                file.SaveAs(serverPath);

                return finalSettlementFiles;

            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public FinalSettlementFiles SaveOrderFileFood(HttpPostedFileBase file, FinalSettlementFiles finalSettlementFiles)
        {
            try
            {
                BaseClassUtilitiesNonStatic baseClassUtilitiesNonStatic = new BaseClassUtilitiesNonStatic();

                finalSettlementFiles.FileName = "File_" + Guid.NewGuid() + Path.GetExtension(file.FileName);
                //finalSettlementFiles.FileName = "File_" + baseClassUtilitiesNonStatic.RandomString(6) + Path.GetExtension(file.FileName);
                string directoryPath = Server.MapPath("/Files/FinalSettlement/Food");
                if (!Directory.Exists(directoryPath))
                {
                    Directory.CreateDirectory(directoryPath);
                }
                string serverPath = Path.Combine(Server.MapPath("/Files/FinalSettlement/Food"), finalSettlementFiles.FileName);
                string location = "/Files/FinalSettlement/Food/" + finalSettlementFiles.FileName;
                finalSettlementFiles.location = location;
                bool fileExist = System.IO.File.Exists(serverPath);
                if (fileExist)
                {
                    throw new Exception("File duplicate");
                }
                file.SaveAs(serverPath);

                return finalSettlementFiles;

            }
            catch (Exception ex)
            {
                return null;
            }
        }


        public FinalSettlementFiles SaveOrderFileHotel(HttpPostedFileBase file, FinalSettlementFiles finalSettlementFiles)
        {
            try
            {
                BaseClassUtilitiesNonStatic baseClassUtilitiesNonStatic = new BaseClassUtilitiesNonStatic();

            finalSettlementFiles.FileName = "File_" + Guid.NewGuid() + Path.GetExtension(file.FileName);
            //finalSettlementFiles.FileName = "File_" + baseClassUtilitiesNonStatic.RandomString(6) + Path.GetExtension(file.FileName);
            string directoryPath = Server.MapPath("/Files/FinalSettlement/Hotel");
                if (!Directory.Exists(directoryPath))
                {
                    Directory.CreateDirectory(directoryPath);
                }
                string serverPath = Path.Combine(Server.MapPath("/Files/FinalSettlement/Hotel"), finalSettlementFiles.FileName);
                string location = "/Files/FinalSettlement/Hotel/" + finalSettlementFiles.FileName;
                finalSettlementFiles.location = location;
                bool fileExist = System.IO.File.Exists(serverPath);
                if (fileExist)
                {
                    throw new Exception("File duplicate");
                }
                file.SaveAs(serverPath);

                return finalSettlementFiles;

            }
            catch (Exception ex)
            {
                return null;
            }
        }


        public FinalSettlementFiles SaveOrderFileFlight(HttpPostedFileBase file, FinalSettlementFiles finalSettlementFiles)
        {
            try
            {
                BaseClassUtilitiesNonStatic baseClassUtilitiesNonStatic = new BaseClassUtilitiesNonStatic();

                finalSettlementFiles.FileName = "File_" + Guid.NewGuid() + Path.GetExtension(file.FileName);
                //finalSettlementFiles.FileName = "File_" + baseClassUtilitiesNonStatic.RandomString(6) + Path.GetExtension(file.FileName);
                string directoryPath = Server.MapPath("/Files/FinalSettlement/Flight");
                if (!Directory.Exists(directoryPath))
                {
                    Directory.CreateDirectory(directoryPath);
                }
                string serverPath = Path.Combine(Server.MapPath("/Files/FinalSettlement/Flight"), finalSettlementFiles.FileName);
                string location = "/Files/FinalSettlement/Flight/" + finalSettlementFiles.FileName;
                finalSettlementFiles.location = location;
                bool fileExist = System.IO.File.Exists(serverPath);
                if (fileExist)
                {
                    throw new Exception("File duplicate");
                }
                file.SaveAs(serverPath);

                return finalSettlementFiles;

            }
            catch (Exception ex)
            {
                return null;
            }
        }



        public FinalSettlementFiles SaveOrderFile(HttpPostedFileBase file, FinalSettlementFiles finalSettlementFiles)
        {
            try
            {
                BaseClassUtilitiesNonStatic baseClassUtilitiesNonStatic = new BaseClassUtilitiesNonStatic();

                finalSettlementFiles.FileName = "File_" + Guid.NewGuid() + Path.GetExtension(file.FileName);
                //finalSettlementFiles.FileName = "File_" + baseClassUtilitiesNonStatic.RandomString(6) + Path.GetExtension(file.FileName);
                string directoryPath = Server.MapPath("/Files/FinalSettlement");
                if (!Directory.Exists(directoryPath))
                {
                    Directory.CreateDirectory(directoryPath);
                }
                string serverPath = Path.Combine(Server.MapPath("/Files/FinalSettlement"), finalSettlementFiles.FileName);
                string location = "/Files/FinalSettlement/" + finalSettlementFiles.FileName;
                finalSettlementFiles.location = location;
                bool fileExist = System.IO.File.Exists(serverPath);
                if (fileExist)
                {
                    throw new Exception("File duplicate");
                }
                file.SaveAs(serverPath);

                return finalSettlementFiles;

            }
            catch (Exception ex)
            {
                return null;
            }
        }



        [HttpPost]
        public ActionResult EditFinalSettlement([Bind(Include = "Id, UserNo, " +
            " TRFMasterId, TRFNo, Cost, RemainingBalance, " +
            "DisbursedAmount, Comments, Remarks, FSApprovalStatusAudit, ApprovedByAudit, RejectedByAudit, FinalSettlementsDetails ")]  FinalSettlement finalSettlement)
        {

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {

                finalSettlement.UpdatedBy = MySession.Current.UserNo;
                finalSettlement.FSApprovalStatusAudit = ApprovalStatus.IsPending;
                finalSettlement.ApprovedByAudit = null;
                finalSettlement.RejectedByAudit = null;


                using (var dbTransaction = dBcontext.Database.BeginTransaction())
                {
                    try
                    {
                        FinalSettlementGateway finalSettlementGateway = new FinalSettlementGateway();

                        List<FinalSettlementsDetails> orderQuantities = finalSettlement.FinalSettlementsDetails;
                        finalSettlement.FinalSettlementsDetails = null;

                        finalSettlement.Id = finalSettlementGateway.UpdateFinalSettlement(finalSettlement, dBcontext);
                        finalSettlement.ApprovalStatusSup = ApprovalStatus.IsPending;
                        finalSettlement.RejectedBySup = null;
                        finalSettlement.ApprovedBySup = null;
                        finalSettlement.CommentsSupervisor = null;


                        var details = dBcontext.FinalSettlementsDetails.Where(x => x.FinalSettlementid == finalSettlement.Id).ToList();
                        dBcontext.FinalSettlementsDetails.RemoveRange(details); //details delete
                        int rowAffected2 = dBcontext.SaveChanges();
                        if (rowAffected2 < 1)
                        {
                            throw new Exception("Information updating failed.");
                        }

                        foreach (FinalSettlementsDetails orderQuantity in orderQuantities)
                        {
                            orderQuantity.InsertedBy = MySession.Current.UserNo;
                            orderQuantity.FinalSettlementid = finalSettlement.Id;
                            orderQuantity.TRFNo = finalSettlement.TRFNo;

                            int rowAffected = finalSettlementGateway.UpdateFinalSettlementDetEntry(orderQuantity, dBcontext);
                            if (rowAffected <= 0)
                            {
                                throw new Exception("Order Quantity information saving failed.");
                            }
                        }

                        if (Request.Files.Count > 0)
                        {
                            HandleFileAttachments(Request.Files, finalSettlement.Id, MySession.Current.UserNo, dBcontext);
                        }


                        //Email

                        var SupUserNo = dBcontext.EnrollSuperVisors.Where(t => t.UserId == finalSettlement.UserNo).Select(s => s.SupervisorId).FirstOrDefault();
                        var SupEmail = dBcontext.Users.Where(t => t.UserNo == SupUserNo).Select(s => s.Email).FirstOrDefault();

                        if (SupEmail == null)
                        {
                            return Json(new { error = true, message = "No Available Supervisor for the user. Email could not be sent." }, JsonRequestBehavior.AllowGet);
                        }

                        string userName = dBcontext.Users.Where(t => t.UserNo == finalSettlement.UserNo).Select(s => s.FullName).FirstOrDefault();

                        
                        int emailFlag = finalSettlementGateway.SendEmailFromUser2(SupEmail, userName, finalSettlement, dBcontext);

                        if (emailFlag <= 0)
                        {
                            throw new Exception("Email couldn't be sent.");
                        }

                        dBcontext.SaveChanges();
                        dbTransaction.Commit();
                        return Json(new { error = false, message = "Updated successfully." }, JsonRequestBehavior.AllowGet);

                    }
                    catch (Exception ex)
                    {
                        dbTransaction.Rollback();
                        return Json(new { error = true, message = "Oops! Saving Failed. Please try again later. " + ex.Message }, JsonRequestBehavior.AllowGet);
                    }


                }
            }
        }


        private void HandleFileAttachments(HttpFileCollectionBase files, int finalSettlementId, int userNo, TravelManagementDBcontext dBcontext)
        {

            if (Request.Files.Count == 0)
            {
                FinalSettlementFiles fileAttach_FS = new FinalSettlementFiles();
                dBcontext.Entry(fileAttach_FS).Property("location").IsModified = false;

            }

            if (Request.Files.Count > 0)
            {
                for (int i = 0; i < files.Count; i++)
                {
                    if (files.AllKeys[i] == "FilesFlight")
                    {
                        HttpPostedFileBase file = files[i];

                        FinalSettlementFiles fileAttachment = new FinalSettlementFiles
                        {
                            FinalSettlementId = finalSettlementId,
                            FileName = "Files",
                            UserNo = userNo,
                            FileType= "Flight",

                        };

                        try
                        {
                            fileAttachment = SaveOrderFileFlight(file, fileAttachment);

                            if (fileAttachment == null || fileAttachment.FinalSettlementId <= 0)
                            {
                                throw new Exception("File saving failed.");
                            }

                            FinalSettlementGateway finalSettlementGateway = new FinalSettlementGateway();
                            int rowAffected = finalSettlementGateway.UpdateFSFiles(fileAttachment, dBcontext);

                            if (rowAffected <= 0)
                            {
                                throw new Exception("File information saving failed.");
                            }
                        }
                        catch (Exception ex)
                        {
                        }
                    }


                    else if (files.AllKeys[i] == "FilesHotel")
                    {
                        HttpPostedFileBase file = files[i];

                        FinalSettlementFiles fileAttachment = new FinalSettlementFiles
                        {
                            FinalSettlementId = finalSettlementId,
                            FileName = "Files",
                            UserNo = userNo,
                            FileType = "Hotel"

                        };

                        try
                        {
                            fileAttachment = SaveOrderFileHotel(file, fileAttachment);

                            if (fileAttachment == null || fileAttachment.FinalSettlementId <= 0)
                            {
                                throw new Exception("File saving failed.");
                            }

                            FinalSettlementGateway finalSettlementGateway = new FinalSettlementGateway();
                            int rowAffected = finalSettlementGateway.UpdateFSFiles(fileAttachment, dBcontext);

                            if (rowAffected <= 0)
                            {
                                throw new Exception("File information saving failed.");
                            }
                        }
                        catch (Exception ex)
                        {
                        }
                    }

                    else if (files.AllKeys[i] == "FilesFood")
                    {
                        HttpPostedFileBase file = files[i];

                        FinalSettlementFiles fileAttachment = new FinalSettlementFiles
                        {
                            FinalSettlementId = finalSettlementId,
                            FileName = "Files",
                            UserNo = userNo,
                            FileType = "Food"

                        };

                        try
                        {
                            fileAttachment = SaveOrderFileFood(file, fileAttachment);

                            if (fileAttachment == null || fileAttachment.FinalSettlementId <= 0)
                            {
                                throw new Exception("File saving failed.");
                            }

                            FinalSettlementGateway finalSettlementGateway = new FinalSettlementGateway();
                            int rowAffected = finalSettlementGateway.UpdateFSFiles(fileAttachment, dBcontext);

                            if (rowAffected <= 0)
                            {
                                throw new Exception("File information saving failed.");
                            }
                        }
                        catch (Exception ex)
                        {
                        }
                    }

                    else if (files.AllKeys[i] == "FilesTransportation")
                    {
                        HttpPostedFileBase file = files[i];

                        FinalSettlementFiles fileAttachment = new FinalSettlementFiles
                        {
                            FinalSettlementId = finalSettlementId,
                            FileName = "Files",
                            UserNo = userNo,
                            FileType = "Transportation"

                        };

                        try
                        {
                            fileAttachment = SaveOrderFileTransportation(file, fileAttachment);

                            if (fileAttachment == null || fileAttachment.FinalSettlementId <= 0)
                            {
                                throw new Exception("File saving failed.");
                            }

                            FinalSettlementGateway finalSettlementGateway = new FinalSettlementGateway();
                            int rowAffected = finalSettlementGateway.UpdateFSFiles(fileAttachment, dBcontext);

                            if (rowAffected <= 0)
                            {
                                throw new Exception("File information saving failed.");
                            }
                        }
                        catch (Exception ex)
                        {
                        }
                    }

                    else if (files.AllKeys[i] == "FilesOthers")
                    {
                        HttpPostedFileBase file = files[i];

                        FinalSettlementFiles fileAttachment = new FinalSettlementFiles
                        {
                            FinalSettlementId = finalSettlementId,
                            FileName = "Files",
                            UserNo = userNo,
                            FileType = "Others"

                        };

                        try
                        {
                            fileAttachment = SaveOrderFileOther(file, fileAttachment);

                            if (fileAttachment == null || fileAttachment.FinalSettlementId <= 0)
                            {
                                throw new Exception("File saving failed.");
                            }

                            FinalSettlementGateway finalSettlementGateway = new FinalSettlementGateway();
                            int rowAffected = finalSettlementGateway.UpdateFSFiles(fileAttachment, dBcontext);

                            if (rowAffected <= 0)
                            {
                                throw new Exception("File information saving failed.");
                            }
                        }
                        catch (Exception ex)
                        {
                        }
                    }
                }

            }
        }


        //private void HandleFileAttachments(HttpFileCollectionBase files, int finalSettlementId, int userNo, TravelManagementDBcontext dBcontext)
        //{

        //    if (Request.Files.Count == 0)
        //    {
        //        FinalSettlementFiles fileAttach_FS = new FinalSettlementFiles();
        //        dBcontext.Entry(fileAttach_FS).Property("location").IsModified = false;

        //    }

        //    if (Request.Files.Count > 0)
        //    {
        //        for (int i = 0; i < files.Count; i++)
        //        {
        //            if (files.AllKeys[i] == "Files")
        //            {
        //                HttpPostedFileBase file = files[i];

        //                FinalSettlementFiles fileAttachment = new FinalSettlementFiles
        //                {
        //                    FinalSettlementId = finalSettlementId,
        //                    FileName = "Files",
        //                    UserNo = userNo,

        //                };

        //                try
        //                {
        //                    fileAttachment = SaveOrderFile(file, fileAttachment);

        //                    if (fileAttachment == null || fileAttachment.FinalSettlementId <= 0)
        //                    {
        //                        throw new Exception("File saving failed.");
        //                    }

        //                    FinalSettlementGateway finalSettlementGateway = new FinalSettlementGateway();
        //                    int rowAffected = finalSettlementGateway.UpdateFSFiles(fileAttachment, dBcontext);

        //                    if (rowAffected <= 0)
        //                    {
        //                        throw new Exception("File information saving failed.");
        //                    }
        //                }
        //                catch (Exception ex)
        //                {
        //                }
        //            }
        //        }

        //    }
        //}



        public ActionResult DeleteFinalSettlementFile(int? Id)
        {
            if (Id == null || Id <= 0)
            {
                return Json(new { error = true, message = "Error! Invalid Request detected." }, JsonRequestBehavior.AllowGet);
            }

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                FinalSettlementGateway finalSettlementGateway = new FinalSettlementGateway();

                int rowAffected = finalSettlementGateway.DeleteFinalSettlementFile(Convert.ToInt32(Id), dBcontext);

                if (rowAffected > 0)
                {
                    return Json(new { error = false, message = "Deleted Successfully." }, JsonRequestBehavior.AllowGet);
                }
                else if (rowAffected == -3)
                {
                    return Json(new { error = true, message = "ERROR! Invalid Request Detected. Deletation Unsuccessful." }, JsonRequestBehavior.AllowGet);
                }

                return Json(new { error = true, message = "Oops!! Deletation Failed. Please try again later." }, JsonRequestBehavior.AllowGet);

            }

        }
    }
}