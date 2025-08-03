using TravelManagement.Context;
using TravelManagement.Gateway;
using TravelManagement.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TravelManagement.BasicSetup.Controllers
{
    public class UserRolesController : Controller
    {
        // GET: UserRoles
        public ActionResult Index()
        {
            if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            {
                return Redirect("~/admin/sign_in");
            }
            return View();
        }

        /*For User Function - Showing User Role Related Item*/

        //[HttpPost]
        //public ActionResult ShowUserRole()
        //{
        //    if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
        //    {
        //        return JavaScript(string.Format("window.location='{0}://{1}/admin/sign_in'", Request.Url.Scheme, Request.Url.Authority));
        //    }
        //    using (TravelManagementDBcontext db = new TravelManagementDBcontext())
        //    {
        //        UserRolesGateway userRolesGateway = new UserRolesGateway();
        //        var userRoleList = userRolesGateway.GetAllUserRoleList(db);
        //        if (userRoleList == null)
        //        {
        //            return Json(new { error = true, message = "User Role's not found." }, JsonRequestBehavior.AllowGet);
        //        }
        //        return Json(new { error = false, data = userRoleList }, JsonRequestBehavior.AllowGet);
        //    }
        //}


        [HttpPost]
        public ActionResult ShowUserRole()
        {

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                UserRolesGateway userRolesGateway = new UserRolesGateway();
                
                var data = userRolesGateway.ShowUserRole(dBcontext);

                return Json(RequstStatus.ReturnForData(RequestStatusType.Data, data), JsonRequestBehavior.AllowGet);
            }
        }



        [HttpPost]
        public ActionResult CheckEditValidation(int UserRoleId)
        {
            if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            {
                return JavaScript(string.Format("window.location='{0}://{1}/admin/sign_in'", Request.Url.Scheme, Request.Url.Authority));
            }
            else if ((MySession.Current.UserRoleId != 1) && (UserRoleId==1))
            {
              return Json(new { error = true, message = "You are not authorized to edit super admin. Please contact with administrator." }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { error = false, message = "Authorized." }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}