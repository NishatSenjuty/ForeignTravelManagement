using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TravelManagement.Context;
using TravelManagement.Models;

namespace TravelManagement.Gateway
{
    public class ExpensesGateway
    {
        public int AddExpenses(Expenses expenses, TravelManagementDBcontext dBcontext)
        {
            try
            {
                dBcontext.Expensess.Add(expenses);
                return dBcontext.SaveChanges();
            }
            catch
            {

                return -2;

            }
        }



        public dynamic ShowExpenses(TravelManagementDBcontext dBcontext)
        {
            try
            {
                var expenses = dBcontext.Expensess.OrderByDescending(lo => lo.Id)
                .Select(lo => new
                {

                    lo.Id,
                    lo.ExpensesCategory,
                    lo.ExpensesActiveStatus,
                    lo.InsertedDateTime,
                    lo.InsertedBy,
                    lo.UpdatedDateTime,
                    lo.UpdatedBy
                }).ToList();

                return expenses;
            }

            catch (Exception)
            {
                return null;
            }
        }



        public int EditExpenses(Expenses expenses, TravelManagementDBcontext dBcontext)
        {
            try
            {
                Expenses searched_expenses = dBcontext.Expensess.SingleOrDefault(c => c.Id == expenses.Id);

                if (searched_expenses == null)
                {
                    return -3;
                }

                expenses.InsertedBy = searched_expenses.InsertedBy;
                dBcontext.Entry(searched_expenses).CurrentValues.SetValues(expenses);
                return dBcontext.SaveChanges();
            }

            catch (Exception)
            {
                return -2;
            }
        }



        public int DeleteExpenses(int Id, TravelManagementDBcontext dBcontext)
        {
            try
            {
                Expenses searched_expenses = dBcontext.Expensess.SingleOrDefault(c => c.Id == Id);

                if (searched_expenses == null)
                {
                    return -3;
                }
                dBcontext.Expensess.Remove(searched_expenses);
                return dBcontext.SaveChanges();

            }
            catch (Exception)
            {
                return -2;
            }
        }



        public dynamic ShowExpensesForModal(TravelManagementDBcontext dBcontext)
        {
            try
            {
                var expenses = dBcontext.Expensess.Where(x => x.ExpensesActiveStatus == Utilities.ActiveStatus.IsActive)
                    .OrderByDescending(x => x.Id)
                    .Select(x => new
                {
                   x.ExpensesCategory,
                    x.Id
                }).ToList();

                return expenses;
            }
            catch (Exception)
            {
                return null;
            }

        }
    }
}