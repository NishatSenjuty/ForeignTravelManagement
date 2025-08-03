using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TravelManagement.Context;
using TravelManagement.Gateway;
using TravelManagement.Models;
using TravelManagement.Utilities;

namespace CodeFirstMigration.BasicSetup.Controllers
{
    public class ExpensesController : Controller
    {
        [Route("a/expense")]


        public ActionResult Index()
        {
            if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            {
                return Redirect("~/admin/sign_in");
            }
            if (!MySession.Current.NavList.Contains("expense")) 
            {
                return Json(RequstStatus.Return(RequestStatusType.AccessDenied), JsonRequestBehavior.AllowGet);
            }
            return View("~/BasicSetup/Views/Expenses/Index.cshtml");
        }


        [HttpPost]
        public ActionResult AddExpenses([Bind(Include = "ExpensesCategory,ExpensesActiveStatus ")] Expenses expenses)
        {
            if (!ModelState.IsValid)
            {
                return Json(RequstStatus.Return(RequestStatusType.ValidationError), JsonRequestBehavior.AllowGet);
            }


            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                ExpensesGateway expensesGateway = new ExpensesGateway();
                int rowAffected = expensesGateway.AddExpenses(expenses, dBcontext);

                return Json(RequstStatus.Return(RequestStatusType.Save, rowAffected), JsonRequestBehavior.AllowGet);
            }
        }



        [HttpPost]
        public ActionResult ShowExpenses()
        {

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                ExpensesGateway expensesGateway = new ExpensesGateway();
                var data = expensesGateway.ShowExpenses(dBcontext);

                return Json(RequstStatus.ReturnForData(RequestStatusType.Data, data), JsonRequestBehavior.AllowGet);
            }
        }



        [HttpPost]
        public ActionResult EditExpenses([Bind(Include = "Id,ExpensesCategory,ExpensesActiveStatus")] Expenses expenses)
        {
            if (!ModelState.IsValid)
            {
                return Json(RequstStatus.Return(RequestStatusType.ValidationError), JsonRequestBehavior.AllowGet);
            }

            if (expenses.Id <= 0)
            {
                return Json(RequstStatus.Return(RequestStatusType.Invalid), JsonRequestBehavior.AllowGet);
            }

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                ExpensesGateway expensesGateway = new ExpensesGateway();
                int rowAffected = expensesGateway.EditExpenses(expenses, dBcontext);

                return Json(RequstStatus.Return(RequestStatusType.Update, rowAffected), JsonRequestBehavior.AllowGet);
            }
        }


        public ActionResult DeleteExpenses(int? Id)
        {
            if (Id == null || Id <= 0)
            {
                return Json(RequstStatus.Return(RequestStatusType.Invalid), JsonRequestBehavior.AllowGet);
            }

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                ExpensesGateway expensesGateway = new ExpensesGateway();
                int rowAffected = expensesGateway.DeleteExpenses(Convert.ToInt32(Id), dBcontext);

                return Json(RequstStatus.Return(RequestStatusType.Delete, rowAffected), JsonRequestBehavior.AllowGet);
            }
        }


        [HttpPost]
        public ActionResult ShowExpensesForModal()
        {

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                ExpensesGateway expensesGateway = new ExpensesGateway();

                var data = expensesGateway.ShowExpensesForModal(dBcontext);
                if (data == null)
                {
                    return Json(new { error = true, message = "Data Not Found." }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { error = false, data }, JsonRequestBehavior.AllowGet);

            }
        }
    }
}