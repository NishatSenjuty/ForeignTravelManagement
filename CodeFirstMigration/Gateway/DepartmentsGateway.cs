using TravelManagement.Context;
using TravelManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TravelManagement.Gateway
{
    public class DepartmentsGateway
    {
        // Function For Departments Page - Saving New Department in database *
        public int AddDepartment(Department department, TravelManagementDBcontext dBcontext)
        {
            try
            {
                dBcontext.Departments.Add(department);
                return dBcontext.SaveChanges();
            }
            catch
            {

                return -2;

            }
        }

        //Function for Departments Page - Showing data on Department List Table in view *
        public dynamic ShowDepartments(TravelManagementDBcontext dBcontext)
        {
            try
            {
                var departments = dBcontext.Departments.OrderByDescending(lo => lo.Id)
                .Select(lo => new
                {

                    lo.Id,            
                    lo.Name,
                    lo.ActiveStatus,
                    lo.InsertedDateTime,
                    lo.InsertedBy,
                    lo.UpdatedDateTime,
                    lo.UpdatedBy              
                }).ToList();

                return departments;
            }

            catch (Exception)
            {
                return null;
            }
        }

        //Function for Departments Page - Delete Department by Delete Button Icon in Action on Department List Table *
        public int DeleteDepartment(int Id, TravelManagementDBcontext dBcontext)
        {
            try
            {
                Department searched_department = dBcontext.Departments.SingleOrDefault(c => c.Id == Id);

                if (searched_department == null)
                {
                    return -3;
                }
                dBcontext.Departments.Remove(searched_department);
                return dBcontext.SaveChanges();

            }
            catch (Exception)
            {
                return -2;
            }
        }

        //Function for Departments Page - Edit Department by Edit Button Icon in Action on Department List Table *
        public int EditDepartment(Department department, TravelManagementDBcontext dBcontext)
        {
            try
            {
                Department searched_department = dBcontext.Departments.SingleOrDefault(c => c.Id == department.Id);

                if (searched_department == null)
                {
                    return -3;
                }

                department.InsertedBy = searched_department.InsertedBy;
                dBcontext.Entry(searched_department).CurrentValues.SetValues(department);
                return dBcontext.SaveChanges();
            }

            catch (Exception)
            {
                return -2;
            }
        }

        public dynamic ShowDepartmentsForDropdown(TravelManagementDBcontext dBcontext)
        {
            try
            {
                var department = dBcontext.Departments
                    .Where(x => x.ActiveStatus == Utilities.ActiveStatus.IsActive)
                    .OrderBy(x => x.Name)
                    .Select(x => new
                {
                    Name = x.Name,
                    x.Id
                }).ToList();

                return department;
            }
            catch (Exception)
            {
                return null;
            }

        }


        public dynamic ShowDepartmentsForDropDownInEmpInfo(TravelManagementDBcontext dBcontext)
        {
            try
            {
                var department = dBcontext.Departments
                    .Where(x => x.ActiveStatus == Utilities.ActiveStatus.IsActive)
                    .OrderBy(x => x.Name)
                    .Select(x => new
                {
                    Name = x.Name,
                    x.Id
                }).ToList();

                return department;
            }
            catch (Exception)
            {
                return null;
            }

        }


    }
}