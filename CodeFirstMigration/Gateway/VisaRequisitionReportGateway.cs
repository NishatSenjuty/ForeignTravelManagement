using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TravelManagement.Context;
using TravelManagement.Utilities;

namespace TravelManagement.Gateway
{
    public class VisaRequisitionReportGateway
    {

        public dynamic ShowVisaRequisitionReports(
             int CompanyId,
             int DepartmentId,
             int DesignationId,
             string VisaRequisitionNoText,
             string EmployeeId,
             TravelManagementDBcontext dBcontext)
        {
            try
            {
                var machines = dBcontext.VisaRequisitions.OrderByDescending(Mch => Mch.Id)

                    .Where(Mch => Mch.User.Companys.Id == CompanyId || CompanyId == -1)
                    .Where(Mch => Mch.User.DepartmentId == DepartmentId || DepartmentId == -1)
                    .Where(Mch => Mch.User.DesignationId == DesignationId || DesignationId == -1)
                    .Where(Mch => Mch.VisaRequisitionNoText == VisaRequisitionNoText || VisaRequisitionNoText == "")
                    .Where(Mch => Mch.User.EmployeeId == EmployeeId || EmployeeId == "")
                    .Where(c => c.VisaReqActiveStatus == Utilities.ActiveStatus.IsActive)

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