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
    public class EmailListSupvController : Controller
    {
        [Route("a/emailListsup")]

        public ActionResult Index()
        {
            if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            {
                return Redirect("~/admin/sign_in");
            }
            if (!MySession.Current.NavList.Contains("emailListsup")) // means short name in the menulist db table
            {
                return Json(new { error = true, message = "Invalid request detected! You are not authorized to access." }, JsonRequestBehavior.AllowGet);
            }

            return View("~/BasicSetup/Views/EmailListSuperv/Index.cshtml");

        }


        [HttpPost]
        public ActionResult ShowEmails()
        {

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                EmailListSupGateway emailListSupGateway = new EmailListSupGateway();

                var data = emailListSupGateway.ShowEmails(dBcontext);
                if (data == null)
                {
                    return Json(new { error = true, message = "Data Not Found." }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { error = false, data }, JsonRequestBehavior.AllowGet);

            }
        }


        [HttpPost]
        public ActionResult AddEmail([Bind(Include = "Id, EmailList")] EmailListSup emailListSup)
        {

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                using (var dbTransaction = dBcontext.Database.BeginTransaction())
                {
                    try
                    {
                        EmailListSupGateway emailListSupGateway = new EmailListSupGateway();

                        var details = dBcontext.EmailListSups
                                    .Where(x => x.Id == emailListSup.Id).ToList();

                        dBcontext.EmailListSups.RemoveRange(details);
                        int rowAffected2 = dBcontext.SaveChanges();
                        if (rowAffected2 < 1)
                        {
                            throw new Exception("Updatation failed.");
                        }

                        emailListSup.InsertedBy = MySession.Current.UserNo;
                        emailListSup.UpdatedBy = MySession.Current.UserNo;

                        int rowAffected = emailListSupGateway.AddEmail(emailListSup, dBcontext);
                        if (rowAffected <= 0)
                        {
                            throw new Exception("Updatation failed.");
                        }
                        dBcontext.SaveChanges();
                        dbTransaction.Commit();
                        return Json(new { error = false, message = "Updated successfully." }, JsonRequestBehavior.AllowGet);
                    }
                    catch (Exception ex)
                    {
                        dbTransaction.Rollback();
                        return Json(new { error = true, message = "Oops! Updating failed. Please try again later. " + ex.Message }, JsonRequestBehavior.AllowGet);

                    }
                }

            }
        }
    }
}