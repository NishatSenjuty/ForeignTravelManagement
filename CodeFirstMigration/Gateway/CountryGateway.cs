using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TravelManagement.Context;
using TravelManagement.Models;

namespace TravelManagement.Gateway
{
    public class CountryGateway
    {
        public int AddCountry(Country country, TravelManagementDBcontext dBcontext)
        {
            try
            {
                dBcontext.Countries.Add(country);
                return dBcontext.SaveChanges();
            }
            catch
            {

                return -2;

            }
        }


        public dynamic ShowCountry(TravelManagementDBcontext dBcontext)
        {
            try
            {
                var country = dBcontext.Countries.OrderByDescending(lo => lo.Id)
                .Select(lo => new
                {

                    lo.Id,
                    lo.CountryName,
                    lo.CountryActiveStatus,
                    lo.InsertedDateTime,
                    lo.InsertedBy,
                    lo.UpdatedDateTime,
                    lo.UpdatedBy
                }).ToList();

                return country;
            }

            catch (Exception)
            {
                return null;
            }
        }

        public int EditCountry(Country country, TravelManagementDBcontext dBcontext)
        {
            try
            {
                Country searched_country = dBcontext.Countries.SingleOrDefault(c => c.Id == country.Id);

                if (searched_country == null)
                {
                    return -3;
                }

                country.InsertedBy = searched_country.InsertedBy;
                dBcontext.Entry(searched_country).CurrentValues.SetValues(country);
                return dBcontext.SaveChanges();
            }

            catch (Exception)
            {
                return -2;
            }
        }


        public int DeleteCountry(int Id, TravelManagementDBcontext dBcontext)
        {
            try
            {
                Country searched_country = dBcontext.Countries.SingleOrDefault(c => c.Id == Id);

                if (searched_country == null)
                {
                    return -3;
                }
                dBcontext.Countries.Remove(searched_country);
                return dBcontext.SaveChanges();

            }
            catch (Exception)
            {
                return -2;
            }
        }
    }
}