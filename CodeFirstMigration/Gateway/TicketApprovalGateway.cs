using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Web;
using TravelManagement.Context;
using TravelManagement.Models;
using TravelManagement.Utilities;

namespace TravelManagement.Gateway
{
    public class TicketApprovalGateway
    {


        public int SendEmailFromUser(string email, string username, string TicketReqText, TravelManagementDBcontext dBcontext)
        {
            try
            {
                //SmtpClient mySmtpClient = new SmtpClient("mail.urmigroup.net");

                SmtpClient mySmtpClient = new SmtpClient("mail.urmigroup.net");

                // set smtp-client with basicAuthentication
                mySmtpClient.UseDefaultCredentials = false;
                System.Net.NetworkCredential basicAuthenticationInfo = new
                System.Net.NetworkCredential("no_reply", "#007!@$hAh@!N");
                mySmtpClient.Credentials = basicAuthenticationInfo;

                // add from,to mailaddresses
                MailAddress from = new MailAddress("no_reply@urmigroup.net", "Urmi Group");
                MailAddress to = new MailAddress(email);
                MailMessage myMail = new System.Net.Mail.MailMessage(from, to);

                //add ReplyTo
                //MailAddress replyTo = new MailAddress("mohammad.ishaque@urmigroup.net");
                //myMail.ReplyToList.Add(replyTo);

                // set subject and encoding
                myMail.Subject = "Requisition for a ticket.";
                myMail.SubjectEncoding = System.Text.Encoding.UTF8;

                // set body-message and encoding
                //myMail.Body = "Hello <b>" + username+"</b><br>";
                //myMail.Body += "Your Booking System Verification Code<br>";
                //myMail.Body += "<b>123456</b>";


                string title = "Dear Concern,";
                string message1 = "A new ticket requisition has been submitted by Mr./Ms.  <b>" + username + "</b>. Kindly proceed with ticket processing " +
                    "and promptly provide the documents to the applicant.<br>";
                string code = TicketReqText;
                string message2 = " The requisition number associated with this request is <b>" + code + ".</b><br>";


                myMail.Body = CreateEmailBodyHtml(title, message1, message2, code);
                myMail.BodyEncoding = System.Text.Encoding.UTF8;
                // text or html
                myMail.IsBodyHtml = true;

                mySmtpClient.Send(myMail);

                return 1;
            }
            catch (Exception ex)
            {
                return -1;
                //throw ex;
            }
        }

         

        public int SendEmailFromUserReject(string email, string username, string TicketReqText, TravelManagementDBcontext dBcontext)
        {
            try
            {
                //SmtpClient mySmtpClient = new SmtpClient("mail.urmigroup.net");

                SmtpClient mySmtpClient = new SmtpClient("mail.urmigroup.net");

                // set smtp-client with basicAuthentication
                mySmtpClient.UseDefaultCredentials = false;
                System.Net.NetworkCredential basicAuthenticationInfo = new
                System.Net.NetworkCredential("no_reply", "#007!@$hAh@!N");
                mySmtpClient.Credentials = basicAuthenticationInfo;

                // add from,to mailaddresses
                MailAddress from = new MailAddress("no_reply@urmigroup.net", "Urmi Group");
                MailAddress to = new MailAddress(email);
                MailMessage myMail = new System.Net.Mail.MailMessage(from, to);

                //add ReplyTo
                //MailAddress replyTo = new MailAddress("mohammad.ishaque@urmigroup.net");
                //myMail.ReplyToList.Add(replyTo);

                // set subject and encoding
                myMail.Subject = "Requisition for a ticket.";
                myMail.SubjectEncoding = System.Text.Encoding.UTF8;

                // set body-message and encoding
                //myMail.Body = "Hello <b>" + username+"</b><br>";
                //myMail.Body += "Your Booking System Verification Code<br>";
                //myMail.Body += "<b>123456</b>";


                string title = "Dear Concern,";
                string message1 = "Your ticket requisition has been rejected by Mr./Ms.  <b>" + username + "</b>.<br>";
                string code = TicketReqText;
                string message2 = " The requisition number associated with this request is <b>" + code + ".</b><br>";


                myMail.Body = CreateEmailBodyHtml(title, message1, message2, code);
                myMail.BodyEncoding = System.Text.Encoding.UTF8;
                // text or html
                myMail.IsBodyHtml = true;

                mySmtpClient.Send(myMail);

                return 1;
            }
            catch (Exception ex)
            {
                return -1;
                //throw ex;
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






        public dynamic ShowTicketRequision(
                int CompanyId,
                int DepartmentId,
                int DesignationId,
                string TicketRequisitionNoText,
                string EmployeeId,
                int TicketApprovalStatus,
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
                catch { 
                
                }


                var machines = dBcontext.TicketRequisitions.OrderByDescending(Mch => Mch.Id)

                    .Where(Mch => Mch.User.Companys.Id == CompanyId || CompanyId == -1)
                    .Where(Mch => Mch.User.DepartmentId == DepartmentId || DepartmentId == -1)
                    .Where(Mch => Mch.User.DesignationId == DesignationId || DesignationId == -1)
                    .Where(Mch => Mch.TicketRequisitionNoText == TicketRequisitionNoText || TicketRequisitionNoText == "")
                    .Where(Mch => Mch.User.EmployeeId == EmployeeId || EmployeeId == "")
                    .Where(c => ComArr.Contains(c.User.Companys.Id))
                    .Where(c => LocArr.Contains(c.User.Locations.Id))
                    .Where(Mch => users.Contains(Mch.User.UserNo) || !users.Any())
                    .Where(Mch => Mch.TicketReqActiveStatus == ActiveStatus.IsActive)
                    .Where(Mch => Mch.TicketApprovalStatus == (Utilities.ApprovalStatus)TicketApprovalStatus || TicketApprovalStatus == -1)
                    .Skip((page - 1) * limit)
                    .Take(limit)


                .Select(lo => new
                {
                    lo.Id,
                    lo.TicketRequisitionNo,
                    lo.TicketRequisitionNoText,
                    lo.TicketReqActiveStatus,
                    lo.PurposeOfTravelOtherUser,
                    lo.SpecialReqUser,
                    lo.RemarksUser,
                    lo.PurposeOfTravelUser,
                    lo.AirlinesUser,
                    lo.DepartureDateUser,
                    lo.DestinationUser,
                    lo.FlayerNoUser,
                    lo.FlightUser,
                    lo.MealUser,
                    lo.SeatUser,
                    lo.ReturnDateUser,
                    lo.User.Companys.CompanyName,
                    DepartmentName = lo.User.Department.Name,
                    lo.User.Designation.DesignationName,
                    lo.User.EmployeeId,
                    lo.User.FullName,
                    lo.User.ContactNo,
                    lo.UserNo,
                    lo.AirlinesTD,
                    lo.TicketTypeTD,
                    lo.TicketNoTD,
                    lo.DepturtureTimeTD,
                    lo.FlightNoTD,
                    lo.SeatNoTD,
                    lo.TerminalNoTD,
                    lo.RemarksTD,
                    lo.DepturtureDateTD,
                    lo.TicketPriceTD,
                    lo.CurrencyTypeTD,
                    lo.TicketApprovalStatus,
                    lo.ApprovedBy,
                    lo.RejectedBy,
                    lo.CommentsSupervisor,

                    tickReqAtt = dBcontext.TicketRequisitionFiles
                            .Where(n => n.TicketRequisionId == lo.Id)
                            .Select(co1 => new
                            {
                                co1.Id,
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


        public int ApproveTicketReqApproval(int Id, TravelManagementDBcontext DbContext)
        {
            try
            {
                TicketRequisition searched_Req = DbContext.TicketRequisitions.SingleOrDefault(c => c.Id == Id);

                if (searched_Req == null)
                {
                    return -3;
                }

                if (searched_Req.TicketApprovalStatus == ApprovalStatus.IsApproved)
                {
                    return -4;
                }

                searched_Req.TicketApprovalStatus = ApprovalStatus.IsApproved;
                searched_Req.ApprovedBy = MySession.Current.UserNo;
                searched_Req.CommentsSupervisor = null;

                DbContext.Entry(searched_Req).CurrentValues.SetValues(searched_Req);
                return DbContext.SaveChanges();
            }

            catch (Exception)
            {
                return -2;
            }
        }


        public int RejectTicketReqApproval(int Id, string CommentsSupervisor, TravelManagementDBcontext DbContext)
        {
            try
            {
                TicketRequisition searched_Req = DbContext.TicketRequisitions.SingleOrDefault(c => c.Id == Id);

                if (searched_Req == null)
                {
                    return -3;
                }
                if (searched_Req.TicketApprovalStatus == ApprovalStatus.IsRejected)
                {
                    return -4;
                }

                searched_Req.TicketApprovalStatus = ApprovalStatus.IsRejected;
                searched_Req.RejectedBy = MySession.Current.UserNo;
                searched_Req.CommentsSupervisor = CommentsSupervisor;

                DbContext.Entry(searched_Req).CurrentValues.SetValues(searched_Req);
                return DbContext.SaveChanges();
            }

            catch (Exception)
            {
                return -2;
            }
        }
    }
}