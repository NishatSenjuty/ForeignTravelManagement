using TravelManagement.Context;
using TravelManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TravelManagement.Gateway
{
    public class EnrollMenusGateway
    {
        public int SaveEnrollMenu(EnrollMenu enrollMenu, TravelManagementDBcontext dbContext)
        {
            //try
            //{
                dbContext.EnrollMenus.Add(enrollMenu);
                return dbContext.SaveChanges();
            //}
            //catch (Exception)
            //{
            //    return -2;

            //}
        }

        public int DeleteExistEnrollMenu(int userNo, TravelManagementDBcontext dbContext)
        {
            List<EnrollMenu> enrollMenus = dbContext.EnrollMenus.Where(nt => nt.UserNo.Equals(userNo)).ToList();

            if (enrollMenus.Any())
            {
                //try
                //{
                    dbContext.EnrollMenus.RemoveRange(enrollMenus);
                    return dbContext.SaveChanges();
                //}
                //catch (Exception)
                //{
                //    return -2;

                //}
            }
            else
            { 
                return 1; 
            }
        }
    }
}