using TravelManagement.Context;
using TravelManagement.Gateway;
using TravelManagement.Models;
using TravelManagement.Utilities;
using Microsoft.Ajax.Utilities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Services.Description;

namespace TravelManagement.Controllers
{
    public class CompaniesController : Controller
    {
        // GET: Companies

        [Route("a/companies")]

        //Function For Companies Page - Session  *
        public ActionResult Index()
        {
            if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            {
                return Redirect("~/admin/sign_in");
            }
            if (!MySession.Current.NavList.Contains("companies")) // means short name in the menulist db table
            {
                return Json(RequstStatus.Return(RequestStatusType.AccessDenied), JsonRequestBehavior.AllowGet);
            }
            return View("~/BasicSetup/Views/Companies/Index.cshtml");
        }

        // Function For Companies Page - Saving New Company in database *
        [HttpPost]
        public ActionResult AddCompany([Bind(Include = "CompanyShortName,CompanyName,CompanyActiveStatus")] Company company) 
        {
            //if (!ModelState.IsValid)
            //{
            //    return Json(RequstStatus.Return(RequestStatusType.ValidationError), JsonRequestBehavior.AllowGet);
            //}


            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {


                CompaniesGateway companiesGateway = new CompaniesGateway();
                var rowAffected = companiesGateway.AddCompany(company, dBcontext);
                try
                {
                    var i = Convert.ToInt32(rowAffected);
                    return Json(RequstStatus.Return(RequestStatusType.Save, rowAffected), JsonRequestBehavior.AllowGet);

                }
                catch
                {
                    return Json(new { error = true, message = rowAffected }, JsonRequestBehavior.AllowGet);
                }

            }
        }


        //Function for Companies Page - Showing data on Company List Table in view *
        [HttpPost]
        public ActionResult ShowCompanies() 
        {
            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                CompaniesGateway companiesGateway = new CompaniesGateway();
                var data = companiesGateway.GetCompanies(dBcontext);

                return Json(RequstStatus.ReturnForData(RequestStatusType.Data, data), JsonRequestBehavior.AllowGet);
            }
        }


        //Function for Companies Page - Edit Company by Edit Button Icon in Action on Company List Table *
        [HttpPost]
        public ActionResult EditCompany([Bind(Include = "Id,CompanyShortName,CompanyName,CompanyActiveStatus")] Company company)
        {
            if (!ModelState.IsValid)
            {
                return Json(RequstStatus.Return(RequestStatusType.ValidationError), JsonRequestBehavior.AllowGet);
            }

            if (company.Id <= 0)
            {
                return Json(RequstStatus.Return(RequestStatusType.Invalid), JsonRequestBehavior.AllowGet);
            }

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                CompaniesGateway companiesGateway = new CompaniesGateway();
                int rowAffected = companiesGateway.EditCompany(company, dBcontext);

                return Json(RequstStatus.Return(RequestStatusType.Update, rowAffected), JsonRequestBehavior.AllowGet);
            }
        }

        //Function for Companies Page - Delete Company by Delete Button Icon in Action on Company List Table *
        public ActionResult DeleteCompany(int? Id)
        {
            if (Id == null || Id <= 0)
            {
                return Json(RequstStatus.Return(RequestStatusType.Invalid), JsonRequestBehavior.AllowGet);
            }

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                CompaniesGateway companiesGateway = new CompaniesGateway();
                int rowAffected = companiesGateway.DeleteCompany(Convert.ToInt32(Id), dBcontext);

                return Json(RequstStatus.Return(RequestStatusType.Delete, rowAffected), JsonRequestBehavior.AllowGet);
            }

        }

        //For Employee Information page - with user session - to get the data of company, floor and location *

        [HttpPost]
        public ActionResult ShowCompaniesForDropDown()
        {

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                CompaniesGateway companiesGateway = new CompaniesGateway();
                var data = companiesGateway.GetCompanyLocationFloorsForDropdownByArr(MySession.Current.CompaniesId, MySession.Current.LocationsId, MySession.Current.FloorsId,dBcontext);

                return Json(RequstStatus.ReturnForData(RequestStatusType.Data, data), JsonRequestBehavior.AllowGet);
            }
        }

        //Function for Locations Page - Showing list of companies in DropDown *
        [HttpPost]
        public ActionResult ShowCompaniesForDropDownLocation()
        {

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                CompaniesGateway companiesGateway = new CompaniesGateway();
                var data = companiesGateway.GetCompanyLocationFloorsForDropdownByArrLocation(dBcontext);

                return Json(RequstStatus.ReturnForData(RequestStatusType.Data, data), JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult ShowCompanyLocationsForDropdown()
        {
            //if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            //{
            //    return JavaScript(string.Format("window.location='{0}://{1}/admin/sign_in'", Request.Url.Scheme, Request.Url.Authority));
            //}
            using (TravelManagementDBcontext dbContext = new TravelManagementDBcontext())
            {
                CompaniesGateway companiesGateway = new CompaniesGateway();
                var data = companiesGateway.GetCompanyLocationsForDropdown(new int[] { }, new int[] { }, dbContext);

                return Json(RequstStatus.ReturnForData(RequestStatusType.Data, data), JsonRequestBehavior.AllowGet);
            }
        }


        [HttpPost]
        public ActionResult ShowCompaniesLocationsFloorsLinesForDropDown()
        {

            using (TravelManagementDBcontext dbContext = new TravelManagementDBcontext())
            {
                CompaniesGateway companiesGateway = new CompaniesGateway();
                var data = companiesGateway.GetCompanyLocationFloorsLinesForDropdownByArr(dbContext);
                if (data == null)
                {
                    return Json(new { error = true, message = "Data Not Found." }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { error = false, data }, JsonRequestBehavior.AllowGet);

            }
        }
    }
}


