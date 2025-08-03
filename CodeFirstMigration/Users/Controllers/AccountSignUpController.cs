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
using System.Data.Entity;
using System.IO;
using System.ComponentModel.Design;
using System.Data.Entity.Validation;

namespace TravelManagement.Users.Controllers
{
    public class AccountSignUpController : Controller
    {
        // GET: AccountSignUp
        [Route("acc/sign_up")]
        public ActionResult Index()
        {
            Session.Abandon();
            ViewBag.Sitekey = System.Web.Configuration.WebConfigurationManager.AppSettings["recaptchaSitekey"];
            return View("~/Users/Views/AccountSignUp/Index.cshtml");
        }


        //Muzahid vai


        //[HttpPost]
        //public JsonResult UserSignUp(FormCollection loginCollection)
        //{
        //    string response = loginCollection["response"];
        //    string secretKey = System.Web.Configuration.WebConfigurationManager.AppSettings["recaptchaSecretkey"];
        //    var client = new WebClient();
        //    var result = client.DownloadString(string.Format("https://www.google.com/recaptcha/api/siteverify?secret={0}&response={1}", secretKey, response));
        //    var obj = JObject.Parse(result);
        //    var status = (bool)obj.SelectToken("success");
        //    if (!status)
        //    {
        //        return Json(new { error = true, message = "Your response to the recapcha appears to be invalid!" }, JsonRequestBehavior.AllowGet);
        //    }

        //    string browser = loginCollection["browser"];
        //    string operatingSystem = loginCollection["operatingSystem"];
        //    string ipAddress = loginCollection["ipAddress"];

        //    string[] splitedEmail = loginCollection["Email"].Split(new string[] { "@" }, StringSplitOptions.None);

        //    User user = new User();

        //    user.FullName = loginCollection["Fullname"];
        //    user.FirstName = loginCollection["FirstName"];
        //    user.MiddleName = loginCollection["MiddleName"];
        //    user.LastName = loginCollection["LastName"];
        //    user.DOB = DateParse.StringToDateTime(loginCollection["user.DOBStr"]);
        //    user.Gender = loginCollection["Gender"];

        //    user.ContactNo = loginCollection["ContactNo"];
        //    user.DepartmentId = Convert.ToInt32(loginCollection["DepartmentId"]);
        //    user.DesignationId = Convert.ToInt32(loginCollection["DesignationId"]);

        //    //user.Designation = loginCollection["Designation"];
        //    user.UserName = splitedEmail[0];
        //    user.Email = loginCollection["Email"];
        //    user.PassPhrase = loginCollection["Password"];
        //    user.UserEmailStatus = UserEmailStatus.NotVerified;
        //    //user.ConfirmPassword = loginCollection["ConfirmPassword"];
        //    EnrollCompanyLocationFloor enrollCompanyLocation = new EnrollCompanyLocationFloor();
        //    enrollCompanyLocation.CompanyId = Convert.ToInt32(loginCollection["CompanyId"]);
        //    enrollCompanyLocation.LocationId = Convert.ToInt32(loginCollection["LocationId"]);
        //    user.EnrollCompanyLocationFloors = new List<EnrollCompanyLocationFloor>();
        //    user.EnrollCompanyLocationFloors.Add(enrollCompanyLocation);
        //    if (splitedEmail[1] != "urmigroup.net" || string.IsNullOrEmpty(user.FullName) || string.IsNullOrEmpty(user.UserName)
        //        || user.UserName.Length < 3 || string.IsNullOrEmpty(user.PassPhrase)
        //        || user.PassPhrase.Length < 5
        //        || loginCollection["Password"] != loginCollection["ConfirmPassword"])
        //    {
        //        return Json(new { error = true, message = "Please give the information properly." }, JsonRequestBehavior.AllowGet);
        //    }

        //    bool isValidContactNo = BaseClassUtility.IsValidContactNo(user.ContactNo);
        //    if (!isValidContactNo)
        //    {
        //        return Json(new { error = true, message = "Please enter a valid contact number." }, JsonRequestBehavior.AllowGet);
        //    }
        //    using (var dbContext = new TravelManagementDBcontext())
        //    {
        //        user.UserRoleId = dbContext.UserRoles.Where(x => x.UserRoleTitle == "Employee").Select(x => x.UserRoleId).SingleOrDefault();
        //        if (user.UserRoleId <= 0)
        //        {
        //            throw new Exception();
        //        }
        //        UsersGateway _iUsersGateway = new UsersGateway();
        //        bool isExistUsername = _iUsersGateway.IsExistsEmail(user.Email, dbContext);
        //        if (!isExistUsername)
        //        {
        //            SecurePaswwordHasher securePasswordHasher = new SecurePaswwordHasher();
        //            user.PassPhrase = securePasswordHasher.Hash(user.PassPhrase);

        //            using (var dbContextTransaction = dbContext.Database.BeginTransaction())
        //            {
        //                //try
        //                //{
        //                List<EnrollCompanyLocationFloor> enrollCompanyLocations = user.EnrollCompanyLocationFloors;
        //                user.EnrollCompanyLocationFloors = null;
        //                int userNo = _iUsersGateway.SaveUser(user, dbContext);
        //                if (userNo <= 0)
        //                {
        //                    throw new Exception();
        //                }

        //                foreach (EnrollCompanyLocationFloor enrollCompanyLocationObj in enrollCompanyLocations)
        //                {
        //                    //EnrollMenu enrollMenu = new EnrollMenu();
        //                    enrollCompanyLocationObj.UserNo = userNo;
        //                    enrollCompanyLocationObj.User = null;

        //                    EnrollCompanyLocationFloorsGateway enrollCompanyLocationsGateway = new EnrollCompanyLocationFloorsGateway();
        //                    int rowaffected = enrollCompanyLocationsGateway.SaveEnrollCompanyLocationFloor(enrollCompanyLocationObj, dbContext);

        //                    if (rowaffected <= 0)
        //                    {
        //                        throw new Exception();
        //                    }
        //                }

        //                Random generator = new Random();
        //                String verificationCode = generator.Next(0, 1000000).ToString("D6");

        //                int emailFlag = EmailUtility.SendEmail(user.Email, user.UserName, verificationCode);
        //                if (emailFlag <= 0)
        //                {
        //                    throw new Exception();
        //                }

        //                var getUser = _iUsersGateway.GetUserInfoByEmail(user.Email, dbContext);
        //                if (getUser == null)
        //                {
        //                    return Json(new { error = true, message = "Invalid request detected!" }, JsonRequestBehavior.AllowGet);
        //                }
        //                if (getUser.UserRoleId <= 0)
        //                {
        //                    return Json(new { error = true, message = "Access is denied! User Role is not allocated" }, JsonRequestBehavior.AllowGet);

        //                }
        //                if (getUser.CompaniesId.Count == 0 || getUser.LocationsId.Count == 0)
        //                {
        //                    return Json(new { error = true, message = "Access is denied! Company and Unit is not allocated" }, JsonRequestBehavior.AllowGet);
        //                }

        //                MySession.Current.VerificationCode = verificationCode;
        //                MySession.Current.UserStatus = getUser.UserStatus;
        //                MySession.Current.UserDisplayName = getUser.FullName.Split()[0];
        //                MySession.Current.UserName = getUser.UserName;
        //                MySession.Current.UserNo = getUser.UserNo;
        //                MySession.Current.Email = getUser.Email;
        //                //int loginId = MySession.Current.AdminId;

        //                MySession.Current.UserRoleId = getUser.UserRoleId;
        //                MySession.Current.RoleTitle = getUser.UserRoleTitle;
        //                //MySession.Current.NavList = getUser.NavList;
        //                //MySession.Current.NavListDetails = getUser.EnrollMenus;

        //                //MySession.Current.CompaniesId = new int[] { };
        //                MySession.Current.CompaniesId = getUser.CompaniesId.ToArray();
        //                MySession.Current.LocationsId = getUser.LocationsId.ToArray();


        //                SessionHistory mySessionHistory = new SessionHistory();
        //                mySessionHistory.UserNo = MySession.Current.UserNo;
        //                mySessionHistory.Browser = browser;
        //                mySessionHistory.OperatingSystem = operatingSystem;
        //                mySessionHistory.IPaddress = ipAddress;

        //                SessionHistoriesGateway _iMySessionHistoriesGateway = new SessionHistoriesGateway();

        //                int rowAffected = _iMySessionHistoriesGateway.AddMySessionHistory(mySessionHistory, dbContext);

        //                if (rowAffected > 0)
        //                {
        //                    dbContext.SaveChanges();
        //                    dbContextTransaction.Commit();
        //                    return Json(new { error = false, url = "/acc/verify" }, JsonRequestBehavior.AllowGet);

        //                }
        //                Session.Abandon();
        //                return Json(new { error = true, message = "Access is denied! Your session histories gateway failed to access. Clear chache of your broswer and change the broswer." }, JsonRequestBehavior.AllowGet);
        //                //}
        //                //catch (Exception ex)
        //                //{
        //                //    dbContextTransaction.Rollback();
        //                //    return Json(new { error = true, message = "User is not saved. Please try again later." }, JsonRequestBehavior.AllowGet);
        //                //}
        //            }
        //        }
        //        else
        //        {
        //            return Json(new { error = true, message = "Email has already taken. If your Sign Up your account already, please Sign In to the system." }, JsonRequestBehavior.AllowGet);
        //        }
        //    }
        //}


        //Nishat

        [HttpPost]
        public JsonResult UserSignUp(FormCollection loginCollection)
        {

            using (TravelManagementDBcontext dbContext = new TravelManagementDBcontext())
            {
                //dbContext.Database.CommandTimeout = 300;

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

                User user = new User();

                user.EmployeeId = loginCollection["EmployeeId"];
                user.FullName = loginCollection["Fullname"];
                user.FirstName = loginCollection["FirstName"];
                user.MiddleName = loginCollection["MiddleName"];
                user.LastName = loginCollection["LastName"];
                user.DOB = DateParse.StringToDateTime(loginCollection["DOBStr"]);
                user.Gender = loginCollection["Gender"];
                user.Nationality = loginCollection["Nationality"];
                user.PresentAddress = loginCollection["PresentAddress"];
                user.EmgContactNo = loginCollection["EmgContactNo"];
                user.ContactNo = loginCollection["ContactNo"];
                user.DepartmentId = Convert.ToInt32(loginCollection["DepartmentId"]);
                user.DesignationId = Convert.ToInt32(loginCollection["DesignationId"]);
                user.PrimaryCompanyId = Convert.ToInt32(loginCollection["PrimaryCompanyId"]);
                user.PrimaryLocationId = Convert.ToInt32(loginCollection["PrimaryLocationId"]);
                user.UserName = splitedEmail[0];
                user.Email = loginCollection["Email"];
                user.PassPhrase = loginCollection["Password"];
                user.UserEmailStatus = UserEmailStatus.NotVerified;
                //user.ConfirmPassword = loginCollection["ConfirmPassword"];

                UsersGateway _iUsersGateway = new UsersGateway();

                EnrollCompanyLocationFloor enrollCompanyLocation = new EnrollCompanyLocationFloor();
                enrollCompanyLocation.CompanyId = Convert.ToInt32(loginCollection["PrimaryCompanyId"]);
                enrollCompanyLocation.LocationId = Convert.ToInt32(loginCollection["PrimaryLocationId"]);


                user.EnrollCompanyLocationFloors = new List<EnrollCompanyLocationFloor>();
                user.EnrollCompanyLocationFloors.Add(enrollCompanyLocation);

                if (splitedEmail[1] != "urmigroup.net" || string.IsNullOrEmpty(user.FullName) || string.IsNullOrEmpty(user.UserName)
                    || user.UserName.Length < 3 || string.IsNullOrEmpty(user.PassPhrase)
                    || user.PassPhrase.Length < 5
                    || loginCollection["Password"] != loginCollection["ConfirmPassword"])
                {
                    return Json(new { error = true, message = "Please give the information properly." }, JsonRequestBehavior.AllowGet);
                }

                //bool isValidContactNo = BaseClassUtility.IsValidContactNo(user.ContactNo);
                //if (!isValidContactNo)
                //{
                //    return Json(new { error = true, message = "Please enter a valid contact number." }, JsonRequestBehavior.AllowGet);
                //}

                //using (var dbContext = new TravelManagementDBcontext())
                {
                    user.UserRoleId = dbContext.UserRoles.Where(x => x.UserRoleTitle == "Employee").Select(x => x.UserRoleId).SingleOrDefault();
                    if (user.UserRoleId <= 0)
                    {
                        throw new Exception("Uder Role Id could not be found.");
                    }

                    //UsersGateway _iUsersGateway = new UsersGateway();

                    bool isExistUsername = _iUsersGateway.IsExistsEmail(user.Email, dbContext);
                    if (!isExistUsername)
                    {
                        SecurePaswwordHasher securePasswordHasher = new SecurePaswwordHasher();
                        user.PassPhrase = securePasswordHasher.Hash(user.PassPhrase);

                        using (var dbContextTransaction = dbContext.Database.BeginTransaction())
                        {
                            //dbContext.Database.CommandTimeout = 3600;
                            try
                            {
                                List<EnrollCompanyLocationFloor> enrollCompanyLocations = user.EnrollCompanyLocationFloors;
                                user.EnrollCompanyLocationFloors = null;
                                int userNo = _iUsersGateway.SaveUser(user, dbContext);
                                if (userNo <= 0)
                                {
                                    throw new Exception("Saving failed.");
                                }

                                foreach (EnrollCompanyLocationFloor enrollCompanyLocationObj in enrollCompanyLocations)
                                {

                                    enrollCompanyLocationObj.UserNo = userNo;
                                    enrollCompanyLocationObj.User = null;
                                    enrollCompanyLocationObj.CompanyId = enrollCompanyLocation.CompanyId;
                                    enrollCompanyLocationObj.LocationId = enrollCompanyLocation.LocationId;

                                    EnrollCompanyLocationFloorsGateway enrollCompanyLocationsGateway = new EnrollCompanyLocationFloorsGateway();
                                    int rowaffected = enrollCompanyLocationsGateway.SaveEnrollCompanyLocationFloor(enrollCompanyLocationObj, dbContext);

                                    if (rowaffected <= 0)
                                    {
                                        throw new Exception("Something while saving floor went wrong.");
                                    }
                                }

                                Random generator = new Random();
                                String verificationCode = generator.Next(0, 1000000).ToString("D6");

                                //int emailFlag = EmailUtility.SendEmail(user.Email, user.UserName, verificationCode);
                                //if (emailFlag <= 0)
                                //{
                                //    throw new Exception();
                                //}

                                var getUser = _iUsersGateway.GetUserInfoByEmail(user.Email, dbContext);
                                if (getUser == null)
                                {
                                    return Json(new { error = true, message = "Invalid request detected!" }, JsonRequestBehavior.AllowGet);
                                }
                                if (getUser.UserRoleId <= 0)
                                {
                                    return Json(new { error = true, message = "Access is denied! User Role is not allocated" }, JsonRequestBehavior.AllowGet);

                                }
                                if (getUser.CompaniesId.Count == 0 || getUser.LocationsId.Count == 0)
                                {
                                    return Json(new { error = true, message = "Access is denied! Company and Unit is not allocated" }, JsonRequestBehavior.AllowGet);
                                }

                                MySession.Current.VerificationCode = verificationCode;
                                MySession.Current.UserStatus = getUser.UserStatus;
                                MySession.Current.UserDisplayName = getUser.FullName.Split()[0];
                                MySession.Current.UserName = getUser.UserName;
                                MySession.Current.UserNo = getUser.UserNo;
                                MySession.Current.Email = getUser.Email;

                                MySession.Current.UserRoleId = getUser.UserRoleId;
                                MySession.Current.RoleTitle = getUser.UserRoleTitle;
                                MySession.Current.CompaniesId = getUser.CompaniesId.ToArray();
                                MySession.Current.LocationsId = getUser.LocationsId.ToArray();


                                SessionHistory mySessionHistory = new SessionHistory();
                                mySessionHistory.UserNo = MySession.Current.UserNo;
                                mySessionHistory.Browser = browser;
                                mySessionHistory.OperatingSystem = operatingSystem;
                                mySessionHistory.IPaddress = ipAddress;

                                SessionHistoriesGateway _iMySessionHistoriesGateway = new SessionHistoriesGateway();

                                int rowAffected = _iMySessionHistoriesGateway.AddMySessionHistory(mySessionHistory, dbContext);

                                if (rowAffected > 0)
                                {
                                    dbContext.SaveChanges();

                                    try
                                    {
                                        //File Attachment
                                        for (int i = 0; i < Request.Files.Count; i++)
                                        {
                                            HttpPostedFileBase files = Request.Files[i];

                                            SignUpFileAttachment signUpFileAttachment1 = new SignUpFileAttachment();
                                            signUpFileAttachment1.FileName = "Files";
                                            signUpFileAttachment1.FileType = Request.Files.AllKeys[i] == "PassportFiles" ? 1 : 2;
                                            signUpFileAttachment1.UserNo = userNo;
                                            //signUpFileAttachment1.Users = null;

                                            signUpFileAttachment1 = SaveOrderFile(files, signUpFileAttachment1);

                                            if (signUpFileAttachment1 == null || signUpFileAttachment1.UserNo <= 0)
                                            {
                                                throw new Exception("File saving failed.");
                                            }

                                            dbContext.SignUpFileAttachments.Add(signUpFileAttachment1);
                                            int rowAffected1 = dbContext.SaveChanges();

                                            if (rowAffected1 <= 0)
                                            {
                                                throw new Exception($"{files.FileName} File information saving failed.");
                                            }
                                        }
                                    }
                                    catch (Exception ex)
                                    {
                                        //dbContextTransaction.Rollback();
                                        throw ex;
                                    }


                                    dbContextTransaction.Commit();


                                    //Email (System -> ERPsupport)

                                    var ApplicantNo = userNo;
                                    string erpEmail = "erpsupport@urmigroup.net";
                                    //string erpEmail = "nishat.tabassum@urmigroup.net";

                                    int emailFlag = EmailUtility.SendEmailToERP(erpEmail, getUser.FullName, getUser.UserName);

                                    if (emailFlag <= 0)
                                    {
                                        throw new Exception("Email1 throwing unexpected exception.");
                                    }


                                    string AshrafiEmail = "mahiur_hr@urmigroup.net";
                                    //string AshrafiEmail = "nishat.tabassum@urmigroup.net";

                                    int emailFlag2 = EmailUtility.SendEmailToERP(AshrafiEmail, getUser.FullName, getUser.UserName);

                                    if (emailFlag2 <= 0)
                                    {
                                        throw new Exception("Email2 throwing unexpected exception.");
                                    }

                                    return Json(new { error = false, message = "Operation Successful.", url = "/Accounts/AddSignIn" /*"/acc/verify"*/ }, JsonRequestBehavior.AllowGet);

                                }
                                Session.Abandon();
                                return Json(new { error = true, message = "Access is denied! Your session histories gateway failed to access. Clear chache of your broswer and change the broswer." }, JsonRequestBehavior.AllowGet);
                            }
                            //catch (Exception ex)
                            //{


                            //    dbContextTransaction.Rollback();
                            //    return Json(new { error = true, message = ex.InnerException.Message }, JsonRequestBehavior.AllowGet);
                            //    //return Json(new { error = true, message = "User is not saved. Please try again later." }, JsonRequestBehavior.AllowGet);
                            //}

                            catch (DbEntityValidationException ex)
                            {
                                string str = "";
                                foreach (DbEntityValidationResult entityValidationError in ex.EntityValidationErrors)
                                {
                                    string name = entityValidationError.Entry.Entity.GetType().Name;
                                    foreach (DbValidationError validationError in (IEnumerable<DbValidationError>)entityValidationError.ValidationErrors)
                                        str += string.Format("Error '{0}' occurred in {1} at {2}\n", validationError.ErrorMessage, name, validationError.PropertyName);
                                }

                                dbContextTransaction.Rollback();
                                return Json(new { error = true, message = str }, JsonRequestBehavior.AllowGet);
                            }
                        }
                    }
                    else
                    {
                        return Json(new { error = true, message = "Email has already taken. If your Sign Up your account already, please Sign In to the system." }, JsonRequestBehavior.AllowGet);
                    }




                }
            }
        }


        public SignUpFileAttachment SaveOrderFile(HttpPostedFileBase file, SignUpFileAttachment signUpFileAttachment)
        {
            try
            {
                BaseClassUtilitiesNonStatic baseClassUtilitiesNonStatic = new BaseClassUtilitiesNonStatic();

                signUpFileAttachment.FileName = "File_" + Guid.NewGuid() + Path.GetExtension(file.FileName);
                //signUpFileAttachment.FileName = "File_" + baseClassUtilitiesNonStatic.RandomString(6) + Path.GetExtension(file.FileName);
                string directoryPath = Server.MapPath("/Files/SignUp");
                if (!Directory.Exists(directoryPath))
                {
                    Directory.CreateDirectory(directoryPath);
                }
                string serverPath = Path.Combine(Server.MapPath("/Files/SignUp"), signUpFileAttachment.FileName);
                string location = "/Files/SignUp/" + signUpFileAttachment.FileName;
                signUpFileAttachment.location = location;
                bool fileExist = System.IO.File.Exists(serverPath);
                if (fileExist)
                {
                    throw new Exception();
                }
                file.SaveAs(serverPath);

                return signUpFileAttachment;

            }
            catch (Exception ex)
            {
                return null;
            }
        }

    }
}