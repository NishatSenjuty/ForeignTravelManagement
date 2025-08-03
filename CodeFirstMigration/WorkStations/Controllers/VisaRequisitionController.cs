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
    public class VisaRequisitionController : Controller
    {
        [Route("a/visareq")]

        public ActionResult Index()
        {

            //var Session1 = MySession.Current.UserNo;


            if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            {
                return Redirect("~/admin/sign_in");
            }
            if (!MySession.Current.NavList.Contains("visareq")) // means short name in the menulist db table
            {
                return Json(RequstStatus.Return(RequestStatusType.AccessDenied), JsonRequestBehavior.AllowGet);
            }
            return View("~/WorkStations/Views/VisaRequisition/Index.cshtml");
        }




        [HttpPost]
        public ActionResult GetUserDetails(string userNo)
        {
            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                int IssueNo = -1;
                try
                { 
                    if (userNo != "")
                        IssueNo = Convert.ToInt16(userNo);
                }
                catch { }

                var userDetails = dBcontext.Users
                    .Where(u => u.UserNo == IssueNo)
                    .FirstOrDefault();

                var userInfo = dBcontext.Users
                    .Where(u => u.UserNo == IssueNo)
                    .Select(n1 => new
                    {
                        n1.Companys.CompanyName,
                        n1.Department.Name,
                        n1.Designation.DesignationName
                    })
                    .FirstOrDefault();

                if (userDetails != null)
                {
                    var combinedData = new
                    {
                        UserDetails = userDetails,
                        UserInfo = userInfo
                    };

                    return Json(combinedData, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { error = "User not found" }, JsonRequestBehavior.AllowGet);
                }
            }
        }


        [HttpPost]
        public ActionResult AddVisaRequisition([Bind(Include = "TypeOfVisaUser, TypeOfVisaOtherUser, PreviouslyDestinedUser, VisaTypePreviousUser, IssueDatePrevUserStr," +
            "ExpiryDatePrevUserStr, CountryNameUser, PurposeOfTravelUser, PurposeOfTravelOtherUser, " +
            "EntryDateUserStr, DepartureUserStr, ReturnUserStr,AccomodationDetUser,SpecialReqUser,RemarksUser,VisaReqActiveStatus")]  VisaRequisition visaRequisition)
        {
            
            using (TravelManagementDBcontext dbContext = new TravelManagementDBcontext())
            {

                visaRequisition.InsertedBy = MySession.Current.UserNo;
                visaRequisition.UserNo = MySession.Current.UserNo;

                visaRequisition.EntryDateUser = !string.IsNullOrEmpty(visaRequisition.EntryDateUserStr)
                    ? DateTime.ParseExact(visaRequisition.EntryDateUserStr, "dd/MM/yyyy", null)
                    : (DateTime?)null;

                visaRequisition.ExpiryDatePrevUser = !string.IsNullOrEmpty(visaRequisition.ExpiryDatePrevUserStr)
                    ? DateTime.ParseExact(visaRequisition.ExpiryDatePrevUserStr, "dd/MM/yyyy", null)
                    : (DateTime?)null;

                visaRequisition.IssueDatePrevUser = !string.IsNullOrEmpty(visaRequisition.IssueDatePrevUserStr)
                    ? DateTime.ParseExact(visaRequisition.IssueDatePrevUserStr, "dd/MM/yyyy", null)
                    : (DateTime?)null;

                visaRequisition.DepartureUser = !string.IsNullOrEmpty(visaRequisition.DepartureUserStr)
                    ? DateTime.ParseExact(visaRequisition.DepartureUserStr, "dd/MM/yyyy", null)
                    : (DateTime?)null;

                visaRequisition.ReturnUser = !string.IsNullOrEmpty(visaRequisition.ReturnUserStr)
                    ? DateTime.ParseExact(visaRequisition.ReturnUserStr, "dd/MM/yyyy", null)
                    : (DateTime?)null;


                //Check if the visa is expired

                if (visaRequisition.ExpiryDatePrevUser.HasValue && visaRequisition.ExpiryDatePrevUser.Value < DateTime.Today)
                {
                    return Json(new { error = true, message = "This visa is expired and cannot be processed." }, JsonRequestBehavior.AllowGet);
                }



                BarcodeGateway barcodeGateway = new BarcodeGateway();
                visaRequisition.VisaRequisitionNo = barcodeGateway.GenerateBarcodeNo("VisaReq", dbContext);


                string Getyear = DateTime.Now.ToString("yy");
                int Rec_Count = Convert.ToInt16(visaRequisition.VisaRequisitionNo);
                string Gen_Barcode = "VisaReq-" + Getyear + "-";
                if (Rec_Count < 10)
                {
                    Gen_Barcode = Gen_Barcode + "000" + Rec_Count;
                }
                else if (Rec_Count < 11)
                {
                    Gen_Barcode = Gen_Barcode + "00" + Rec_Count;
                }
                else if (Rec_Count < 101)
                {
                    Gen_Barcode = Gen_Barcode + "0" + Rec_Count;
                }
                else
                {
                    Gen_Barcode = Gen_Barcode + Rec_Count;
                }

                visaRequisition.VisaRequisitionNoText = Gen_Barcode;

                if (visaRequisition.VisaRequisitionNo == 0)
                {
                    return Json(new { error = true, message = "An Error has occured in generating Barcode No." }, JsonRequestBehavior.AllowGet);
                }


                using (var dbTransaction = dbContext.Database.BeginTransaction())
                {
                    //try
                    //{
                        BarcodeNo barcodeNo = new BarcodeNo();
                        barcodeNo.BarcodeNoText = visaRequisition.VisaRequisitionNoText;
                        barcodeNo.CreateDateTime = DateTime.Now;
                        barcodeNo.BarcodeForStatus = "VisaReq";
                        int InsertBarcode = barcodeGateway.AddBarcodeNo(barcodeNo, dbContext);
                        if (InsertBarcode < 1)
                        {
                            throw new Exception("An error has occured in inserting Barcode No.");
                        }

                        VisaRequisitionGateway visaRequisitionGateway = new VisaRequisitionGateway();

                        visaRequisition.Id = visaRequisitionGateway.AddVisaRequisition(visaRequisition, dbContext);
                        if (visaRequisition.Id <= 0)
                        {
                            throw new Exception("Information saving failed.");
                    }


                    //File Attachment
                    for (int i = 0; i < Request.Files.Count; i++)
                        {
                                HttpPostedFileBase files = Request.Files[i];

                                VisaRequisitionAttachments visaRequisitionAttachments = new VisaRequisitionAttachments();

                                visaRequisitionAttachments.FileName = "Files";
                                visaRequisitionAttachments.FileType = 1;
                                visaRequisitionAttachments.UserNo = MySession.Current.UserNo;
                                visaRequisitionAttachments.VisaRequisionId = visaRequisition.Id;

                                visaRequisitionAttachments = SaveOrderFile(files, visaRequisitionAttachments);

                                if (visaRequisitionAttachments == null || visaRequisitionAttachments.UserNo <= 0)
                                {
                                    throw new Exception("File saving failed.");
                                }

                                int rowAffected1 = visaRequisitionGateway.AddUserInvitationLetter(visaRequisitionAttachments, dbContext);

                                if (rowAffected1 <= 0)
                                {
                                    throw new Exception("File information saving failed.");
                                }
                    }


                    //Email

                    var SupUserNo = dbContext.EnrollSuperVisors.Where(t => t.UserId == visaRequisition.UserNo).Select(s => s.SupervisorId).FirstOrDefault();
                    var SupEmail = dbContext.Users.Where(t => t.UserNo == SupUserNo).Select(s => s.Email).FirstOrDefault();

                    if (SupEmail == null)
                    {
                        return Json(new { error = true, message = "No Available Supervisor for the user. Email could not be sent." }, JsonRequestBehavior.AllowGet);
                    }


                    //var SupEmail = "nishat.tabassum@urmigroup.net";

                    string userName = dbContext.Users.Where(t => t.UserNo == visaRequisition.UserNo).Select(s => s.FullName).FirstOrDefault();


                    int emailFlag = visaRequisitionGateway.SendEmailFromUser(SupEmail, userName, visaRequisition, dbContext);
                        
                        if (emailFlag <= 0)
                        {
                            throw new Exception("Email couldn't be sent.");
                        }

                        dbContext.SaveChanges();
                        dbTransaction.Commit();
                        return Json(new { error = false, message = "Visa Requisition Saved Successfully." }, JsonRequestBehavior.AllowGet);
                }
            }
        }


        public VisaRequisitionAttachments SaveOrderFile(HttpPostedFileBase file, VisaRequisitionAttachments visaRequisitionAttachments)
        {
            try
            {
                BaseClassUtilitiesNonStatic baseClassUtilitiesNonStatic = new BaseClassUtilitiesNonStatic();

                visaRequisitionAttachments.FileName = "File_" + baseClassUtilitiesNonStatic.RandomString(6) + Path.GetExtension(file.FileName);
                string directoryPath = Server.MapPath("/Files/VisaRequisition");
                if (!Directory.Exists(directoryPath))
                {
                    Directory.CreateDirectory(directoryPath);
                }
                string serverPath = Path.Combine(Server.MapPath("/Files/VisaRequisition"), visaRequisitionAttachments.FileName);
                string location = "/Files/VisaRequisition/" + visaRequisitionAttachments.FileName;
                visaRequisitionAttachments.location = location;
                bool fileExist = System.IO.File.Exists(serverPath);
                if (fileExist)
                {
                    throw new Exception();
                }
                file.SaveAs(serverPath);

                return visaRequisitionAttachments;

            }
            catch (Exception ex)
            {
                return null;
            }
        }



        [HttpPost]
        public ActionResult ShowVisaRequisition(
                     int limit,
                     int CompanyId,
                     int DepartmentId,
                     int DesignationId,
                     string VisaRequisitionNoText,
                     string EmployeeId,
                     int VisaReqActiveStatus,
                     int page
                     
                     )
        {
            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                    VisaRequisitionGateway visaRequisitionGateway = new VisaRequisitionGateway();

                var data = visaRequisitionGateway.ShowVisaRequisition(
                                                 CompanyId,
                                                 DepartmentId,
                                                 DesignationId,
                                                 VisaRequisitionNoText,
                                                 EmployeeId,
                                                 VisaReqActiveStatus,
                                                 page,
                                                 limit,
                                                 dBcontext);

                if (data == null)
                {
                    return Json(new { error = true, message = "Data Not Found." }, JsonRequestBehavior.AllowGet);
                }

                return Json(data);

            }
        }


        [HttpPost]
        public ActionResult ShowVisaRequisitionForEmployee(
             int limit,
             int CompanyId,
             int DepartmentId,
             int DesignationId,
             string VisaRequisitionNoText,
             string EmployeeId,
             int VisaReqActiveStatus,
             int page,
             string userNo
             )
        {
            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                VisaRequisitionGateway visaRequisitionGateway = new VisaRequisitionGateway();

                var data = visaRequisitionGateway.ShowVisaRequisitionForEmployee(
                                                 CompanyId,
                                                 DepartmentId,
                                                 DesignationId,
                                                 VisaRequisitionNoText,
                                                 EmployeeId,
                                                 VisaReqActiveStatus,
                                                 userNo,
                                                 page,
                                                 limit,
                                                 dBcontext);

                if (data == null)
                {
                    return Json(new { error = true, message = "Data Not Found." }, JsonRequestBehavior.AllowGet);
                }

                return Json(data);

            }
        }





        [HttpPost]
        public ActionResult UpdateVisaRequisition([Bind(Include = "Id, UserNo, TypeOfVisaUser, TypeOfVisaOtherUser, PreviouslyDestinedUser, VisaTypePreviousUser, IssueDatePrevUserStr," +
            "ExpiryDatePrevUserStr, CountryNameUser, PurposeOfTravelUser, PurposeOfTravelOtherUser, " +
            "EntryDateUserStr, DepartureUserStr, ReturnUserStr,AccomodationDetUser,SpecialReqUser,RemarksUser," +
            "VisaReqActiveStatus,VisaNoTD,CountryNameTD,VisaIssueDateTDStr,VisaExpiryDateTDStr,RemarksTD, VisaApprovalStatus, ApprovedBy, RejectedBy, CommentsSupervisor")]  VisaRequisition visaRequisition)
        {
            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {

                visaRequisition.UpdatedBy = MySession.Current.UserNo;


                using (var dbTransaction = dBcontext.Database.BeginTransaction())
                {
                    try
                    {
                        //Travel Desk = 3

                        if ((MySession.Current.UserRoleId == 1) || (MySession.Current.UserRoleId == 3 ))  
                        {

                            dBcontext.Entry(visaRequisition).State = EntityState.Unchanged;

                            dBcontext.Entry(visaRequisition).Property("VisaIssueDateTD").IsModified = true;
                            dBcontext.Entry(visaRequisition).Property("VisaExpiryDateTD").IsModified = true;
                            dBcontext.Entry(visaRequisition).Property("CountryNameTD").IsModified = true;
                            dBcontext.Entry(visaRequisition).Property("VisaNoTD").IsModified = true;
                            dBcontext.Entry(visaRequisition).Property("RemarksTD").IsModified = true;


                            visaRequisition.VisaIssueDateTD = !string.IsNullOrEmpty(visaRequisition.VisaIssueDateTDStr)
                            ? DateParse.StringToDateTime(visaRequisition.VisaIssueDateTDStr)
                            : (DateTime?)null;

                            visaRequisition.VisaExpiryDateTD = !string.IsNullOrEmpty(visaRequisition.VisaExpiryDateTDStr)
                                ? DateParse.StringToDateTime(visaRequisition.VisaExpiryDateTDStr)
                                : (DateTime?)null;

                            var CountryCheck = dBcontext.VisaRequisitions
                                .Where(e => e.Id == visaRequisition.Id)
                                .Select(e => e.CountryNameUser)
                                .FirstOrDefault();

                            if (CountryCheck != visaRequisition.CountryNameTD)
                            {
                                return Json(new { error = true, message = "Please enter correct country name to proceed." }, JsonRequestBehavior.AllowGet);
                            }

                            VisaRequisitionGateway visaRequisitionGateway = new VisaRequisitionGateway();


                            visaRequisition.Id = visaRequisitionGateway.UpdateVisaRequisitionTD(visaRequisition, dBcontext);

                            if (Request.Files.Count > 0)
                            {
                                HandleFileAttachments1(Request.Files, visaRequisition.Id, MySession.Current.UserNo, dBcontext);
                            }


                            //Email (TD -> Applicant)

                            var ApplicantNo = visaRequisition.UserNo;
                            var VisaReqText = dBcontext.VisaRequisitions.Where(t => t.Id == visaRequisition.Id).Select(s => s.VisaRequisitionNoText).FirstOrDefault();
                            string userEmail = dBcontext.Users.Where(t => t.UserNo == ApplicantNo).Select(s => s.Email).FirstOrDefault();

                            int emailFlag = visaRequisitionGateway.SendEmailFromTD(userEmail, VisaReqText, dBcontext);

                            if (emailFlag <= 0)
                            {
                                throw new Exception();
                            }


                        }

                        //Employee = 5

                        else if ((MySession.Current.UserRoleId == 1) || (MySession.Current.UserRoleId == 5))  
                        {

                            dBcontext.Entry(visaRequisition).State = EntityState.Unchanged;

                            dBcontext.Entry(visaRequisition).Property("TypeOfVisaUser").IsModified = true;
                            dBcontext.Entry(visaRequisition).Property("TypeOfVisaOtherUser").IsModified = true;
                            dBcontext.Entry(visaRequisition).Property("PreviouslyDestinedUser").IsModified = true;
                            dBcontext.Entry(visaRequisition).Property("VisaTypePreviousUser").IsModified = true;
                            dBcontext.Entry(visaRequisition).Property("IssueDatePrevUser").IsModified = true;
                            dBcontext.Entry(visaRequisition).Property("ExpiryDatePrevUser").IsModified = true;
                            dBcontext.Entry(visaRequisition).Property("CountryNameUser").IsModified = true;
                            dBcontext.Entry(visaRequisition).Property("PurposeOfTravelUser").IsModified = true;
                            dBcontext.Entry(visaRequisition).Property("PurposeOfTravelOtherUser").IsModified = true;
                            dBcontext.Entry(visaRequisition).Property("EntryDateUser").IsModified = true;
                            dBcontext.Entry(visaRequisition).Property("DepartureUser").IsModified = true;
                            dBcontext.Entry(visaRequisition).Property("ReturnUser").IsModified = true;
                            dBcontext.Entry(visaRequisition).Property("AccomodationDetUser").IsModified = true;
                            dBcontext.Entry(visaRequisition).Property("SpecialReqUser").IsModified = true;
                            dBcontext.Entry(visaRequisition).Property("RemarksUser").IsModified = true;
                            dBcontext.Entry(visaRequisition).Property("VisaReqActiveStatus").IsModified = true;


                            visaRequisition.EntryDateUser = !string.IsNullOrEmpty(visaRequisition.EntryDateUserStr)
                                ? DateParse.StringToDateTime(visaRequisition.EntryDateUserStr)
                                : (DateTime?)null;

                            visaRequisition.ExpiryDatePrevUser = !string.IsNullOrEmpty(visaRequisition.ExpiryDatePrevUserStr)
                                ? DateParse.StringToDateTime(visaRequisition.ExpiryDatePrevUserStr)
                                : (DateTime?)null;

                            visaRequisition.IssueDatePrevUser = !string.IsNullOrEmpty(visaRequisition.IssueDatePrevUserStr)
                                ? DateParse.StringToDateTime(visaRequisition.IssueDatePrevUserStr)
                                : (DateTime?)null;

                            visaRequisition.DepartureUser = !string.IsNullOrEmpty(visaRequisition.DepartureUserStr)
                                ? DateParse.StringToDateTime(visaRequisition.DepartureUserStr)
                                : (DateTime?)null;

                            visaRequisition.ReturnUser = !string.IsNullOrEmpty(visaRequisition.ReturnUserStr)
                                ? DateParse.StringToDateTime(visaRequisition.ReturnUserStr)
                                : (DateTime?)null;


                            visaRequisition.VisaApprovalStatus = ApprovalStatus.IsPending;
                            visaRequisition.ApprovedBy = null;
                            visaRequisition.RejectedBy = null;
                            visaRequisition.CommentsSupervisor = null;


                            VisaRequisitionGateway visaRequisitionGateway = new VisaRequisitionGateway();

                            visaRequisition.Id = visaRequisitionGateway.UpdateVisaRequisitionTD(visaRequisition, dBcontext);

                            if (Request.Files.Count > 0)
                            {
                                HandleFileAttachments(Request.Files, visaRequisition.Id, MySession.Current.UserNo, dBcontext);
                            }


                            //Email to Depthead

                            var SupUserNo = dBcontext.EnrollSuperVisors.Where(t => t.UserId == visaRequisition.UserNo).Select(s => s.SupervisorId).FirstOrDefault();
                            var SupEmail = dBcontext.Users.Where(t => t.UserNo == SupUserNo).Select(s => s.Email).FirstOrDefault();

                            if (SupEmail == null)
                            {
                                return Json(new { error = true, message = "No Available Supervisor for the user. Email could not be sent." }, JsonRequestBehavior.AllowGet);
                            }

                            //var SupEmail = "nishat.tabassum@urmigroup.net";

                            var VisaReqText1 = dBcontext.VisaRequisitions.Where(t => t.Id == visaRequisition.Id).Select(s => s.VisaRequisitionNoText).FirstOrDefault();

                            string userName = dBcontext.Users.Where(t => t.UserNo == visaRequisition.UserNo).Select(s => s.FullName).FirstOrDefault();

                            int emailFlag = visaRequisitionGateway.SendEmailFromUser2(SupEmail, userName, VisaReqText1, dBcontext);

                            if (emailFlag <= 0)
                            {
                                throw new Exception();
                            }

                        }

                        else
                        {
                            return Json(new { error = true, message = "Saving Failed. You are not authorized to edit these information. Please contact admin." }, JsonRequestBehavior.AllowGet);
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



        private void HandleFileAttachments1(HttpFileCollectionBase files, int visaRequisitionId, int userNo, TravelManagementDBcontext dBcontext)
        {

            if (Request.Files.Count == 0)
            {
                VisaRequisitionAttachments fileAttach_FS = new VisaRequisitionAttachments();
                dBcontext.Entry(fileAttach_FS).Property("location").IsModified = false;

            }

            if (Request.Files.Count > 0)
            {
                for (int i = 0; i < files.Count; i++)
                {
                    if (files.AllKeys[i] == "FilesTD")
                    {
                        HttpPostedFileBase file = files[i];

                        VisaRequisitionTDfiles fileAttachment = new VisaRequisitionTDfiles
                        {
                            VisaRequisionId = visaRequisitionId,
                            FileName = "Files",
                            UserNo = userNo,

                        };

                        try
                        {
                            fileAttachment = SaveOrderFileTD(file, fileAttachment);

                            if (fileAttachment == null || fileAttachment.VisaRequisionId <= 0)
                            {
                                throw new Exception("File saving failed.");
                            }

                            VisaRequisitionGateway visaRequisitionGateway = new VisaRequisitionGateway();

                            int rowAffected = visaRequisitionGateway.UpdateVisaRequisitionFilesTD(fileAttachment, dBcontext);

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



        private void HandleFileAttachments(HttpFileCollectionBase files, int visaRequisitionId, int userNo, TravelManagementDBcontext dBcontext)
        {

            if (Request.Files.Count == 0)
            {
                VisaRequisitionAttachments fileAttach_FS = new VisaRequisitionAttachments();
                dBcontext.Entry(fileAttach_FS).Property("location").IsModified = false;

            }

            if (Request.Files.Count > 0)
            {
                for (int i = 0; i < files.Count; i++)
                {
                    if (files.AllKeys[i] == "FilesUser")
                    {
                        HttpPostedFileBase file = files[i];

                        VisaRequisitionAttachments fileAttachment = new VisaRequisitionAttachments
                        {
                            VisaRequisionId = visaRequisitionId,
                            FileName = "Files",
                            UserNo = userNo,

                        };

                        try
                        {
                            fileAttachment = SaveOrderFile(file, fileAttachment);

                            if (fileAttachment == null || fileAttachment.VisaRequisionId <= 0)
                            {
                                throw new Exception("File saving failed.");
                            }

                            VisaRequisitionGateway visaRequisitionGateway = new VisaRequisitionGateway();
                            
                            int rowAffected = visaRequisitionGateway.UpdateVisaRequisitionFiles(fileAttachment, dBcontext);

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



        public VisaRequisitionTDfiles SaveOrderFileTD(HttpPostedFileBase file, VisaRequisitionTDfiles visaRequisitionTDfiles)
        {
            try
            {
                BaseClassUtilitiesNonStatic baseClassUtilitiesNonStatic = new BaseClassUtilitiesNonStatic();

                visaRequisitionTDfiles.FileName = "File_" + baseClassUtilitiesNonStatic.RandomString(6) + Path.GetExtension(file.FileName);
                string directoryPath = Server.MapPath("/Files/VisaRequisition/TravelDesk");
                if (!Directory.Exists(directoryPath))
                {
                    Directory.CreateDirectory(directoryPath);
                }
                string serverPath = Path.Combine(Server.MapPath("/Files/VisaRequisition/TravelDesk"), visaRequisitionTDfiles.FileName);
                string location = "/Files/VisaRequisition/TravelDesk/" + visaRequisitionTDfiles.FileName;
                visaRequisitionTDfiles.location = location;
                bool fileExist = System.IO.File.Exists(serverPath);
                if (fileExist)
                {
                    throw new Exception();
                }
                file.SaveAs(serverPath);

                return visaRequisitionTDfiles;

            }
            catch (Exception ex)
            {
                return null;
            }
        }



        [HttpPost]
        public ActionResult DeleteVisaRequisition(int? Id)
        {

            if (Id == null || Id <= 0)
            {
                return Json(new { error = true, message = "Error! Invalid Request detected." }, JsonRequestBehavior.AllowGet);
            }


            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {

                VisaRequisitionGateway visaRequisitionGateway = new VisaRequisitionGateway();

                int rowAffected = visaRequisitionGateway.DeleteVisaRequisition(Convert.ToInt16(Id), dBcontext);
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



        public ActionResult DeleteVisaRequisitionFile(int? Id)
        {
            if (Id == null || Id <= 0)
            {
                return Json(new { error = true, message = "Error! Invalid Request detected." }, JsonRequestBehavior.AllowGet);
            }

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                VisaRequisitionGateway visaRequisitionGateway = new VisaRequisitionGateway();

                int rowAffected = visaRequisitionGateway.DeleteVisaRequisitionFile(Convert.ToInt32(Id), dBcontext);

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


        public ActionResult DeleteVisaRequisitionFileTD(int? Id)
        {
            if (Id == null || Id <= 0)
            {
                return Json(new { error = true, message = "Error! Invalid Request detected." }, JsonRequestBehavior.AllowGet);
            }

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                VisaRequisitionGateway visaRequisitionGateway = new VisaRequisitionGateway();

                int rowAffected = visaRequisitionGateway.DeleteVisaRequisitionFileTD(Convert.ToInt32(Id), dBcontext);

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


        [HttpPost]
        public ActionResult ShowVisaRequisitionPopUp(

                 string VisaRequisitionNoText
     )
        {
            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                VisaRequisitionGateway visaRequisitionGateway = new VisaRequisitionGateway();

                var data = visaRequisitionGateway.ShowVisaRequisitionPopUp(
                                                 VisaRequisitionNoText,
                                                 dBcontext);

                if (data == null)
                {
                    return Json(new { error = true, message = "Data Not Found." }, JsonRequestBehavior.AllowGet);
                }

                return Json(data);

            }
        }

    }
}