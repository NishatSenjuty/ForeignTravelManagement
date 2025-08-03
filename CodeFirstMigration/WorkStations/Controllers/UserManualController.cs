using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TravelManagement.Utilities;

namespace TravelManagement.WorkStations.Controllers
{
    public class UserManualController : Controller
    {
        [Route("a/usermanual")]

        public ActionResult Index()
        {

            if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            {
                return Redirect("~/admin/sign_in");
            }
            if (!MySession.Current.NavList.Contains("usermanual")) // means short name in the menulist db table
            {
                return Json(RequstStatus.Return(RequestStatusType.AccessDenied), JsonRequestBehavior.AllowGet);
            }
            return View("~/WorkStations/Views/UserManual/Index.cshtml");
        }
    }
}