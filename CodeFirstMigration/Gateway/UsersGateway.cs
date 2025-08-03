using TravelManagement.Context;
using TravelManagement.Models;
using TravelManagement.Utilities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Data.Entity.Validation;
using System.Web.Mvc;

namespace TravelManagement.Gateway
{
    public class UsersGateway
    {
        //For TravelManagement function - checks if the username is valid *
        public bool IsExistsUserName(string userName, TravelManagementDBcontext DbContext)
        {
            try
            {
                User user = DbContext.Users.Where(b => b.UserName.Equals(userName)).FirstOrDefault();
                if (user != null)
                {
                    return true;
                }
                return false;
            }
            catch (Exception)
            {
                return false;
            }
        }

        //For TravelManagement function - checks if the user is active *
        public bool IsActiveUser(string username, TravelManagementDBcontext DbContext)
        {
            try
            {
                User result = DbContext.Users.SingleOrDefault(u => u.UserName == username && u.UserStatus == Utilities.UserStatus.active);
                if (result == null) 
                { 
                return false;
                }
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        //For TravelManagement function - to get the Hashpassword against one username *
        public string GetHashedPasswordByUsername(string username, TravelManagementDBcontext DbContext)
        {
            try
            {
                string result = DbContext.Users.Where(u => u.UserName == username).Select(u => u.PassPhrase).SingleOrDefault();
                return result;
            }
            catch (Exception)
            {
                return null;
            }
        }


        public int SaveSuperVisor(EnrollSuperVisor enrollSuperVisor, TravelManagementDBcontext dbContext)
        {
            //try
            //{
                dbContext.EnrollSuperVisors.Add(enrollSuperVisor);
                return dbContext.SaveChanges();
            //}
            //catch (Exception)
            //{
            //    return -2;

            //}
        }

        public int DeleteExistEnrollSupervisor(int userNo, TravelManagementDBcontext dbContext)
        {
            List<EnrollSuperVisor> enrollSuperVisor = dbContext.EnrollSuperVisors.Where(nt => nt.UserId.Equals(userNo)).ToList();
            //try
            //{
                dbContext.EnrollSuperVisors.RemoveRange(enrollSuperVisor);
                return dbContext.SaveChanges();
            //}
            //catch (Exception)
            //{
            //    return -2;

            //}
        }

        //For TravelManagement function - to get the User  against one username *

        public dynamic GetUserInfoByUsername(string username, TravelManagementDBcontext DbContext)
        {
            try
            {
                var result = DbContext.Users.Where(u => u.UserName == username).Select( u => new
                { 
                 u.UserNo,
                    u.FullName,
                    u.UserName,
                    u.ContactNo,
                    u.Email,
                    u.UserRoleId,
                    u.UserRole.UserRoleTitle,
                    u.UserStatus,

                    CompaniesId = u.EnrollCompanyLocationFloors.Select(ecl => ecl.CompanyId).Distinct(),
                    LocationsId = u.EnrollCompanyLocationFloors.Select(ecl => ecl.LocationId).Distinct(),
                    FloorsId = u.EnrollCompanyLocationFloors.Select(ecl => ecl.FloorId).Distinct(),

                    MenuItemShortName = u.EnrollMenus.Select(em => em.MenuItem.MenuItemShortName),
                    NabList = u.EnrollMenus.Select(em => em.MenuItem.MenuItemShortName),
                    EnrollMenus = u.EnrollMenus.Select(em => new
                    {
                        em.MenuItem.MenuItemShortName,
                        em.MenuItem.MenuItemId,
                        em.MenuItem.MenuItemName,
                        em.MenuItem.MenuCategoryId,
                        em.MenuItem.MenuCategory.MenuCategoryTitle
                    }),

                    u.AddedDateTime
                }).SingleOrDefault();

                return result;
            }
            catch (Exception)
            {
                return null;
            }
        }

        //For User function - Show User on grid *
        public dynamic GetAllUsers(int limit, int companyId, int locationId, int floorId, string userName, int uRoleId, int page, TravelManagementDBcontext DbContext)
        {
            try
            {
                var users = DbContext.Users
                       .OrderByDescending(t => t.UserNo)
                       .Where(u => u.UserRoleId == uRoleId || uRoleId == -1)
                       .Where(u => u.UserName == userName || userName == "")
                       .Where(u => u.EnrollCompanyLocationFloors.Any(x => x.CompanyId == companyId) || companyId == -1)
                       .Where(u => u.EnrollCompanyLocationFloors.Any(x => x.LocationId == locationId) || locationId == -1)
                       .Where(u => u.EnrollCompanyLocationFloors.Any(x => x.FloorId == floorId) || floorId == -1)
                       .Include(b => b.UserRole)
                       .Include(b => b.EnrollMenus)
                       .Include(b => b.EnrollCompanyLocationFloors)
                       .Skip((page - 1) * limit)
                       .Take(limit)
                       .Select(u => new
                       {
                           u.UserNo,
                           u.FullName,
                           u.UserName,
                           u.ContactNo,
                           u.Email,
                           u.UserRoleId,
                           u.UserRole.UserRoleTitle,
                           u.UserStatus,
                           u.PrimaryCompanyId,
                           u.Companys.CompanyName,
                           u.PrimaryLocationId,
                           u.Locations.LocationName,

                           u.DepartmentId,
                           u.Department.Name,
                           u.DesignationId,
                           u.Designation.DesignationName,

                           EnrollSuperVisors = u.UserNos
                           .Select(fm => new
                           {
                               fm.EnrollSupervisorId,
                               SupervisorId = fm.Supervisor.UserNo,
                               SupervisorName = fm.Supervisor.FullName,


                               SupDet = DbContext.Users
                            .Where(n => n.UserNo == fm.Supervisor.UserNo)
                            .Select(co1 => new
                            {
                                co1.FullName,
                                co1.UserNo
                            }).ToList(),


                           }),

                           EnrollMenus = u.EnrollMenus.
                                        Select(em => new
                                        {
                                            em.MenuItem.MenuItemId,
                                            em.MenuItem.MenuItemName,
                                            em.MenuItem.MenuItemShortName,
                                            em.MenuItem.MenuCategoryId,
                                            em.MenuItem.MenuCategory.MenuCategoryTitle
                                        }),
                           u.AddedDateTime,
                           CompanyLocationFloors = u.EnrollCompanyLocationFloors.Select(ec => new
                           {
                               ec.CompanyId,
                               ec.Company.CompanyName,
                               ec.Company.CompanyShortName,
                               ec.LocationId,
                               ec.Location.LocationName,
                               ec.FloorId,
                               ec.Floor.FloorName
                           })
                       })
                       .ToList();
                return users;
            }
            catch (Exception)
            {
                return null;
            }
        }

        //For User function - Saving New User in database *
        public int SaveUser(User user, TravelManagementDBcontext DbContext)
        {
            try 
            {
                DbContext.Users.Add(user);
                int rowAffected = DbContext.SaveChanges();
                if (rowAffected > 0)
                {
                    return user.UserNo;
                }
                return -3;
            }
            //catch (Exception ex)
            //{
            //    return -2;
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
                return -2;
            }
        }

        //For User function - checks if the User No is valid *
        public bool IsExistsUserNo(int UserNo, TravelManagementDBcontext DbContext)
        {
            try
            {
                User user = DbContext.Users.Where(b => b.UserNo.Equals(UserNo)).FirstOrDefault();
                if (user != null)
                {
                    return true;
                }
                return false;

            }
            catch (Exception)
            {
                return false;
            }
        }

        //For Forget Password page - checks if the User email is valid *
        public bool IsExistsEmail(string email, TravelManagementDBcontext db)
        {
            try
            {
                User user = db.Users.Where(b => b.Email.Equals(email)).FirstOrDefault();
                if (user != null)
                {
                    return true;
                }
                return false;

            }
            catch (Exception)
            {
                return false;
            }
        }

        //For User function - Edit and Update a User Info *

        //public int UpdateUser(User user, TravelManagementDBcontext DbContext)
        //{
        //    try
        //    {
        //        User currentUser = DbContext.Users.Find(user.UserNo);

        //        currentUser.FullName = user.FullName;
        //        currentUser.Email = user.Email;
        //        currentUser.ContactNo = user.ContactNo;
        //        currentUser.UserRoleId = user.UserRoleId;
        //        currentUser.UserStatus = user.UserStatus;
        //        currentUser.DesignationId = user.DesignationId;
        //        currentUser.DepartmentId = user.DepartmentId;
        //        currentUser.UserName = user.UserName;
        //        currentUser.PrimaryCompanyId = user.PrimaryCompanyId;
        //        currentUser.PrimaryLocationId = user.PrimaryLocationId;


        //        DbContext.Entry(currentUser).State = EntityState.Modified;

        //        int rowAffected = DbContext.SaveChanges();
        //        if (rowAffected > 0)
        //        {
        //            return user.UserNo;
        //        }
        //        return -2;
        //    }
        //    catch (Exception)
        //    {
        //        return -2;
        //    }
        //}



            public int UpdateUser(User user, TravelManagementDBcontext DbContext)
            {
                try
                {
                    User existingUser = DbContext.Users.SingleOrDefault(c => c.UserNo == user.UserNo);

                    if (existingUser == null)
                    {
                        return -3;
                    }

                    DbContext.Entry(existingUser).Property(u => u.UserRoleId).IsModified = true;
                    DbContext.Entry(existingUser).Property(u => u.UserStatus).IsModified = true;

                    existingUser.UserRoleId = user.UserRoleId;
                    existingUser.UserStatus = user.UserStatus;

                    DbContext.SaveChanges();

                    return user.UserNo;
                }
                catch (Exception ex)
                {
                    return -2;
                }
            }

        public int UpdateUserByOwn(User user, TravelManagementDBcontext db)
        {
            try
            {
                User currentUser = db.Users.Find(user.UserNo);
                if (currentUser == null)
                {
                    return -3;
                }
               
                currentUser.ContactNo = user.ContactNo;
                currentUser.PrimaryCompanyId = user.EnrollCompanyLocationFloors[0].CompanyId;
                currentUser.PrimaryLocationId = user.EnrollCompanyLocationFloors[0].LocationId;
                currentUser.DepartmentId = user.DepartmentId;
                currentUser.DesignationId = user.DesignationId;


                currentUser.FullName = user.FullName;
                currentUser.EmployeeId = user.EmployeeId;
                currentUser.Email = user.Email;
                currentUser.FirstName = user.FirstName;
                currentUser.MiddleName = user.MiddleName;
                currentUser.LastName = user.LastName;
                currentUser.DOB = user.DOB;
                currentUser.Nationality = user.Nationality;
                currentUser.Gender = user.Gender;
                currentUser.PresentAddress = user.PresentAddress;
                currentUser.EmgContactNo = user.EmgContactNo;

                //db.Entry(user).State = EntityState.Modified;

                int rowAffected = db.SaveChanges();
                if (rowAffected >= 0)
                {
                    return user.UserNo;
                }
                return -2;
            }
            catch (Exception)
            {
                return -2;
            }
        }

        public dynamic GetUserInfoByEmail(string email, TravelManagementDBcontext dbContext)
        {
            try
            {
                var result = dbContext.Users.Where(u => u.Email == email)
                                            .Select(u => new
                                            {
                                                u.UserNo,
                                                u.FullName,
                                                u.UserName,
                                                u.ContactNo,
                                                u.Email,
                                                u.UserRoleId,
                                                u.UserRole.UserRoleTitle,
                                                u.UserStatus,
                                                u.UserEmailStatus,
                                                u.AddedDateTime,
                                                CompaniesId = u.EnrollCompanyLocationFloors.Select(ecl => ecl.CompanyId).Distinct(),
                                                LocationsId = u.EnrollCompanyLocationFloors.Select(ecl => ecl.LocationId).Distinct(),
                                            }).SingleOrDefault();
                return result;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public int UpdateUserEmailStatusSetActive(int userNo, TravelManagementDBcontext dbContext)
        {
            try
            {
                User result = dbContext.Users.SingleOrDefault(u => u.UserNo == userNo);
                if (result == null)
                {
                    return -3;
                }
                result.UserEmailStatus = UserEmailStatus.Verified;
                return dbContext.SaveChanges();
            }
            catch (Exception)
            {
                return -2;
            }
        }


        public dynamic GetSupervisor(TravelManagementDBcontext dbContext)
        {
            try
            {
                var menuLists = dbContext.Users.Where(m => m.UserRoleId == 2 || m.UserRoleId == 4)
                                        .Select(d => new
                                        {
                                            d.UserNo,
                                            d.FullName,
                                            d.UserName,
                                            d.Designation.DesignationName,
                                            d.DesignationId,
                                            d.DepartmentId,
                                            CompanyLocationFloors = d.EnrollCompanyLocationFloors
                                            .Select(ec => new
                                            {
                                                ec.CompanyId,
                                                ec.Company.CompanyName,
                                                ec.Company.CompanyShortName,
                                                ec.LocationId,
                                                ec.Location.LocationName,
                                                ec.FloorId,
                                                ec.Floor.FloorName
                                            })
                                        }).ToList();

                return menuLists;
            }
            catch (Exception)
            {
                return null;
            }
        }



        public int AddUserPassportAndNID(SignUpFileAttachment signUpFileAttachment, TravelManagementDBcontext dBcontext)
        {
            try
            {
                dBcontext.SignUpFileAttachments.Add(signUpFileAttachment);
                dBcontext.SaveChanges();

                return signUpFileAttachment.Id;
            }
            catch (Exception ex)
            {

                return -2;
                 
            }
        }

        //public int UpdateUserPassportAndNID(SignUpFileAttachment signUpFileAttachment, TravelManagementDBcontext dbContext)
        //{
        //    try
        //    {
        //        var existingAttachment = dbContext.SignUpFileAttachments.Find(signUpFileAttachment.Id);

        //        if (existingAttachment != null)
        //        {
        //            existingAttachment.FileName = signUpFileAttachment.FileName;
        //            existingAttachment.FileType = signUpFileAttachment.FileType;
        //            existingAttachment.location = signUpFileAttachment.location;
        //            existingAttachment.FileActiveStatus = ActiveStatus.IsActive;
        //            existingAttachment.UserNo = signUpFileAttachment.UserNo;

        //            //dbContext.Entry(signUpFileAttachment).State = EntityState.Modified;

        //            dbContext.SaveChanges();

        //            return existingAttachment.Id;
        //        }
        //        else
        //        {
        //            throw new Exception("Attachment not found in the database.");
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine(ex.Message);
        //        throw;
        //    }
        //}



        public int AddNidFile(SignUpFileAttachment fileAttachment, TravelManagementDBcontext dbContext)
        {
            if (fileAttachment == null)
            {
                throw new ArgumentNullException(nameof(fileAttachment));
            }

            if (dbContext == null)
            {
                throw new ArgumentNullException(nameof(dbContext));
            }
            dbContext.SignUpFileAttachments.Add(fileAttachment);

            dbContext.SaveChanges();

            return fileAttachment.Id;
        }
    }
}