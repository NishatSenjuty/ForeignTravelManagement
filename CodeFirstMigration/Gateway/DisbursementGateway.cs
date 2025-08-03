using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI.WebControls.Expressions;
using TravelManagement.Context;
using TravelManagement.Models;
using TravelManagement.Utilities;

namespace TravelManagement.Gateway
{
    public class DisbursementGateway
    {

        public dynamic ShowDisbursement(
         int CompanyId,
         int DepartmentId, 
         int DesignationId,
         string TRFNoText,
         string EmployeeId,
         TravelManagementDBcontext dBcontext)
        {
            try
            {
                var machines = dBcontext.BudgetFormTRFMasters.OrderByDescending(Mch => Mch.Id)

                    .Where(Mch => Mch.User.Companys.Id == CompanyId || CompanyId == -1)
                    .Where(Mch => Mch.User.DepartmentId == DepartmentId || DepartmentId == -1)
                    .Where(Mch => Mch.User.DesignationId == DesignationId || DesignationId == -1)
                    .Where(Mch => Mch.TRFNoText == TRFNoText || TRFNoText == "")
                    .Where(Mch => Mch.User.EmployeeId == EmployeeId || EmployeeId == "")
                    .Where(Mch => Mch.TicketApprovalStatusManagement == ApprovalStatus.IsApproved)

                .Select(lo => new
                {
                    lo.Id,
                    lo.TRFNoText,
                    lo.TRFNo,
                    lo.User.Companys.CompanyName,
                    DepartmentName = lo.User.Department.Name,
                    lo.User.Designation.DesignationName,
                    lo.User.EmployeeId,
                    lo.User.FullName,
                    lo.User.ContactNo,
                    lo.UserNo,
                    lo.TotalCostRequired,
                    lo.TotalAdvanceRequired,
                    lo.TotalDisbursedAmount,
                    lo.Remarks,
                    lo.TicketApprovalStatusManagement,
                    lo.ApprovedByManagement,
                    //lo.Currency.CurrencyName,
                    //lo.CurrencyTypeId,
                    lo.CurrencyType,

                    CurrencyName = dBcontext.Currencies
                            .Where(n => n.Id.ToString() == lo.CurrencyType)
                            .Select(co1 => new
                            {
                                co1.CurrencyName,
                                co1.Id
                            }).ToList(),

                    ApprovedByManDet = dBcontext.Users
                            .Where(n => n.UserNo == lo.ApprovedByManagement)
                            .Select(co1 => new
                            {
                                AppUserNo = co1.UserNo,
                                AppUserName = co1.FullName
                            }).ToList(),

                    RejectedByManDet = dBcontext.Users
                            .Where(n => n.UserNo == lo.RejectedByManagement)
                            .Select(co1 => new
                            {
                                RejUserNo = co1.UserNo,
                                RejUserName = co1.FullName
                            }).ToList(),

                    Requistionorderdetails = dBcontext.BudgetFormAllRequisitionDetails
                                .Where(n => n.TRFMasterId == lo.Id)
                                       .Select(det => new
                                       {
                                           det.Id,
                                           det.VisaRequisitionNo,
                                           det.TRFMasterId,
                                           det.TRFNoText,
                                           det.TicketRequisitionNo,
                                           det.HotelReservationNo,
                                           det.VisaReqId,
                                           det.TicketReqId,
                                           det.HotelResId,
                                           det.UserNo,
                                           det.InsertedBy,
                                           det.InsertedDateTime,
                                           det.UpdatedBy,
                                           det.UpdatedDateTime
                                       }).ToList(),


                    orderdetails = dBcontext.BudgetFormTRFDetailses
                                .Where(n => n.TRFMasterId == lo.Id)
                                       .Select(det => new
                                       {
                                           det.Id,
                                           det.Expenses,
                                           det.TRFMasterId,
                                           det.TRFNoText,
                                           det.Days,
                                           det.CostPerDay,
                                           det.Total,
                                           det.InsertedBy,
                                           det.InsertedDateTime,
                                           det.UpdatedBy,
                                           det.UpdatedDateTime,
                                           det.RemarksDisbursed,
                                           det.Disburse
                                       })

                }).ToList();

                return machines;
            }

            catch (Exception)
            {
                return null;
            }
        }


        //public int ApproveDisbursement(int Id, TravelManagementDBcontext DbContext)
        //{
        //    try
        //    {
        //        BudgetFormTRFMaster searched_Req = DbContext.BudgetFormTRFMasters.SingleOrDefault(c => c.Id == Id);               

        //        if (searched_Req == null)
        //        {
        //            return -3;
        //        }

        //        //string trfNoText = searched_Req.TRFNoText;

        //        searched_Req.TotalDisbursedAmount = searched_Req.TotalDisbursedAmount;

        //        DbContext.Entry(searched_Req).CurrentValues.SetValues(searched_Req);
        //        DbContext.SaveChanges();

        //        return Id;
        //    }

        //    catch (Exception)
        //    {
        //        return -2;
        //    }
        //}


        public Tuple<int, string> ApproveDisbursement(int Id, decimal TotalDisbursedAmount, TravelManagementDBcontext DbContext)
        {
            try
            {
                BudgetFormTRFMaster searched_Req = DbContext.BudgetFormTRFMasters.SingleOrDefault(c => c.Id == Id);

                if (searched_Req == null)
                {
                    return Tuple.Create(-3, "");
                }

                searched_Req.TotalDisbursedAmount = TotalDisbursedAmount;
                searched_Req.BudgetFormTRFDetails = null;
                DbContext.SaveChanges();

                return Tuple.Create(searched_Req.Id, searched_Req.TRFNoText);
            }
            catch (Exception)
            {
                return Tuple.Create(-2, "");
            }
        }



        public int AddTRFDetEntry(BudgetFormTRFDetails budgetFormTRFDetails, TravelManagementDBcontext dBcontext)
        {
            try
            {
                var existingEntry = dBcontext.BudgetFormTRFDetailses
                    .SingleOrDefault(e => e.Expenses == budgetFormTRFDetails.Expenses && e.Days == budgetFormTRFDetails.Days && e.TRFMasterId== budgetFormTRFDetails.TRFMasterId);

                if (existingEntry != null)
                {
                    existingEntry.Disburse = budgetFormTRFDetails.Disburse;
                    existingEntry.RemarksDisbursed = budgetFormTRFDetails.RemarksDisbursed;
                }

                return dBcontext.SaveChanges();
            }
            catch
            {
                return -2;
            }
        }
    }
}