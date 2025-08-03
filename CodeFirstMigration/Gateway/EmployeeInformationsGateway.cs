using TravelManagement.Context;
using TravelManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Linq;

namespace TravelManagement.Gateway
{
    public class EmployeeInformationsGateway
    {
        //Saving in DB
        public int AddEmployeeInformation(EmployeeInformation employeeInformation, TravelManagementDBcontext dBcontext)
        {
            try
            {
                dBcontext.EmplyeeInformations.Add(employeeInformation);
                return dBcontext.SaveChanges();
            }
            catch
            {

                return -2;

            }
        }

        public dynamic GetEmpInfo(string Company, string Department, string Designation, string EmployeeId, string Name,
                                          int page, int limit, TravelManagementDBcontext dBcontext)
        {
            try
            {
                var employee = dBcontext.EmplyeeInformations.OrderByDescending(lo => lo.Id)
                     .Where(x => x.EmployeeId.Contains(EmployeeId) || EmployeeId == "")
                .Where(x => x.Name.Contains(Name) || Name == "")
                    .Where(x => x.Company.CompanyName.Contains(Company) || Company == "")
                    .Where(x => x.Department.Name.Contains(Department) || Department == "")
                    .Where(x => x.Designation.DesignationName.Contains(Designation) || Designation == "")
                    .Skip((page - 1) * limit)
                    .Take(limit)
                .Select(lo => new
                {
                    CompanyId = lo.Company.Id,                   //company table data with FK
                    lo.Company.CompanyName,
                    lo.Company.CompanyActiveStatus,      //company table data with FK

                    DepartmentId = lo.Department.Id,                   //department table data with FK
                    DepartmentName = lo.Department.Name,
                    DepartmentActiveStatus = lo.Department.ActiveStatus,      //department table data with FK

                    DesignationId = lo.Designation.Id,                   //Designation table data with FK
                    lo.Designation.DesignationName,
                    lo.Designation.DesignationActiveStatus,      //Designation table data with FK

                    LocationId = lo.Location.Id,                   //Location table data with FK
                    lo.Location.LocationName,
                    lo.Location.LocationActiveStatus,      //Location table data with FK


                    lo.Id,                                           //Employee Information Table data
                    lo.EmployeeId,
                    EmployeeName = lo.Name,
                    lo.Salary,
                    lo.DOB,
                    lo.JD,
                    lo.BloodGroup,
                    lo.ContactNo,
                    lo.Gender,
                    EmployeeAddress = lo.Address,
                    lo.ActiveStatus,
                    lo.InsertedDateTime,
                    lo.InsertedBy,
                    lo.UpdatedDateTime,
                    lo.UpdatedBy                          //Employee Information Table data
                }).ToList();

                return employee;
            }

            catch (Exception)
            {
                return null;
            }
        }


        //Delete EmpInfo
        public int DeleteEmployee(int Id, TravelManagementDBcontext dBcontext)
        {
            try
            {
                EmployeeInformation searched_EmpInfo = dBcontext.EmplyeeInformations.SingleOrDefault(c => c.Id == Id);

                if (searched_EmpInfo == null)
                {
                    return -3;
                }
                dBcontext.EmplyeeInformations.Remove(searched_EmpInfo);
                return dBcontext.SaveChanges();

            }
            catch (Exception)
            {
                return -2;
            }
        }

        //Edit EmpInfo
        public int EditEmpInfo(EmployeeInformation employeeInformation, TravelManagementDBcontext dBcontext)
        {
            try
            {
                EmployeeInformation searched_EmpInfo = dBcontext.EmplyeeInformations.SingleOrDefault(c => c.Id == employeeInformation.Id);

                if (searched_EmpInfo == null)
                {
                    return -3;
                }

                employeeInformation.InsertedBy = searched_EmpInfo.InsertedBy;
                dBcontext.Entry(searched_EmpInfo).CurrentValues.SetValues(employeeInformation);
                return dBcontext.SaveChanges();
            }

            catch (Exception)
            {
                return -2;
            }
        }


        public dynamic FilterEmployees(string EmployeeId, string name, string company, string department, string designation, TravelManagementDBcontext dBcontext)

        {
            try
            {
                var employee = dBcontext.EmplyeeInformations.OrderByDescending(lo => lo.Id)
                    .Where(x=> x.EmployeeId.Contains(EmployeeId) || EmployeeId =="")
                    .Where(x => x.Name.Contains(name) || name == "")
                    .Where(x => x.Company.CompanyName.Contains(company) || company == "")
                    .Where(x => x.Department.Name.Contains(department) || department == "")
                    .Where(x => x.Designation.DesignationName.Contains(designation) || designation == "")

               .Select(lo => new
               {
                   CompanyId = lo.Company.Id,                   //company table data with FK
                   lo.Company.CompanyName,
                   lo.Company.CompanyActiveStatus,      //company table data with FK

                   DepartmentId = lo.Department.Id,                   //department table data with FK
                   DepartmentName = lo.Department.Name,
                   DepartmentActiveStatus = lo.Department.ActiveStatus,      //department table data with FK

                   DesignationId = lo.Designation.Id,                   //Designation table data with FK
                   lo.Designation.DesignationName,
                   DesignationActiveStatus = lo.Designation.DesignationActiveStatus,      //Designation table data with FK

                   LocationId = lo.Location.Id,                   //Location table data with FK
                   lo.Location.LocationName,
                   lo.Location.LocationActiveStatus,      //Location table data with FK


                   lo.Id,                                           //Employee Information Table data
                   lo.EmployeeId,
                   EmployeeName = lo.Name,
                   lo.Salary,
                   lo.DOB,
                   lo.JD,
                   lo.BloodGroup,
                   ContactNo = lo.ContactNo,
                   lo.Gender,
                   EmployeeAddress = lo.Address,
                   EmployeeActiveStatus = lo.ActiveStatus,
                   lo.InsertedDateTime,
                   lo.InsertedBy,
                   lo.UpdatedDateTime,
                   lo.UpdatedBy                          //Employee Information Table data
               }).ToList();

                return employee;
            }

            catch (Exception)
            {
                return null;
            }
        }

        //Function for Employee Information Page - Pagination and count
        public int GetEmpInfoTableRecords(int ActiveStatus, TravelManagementDBcontext dBcontext)
        {
            try
            {
                var totalRecords = dBcontext.EmplyeeInformations.OrderByDescending(c => c.Id)
                .Where(c => c.ActiveStatus == (Utilities.ActiveStatus)ActiveStatus || ActiveStatus == -1)
                .Count();
                return Convert.ToInt32(totalRecords);
            }
            catch (Exception)
            {
                return -1;
            }
        }

    }
}