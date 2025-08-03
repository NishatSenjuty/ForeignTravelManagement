using TravelManagement.Context;
using TravelManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TravelManagement.Gateway
{
    public class FloorsGateway
    {
        // Function For Floors Page - Saving New Floor in database *
        public int AddFloor(Floor floor, TravelManagementDBcontext dBcontext)
        {
            try
            {
                dBcontext.Floors.Add(floor);
                return dBcontext.SaveChanges();
            }
            catch
            {

                return -2;

            }
        }

        //Function for Floors Page - Showing data on Floor List Table in view *
        public dynamic GetFloors(TravelManagementDBcontext dBcontext)
        {
            try
            {
                var floors = dBcontext.Floors.OrderByDescending(lo => lo.Id)
                .Select(lo => new
                {
                    CompanyId = lo.Company.Id,                   //company table data with FK
                    lo.Company.CompanyName,
                    CompanyActiveStatus = lo.Company.CompanyActiveStatus,      //company table data with FK

                    LocationId = lo.Location.Id,                   //Location table data with FK
                    lo.Location.LocationName,

                    lo.Id,                                           //Location Table data
                    lo.FloorName,
                    lo.FloorActiveStatus,
                    lo.InsertedDateTime,
                    lo.InsertedBy,
                    lo.UpdatedDateTime,
                    lo.UpdatedBy                          //Location Table data
                }).ToList();

                return floors;
            }

            catch (Exception)
            {
                return null;
            }
        }

        //Function for Floors Page - Delete Floor by Delete Button Icon in Action on Floor List Table *
        public int DeleteFloor(int Id, TravelManagementDBcontext dBcontext)
        {
            try
            {
                Floor searched_floor = dBcontext.Floors.SingleOrDefault(c => c.Id == Id);

                if (searched_floor == null)
                {
                    return -3;
                }
                dBcontext.Floors.Remove(searched_floor);
                return dBcontext.SaveChanges();

            }
            catch (Exception)
            {
                return -2;
            }
        }

        //Function for Floors Page - Edit Floor by Edit Button Icon in Action on Floor List Table *

        public int EditFloor(Floor floor, TravelManagementDBcontext dBcontext)
        {
            try
            {
                Floor searched_floor = dBcontext.Floors.SingleOrDefault(c => c.Id == floor.Id);

                if (searched_floor == null)
                {
                    return -3;
                }

                floor.InsertedBy = searched_floor.InsertedBy;
                dBcontext.Entry(searched_floor).CurrentValues.SetValues(floor);
                return dBcontext.SaveChanges();
            }

            catch (Exception)
            {
                return -2;
            }
        }

    }
}