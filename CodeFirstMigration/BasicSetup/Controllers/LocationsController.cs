using TravelManagement.Context;
using TravelManagement.Gateway;
using TravelManagement.Models;
using TravelManagement.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TravelManagement.Controllers
{
    public class LocationsController : Controller
    {
        // GET: Locations
        [Route("a/locations")]

        //Function For Locations Page - Session *
        public ActionResult Index()
        {
            if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            {
                return Redirect("~/admin/sign_in");
            }
            if (!MySession.Current.NavList.Contains("locations")) // means short name in the menulist db table
            {
                return Json(RequstStatus.Return(RequestStatusType.AccessDenied), JsonRequestBehavior.AllowGet);
            }
            return View("~/BasicSetup/Views/Locations/Index.cshtml");

        }

        // Function For Locations Page - Saving New Locations in database *

        [HttpPost]
        public ActionResult AddLocation([Bind(Include = "LocationName,LocationActiveStatus,CompanyId")] Location location) 
        {
            if (!ModelState.IsValid)
            {
                return Json(RequstStatus.Return(RequestStatusType.ValidationError), JsonRequestBehavior.AllowGet);
            }


            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                LocationsGateway locationsGateway = new LocationsGateway();
                int rowAffected = locationsGateway.AddLocation(location, dBcontext);

                return Json(RequstStatus.Return(RequestStatusType.Save, rowAffected), JsonRequestBehavior.AllowGet);
            }
        }

        //Function for Locations Page - Showing data on Location List Table in view *
        [HttpPost]
        public ActionResult ShowLocations()
        {

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                LocationsGateway locationsGateway = new LocationsGateway();
                var data = locationsGateway.GetLocations(dBcontext);

                return Json(RequstStatus.ReturnForData(RequestStatusType.Data, data), JsonRequestBehavior.AllowGet);
            }
        }

        //Function for Locations Page - Delete Location by Delete Button Icon in Action on Location List Table *
        public ActionResult Deletelocation(int? Id)
        {
            if (Id == null || Id <= 0)
            {
                return Json(RequstStatus.Return(RequestStatusType.Invalid), JsonRequestBehavior.AllowGet);
            }

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                LocationsGateway locationsGateway = new LocationsGateway();
                int rowAffected = locationsGateway.DeleteLocation(Convert.ToInt32(Id), dBcontext);

                return Json(RequstStatus.Return(RequestStatusType.Delete, rowAffected), JsonRequestBehavior.AllowGet);

            }

        }

        //Function for Locations Page - Edit Location by Edit Button Icon in Action on Location List Table *
        [HttpPost]
        public ActionResult EditLocation([Bind(Include = "Id,CompanyId,LocationName,LocationActiveStatus")] Location location)
        {
            if (!ModelState.IsValid)
            {
                return Json(RequstStatus.Return(RequestStatusType.ValidationError), JsonRequestBehavior.AllowGet);
            }

            if (location.Id <= 0)
            {
                return Json(RequstStatus.Return(RequestStatusType.Invalid), JsonRequestBehavior.AllowGet);
            }

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                LocationsGateway locationsGateway = new LocationsGateway();
                int rowAffected = locationsGateway.EditLocation(location, dBcontext);

                return Json(RequstStatus.Return(RequestStatusType.Update, rowAffected), JsonRequestBehavior.AllowGet);
            }
        }

    }
}