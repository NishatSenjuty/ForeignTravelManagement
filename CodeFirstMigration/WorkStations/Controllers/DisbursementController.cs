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
    public class DisbursementController : Controller
    {
        [Route("a/disbursments")]

        //Function For EmployeeInformations Page - Session  *
        public ActionResult Index()
        {
            if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            {
                return Redirect("~/admin/sign_in");
            }
            if (!MySession.Current.NavList.Contains("disbursments"))
            {
                return Json(RequstStatus.Return(RequestStatusType.AccessDenied), JsonRequestBehavior.AllowGet);
            }
            return View("~/WorkStations/Views/Disbursement/Index.cshtml");
        }


        [HttpPost]
        public ActionResult ShowDisbursement(
             int CompanyId,
             int DepartmentId,
             int DesignationId,
             string TRFNoText,
             string EmployeeId
            )
        {
            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                DisbursementGateway disbursementGateway = new DisbursementGateway();

                var data = disbursementGateway.ShowDisbursement(
                                                 CompanyId,
                                                 DepartmentId,
                                                 DesignationId,
                                                 TRFNoText,
                                                 EmployeeId,
                                                 dBcontext);

                if (data == null)
                {
                    return Json(new { error = true, message = "Data Not Found." }, JsonRequestBehavior.AllowGet);
                }

                return Json(data);

            }
        }


        public ActionResult ApproveDisbursement([Bind(Include = "Id, TotalDisbursedAmount, BudgetFormTRFDetails")] BudgetFormTRFMaster budgetFormTRFMaster)
        {
            if (budgetFormTRFMaster.Id == 0 || budgetFormTRFMaster.Id <= 0)
            {
                return Json(new { error = true, message = "Error! Invalid Request detected." }, JsonRequestBehavior.AllowGet);
            }

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                using (var dbTransaction = dBcontext.Database.BeginTransaction())
                {
                    try
                    {
                        //Cost should be greater

                        decimal TotalAdvance = dBcontext.BudgetFormTRFMasters
                            .Where(e => e.Id == budgetFormTRFMaster.Id)
                            .Select(e => e.TotalAdvanceRequired)
                            .FirstOrDefault();

                        if (budgetFormTRFMaster.TotalDisbursedAmount > TotalAdvance)
                        {
                            return Json(new { error = true, message = "The amount of disbursed amount cannot be greater than the required advance." }, JsonRequestBehavior.AllowGet);
                        }

                        DisbursementGateway disbursementGateway = new DisbursementGateway();

                        var approvalResult = disbursementGateway.ApproveDisbursement(budgetFormTRFMaster.Id, budgetFormTRFMaster.TotalDisbursedAmount, dBcontext);
                        if (approvalResult.Item1 <= 0)
                        {
                            throw new Exception("Information saving failed.");
                        }

                        budgetFormTRFMaster.Id = approvalResult.Item1;
                        budgetFormTRFMaster.TRFNoText = approvalResult.Item2;


                        List<BudgetFormTRFDetails> orderQuantities = budgetFormTRFMaster.BudgetFormTRFDetails;
                        budgetFormTRFMaster.BudgetFormTRFDetails = null;

                        foreach (BudgetFormTRFDetails orderQuantity in orderQuantities)
                        {
                            orderQuantity.InsertedBy = MySession.Current.UserNo;
                            orderQuantity.TRFMasterId = budgetFormTRFMaster.Id;
                            orderQuantity.TRFNoText = budgetFormTRFMaster.TRFNoText;


                            int rowAffected = disbursementGateway.AddTRFDetEntry(orderQuantity, dBcontext);
                            if (rowAffected < 0)
                            {
                                throw new Exception("Order Quantity information saving failed.");
                            }
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