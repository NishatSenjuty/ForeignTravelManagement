using TravelManagement.Context;
using TravelManagement.Gateway;
using TravelManagement.Models;
using TravelManagement.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;

namespace TravelManagement.Users.Controllers
{
    
    public class UsersController : Controller
    {
        // GET: Users

        //Function For Users Page - Session  *

        [Route("a/users")]
        public ActionResult Index() 
        {
            if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            {
                return Redirect("~/admin/sign_in");
            }

            if (!MySession.Current.NavList.Contains("users")) // means short name in the menulist db table
            {
                return Json(new { error = true, message = "Invalid request detected! You are not authorized to access." }, JsonRequestBehavior.AllowGet);
            }
            return View("~/Users/Views/Users/Index.cshtml");
        }


        //For User function - Show User on grid *
        // [Route("a/users/ShowUsers")]
        [HttpPost]
        public ActionResult ShowUsers(int limit, int companyId, int locationId, int floorId, string userName, int uRoleId, int page)
        {
            if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            {
                return JavaScript(string.Format("window.location='{0}://{1}/admin/sign_in'", Request.Url.Scheme, Request.Url.Authority));
            }
            if (!MySession.Current.NavList.Contains("users"))
            {
                return Json(new { error = true, message = "Invalid request detected! You are not authorized to access." }, JsonRequestBehavior.AllowGet);
            }
            if (limit <= 0 || page <= 0 || uRoleId < -1 || uRoleId == 0)
            {
                return Json(new { error = true, message = "Error! Invalid request detected" }, JsonRequestBehavior.AllowGet);
            }

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                UsersGateway usersGateway = new UsersGateway();
                var userList = usersGateway.GetAllUsers(limit, companyId, locationId, floorId, userName, uRoleId, page, dBcontext);
                if (userList == null)
                {
                    return Json(new { error = true, message = "Error! User lists not found." }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { error = false, data = userList }, JsonRequestBehavior.AllowGet);
            }
        }



        //For User function - Add User - Start save new user action *

        [HttpPost]
        public ActionResult AddUser([Bind(Include = "FullName,Username,Email,ContactNo,UserRoleId,PassPhrase,UserStatus,EnrollCompanyLocationFloors,MenuList")] User user)
        {
            if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            {
                return JavaScript(string.Format("window.location='{0}://{1}/admin/sign_in'", Request.Url.Scheme, Request.Url.Authority));
            }
            if (!MySession.Current.NavList.Contains("users"))
            {
                return Json(new { error = true, message = "Invalid request detected! You are not authorized to access." }, JsonRequestBehavior.AllowGet);
            }
            if (user == null)
            {
                return Json(new { error = true, message = "Error! Invalid request detected" }, JsonRequestBehavior.AllowGet);

            }
            else if (string.IsNullOrEmpty(user.FullName) || string.IsNullOrEmpty(user.UserName)
                || user.UserName.Length < 3 || string.IsNullOrEmpty(user.PassPhrase) || user.PassPhrase.Length < 5 || user.UserRoleId <= 0)
            {
                return Json(new { error = true, message = "Please give the information properly." }, JsonRequestBehavior.AllowGet);
            }
            if (user.UserStatus == UserStatus.active || user.UserStatus == UserStatus.inactive || user.UserStatus == UserStatus.banned)
            {

                user.InsertedBy = MySession.Current.UserNo;
                bool isValidContactNo = BaseClassUtility.IsValidContactNo(user.ContactNo);
                if (isValidContactNo)
                {
                    using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
                    {
                        UsersGateway usersGateway = new UsersGateway();
                        bool isExistUsername = usersGateway.IsExistsUserName(user.UserName, dBcontext);
                        if (!isExistUsername)
                        {
                            SecurePaswwordHasher securePasswordHasher = new SecurePaswwordHasher();
                            user.PassPhrase = securePasswordHasher.Hash(user.PassPhrase);

                            using (var dbContextTransaction = dBcontext.Database.BeginTransaction())
                            {
                                try
                                {
                                    List<EnrollCompanyLocationFloor> enrollCompanyLocationFloors = user.EnrollCompanyLocationFloors;
                                    user.EnrollCompanyLocationFloors = null;
                                    int userNo = usersGateway.SaveUser(user, dBcontext);
                                    if (userNo <= 0)
                                    {
                                        throw new Exception();
                                    }

                                    foreach (EnrollCompanyLocationFloor enrollCompanyLocationFloor in enrollCompanyLocationFloors)
                                    {
                                        //EnrollMenu enrollMenu = new EnrollMenu();
                                        enrollCompanyLocationFloor.UserNo = userNo;
                                        enrollCompanyLocationFloor.User = null;

                                        EnrollCompanyLocationFloorsGateway enrollCompanyLocationFloorsGateway = new EnrollCompanyLocationFloorsGateway();

                                        int rowaffected = enrollCompanyLocationFloorsGateway.SaveEnrollCompanyLocationFloor(enrollCompanyLocationFloor, dBcontext);

                                        if (rowaffected <= 0)
                                        {
                                            throw new Exception();
                                        }
                                    }
                                    foreach (int menuItemId in user.MenuList)
                                    {
                                        EnrollMenu enrollMenu = new EnrollMenu();
                                        enrollMenu.UserNo = userNo;
                                        enrollMenu.MenuItemId = menuItemId;

                                        EnrollMenusGateway enrollMenusGateway = new EnrollMenusGateway();

                                        int rowaffected = enrollMenusGateway.SaveEnrollMenu(enrollMenu, dBcontext);

                                        if (rowaffected <= 0)
                                        {
                                            throw new Exception();
                                        }
                                    }

                                    dBcontext.SaveChanges();
                                    dbContextTransaction.Commit();
                                    return Json(new { error = false, message = "User saved successfully." }, JsonRequestBehavior.AllowGet);
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
                            return Json(new { error = true, message = "Username has already taken." }, JsonRequestBehavior.AllowGet);
                        }
                    }
                }
                else
                {
                    return Json(new { error = true, message = "Please enter a valid phone number." }, JsonRequestBehavior.AllowGet);
                }
            }
            return Json(new { error = true, message = "Please give the information properly." }, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult EditUser([Bind(Include = "UserNo,FullName,Email,ContactNo,UserRoleId,UserStatus," +
            "EnrollCompanyLocationFloors,MenuList,SuperVisorList")] User user)
        {
            if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            {
                return JavaScript(string.Format("window.location='{0}://{1}/admin/sign_in'", Request.Url.Scheme, Request.Url.Authority));
            }


            if (!MySession.Current.NavList.Contains("users"))
            {
                return Json(new { error = true, message = "Invalid request detected! You are not authorized to access." }, JsonRequestBehavior.AllowGet);
            }
            if (user == null)
            {
                return Json(new { error = true, message = "Error! Invalid request detected" }, JsonRequestBehavior.AllowGet);

            }
            else if (string.IsNullOrEmpty(user.FullName) || user.UserNo <= 0 || user.UserRoleId <= 0)
            {
                return Json(new { error = true, message = "Please give the information properly." }, JsonRequestBehavior.AllowGet);
            }
            if (user.UserStatus == UserStatus.active || user.UserStatus == UserStatus.inactive || user.UserStatus == UserStatus.banned)
            {

                user.InsertedBy = MySession.Current.UserNo;
                bool isValidContactNo = BaseClassUtility.IsValidContactNo(user.ContactNo);
                if (isValidContactNo)
                {
                    using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
                    {
                        EnrollCompanyLocationFloorsGateway enrollCompanyLocationFloorsGateway = new EnrollCompanyLocationFloorsGateway();
                        EnrollMenusGateway enrollMenusGateway = new EnrollMenusGateway();
                        UsersGateway usersGateway = new UsersGateway();

                        bool isExistUsername = usersGateway.IsExistsUserNo(user.UserNo, dBcontext);
                        if (isExistUsername)
                        {
                            using (var dbContextTransaction = dBcontext.Database.BeginTransaction())
                            { 
                                //try
                                //{
                                    List<EnrollCompanyLocationFloor> enrollCompanyLocationFloors = user.EnrollCompanyLocationFloors;
                                    user.EnrollCompanyLocationFloors = null;

                                    int userNo = usersGateway.UpdateUser(user, dBcontext);
                                    if (userNo <= 0)
                                    {
                                        throw new Exception();
                                    }



                                    int rowaffect1 = enrollCompanyLocationFloorsGateway.DeleteExistEnrollCompanyLocationFloor(userNo, dBcontext);
                                    if (rowaffect1 <= 0)
                                    {
                                        throw new Exception();
                                    }
                                    foreach (EnrollCompanyLocationFloor enrollCompanyLocationFloor in enrollCompanyLocationFloors)
                                    {
                                        enrollCompanyLocationFloor.UserNo = userNo;
                                        enrollCompanyLocationFloor.User = null;

                                        int rowaffected = enrollCompanyLocationFloorsGateway.SaveEnrollCompanyLocationFloor(enrollCompanyLocationFloor, dBcontext);

                                        if (rowaffected <= 0)
                                        {
                                            throw new Exception();
                                        }
                                    }
                                    int rowaffect2 = enrollMenusGateway.DeleteExistEnrollMenu(userNo, dBcontext);
                                    if (rowaffect2 <= 0)
                                    {
                                        throw new Exception();
                                    }
                                    foreach (int menuItemId in user.MenuList)
                                    {
                                        EnrollMenu enrollMenu = new EnrollMenu();
                                        enrollMenu.UserNo = userNo;
                                        enrollMenu.MenuItemId = menuItemId;


                                        int rowaffected = enrollMenusGateway.SaveEnrollMenu(enrollMenu, dBcontext);

                                        if (rowaffected <= 0)
                                        {
                                            throw new Exception();
                                        }
                                    }

                                    int rowaffect3 = usersGateway.DeleteExistEnrollSupervisor(userNo, dBcontext);
                                    if (rowaffect3 < 0)
                                    {
                                        throw new Exception();
                                    }
                                    if (user.SuperVisorList != null)
                                    {
                                        foreach (int supervisorId in user.SuperVisorList)
                                        {
                                            EnrollSuperVisor enrollSuperVisor = new EnrollSuperVisor();
                                            enrollSuperVisor.UserId = userNo;
                                            enrollSuperVisor.SupervisorId = supervisorId;

                                            UsersGateway userGateway = new UsersGateway();

                                            int rowaffected = userGateway.SaveSuperVisor(enrollSuperVisor, dBcontext);

                                            if (rowaffected <= 0)
                                            {
                                                throw new Exception();
                                            }
                                        }
                                    }

                                    var SupId = dBcontext.EnrollSuperVisors
                                                         .Where(t => t.UserId == user.UserNo)
                                                         .Select(s => s.SupervisorId)
                                                         .ToList();

                                    var SupName = dBcontext.Users
                                                           .Where(t => SupId.Contains(t.UserNo))
                                                           .Select(s => s.UserName)
                                                           .ToList();



                                    //Email (System -> ERPsupport)

                                    string supervisorNames = SupName.Any() ? string.Join(", ", SupName) : "No supervisors";
                                    string emailBody = $"Assigned supervisors: {supervisorNames} <br>";
                                    //string erpEmail = "erpsupport@urmigroup.net";
                                    //string erpEmail = "nishat.tabassum@urmigroup.net";
                                    var Uname = dBcontext.Users.Where(t => t.UserNo == userNo).Select(s => s.UserName).FirstOrDefault();

                                    //int emailFlag = EmailUtility.SendEmailForUserRoleAuthToERP(erpEmail, user.FullName, emailBody, Uname);

                                    //if (emailFlag <= 0)
                                    //{
                                    //    throw new Exception("Email1 throwing unexpected exception.");
                                    //}

                                    string ApplicantEmail = user.Email;
                                    //string ApplicantEmail = "nishat.tabassum@urmigroup.net";

                                    int emailFlag2 = EmailUtility.SendEmailForUserRoleAuthToUser(ApplicantEmail, emailBody, Uname);

                                    if (emailFlag2 <= 0)
                                    {
                                        throw new Exception("Email2 throwing unexpected exception.");
                                    }

                                    dBcontext.SaveChanges();
                                    dbContextTransaction.Commit();
                                    return Json(new { error = false, message = "User updated successfully." }, JsonRequestBehavior.AllowGet);
                                //}
                                //catch (Exception)
                                //{
                                //    dbContextTransaction.Rollback();
                                //    return Json(new { error = true, message = "User is not updated. Please try again later." }, JsonRequestBehavior.AllowGet);
                                //}
                            }
                        }
                        else
                        {
                            return Json(new { error = true, message = "Invalid request detected." }, JsonRequestBehavior.AllowGet);
                        }
                    }
                }
                else
                {
                    return Json(new { error = true, message = "Please enter a valid phone number." }, JsonRequestBehavior.AllowGet);
                }
            }
            return Json(new { error = true, message = "Please give the information properly." }, JsonRequestBehavior.AllowGet);
        }




        [HttpPost]
        public ActionResult ChangePassword(int? userNo, string key, string username, string password)
        {
            if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            {
                return JavaScript(string.Format("window.location='{0}://{1}/admin/sign_in'", Request.Url.Scheme, Request.Url.Authority));
            }
            if (!MySession.Current.NavList.Contains("users"))
            {
                return Json(new { error = true, message = "Invalid request detected! You are not authorized to access." }, JsonRequestBehavior.AllowGet);
            }
            if (MySession.Current.UserRoleId != 1 || key != "urmigroupit") //user means Users short name in the menulist db table
            {
                return Json(new { error = true, message = "You are not authorized to change password." }, JsonRequestBehavior.AllowGet);
            }
            if (userNo == null || userNo <= 0 || string.IsNullOrEmpty(password))
            {
                return Json(new { error = true, message = "Error! Invalid request detected" }, JsonRequestBehavior.AllowGet);

            }
            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                UsersGateway usersGateway = new UsersGateway();
                bool isExistUsername = usersGateway.IsExistsUserName(username, dBcontext);
                if (!isExistUsername)
                {
                    return Json(new { error = true, message = "Error! Invalid request detected" }, JsonRequestBehavior.AllowGet);
                }
                User isExistUser = dBcontext.Users.Where(u => u.UserNo == userNo).Where(u => u.UserName == username).SingleOrDefault();
                if (isExistUser == null)
                {
                    return Json(new { error = true, message = "Error! Invalid request detected" }, JsonRequestBehavior.AllowGet);
                }
                SecurePaswwordHasher securePasswordHasher = new SecurePaswwordHasher();
                var passPhrase = securePasswordHasher.Hash(password);
                isExistUser.PassPhrase = passPhrase;
                int rowAffected = dBcontext.SaveChanges();


                if (rowAffected > 0)
                {
                    return Json(new { error = false, message = "Password updated successfully." }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { error = true, message = "Password is not updated." }, JsonRequestBehavior.AllowGet);

            }
        }


        [HttpPost]
        public ActionResult ShowUsersForDropdown()
        {

            using (TravelManagementDBcontext dbContext = new TravelManagementDBcontext())
            {
                UsersGateway usersGateway = new UsersGateway();
                var supervisorLists = usersGateway.GetSupervisor(dbContext);
                if (supervisorLists == null)
                {
                    return Json(new { error = true, message = "Supervisor data no found." }, JsonRequestBehavior.AllowGet);

                }
                return Json(new { error = false, data = supervisorLists }, JsonRequestBehavior.AllowGet);

            }
        }
    }
}