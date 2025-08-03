using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TravelManagement.Context;
using TravelManagement.Models;

namespace TravelManagement.Gateway
{
    public class BarcodeGateway
    {
        //public int GenerateBarcodeNo(int CompanyId, string BarcodeStatus, TravelManagementDBcontext dbContext)
        //{
        //    try
        //    {

        //        Int32 count = dbContext.BarcodeNos
        //                                .Where(x => x.CreateDateTime.Year == DateTime.Now.Year)
        //                                //.Where(x => x.CreateDateTime.Month == DateTime.Now.Month)
        //                                //.Where(x => x.CreateDateTime.Day == DateTime.Now.Day)
        //                                .Where(x => x.CompanyId == CompanyId)
        //                                .Where(x => x.BarcodeForStatus == BarcodeStatus)
        //                                .Count();
        //        count += 1;
        //        return count;

        //    }
        //    catch (Exception ex)
        //    {
        //        return 0;
        //    }
        //}


        public int GenerateBarcodeNo(string BarcodeStatus, TravelManagementDBcontext dbContext)
        {
            try
            {

                Int32 count = dbContext.BarcodeNos
                                        .Where(x => x.CreateDateTime.Year == DateTime.Now.Year)
                                        //.Where(x => x.CreateDateTime.Month == DateTime.Now.Month)
                                        //.Where(x => x.CreateDateTime.Day == DateTime.Now.Day)
                                        //.Where(x => x.CompanyId == CompanyId)
                                        .Where(x => x.BarcodeForStatus == BarcodeStatus)
                                        .Count();
                count += 1;
                return count;

            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        public int AddBarcodeNo(BarcodeNo barcodeNo, TravelManagementDBcontext dbContext)
        {
            try
            {
                dbContext.BarcodeNos.Add(barcodeNo);
                int rowAffect = dbContext.SaveChanges();
                if (rowAffect > 0)
                {
                    return barcodeNo.BarcodeNoId;
                }
                return -2;
            }
            catch (Exception ex)
            {
                return -3;
            }
        }
    }
}