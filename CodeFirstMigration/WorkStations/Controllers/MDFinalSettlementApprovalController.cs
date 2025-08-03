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
    public class MDFinalSettlementApprovalController : Controller
    {
        [Route("a/finalsettlementAppMD")]
        public ActionResult Index()
        {
            if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            {
                return Redirect("~/admin/sign_in");
            }
            if (!MySession.Current.NavList.Contains("finalsettlementAppMD"))
            {
                return Json(RequstStatus.Return(RequestStatusType.AccessDenied), JsonRequestBehavior.AllowGet);
            }
            return View("~/WorkStations/Views/FinalSettlementMD/Index.cshtml");
        }



        [HttpPost]
        public ActionResult ShowFinalSettlementManagementMD()
        {
            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                MDFinalSettlementApprovalGateway mDFinalSettlementApprovalGateway = new MDFinalSettlementApprovalGateway();

                var data = mDFinalSettlementApprovalGateway.ShowFinalSettlementManagementMD(
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