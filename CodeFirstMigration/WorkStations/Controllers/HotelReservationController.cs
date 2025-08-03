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
    public class HotelReservationController : Controller
    {
        [Route("a/HotelReservation")]


        //Function For EmployeeInformations Page - Session  *
        public ActionResult Index()
        {
            if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            {
                return Redirect("~/admin/sign_in");
            }
            if (!MySession.Current.NavList.Contains("HotelReservation")) // means short name in the menulist db table
            {
                return Json(RequstStatus.Return(RequestStatusType.AccessDenied), JsonRequestBehavior.AllowGet);
            }
            return View("~/WorkStations/Views/HotelReservation/Index.cshtml");
        }



        [HttpPost]
        public ActionResult AddHotelReservation([Bind(Include = "CountryNameUser, CityUser, CheckInDateUserStr, " +
            "CheckOutDateUserStr, RoomTypeUser, PreferedHotelUser, PreferedLocationUser, BudgetUser, EventAddressUser, " +
            "EventDateUserStr, EventTimeUser, SpecialReqUser, LoyaltyProgNo")]  HotelReservation hotelReservation)
        {

            using (TravelManagementDBcontext dbContext = new TravelManagementDBcontext())
            {

                hotelReservation.InsertedBy = MySession.Current.UserNo;
                hotelReservation.UserNo = MySession.Current.UserNo;

                hotelReservation.CheckInDateUser = !string.IsNullOrEmpty(hotelReservation.CheckInDateUserStr)
                    ? DateParse.StringToDateTime(hotelReservation.CheckInDateUserStr)
                    : (DateTime?)null;

                hotelReservation.CheckOutDateUser = !string.IsNullOrEmpty(hotelReservation.CheckOutDateUserStr)
                    ? DateParse.StringToDateTime(hotelReservation.CheckOutDateUserStr)
                    : (DateTime?)null;

                hotelReservation.EventDateUser = !string.IsNullOrEmpty(hotelReservation.EventDateUserStr)
                    ? DateParse.StringToDateTime(hotelReservation.EventDateUserStr)
                    : (DateTime?)null;


                BarcodeGateway barcodeGateway = new BarcodeGateway();
                hotelReservation.HotelReservationNo = barcodeGateway.GenerateBarcodeNo("HotelRes", dbContext);


                string Getyear = DateTime.Now.ToString("yy");
                int Rec_Count = Convert.ToInt16(hotelReservation.HotelReservationNo);
                string Gen_Barcode = "HotelRes-" + Getyear + "-";
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

                hotelReservation.HotelReservationNoText = Gen_Barcode;

                if (hotelReservation.HotelReservationNo == 0)
                {
                    return Json(new { error = true, message = "A generation error has occurred for the barcode number." }, JsonRequestBehavior.AllowGet);
                }


                using (var dbTransaction = dbContext.Database.BeginTransaction())
                {
                    try
                    {
                        BarcodeNo barcodeNo = new BarcodeNo();
                        barcodeNo.BarcodeNoText = hotelReservation.HotelReservationNoText;
                        barcodeNo.CreateDateTime = DateTime.Now;
                        barcodeNo.BarcodeForStatus = "HotelRes";
                        int InsertBarcode = barcodeGateway.AddBarcodeNo(barcodeNo, dbContext);
                        if (InsertBarcode < 1)
                        {
                            throw new Exception("The barcode number was not inserted correctly.");
                        }

                        HotelReservationGateway hotelReservationGateway = new HotelReservationGateway();

                        hotelReservation.Id = hotelReservationGateway.AddHotelReservation(hotelReservation, dbContext);
                        if (hotelReservation.Id <= 0)
                        {
                            throw new Exception("Information saving failed.");
                        }

                        //Email

                        HotelReserveApprovalGateway hotelReserveApprovalGateway = new HotelReserveApprovalGateway();

                        var UserNo = MySession.Current.UserNo;

                        var TravelDeskEmail = dbContext.Users.Where(t => t.UserRoleId == 3).Select(s => s.Email).FirstOrDefault();

                        if (TravelDeskEmail == null)
                        {
                            return Json(new { error = true, message = "No available user assigned for Travel Desk. Email could not be sent" }, JsonRequestBehavior.AllowGet);
                        }

                        var SupUserNo = dbContext.EnrollSuperVisors.Where(t => t.UserId == hotelReservation.UserNo).Select(s => s.SupervisorId).FirstOrDefault();
                        var SupEmail = dbContext.Users.Where(t => t.UserNo == SupUserNo).Select(s => s.Email).FirstOrDefault();

                        if (SupEmail == null)
                        {
                            return Json(new { error = true, message = "No Available Supervisor for the user. Email could not be send" }, JsonRequestBehavior.AllowGet);
                        }

                        string userName = dbContext.Users.Where(t => t.UserNo == hotelReservation.UserNo).Select(s => s.FullName).FirstOrDefault();

                        int emailFlag = hotelReservationGateway.SendEmailFromUser(SupEmail, userName, hotelReservation, dbContext);

                        if (emailFlag <= 0)
                        {
                            throw new Exception();
                        }

                        var HotelResText = dbContext.HotelReservations.Where(t => t.Id == hotelReservation.Id).Select(s => s.HotelReservationNoText).FirstOrDefault();


                        int emailFlag2 = hotelReserveApprovalGateway.SendEmailFromUser(TravelDeskEmail, userName, HotelResText, dbContext);

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
        public ActionResult ShowHotelReservation(
                     int limit,
                     int CompanyId,
                     int DepartmentId,
                     int DesignationId,
                     string HotelReservationNoText,
                     string EmployeeId,
                     int HotelResActiveStatus,
                     int page
                     )
        {
            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                HotelReservationGateway hotelReservationGateway = new HotelReservationGateway();

                var data = hotelReservationGateway.ShowHotelReservation(
                                                 CompanyId,
                                                 DepartmentId,
                                                 DesignationId,
                                                 HotelReservationNoText,
                                                 EmployeeId,
                                                 HotelResActiveStatus,
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
        public ActionResult ShowHotelReservationForEmployee(
             int limit,
             int CompanyId,
             int DepartmentId,
             int DesignationId,
             string HotelReservationNoText,
             string EmployeeId,
             int HotelResActiveStatus,
             string userNo,
             int page
             )
        {
            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                HotelReservationGateway hotelReservationGateway = new HotelReservationGateway();

                var data = hotelReservationGateway.ShowHotelReservationForEmployee(
                                                 CompanyId,
                                                 DepartmentId,
                                                 DesignationId,
                                                 HotelReservationNoText,
                                                 EmployeeId,
                                                 HotelResActiveStatus,
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
        public ActionResult UpdateHotelReservation([Bind(Include = "Id, UserNo, HotelApprovalStatus, ApprovedBy, RejectedBy, CommentsSupervisor, HotelReservationNoText," +
            " CountryNameUser, CityUser, CheckInDateUserStr, " +
            "CheckOutDateUserStr, RoomTypeUser, PreferedHotelUser, PreferedLocationUser, BudgetUser, EventAddressUser, " +
            "EventDateUserStr, EventTimeUser, SpecialReqUser, LoyaltyProgNo, CountryNameTD, CityTD, CheckInDateTDStr, CheckOutDateTDStr, RoomTypeTD," +
            "HotelNameTD, HotelAddressTD")]  HotelReservation hotelReservation)
        {

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {

                hotelReservation.UpdatedBy = MySession.Current.UserNo;


                using (var dbTransaction = dBcontext.Database.BeginTransaction())
                {
                    try
                    {

                        if ((MySession.Current.UserRoleId == 1) || (MySession.Current.UserRoleId == 3))  //Travel Desk = 3
                        {

                            dBcontext.Entry(hotelReservation).State = EntityState.Unchanged;

                            dBcontext.Entry(hotelReservation).Property("CountryNameTD").IsModified = true;
                            dBcontext.Entry(hotelReservation).Property("CityTD").IsModified = true;
                            dBcontext.Entry(hotelReservation).Property("CheckInDateTD").IsModified = true;
                            dBcontext.Entry(hotelReservation).Property("CheckOutDateTD").IsModified = true;
                            dBcontext.Entry(hotelReservation).Property("RoomTypeTD").IsModified = true;
                            dBcontext.Entry(hotelReservation).Property("HotelNameTD").IsModified = true;
                            dBcontext.Entry(hotelReservation).Property("HotelAddressTD").IsModified = true;

                            var CountryCheck = dBcontext.HotelReservations
                                .Where(e => e.HotelReservationNoText == hotelReservation.HotelReservationNoText)
                                .Select(e => e.CountryNameUser)
                                .FirstOrDefault();
                            if (CountryCheck != hotelReservation.CountryNameTD)
                            {
                                return Json(new { error = true, message = "Please enter correct country name to proceed." }, JsonRequestBehavior.AllowGet);
                            }


                            var CityCheck = dBcontext.HotelReservations
                                .Where(e => e.HotelReservationNoText == hotelReservation.HotelReservationNoText)
                                .Select(e => e.CityUser)
                                .FirstOrDefault();
                            if (CityCheck != hotelReservation.CityTD)
                            {
                                return Json(new { error = true, message = "Please enter correct city name to proceed." }, JsonRequestBehavior.AllowGet);
                            }


                            hotelReservation.CheckInDateTD = !string.IsNullOrEmpty(hotelReservation.CheckInDateTDStr)
                            ? DateParse.StringToDateTime(hotelReservation.CheckInDateTDStr)
                            : (DateTime?)null;

                            hotelReservation.CheckOutDateTD = !string.IsNullOrEmpty(hotelReservation.CheckOutDateTDStr)
                            ? DateParse.StringToDateTime(hotelReservation.CheckOutDateTDStr)
                            : (DateTime?)null;


                            HotelReservationGateway hotelReservationGateway = new HotelReservationGateway();

                            //int rowAffected = hotelReservationGateway.UpdateHotelReservation(hotelReservation, dBcontext);
                            //if (rowAffected < 1)
                            //{
                            //    throw new Exception("Information updating failed.");
                            //}

                            hotelReservation.Id = hotelReservationGateway.UpdateHotelReservation(hotelReservation, dBcontext);

                            if (Request.Files.Count > 0)
                            {
                                HandleFileAttachments(Request.Files, hotelReservation.Id, MySession.Current.UserNo, dBcontext);
                            }



                            //Email (TD -> Applicant)

                            var ApplicantNo = hotelReservation.UserNo;
                            var HotelReqText = dBcontext.HotelReservations.Where(t => t.Id == hotelReservation.Id).Select(s => s.HotelReservationNoText).FirstOrDefault();
                            string userEmail = dBcontext.Users.Where(t => t.UserNo == ApplicantNo).Select(s => s.Email).FirstOrDefault();

                            int emailFlag = hotelReservationGateway.SendEmailFromTD(userEmail, HotelReqText, dBcontext);

                            if (emailFlag <= 0)
                            {
                                throw new Exception();
                            }
                        }

                        else if ((MySession.Current.UserRoleId == 1) || (MySession.Current.UserRoleId == 5))  //Employee = 5
                        {

                            dBcontext.Entry(hotelReservation).State = EntityState.Unchanged;

                            dBcontext.Entry(hotelReservation).Property("CountryNameUser").IsModified = true;
                            dBcontext.Entry(hotelReservation).Property("CityUser").IsModified = true;
                            dBcontext.Entry(hotelReservation).Property("CheckInDateUser").IsModified = true;
                            dBcontext.Entry(hotelReservation).Property("CheckOutDateUser").IsModified = true;
                            dBcontext.Entry(hotelReservation).Property("RoomTypeUser").IsModified = true;
                            dBcontext.Entry(hotelReservation).Property("PreferedHotelUser").IsModified = true;
                            dBcontext.Entry(hotelReservation).Property("PreferedLocationUser").IsModified = true;
                            dBcontext.Entry(hotelReservation).Property("BudgetUser").IsModified = true;
                            dBcontext.Entry(hotelReservation).Property("EventAddressUser").IsModified = true;
                            dBcontext.Entry(hotelReservation).Property("EventDateUser").IsModified = true;
                            dBcontext.Entry(hotelReservation).Property("EventTimeUser").IsModified = true;
                            dBcontext.Entry(hotelReservation).Property("SpecialReqUser").IsModified = true;
                            dBcontext.Entry(hotelReservation).Property("LoyaltyProgNo").IsModified = true;

                            dBcontext.Entry(hotelReservation).Property("HotelApprovalStatus").IsModified = true;
                            dBcontext.Entry(hotelReservation).Property("ApprovedBy").IsModified = true;
                            dBcontext.Entry(hotelReservation).Property("RejectedBy").IsModified = true;
                            dBcontext.Entry(hotelReservation).Property("CommentsSupervisor").IsModified = true;


                            hotelReservation.CheckInDateUser = !string.IsNullOrEmpty(hotelReservation.CheckInDateUserStr)
                                ? DateParse.StringToDateTime(hotelReservation.CheckInDateUserStr)
                                : (DateTime?)null;

                            hotelReservation.CheckOutDateUser = !string.IsNullOrEmpty(hotelReservation.CheckOutDateUserStr)
                                ? DateParse.StringToDateTime(hotelReservation.CheckOutDateUserStr)
                                : (DateTime?)null;

                            hotelReservation.EventDateUser = !string.IsNullOrEmpty(hotelReservation.EventDateUserStr)
                                ? DateParse.StringToDateTime(hotelReservation.EventDateUserStr)
                                : (DateTime?)null;


                            hotelReservation.HotelApprovalStatus = ApprovalStatus.IsApproved;
                            //hotelReservation.ApprovedBy = null;
                            //hotelReservation.RejectedBy = null;
                            //hotelReservation.CommentsSupervisor = null;


                            //var CountryCheck = dBcontext.VisaRequisitions
                            //    .Where(e => e.VisaRequisitionNoText == hotelReservation.VisaRequisitionNo)
                            //    .Select(e => e.CountryNameTD)
                            //    .FirstOrDefault();
                            //if (CountryCheck != hotelReservation.CountryNameUser)
                            //{
                            //    return Json(new { error = true, message = "You do not have a visa for the country that you entered." }, JsonRequestBehavior.AllowGet);
                            //}

                            HotelReservationGateway hotelReservationGateway = new HotelReservationGateway();
                            HotelReserveApprovalGateway hotelReserveApprovalGateway = new HotelReserveApprovalGateway();

                            int rowAffected1 = hotelReservationGateway.UpdateHotelReservation(hotelReservation, dBcontext);
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

                            string userName = dBcontext.Users.Where(t => t.UserNo == UserNo).Select(s => s.FullName).FirstOrDefault();
                            var HotelResText = dBcontext.HotelReservations.Where(t => t.Id == hotelReservation.Id).Select(s => s.HotelReservationNoText).FirstOrDefault();

                            var SupUserNo = dBcontext.EnrollSuperVisors.Where(t => t.UserId == hotelReservation.UserNo).Select(s => s.SupervisorId).FirstOrDefault();
                            var SupEmail = dBcontext.Users.Where(t => t.UserNo == SupUserNo).Select(s => s.Email).FirstOrDefault();

                            if (SupEmail == null)
                            {
                                return Json(new { error = true, message = "No Available Supervisor for the user. Email could not be sent." }, JsonRequestBehavior.AllowGet);
                            }

                            var VisaReqText1 = dBcontext.HotelReservations.Where(t => t.Id == hotelReservation.Id).Select(s => s.HotelReservationNoText).FirstOrDefault();

                            //string userName = dBcontext.Users.Where(t => t.UserNo == hotelReservation.UserNo).Select(s => s.FullName).FirstOrDefault();

                            int emailFlag = hotelReservationGateway.SendEmailFromUser2(SupEmail, userName, VisaReqText1, dBcontext);

                            if (emailFlag <= 0)
                            {
                                throw new Exception();
                            }

                            int emailFlag2 = hotelReservationGateway.SendEmailFromUser3(TravelDeskEmail, userName, HotelResText, dBcontext);

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


        private void HandleFileAttachments(HttpFileCollectionBase files, int HotelReservationId, int userNo, TravelManagementDBcontext dBcontext)
        {

            if (Request.Files.Count == 0)
            {
                HotelReservationFiles fileAttach_FS = new HotelReservationFiles();
                dBcontext.Entry(fileAttach_FS).Property("location").IsModified = false;

            }

            if (Request.Files.Count > 0)
            {
                for (int i = 0; i < files.Count; i++)
                {
                    if (files.AllKeys[i] == "FilesTD")
                    {
                        HttpPostedFileBase file = files[i];

                        HotelReservationFiles fileAttachment = new HotelReservationFiles
                        {
                            HotelReservationId = HotelReservationId,
                            FileName = "Files",
                            UserNo = userNo,

                        };

                        try
                        {
                            fileAttachment = SaveOrderFileTD(file, fileAttachment);

                            if (fileAttachment == null || fileAttachment.HotelReservationId <= 0)
                            {
                                throw new Exception("File saving failed.");
                            }

                            HotelReservationGateway hotelReservationGateway = new HotelReservationGateway();

                            int rowAffected = hotelReservationGateway.UpdateHotelRequisitionFilesTD(fileAttachment, dBcontext);

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


        public HotelReservationFiles SaveOrderFileTD(HttpPostedFileBase file, HotelReservationFiles hotelReservationFiles)
        {
            try
            {
                BaseClassUtilitiesNonStatic baseClassUtilitiesNonStatic = new BaseClassUtilitiesNonStatic();

                hotelReservationFiles.FileName = "File_" + baseClassUtilitiesNonStatic.RandomString(6) + Path.GetExtension(file.FileName);
                string directoryPath = Server.MapPath("/Files/HotelReservation");
                if (!Directory.Exists(directoryPath))
                {
                    Directory.CreateDirectory(directoryPath);
                }
                string serverPath = Path.Combine(Server.MapPath("/Files/HotelReservation"), hotelReservationFiles.FileName);
                string location = "/Files/HotelReservation/" + hotelReservationFiles.FileName;
                hotelReservationFiles.location = location;
                bool fileExist = System.IO.File.Exists(serverPath);
                if (fileExist)
                {
                    throw new Exception();
                }
                file.SaveAs(serverPath);

                return hotelReservationFiles;

            }
            catch (Exception ex)
            {
                return null;
            }
        }



        [HttpPost]
        public ActionResult DeleteHotelReservation(int? Id)
        {

            if (Id == null || Id <= 0)
            {
                return Json(new { error = true, message = "Error! Invalid Request detected." }, JsonRequestBehavior.AllowGet);
            }


            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {

                HotelReservationGateway hotelReservationGateway = new HotelReservationGateway();

                int rowAffected = hotelReservationGateway.DeleteHotelReservation(Convert.ToInt16(Id), dBcontext);
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


        public ActionResult DeleteHotelReservationFileTD(int? Id)
        {
            if (Id == null || Id <= 0)
            {
                return Json(new { error = true, message = "Error! Invalid Request detected." }, JsonRequestBehavior.AllowGet);
            }

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                HotelReservationGateway hotelReservationGateway = new HotelReservationGateway();

                int rowAffected = hotelReservationGateway.DeleteHotelReservationFileTD(Convert.ToInt32(Id), dBcontext);

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
        public ActionResult ShowHotelReservationPopUp(
                 string HotelReservationNoText
                )
        {
            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                HotelReservationGateway hotelReservationGateway = new HotelReservationGateway();

                var data = hotelReservationGateway.ShowHotelReservationPopUp(
                                                 HotelReservationNoText,
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