using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TravelManagement.Context;
using TravelManagement.Gateway;
using TravelManagement.Models;
using TravelManagement.Utilities;

namespace CodeFirstMigration.BasicSetup.Controllers
{
    public class AirlinesController : Controller
    {
        // GET: Airlines
        [Route("a/airlines")]

        public ActionResult Index()
        {
            if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            {
                return Redirect("~/admin/sign_in");
            }
            if (!MySession.Current.NavList.Contains("airlines")) // means short name in the menulist db table
            {
                return Json(RequstStatus.Return(RequestStatusType.AccessDenied), JsonRequestBehavior.AllowGet);
            }
            return View("~/BasicSetup/Views/AirlinesName/Index.cshtml");
        }


        [HttpPost]
        public ActionResult ShowAirlines()
        {
             
            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                AirlinesGateway airlinesGateway = new AirlinesGateway();
                var data = airlinesGateway.GetAirlines(dBcontext);

                return Json(RequstStatus.ReturnForData(RequestStatusType.Data, data), JsonRequestBehavior.AllowGet);
            }
        }


        [HttpPost]
        public ActionResult AddAirlines([Bind(Include = "AirlinesName,AirlinesActiveStatus ")] Airlines airlines)
        {
            if (!ModelState.IsValid)
            {
                return Json(RequstStatus.Return(RequestStatusType.ValidationError), JsonRequestBehavior.AllowGet);
            }


            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                AirlinesGateway airlinesGateway = new AirlinesGateway();
                int rowAffected = airlinesGateway.AddAirlines(airlines, dBcontext);

                return Json(RequstStatus.Return(RequestStatusType.Save, rowAffected), JsonRequestBehavior.AllowGet);
            }
        }


        public ActionResult DeleteAirlines(int? Id)
        {
            if (Id == null || Id <= 0)
            {
                return Json(RequstStatus.Return(RequestStatusType.Invalid), JsonRequestBehavior.AllowGet);
            }

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                AirlinesGateway airlinesGateway = new AirlinesGateway();
                int rowAffected = airlinesGateway.DeleteAirlines(Convert.ToInt32(Id), dBcontext);

                return Json(RequstStatus.Return(RequestStatusType.Delete, rowAffected), JsonRequestBehavior.AllowGet);
            }
        }


        [HttpPost]
        public ActionResult EditAirlines([Bind(Include = "Id,AirlinesName,AirlinesActiveStatus")] Airlines airlines)
        {
            if (!ModelState.IsValid)
            {
                return Json(RequstStatus.Return(RequestStatusType.ValidationError), JsonRequestBehavior.AllowGet);
            }

            if (airlines.Id <= 0)
            {
                return Json(RequstStatus.Return(RequestStatusType.Invalid), JsonRequestBehavior.AllowGet);
            }

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                AirlinesGateway airlinesGateway = new AirlinesGateway();
                int rowAffected = airlinesGateway.EditAirlines(airlines, dBcontext);

                return Json(RequstStatus.Return(RequestStatusType.Update, rowAffected), JsonRequestBehavior.AllowGet);
            }
        }
    }
}