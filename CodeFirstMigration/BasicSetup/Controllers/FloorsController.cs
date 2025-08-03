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
    public class FloorsController : Controller
    {
        // GET: Floors
        [Route("a/floors")]

        //Function For Floors Page - Session 
        public ActionResult Index()
        {
            if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            {
                return Redirect("~/admin/sign_in");
            }
            if (!MySession.Current.NavList.Contains("floors")) // means short name in the menulist db table
            {
                return Json(RequstStatus.Return(RequestStatusType.AccessDenied), JsonRequestBehavior.AllowGet);
            }
            return View("~/BasicSetup/Views/Floors/Index.cshtml");

        }


        // Function For Floors Page - Saving New Floor in database *
        [HttpPost]
        public ActionResult AddFloor([Bind(Include = "FloorName,FloorActiveStatus,CompanyId,LocationId")] Floor floor)
        {
            if (!ModelState.IsValid)
            {
                return Json(RequstStatus.Return(RequestStatusType.ValidationError), JsonRequestBehavior.AllowGet);
            }


            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                FloorsGateway floorsGateway = new FloorsGateway();
                int rowAffected = floorsGateway.AddFloor(floor, dBcontext);

                return Json(RequstStatus.Return(RequestStatusType.Save, rowAffected), JsonRequestBehavior.AllowGet);
            }
        }


        //Function for Floors Page - Showing data on Floor List Table in view *
        [HttpPost]
        public ActionResult ShowFloors()
        {

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                FloorsGateway floorsGateway = new FloorsGateway();
                var data = floorsGateway.GetFloors(dBcontext);

                return Json(RequstStatus.ReturnForData(RequestStatusType.Data, data), JsonRequestBehavior.AllowGet);
            }
        }


        //Function for Floors Page - Delete Floor by Delete Button Icon in Action on Floor List Table *
        public ActionResult DeleteFloor(int? Id)
        {
            if (Id == null || Id <= 0)
            {
                return Json(RequstStatus.Return(RequestStatusType.Invalid), JsonRequestBehavior.AllowGet);
            }

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                FloorsGateway floorsGateway = new FloorsGateway();
                int rowAffected = floorsGateway.DeleteFloor(Convert.ToInt32(Id), dBcontext);

                return Json(RequstStatus.Return(RequestStatusType.Delete, rowAffected), JsonRequestBehavior.AllowGet);
            }

        }


        //Function for Floors Page - Edit Floor by Edit Button Icon in Action on Floor List Table *
        [HttpPost]
        public ActionResult EditFloor([Bind(Include = "Id,FloorName,FloorActiveStatus,CompanyId,LocationId")] Floor floor)
        {
            if (!ModelState.IsValid)
            {
                return Json(RequstStatus.Return(RequestStatusType.ValidationError), JsonRequestBehavior.AllowGet);
            }

            if (floor.Id <= 0)
            {
                return Json(RequstStatus.Return(RequestStatusType.Invalid), JsonRequestBehavior.AllowGet);
            }

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                FloorsGateway floorsGateway = new FloorsGateway();
                int rowAffected = floorsGateway.EditFloor(floor, dBcontext);

                return Json(RequstStatus.Return(RequestStatusType.Update, rowAffected), JsonRequestBehavior.AllowGet);
            }
        }
    }
}