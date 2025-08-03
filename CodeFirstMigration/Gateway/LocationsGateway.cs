using TravelManagement.Context;
using TravelManagement.Models;
using TravelManagement.Utilities;
using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TravelManagement.Gateway
{
    public class LocationsGateway
    {
        // Function For Locations Page - Saving New Location in database *
        public int AddLocation(Location location, TravelManagementDBcontext dBcontext)
        {
            try
            {
                dBcontext.Locations.Add(location);
                return dBcontext.SaveChanges();
            }
            catch
            {

                return -2;

            }
        }


        // Function For Locations Page - Showing Location data on table view *
        public dynamic GetLocations(TravelManagementDBcontext dBcontext)
        {
            try
            {
                var locations = dBcontext.Locations.OrderByDescending(lo => lo.Id)
                .Select(lo => new
                {
                    CompanyId = lo.Company.Id,                   //company table data with FK
                    lo.Company.CompanyName,
                    CompanyActiveStatus = lo.Company.CompanyActiveStatus,      //company table data with FK


                    lo.Id,                                           //Location Table data
                    lo.LocationName,
                    lo.LocationActiveStatus,
                    lo.InsertedDateTime,
                    lo.InsertedBy,
                    lo.UpdatedDateTime,
                    lo.UpdatedBy                          //Location Table data
                }).ToList();

                return locations;
            }

            catch (Exception)
            {
                return null;
            }
        }

        //Function for Locations Page - Delete Location by Delete Button Icon in Action on Location List Table *
        public int DeleteLocation(int Id, TravelManagementDBcontext dBcontext)
        {
            try
            {
                Location searched_location = dBcontext.Locations.SingleOrDefault(c => c.Id == Id);

                if (searched_location == null)
                {
                    return -3;
                }
                dBcontext.Locations.Remove(searched_location);
                return dBcontext.SaveChanges();

            }
            catch (Exception)
            {
                return -2;
            }
        }

        //Function for Locations Page - Edit Location by Edit Button Icon in Action on Location List Table *
        public int EditLocation(Location location, TravelManagementDBcontext dBcontext)
        {
            try
            {
                Location searched_location = dBcontext.Locations.SingleOrDefault(c => c.Id == location.Id);

                if (searched_location == null)
                {
                    return -3;
                }

                location.InsertedBy = searched_location.InsertedBy;
                dBcontext.Entry(searched_location).CurrentValues.SetValues(location);
                return dBcontext.SaveChanges();
            }

            catch (Exception)
            {
                return -2;
            }
        }
    }
}