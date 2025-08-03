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
    public class TicketReqApprovalController : Controller
    {
        [Route("a/ticketreqApp")]


        //Function For EmployeeInformations Page - Session  *
        public ActionResult Index()
        {
            if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            {
                return Redirect("~/admin/sign_in");
            }
            if (!MySession.Current.NavList.Contains("ticketreqApp")) // means short name in the menulist db table
            {
                return Json(RequstStatus.Return(RequestStatusType.AccessDenied), JsonRequestBehavior.AllowGet);
            }
            return View("~/WorkStations/Views/TicketApproval/Index.cshtml");
        }



        [HttpPost]
        public ActionResult ShowTicketRequision(
             int limit,
             int CompanyId,
             int DepartmentId,
             int DesignationId,
             string TicketRequisitionNoText,
             string EmployeeId,
             int TicketApprovalStatus,
             int page
             )
        {
            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                TicketApprovalGateway ticketApprovalGateway = new TicketApprovalGateway();

                var data = ticketApprovalGateway.ShowTicketRequision(
                                                 CompanyId,
                                                 DepartmentId,
                                                 DesignationId,
                                                 TicketRequisitionNoText,
                                                 EmployeeId,
                                                 TicketApprovalStatus,
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
        public ActionResult ApproveTicketReqApproval(int? Id)
        {

            if (Id == null || Id <= 0)
            {
                return Json(new { error = true, message = "Error! Invalid Request detected." }, JsonRequestBehavior.AllowGet);
            }


            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {

                TicketApprovalGateway ticketApprovalGateway = new TicketApprovalGateway();

                int rowAffected = ticketApprovalGateway.ApproveTicketReqApproval(Convert.ToInt16(Id), dBcontext);

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
                    var TicketReqText = dBcontext.TicketRequisitions.Where(t => t.Id == Id).Select(s => s.TicketRequisitionNoText).FirstOrDefault();


                    int emailFlag = ticketApprovalGateway.SendEmailFromUser(TravelDeskEmail, userName, TicketReqText, dBcontext);

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



        [HttpPost]
        public ActionResult RejectTicketReqApproval([Bind(Include = "Id, CommentsSupervisor")] TicketRequisition ticketRequisition)
        {

            if (ticketRequisition.Id == 0 || ticketRequisition.Id <= 0)
            {
                return Json(new { error = true, message = "Error! Invalid Request detected." }, JsonRequestBehavior.AllowGet);
            }


            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {

                TicketApprovalGateway ticketApprovalGateway = new TicketApprovalGateway();

                int rowAffected = ticketApprovalGateway.RejectTicketReqApproval(Convert.ToInt16(ticketRequisition.Id), ticketRequisition.CommentsSupervisor, dBcontext);


                if (rowAffected > 0)
                {
                    //Email

                    var UserNo = MySession.Current.UserNo;

                    string userName = dBcontext.Users.Where(t => t.UserNo == UserNo).Select(s => s.FullName).FirstOrDefault();
                    var TicketReqText = dBcontext.TicketRequisitions.Where(t => t.Id == ticketRequisition.Id).Select(s => s.TicketRequisitionNoText).FirstOrDefault();

                    var ApplicantNo = dBcontext.TicketRequisitions.Where(t => t.TicketRequisitionNoText == TicketReqText).Select(s => s.UserNo).FirstOrDefault();

                    var ApplicantEmailEmail = dBcontext.Users.Where(t => t.UserNo == ApplicantNo).Select(s => s.Email).FirstOrDefault();
                    var comment = ticketRequisition.CommentsSupervisor;

                    if (ApplicantEmailEmail == null)
                    {
                        return Json(new { error = true, message = "No available user is assigned. Email could not be sent" }, JsonRequestBehavior.AllowGet);
                    }

                    int emailFlag = ticketApprovalGateway.SendEmailFromUserReject(ApplicantEmailEmail, userName, TicketReqText, dBcontext);

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
                    return Json(new { error = true, message = "ERROR! You have rejected this record already." }, JsonRequestBehavior.AllowGet);
                }

                return Json(new { error = true, message = "Oops!! Operation Failed. Please try again later." }, JsonRequestBehavior.AllowGet);

            }

        }
    }
}