using TravelManagement.Context;
using TravelManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TravelManagement.Gateway
{
    public class UserRolesGateway
    {

        //For User Function
        //public dynamic GetAllUserRoleList(TravelManagementDBcontext DbContext)
        //{
        //    try
        //    {
        //        return DbContext.UserRoles.OrderByDescending(ur => ur.UserRoleId).ToList();

        //    }
        //    catch (Exception)
        //    {
        //        return null;
        //    }
        //}



        public dynamic ShowUserRole(TravelManagementDBcontext dBcontext)
        {
            try
            {
                var userRoles = dBcontext.UserRoles
                    //.Where(x => x.Acti == Utilities.ActiveStatus.IsActive)
                    .Select(x => new
                {
                    x.UserRoleId,
                    x.UserRoleTitle
                }).ToList();

                return userRoles;
            }
            catch (Exception)
            {
                return null;
            }

        }
    }
}