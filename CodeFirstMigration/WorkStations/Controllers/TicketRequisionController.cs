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
    public class TicketRequisionController : Controller
    {
        [Route("a/ticketreq")]


        //Function For EmployeeInformations Page - Session  *
        public ActionResult Index()
        {
            if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            {
                return Redirect("~/admin/sign_in");
            }
            if (!MySession.Current.NavList.Contains("ticketreq")) // means short name in the menulist db table
            {
                return Json(RequstStatus.Return(RequestStatusType.AccessDenied), JsonRequestBehavior.AllowGet);
            }
            return View("~/WorkStations/Views/TicketRequisition/Index.cshtml");
        }


        [HttpPost]
        public ActionResult ShowAirlinesForDropdown()
        {

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                TicketRequisitionGateway ticketRequisitionGateway = new TicketRequisitionGateway();
                var data = ticketRequisitionGateway.ShowAirlinesForDropdown(dBcontext);
                if (data == null)
                {
                    return Json(new { error = true, message = "Data Not Found." }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { error = false, data }, JsonRequestBehavior.AllowGet);

            }
        }


        [HttpPost]
        public ActionResult ShowCurrencyTypeForDropdown()
        {

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                TicketRequisitionGateway ticketRequisitionGateway = new TicketRequisitionGateway();
                var data = ticketRequisitionGateway.ShowCurrencyTypeForDropdown(dBcontext);
                if (data == null)
                {
                    return Json(new { error = true, message = "Data Not Found." }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { error = false, data }, JsonRequestBehavior.AllowGet);

            }
        }


        [HttpPost]
        public ActionResult AddTicketRequision([Bind(Include = "PurposeOfTravelOtherUser, PurposeOfTravelUser, DestinationUser, DepartureDateUserStr, " +
            "ReturnDateUserStr, AirlinesUser, FlayerNoUser, FlightUser, SeatUser, MealUser, SpecialReqUser, RemarksUser")]  TicketRequisition ticketRequisition)
        {

            using (TravelManagementDBcontext dbContext = new TravelManagementDBcontext())
            {

                ticketRequisition.InsertedBy = MySession.Current.UserNo;
                ticketRequisition.UserNo = MySession.Current.UserNo;

                ticketRequisition.DepartureDateUser = !string.IsNullOrEmpty(ticketRequisition.DepartureDateUserStr)
                    ? DateParse.StringToDateTime(ticketRequisition.DepartureDateUserStr)
                    : (DateTime?)null;

                ticketRequisition.ReturnDateUser = !string.IsNullOrEmpty(ticketRequisition.ReturnDateUserStr)
                    ? DateParse.StringToDateTime(ticketRequisition.ReturnDateUserStr)
                    : (DateTime?)null;


                BarcodeGateway barcodeGateway = new BarcodeGateway();
                ticketRequisition.TicketRequisitionNo = barcodeGateway.GenerateBarcodeNo("TicketReq", dbContext);


                string Getyear = DateTime.Now.ToString("yy");
                int Rec_Count = Convert.ToInt16(ticketRequisition.TicketRequisitionNo);
                string Gen_Barcode = "TicketReq-" + Getyear + "-";
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

                ticketRequisition.TicketRequisitionNoText = Gen_Barcode;

                if (ticketRequisition.TicketRequisitionNo == 0)
                {
                    return Json(new { error = true, message = "A generation error has occurred for the barcode number." }, JsonRequestBehavior.AllowGet);
                }


                using (var dbTransaction = dbContext.Database.BeginTransaction())
                {
                    try
                    {
                        BarcodeNo barcodeNo = new BarcodeNo();
                        barcodeNo.BarcodeNoText = ticketRequisition.TicketRequisitionNoText;
                        barcodeNo.CreateDateTime = DateTime.Now;
                        barcodeNo.BarcodeForStatus = "TicketReq";
                        int InsertBarcode = barcodeGateway.AddBarcodeNo(barcodeNo, dbContext);
                        if (InsertBarcode < 1)
                        {
                            throw new Exception("The barcode number was not inserted correctly.");
                        }

                        TicketRequisitionGateway ticketRequisitionGateway = new TicketRequisitionGateway();
                        TicketApprovalGateway ticketApprovalGateway = new TicketApprovalGateway();

                        ticketRequisition.Id = ticketRequisitionGateway.AddTicketRequisition(ticketRequisition, dbContext);
                        if (ticketRequisition.Id <= 0)
                        {
                            throw new Exception("Information saving failed.");
                        }

                        //Email

                        var SupUserNo = dbContext.EnrollSuperVisors.Where(t => t.UserId == ticketRequisition.UserNo).Select(s => s.SupervisorId).FirstOrDefault();
                        var SupEmail = dbContext.Users.Where(t => t.UserNo == SupUserNo).Select(s => s.Email).FirstOrDefault();

                        var UserNo = MySession.Current.UserNo;

                        var TravelDeskEmail = dbContext.Users.Where(t => t.UserRoleId == 3).Select(s => s.Email).FirstOrDefault();

                        if (TravelDeskEmail == null)
                        {
                            return Json(new { error = true, message = "No available user assigned for Travel Desk. Email could not be sent" }, JsonRequestBehavior.AllowGet);
                        }

                        //string userName = dbContext.Users.Where(t => t.UserNo == UserNo).Select(s => s.FullName).FirstOrDefault();
                        var TicketReqText = dbContext.TicketRequisitions.Where(t => t.Id == ticketRequisition.Id).Select(s => s.TicketRequisitionNoText).FirstOrDefault();

                        if (SupEmail == null)
                        {
                            return Json(new { error = true, message = "No Available Supervisor for the user. Email could not be send" }, JsonRequestBehavior.AllowGet);
                        }

                        string userName = dbContext.Users.Where(t => t.UserNo == ticketRequisition.UserNo).Select(s => s.FullName).FirstOrDefault();

                        int emailFlag = ticketRequisitionGateway.SendEmailFromUser(SupEmail, userName, ticketRequisition, dbContext);

                        if (emailFlag <= 0)
                        {
                            throw new Exception();
                        }


                        int emailFlag2 = ticketApprovalGateway.SendEmailFromUser(TravelDeskEmail, userName, TicketReqText, dbContext);

                        if (emailFlag2 <= 0)
                        {
                            throw new Exception();
                        }

                        dbContext.SaveChanges();
                        dbTransaction.Commit();
                        return Json(new { error = false, message = "Saved successfully." }, JsonRequestBehavior.AllowGet);
                    }
                    catch (Exception ex)
                    {
                        dbTransaction.Rollback();
                        return Json(new { error = true, message = "Oops! Order is not saved. Please try again later. " /*+ ex.Message*/ }, JsonRequestBehavior.AllowGet);

                    }
                }
            }
        }


        [HttpPost]
        public ActionResult ShowTicketRequision(
             int limit,
             int CompanyId,
             int DepartmentId,
             int DesignationId,
             string TicketRequisitionNoText,
             string EmployeeId,
             int TicketReqActiveStatus,
             int page
             )
        {
            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                TicketRequisitionGateway ticketRequisitionGateway = new TicketRequisitionGateway();

                var data = ticketRequisitionGateway.ShowTicketRequision(
                                                 CompanyId,
                                                 DepartmentId,
                                                 DesignationId,
                                                 TicketRequisitionNoText,
                                                 EmployeeId,
                                                 TicketReqActiveStatus,
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
        public ActionResult ShowTicketRequisionForEmployee(
     int limit,
     int CompanyId,
     int DepartmentId,
     int DesignationId,
     string TicketRequisitionNoText,
     string EmployeeId,
     int TicketReqActiveStatus,
     string userNo,
     int page
     )
        {
            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                TicketRequisitionGateway ticketRequisitionGateway = new TicketRequisitionGateway();

                var data = ticketRequisitionGateway.ShowTicketRequisionForEmployee(
                                                 CompanyId,
                                                 DepartmentId,
                                                 DesignationId,
                                                 TicketRequisitionNoText,
                                                 EmployeeId,
                                                 TicketReqActiveStatus,
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
        public ActionResult UpdateTicketRequisition([Bind(Include = "Id, UserNo, PurposeOfTravelUser, DestinationUser, DepartureDateUserStr, ReturnDateUserStr," +
            "AirlinesUser, FlayerNoUser, FlightUser, SeatUser, MealUser, SpecialReqUser, RemarksUser, AirlinesTD, DepturtureDateTDStr, DepturtureTimeTD," +
            "TerminalNoTD, FlightNoTD, TicketNoTD, TicketTypeTD, TicketPriceTD, CurrencyTypeTD, " +
            "SeatNoTD, RemarksTD, PurposeOfTravelOtherUser, TicketApprovalStatus, ApprovedBy, RejectedBy, CommentsSupervisor")]  TicketRequisition ticketRequisition)
        {

            if (!ModelState.IsValid)
            {
                return Json(new { error = true, message = "Validation failed.", errors = ModelState.Values.SelectMany(v => v.Errors) }, JsonRequestBehavior.AllowGet);
            }

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {

                ticketRequisition.UpdatedBy = MySession.Current.UserNo;


                using (var dbTransaction = dBcontext.Database.BeginTransaction())
                {
                    try
                    {

                        if ((MySession.Current.UserRoleId == 1) || (MySession.Current.UserRoleId == 3))  //Travel Desk = 3
                        {

                            dBcontext.Entry(ticketRequisition).State = EntityState.Unchanged;

                            dBcontext.Entry(ticketRequisition).Property("AirlinesTD").IsModified = true;
                            dBcontext.Entry(ticketRequisition).Property("DepturtureDateTD").IsModified = true; 
                            dBcontext.Entry(ticketRequisition).Property("DepturtureTimeTD").IsModified = true;
                            dBcontext.Entry(ticketRequisition).Property("TerminalNoTD").IsModified = true;
                            dBcontext.Entry(ticketRequisition).Property("FlightNoTD").IsModified = true;
                            dBcontext.Entry(ticketRequisition).Property("TicketNoTD").IsModified = true;
                            dBcontext.Entry(ticketRequisition).Property("TicketTypeTD").IsModified = true;
                            dBcontext.Entry(ticketRequisition).Property("TicketPriceTD").IsModified = true;
                            dBcontext.Entry(ticketRequisition).Property("CurrencyTypeTD").IsModified = true;
                            dBcontext.Entry(ticketRequisition).Property("SeatNoTD").IsModified = true;
                            dBcontext.Entry(ticketRequisition).Property("RemarksTD").IsModified = true;


                            ticketRequisition.DepturtureDateTD = !string.IsNullOrEmpty(ticketRequisition.DepturtureDateTDStr)
                            ? DateParse.StringToDateTime(ticketRequisition.DepturtureDateTDStr)
                            : (DateTime?)null;


                            TicketRequisitionGateway ticketRequisitionGateway = new TicketRequisitionGateway();

                            ticketRequisition.Id = ticketRequisitionGateway.UpdateTicketRequisition(ticketRequisition, dBcontext);

                            if (Request.Files.Count > 0)
                            {
                                HandleFileAttachments(Request.Files, ticketRequisition.Id, MySession.Current.UserNo, dBcontext);
                            }

                            //Email (TD -> Applicant)

                            var ApplicantNo = ticketRequisition.UserNo;
                            var TicketReqText = dBcontext.TicketRequisitions.Where(t => t.Id == ticketRequisition.Id).Select(s => s.TicketRequisitionNoText).FirstOrDefault();
                            string userEmail = dBcontext.Users.Where(t => t.UserNo == ApplicantNo).Select(s => s.Email).FirstOrDefault();

                            int emailFlag = ticketRequisitionGateway.SendEmailFromTD(userEmail, TicketReqText, dBcontext);

                            if (emailFlag <= 0)
                            {
                                throw new Exception();
                            }
                        }

                        else if ((MySession.Current.UserRoleId == 1) || (MySession.Current.UserRoleId == 5))  //Employee = 5
                        {

                            dBcontext.Entry(ticketRequisition).State = EntityState.Unchanged;

                            dBcontext.Entry(ticketRequisition).Property("PurposeOfTravelUser").IsModified = true;
                            dBcontext.Entry(ticketRequisition).Property("PurposeOfTravelOtherUser").IsModified = true;
                            dBcontext.Entry(ticketRequisition).Property("DestinationUser").IsModified = true;

                            dBcontext.Entry(ticketRequisition).Property("DepartureDateUser").IsModified = true;
                            dBcontext.Entry(ticketRequisition).Property("ReturnDateUser").IsModified = true;

                            dBcontext.Entry(ticketRequisition).Property("AirlinesUser").IsModified = true;
                            dBcontext.Entry(ticketRequisition).Property("FlayerNoUser").IsModified = true;
                            dBcontext.Entry(ticketRequisition).Property("FlightUser").IsModified = true;
                            dBcontext.Entry(ticketRequisition).Property("SeatUser").IsModified = true;
                            dBcontext.Entry(ticketRequisition).Property("MealUser").IsModified = true;
                            dBcontext.Entry(ticketRequisition).Property("SpecialReqUser").IsModified = true;
                            dBcontext.Entry(ticketRequisition).Property("RemarksUser").IsModified = true;

                            dBcontext.Entry(ticketRequisition).Property("TicketApprovalStatus").IsModified = true;
                            dBcontext.Entry(ticketRequisition).Property("ApprovedBy").IsModified = true;
                            dBcontext.Entry(ticketRequisition).Property("RejectedBy").IsModified = true;
                            dBcontext.Entry(ticketRequisition).Property("CommentsSupervisor").IsModified = true;


                            ticketRequisition.DepartureDateUser = !string.IsNullOrEmpty(ticketRequisition.DepartureDateUserStr)
                                ? DateParse.StringToDateTime(ticketRequisition.DepartureDateUserStr)
                                : (DateTime?)null;

                            ticketRequisition.ReturnDateUser = !string.IsNullOrEmpty(ticketRequisition.ReturnDateUserStr)
                                ? DateParse.StringToDateTime(ticketRequisition.ReturnDateUserStr)
                                : (DateTime?)null;

                            ticketRequisition.TicketApprovalStatus = ApprovalStatus.IsApproved;
                            //ticketRequisition.ApprovedBy = null;
                            //ticketRequisition.RejectedBy = null;
                            //ticketRequisition.CommentsSupervisor = null;


                            TicketRequisitionGateway ticketRequisitionGateway = new TicketRequisitionGateway();

                            int rowAffected1 = ticketRequisitionGateway.UpdateTicketRequisition(ticketRequisition, dBcontext);
                            if (rowAffected1 < 1)
                            {
                                throw new Exception("Information updating failed.");
                            }

                            //Email to Depthead

                            var UserNo = MySession.Current.UserNo;

                            var TravelDeskEmail = dBcontext.Users.Where(t => t.UserRoleId == 3).Select(s => s.Email).FirstOrDefault();

                            if (TravelDeskEmail == null)
                            {
                                return Json(new { error = true, message = "No available user assigned for Travel Desk. Email could not be sent" }, JsonRequestBehavior.AllowGet);
                            }

                            //var HotelResText = dBcontext.HotelReservations.Where(t => t.Id == ticketRequisition.Id).Select(s => s.HotelReservationNoText).FirstOrDefault();
                            var VisaReqText1 = dBcontext.TicketRequisitions.Where(t => t.Id == ticketRequisition.Id).Select(s => s.TicketRequisitionNoText).FirstOrDefault();


                            var SupUserNo = dBcontext.EnrollSuperVisors.Where(t => t.UserId == ticketRequisition.UserNo).Select(s => s.SupervisorId).FirstOrDefault();
                            var SupEmail = dBcontext.Users.Where(t => t.UserNo == SupUserNo).Select(s => s.Email).FirstOrDefault();

                            if (SupEmail == null)
                            {
                                return Json(new { error = true, message = "No Available Supervisor for the user. Email could not be sent." }, JsonRequestBehavior.AllowGet);
                            }

                            string userName = dBcontext.Users.Where(t => t.UserNo == ticketRequisition.UserNo).Select(s => s.FullName).FirstOrDefault();

                            int emailFlag = ticketRequisitionGateway.SendEmailFromUser2(SupEmail, userName, VisaReqText1, dBcontext);

                            if (emailFlag <= 0)
                            {
                                throw new Exception();
                            }


                            int emailFlag2 = ticketRequisitionGateway.SendEmailFromUser3(TravelDeskEmail, userName, VisaReqText1, dBcontext);

                            if (emailFlag2 <= 0)
                            {
                                throw new Exception();
                            }


                            dBcontext.SaveChanges();
                            dbTransaction.Commit();
                            return Json(new { error = false, message = "Updated successfully." }, JsonRequestBehavior.AllowGet);

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


        private void HandleFileAttachments(HttpFileCollectionBase files, int ticketRequisitionId, int userNo, TravelManagementDBcontext dBcontext)
        {

            if (Request.Files.Count == 0)
            {
                TicketRequisitionFiles fileAttach_FS = new TicketRequisitionFiles();
                dBcontext.Entry(fileAttach_FS).Property("location").IsModified = false;

            }

            if (Request.Files.Count > 0)
            {
                for (int i = 0; i < files.Count; i++)
                {
                    if (files.AllKeys[i] == "FilesTD")
                    {
                        HttpPostedFileBase file = files[i];

                        TicketRequisitionFiles fileAttachment = new TicketRequisitionFiles
                        {
                            TicketRequisionId = ticketRequisitionId,
                            FileName = "Files",
                            UserNo = userNo,

                        };

                        try
                        {
                            fileAttachment = SaveOrderFileTD(file, fileAttachment);

                            if (fileAttachment == null || fileAttachment.TicketRequisionId <= 0)
                            {
                                throw new Exception("File saving failed.");
                            }

                            TicketRequisitionGateway ticketRequisitionGateway = new TicketRequisitionGateway();

                            int rowAffected = ticketRequisitionGateway.UpdateTicketRequisitionFilesTD(fileAttachment, dBcontext);

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



        public TicketRequisitionFiles SaveOrderFileTD(HttpPostedFileBase file, TicketRequisitionFiles ticketRequisitionFiles)
        {
            try
            {
                BaseClassUtilitiesNonStatic baseClassUtilitiesNonStatic = new BaseClassUtilitiesNonStatic();

                ticketRequisitionFiles.FileName = "File_" + baseClassUtilitiesNonStatic.RandomString(6) + Path.GetExtension(file.FileName);
                string directoryPath = Server.MapPath("/Files/TicketRequisition");
                if (!Directory.Exists(directoryPath))
                {
                    Directory.CreateDirectory(directoryPath);
                }
                string serverPath = Path.Combine(Server.MapPath("/Files/TicketRequisition"), ticketRequisitionFiles.FileName);
                string location = "/Files/TicketRequisition/" + ticketRequisitionFiles.FileName;
                ticketRequisitionFiles.location = location;
                bool fileExist = System.IO.File.Exists(serverPath);
                if (fileExist)
                {
                    throw new Exception();
                }
                file.SaveAs(serverPath);

                return ticketRequisitionFiles;

            }
            catch (Exception ex)
            {
                return null;
            }
        }



        [HttpPost]
        public ActionResult DeleteTicketRequision(int? Id)
        {

            if (Id == null || Id <= 0)
            {
                return Json(new { error = true, message = "Error! Invalid Request detected." }, JsonRequestBehavior.AllowGet);
            }


            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {

                TicketRequisitionGateway ticketRequisitionGateway = new TicketRequisitionGateway();

                int rowAffected = ticketRequisitionGateway.DeleteTicketRequision(Convert.ToInt16(Id), dBcontext);
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



        public ActionResult DeleteTicketRequisionFileTD(int? Id)
        {
            if (Id == null || Id <= 0)
            {
                return Json(new { error = true, message = "Error! Invalid Request detected." }, JsonRequestBehavior.AllowGet);
            }

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                TicketRequisitionGateway ticketRequisitionGateway = new TicketRequisitionGateway();

                int rowAffected = ticketRequisitionGateway.DeleteTicketRequisionFileTD(Convert.ToInt32(Id), dBcontext);

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
        public ActionResult ShowTicketRequisionPopUp(

         string TicketRequisitionNoText
)
        {
            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                TicketRequisitionGateway ticketRequisitionGateway = new TicketRequisitionGateway();

                var data = ticketRequisitionGateway.ShowTicketRequisionPopUp(
                                                 TicketRequisitionNoText,
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