using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TravelManagement.Context;
using TravelManagement.Models;

namespace TravelManagement.Gateway
{
    public class AirlinesGateway
    {

        public dynamic GetAirlines(TravelManagementDBcontext dBcontext)
        {
            try
            {
                var airlines = dBcontext.Airlineses.OrderByDescending(lo => lo.Id)
                .Select(lo => new
                {

                    lo.Id,
                    lo.AirlinesName,
                    lo.AirlinesActiveStatus,
                    lo.InsertedDateTime,
                    lo.InsertedBy,
                    lo.UpdatedDateTime,
                    lo.UpdatedBy
                }).ToList();

                return airlines;
            }

            catch (Exception)
            {
                return null;
            }
        }


        public int AddAirlines(Airlines airlines, TravelManagementDBcontext dBcontext)
        {
            try
            {
                dBcontext.Airlineses.Add(airlines);
                return dBcontext.SaveChanges();
            }
            catch
            {

                return -2;

            }
        }


        public int DeleteAirlines(int Id, TravelManagementDBcontext dBcontext)
        {
            try
            {
                Airlines searched_airlines = dBcontext.Airlineses.SingleOrDefault(c => c.Id == Id);

                if (searched_airlines == null)
                {
                    return -3;
                }
                dBcontext.Airlineses.Remove(searched_airlines);
                return dBcontext.SaveChanges();

            }
            catch (Exception)
            {
                return -2;
            }
        }


        public int EditAirlines(Airlines airlines, TravelManagementDBcontext dBcontext)
        {
            try
            {
                Airlines searched_airlines = dBcontext.Airlineses.SingleOrDefault(c => c.Id == airlines.Id);

                if (searched_airlines == null)
                {
                    return -3;
                }

                airlines.InsertedBy = searched_airlines.InsertedBy;
                dBcontext.Entry(searched_airlines).CurrentValues.SetValues(airlines);
                return dBcontext.SaveChanges();
            }

            catch (Exception)
            {
                return -2;
            }
        }
    }
}