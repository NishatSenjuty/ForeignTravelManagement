using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TravelManagement.Context;
using TravelManagement.Utilities;

namespace TravelManagement.Gateway
{
    public class MD_visaApprovalGateway
    {

        public dynamic ShowVisaRequisitionMD(
            int page,
            int limit,
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

                var machines = dBcontext.VisaRequisitions.OrderByDescending(Mch => Mch.Id)
                    .Where(c => ComArr.Contains(c.User.Companys.Id))
                    .Where(c => LocArr.Contains(c.User.Locations.Id))
                    .Where(Mch => users.Contains(Mch.User.UserNo) || !users.Any())
                    .Where(Mch => Mch.VisaReqActiveStatus == ActiveStatus.IsActive)
                    .Where(Mch => Mch.VisaApprovalStatus == ApprovalStatus.IsPending)
                    .Skip((page - 1) * limit)
                    .Take(limit)


                .Select(lo => new
                {
                    lo.Id,
                    lo.VisaRequisitionNo,
                    lo.VisaRequisitionNoText,
                    lo.VisaReqActiveStatus,
                    lo.AccomodationDetUser,
                    lo.CountryNameUser,
                    lo.DepartureUser,
                    lo.EntryDateUser,
                    lo.ExpiryDatePrevUser,
                    lo.IssueDatePrevUser,
                    lo.ReturnUser,
                    lo.SpecialReqUser,
                    lo.RemarksUser,
                    lo.PurposeOfTravelUser,
                    lo.PurposeOfTravelOtherUser,
                    lo.VisaTypePreviousUser,
                    lo.TypeOfVisaOtherUser,
                    lo.TypeOfVisaUser,
                    lo.PreviouslyDestinedUser,
                    lo.User.Companys.CompanyName,
                    lo.User.Companys.CompanyShortName,
                    DepartmentName = lo.User.Department.Name,
                    lo.User.Designation.DesignationName,
                    lo.User.EmployeeId,
                    lo.User.FullName,
                    lo.UserNo,
                    lo.VisaExpiryDateTD,
                    lo.VisaIssueDateTD,
                    lo.VisaNoTD,
                    lo.CountryNameTD,
                    lo.RemarksTD,
                    lo.VisaApprovalStatus,
                    lo.ApprovedBy,
                    lo.RejectedBy,
                    lo.CommentsSupervisor,


                    visaReqAtt = dBcontext.VisaRequisitionAttachments
                            .Where(n => n.VisaRequisionId == lo.Id)
                            .Select(co1 => new
                            {
                                co1.Id,
                                co1.FileType,
                                co1.FileActiveStatus,
                                co1.location,
                                co1.UserNo
                            }).ToList(),



                    totissue = dBcontext.SignUpFileAttachments
                            .Where(n => n.UserNo == lo.UserNo)
                            .Select(co1 => new
                            {
                                co1.Id,
                                co1.FileType,
                                co1.FileActiveStatus,
                                co1.location,
                                co1.UserNo
                            }).ToList(),

                    TDfiles = dBcontext.visaRequisitionTDfiles
                            .Where(n => n.VisaRequisionId == lo.Id)
                            .Select(co2 => new
                            {
                                co2.Id,
                                co2.FileActiveStatus,
                                co2.location,
                                co2.UserNo
                            }).ToList()

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