using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TravelManagement.Context;

namespace TravelManagement.Gateway
{
    public class BudgetRequisitionReportGateway
    {
        public dynamic ShowbudgetReportuisitionReports(
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
                    .Where(c => c.TRFActiveStatus == Utilities.ActiveStatus.IsActive)

                .Select(lo => new
                {
                    lo.Id,
                    lo.TRFActiveStatus,
                    lo.UserNo,
                    lo.User.FullName,
                    lo.User.ContactNo,
                    lo.User.DepartmentId, 
                    lo.User.DesignationId,
                    lo.User.Companys.CompanyName,
                    DepartmentName = lo.User.Department.Name,
                    lo.User.Designation.DesignationName,
                    lo.User.EmployeeId,
                    lo.TotalCostRequired,
                    lo.TotalAdvanceRequired,
                    lo.TotalDisbursedAmount,
                    lo.CommentsSupervisor,
                    lo.Remarks,
                    lo.CurrencyType,
                    lo.TRFNoText,
                    lo.TRFNo,
                    lo.TicketApprovalStatusSupervisor,
                    lo.TicketApprovalStatusManagement,
                    lo.ApprovedByManagement,
                    lo.ApprovedBySupervisor,
                    lo.CommentsManagement,

                    ApprovedBySupDet = dBcontext.Users
                            .Where(n => n.UserNo == lo.ApprovedBySupervisor)
                            .Select(co1 => new
                            {
                                AppUserNo = co1.UserNo,
                                AppUserName = co1.FullName
                            }).ToList(),

                    RejectedBySupDet = dBcontext.Users
                            .Where(n => n.UserNo == lo.RejectedBySupervisor)
                            .Select(co1 => new
                            {
                                RejUserNo = co1.UserNo,
                                RejUserName = co1.FullName
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
                                           det.UpdatedDateTime
                                       })

            }).ToList();

                return machines;
            }

            catch (Exception)
            {
                return null;
            }
        }
    }
}