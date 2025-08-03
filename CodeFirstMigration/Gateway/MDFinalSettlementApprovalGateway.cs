using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TravelManagement.Context;
using TravelManagement.Utilities;

namespace TravelManagement.Gateway
{
    public class MDFinalSettlementApprovalGateway
    {
        public dynamic ShowFinalSettlementManagementMD(
                   TravelManagementDBcontext dBcontext)
        {
            try
            {
                int[] ComArr = MySession.Current.CompaniesId;
                int[] LocArr = MySession.Current.LocationsId;

                var machines = dBcontext.FinalSettlements.OrderByDescending(Mch => Mch.Id)
                    .Where(Mch => (Mch.FSApprovalStatusAudit == Utilities.ApprovalStatus.IsApproved)
                    && (Mch.FSApprovalStatusManagement == Utilities.ApprovalStatus.IsPending)
                    && (Mch.FSApprovalStatusAudit == Utilities.ApprovalStatus.IsApproved)
                    && (Mch.ApprovalStatusSup == Utilities.ApprovalStatus.IsApproved)
                    )

                    .Select(lo => new
                    {
                        lo.Id,
                        lo.TRFNo,
                        lo.TRFMasterId,
                        lo.User.Companys.CompanyName,
                        DepartmentName = lo.User.Department.Name,
                        lo.User.Designation.DesignationName,
                        lo.User.EmployeeId,
                        lo.User.FullName,
                        lo.User.ContactNo,
                        lo.UserNo,
                        lo.InsertedBy,
                        lo.InsertedDateTime,
                        lo.UpdatedBy,
                        lo.UpdatedDateTime,
                        lo.Remarks,
                        lo.Cost,
                        lo.Comments,
                        lo.DisbursedAmount,
                        lo.RemainingBalance,
                        lo.RejectedByManagement,
                        lo.RejectedByTopM,
                        lo.ApprovedAudit,
                        lo.ApprovedByTopM,
                        lo.ApprovedFSamount,
                        lo.RemarksFSapproval,
                        lo.FSApprovalStatusAudit,
                        lo.FSApprovalStatusManagement,
                        lo.AccountsStatusTC,
                        lo.TCbyAccounts,
                        lo.CommentsManagement,
                        lo.ApprovalStatusSup,
                        lo.ApprovedBySup,
                        lo.RejectedBySup,
                        lo.CommentsSupervisor,

                        Requistionorderdetails = dBcontext.BudgetFormAllRequisitionDetails
                                .Where(n => n.TRFMasterId == lo.TRFMasterId)
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

                        FinalAttachmentFiles = lo.FinalSettlementFiles
                            .Where(n => n.FinalSettlementId == lo.Id)
                            .Select(det1 => new
                            {
                                det1.Id,
                                det1.location,
                                det1.FinalSettlementId,
                                det1.FileName,
                                det1.UserNo
                            })
                            .ToList(),

                        FinalAttachmentDetails = lo.FinalSettlementsDetails
                            .Where(n1 => n1.FinalSettlementid == lo.Id)
                            .Select(det2 => new
                            {
                                det2.Id,
                                det2.TRFNo,
                                det2.FinalSettlementid,
                                det2.Expenses,
                                det2.Days,
                                det2.Total,
                                det2.CostPerDay
                            })
                            .ToList(),

                        orderTRFdetails = dBcontext.BudgetFormTRFDetailses
                            .Where(n1 => n1.TRFMasterId == lo.TRFMasterId)
                            .Select(det2 => new
                            {
                                det2.Id,
                                det2.Expenses,
                                det2.TRFMasterId,
                                det2.TRFNoText,
                                det2.Days,
                                det2.CostPerDay,
                                det2.Total,
                                det2.InsertedBy,
                                det2.InsertedDateTime,
                                det2.UpdatedBy,
                                det2.UpdatedDateTime,
                                det2.RemarksDisbursed,
                                det2.Disburse
                            })
                            .ToList(),

                        orderTRFmaster = dBcontext.BudgetFormTRFMasters
                            .Where(n1 => n1.Id == lo.TRFMasterId)
                            .Select(det => new
                            {
                                det.Id,
                                det.TotalCostRequired,
                                det.InsertedBy,
                                det.InsertedDateTime,
                                det.UpdatedBy,
                                det.UpdatedDateTime
                            })
                            .ToList(),

                    })
                    .ToList();

                return machines;
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}