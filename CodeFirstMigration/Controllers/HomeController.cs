using TravelManagement.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace TravelManagement.Controllers
{
    public class HomeController : Controller
    {
        //public ActionResult Index()
        //{
        //    return View();
        //}

        //public ActionResult About()
        //{
        //    ViewBag.Message = "Your application description page.";

        //    return View();
        //}

        //public ActionResult Contact()
        //{
        //    ViewBag.Message = "Your contact page.";

        //    return View();
        //}

        [Route("a/Index")]
        public ActionResult Index()
        {
            if(MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0) 
            {
                return Redirect("~/admin/sign_in");
            }

            return View("~/Users/Views/Home/Index.cshtml");
        }
    }
}