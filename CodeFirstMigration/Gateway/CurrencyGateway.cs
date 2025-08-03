using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TravelManagement.Context;
using TravelManagement.Models;

namespace TravelManagement.Gateway
{
    public class CurrencyGateway
    {
        public int AddCurrency(Currency currency, TravelManagementDBcontext dBcontext)
        {
            try
            {
                dBcontext.Currencies.Add(currency);
                return dBcontext.SaveChanges();
            }
            catch
            {

                return -2;

            }
        }



        public dynamic ShowCurrency(TravelManagementDBcontext dBcontext)
        {
            try
            {
                var currencies = dBcontext.Currencies.OrderByDescending(lo => lo.Id)
                .Select(lo => new
                {

                    lo.Id,
                    lo.CurrencyName,
                    lo.CurrencyActiveStatus,
                    lo.InsertedDateTime,
                    lo.InsertedBy,
                    lo.UpdatedDateTime,
                    lo.UpdatedBy
                }).ToList();

                return currencies;
            }

            catch (Exception)
            {
                return null;
            }
        }



        public int EditCurrency(Currency currency, TravelManagementDBcontext dBcontext)
        {
            try
            {
                Currency searched_designation = dBcontext.Currencies.SingleOrDefault(c => c.Id == currency.Id);

                if (searched_designation == null)
                {
                    return -3;
                }

                currency.InsertedBy = searched_designation.InsertedBy;
                dBcontext.Entry(searched_designation).CurrentValues.SetValues(currency);
                return dBcontext.SaveChanges();
            }

            catch (Exception)
            {
                return -2;
            }
        }


        public int DeleteCurrency(int Id, TravelManagementDBcontext dBcontext)
        {
            try
            {
                Currency searched_designation = dBcontext.Currencies.SingleOrDefault(c => c.Id == Id);

                if (searched_designation == null)
                {
                    return -3;
                }
                dBcontext.Currencies.Remove(searched_designation);
                return dBcontext.SaveChanges();

            }
            catch (Exception)
            {
                return -2;
            }
        }
    }
}