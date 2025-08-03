using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TravelManagement.Context;
using TravelManagement.Gateway;
using TravelManagement.Models;
using TravelManagement.Utilities;

namespace TravelManagement.BasicSetup.Controllers
{
    public class CurrencyController : Controller
    {
        [Route("a/currency")]
        //Function For Designations Page - Session 

        public ActionResult Index()
        {
            if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            {
                return Redirect("~/admin/sign_in");
            }
            if (!MySession.Current.NavList.Contains("currency")) // means short name in the menulist db table
            {
                return Json(RequstStatus.Return(RequestStatusType.AccessDenied), JsonRequestBehavior.AllowGet);
            }

            return View("~/BasicSetup/Views/Currency/Index.cshtml");

        }




        [HttpPost]
        public ActionResult AddCurrency([Bind(Include = "CurrencyName,CurrencyActiveStatus ")] Currency currency)
        {
            if (!ModelState.IsValid)
            {
                return Json(RequstStatus.Return(RequestStatusType.ValidationError), JsonRequestBehavior.AllowGet);
            }


            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                CurrencyGateway currencyGateway = new CurrencyGateway();
                int rowAffected = currencyGateway.AddCurrency(currency, dBcontext);

                return Json(RequstStatus.Return(RequestStatusType.Save, rowAffected), JsonRequestBehavior.AllowGet);
            }
        }


        [HttpPost]
        public ActionResult ShowCurrency()
        {

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                CurrencyGateway currencyGateway = new CurrencyGateway();
                var data = currencyGateway.ShowCurrency(dBcontext);

                return Json(RequstStatus.ReturnForData(RequestStatusType.Data, data), JsonRequestBehavior.AllowGet);
            }
        }


        [HttpPost]
        public ActionResult EditCurrency([Bind(Include = "Id,CurrencyName,CurrencyActiveStatus")] Currency currency)
        {
            if (!ModelState.IsValid)
            {
                return Json(RequstStatus.Return(RequestStatusType.ValidationError), JsonRequestBehavior.AllowGet);
            }

            if (currency.Id <= 0)
            {
                return Json(RequstStatus.Return(RequestStatusType.Invalid), JsonRequestBehavior.AllowGet);
            }

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                CurrencyGateway currencyGateway = new CurrencyGateway();
                int rowAffected = currencyGateway.EditCurrency(currency, dBcontext);

                return Json(RequstStatus.Return(RequestStatusType.Update, rowAffected), JsonRequestBehavior.AllowGet);
            }
        }


        public ActionResult DeleteCurrency(int? Id)
        {
            if (Id == null || Id <= 0)
            {
                return Json(RequstStatus.Return(RequestStatusType.Invalid), JsonRequestBehavior.AllowGet);
            }

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                CurrencyGateway currencyGateway = new CurrencyGateway();
                int rowAffected = currencyGateway.DeleteCurrency(Convert.ToInt32(Id), dBcontext);

                return Json(RequstStatus.Return(RequestStatusType.Delete, rowAffected), JsonRequestBehavior.AllowGet);
            }
        }
    }
}