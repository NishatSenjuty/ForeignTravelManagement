using TravelManagement.Context;
using TravelManagement.Models;
using TravelManagement.Utilities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Validation;
using System.Linq;
using System.Web;
using System.Xml.Linq;

namespace TravelManagement.Gateway
{

    public class CompaniesGateway
    {

        // Function For Companies Page - Saving New Company in database *
        public dynamic AddCompany(Company company, TravelManagementDBcontext dBcontext)
        {
            try
            {
                dBcontext.Companies.Add(company);
                var r= dBcontext.SaveChanges();
                return r;
            }
            catch (DbEntityValidationException ex)
            {
                return ex.InnerException.InnerException.Message;
                //return -2;
            }
            catch (Exception ex)
            {
                return ex.InnerException.InnerException.Message;
                //return -2;
            }
        }

        //Function for Companies Page - Showing data on Company List Table in view *
        public dynamic GetCompanies(TravelManagementDBcontext dBcontext)
        {
            try
            {
                var companies = dBcontext.Companies.OrderByDescending(c => c.Id)
                .Select(co => new
                {
                    co.Id,
                    co.CompanyName,
                    co.CompanyShortName,
                    co.CompanyActiveStatus,
                    co.InsertedDateTime,
                    co.InsertedBy,
                    co.UpdatedDateTime,
                    co.UpdatedBy
                }).ToList();

                return companies;
            }

            catch (Exception)
            {
                return null;
            }
        }


        //Function for Companies Page - Edit Company by Edit Button Icon in Action on Company List Table *
        public int EditCompany(Company company, TravelManagementDBcontext dBcontext)
        {
            try
            {
                Company searched_company = dBcontext.Companies.SingleOrDefault(c => c.Id == company.Id);

                if (searched_company == null)
                {
                    return -3;
                }

                //company.InsertedBy = searched_company.InsertedBy;
                dBcontext.Entry(searched_company).CurrentValues.SetValues(company);
                return dBcontext.SaveChanges();
            }
            catch (Exception)
            {
                return -2;
            }
        }

        //Function for Companies Page - Delete Company by Delete Button Icon in Action on Company List Table *
        public int DeleteCompany(int Id, TravelManagementDBcontext dBcontext)
        {
            try
            {
                Company searched_company = dBcontext.Companies.SingleOrDefault(c => c.Id == Id);

                if (searched_company == null)
                {
                    return -3;
                }
                dBcontext.Companies.Remove(searched_company);
                return dBcontext.SaveChanges();
            }
            catch (Exception)
            {
                return -2;
            }
        }

        // For Employee Information page - with session - to get the data of company, floor and location *
        public dynamic GetCompanyLocationFloorsForDropdownByArr(int[] companiesId, int[] locationsId, int[] floorsId, TravelManagementDBcontext dBcontext)
        {
            try
            {               
                var companies = dBcontext.Companies
                                .Where(c => companiesId.Contains(c.Id))
                                .Where(c => c.CompanyActiveStatus == Utilities.ActiveStatus.IsActive)
                                .Include(c => c.Locations)
                                .Select(co => new
                                {
                                    co.Id,
                                    co.CompanyName,
                                    Locations = co.Locations
                                        .Where(loc => locationsId.Contains(loc.Id))
                                        .Where(loc => loc.LocationActiveStatus == Utilities.ActiveStatus.IsActive)
                                        .Select(locc => new
                                        {
                                            locc.Id,
                                            locc.LocationName,
                                            Floors = locc.Floors
                                                .Where(fl => floorsId.Contains(fl.Id))
                                                .Where(fl => fl.FloorActiveStatus == Utilities.ActiveStatus.IsActive)
                                                .Select(floor => new
                                                {
                                                    floor.Id,
                                                    floor.FloorName

                                                })
                                        })
                                })
                                .ToArray();

                return companies;
            }
            catch (Exception)
            {
                return null;
            }
        }


        // Getting Company For location part
        public dynamic GetCompanyLocationFloorsForDropdownByArrLocation(TravelManagementDBcontext dBcontext)
        {
            try
            {

                var companies = dBcontext.Companies
                               // .Where(c => companiesId.Contains(c.Id))
                                .Where(c => c.CompanyActiveStatus == Utilities.ActiveStatus.IsActive)
                                .Include(c => c.Locations)
                                .Select(co => new
                                {
                                    co.Id,
                                    co.CompanyName,
                                    Locations = co.Locations
                                     //   .Where(loc => locationsId.Contains(loc.Id))
                                        .Where(loc => loc.LocationActiveStatus == Utilities.ActiveStatus.IsActive)
                                        .Select(locc => new
                                        {
                                            locc.Id,
                                            locc.LocationName,
                                            Floors = locc.Floors
                                            //    .Where(fl => floorsId.Contains(fl.Id))
                                            //    .Where(fl => floorsId.Contains(fl.Id))
                                                .Where(fl => fl.FloorActiveStatus == Utilities.ActiveStatus.IsActive)
                                                .Select(floor => new
                                                {
                                                    floor.Id,
                                                    floor.FloorName

                                                })
                                        })
                                })
                                .ToArray();

                return companies;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public dynamic GetCompanyLocationsForDropdown(int[] companiesId, int[] locationsId, TravelManagementDBcontext dbContext)
        {
            try
            {
                var companies = dbContext.Companies
                                .Where(c => companiesId.Contains(c.Id) || companiesId.Count() == 0)
                                .Where(c => c.CompanyActiveStatus == ActiveStatus.IsActive)
                                .Include(c => c.Locations)
                                .Select(co => new
                                {
                                    CompanyId = co.Id,
                                    co.CompanyName,
                                    Locations = co.Locations
                                        .Where(locc => locationsId.Contains(locc.Id) || locationsId.Count() == 0)
                                        .Where(locc => locc.LocationActiveStatus == ActiveStatus.IsActive)
                                        .Select(loc => new
                                        {
                                            LocationId = loc.Id,
                                            loc.LocationName
                                        })
                                })
                                .ToArray();

                return companies;
            }
            catch (Exception)
            {
                return null;
            }
        }


        public dynamic GetCompanyLocationFloorsLinesForDropdownByArr(TravelManagementDBcontext dbContext)
        {
            try
            {
                var companies = dbContext.Companies
                            //.Where(c => companiesId.Contains(c.Id))
                            .Where(c => c.CompanyActiveStatus == Utilities.ActiveStatus.IsActive)
                            .Include(c => c.Locations)
                            .Select(co => new
                            {
                                co.Id,
                                co.CompanyName,
                                Locations = co.Locations
                                    //.Where(loc => locationsId.Contains(loc.Id))
                                    .Where(loc => loc.LocationActiveStatus == Utilities.ActiveStatus.IsActive)
                                    .Select(locc => new
                                    {
                                        locc.Id,
                                        locc.LocationName,


                                        Floors = locc.Floors
                                            //.Where(fl => floorsId.Contains(fl.Id))
                                            .Where(fl => fl.FloorActiveStatus == Utilities.ActiveStatus.IsActive)
                                            .Select(floor => new
                                            {
                                                floor.Id,
                                                floor.FloorName,
                                            })
                                    })
                            })
                            .ToArray();

                return companies;


            }
            catch (Exception)
            {
                return null;
            }
        }

    }
}