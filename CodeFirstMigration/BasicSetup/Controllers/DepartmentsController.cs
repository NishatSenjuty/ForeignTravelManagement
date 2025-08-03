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
    public class DepartmentsController  : Controller
    {
        [Route("a/departments")]

        //Function For Departments Page - Session 
        public ActionResult Index()
        {
            if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            {
                return Redirect("~/admin/sign_in");
            }
            if (!MySession.Current.NavList.Contains("departments")) // means short name in the menulist db table
            {
                return Json(RequstStatus.Return(RequestStatusType.AccessDenied), JsonRequestBehavior.AllowGet);
            }
            return View("~/BasicSetup/Views/Departments/Index.cshtml");
        }

        // Function For Departments Page - Saving New Department in database *
        [HttpPost]
        public ActionResult AddDepartment([Bind(Include = "Name,ActiveStatus")] Department department)  
        {
            if (!ModelState.IsValid)
            {
                return Json(RequstStatus.Return(RequestStatusType.ValidationError), JsonRequestBehavior.AllowGet);
            }


            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                DepartmentsGateway departmentsGateway = new DepartmentsGateway();
                int rowAffected = departmentsGateway.AddDepartment(department, dBcontext);

                return Json(RequstStatus.Return(RequestStatusType.Save, rowAffected), JsonRequestBehavior.AllowGet);
            }
        }

        //Function for Departments Page - Showing data on Department List Table in view *
        [HttpPost]
        public ActionResult ShowDepartments()
        {

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                DepartmentsGateway departmentsGateway = new DepartmentsGateway();
                var data = departmentsGateway.ShowDepartments(dBcontext);

                return Json(RequstStatus.ReturnForData(RequestStatusType.Data, data), JsonRequestBehavior.AllowGet);
            }
        }


        //Function for Departments Page - Delete Department by Delete Button Icon in Action on Department List Table *
        public ActionResult DeleteDepartment(int? Id)
        {
            if (Id == null || Id <= 0)
            {
                return Json(RequstStatus.Return(RequestStatusType.Invalid), JsonRequestBehavior.AllowGet);
            }

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                DepartmentsGateway departmentsGateway = new DepartmentsGateway();
                int rowAffected = departmentsGateway.DeleteDepartment(Convert.ToInt32(Id), dBcontext);

                return Json(RequstStatus.Return(RequestStatusType.Delete, rowAffected), JsonRequestBehavior.AllowGet);
            }
        }

        //Function for Departments Page - Edit Department by Edit Button Icon in Action on Department List Table *
        [HttpPost]
        public ActionResult EditDepartment([Bind(Include = "Id,Name,ActiveStatus")] Department department) //,CompanyId
        {
            if (!ModelState.IsValid)
            {
                return Json(RequstStatus.Return(RequestStatusType.ValidationError), JsonRequestBehavior.AllowGet);
            }


            if (department.Id <= 0)
            {
                return Json(RequstStatus.Return(RequestStatusType.Invalid), JsonRequestBehavior.AllowGet);
            }

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                DepartmentsGateway departmentsGateway = new DepartmentsGateway();
                int rowAffected = departmentsGateway.EditDepartment(department, dBcontext);

                return Json(RequstStatus.Return(RequestStatusType.Update, rowAffected), JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult ShowDepartmentsForDropdown()
        {

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                DepartmentsGateway departmentsGateway = new DepartmentsGateway();
                var data = departmentsGateway.ShowDepartmentsForDropdown(dBcontext);
                if (data == null)
                {
                    return Json(new { error = true, message = "Data Not Found." }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { error = false, data }, JsonRequestBehavior.AllowGet);

            }
        }

        [HttpPost]
        public ActionResult ShowDepartmentsForDropDownInEmpInfo()
        {

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                DepartmentsGateway departmentsGateway = new DepartmentsGateway();
                var data = departmentsGateway.ShowDepartmentsForDropDownInEmpInfo(dBcontext);
                if (data == null)
                {
                    return Json(new { error = true, message = "Data Not Found." }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { error = false, data }, JsonRequestBehavior.AllowGet);

            }
        }

    }
}