using TravelManagement.Context;
using TravelManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TravelManagement.Gateway
{
    public class SessionHistoriesGateway
    {
        public int AddMySessionHistory(SessionHistory SessionHistory, TravelManagementDBcontext dbContext)
        {
            try
            {
                dbContext.SessionHistories.Add(SessionHistory);
                return dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                return -2;
            }
        }
        public dynamic GetMySessionHistories(int limit, int userNo, int page, TravelManagementDBcontext dbContext)
        {
            try
            {
                var mySessionHistories = (from msh in dbContext.SessionHistories
                                          join user in dbContext.Users
                                          on msh.UserNo equals user.UserNo
                                          where msh.UserNo == userNo
                                          orderby msh.SessionHistoryId descending

                                          select new
                                          {
                                              msh.SessionHistoryId,
                                              msh.UserNo,
                                              user.FullName,
                                              user.UserName,
                                              msh.SessionType,
                                              msh.CreatedDateTime,
                                              msh.Browser,
                                              msh.OperatingSystem,
                                              msh.IPaddress
                                          }).Skip((page - 1) * limit).Take(limit).ToList();

                return mySessionHistories;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

    }
}