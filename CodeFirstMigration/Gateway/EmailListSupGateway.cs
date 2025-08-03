using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TravelManagement.Context;
using TravelManagement.Models;

namespace TravelManagement.Gateway
{
    public class EmailListSupGateway
    {
        public dynamic ShowEmails(TravelManagementDBcontext dBcontext)
        {
            try
            {
                var emails = dBcontext.EmailListSups.OrderByDescending(c => c.Id)
                .Select(co => new
                {
                    co.Id,
                    co.EmailList,
                    co.InsertedDateTime,
                    co.InsertedBy,
                    co.UpdatedDateTime,
                    co.UpdatedBy
                }).ToList();

                return emails;
            }

            catch (Exception)
            {
                return null;
            }
        }


        public int AddEmail(EmailListSup emailListSup, TravelManagementDBcontext dBcontext)
        {
            try
            {
                dBcontext.EmailListSups.Add(emailListSup);
                return dBcontext.SaveChanges();
            }
            catch
            {

                return -2;

            }
        }
    }
}