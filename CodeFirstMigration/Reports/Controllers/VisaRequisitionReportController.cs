using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TravelManagement.Context;
using TravelManagement.Gateway;
using TravelManagement.Utilities;

namespace TravelManagement.Reports.Controllers
{
    public class VisaRequisitionReportController : Controller
    {
        [Route("a/visarequisitionRep")]

        public ActionResult Index()
        {
            if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            {
                return Redirect("~/admin/sign_in");
            }
            if (!MySession.Current.NavList.Contains("visarequisitionRep")) 
            {
                return Json(RequstStatus.Return(RequestStatusType.AccessDenied), JsonRequestBehavior.AllowGet);
            }
            return View("~/Reports/Views/VisaRequisitionReports/Index.cshtml");
        }


        [HttpPost]
        public ActionResult ShowVisaRequisitionReports(
                int CompanyId,
                int DepartmentId,
                int DesignationId,
                string VisaRequisitionNoText,
                string EmployeeId
                )
        {
            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                VisaRequisitionReportGateway visaRequisitionReportGateway = new VisaRequisitionReportGateway();

                var data = visaRequisitionReportGateway.ShowVisaRequisitionReports(
                                                 CompanyId,
                                                 DepartmentId,
                                                 DesignationId,
                                                 VisaRequisitionNoText,
                                                 EmployeeId,
                                                 dBcontext);

                if (data == null)
                {
                    return Json(new { error = true, message = "Data Not Found." }, JsonRequestBehavior.AllowGet);
                }

                return Json(data);

            }
        }
    }
}