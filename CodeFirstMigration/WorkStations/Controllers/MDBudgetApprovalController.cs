using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TravelManagement.Context;
using TravelManagement.Gateway;
using TravelManagement.Utilities;

namespace TravelManagement.WorkStations.Controllers
{
    public class MDBudgetApprovalController : Controller
    {
        [Route("a/mdbudgetapp")]
        public ActionResult Index()
        {
            if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            {
                return Redirect("~/admin/sign_in");
            }
            if (!MySession.Current.NavList.Contains("mdbudgetapp")) // means short name in the menulist db table
            {
                return Json(RequstStatus.Return(RequestStatusType.AccessDenied), JsonRequestBehavior.AllowGet);
            }
            return View("~/WorkStations/Views/BudgetApprovalMD/Index.cshtml");
        }



        [HttpPost]
        public ActionResult ShowTRFApprovalSup(
                    //int limit,
                    int page
                    )
        {
            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                MD_BudgetApprovalGateway mD_BudgetApprovalGateway = new MD_BudgetApprovalGateway();

                var data = mD_BudgetApprovalGateway.ShowTRFApprovalSup(
                                                 page,
                                                 //limit,
                                                 dBcontext);

                if (data == null)
                {
                    return Json(new { error = true, message = "Data Not Found." }, JsonRequestBehavior.AllowGet);
                }

                return Json(data);

            }
        }


        [HttpPost]
        public ActionResult ShowTRFApprovalMan1(
                    //int limit,
                    int page
                    )
        {
            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                MD_BudgetApprovalGateway mD_VisaApprovalGateway = new MD_BudgetApprovalGateway();

                var data = mD_VisaApprovalGateway.ShowTRFApprovalMan1(
                                                 page,
                                                 //limit,
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