using TravelManagement.Context;
using TravelManagement.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;
using System.Linq;
using System.Text;
using System.Web;

namespace TravelManagement.Gateway
{
    public class EnrollCompanyLocationFloorsGateway
    {
       // Function For User Page - Saving the data of the permission of Company, Location, Floor *

        public int SaveEnrollCompanyLocationFloor(EnrollCompanyLocationFloor enrollCompanyLocationFloor, TravelManagementDBcontext dbContext)
        {
            //try
            //{
                var floor = dbContext.Floors
                    .FirstOrDefault(x=> 
                        x.CompanyId == enrollCompanyLocationFloor.CompanyId &&
                        x.LocationId == enrollCompanyLocationFloor.LocationId);

                if (floor != null)
                {
                    enrollCompanyLocationFloor.FloorId = floor.Id;
                }
                dbContext.EnrollCompanyLocationFloors.Add(enrollCompanyLocationFloor);
                return dbContext.SaveChanges();

            //}
            //catch (DbUpdateException ex) 
            //{

            //    string str = "";
            //    str+=$"DbUpdateException error details - {ex?.InnerException?.InnerException?.Message}\n";

            //    foreach (var eve in ex.Entries)
            //    {
            //        str += $"Entity of type {eve.Entity.GetType().Name} in state {eve.State} could not be updated\n";
            //    }

            //    return -2;
            //}
        }

        // Function For User Page - Deleting the data of the permission of Company, Location, Floor *

        public int DeleteExistEnrollCompanyLocationFloor(int userNo, TravelManagementDBcontext dbContext)
        {
            List<EnrollCompanyLocationFloor> enrollCompanyLocationFloors = dbContext.EnrollCompanyLocationFloors.Where(nt => nt.UserNo.Equals(userNo)).ToList();
            //try
            //{
                dbContext.EnrollCompanyLocationFloors.RemoveRange(enrollCompanyLocationFloors);
                return dbContext.SaveChanges();
            //}
            //catch (Exception)
            //{
            //    return -2;

            //}
        }
        public int DeleteExistEnrollCompanyLocationRetCount(int userNo, TravelManagementDBcontext dbContext)
        {
            try
            {
                dbContext.EnrollCompanyLocationFloors.RemoveRange(dbContext.EnrollCompanyLocationFloors.Where(x => x.UserNo == userNo));
                dbContext.SaveChanges();
                return dbContext.EnrollCompanyLocationFloors.Where(x => x.UserNo == userNo).Count();
            }
            catch (Exception)
            {
                return -2;
            }
        }
    }
}