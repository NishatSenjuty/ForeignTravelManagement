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
    public class MDVisaApprovalController : Controller
    {
        [Route("a/mdvisaapp")]
        public ActionResult Index()
        {
            if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            {
                return Redirect("~/admin/sign_in");
            }
            if (!MySession.Current.NavList.Contains("mdvisaapp")) // means short name in the menulist db table
            {
                return Json(RequstStatus.Return(RequestStatusType.AccessDenied), JsonRequestBehavior.AllowGet);
            }
            return View("~/WorkStations/Views/VisaApprovalMD/Index.cshtml");
        }


        [HttpPost]
        public ActionResult ShowVisaRequisitionMD(
             int limit,
             int page
             )
        {
            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {

                MD_visaApprovalGateway mD_VisaApprovalGateway = new MD_visaApprovalGateway();

                var data = mD_VisaApprovalGateway.ShowVisaRequisitionMD(
                                                 page,
                                                 limit,
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