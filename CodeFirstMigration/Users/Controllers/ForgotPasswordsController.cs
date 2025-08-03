using TravelManagement.Context;
using TravelManagement.Gateway;
using TravelManagement.Models;
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
    public class ForgotPasswordsController : Controller
    {
        // GET: ForgotPasswords
        [Route("acc/forgot_password")]
        public ActionResult FindYourAccount()
        {
            Session.Abandon();
            ViewBag.Sitekey = System.Web.Configuration.WebConfigurationManager.AppSettings["recaptchaSitekey"];
            return View("~/Users/Views/ForgotPasswords/FindYourAccount.cshtml");
        }


        [HttpPost]
        public JsonResult FindYourTravelManagementendMail(FormCollection loginCollection)
        {
            string response = loginCollection["response"];
            //string secretKey = System.Web.Configuration.WebConfigurationManager.AppSettings["recaptchaSecretkey"];
            //var client = new WebClient();
            //var result = client.DownloadString(string.Format("https://www.google.com/recaptcha/api/siteverify?secret={0}&response={1}", secretKey, response));
            //var obj = JObject.Parse(result);
            //var status = (bool)obj.SelectToken("success");
            //if (!status)
            //{
            //    return Json(new { error = true, message = "Your response to the recapcha appears to be invalid!" }, JsonRequestBehavior.AllowGet);
            //}

            string browser = loginCollection["browser"];
            string operatingSystem = loginCollection["operatingSystem"];
            string ipAddress = loginCollection["ipAddress"];

            string[] splitedEmail = loginCollection["Email"].Split(new string[] { "@" }, StringSplitOptions.None);

            string email = loginCollection["Email"];

            //if (splitedEmail[1] != "urmigroup.net" || string.IsNullOrEmpty(email))
            //{
            //    return Json(new { error = true, message = "Please give the information properly." }, JsonRequestBehavior.AllowGet);
            //}

            using (var dbContext = new TravelManagementDBcontext())
            {
                UsersGateway usersGateway = new UsersGateway();
                bool isExistUsername = usersGateway.IsExistsEmail(email, dbContext);
                if (isExistUsername)
                {
                    SecurePaswwordHasher securePasswordHasher = new SecurePaswwordHasher();
                    using (var dbContextTransaction = dbContext.Database.BeginTransaction())
                    {
                        try
                        {
                            Random generator = new Random();
                            String verificationCode = generator.Next(0, 1000000).ToString("D6");

                            User user = new User();
                            int emailFlag = EmailUtility.SendPasswordChangeEmail(email, splitedEmail[0], verificationCode);
                            if (emailFlag <= 0)
                            {
                                throw new Exception();
                            }

                            var getUser = usersGateway.GetUserInfoByEmail(email, dbContext);
                            if (getUser == null)
                            {
                                return Json(new { error = true, message = "Invalid request detected!" }, JsonRequestBehavior.AllowGet);
                            }
                            if (getUser.UserRoleId <= 0)
                            {
                                return Json(new { error = true, message = "Access is denied! User Role is not allocated" }, JsonRequestBehavior.AllowGet);

                            }

                            MySession.Current.PasswordChangeVerificationCode = verificationCode;
                            MySession.Current.UserStatus = getUser.UserStatus;
                            MySession.Current.PasswordChangeStatus = PasswordChangeStatus.NotVerified;
                            MySession.Current.UserDisplayName = getUser.FullName.Split()[0];
                            MySession.Current.UserName = getUser.UserName;
                            MySession.Current.UserNo = getUser.UserNo;
                            MySession.Current.Email = getUser.Email;

                            MySession.Current.UserRoleId = getUser.UserRoleId;
                            MySession.Current.RoleTitle = getUser.UserRoleTitle;


                            SessionHistory mySessionHistory = new SessionHistory();
                            mySessionHistory.UserNo = MySession.Current.UserNo;
                            mySessionHistory.Browser = browser;
                            mySessionHistory.OperatingSystem = operatingSystem;
                            mySessionHistory.IPaddress = ipAddress;
                            mySessionHistory.SessionType = "PassChange";

                            SessionHistoriesGateway sessionHistoriesGateway = new SessionHistoriesGateway();

                            int rowAffected = sessionHistoriesGateway.AddMySessionHistory(mySessionHistory, dbContext);

                            if (rowAffected > 0)
                            {
                                dbContext.SaveChanges();
                                dbContextTransaction.Commit();
                                return Json(new { error = false, url = "/acc/forgot_password_verify" }, JsonRequestBehavior.AllowGet);

                            }
                            Session.Abandon();
                            return Json(new { error = true, message = "Access is denied! Your session histories gateway failed to access. Clear chache of your broswer and change the broswer." }, JsonRequestBehavior.AllowGet);
                        }
                        catch (Exception)
                        {
                            dbContextTransaction.Rollback();
                            return Json(new { error = true, message = "User is not saved. Please try again later." }, JsonRequestBehavior.AllowGet);
                        }
                    }
                }
                else
                {
                    return Json(new { error = true, message = "We couldn't find an account with that email address. Please try again with another email." }, JsonRequestBehavior.AllowGet);
                }
            }
        }

        //
        [Route("acc/forgot_password_verify")]
        public ActionResult FindYourAccountVerify()
        {
            if (string.IsNullOrEmpty(MySession.Current.Email) || string.IsNullOrEmpty(MySession.Current.PasswordChangeVerificationCode))
            {
                return Redirect("/acc/forgot_password");
            }
            ViewBag.Email = MySession.Current.Email;
            ViewBag.Sitekey = System.Web.Configuration.WebConfigurationManager.AppSettings["recaptchaSitekey"];
            return View("~/Users/Views/ForgotPasswords/FindYourAccountVerify.cshtml");
        }


        [HttpPost]
        public ActionResult ForgotPasswordVerify(FormCollection loginCollection)
        {
            if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            {
                return JavaScript(string.Format("window.location='{0}://{1}/acc/sign_up'", Request.Url.Scheme, Request.Url.Authority));
            }

            string response = loginCollection["response"];
            //string secretKey = System.Web.Configuration.WebConfigurationManager.AppSettings["recaptchaSecretkey"];
            //var client = new WebClient();
            //var result = client.DownloadString(string.Format("https://www.google.com/recaptcha/api/siteverify?secret={0}&response={1}", secretKey, response));
            //var obj = JObject.Parse(result);
            //var status = (bool)obj.SelectToken("success");
            //if (!status)
            //{
            //    return Json(new { error = true, message = "Your response to the recapcha appears to be invalid!" }, JsonRequestBehavior.AllowGet);
            //}

            string verificationCode = loginCollection["verificationCode"];

            if (string.IsNullOrEmpty(verificationCode))
            {
                return Json(new { error = true, message = "Please give the information properly." }, JsonRequestBehavior.AllowGet);
            }
            if (verificationCode != MySession.Current.PasswordChangeVerificationCode)
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
                    MySession.Current.PasswordChangeStatus = PasswordChangeStatus.Verified;
                    if (MySession.Current.PasswordChangeStatus == PasswordChangeStatus.Verified)
                    {
                        MySession.Current.UserEmailStatus = UserEmailStatus.Verified;
                        return Json(new { error = false, url = "/acc/password_change" }, JsonRequestBehavior.AllowGet);
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
        //
        [Route("acc/password_change")]
        public ActionResult PasswordChange()
        {
            if (string.IsNullOrEmpty(MySession.Current.Email) || MySession.Current.PasswordChangeStatus != PasswordChangeStatus.Verified)
            {
                return Redirect("/acc/forgot_password");
            }
            ViewBag.Sitekey = System.Web.Configuration.WebConfigurationManager.AppSettings["recaptchaSitekey"];
            return View("~/Users/Views/ForgotPasswords/PasswordChange.cshtml");
        }

        [HttpPost]
        public JsonResult UserPasswordChange(FormCollection loginCollection)
        {
            string response = loginCollection["response"];
            //string secretKey = System.Web.Configuration.WebConfigurationManager.AppSettings["recaptchaSecretkey"];
            //var client = new WebClient();
            //var result = client.DownloadString(string.Format("https://www.google.com/recaptcha/api/siteverify?secret={0}&response={1}", secretKey, response));
            //var obj = JObject.Parse(result);
            //var status = (bool)obj.SelectToken("success");
            //if (!status)
            //{
            //    return Json(new { error = true, message = "Your response to the recapcha appears to be invalid!" }, JsonRequestBehavior.AllowGet);
            //}

            string passPhrase = loginCollection["Password"];

            if (string.IsNullOrEmpty(passPhrase)
                || passPhrase.Length < 5
                || loginCollection["Password"] != loginCollection["ConfirmPassword"])
            {
                return Json(new { error = true, message = "Please give the information properly." }, JsonRequestBehavior.AllowGet);
            }
            using (var dbContext = new TravelManagementDBcontext())
            {

                SecurePaswwordHasher securePasswordHasher = new SecurePaswwordHasher();
                passPhrase = securePasswordHasher.Hash(passPhrase);

                using (var dbContextTransaction = dbContext.Database.BeginTransaction())
                {
                    try
                    {
                        User isExistUser = dbContext.Users.Where(u => u.UserNo == MySession.Current.UserNo).SingleOrDefault();
                        if (isExistUser == null)
                        {
                            return Json(new { error = true, message = "Error! Invalid request detected" }, JsonRequestBehavior.AllowGet);
                        }

                        isExistUser.PassPhrase = passPhrase;
                        int rowAffected = dbContext.SaveChanges();
                        if (rowAffected > 0)
                        {
                            dbContext.SaveChanges();
                            dbContextTransaction.Commit();
                            return Json(new { error = false, url = "/a/index" }, JsonRequestBehavior.AllowGet);
                        }

                        return Json(new { error = true, message = "Password is not updated." }, JsonRequestBehavior.AllowGet);
                    }
                    catch (Exception)
                    {
                        dbContextTransaction.Rollback();
                        return Json(new { error = true, message = "User is not saved. Please try again later." }, JsonRequestBehavior.AllowGet);
                    }
                }
            }
        }

    }
}