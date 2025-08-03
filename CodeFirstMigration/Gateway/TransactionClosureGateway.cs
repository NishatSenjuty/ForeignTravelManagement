using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TravelManagement.Context;
using TravelManagement.Models;
using TravelManagement.Utilities;

namespace TravelManagement.Gateway
{
    public class TransactionClosureGateway
    {

        public int ApproveTransactionClosure(int Id, TravelManagementDBcontext DbContext)
        {
            try
            {
                FinalSettlement searched_Req = DbContext.FinalSettlements.SingleOrDefault(c => c.Id == Id);

                if (searched_Req == null)
                {
                    return -3;
                }
                if (searched_Req.AccountsStatusTC == ApprovalStatus.IsApproved)
                {
                    return -4;
                }


                searched_Req.AccountsStatusTC = ApprovalStatus.IsApproved;
               // searched_Req.TCbyAccounts = MySession.Current.UserNo;

                DbContext.Entry(searched_Req).CurrentValues.SetValues(searched_Req);
                return DbContext.SaveChanges();
            }

            catch (Exception)
            {
                return -2;
            }
        }
    }
}