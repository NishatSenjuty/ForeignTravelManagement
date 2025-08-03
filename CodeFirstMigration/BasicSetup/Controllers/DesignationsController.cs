using TravelManagement.Context;
using TravelManagement.Gateway;
using TravelManagement.Models;
using TravelManagement.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TravelManagement.Controllers
{
    public class DesignationsController : Controller
    {
        [Route("a/designations")]
        //Function For Designations Page - Session 

        public ActionResult Index()
        {
            if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            {
                return Redirect("~/admin/sign_in");
            }
            if (!MySession.Current.NavList.Contains("designations")) // means short name in the menulist db table
            {
                return Json(RequstStatus.Return(RequestStatusType.AccessDenied), JsonRequestBehavior.AllowGet);
            }

            return View("~/BasicSetup/Views/Designations/Index.cshtml");

        }

        // Function For Designations Page - Saving New Designation in database *

        [HttpPost]
        public ActionResult AddDesignation([Bind(Include = "DesignationName,DesignationActiveStatus ")] Designation designation) 
        {
            if (!ModelState.IsValid)
            {
                return Json(RequstStatus.Return(RequestStatusType.ValidationError), JsonRequestBehavior.AllowGet);
            }


            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                DesignationsGateway designationsGateway = new DesignationsGateway();
                int rowAffected = designationsGateway.AddDesignation(designation, dBcontext);

                return Json(RequstStatus.Return(RequestStatusType.Save, rowAffected), JsonRequestBehavior.AllowGet);
            }
        }

        //Function for Designations Page - Showing data on Designation List Table in view *
        [HttpPost]
        public ActionResult ShowDesignations()
        {

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                DesignationsGateway designationsGateway = new DesignationsGateway();
                var data = designationsGateway.GetDesignation(dBcontext);

                return Json(RequstStatus.ReturnForData(RequestStatusType.Data, data), JsonRequestBehavior.AllowGet);
            }
        }


        //Function for Designations Page - Delete Designation by Delete Button Icon in Action on Designation List Table *
        public ActionResult DeleteDesignation(int? Id)
        {
            if (Id == null || Id <= 0)
            {
                return Json(RequstStatus.Return(RequestStatusType.Invalid), JsonRequestBehavior.AllowGet);
            }

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                DesignationsGateway designationsGateway = new DesignationsGateway();
                int rowAffected = designationsGateway.DeleteDesignation(Convert.ToInt32(Id), dBcontext);

                return Json(RequstStatus.Return(RequestStatusType.Delete, rowAffected), JsonRequestBehavior.AllowGet);
            }
        }

        //Function for Designations Page - Edit Designation by Edit Button Icon in Action on Designation List Table *

        [HttpPost]
        public ActionResult EditDesignation([Bind(Include = "Id,DesignationName,DesignationActiveStatus")] Designation designation) //,CompanyId
        {
            if (!ModelState.IsValid)
            {
                return Json(RequstStatus.Return(RequestStatusType.ValidationError), JsonRequestBehavior.AllowGet);
            }

            if (designation.Id <= 0)
            {
                return Json(RequstStatus.Return(RequestStatusType.Invalid), JsonRequestBehavior.AllowGet);
            }

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                DesignationsGateway designationsGateway = new DesignationsGateway();
                int rowAffected = designationsGateway.EditDesignation(designation, dBcontext);

                return Json(RequstStatus.Return(RequestStatusType.Update, rowAffected), JsonRequestBehavior.AllowGet);
            }
        }

        //Function for EmployeeInformation Page - Showing list of Designations in DropDown  *
        [HttpPost]
        public ActionResult ShowDesignationsForDropDownInEmpInfo()
        {

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                DesignationsGateway designationsGateway = new DesignationsGateway();
                var data = designationsGateway.ShowDesignationsForDropDownInEmpInfo(dBcontext);

                return Json(RequstStatus.ReturnForData(RequestStatusType.Data, data), JsonRequestBehavior.AllowGet);
            }
        }
    }
}