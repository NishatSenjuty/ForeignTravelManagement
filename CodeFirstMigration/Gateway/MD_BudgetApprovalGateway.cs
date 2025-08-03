using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TravelManagement.Context;
using TravelManagement.Utilities;

namespace TravelManagement.Gateway
{
    public class MD_BudgetApprovalGateway
    {
        public dynamic ShowTRFApprovalSup(
             int page,
             //int limit,
             TravelManagementDBcontext dBcontext)
        {
            try
            {

                int[] ComArr = MySession.Current.CompaniesId;
                int[] LocArr = MySession.Current.LocationsId;

                int userNo = MySession.Current.UserNo;
                var users = dBcontext.EnrollSuperVisors
                                 .Where(gp => gp.SupervisorId == userNo)
                                 .Select(g => g.UserId)
                                 .ToList();

                int IssueNo = -1;
                try
                {
                    if (users.Any())
                        IssueNo = Convert.ToInt16(users.First());
                }
                catch { }

                var machines = dBcontext.BudgetFormTRFMasters.OrderByDescending(Mch => Mch.Id)
                    .Where(c => ComArr.Contains(c.User.Companys.Id))
                    .Where(c => LocArr.Contains(c.User.Locations.Id))
                    .Where(Mch => users.Contains(Mch.User.UserNo) || !users.Any())
                    .Where(Mch => Mch.TRFActiveStatus == ActiveStatus.IsActive)
                    .Where(Mch => Mch.TicketApprovalStatusSupervisor == ApprovalStatus.IsPending)
                    .Where(Mch => Mch.TicketApprovalStatusManagement == ApprovalStatus.IsPending)
                    //.Skip((page - 1) * limit)
                    //.Take(limit)


                .Select(lo => new
                {
                    lo.Id,
                    lo.User.Companys.CompanyName,
                    DepartmentName = lo.User.Department.Name,
                    lo.User.Designation.DesignationName,
                    lo.User.EmployeeId,
                    lo.User.FullName,
                    lo.User.ContactNo,
                    lo.UserNo,
                    lo.TotalCostRequired,
                    lo.TotalAdvanceRequired,
                    lo.TicketApprovalStatusSupervisor,
                    lo.TicketApprovalStatusManagement,
                    lo.ApprovedByManagement,
                    lo.ApprovedBySupervisor,
                    lo.Remarks,
                    lo.CurrencyType,
                    lo.CommentsSupervisor,
                    lo.CommentsManagement,
                    lo.TRFNo,
                    lo.TRFNoText,

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




        public dynamic ShowTRFApprovalMan1(
                int page,
                //int limit,
                TravelManagementDBcontext dBcontext)
        {
            try
            {

                int[] ComArr = MySession.Current.CompaniesId;
                int[] LocArr = MySession.Current.LocationsId;

                int userNo = MySession.Current.UserNo;
                var users = dBcontext.EnrollSuperVisors
                                 .Where(gp => gp.SupervisorId == userNo)
                                 .Select(g => g.UserId)
                                 .ToList();

                int IssueNo = -1;
                try
                {
                    if (users.Any())
                        IssueNo = Convert.ToInt16(users.First());
                }
                catch { }

                var machines = dBcontext.BudgetFormTRFMasters.OrderByDescending(Mch => Mch.Id)
                    .Where(c => ComArr.Contains(c.User.Companys.Id))
                    .Where(c => LocArr.Contains(c.User.Locations.Id))
                    .Where(Mch => (users.Contains(Mch.User.UserNo) || Mch.TicketApprovalStatusSupervisor == Utilities.ApprovalStatus.IsApproved) || Mch.User.UserNo == userNo)
                    //.Where(Mch => Mch.TicketApprovalStatusSupervisor == (Utilities.ApprovalStatus)TicketApprovalStatusSupervisor || TicketApprovalStatusSupervisor == -1)
                    //.Where(Mch => Mch.TicketApprovalStatusManagement == (Utilities.ApprovalStatus)TicketApprovalStatusManagement || TicketApprovalStatusManagement == -1)
                    .Where(Mch => Mch.TRFActiveStatus == ActiveStatus.IsActive)
                    .Where(Mch => Mch.TicketApprovalStatusManagement == Utilities.ApprovalStatus.IsPending)
                //.Skip((page - 1) * limit)
                //.Take(limit)


                .Select(lo => new
                {
                    lo.Id,
                    lo.User.Companys.CompanyName,
                    DepartmentName = lo.User.Department.Name,
                    lo.User.Designation.DesignationName,
                    lo.User.EmployeeId,
                    lo.User.FullName,
                    lo.User.ContactNo,
                    lo.UserNo,
                    lo.TotalCostRequired,
                    lo.TotalAdvanceRequired,
                    lo.TicketApprovalStatusSupervisor,
                    lo.TicketApprovalStatusManagement,
                    lo.ApprovedByManagement,
                    lo.ApprovedBySupervisor,
                    lo.Remarks,
                    lo.CommentsSupervisor,
                    lo.CommentsManagement,
                    //lo.Currency.CurrencyName,
                    //lo.CurrencyTypeId,
                    lo.CurrencyType,
                    lo.TRFNo,
                    lo.TRFNoText,

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