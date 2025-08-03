using TravelManagement.Context;
using TravelManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TravelManagement.Gateway
{
    public class DesignationsGateway
    {

        public int AddDesignation(Designation designation, TravelManagementDBcontext dBcontext)
        {
            try
            {
                dBcontext.Designations.Add(designation);
                return dBcontext.SaveChanges();
            }
            catch
            {

                return -2;

            }
        }

        public dynamic GetDesignation(TravelManagementDBcontext dBcontext)
        {
            try
            {
                var designations = dBcontext.Designations.OrderByDescending(lo => lo.Id)
                .Select(lo => new
                {

                    lo.Id,                         
                    lo.DesignationName,
                    lo.DesignationActiveStatus,
                    lo.InsertedDateTime,
                    lo.InsertedBy,
                    lo.UpdatedDateTime,
                    lo.UpdatedBy                   
                }).ToList();

                return designations;
            }

            catch (Exception)
            {
                return null;
            }
        }

        public int DeleteDesignation(int Id, TravelManagementDBcontext dBcontext)
        {
            try
            {
                Designation searched_designation = dBcontext.Designations.SingleOrDefault(c => c.Id == Id);

                if (searched_designation == null)
                {
                    return -3;
                }
                dBcontext.Designations.Remove(searched_designation);
                return dBcontext.SaveChanges();

            }
            catch (Exception)
            {
                return -2;
            }
        }


        public int EditDesignation(Designation designation, TravelManagementDBcontext dBcontext)
        {
            try
            {
                Designation searched_designation = dBcontext.Designations.SingleOrDefault(c => c.Id == designation.Id);

                if (searched_designation == null)
                {
                    return -3;
                }

                designation.InsertedBy = searched_designation.InsertedBy;
                dBcontext.Entry(searched_designation).CurrentValues.SetValues(designation);
                return dBcontext.SaveChanges();
            }

            catch (Exception)
            {
                return -2;
            }
        }


        public dynamic ShowDesignationsForDropDownInEmpInfo(TravelManagementDBcontext dBcontext)
        {
            try
            {
                var designation = dBcontext.Designations
                    .Where(x => x.DesignationActiveStatus == Utilities.ActiveStatus.IsActive)
                    .OrderBy(x => x.DesignationName)
                    .Select(x => new
                    {
                        DesignationName = x.DesignationName,
                        x.Id
                    })
                    .ToList();

                return designation;
            }
            catch (Exception)
            {
                return null;
            }
        }

    }
}