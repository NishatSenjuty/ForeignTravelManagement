using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Web;
using TravelManagement.Context;
using TravelManagement.Models;
using TravelManagement.Utilities;

namespace TravelManagement.Gateway
{
    public class FinalSettlementApprovalGateway
    {

        //Supervisor
        public dynamic ShowFinalSettlementSup(
        int CompanyId,
        int DepartmentId,
        int DesignationId,
        string TRFNo,
        int ApprovalStatusSup,
        TravelManagementDBcontext dBcontext)
        {
            try
            {
                int[] ComArr = MySession.Current.CompaniesId;
                int[] LocArr = MySession.Current.LocationsId;
                int UserNo = MySession.Current.UserNo;

                var machines = dBcontext.FinalSettlements
                    .OrderByDescending(Mch => Mch.Id)
                    .Where(Mch => (Mch.User.Companys.Id == CompanyId || CompanyId == -1)
                        && (Mch.User.DepartmentId == DepartmentId || DepartmentId == -1)
                        && (Mch.User.DesignationId == DesignationId || DesignationId == -1)
                        && (Mch.TRFNo == TRFNo || TRFNo == "")
                        && (Mch.ApprovalStatusSup == (Utilities.ApprovalStatus)ApprovalStatusSup || ApprovalStatusSup == -1)
                        && (ComArr.Contains(Mch.User.Companys.Id))
                        && (LocArr.Contains(Mch.User.Locations.Id)))
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
                                det1.UserNo,
                                det1.FileType
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
                                det.UpdatedDateTime,

                            })

                    }).ToList();

                return machines;
            }
            catch (Exception)
            {
                return null;
            }
        }


        //Audit

        public dynamic ShowFinalSettlement(
        int CompanyId,
        int DepartmentId,
        int DesignationId,
        string TRFNo,
        string VisaRequisitionNo,
        int FSApprovalStatusAudit,
        TravelManagementDBcontext dBcontext)
        {
            try
            {
                int[] ComArr = MySession.Current.CompaniesId;
                int[] LocArr = MySession.Current.LocationsId;
                int UserNo = MySession.Current.UserNo;

                var machines = dBcontext.FinalSettlements
                    .OrderByDescending(Mch => Mch.Id)
                    .Where(Mch => (Mch.User.Companys.Id == CompanyId || CompanyId == -1)
                        && (Mch.User.DepartmentId == DepartmentId || DepartmentId == -1)
                        && (Mch.User.DesignationId == DesignationId || DesignationId == -1)
                        && (Mch.TRFNo == TRFNo || TRFNo == "")
                        && (Mch.FSApprovalStatusAudit == (Utilities.ApprovalStatus)FSApprovalStatusAudit || FSApprovalStatusAudit == -1)
                        && (ComArr.Contains(Mch.User.Companys.Id))
                        && (LocArr.Contains(Mch.User.Locations.Id))
                        && (Mch.ApprovalStatusSup == Utilities.ApprovalStatus.IsApproved))

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
                                det1.UserNo,
                                det1.FileType
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
                                det.UpdatedDateTime,

                            })

                    }).ToList();

                return machines;
            }
            catch (Exception)
            {
                return null;
            }
        }



        public int ApproveTRFApproval(int Id, string RemarksFSapproval, string ApprovedFSamount, string username, string TRFText,
            string ManagementUserEmail, TravelManagementDBcontext DbContext)
        {
            try
            {
                FinalSettlement searched_Req = DbContext.FinalSettlements.SingleOrDefault(c => c.Id == Id);

                if (searched_Req == null)
                {
                    return -3;
                }

                searched_Req.ApprovedFSamount = ApprovedFSamount;
                searched_Req.RemarksFSapproval = RemarksFSapproval;
                searched_Req.ApprovedByAudit = MySession.Current.UserNo;
                searched_Req.FSApprovalStatusAudit = ApprovalStatus.IsApproved;

                DbContext.Entry(searched_Req).CurrentValues.SetValues(searched_Req);
                DbContext.SaveChanges();

                // Send email
                int emailResult = SendEmailApproveManagement(ManagementUserEmail, username, TRFText);
                if (emailResult != 1)
                    return -1;  // Failed to send email

                return Id;
            }

            catch (Exception)
            {
                return -2;
            }
        }



        public int RejectTRFApproval(int Id, string RemarksFSapproval, string ApprovedFSamount, string username, string TRFText,
    string ApplicantEmail, TravelManagementDBcontext DbContext)
        {
            try
            {
                FinalSettlement searched_Req = DbContext.FinalSettlements.SingleOrDefault(c => c.Id == Id);

                if (searched_Req == null)
                {
                    return -3;
                }

                searched_Req.ApprovedFSamount = ApprovedFSamount;
                searched_Req.RemarksFSapproval = RemarksFSapproval;
                searched_Req.RejectedByAudit = MySession.Current.UserNo;
                searched_Req.FSApprovalStatusAudit = ApprovalStatus.IsRejected;

                DbContext.Entry(searched_Req).CurrentValues.SetValues(searched_Req);
                DbContext.SaveChanges();

                // Send email
                int emailResult = SendEmailRejectUserAudit(ApplicantEmail, username, TRFText);
                if (emailResult != 1)
                    return -1;  // Failed to send email

                return Id;
            }

            catch (Exception)
            {
                return -2;
            }
        }


        private int SendEmailRejectUserAudit(string email, string username, string TRFText)
        {
            try
            {
                //SmtpClient mySmtpClient = new SmtpClient("mail.urmigroup.net");

                SmtpClient mySmtpClient = new SmtpClient("mail.urmigroup.net");

                // set smtp-client with basicAuthentication
                mySmtpClient.UseDefaultCredentials = false;
                System.Net.NetworkCredential basicAuthenticationInfo = new System.Net.NetworkCredential("no_reply", "#007!@$hAh@!N");
                mySmtpClient.Credentials = basicAuthenticationInfo;

                // add from,to mailaddresses
                MailAddress from = new MailAddress("no_reply@urmigroup.net", "Urmi Group");
                MailAddress to = new MailAddress(email);
                MailMessage myMail = new System.Net.Mail.MailMessage(from, to);

                // set subject and encoding
                myMail.Subject = "Rejection for a Final Settlement by Audit.";
                myMail.SubjectEncoding = System.Text.Encoding.UTF8;

                // set body-message and encoding
                string title = "Dear Concern,";
                string message1 = $"Your final settlement requisition has been rejected by Mr./Ms. {username}.";
                string code = TRFText;
                string message2 = $"The requisition number associated with this request is {code}.";

                myMail.Body = CreateEmailBodyHtml(title, message1, message2, code);
                myMail.BodyEncoding = System.Text.Encoding.UTF8;
                // text or html
                myMail.IsBodyHtml = true;

                mySmtpClient.Send(myMail);

                return 1; // Success
            }
            catch (Exception)
            {
                return -1; // Failure
            }
        }
         


        //Management

        public dynamic ShowFinalSettlementManagement(
        int CompanyId,
        int DepartmentId,
        int DesignationId,
        string TRFNo,
        string VisaRequisitionNo,
        int FSApprovalStatusManagement,
        TravelManagementDBcontext dBcontext)
        {
            try
            {
                int[] ComArr = MySession.Current.CompaniesId;
                int[] LocArr = MySession.Current.LocationsId;

                var machines = dBcontext.FinalSettlements
                    .OrderByDescending(Mch => Mch.Id)
                    .Where(Mch => (Mch.User.Companys.Id == CompanyId || CompanyId == -1)
                        && (Mch.User.DepartmentId == DepartmentId || DepartmentId == -1)
                        && (Mch.User.DesignationId == DesignationId || DesignationId == -1)
                        && (Mch.TRFNo == TRFNo || TRFNo == "")
                    && (Mch.FSApprovalStatusManagement == (Utilities.ApprovalStatus)FSApprovalStatusManagement || FSApprovalStatusManagement == -1)
                    && (Mch.FSApprovalStatusAudit == Utilities.ApprovalStatus.IsApproved))

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



        public int ApproveFinalSettlementApproval(int Id, string username, string TRFText, 
            string AccountsUserEmail, string ApplicantEmail, TravelManagementDBcontext DbContext)
        {
            try
            {
                FinalSettlement searched_Req = DbContext.FinalSettlements.SingleOrDefault(c => c.Id == Id);

                if (searched_Req == null)
                {
                    return -3;
                }
                if (searched_Req.FSApprovalStatusManagement == ApprovalStatus.IsApproved)
                {
                    return -4;
                }


                searched_Req.FSApprovalStatusManagement = ApprovalStatus.IsApproved;
                searched_Req.ApprovedByManagement = MySession.Current.UserNo;
                searched_Req.CommentsManagement = null;

                DbContext.Entry(searched_Req).CurrentValues.SetValues(searched_Req);

                // Send email accounts
                int emailResult = SendEmailApproveAccounts(AccountsUserEmail, username, TRFText);
                if (emailResult != 1)
                    return -1;  // Failed to send email

                // Send email employee
                int emailResult2 = SendEmailApproveUsers(ApplicantEmail, username, TRFText);
                if (emailResult2 != 1)
                    return -1;  // Failed to send email


                return DbContext.SaveChanges();
            }

            catch (Exception)
            {
                return -2;
            }
        }

        private int SendEmailApproveUsers(string email, string username, string TRFText)
        {
            try
            {

                //SmtpClient mySmtpClient = new SmtpClient("mail.urmigroup.net");


                SmtpClient mySmtpClient = new SmtpClient("mail.urmigroup.net");

                // set smtp-client with basicAuthentication
                mySmtpClient.UseDefaultCredentials = false;
                System.Net.NetworkCredential basicAuthenticationInfo = new System.Net.NetworkCredential("no_reply", "#007!@$hAh@!N");
                mySmtpClient.Credentials = basicAuthenticationInfo;

                // add from,to mailaddresses
                MailAddress from = new MailAddress("no_reply@urmigroup.net", "Urmi Group");
                MailAddress to = new MailAddress(email);
                MailMessage myMail = new System.Net.Mail.MailMessage(from, to);

                // set subject and encoding
                myMail.Subject = "Approval for a Final Settlement.";
                myMail.SubjectEncoding = System.Text.Encoding.UTF8;

                // set body-message and encoding
                string title = "Dear Applicant,";
                string message1 = $"Your final settlement requisition has been approved by Mr./Ms. {username}. Please reach out to the accounts department.";
                string code = TRFText;
                string message2 = $"The requisition number associated with this request is {code}.";

                myMail.Body = CreateEmailBodyHtml(title, message1, message2, code);
                myMail.BodyEncoding = System.Text.Encoding.UTF8;
                // text or html
                myMail.IsBodyHtml = true;

                mySmtpClient.Send(myMail);

                return 1; // Success
            }
            catch (Exception)
            {
                return -1; // Failure
            }
        }

        private int SendEmailApproveAccounts(string email, string username, string TRFText)
        {
            try
            {

                //SmtpClient mySmtpClient = new SmtpClient("mail.urmigroup.net");


                SmtpClient mySmtpClient = new SmtpClient("mail.urmigroup.net");

                // set smtp-client with basicAuthentication
                mySmtpClient.UseDefaultCredentials = false;
                System.Net.NetworkCredential basicAuthenticationInfo = new System.Net.NetworkCredential("no_reply", "#007!@$hAh@!N");
                mySmtpClient.Credentials = basicAuthenticationInfo;

                // add from,to mailaddresses
                MailAddress from = new MailAddress("no_reply@urmigroup.net", "Urmi Group");
                MailAddress to = new MailAddress(email);
                MailMessage myMail = new System.Net.Mail.MailMessage(from, to);

                // set subject and encoding
                myMail.Subject = "Approval for a Final Settlement.";
                myMail.SubjectEncoding = System.Text.Encoding.UTF8;

                // set body-message and encoding
                string title = "Dear Concern,";
                //string message1 = $"A new final settlement requisition has been approved by Mr./Ms. {username}.<br>To review, please visit: <a href=\"http://192.168.21.111:8084/\">http://192.168.21.111:8084/</a>";
                string message1 = $"A new final settlement requisition has been approved by Mr./Ms. {username}.<br>To review, please visit: <a href=\"https://tms.urmisoftbd.com\">https://tms.urmisoftbd.com</a>";


                string code = TRFText;
                string message2 = $"The requisition number associated with this request is {code}.";

                myMail.Body = CreateEmailBodyHtml(title, message1, message2, code);
                myMail.BodyEncoding = System.Text.Encoding.UTF8;
                // text or html
                myMail.IsBodyHtml = true;

                mySmtpClient.Send(myMail);

                return 1; // Success
            }
            catch (Exception)
            {
                return -1; // Failure
            }
        }


        private int SendEmailApproveManagement(string email, string username, string TRFText)
        {
            try
            {
                //SmtpClient mySmtpClient = new SmtpClient("mail.urmigroup.net");

                SmtpClient mySmtpClient = new SmtpClient("mail.urmigroup.net");

                // set smtp-client with basicAuthentication
                mySmtpClient.UseDefaultCredentials = false;
                System.Net.NetworkCredential basicAuthenticationInfo = new System.Net.NetworkCredential("no_reply", "#007!@$hAh@!N");
                mySmtpClient.Credentials = basicAuthenticationInfo;

                // add from,to mailaddresses
                MailAddress from = new MailAddress("no_reply@urmigroup.net", "Urmi Group");
                MailAddress to = new MailAddress(email);
                MailMessage myMail = new System.Net.Mail.MailMessage(from, to);

                // set subject and encoding
                myMail.Subject = "Approval for a Final Settlement.";
                myMail.SubjectEncoding = System.Text.Encoding.UTF8;

                // set body-message and encoding
                string title = "Dear Concern,";
                //string message1 = $"A new final settlement requisition has been approved by Mr./Ms. {username} (Audit).<br>To review, please visit: <a href=\"http://192.168.21.111:8084/\">http://192.168.21.111:8084/</a>";
                string message1 = $"A new final settlement requisition has been approved by Mr./Ms. {username} (Audit).<br>To review, please visit: <a href=\"https://tms.urmisoftbd.com\">https://tms.urmisoftbd.com</a>";


                string code = TRFText;
                string message2 = $"The requisition number associated with this request is {code}.";

                myMail.Body = CreateEmailBodyHtml(title, message1, message2, code);
                myMail.BodyEncoding = System.Text.Encoding.UTF8;
                // text or html
                myMail.IsBodyHtml = true;

                mySmtpClient.Send(myMail);

                return 1; // Success
            }
            catch (Exception)
            {
                return -1; // Failure
            }
        }



        private int RejectTRFApproval(string email, string username, string TRFText)
        {
            try
            {
                //SmtpClient mySmtpClient = new SmtpClient("mail.urmigroup.net");

                SmtpClient mySmtpClient = new SmtpClient("mail.urmigroup.net");

                // set smtp-client with basicAuthentication
                mySmtpClient.UseDefaultCredentials = false;
                System.Net.NetworkCredential basicAuthenticationInfo = new System.Net.NetworkCredential("no_reply", "#007!@$hAh@!N");
                mySmtpClient.Credentials = basicAuthenticationInfo;

                // add from,to mailaddresses
                MailAddress from = new MailAddress("no_reply@urmigroup.net", "Urmi Group");
                MailAddress to = new MailAddress(email);
                MailMessage myMail = new System.Net.Mail.MailMessage(from, to);

                // set subject and encoding
                myMail.Subject = "Approval for a Final Settlement.";
                myMail.SubjectEncoding = System.Text.Encoding.UTF8;

                // set body-message and encoding
                string title = "Dear Concern,";
                //string message1 = $"A new final settlement requisition has been approved by Mr./Ms. {username} (Audit).<br>To review, please visit: <a href=\"http://192.168.21.111:8084/\">http://192.168.21.111:8084/</a>";
                string message1 = $"A new final settlement requisition has been approved by Mr./Ms. {username} (Audit).<br>To review, please visit: <a href=\"https://tms.urmisoftbd.com\">https://tms.urmisoftbd.com</a>";

                string code = TRFText;
                string message2 = $"The requisition number associated with this request is {code}.";

                myMail.Body = CreateEmailBodyHtml(title, message1, message2, code);
                myMail.BodyEncoding = System.Text.Encoding.UTF8;
                // text or html
                myMail.IsBodyHtml = true;

                mySmtpClient.Send(myMail);

                return 1; // Success
            }
            catch (Exception)
            {
                return -1; // Failure
            }
        }



        //Management Reject
        public int RejectFinalSettlementApproval(int Id, string CommentsManagement, string ApplicantEmail, string AuditUserEmail, string username, 
            string TRFText, TravelManagementDBcontext DbContext)
        {
            try
            {
                FinalSettlement searched_Req = DbContext.FinalSettlements.SingleOrDefault(c => c.Id == Id);

                if (searched_Req == null)
                {
                    return -3;
                }
                if (searched_Req.FSApprovalStatusManagement == ApprovalStatus.IsRejected)
                {
                    return -4;
                }

                searched_Req.FSApprovalStatusManagement = ApprovalStatus.IsRejected;
                searched_Req.RejectedByManagement = MySession.Current.UserNo;
                searched_Req.CommentsManagement = CommentsManagement;
                searched_Req.FSApprovalStatusAudit = ApprovalStatus.IsPending;
                searched_Req.ApprovedByAudit = null;

                DbContext.Entry(searched_Req).CurrentValues.SetValues(searched_Req);

                // Send email employee
                int emailResult = SendEmailRejectedUsers(ApplicantEmail, username, TRFText);
                if (emailResult != 1)
                    return -1;  // Failed to send email

                // Send email audit
                int emailResult1 = SendEmailRejectedAudit(AuditUserEmail, username, TRFText);
                if (emailResult1 != 1)
                    return -1;  // Failed to send email


                return DbContext.SaveChanges();
            }

            catch (Exception)
            {
                return -2;
            }
        }



        public int ApproveTRFApprovalSup(int Id, string username, string TRFText,
    string AuditEmail, TravelManagementDBcontext DbContext)
        {
            try
            {
                FinalSettlement searched_Req = DbContext.FinalSettlements.SingleOrDefault(c => c.Id == Id);

                if (searched_Req == null)
                {
                    return -3;
                }
                searched_Req.ApprovedBySup = MySession.Current.UserNo;
                searched_Req.ApprovalStatusSup = ApprovalStatus.IsApproved;
                searched_Req.CommentsSupervisor = null;
                searched_Req.RejectedBySup = null;

                DbContext.Entry(searched_Req).CurrentValues.SetValues(searched_Req);
                DbContext.SaveChanges();

                // Send email
                int emailResult = SendEmailApproveSup(AuditEmail, username, TRFText);
                if (emailResult != 1)
                    return -1;  // Failed to send email

                return Id;
            }

            catch (Exception)
            {
                return -2;
            }
        }


        public int RejectTRFApprovalSup(int Id, string CommentsSupervisor, string username, string TRFText,
                string ApplicantEmail, TravelManagementDBcontext DbContext)
        {
            try
            {
                FinalSettlement searched_Req = DbContext.FinalSettlements.SingleOrDefault(c => c.Id == Id);

                if (searched_Req == null)
                {
                    return -3;
                }

                searched_Req.RejectedBySup = MySession.Current.UserNo;
                searched_Req.ApprovalStatusSup = ApprovalStatus.IsRejected;
                searched_Req.CommentsSupervisor = CommentsSupervisor;

                DbContext.Entry(searched_Req).CurrentValues.SetValues(searched_Req);
                DbContext.SaveChanges();

                // Send email
                int emailResult = SendEmailRejectUserAudit(ApplicantEmail, username, TRFText);
                if (emailResult != 1)
                    return -1;  // Failed to send email

                return Id;
            }

            catch (Exception)
            {
                return -2;
            }
        }


        private int SendEmailApproveSup(string email, string username, string TRFText)
        {
            try
            {
                //SmtpClient mySmtpClient = new SmtpClient("mail.urmigroup.net");

                SmtpClient mySmtpClient = new SmtpClient("mail.urmigroup.net");

                // set smtp-client with basicAuthentication
                mySmtpClient.UseDefaultCredentials = false;
                System.Net.NetworkCredential basicAuthenticationInfo = new System.Net.NetworkCredential("no_reply", "#007!@$hAh@!N");
                mySmtpClient.Credentials = basicAuthenticationInfo;

                // add from,to mailaddresses
                MailAddress from = new MailAddress("no_reply@urmigroup.net", "Urmi Group");
                MailAddress to = new MailAddress(email);
                MailMessage myMail = new System.Net.Mail.MailMessage(from, to);

                // set subject and encoding
                myMail.Subject = "Approval for a Final Settlement.";
                myMail.SubjectEncoding = System.Text.Encoding.UTF8;

                // set body-message and encoding
                string title = "Dear Concern,";
                //string message1 = $"A new final settlement requisition has been approved by Mr./Ms. {username}.<br>To review, please visit: <a href=\"http://192.168.21.111:8084/\">http://192.168.21.111:8084/</a>";
                string message1 = $"A new final settlement requisition has been approved by Mr./Ms. {username}.<br>To review, please visit: <a href=\"https://tms.urmisoftbd.com\">https://tms.urmisoftbd.com</a>";

                string code = TRFText;
                string message2 = $"The requisition number associated with this request is {code}.";

                myMail.Body = CreateEmailBodyHtml(title, message1, message2, code);
                myMail.BodyEncoding = System.Text.Encoding.UTF8;
                // text or html
                myMail.IsBodyHtml = true;

                mySmtpClient.Send(myMail);

                return 1; // Success
            }
            catch (Exception)
            {
                return -1; // Failure
            }
        }




        private int SendEmailRejectedAudit(string email, string username, string TRFText)
        {
            try
            {
               // SmtpClient mySmtpClient = new SmtpClient("mail.urmigroup.net");

                 SmtpClient mySmtpClient = new SmtpClient("mail.urmigroup.net");

                // set smtp-client with basicAuthentication
                mySmtpClient.UseDefaultCredentials = false;
                System.Net.NetworkCredential basicAuthenticationInfo = new System.Net.NetworkCredential("no_reply", "#007!@$hAh@!N");
                mySmtpClient.Credentials = basicAuthenticationInfo;

                // add from,to mailaddresses
                MailAddress from = new MailAddress("no_reply@urmigroup.net", "Urmi Group");
                MailAddress to = new MailAddress(email);
                MailMessage myMail = new System.Net.Mail.MailMessage(from, to);

                // set subject and encoding
                myMail.Subject = "Final Settlement Rejected.";
                myMail.SubjectEncoding = System.Text.Encoding.UTF8;

                // set body-message and encoding
                string title = "Dear Applicant,";
                //string message1 = $"A final settlement requisition has been rejected by Mr./Ms. {username}.<br>To review, please visit: <a href=\"http://192.168.21.111:8084/\">http://192.168.21.111:8084/</a>";
                string message1 = $"A final settlement requisition has been rejected by Mr./Ms. {username}.<br>To review, please visit: <a href=\"https://tms.urmisoftbd.com\">https://tms.urmisoftbd.com</a>";


                string code = TRFText;
                string message2 = $"The requisition number associated with this request is {code}.";

                myMail.Body = CreateEmailBodyHtml(title, message1, message2, code);
                myMail.BodyEncoding = System.Text.Encoding.UTF8;
                // text or html
                myMail.IsBodyHtml = true;

                mySmtpClient.Send(myMail);

                return 1; // Success
            }
            catch (Exception)
            {
                return -1; // Failure
            }
        }


        private int SendEmailRejectedUsers(string email, string username, string TRFText)
        {
            try
            {
                //SmtpClient mySmtpClient = new SmtpClient("mail.urmigroup.net");

                 SmtpClient mySmtpClient = new SmtpClient("mail.urmigroup.net");

                // set smtp-client with basicAuthentication
                mySmtpClient.UseDefaultCredentials = false;
                System.Net.NetworkCredential basicAuthenticationInfo = new System.Net.NetworkCredential("no_reply", "#007!@$hAh@!N");
                mySmtpClient.Credentials = basicAuthenticationInfo;

                // add from,to mailaddresses
                MailAddress from = new MailAddress("no_reply@urmigroup.net", "Urmi Group");
                MailAddress to = new MailAddress(email);
                MailMessage myMail = new System.Net.Mail.MailMessage(from, to);

                // set subject and encoding
                myMail.Subject = "Final Settlement Rejected.";
                myMail.SubjectEncoding = System.Text.Encoding.UTF8;

                // set body-message and encoding
                string title = "Dear Applicant,";
                string message1 = $"Your final settlement requisition has been rejected by Mr./Ms. {username}.";
                string code = TRFText;
                string message2 = $"The requisition number associated with this request is {code}.";

                myMail.Body = CreateEmailBodyHtml(title, message1, message2, code);
                myMail.BodyEncoding = System.Text.Encoding.UTF8;
                // text or html
                myMail.IsBodyHtml = true;

                mySmtpClient.Send(myMail);

                return 1; // Success
            }
            catch (Exception)
            {
                return -1; // Failure
            }
        }


        public string CreateEmailBodyHtml(string title, string message1, string message2, string code)
        {
            string body = "<!doctype html><html lang='en-US'>" +
                "<head>" +
                "<meta content='text/html; charset=utf-8' http-equiv='Content-Type' />" +
                "<title>Email Confirmation</title>" +
                "<meta name='description' content='Email Confirmation'>" +
                "<style type='text/css'>a:hover {text-decoration: underline !important;}" +
                "</style>" +
                "</head>" +

                "<body marginheight='0' topmargin='0' marginwidth='0' style='margin: 0px; background-color: #f2f3f8;' leftmargin='0'>" +
                //<!-- 100% body table -->
                "<table cellspacing='0' border='0' cellpadding='0' width='100%' bgcolor='#f2f3f8' style='@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;'>" +
                "<tr>" +
                    "<td>" +
                        "<table style='background-color: #f2f3f8; max-width:670px; margin:0 auto;' width='100%' border='0'align='center' cellpadding='0' cellspacing='0'>" +
                            "<tr>" +
                                "<td style='height:80px;'>&nbsp;</td>" +
                            "</tr>" +
                            "<tr>" +
                                "<td style='text-align:center;'>" +
                                    "<a href='#' title='logo' target='_blank'>" +
                                        "<img width='60' src='http://103.134.89.72/Content/assets/images/logo/vehicleblue.png' title='logo' alt='logo'>" +
                                    "</a>" +
                                "</td>" +
                            "</tr>" +
                            "<tr>" +
                                "<td style='height:20px;'>&nbsp;</td>" +
                            "</tr>" +
                            "<tr>" +
                                "<td>" +
                                    "<table width='95%' border='0' align='center' cellpadding='0' cellspacing='0' style='max-width:670px; background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);'>" +
                                        "<tr>" +
                                            "<td style='height:40px;'>&nbsp;</td>" +
                                        "</tr>" +
                                        "<tr>" +
                                            "<td style='padding:0 35px;'>" +
                                                "<h3 style='color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;'>" + title + "</h3>" +
                                                "<p style='font-size:15px; color:#455056; margin:8px 0 0; line-height:24px;'>" +
                                                    "<strong>" + message1 + "</strong>" +
                                                "</p>" +
                                                "<p style='font-size:15px; color:#455056; margin:8px 0 0; line-height:24px;'>" +
                                                    "<strong>" + message2 + "</strong>" +
                                                "</p>" +
                                                "<h1 style='background:#20e277;text-decoration:none !important; display:inline-block; font-weight:500; margin-top:24px; color:#fff;text-transform:uppercase; font-size:20px;padding:10px 24px;display:inline-block;border-radius:50px;'>" + code + "</h1>" +
                                                "<p style='font-size:15px; color:#455056; margin:8px 0 0; line-height:24px;'>" +
                                                    "<strong>Urmi Group, IT Team</strong>" +
                                                "</p>" +
                                             "</td>" +
                                         "</tr>" +
                                         "<tr>" +
                                            "<td style='height:40px;'>&nbsp;</td>" +
                                         "</tr>" +
                                    "</table>" +
                                "</td>" +
                             "</tr>" +
                             "<tr>" +
                                "<td style='height:20px;'>&nbsp;</td>" +
                             "</tr>" +
                             "<tr>" +
                                "<td style='text-align:center;'>" +
                                    "<p style='font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;'>&copy; <strong>Travel Management System | Urmi Group</strong> </p>" +
                                "</td>" +
                             "</tr>" +
                             "<tr>" +
                                "<td style='height:80px;'>&nbsp;</td>" +
                             "</tr>" +
                        "</table>" +
                     "</td>" +
                 "</tr>" +
            "</table>" +
            "</body>" +
            "</html>";

            return body;

        }
    }
}