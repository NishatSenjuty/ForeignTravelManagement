using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TravelManagement.Context;
using TravelManagement.Gateway;
using TravelManagement.Models;
using TravelManagement.Utilities;

namespace CodeFirstMigration.WorkStations.Controllers
{
    public class VisaApprovalController : Controller
    {
        [Route("a/VisaReqApp")]


        //Function For EmployeeInformations Page - Session  *
        public ActionResult Index()
        {
            if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            {
                return Redirect("~/admin/sign_in");
            }
            if (!MySession.Current.NavList.Contains("VisaReqApp")) // means short name in the menulist db table
            {
                return Json(RequstStatus.Return(RequestStatusType.AccessDenied), JsonRequestBehavior.AllowGet);
            }
            return View("~/WorkStations/Views/VisaApproval/Index.cshtml");
        }




        [HttpPost]
        public ActionResult ShowVisaRequisition(
             int limit,
             int CompanyId,
             int DepartmentId,
             int DesignationId,
             string VisaRequisitionNoText,
             string EmployeeId,
             int VisaApprovalStatus,
             int page
             )
        {
            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
               
                    VisaApprovalGateway visaApprovalGateway = new VisaApprovalGateway();

                var data = visaApprovalGateway.ShowVisaRequisition(
                                                 CompanyId,
                                                 DepartmentId,
                                                 DesignationId,
                                                 VisaRequisitionNoText,
                                                 EmployeeId,
                                                 VisaApprovalStatus,
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
        public ActionResult ApproveVisaApproval(int? Id)
        {

            if (Id == null || Id <= 0)
            {
                return Json(new { error = true, message = "Error! Invalid Request detected." }, JsonRequestBehavior.AllowGet);
            }


            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {

                VisaApprovalGateway visaApprovalGateway = new VisaApprovalGateway();

                int rowAffected = visaApprovalGateway.ApproveVisaApproval(Convert.ToInt16(Id), dBcontext);

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
                    var VisaReqText = dBcontext.VisaRequisitions.Where(t => t.Id == Id).Select(s => s.VisaRequisitionNoText).FirstOrDefault();


                    int emailFlag = visaApprovalGateway.SendEmailFromUser(TravelDeskEmail, userName, VisaReqText, dBcontext);

                    if (emailFlag <= 0)
                    {
                        throw new Exception("Email couldn't be sent.");
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
        public ActionResult RejectVisaApproval([Bind(Include = "Id, CommentsSupervisor")]  VisaRequisition visaRequisition)
        {

            if (visaRequisition.Id == 0 || visaRequisition.Id <= 0)
            {
                return Json(new { error = true, message = "Error! Invalid Request detected." }, JsonRequestBehavior.AllowGet);
            }


            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {

                VisaApprovalGateway visaApprovalGateway = new VisaApprovalGateway();

                int rowAffected = visaApprovalGateway.RejectVisaApproval(Convert.ToInt16(visaRequisition.Id), visaRequisition.CommentsSupervisor, dBcontext);


                if (rowAffected > 0)
                {
                    //Email

                    var UserNo = MySession.Current.UserNo;

                    string userName = dBcontext.Users.Where(t => t.UserNo == UserNo).Select(s => s.FullName).FirstOrDefault();
                    var VisaReqText = dBcontext.VisaRequisitions.Where(t => t.Id == visaRequisition.Id).Select(s => s.VisaRequisitionNoText).FirstOrDefault();

                    var ApplicantNo = dBcontext.VisaRequisitions.Where(t => t.VisaRequisitionNoText == VisaReqText).Select(s => s.UserNo).FirstOrDefault();

                    var ApplicantEmailEmail = dBcontext.Users.Where(t => t.UserNo == ApplicantNo).Select(s => s.Email).FirstOrDefault();
                    var comment = visaRequisition.CommentsSupervisor;

                    if (ApplicantEmailEmail == null)
                    {
                        return Json(new { error = true, message = "No available user is assigned. Email could not be sent" }, JsonRequestBehavior.AllowGet);
                    }

                    int emailFlag = visaApprovalGateway.SendEmailFromUserReject(ApplicantEmailEmail, userName, VisaReqText, dBcontext);

                    if (emailFlag <= 0)
                    {
                        throw new Exception("Email couldn't be sent.");
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