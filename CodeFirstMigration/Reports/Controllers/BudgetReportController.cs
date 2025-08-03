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
    public class BudgetReportController : Controller
    {
        [Route("a/budgetReport")]

        public ActionResult Index()
        {
            if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            {
                return Redirect("~/admin/sign_in");
            }
            if (!MySession.Current.NavList.Contains("budgetReport"))
            {
                return Json(RequstStatus.Return(RequestStatusType.AccessDenied), JsonRequestBehavior.AllowGet);
            }
            return View("~/Reports/Views/BudgetReport/Index.cshtml");
        }


        [HttpPost]
        public ActionResult ShowbudgetReportuisitionReports(
        int CompanyId,
        int DepartmentId,
        int DesignationId,
        string TRFNoText,
        string EmployeeId
        )
        {
            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                BudgetRequisitionReportGateway visaRequisitionReportGateway = new BudgetRequisitionReportGateway();

                var data = visaRequisitionReportGateway.ShowbudgetReportuisitionReports(
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
    }
}