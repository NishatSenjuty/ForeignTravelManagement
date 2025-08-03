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
    public class BudgetTRFGateway
    {

        public int SendEmailFromUser(string email, string username, BudgetFormTRFMaster budgetFormTRFMaster, TravelManagementDBcontext dBcontext)
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
                myMail.Subject = "Requisition for a TRF.";
                myMail.SubjectEncoding = System.Text.Encoding.UTF8;

                // set body-message and encoding
                //myMail.Body = "Hello <b>" + username+"</b><br>";
                //myMail.Body += "Your Booking System Verification Code<br>";
                //myMail.Body += "<b>123456</b>";



                string title = "Dear Supervisor,";
                string message1 = $"Kindly approve the budget requisition submitted by Mr./Ms. <b>{username}</b>. Thank you for your attention to this matter.<br>To approve, please visit: <a href=\"https://tms.urmisoftbd.com\">https://tms.urmisoftbd.com</a>";



                string code = budgetFormTRFMaster.TRFNoText;

                string message2 = $"The requisition number associated with this request is <b>{code}</b>.<br>";


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



        public int SendEmailFromUserUpdate(string email, string username, BudgetFormTRFMaster budgetFormTRFMaster, TravelManagementDBcontext dBcontext)
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
                myMail.Subject = "Requisition for a TRF.";
                myMail.SubjectEncoding = System.Text.Encoding.UTF8;

                // set body-message and encoding
                //myMail.Body = "Hello <b>" + username+"</b><br>";
                //myMail.Body += "Your Booking System Verification Code<br>";
                //myMail.Body += "<b>123456</b>";


                string title = "Dear Concern,";
                //string message1 = "Mr./Ms.  <b>" + username + "</b> has updated their information. Please review and approve the ticket requisition. Thank you for your attention to this matter.<br>To approve, please visit: <a href=\"http://192.168.21.111:8084/\">http://192.168.21.111:8084/</a>";
                string message1 = "Mr./Ms.  <b>" + username + "</b> has updated their information. Please review and approve the requisition. Thank you for your attention to this matter.<br>To approve, please visit: <a href=\"https://tms.urmisoftbd.com\">https://tms.urmisoftbd.com</a>";


                string code = budgetFormTRFMaster.TRFNoText;
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



        public int AddTRFMaster(BudgetFormTRFMaster budgetFormTRFMaster, TravelManagementDBcontext dBcontext)
        {
            try
            {
                dBcontext.BudgetFormTRFMasters.Add(budgetFormTRFMaster);
                int rowAffect = dBcontext.SaveChanges();
                if (rowAffect > 0)
                {
                    return budgetFormTRFMaster.Id;
                }
                return -3;
            }
            catch (Exception)
            {

                return -2;

            }
        }



        public int AddTRFDetEntry(BudgetFormTRFDetails budgetFormTRFDetails, TravelManagementDBcontext dBcontext)
        {
            try
            {
                dBcontext.BudgetFormTRFDetailses.Add(budgetFormTRFDetails);
                return dBcontext.SaveChanges();
            }
            catch
            {

                return -2;

            }
        }

        public int AddRequsitionDetEntry(BudgetFormAllRequisitionDetails budgetFormAllRequisitionDetails, TravelManagementDBcontext dBcontext)
        {
            try
            {
                dBcontext.BudgetFormAllRequisitionDetails.Add(budgetFormAllRequisitionDetails);
                return dBcontext.SaveChanges();
            }
            catch
            {

                return -2;

            }
        }


        public int AddRequisitionDetEntry(BudgetFormAllRequisitionDetails budgetFormAllRequisitionDetails, TravelManagementDBcontext dBcontext)
        {
            try
            {
                dBcontext.BudgetFormAllRequisitionDetails.Add(budgetFormAllRequisitionDetails);
                return dBcontext.SaveChanges();
            }
            catch
            {

                return -2;

            }
        }



        public dynamic ShowBudgetApproval(
              int limit,
             int CompanyId,
             int DepartmentId,
             int DesignationId,
             string TRFNoText,
             string EmployeeId,
             int page,
             TravelManagementDBcontext dBcontext)
        {
            try
            {

                int[] ComArr = MySession.Current.CompaniesId;
                int[] LocArr = MySession.Current.LocationsId;
                int UserNoFromSession = MySession.Current.UserNo;


                var machines = dBcontext.BudgetFormTRFMasters.OrderByDescending(Mch => Mch.Id)


                    .Where(Mch => Mch.User.Companys.Id == CompanyId || CompanyId == -1)
                    .Where(Mch => Mch.User.DepartmentId == DepartmentId || DepartmentId == -1)
                    .Where(Mch => Mch.User.DesignationId == DesignationId || DesignationId == -1)
                    .Where(Mch => Mch.TRFNoText == TRFNoText || TRFNoText == "")
                    .Where(Mch => Mch.User.EmployeeId == EmployeeId || EmployeeId == "")
                    .Where(c => c.TRFActiveStatus != Utilities.ActiveStatus.IsDeleted)
                    .Where(c => ComArr.Contains(c.User.Companys.Id))
                    .Where(c => LocArr.Contains(c.User.Locations.Id))
                                        //.Where(Mch => Mch.HotelReservation.HotelApprovalStatus == Utilities.ApprovalStatus.IsApproved)
                    .Where(Mch => Mch.User.UserNo == UserNoFromSession || UserNoFromSession == -1)
                    .Skip((page - 1) * limit)
                    .Take(limit)


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
                    lo.TotalAdvanceRequired,
                    lo.TotalCostRequired,
                    lo.InsertedBy,
                    lo.InsertedDateTime,
                    lo.UpdatedBy,
                    lo.UpdatedDateTime,
                    lo.Remarks,
                    lo.TicketApprovalStatusSupervisor,
                    lo.TicketApprovalStatusManagement,
                    lo.ApprovedByManagement,
                    lo.ApprovedBySupervisor,
                    //lo.Currency.CurrencyName,
                    //lo.CurrencyTypeId,
                    lo.CurrencyType,
                    lo.CommentsSupervisor,
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


        public int UpdateRequisition(BudgetFormTRFMaster budgetFormTRFMaster, TravelManagementDBcontext dBcontext)
        {
            try
            {
                BudgetFormTRFMaster searched_req = dBcontext.BudgetFormTRFMasters.SingleOrDefault(c => c.Id == budgetFormTRFMaster.Id);

                if (searched_req == null)
                {
                    return -3;
                }
                dBcontext.Entry(searched_req).CurrentValues.SetValues(budgetFormTRFMaster);
                return dBcontext.SaveChanges();
            }

            catch (Exception)
            {
                return -2;
            }
        }


        public int DeleteBudgetApproval(int Id, TravelManagementDBcontext DbContext)
        {
            try
            {
                BudgetFormTRFMaster searched_Req = DbContext.BudgetFormTRFMasters.SingleOrDefault(c => c.Id == Id);

                if (searched_Req == null)
                {
                    return -3;
                }

                searched_Req.TRFActiveStatus = ActiveStatus.IsDeleted;

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