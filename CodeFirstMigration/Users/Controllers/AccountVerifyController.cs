using TravelManagement.Context;
using TravelManagement.Gateway;
using TravelManagement.Utilities;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace TravelManagement.Users.Controllers
{
    public class AccountVerifyController : Controller
    {
        // GET: AccountVerify
        [Route("acc/verify")]
        public ActionResult Index()
        {
            if (string.IsNullOrEmpty(MySession.Current.Email) || string.IsNullOrEmpty(MySession.Current.VerificationCode))
            {
                return Redirect("/acc/sign_up");
            }
            ViewBag.Email = MySession.Current.Email;
            ViewBag.Sitekey = System.Web.Configuration.WebConfigurationManager.AppSettings["recaptchaSitekey"];
            return View("~/Users/Views/AccountVerify/Index.cshtml");
        }

        [HttpPost]
        public ActionResult Verify(FormCollection loginCollection)
        {
            if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            {
                return JavaScript(string.Format("window.location='{0}://{1}/acc/sign_up'", Request.Url.Scheme, Request.Url.Authority));
            }

            string response = loginCollection["response"];
            string secretKey = System.Web.Configuration.WebConfigurationManager.AppSettings["recaptchaSecretkey"];
            var client = new WebClient();
            var result = client.DownloadString(string.Format("https://www.google.com/recaptcha/api/siteverify?secret={0}&response={1}", secretKey, response));
            var obj = JObject.Parse(result);
            var status = (bool)obj.SelectToken("success");
            if (!status)
            {
                return Json(new { error = true, message = "Your response to the recapcha appears to be invalid!" }, JsonRequestBehavior.AllowGet);
            }

            string verificationCode = loginCollection["verificationCode"];

            if (string.IsNullOrEmpty(verificationCode))
            {
                return Json(new { error = true, message = "Please give the information properly." }, JsonRequestBehavior.AllowGet);
            }
            if (verificationCode != MySession.Current.VerificationCode)
            {
                return Json(new { error = true, message = "The verification code you entered is incorrect." }, JsonRequestBehavior.AllowGet);
            }
            //if (verificationCode==MySession.Current.VerificationCode)
            //{
            //    MySession.Current.UserStatus = UserStatus.IsActive;
            //}
            using (var dbContext = new TravelManagementDBcontext())
            {
                try
                {
                    UsersGateway usersGateway = new UsersGateway();
                    int rowAffected = usersGateway.UpdateUserEmailStatusSetActive(MySession.Current.UserNo, dbContext);
                    if (rowAffected >= 0)
                    {
                        MySession.Current.UserEmailStatus = UserEmailStatus.Verified;
                        return Json(new { error = false, url = "/a/index" }, JsonRequestBehavior.AllowGet);
                    }
                    Session.Abandon();
                    return Json(new { error = true, message = "Access is denied! Please try again later." }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception)
                {
                    return Json(new { error = true, message = "Access is denied. Please try again later." }, JsonRequestBehavior.AllowGet);
                }
            }
        }
    }
}