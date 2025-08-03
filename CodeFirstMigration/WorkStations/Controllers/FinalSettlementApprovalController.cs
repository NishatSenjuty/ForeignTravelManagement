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
    public class FinalSettlementApprovalController : Controller
    {
        [Route("a/finalSettlementApp")]


        //Function For EmployeeInformations Page - Session  *
        public ActionResult Index()
        {
            if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            {
                return Redirect("~/admin/sign_in");
            }
            if (!MySession.Current.NavList.Contains("finalSettlementApp")) // means short name in the menulist db table
            {
                return Json(RequstStatus.Return(RequestStatusType.AccessDenied), JsonRequestBehavior.AllowGet);
            }
            return View("~/WorkStations/Views/FinalSettlementApproval/Index.cshtml");
        }


        //Supervisor

        [HttpPost]
        public ActionResult ShowFinalSettlementSup(
                 int CompanyId,
                 int DepartmentId,
                 int DesignationId,
                 string TRFNo,
                 int ApprovalStatusSup
                 )
        {
            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                FinalSettlementApprovalGateway finalSettlementApprovalGateway = new FinalSettlementApprovalGateway();

                var data = finalSettlementApprovalGateway.ShowFinalSettlementSup(
                                                 CompanyId,
                                                 DepartmentId,
                                                 DesignationId,
                                                 TRFNo,
                                                 ApprovalStatusSup,
                                                 dBcontext);

                if (data == null)
                {
                    return Json(new { error = true, message = "Data Not Found." }, JsonRequestBehavior.AllowGet);
                }

                return Json(data);

            }
        }



        //Audit


        [HttpPost]
        public ActionResult ShowFinalSettlement(
         int CompanyId,
         int DepartmentId,
         int DesignationId,
         string TRFNo,
         string VisaRequisitionNo,
         int FSApprovalStatusAudit
         )
        {
            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                FinalSettlementApprovalGateway finalSettlementApprovalGateway = new FinalSettlementApprovalGateway();

                var data = finalSettlementApprovalGateway.ShowFinalSettlement(
                                                 CompanyId,
                                                 DepartmentId,
                                                 DesignationId,
                                                 TRFNo,
                                                 VisaRequisitionNo,
                                                 FSApprovalStatusAudit,
                                                 dBcontext);

                if (data == null)
                {
                    return Json(new { error = true, message = "Data Not Found." }, JsonRequestBehavior.AllowGet);
                }

                return Json(data);

            }
        }


        //Approved by Audit
        public ActionResult ApproveTRFApproval([Bind(Include = "Id, RemarksFSapproval, ApprovedFSamount, TRFNo")] FinalSettlement finalSettlement)
        {
            if (finalSettlement.Id == 0 || finalSettlement.Id <= 0)
            {
                return Json(new { error = true, message = "Error! Invalid Request detected." }, JsonRequestBehavior.AllowGet);
            }

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                using (var dbTransaction = dBcontext.Database.BeginTransaction())
                {
                    try
                    {
                        FinalSettlementApprovalGateway finalSettlementApprovalGateway = new FinalSettlementApprovalGateway();

                        //Email to Management

                        var UserNo = MySession.Current.UserNo;

                        string userName = dBcontext.Users.Where(t => t.UserNo == UserNo).Select(s => s.FullName).FirstOrDefault();

                        var TRFText = dBcontext.BudgetFormTRFMasters.Where(t => t.TRFNoText == finalSettlement.TRFNo).Select(s => s.TRFNoText).FirstOrDefault();

                        //var ApplicantNo = dBcontext.BudgetFormTRFMasters.Where(t => t.TRFNoText == TRFText).Select(s => s.UserNo).FirstOrDefault();

                        //var ApplicantEmail = dBcontext.Users.Where(t => t.UserNo == ApplicantNo).Select(s => s.Email).FirstOrDefault();

                        var ManagementUserEmail = dBcontext.Users.Where(t => t.UserRoleId == 4).Select(s => s.Email).FirstOrDefault();


                        finalSettlement.Id = finalSettlementApprovalGateway.ApproveTRFApproval(finalSettlement.Id, finalSettlement.RemarksFSapproval, 
                            finalSettlement.ApprovedFSamount, userName, TRFText,  ManagementUserEmail, dBcontext);

                        if (finalSettlement.Id <= 0)
                        {
                            throw new Exception("Information saving failed.");
                        }

                        dBcontext.SaveChanges();
                        dbTransaction.Commit();

                        return Json(new { error = false, message = "Order saved successfully." }, JsonRequestBehavior.AllowGet);
                    }
                    catch (Exception ex)
                    {
                        dbTransaction.Rollback();
                        return Json(new { error = true, message = "Oops! Order is not saved. Please try again later. " + ex.Message }, JsonRequestBehavior.AllowGet);
                    }
                }
            }
        }



        //Rejected by Audit
        public ActionResult RejectTRFApproval([Bind(Include = "Id, RemarksFSapproval, ApprovedFSamount, TRFNo")] FinalSettlement finalSettlement)
        {
            if (finalSettlement.Id == 0 || finalSettlement.Id <= 0)
            {
                return Json(new { error = true, message = "Error! Invalid Request detected." }, JsonRequestBehavior.AllowGet);
            }

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                using (var dbTransaction = dBcontext.Database.BeginTransaction())
                {
                    try
                    {
                        FinalSettlementApprovalGateway finalSettlementApprovalGateway = new FinalSettlementApprovalGateway();

                        //Email to User

                        var UserNo = MySession.Current.UserNo;

                        string userName = dBcontext.Users.Where(t => t.UserNo == UserNo).Select(s => s.FullName).FirstOrDefault();

                        var TRFText = dBcontext.BudgetFormTRFMasters.Where(t => t.TRFNoText == finalSettlement.TRFNo).Select(s => s.TRFNoText).FirstOrDefault();

                        var ApplicantNo = dBcontext.BudgetFormTRFMasters.Where(t => t.TRFNoText == TRFText).Select(s => s.UserNo).FirstOrDefault();

                        var ApplicantEmail = dBcontext.Users.Where(t => t.UserNo == ApplicantNo).Select(s => s.Email).FirstOrDefault();

                        //var ManagementUserEmail = dBcontext.Users.Where(t => t.UserRoleId == 4).Select(s => s.Email).FirstOrDefault();


                        finalSettlement.Id = finalSettlementApprovalGateway.RejectTRFApproval(finalSettlement.Id, finalSettlement.RemarksFSapproval,
                            finalSettlement.ApprovedFSamount, userName, TRFText, ApplicantEmail, dBcontext);

                        if (finalSettlement.Id <= 0)
                        {
                            throw new Exception("Information saving failed.");
                        }

                        dBcontext.SaveChanges();
                        dbTransaction.Commit();

                        return Json(new { error = false, message = "Order saved successfully." }, JsonRequestBehavior.AllowGet);
                    }
                    catch (Exception ex)
                    {
                        dbTransaction.Rollback();
                        return Json(new { error = true, message = "Oops! Order is not saved. Please try again later. " + ex.Message }, JsonRequestBehavior.AllowGet);
                    }
                }
            }
        }




        [HttpPost]
        public ActionResult ShowFinalSettlementManagement(
                     int CompanyId,
                     int DepartmentId,
                     int DesignationId,
                     string TRFNo,
                     string VisaRequisitionNo,
                     int FSApprovalStatusManagement
                     )
        {
            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                FinalSettlementApprovalGateway finalSettlementApprovalGateway = new FinalSettlementApprovalGateway();

                var data = finalSettlementApprovalGateway.ShowFinalSettlementManagement(
                                                 CompanyId,
                                                 DepartmentId,
                                                 DesignationId,
                                                 TRFNo,
                                                 VisaRequisitionNo,
                                                 FSApprovalStatusManagement,
                                                 dBcontext);

                if (data == null)
                {
                    return Json(new { error = true, message = "Data Not Found." }, JsonRequestBehavior.AllowGet);
                }

                return Json(data);

            }
        }


        //Approved by Management

        [HttpPost]

        public ActionResult ApproveFinalSettlementApproval([Bind(Include = "Id, TRFNo")] FinalSettlement finalSettlement)
        {

            if (finalSettlement.Id == 0 || finalSettlement.Id <= 0)
            {
                return Json(new { error = true, message = "Error! Invalid Request detected." }, JsonRequestBehavior.AllowGet);
            }


            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {

                FinalSettlementApprovalGateway finalSettlementApprovalGateway = new FinalSettlementApprovalGateway();


                //Email

                var UserNo = MySession.Current.UserNo;

                string userName = dBcontext.Users.Where(t => t.UserNo == UserNo).Select(s => s.FullName).FirstOrDefault();

                var TRFText = dBcontext.BudgetFormTRFMasters.Where(t => t.TRFNoText == finalSettlement.TRFNo).Select(s => s.TRFNoText).FirstOrDefault();

                var ApplicantNo = dBcontext.BudgetFormTRFMasters.Where(t => t.TRFNoText == TRFText).Select(s => s.UserNo).FirstOrDefault();

                var ApplicantEmail = dBcontext.Users.Where(t => t.UserNo == ApplicantNo).Select(s => s.Email).FirstOrDefault();

                var AccountsUserEmail = dBcontext.Users.Where(t => t.UserRoleId == 6).Select(s => s.Email).FirstOrDefault();

                if (ApplicantEmail == null)
                {
                    return Json(new { error = true, message = "No available user is assigned. Email could not be sent" }, JsonRequestBehavior.AllowGet);
                }

                if (AccountsUserEmail == null)
                {
                    return Json(new { error = true, message = "No available user is assigned. Email could not be sent" }, JsonRequestBehavior.AllowGet);
                }



                int rowAffected = finalSettlementApprovalGateway.ApproveFinalSettlementApproval(Convert.ToInt16(finalSettlement.Id), userName, TRFText,
                    AccountsUserEmail, ApplicantEmail,  dBcontext);

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

        //Rejected by Management

        [HttpPost]
        public ActionResult RejectFinalSettlementApproval([Bind(Include = "Id, CommentsManagement, TRFNo")] FinalSettlement finalSettlement)
        {

            if (finalSettlement.Id == 0 || finalSettlement.Id <= 0)
            {
                return Json(new { error = true, message = "Error! Invalid Request detected." }, JsonRequestBehavior.AllowGet);
            }


            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {

                FinalSettlementApprovalGateway finalSettlementApprovalGateway = new FinalSettlementApprovalGateway();

                //Email

                var UserNo = MySession.Current.UserNo;

                string userName = dBcontext.Users.Where(t => t.UserNo == UserNo).Select(s => s.FullName).FirstOrDefault();

                var TRFText = dBcontext.BudgetFormTRFMasters.Where(t => t.TRFNoText == finalSettlement.TRFNo).Select(s => s.TRFNoText).FirstOrDefault();

                var ApplicantNo = dBcontext.BudgetFormTRFMasters.Where(t => t.TRFNoText == TRFText).Select(s => s.UserNo).FirstOrDefault();

                var ApplicantEmail = dBcontext.Users.Where(t => t.UserNo == ApplicantNo).Select(s => s.Email).FirstOrDefault();

                var AuditUserEmail = dBcontext.Users.Where(t => t.UserRoleId == 7).Select(s => s.Email).FirstOrDefault();


                if (ApplicantEmail == null)
                {
                    return Json(new { error = true, message = "No available user is assigned. Email could not be sent" }, JsonRequestBehavior.AllowGet);
                }

                int rowAffected = finalSettlementApprovalGateway.RejectFinalSettlementApproval(Convert.ToInt16(finalSettlement.Id), 
                    finalSettlement.CommentsManagement, ApplicantEmail, AuditUserEmail, userName, TRFText,  dBcontext);

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
                    return Json(new { error = true, message = "ERROR! You have rejected this record already." }, JsonRequestBehavior.AllowGet);
                }

                return Json(new { error = true, message = "Oops!! Operation Failed. Please try again later." }, JsonRequestBehavior.AllowGet);

            }

        }





        //Approved by Supervisor
        public ActionResult ApproveTRFApprovalSup([Bind(Include = "Id, TRFNo")] FinalSettlement finalSettlement)
        {
            if (finalSettlement.Id == 0 || finalSettlement.Id <= 0)
            {
                return Json(new { error = true, message = "Error! Invalid Request detected." }, JsonRequestBehavior.AllowGet);
            }

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                using (var dbTransaction = dBcontext.Database.BeginTransaction())
                {
                    try
                    {
                        FinalSettlementApprovalGateway finalSettlementApprovalGateway = new FinalSettlementApprovalGateway();

                        //Email to Audit 


                        var TRFText = dBcontext.BudgetFormTRFMasters.Where(t => t.TRFNoText == finalSettlement.TRFNo).Select(s => s.TRFNoText).FirstOrDefault();


                        var AuditEmail = dBcontext.Users.Where(t => t.UserRoleId == 7).Select(s => s.Email).FirstOrDefault();

                        if (AuditEmail == null)
                        {
                            return Json(new { error = true, message = "There are currently no individuals available for the audit department. The email could not be sent." }, JsonRequestBehavior.AllowGet);
                        }

                        string userName = dBcontext.Users.Where(t => t.UserNo == finalSettlement.UserNo).Select(s => s.FullName).FirstOrDefault();


                        finalSettlement.Id = finalSettlementApprovalGateway.ApproveTRFApprovalSup(finalSettlement.Id, userName, TRFText, AuditEmail, dBcontext);

                        if (finalSettlement.Id <= 0)
                        {
                            throw new Exception("Information saving failed.");
                        }

                        dBcontext.SaveChanges();
                        dbTransaction.Commit();

                        return Json(new { error = false, message = "Order saved successfully." }, JsonRequestBehavior.AllowGet);
                    }
                    catch (Exception ex)
                    {
                        dbTransaction.Rollback();
                        return Json(new { error = true, message = "Oops! Order is not saved. Please try again later. " + ex.Message }, JsonRequestBehavior.AllowGet);
                    }
                }
            }
        }



        //Rejected by Supervisor
        public ActionResult RejectTRFApprovalSup([Bind(Include = "Id, TRFNo, CommentsSupervisor")] FinalSettlement finalSettlement)
        {
            if (finalSettlement.Id == 0 || finalSettlement.Id <= 0)
            {
                return Json(new { error = true, message = "Error! Invalid Request detected." }, JsonRequestBehavior.AllowGet);
            }

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                using (var dbTransaction = dBcontext.Database.BeginTransaction())
                {
                    try
                    {
                        FinalSettlementApprovalGateway finalSettlementApprovalGateway = new FinalSettlementApprovalGateway();

                        //Email to User

                        var UserNo = MySession.Current.UserNo;

                        string userName = dBcontext.Users.Where(t => t.UserNo == UserNo).Select(s => s.FullName).FirstOrDefault();

                        var TRFText = dBcontext.BudgetFormTRFMasters.Where(t => t.TRFNoText == finalSettlement.TRFNo).Select(s => s.TRFNoText).FirstOrDefault();

                        var ApplicantNo = dBcontext.BudgetFormTRFMasters.Where(t => t.TRFNoText == TRFText).Select(s => s.UserNo).FirstOrDefault();

                        var ApplicantEmail = dBcontext.Users.Where(t => t.UserNo == ApplicantNo).Select(s => s.Email).FirstOrDefault();

                        finalSettlement.Id = finalSettlementApprovalGateway.RejectTRFApprovalSup(finalSettlement.Id, finalSettlement.CommentsSupervisor,
                             userName, TRFText, ApplicantEmail, dBcontext);

                        if (finalSettlement.Id <= 0)
                        {
                            throw new Exception("Information saving failed.");
                        }

                        dBcontext.SaveChanges();
                        dbTransaction.Commit();

                        return Json(new { error = false, message = "Order saved successfully." }, JsonRequestBehavior.AllowGet);
                    }
                    catch (Exception ex)
                    {
                        dbTransaction.Rollback();
                        return Json(new { error = true, message = "Oops! Order is not saved. Please try again later. " + ex.Message }, JsonRequestBehavior.AllowGet);
                    }
                }
            }
        }
    }
}