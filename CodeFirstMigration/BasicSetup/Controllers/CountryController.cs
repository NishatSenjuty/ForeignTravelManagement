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
    public class CountryController : Controller
    {
        [Route("a/countries")]

        //Function For Companies Page - Session  *
        public ActionResult Index()
        {
            if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            {
                return Redirect("~/admin/sign_in");
            }
            if (!MySession.Current.NavList.Contains("countries")) // means short name in the menulist db table
            {
                return Json(RequstStatus.Return(RequestStatusType.AccessDenied), JsonRequestBehavior.AllowGet);
            }
            return View("~/BasicSetup/Views/Country/Index.cshtml");
        }


        [HttpPost]
        public ActionResult AddCountry([Bind(Include = "CountryName,CountryActiveStatus ")] Country country)
        {
            if (!ModelState.IsValid)
            {
                return Json(RequstStatus.Return(RequestStatusType.ValidationError), JsonRequestBehavior.AllowGet);
            }


            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                CountryGateway countryGateway = new CountryGateway();
                int rowAffected = countryGateway.AddCountry(country, dBcontext);

                return Json(RequstStatus.Return(RequestStatusType.Save, rowAffected), JsonRequestBehavior.AllowGet);
            }
        }


        [HttpPost]
        public ActionResult ShowCountry()
        {

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                CountryGateway countryGateway = new CountryGateway();
                var data = countryGateway.ShowCountry(dBcontext);

                return Json(RequstStatus.ReturnForData(RequestStatusType.Data, data), JsonRequestBehavior.AllowGet);
            }
        }



        public ActionResult DeleteCountry(int? Id)
        {
            if (Id == null || Id <= 0)
            {
                return Json(RequstStatus.Return(RequestStatusType.Invalid), JsonRequestBehavior.AllowGet);
            }

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                CountryGateway countryGateway = new CountryGateway();
                int rowAffected = countryGateway.DeleteCountry(Convert.ToInt32(Id), dBcontext);

                return Json(RequstStatus.Return(RequestStatusType.Delete, rowAffected), JsonRequestBehavior.AllowGet);
            }
        }


        [HttpPost]
        public ActionResult EditCountry([Bind(Include = "Id,CountryName,CountryActiveStatus")] Country country)
        {
            if (!ModelState.IsValid)
            {
                return Json(RequstStatus.Return(RequestStatusType.ValidationError), JsonRequestBehavior.AllowGet);
            }

            if (country.Id <= 0)
            {
                return Json(RequstStatus.Return(RequestStatusType.Invalid), JsonRequestBehavior.AllowGet);
            }

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                CountryGateway countryGateway = new CountryGateway();
                int rowAffected = countryGateway.EditCountry(country, dBcontext);

                return Json(RequstStatus.Return(RequestStatusType.Update, rowAffected), JsonRequestBehavior.AllowGet);
            }
        }
    }
}