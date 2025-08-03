using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TravelManagement.Context;
using TravelManagement.Gateway;
using TravelManagement.Models;
using TravelManagement.Utilities;

namespace CodeFirstMigration.WorkStations.Controllers
{
    public class HotelReservApprovalController : Controller
    {
        [Route("a/HotelResApp")]


        //Function For EmployeeInformations Page - Session  *
        public ActionResult Index()
        {
            if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            {
                return Redirect("~/admin/sign_in");
            }
            if (!MySession.Current.NavList.Contains("HotelResApp")) // means short name in the menulist db table
            {
                return Json(RequstStatus.Return(RequestStatusType.AccessDenied), JsonRequestBehavior.AllowGet);
            }
            return View("~/WorkStations/Views/HotelReserveApproval/Index.cshtml");
        }


        [HttpPost]
        public ActionResult ShowHotelReservApproval(
             int limit,
             int CompanyId,
             int DepartmentId,
             int DesignationId,
             string HotelReservationNoText,
             string EmployeeId,
             int HotelApprovalStatus,
             int page
             )
        {
            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                HotelReserveApprovalGateway hotelReserveApprovalGateway = new HotelReserveApprovalGateway();

                var data = hotelReserveApprovalGateway.ShowHotelReservApproval(
                                                 CompanyId,
                                                 DepartmentId,
                                                 DesignationId,
                                                 HotelReservationNoText,
                                                 EmployeeId,
                                                 HotelApprovalStatus,
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
        public ActionResult ApproveHotelReservApproval(int? Id)
        {

            if (Id == null || Id <= 0)
            {
                return Json(new { error = true, message = "Error! Invalid Request detected." }, JsonRequestBehavior.AllowGet);
            }


            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {

                HotelReserveApprovalGateway hotelReserveApprovalGateway = new HotelReserveApprovalGateway();

                int rowAffected = hotelReserveApprovalGateway.ApproveHotelReservApproval(Convert.ToInt16(Id), dBcontext);


                if (rowAffected > 0)
                {
                    //Email

                    var UserNo = MySession.Current.UserNo;

                    var TravelDeskEmail = dBcontext.Users.Where(t => t.UserRoleId == 3).Select(s => s.Email).FirstOrDefault();

                    if (TravelDeskEmail == null)
                    {
                        return Json(new { error = true, message = "No available user assigned for Travel Desk. Email could not be sent" }, JsonRequestBehavior.AllowGet);
                    }

                    string userName = dBcontext.Users.Where(t => t.UserNo == UserNo).Select(s => s.FullName).FirstOrDefault();
                    var HotelResText = dBcontext.HotelReservations.Where(t => t.Id == Id).Select(s => s.HotelReservationNoText).FirstOrDefault();


                    int emailFlag = hotelReserveApprovalGateway.SendEmailFromUser(TravelDeskEmail, userName, HotelResText, dBcontext);

                    if (emailFlag <= 0)
                    {
                        throw new Exception();
                    }


                    return Json(new { error = false, message = "Approved Successfully." }, JsonRequestBehavior.AllowGet);
                }
                else if (rowAffected == -3)
                {
                    return Json(new { error = true, message = "ERROR! Invalid Request Detected. Operation Unsuccessful." }, JsonRequestBehavior.AllowGet);
                }
                else if (rowAffected == -4)
                {
                    return Json(new { error = true, message = "ERROR! You have approved this record already." }, JsonRequestBehavior.AllowGet);
                }

                return Json(new { error = true, message = "Oops!! Operation Failed. Please try again later." }, JsonRequestBehavior.AllowGet);

            }

        }



        //[HttpPost]
        //public ActionResult RejectHotelReservApproval(int? Id)
        //{

        //    if (Id == null || Id <= 0)
        //    {
        //        return Json(new { error = true, message = "Error! Invalid Request detected." }, JsonRequestBehavior.AllowGet);
        //    }


        //    using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
        //    {

        //        HotelReserveApprovalGateway hotelReserveApprovalGateway = new HotelReserveApprovalGateway();

        //        int rowAffected = hotelReserveApprovalGateway.RejectHotelReservApproval(Convert.ToInt16(Id), dBcontext);


        //        if (rowAffected > 0)
        //        {

        //            //Email

        //            var UserNo = MySession.Current.UserNo;

        //            string userName = dBcontext.Users.Where(t => t.UserNo == UserNo).Select(s => s.FullName).FirstOrDefault();
        //            var hotelReqText = dBcontext.HotelReservations.Where(t => t.Id == Id).Select(s => s.HotelReservationNoText).FirstOrDefault();

        //            var ApplicantNo = dBcontext.HotelReservations.Where(t => t.HotelReservationNoText == hotelReqText).Select(s => s.UserNo).FirstOrDefault();

        //            var ApplicantEmailEmail = dBcontext.Users.Where(t => t.UserNo == ApplicantNo).Select(s => s.Email).FirstOrDefault();

        //            if (ApplicantEmailEmail == null)
        //            {
        //                return Json(new { error = true, message = "No available applicant is assigned. Email could not be sent" }, JsonRequestBehavior.AllowGet);
        //            }

        //            int emailFlag = hotelReserveApprovalGateway.SendEmailFromUserReject(ApplicantEmailEmail, userName, hotelReqText, dBcontext);

        //            if (emailFlag <= 0)
        //            {
        //                throw new Exception();
        //            }

        //            return Json(new { error = false, message = "Approved Successfully." }, JsonRequestBehavior.AllowGet);
        //        }
        //        else if (rowAffected == -3)
        //        {
        //            return Json(new { error = true, message = "ERROR! Invalid Request Detected. Operation Unsuccessful." }, JsonRequestBehavior.AllowGet);
        //        }
        //        else if (rowAffected == -4)
        //        {
        //            return Json(new { error = true, message = "ERROR! You have rejected this record already." }, JsonRequestBehavior.AllowGet);
        //        }

        //        return Json(new { error = true, message = "Oops!! Operation Failed. Please try again later." }, JsonRequestBehavior.AllowGet);

        //    }

        //}




        [HttpPost]
        public ActionResult RejectHotelReservApproval([Bind(Include = "Id, CommentsSupervisor")] HotelReservation hotelReservation)
        {

            if (hotelReservation.Id == 0 || hotelReservation.Id <= 0)
            {
                return Json(new { error = true, message = "Error! Invalid Request detected." }, JsonRequestBehavior.AllowGet);
            }


            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {

                HotelReserveApprovalGateway hotelReserveApprovalGateway = new HotelReserveApprovalGateway();

                int rowAffected = hotelReserveApprovalGateway.RejectHotelReservApproval(Convert.ToInt16(hotelReservation.Id),
                    hotelReservation.CommentsSupervisor, dBcontext);


                if (rowAffected > 0)
                {
                    //Email

                    var UserNo = MySession.Current.UserNo;

                    string userName = dBcontext.Users.Where(t => t.UserNo == UserNo).Select(s => s.FullName).FirstOrDefault();
                    var HotReqText = dBcontext.HotelReservations.Where(t => t.Id == hotelReservation.Id).Select(s => s.HotelReservationNoText).FirstOrDefault();

                    var ApplicantNo = dBcontext.HotelReservations.Where(t => t.HotelReservationNoText == HotReqText).Select(s => s.UserNo).FirstOrDefault();

                    var ApplicantEmailEmail = dBcontext.Users.Where(t => t.UserNo == ApplicantNo).Select(s => s.Email).FirstOrDefault();
                    var comment = hotelReservation.CommentsSupervisor;

                    if (ApplicantEmailEmail == null)
                    {
                        return Json(new { error = true, message = "No available user is assigned. Email could not be sent" }, JsonRequestBehavior.AllowGet);
                    }

                    int emailFlag = hotelReserveApprovalGateway.SendEmailFromUserReject(ApplicantEmailEmail, userName, HotReqText, dBcontext);

                    if (emailFlag <= 0)
                    {
                        throw new Exception();
                    }


                    return Json(new { error = false, message = "Rejected Successfully." }, JsonRequestBehavior.AllowGet);
                }
                else if (rowAffected == -3)
                {
                    return Json(new { error = true, message = "ERROR! Invalid Request Detected. Operation Unsuccessful." }, JsonRequestBehavior.AllowGet);
                }
                else if (rowAffected == -4)
                {
                    return Json(new { error = true, message = "ERROR! You have rejected this record already." }, JsonRequestBehavior.AllowGet);
                }

                return Json(new { error = true, message = "Oops!! Operation Failed. Please try again later." }, JsonRequestBehavior.AllowGet);

            }

        }
    }
}