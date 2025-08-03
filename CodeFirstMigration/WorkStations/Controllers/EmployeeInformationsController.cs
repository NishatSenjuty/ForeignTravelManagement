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
    public class EmployeeInformationsController : Controller
    {
        [Route("a/employees")]


        //Function For EmployeeInformations Page - Session  *
        public ActionResult Index()
        {
            if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            {
                return Redirect("~/admin/sign_in");
            }
            if (!MySession.Current.NavList.Contains("employees")) // means short name in the menulist db table
            {
                return Json(RequstStatus.Return(RequestStatusType.AccessDenied), JsonRequestBehavior.AllowGet);
            }
            return View("~/WorkStations/Views/EmployeeInformations/Index.cshtml");
        }



        // Saving in Database
        //Bind include model name = model name match

        
        [HttpPost]
        public ActionResult AddEmployeeInformation([Bind(Include = "EmployeeId, Name, CompanyId, LocationId, DepartmentId, DesignationId, ContactNo, JDStr, DOBStr, Gender, Address, BloodGroup, Salary, ActiveStatus, int page")] EmployeeInformation employeeInformation)
        {
            if (!ModelState.IsValid)
            {
                return Json(RequstStatus.Return(RequestStatusType.ValidationError), JsonRequestBehavior.AllowGet);
            }

            employeeInformation.DOB = DateParse.StringToDateTime(employeeInformation.DOBStr);
            employeeInformation.JD = DateParse.StringToDateTime(employeeInformation.JDStr);


            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                EmployeeInformationsGateway employeeInformationsGateway = new EmployeeInformationsGateway();
                int rowAffected = employeeInformationsGateway.AddEmployeeInformation(employeeInformation, dBcontext);

                return Json(RequstStatus.Return(RequestStatusType.Save, rowAffected), JsonRequestBehavior.AllowGet);
            }
        }

        [Route("EmployeeInformations/ShowEmpInfo")]
        [HttpPost]
        public ActionResult ShowEmpInfo(string CompanyId, string DepartmentId, string DesignationId,string EmployeeId,string Name, int page,int limit) {

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                EmployeeInformationsGateway employeeInformationsGateway = new EmployeeInformationsGateway();

                var data = employeeInformationsGateway.GetEmpInfo(CompanyId,DepartmentId,DesignationId,EmployeeId,Name,page,limit, dBcontext);
                if (data == null)
                {
                    return Json(new { error = true, message = "Data Not Found." }, JsonRequestBehavior.AllowGet);
                }

                int tableRecords = data.Count;

                return Json(new { error = false, data, tableRecords }, JsonRequestBehavior.AllowGet);


            }
        }

        //Delete EmpInfo
        public ActionResult DeleteEmployee(int? Id)
        {
            if (Id == null || Id <= 0)
            {
                return Json(RequstStatus.Return(RequestStatusType.Invalid), JsonRequestBehavior.AllowGet);
            }

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                EmployeeInformationsGateway employeeInformationsGateway = new EmployeeInformationsGateway();
                int rowAffected = employeeInformationsGateway.DeleteEmployee(Convert.ToInt32(Id), dBcontext);

                return Json(RequstStatus.Return(RequestStatusType.Delete, rowAffected), JsonRequestBehavior.AllowGet);
            }

        }


        //Edit EmpInfo

        [HttpPost]
        public ActionResult EditEmpInfo([Bind(Include = "Id, EmployeeId, Name, CompanyId, LocationId, DepartmentId, DesignationId, ContactNo, JDStr, DOBStr, Gender, Address, BloodGroup, Salary, ActiveStatus")] EmployeeInformation employeeInformation)
        {
            if (!ModelState.IsValid)
            {
                return Json(RequstStatus.Return(RequestStatusType.ValidationError), JsonRequestBehavior.AllowGet);
            }

            if (employeeInformation.Id <= 0)
            {
                return Json(RequstStatus.Return(RequestStatusType.Invalid), JsonRequestBehavior.AllowGet);
            }

            employeeInformation.DOB = DateParse.StringToDateTime(employeeInformation.DOBStr);
            employeeInformation.JD = DateParse.StringToDateTime(employeeInformation.JDStr);

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                EmployeeInformationsGateway employeeInformationsGateway = new EmployeeInformationsGateway();
                int rowAffected = employeeInformationsGateway.EditEmpInfo(employeeInformation, dBcontext);

                return Json(RequstStatus.Return(RequestStatusType.Update, rowAffected), JsonRequestBehavior.AllowGet);
            }
        }


        //print
        [HttpPost]
        public ActionResult FilterEmployee(string employeeId, string name, string company, string department, string designation)
        {
            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                EmployeeInformationsGateway employeegateway = new EmployeeInformationsGateway();
                var data = employeegateway.FilterEmployees(employeeId, name, company, department, designation, dBcontext);

                return Json(RequstStatus.ReturnForData(RequestStatusType.Data, data), JsonRequestBehavior.AllowGet);
            }
        }
    }
}