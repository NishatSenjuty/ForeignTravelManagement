using TravelManagement.Context;
using TravelManagement.Gateway;
using TravelManagement.Models;
using TravelManagement.Utilities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Security.Cryptography.X509Certificates;
using System.Web;
using System.Web.Mvc;
using System.Web.UI.WebControls;

namespace TravelManagement.Users.Controllers
{
    public class TravelManagementController : Controller
    {
        // GET: TravelManagement
        [Route("")]
        [Route("admin/sign_in")]
        public ActionResult Index()
        {
            Session.Abandon();
            ViewBag.Sitekey = System.Web.Configuration.WebConfigurationManager.AppSettings["recaptchaSitekey"];
            return View("~/Users/Views/Accounts/Index.cshtml");

        }

        [Route("404")]
        public ActionResult Error404()
        {
            if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            {
                return Redirect("~/admin/sign_in");
            }
            return View("~/Users/Views/Accounts/Error404.cshtml");

        }

        [HttpPost]
        [Route("Accounts/AddSignIn")]
        public JsonResult AdminSignIn(FormCollection loginCollection)
        {
            string username = loginCollection["username"];
            string password = loginCollection["password"];
            string browser = loginCollection["browser"];
            string operatingSystem = loginCollection["operatingSystem"];
            string ipAddress = loginCollection["ipAddress"];
            string email = loginCollection["email"];

            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
            {
                return Json(new { error = true, message = "Error! Invalid request detected." }, JsonRequestBehavior.AllowGet);
            }

            using (var dbContext = new TravelManagementDBcontext())
            {
                UsersGateway usersGateway = new UsersGateway();


                bool isExistuser = usersGateway.IsExistsUserName(username, dbContext);

                if (!isExistuser)
                {
                    return Json(new { error = true, message = "You have entered invalid credentials. Please try again with valid credentials." }, JsonRequestBehavior.AllowGet);
                }


                bool isActiveUser = usersGateway.IsActiveUser(username, dbContext);
                if (!isActiveUser)
                {
                    return Json(new { error = true, message = "Your account have been banned or deactived. You can contact with administrator." }, JsonRequestBehavior.AllowGet);
                }


                string hashedPassword = usersGateway.GetHashedPasswordByUsername(username, dbContext);
                if (hashedPassword == null)
                {
                    return Json(new { error = true, message = "Access is denied! Something went wrong." }, JsonRequestBehavior.AllowGet);
                }
                SecurePaswwordHasher securePasswordHasher = new SecurePaswwordHasher();

                bool isVerifiedPassword = securePasswordHasher.VerifyPassword(password, hashedPassword);

                if (isVerifiedPassword)
                {
                    var user = usersGateway.GetUserInfoByUsername(username, dbContext);

                    if (user == null)
                    {
                        return Json(new { error = true, message = "Invalid request detected!" }, JsonRequestBehavior.AllowGet);
                    }
                    if (user.UserRoleId <= 0)
                    {
                        return Json(new { error = true, message = "Access is denied! User Role is not allocated" }, JsonRequestBehavior.AllowGet);
                    }

                    // Check if user has necessary permissions in EnrollMenus

                    int FetchUserNo = dbContext.Users
                        .Where(e => e.UserName == username)
                        .Select(e => e.UserNo)
                        .FirstOrDefault();

                    bool userHasPermission = dbContext.EnrollMenus
                        .Any(e => e.UserNo == FetchUserNo);

                    if (!userHasPermission)
                    {
                        return Json(new { error = true, message = "Access is denied! Please wait until administrator gives you necessary permissions. For further assistance, contact the Travel Desk or HR team." }, JsonRequestBehavior.AllowGet);
                    }



                    //if (user.CompaniesId.Count == 0 || user.LocationsId.Count == 0 || user.FloorsId.Count == 0)
                    //{
                    //    return Json(new { error = true, message = "Access is denied! Company and Unit are not allocated" }, JsonRequestBehavior.AllowGet);
                    //}

                    try
                    {
                        int userNo = Convert.ToInt16(user.UserNo);
                        var logCount = dbContext.LoginAttempt.Where(w => w.UserNo == userNo).ToList();
                        if (logCount != null)
                        {
                            dbContext.LoginAttempt.RemoveRange(logCount);
                            dbContext.SaveChanges();
                        }


                        MySession.Current.UserDisplayName = user.FullName.Split()[0];   //setting session with user data

                        MySession.Current.UserName = user.UserName;
                        MySession.Current.UserNo = user.UserNo;

                        MySession.Current.UserRoleId = user.UserRoleId;
                        MySession.Current.RoleTitle = user.UserRoleTitle;
                        MySession.Current.NavList = user.NabList;
                        MySession.Current.NavListDetails = user.EnrollMenus;


                        MySession.Current.CompaniesId = user.CompaniesId.ToArray();
                        MySession.Current.LocationsId = user.LocationsId.ToArray();
                        MySession.Current.FloorsId = user.FloorsId.ToArray();


                        SessionHistory mySessionHistory = new SessionHistory();

                        mySessionHistory.UserNo = MySession.Current.UserNo;
                        mySessionHistory.Browser = browser;
                        mySessionHistory.OperatingSystem = operatingSystem;
                        mySessionHistory.IPaddress = ipAddress;


                        SessionHistoriesGateway mySessionHistoriesGateway = new SessionHistoriesGateway();

                        int rowAffected = mySessionHistoriesGateway.AddMySessionHistory(mySessionHistory, dbContext);

                        if (rowAffected > 0)
                        {
                            return Json(new { error = false, url = "/a/index" }, JsonRequestBehavior.AllowGet);
                        }
                        Session.Abandon();
                        return Json(new { error = true, message = "Access is denied! Your session histories gateway failed to access. Clear chache of your broswer and change the broswer." }, JsonRequestBehavior.AllowGet);
                    }
                    catch (Exception ex)
                    {
                        return Json(new { error = true, message = "Something went wrong." }, JsonRequestBehavior.AllowGet);
                    }
                }
            }

            using (var dbContext = new TravelManagementDBcontext())
            {
                UsersGateway usersGateway = new UsersGateway();
                var user = usersGateway.GetUserInfoByUsername(username, dbContext);
                int userNo = Convert.ToInt16(user.UserNo);
                var oldLoginAttempt = dbContext.LoginAttempt.Where(w => w.UserNo == userNo).FirstOrDefault();


                int attemptCount = dbContext.LoginAttempt.Count(w => w.UserNo == userNo) + 1;
                DateTime StartDate = new DateTime(1900, 01, 01);
                DateTime EndDate = new DateTime(1900, 01, 01);
                int totalMinutes = 0;

                var loginAttempt = new LoginAttempt();
                loginAttempt.UserNo = userNo;
                loginAttempt.AttemptType = "Login";
                loginAttempt.LoginDateTime = DateTime.Now;
                loginAttempt.Browser = browser;
                loginAttempt.OperatingSystem = operatingSystem;
                loginAttempt.IPaddress = ipAddress;
                loginAttempt.LoginAttemptNo = attemptCount.ToString();
                dbContext.LoginAttempt.Add(loginAttempt);
                dbContext.SaveChanges();

                if (attemptCount > 2)
                {
                    var LogCount1 = dbContext.LoginAttempt.Where(w => w.UserNo == userNo).ToList();
                    StartDate = LogCount1.OrderBy(o => o.LoginDateTime).FirstOrDefault().LoginDateTime;
                    EndDate = LogCount1.OrderByDescending(o => o.LoginDateTime).FirstOrDefault().LoginDateTime;
                    TimeSpan TotTime = EndDate.Subtract(StartDate);
                    totalMinutes = Convert.ToInt32(TotTime.TotalMinutes);

                    if (totalMinutes > 1)
                    {

                        var userInfoCheck = dbContext.Users.Where(w => w.UserNo == userNo).FirstOrDefault();
                        userInfoCheck.UserStatus = UserStatus.banned;
                        dbContext.SaveChanges();

                        var user1 = usersGateway.GetUserInfoByUsername(username, dbContext);

                        String email1 = user1.Email;
                        String FullName = user1.FullName;

                        var emailSend = new User();

                        emailSend.FullName = "Test";
                        emailSend.UserName = "Hello";
                        emailSend.PassPhrase = "Password";

                        int emailFlag = EmailUtility.SendEmail(email1, FullName, "Have a good day!");
                        try
                        {
                            if (emailFlag <= 0)
                            {
                                throw new Exception("Email Could not be sent.");
                            }
                        }
                        catch { }
                        return Json(new { error = true, message = "You are banned from the system. Please contact the administrator." }, JsonRequestBehavior.AllowGet);
                    }
                }
            }
            return Json(new { error = true, message = "You have entered invalid credentials. Please try again with valid credentials.<br/><b>Warning:</b> if you enter invalid password many times, you will be <b>banned</b> from the system." }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetNavBar()
        {
            return Json(new { error = false, navtabs = MySession.Current.NavListDetails, DisplayName = MySession.Current.UserDisplayName, username = MySession.Current.UserName, MySession.Current.UserRoleId, MySession.Current.RoleTitle }, JsonRequestBehavior.AllowGet);

        }
    }
}


