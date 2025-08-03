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
    public class MenuItemsController : Controller
    {
        // GET: MenuItems
        public ActionResult Index()
        {
            if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            {
                return Redirect("~/admin/sign_in");
            }
            return View();
        }

        //For User Function - Showing menu data for dropdown
        [HttpPost]
        public ActionResult ShowMenuItemsForDropdown()
        {
            if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            {
                return JavaScript(string.Format("window.location='{0}://{1}/admin/sign_in'", Request.Url.Scheme, Request.Url.Authority));
            }
            using (TravelManagementDBcontext dbContext = new TravelManagementDBcontext())
            {
                MenuItemsGateway menuListsGateway = new MenuItemsGateway();
                var menuLists = menuListsGateway.GetMenuItems(dbContext);
                return Json(RequstStatus.ReturnForData(RequestStatusType.Data, menuLists), JsonRequestBehavior.AllowGet);
            }
        }
    }
}