using TravelManagement.Context;
using TravelManagement.Gateway;
using TravelManagement.Models;
using TravelManagement.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;
using System.Data.Entity;

namespace TravelManagement.Users.Controllers
{
    public class MyProfileController : Controller
    {
        // GET: MyProfile
        [Route("a/my_profile")]
        public ActionResult Index()
        {
            if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            {
                return Redirect("~/admin/sign_in");
            }
            return View("~/Users/Views/MyProfile/Index.cshtml");
        }

        [HttpPost]
        public ActionResult GetMyProfile()
        {
            if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            {
                return JavaScript(string.Format("window.location='{0}://{1}/admin/sign_in'", Request.Url.Scheme, Request.Url.Authority));
            }

            using (TravelManagementDBcontext dbContext = new TravelManagementDBcontext())
            {

                var data = dbContext.Users
                    .Where(x => x.UserNo == MySession.Current.UserNo)
                    .Select(x => new
                    {
                        x.UserNo,
                        x.FullName,
                        x.ContactNo,
                        x.EmployeeId,
                        x.FirstName,
                        x.MiddleName,
                        x.LastName,
                        x.Email,
                        x.DepartmentId,
                        x.DesignationId,
                        x.DOB,
                        x.Gender,
                        x.Nationality,
                        x.PresentAddress,
                        x.EmgContactNo,
                        x.EnrollCompanyLocationFloors,

                        totissue = dbContext.SignUpFileAttachments
                            .Where(n => n.UserNo == x.UserNo)
                            .Select(co1 => new
                            {
                                co1.Id,
                                co1.FileType,
                                co1.FileActiveStatus,
                                co1.location,
                                co1.UserNo
                            }).ToList(),

                    }).SingleOrDefault();


                if (data == null)
                {
                    return Json(new { error = false, message = "Something went wrong!" }, JsonRequestBehavior.AllowGet);
                }

                return Json(new { error = false, data }, JsonRequestBehavior.AllowGet);
            }
        }

        //[HttpPost]
        //public JsonResult UpdateUserSignUp([Bind(Include = "UserNo,FullName,ContactNo,DepartmentId,Designation,EnrollCompanyLocationFloors")] User user)
        //{
        //    if (user.UserNo <= 0 || user.EnrollCompanyLocationFloors.Count <= 0)
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
        //        using (var dbContextTransaction = dbContext.Database.BeginTransaction())
        //        {
        //            try
        //            {
        //                UsersGateway _iUsersGateway = new UsersGateway();
        //                List<EnrollCompanyLocationFloor> enrollCompanyLocations = user.EnrollCompanyLocationFloors;
        //                user.EnrollCompanyLocationFloors = null;
        //                int userNo = _iUsersGateway.UpdateUserByOwn(user, dbContext);
        //                if (userNo <= 0)
        //                {
        //                    throw new Exception();
        //                }


        //                EnrollCompanyLocationFloorsGateway enrollCompanyLocationsGateway = new EnrollCompanyLocationFloorsGateway();

        //                int companyLocationRetCount = enrollCompanyLocationsGateway.DeleteExistEnrollCompanyLocationRetCount(userNo, dbContext);
        //                if (companyLocationRetCount != 0)
        //                {
        //                    throw new Exception("An Error Has Occurred in Deleting Company Location Info.");
        //                }
        //                foreach (EnrollCompanyLocationFloor enrollCompanyLocationObj in enrollCompanyLocations)
        //                {
        //                    //EnrollMenu enrollMenu = new EnrollMenu();
        //                    enrollCompanyLocationObj.UserNo = userNo;
        //                    enrollCompanyLocationObj.User = null;

        //                    int rowaffected = enrollCompanyLocationsGateway.SaveEnrollCompanyLocationFloor(enrollCompanyLocationObj, dbContext);

        //                    if (rowaffected <= 0)
        //                    {
        //                        throw new Exception();
        //                    }
        //                }
        //                dbContextTransaction.Commit();
        //                return Json(new { error = false, message = "User is updated successfully." }, JsonRequestBehavior.AllowGet);
        //            }
        //            catch (Exception)
        //            {
        //                dbContextTransaction.Rollback();
        //                return Json(new { error = true, message = "User is not updated. Please try again later." }, JsonRequestBehavior.AllowGet);
        //            }
        //        }
        //    }
        //}

        //[HttpPost]
        //public JsonResult UpdateUserSignUp([Bind(Include = "UserNo,EmployeeId,FullName,FirstName,MiddleName,LastName,DOBStr,Gender,Nationality,PresentAddress," +
        //"EmgContactNo,Email,ContactNo,DepartmentId,DesignationId,EnrollCompanyLocationFloors")] User user)
        //{
        //    if (user.UserNo <= 0 || user.EnrollCompanyLocationFloors.Count <= 0)
        //    {
        //        return Json(new { error = true, message = "Please give the information properly." }, JsonRequestBehavior.AllowGet);
        //    }

        //    bool isValidContactNo = BaseClassUtility.IsValidContactNo(user.ContactNo);
        //    if (!isValidContactNo)
        //    {
        //        return Json(new { error = true, message = "Please enter a valid contact number." }, JsonRequestBehavior.AllowGet);
        //    }

        //    using (var dBcontext = new TravelManagementDBcontext())
        //    {
        //        using (var dbContextTransaction = dBcontext.Database.BeginTransaction())
        //        {
        //            try
        //            {
        //                user.DOB = DateParse.StringToDateTime(user.DOBStr);

        //                UsersGateway _iUsersGateway = new UsersGateway();
        //                SignUpFileAttachment signUpFileAttachment = new SignUpFileAttachment();

        //                // File Attachment

        //                if (Request.Files.Count == 0)
        //                {
        //                    dBcontext.Entry(signUpFileAttachment).Property("location").IsModified = false;
        //                }

        //                for (int i = 0; i < Request.Files.Count; i++)
        //                {
        //                    if (Request.Files.AllKeys[i] == "PassportFiles")
        //                    {
        //                        HttpPostedFileBase files = Request.Files[i];
        //                        signUpFileAttachment.FileName = "Files";
        //                        signUpFileAttachment.FileType = 1;
        //                        signUpFileAttachment.UserNo = user.UserNo;

        //                        List<int> fileId = dBcontext.SignUpFileAttachments
        //                            .Where(e => e.UserNo == user.UserNo && e.FileType == 1)
        //                            .Select(e => e.Id)
        //                            .ToList();

        //                        if (fileId.Count == 0)
        //                        {
        //                            return Json(new { error = true, message = "Invalid File ID." }, JsonRequestBehavior.AllowGet);
        //                        }

        //                        signUpFileAttachment.Id = fileId[0];



        //                        signUpFileAttachment = SaveOrderFile(files, signUpFileAttachment);

        //                        if (signUpFileAttachment == null || signUpFileAttachment.UserNo <= 0)
        //                        {
        //                            throw new Exception("File saving failed.");
        //                        }

        //                        int rowAffected1 = _iUsersGateway.UpdateUserPassportAndNID(signUpFileAttachment, dBcontext);

        //                        if (rowAffected1 <= 0)
        //                        {
        //                            throw new Exception("File information saving failed.");
        //                        }
        //                    }
        //                }

        //                // NID

        //                if (Request.Files.Count == 0)
        //                {
        //                    dBcontext.Entry(signUpFileAttachment).Property("location").IsModified = false;
        //                }

        //                for (int i = 0; i < Request.Files.Count; i++)
        //                {
        //                    if (Request.Files.AllKeys[i] == "NIDFiles")
        //                    {
        //                        HttpPostedFileBase files = Request.Files[i];
        //                        signUpFileAttachment.FileName = "Files";
        //                        signUpFileAttachment.FileType = 2;
        //                        signUpFileAttachment.UserNo = user.UserNo;

        //                        List<int> fileId = dBcontext.SignUpFileAttachments
        //                            .Where(e => e.UserNo == user.UserNo && e.FileType == 2)
        //                            .Select(e => e.Id)
        //                            .ToList();

        //                        if (fileId.Count == 0)
        //                        {
        //                            return Json(new { error = true, message = "Invalid File ID." }, JsonRequestBehavior.AllowGet);
        //                        }

        //                        signUpFileAttachment.Id = fileId[0];

        //                        signUpFileAttachment = SaveOrderFile(files, signUpFileAttachment);

        //                        if (signUpFileAttachment == null || signUpFileAttachment.UserNo <= 0)
        //                        {
        //                            throw new Exception("File saving failed.");
        //                        }

        //                        int rowAffected2 = _iUsersGateway.UpdateUserPassportAndNID(signUpFileAttachment, dBcontext);

        //                        if (rowAffected2 <= 0)
        //                        {
        //                            throw new Exception("File information saving failed.");
        //                        }
        //                    }
        //                }

        //                List<EnrollCompanyLocationFloor> enrollCompanyLocations = user.EnrollCompanyLocationFloors;

        //                //user.EnrollCompanyLocationFloors = null;

        //                int userNo = _iUsersGateway.UpdateUserByOwn(user, dBcontext);
        //                if (userNo <= 0)
        //                {
        //                    throw new Exception();
        //                }

        //                EnrollCompanyLocationFloorsGateway enrollCompanyLocationsGateway = new EnrollCompanyLocationFloorsGateway();

        //                int companyLocationRetCount = enrollCompanyLocationsGateway.DeleteExistEnrollCompanyLocationRetCount(userNo, dBcontext);
        //                if (companyLocationRetCount != 0)
        //                {
        //                    throw new Exception("An Error Has Occurred in Deleting Company Location Info.");
        //                }

        //                foreach (EnrollCompanyLocationFloor enrollCompanyLocationObj in enrollCompanyLocations)
        //                {
        //                    enrollCompanyLocationObj.UserNo = userNo;
        //                    enrollCompanyLocationObj.User = null;

        //                    int rowaffected = enrollCompanyLocationsGateway.SaveEnrollCompanyLocationFloor(enrollCompanyLocationObj, dBcontext);

        //                    if (rowaffected <= 0)
        //                    {
        //                        throw new Exception();
        //                    }
        //                }

        //                dbContextTransaction.Commit();
        //                return Json(new { error = false, message = "User is updated successfully." }, JsonRequestBehavior.AllowGet);
        //            }
        //            catch (Exception)
        //            {
        //                dbContextTransaction.Rollback();
        //                return Json(new { error = true, message = "User is not updated. Please try again later." }, JsonRequestBehavior.AllowGet);
        //            }
        //        }
        //    }
        //}





        [HttpPost]
        public JsonResult UpdateUserSignUp([Bind(Include = "UserNo,EmployeeId,FullName,FirstName," +
            "MiddleName,LastName,DOBStr,Gender,Nationality,PresentAddress," +
        "EmgContactNo,Email,ContactNo,DepartmentId,DesignationId,EnrollCompanyLocationFloors")] User user)
        {
            if (user.UserNo <= 0 || user.EnrollCompanyLocationFloors.Count <= 0)
            {
                return Json(new { error = true, message = "Please give the information properly." }, JsonRequestBehavior.AllowGet);
            }

            bool isValidContactNo = BaseClassUtility.IsValidContactNo(user.ContactNo);
            if (!isValidContactNo)
            {
                return Json(new { error = true, message = "Please enter a valid contact number." }, JsonRequestBehavior.AllowGet);
            }

            using (var dBcontext = new TravelManagementDBcontext())
            {
                using (var dbContextTransaction = dBcontext.Database.BeginTransaction())
                {
                    try
                    {
                        user.DOB = DateParse.StringToDateTime(user.DOBStr);

                        UsersGateway _iUsersGateway = new UsersGateway();
                        SignUpFileAttachment signUpFileAttachment = new SignUpFileAttachment();

                        

                        List<EnrollCompanyLocationFloor> enrollCompanyLocations = user.EnrollCompanyLocationFloors;

                        //user.EnrollCompanyLocationFloors = null;

                        int userNo = _iUsersGateway.UpdateUserByOwn(user, dBcontext);
                        if (userNo <= 0)
                        {
                            throw new Exception("Exception.");
                        }

                        EnrollCompanyLocationFloorsGateway enrollCompanyLocationsGateway = new EnrollCompanyLocationFloorsGateway();

                        int companyLocationRetCount = enrollCompanyLocationsGateway.DeleteExistEnrollCompanyLocationRetCount(userNo, dBcontext);
                        if (companyLocationRetCount != 0)
                        {
                            throw new Exception("An Error Has Occurred in Deleting Company Location Info.");
                        }

                        foreach (EnrollCompanyLocationFloor enrollCompanyLocationObj in enrollCompanyLocations)
                        {
                            enrollCompanyLocationObj.UserNo = userNo;
                            enrollCompanyLocationObj.User = null;

                            int rowaffected = enrollCompanyLocationsGateway.SaveEnrollCompanyLocationFloor(enrollCompanyLocationObj, dBcontext);

                            if (rowaffected <= 0)
                            {
                                throw new Exception();
                            }
                        }

                        //File Attachment


                        try
                        {
                            for (int i = 0; i < Request.Files.Count; i++)
                            {
                                if (Request.Files.AllKeys[i] == "PassportFiles")
                                {
                                    ////Passport
                                    HttpPostedFileBase files = Request.Files[i];

                                    SignUpFileAttachment signUpFileAttachment1 = new SignUpFileAttachment();
                                    signUpFileAttachment1.FileName = "Files";
                                    signUpFileAttachment1.FileType = 1;
                                    signUpFileAttachment1.UserNo = userNo;
                                    //signUpFileAttachment1.Users = null;

                                    signUpFileAttachment1 = SaveOrderFile(files, signUpFileAttachment1);

                                    if (signUpFileAttachment1 == null || signUpFileAttachment1.UserNo <= 0)
                                    {
                                        throw new Exception("File saving failed.");
                                    }

                                    int rowAffected1 = _iUsersGateway.AddUserPassportAndNID(signUpFileAttachment1, dBcontext);

                                    if (rowAffected1 <= 0)
                                    {
                                        throw new Exception("File information saving failed.");
                                    }
                                }
                                else if (Request.Files.AllKeys[i] == "NIDFiles")
                                {
                                    //NID
                                    HttpPostedFileBase files = Request.Files[i];

                                    SignUpFileAttachment signUpFileAttachment2 = new SignUpFileAttachment();
                                    signUpFileAttachment2.FileName = "Files";
                                    signUpFileAttachment2.FileType = 2;
                                    signUpFileAttachment2.UserNo = userNo;

                                    signUpFileAttachment2 = SaveOrderFile(files, signUpFileAttachment2);

                                    if (signUpFileAttachment2 == null || signUpFileAttachment2.UserNo <= 0)
                                    {
                                        throw new Exception("File saving failed.");
                                    }

                                    int rowAffected2 = _iUsersGateway.AddUserPassportAndNID(signUpFileAttachment2, dBcontext);

                                    if (rowAffected2 <= 0)
                                    {
                                        throw new Exception("File information saving failed.");
                                    }
                                }
                            }
                        }
                        catch (Exception ex)
                        {
                            dbContextTransaction.Rollback();
                            throw ex;
                        }

                        //var details = dBcontext.SignUpFileAttachments.Where(x => x.UserNo == user.UserNo).ToList();
                        //dBcontext.SignUpFileAttachments.RemoveRange(details); //details delete
                        //int rowAffected2 = dBcontext.SaveChanges();
                        //if (rowAffected2 < 1)
                        //{
                        //    throw new Exception("Information updating failed.");
                        //}


                        //for (int i = 0; i < Request.Files.Count; i++)
                        //{
                        //    if (Request.Files.AllKeys[i] == "PassportFiles")
                        //    {
                        //        if (Request.Files.Count > 0)
                        //        {
                        //            HandleFileAttachments1(Request.Files, user.UserNo, dBcontext);
                        //        }
                        //    }
                        //}

                        //for (int i = 0; i < Request.Files.Count; i++)
                        //{
                        //    if (Request.Files.AllKeys[i] == "NIDFiles")
                        //    {
                        //        if (Request.Files.Count > 0)
                        //        {
                        //            HandleFileAttachments2(Request.Files, user.UserNo, dBcontext);
                        //        }
                        //    }
                        //}

                        dbContextTransaction.Commit();
                        return Json(new { error = false, message = "User is updated successfully." }, JsonRequestBehavior.AllowGet);
                    }
                    catch (Exception)
                    {
                        dbContextTransaction.Rollback();
                        return Json(new { error = true, message = "User is not updated. Please try again later." }, JsonRequestBehavior.AllowGet);
                    }
                }
            }
        }



        //private void HandleFileAttachments1(HttpFileCollectionBase files, int UserNo, TravelManagementDBcontext dBcontext)
        //{

        //    if (Request.Files.Count == 0)
        //    {
        //        SignUpFileAttachment fileAttach_ProjectStatusTracking = new SignUpFileAttachment();
        //        dBcontext.Entry(fileAttach_ProjectStatusTracking).Property("location").IsModified = false;

        //    }

        //    if (Request.Files.Count > 0)
        //    {

        //        for (int i = 0; i < Request.Files.Count; i++)
        //        {
        //            if (Request.Files.AllKeys[i] == "PassportFiles")
        //            {
        //                HttpPostedFileBase file = files[i];

        //                SignUpFileAttachment fileAttachment = new SignUpFileAttachment
        //                {
        //                    UserNo = UserNo,
        //                    FileName = "Files",
        //                    FileType = 1
        //                };

        //                try
        //                {
        //                    fileAttachment = SaveOrderFile(file, fileAttachment);

        //                    if (fileAttachment == null || UserNo <= 0)
        //                    {
        //                        throw new Exception("File saving failed.");
        //                    }

        //                    UsersGateway _iUsersGateway = new UsersGateway();
        //                    int rowAffected = _iUsersGateway.AddNidFile(fileAttachment, dBcontext);

        //                    if (rowAffected <= 0)
        //                    {
        //                        throw new Exception("File information saving failed.");
        //                    }
        //                }
        //                catch (Exception ex)
        //                {
        //                }
        //            }
        //        }

        //    }
        //}


        //private void HandleFileAttachments2(HttpFileCollectionBase files, int UserNo, TravelManagementDBcontext dBcontext)
        //{

        //    if (Request.Files.Count == 0)
        //    {
        //        SignUpFileAttachment fileAttach_ProjectStatusTracking = new SignUpFileAttachment();
        //        dBcontext.Entry(fileAttach_ProjectStatusTracking).Property("location").IsModified = false;

        //    }

        //    if (Request.Files.Count > 0)
        //    {

        //        for (int i = 0; i < Request.Files.Count; i++)
        //        {
        //            if (Request.Files.AllKeys[i] == "NIDFiles")
        //            {
        //                HttpPostedFileBase file = files[i];

        //                SignUpFileAttachment fileAttachment = new SignUpFileAttachment
        //                {
        //                    UserNo = UserNo,
        //                    FileName = "Files",
        //                    FileType = 2
        //                };

        //                try
        //                {
        //                    fileAttachment = SaveOrderFile(file, fileAttachment);

        //                    if (fileAttachment == null || UserNo <= 0)
        //                    {
        //                        throw new Exception("File saving failed.");
        //                    }

        //                    UsersGateway _iUsersGateway = new UsersGateway();
        //                    int rowAffected = _iUsersGateway.AddNidFile(fileAttachment, dBcontext);

        //                    if (rowAffected <= 0)
        //                    {
        //                        throw new Exception("File information saving failed.");
        //                    }
        //                }
        //                catch (Exception ex)
        //                {
        //                }
        //            }
        //        }

        //    }
        //}


        public SignUpFileAttachment SaveOrderFile(HttpPostedFileBase file, SignUpFileAttachment signUpFileAttachment)
        {
            try
            {
                BaseClassUtilitiesNonStatic baseClassUtilitiesNonStatic = new BaseClassUtilitiesNonStatic();

                signUpFileAttachment.FileName = "File_" + Guid.NewGuid() + Path.GetExtension(file.FileName);
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




        public ActionResult DeleteFiles(int? Id)
        {
            if (Id == null || Id <= 0)
            {
                return Json(new { error = true, message = "Error! Invalid Request detected." }, JsonRequestBehavior.AllowGet);
            }

            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                VisaRequisitionGateway visaRequisitionGateway = new VisaRequisitionGateway();

                int rowAffected = visaRequisitionGateway.DeleteFiles(Convert.ToInt32(Id), dBcontext);

                if (rowAffected > 0)
                {
                    return Json(new { error = false, message = "Deleted Successfully." }, JsonRequestBehavior.AllowGet);
                }
                else if (rowAffected == -3)
                {
                    return Json(new { error = true, message = "ERROR! Invalid Request Detected. Deletation Unsuccessful." }, JsonRequestBehavior.AllowGet);
                }

                return Json(new { error = true, message = "Oops!! Deletation Failed. Please try again later." }, JsonRequestBehavior.AllowGet);

            }

        }

    }
}