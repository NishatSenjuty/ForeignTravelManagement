using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TravelManagement.Context;
using TravelManagement.Gateway;
using TravelManagement.Models;
using TravelManagement.Utilities;

namespace TravelManagement.WorkStations.Controllers
{
    public class TRFApprovalController : Controller
    {
        [Route("a/BudgetForm")]


        //Function For EmployeeInformations Page - Session  *
        public ActionResult Index()
        {
            if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            {
                return Redirect("~/admin/sign_in");
            }
            if (!MySession.Current.NavList.Contains("BudgetForm")) // means short name in the menulist db table
            {
                return Json(RequstStatus.Return(RequestStatusType.AccessDenied), JsonRequestBehavior.AllowGet);
            }
            return View("~/WorkStations/Views/BudgetApproval/Index.cshtml");
        }



        [HttpPost]
        public ActionResult ShowTRFApprovalSup(
                    int limit,
                    int CompanyId,
                    int DepartmentId,
                    int DesignationId,
                    string TRFNoText,
                    string EmployeeId,
                    int TicketApprovalStatusSupervisor,
                    int TicketApprovalStatusManagement,
                    int page
                    )
        {
            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                TRFApprovalGateway tRFApprovalGateway = new TRFApprovalGateway();

                var data = tRFApprovalGateway.ShowTRFApprovalSup(
                                                 CompanyId,
                                                 DepartmentId,
                                                 DesignationId,
                                                 TRFNoText,
                                                 EmployeeId,
                                                 TicketApprovalStatusSupervisor, 
                                                 TicketApprovalStatusManagement,
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
        public ActionResult ShowTRFApprovalMan(
            int limit,
            int CompanyId,
            int DepartmentId,
            int DesignationId,
            string TRFNoText,
            string EmployeeId,
            int TicketApprovalStatusSupervisor,
            int TicketApprovalStatusManagement,
            int page
            )
        {
            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                TRFApprovalGateway tRFApprovalGateway = new TRFApprovalGateway();

                var data = tRFApprovalGateway.ShowTRFApprovalMan(
                                                 CompanyId,
                                                 DepartmentId,
                                                 DesignationId,
                                                 TRFNoText,
                                                 EmployeeId,
                                                 TicketApprovalStatusSupervisor,
                                                 TicketApprovalStatusManagement,
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
        public ActionResult ShowTRFApprovalTravelDesk(
                int limit,
                int CompanyId,
                int DepartmentId,
                int DesignationId,
                string TRFNoText,
                string EmployeeId,
                int TicketApprovalStatusSupervisor,
                int TicketApprovalStatusManagement,
                int page
                )
        {
            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                TRFApprovalGateway tRFApprovalGateway = new TRFApprovalGateway();

                var data = tRFApprovalGateway.ShowTRFApprovalTravelDesk(
                                                 CompanyId,
                                                 DepartmentId,
                                                 DesignationId,
                                                 TRFNoText,
                                                 EmployeeId,
                                                 TicketApprovalStatusSupervisor,
                                                 TicketApprovalStatusManagement,
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
        public ActionResult ApproveTRFApproval(int? Id)
        {
            int userRole = MySession.Current.UserRoleId;

            if (userRole != 2 && userRole != 4)
            {
                return Json(new { error = true, message = "You are not authorized to approve any TRF." }, JsonRequestBehavior.AllowGet);
            }


            if (Id == null || Id <= 0)
            {
                return Json(new { error = true, message = "Error! Invalid Request detected." }, JsonRequestBehavior.AllowGet);
            }


            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {

                TRFApprovalGateway tRFApprovalGateway = new TRFApprovalGateway();

                //Email

                var UserNo = MySession.Current.UserNo;

                string userName = dBcontext.Users.Where(t => t.UserNo == UserNo).Select(s => s.FullName).FirstOrDefault();
                var TRFText = dBcontext.BudgetFormTRFMasters.Where(t => t.Id == Id).Select(s => s.TRFNoText).FirstOrDefault();

                var ApplicantNo = dBcontext.BudgetFormTRFMasters.Where(t => t.TRFNoText == TRFText).Select(s => s.UserNo).FirstOrDefault();

                var ApplicantEmail = dBcontext.Users.Where(t => t.UserNo == ApplicantNo).Select(s => s.Email).FirstOrDefault();

                var ManagementUserEmail = dBcontext.Users.Where(t => t.UserRoleId == 4).Select(s => s.Email).FirstOrDefault();

                var AccountsUserEmail = dBcontext.Users.Where(t => t.UserRoleId == 6).Select(s => s.Email).FirstOrDefault();


                if (ApplicantEmail == null)
                {
                    return Json(new { error = true, message = "No available user is assigned. Email could not be sent" }, JsonRequestBehavior.AllowGet);
                }

                int rowAffected = tRFApprovalGateway.ApproveTRFApproval(Convert.ToInt16(Id), ApplicantEmail, userName, TRFText, ManagementUserEmail, AccountsUserEmail, dBcontext);
                if (rowAffected > 0)
                {
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
        public ActionResult RejectTRFApproval([Bind(Include = "Id, CommentsSupervisor, CommentsManagement")] BudgetFormTRFMaster budgetFormTRFMaster)
        {

            int userRole = MySession.Current.UserRoleId;

            if (userRole != 2 && userRole != 4)
            {
                return Json(new { error = true, message = "You are not authorized to reject any TRF." }, JsonRequestBehavior.AllowGet);
            }

            if (budgetFormTRFMaster.Id == 0 || budgetFormTRFMaster.Id <= 0)
            {
                return Json(new { error = true, message = "Error! Invalid Request detected." }, JsonRequestBehavior.AllowGet);
            }


            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {

                TRFApprovalGateway tRFApprovalGateway = new TRFApprovalGateway();

                //Email

                var UserNo = MySession.Current.UserNo;

                string userName = dBcontext.Users.Where(t => t.UserNo == UserNo).Select(s => s.FullName).FirstOrDefault();
                var TRFText = dBcontext.BudgetFormTRFMasters.Where(t => t.Id == budgetFormTRFMaster.Id).Select(s => s.TRFNoText).FirstOrDefault();

                var ApplicantNo = dBcontext.BudgetFormTRFMasters.Where(t => t.TRFNoText == TRFText).Select(s => s.UserNo).FirstOrDefault();

                var ApplicantEmail = dBcontext.Users.Where(t => t.UserNo == ApplicantNo).Select(s => s.Email).FirstOrDefault();

                var ManagementUserEmail = dBcontext.Users.Where(t => t.UserRoleId == 4).Select(s => s.Email).FirstOrDefault();


                if (ApplicantEmail == null)
                {
                    return Json(new { error = true, message = "No available user is assigned. Email could not be sent" }, JsonRequestBehavior.AllowGet);
                }


                int rowAffected = tRFApprovalGateway.RejectTRFApproval(Convert.ToInt16(budgetFormTRFMaster.Id), budgetFormTRFMaster.CommentsSupervisor,
                    budgetFormTRFMaster.CommentsManagement, ApplicantEmail, userName, TRFText, dBcontext);


                if (rowAffected > 0)
                {

                    return Json(new { error = false, message = "Rejected!!" }, JsonRequestBehavior.AllowGet);
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