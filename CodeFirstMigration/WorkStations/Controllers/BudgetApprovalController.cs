using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TravelManagement.Context;
using TravelManagement.Gateway;
using TravelManagement.Models;
using TravelManagement.Utilities;

namespace CodeFirstMigration.WorkStations.Controllers
{
    public class BudgetApprovalController : Controller
    {
        [Route("a/trfForm")]

        //Function For EmployeeInformations Page - Session  *
        public ActionResult Index()
        {
            if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            {
                return Redirect("~/admin/sign_in");
            }
            if (!MySession.Current.NavList.Contains("trfForm")) // means short name in the menulist db table
            {
                return Json(RequstStatus.Return(RequestStatusType.AccessDenied), JsonRequestBehavior.AllowGet);
            }
            return View("~/WorkStations/Views/BudgetApprovalForm/Index.cshtml");
        }




        [HttpPost]
        public ActionResult AddBudgetApproval([Bind(Include = "TotalCostRequired, TotalAdvanceRequired, CurrencyType, " +
            "Remarks, BudgetFormTRFDetails, BudgetFormAllRequisitionDetails")]  BudgetFormTRFMaster budgetFormTRFMaster)
        {

            using (TravelManagementDBcontext dbContext = new TravelManagementDBcontext())
            {
              
                //Cost should be greater
                if (budgetFormTRFMaster.TotalAdvanceRequired > budgetFormTRFMaster.TotalCostRequired)
                {
                    return Json(new { error = true, message = "The amount of advance cannot be greater than the cost." }, JsonRequestBehavior.AllowGet);
                }


                budgetFormTRFMaster.InsertedBy = MySession.Current.UserNo;
                budgetFormTRFMaster.UserNo = MySession.Current.UserNo;

                BarcodeGateway barcodeGateway = new BarcodeGateway();
                budgetFormTRFMaster.TRFNo = barcodeGateway.GenerateBarcodeNo("TRF", dbContext);


                string Getyear = DateTime.Now.ToString("yy");
                int Rec_Count = Convert.ToInt16(budgetFormTRFMaster.TRFNo);
                string Gen_Barcode = "TRF-" + Getyear + "-";
                if (Rec_Count < 10)
                {
                    Gen_Barcode = Gen_Barcode + "000" + Rec_Count;
                }
                else if (Rec_Count < 11)
                {
                    Gen_Barcode = Gen_Barcode + "00" + Rec_Count;
                }
                else if (Rec_Count < 101)
                {
                    Gen_Barcode = Gen_Barcode + "0" + Rec_Count;
                }
                else
                {
                    Gen_Barcode = Gen_Barcode + Rec_Count;
                }

                budgetFormTRFMaster.TRFNoText = Gen_Barcode;

                if (budgetFormTRFMaster.TRFNo == 0)
                {
                    return Json(new { error = true, message = "A generation error has occurred for the barcode number." }, JsonRequestBehavior.AllowGet);
                }


                using (var dbTransaction = dbContext.Database.BeginTransaction())
                {
                    try
                    {
                        BarcodeNo barcodeNo = new BarcodeNo();
                        barcodeNo.BarcodeNoText = budgetFormTRFMaster.TRFNoText;
                        barcodeNo.CreateDateTime = DateTime.Now;
                        barcodeNo.BarcodeForStatus = "TRF";
                        int InsertBarcode = barcodeGateway.AddBarcodeNo(barcodeNo, dbContext);
                        if (InsertBarcode < 1)
                        {
                            throw new Exception("The barcode number was not inserted correctly.");
                        }

                        BudgetTRFGateway budgetTRFGateway = new BudgetTRFGateway();

                        List<BudgetFormTRFDetails> orderQuantities = budgetFormTRFMaster.BudgetFormTRFDetails;
                        budgetFormTRFMaster.BudgetFormTRFDetails = null;

                        List<BudgetFormAllRequisitionDetails> requisitionQuantities = budgetFormTRFMaster.BudgetFormAllRequisitionDetails;
                        budgetFormTRFMaster.BudgetFormAllRequisitionDetails = null;

                        budgetFormTRFMaster.Id = budgetTRFGateway.AddTRFMaster(budgetFormTRFMaster, dbContext);
                        if (budgetFormTRFMaster.Id <= 0)
                        {
                            throw new Exception("Information saving failed.");
                        }



                        foreach (BudgetFormTRFDetails orderQuantity in orderQuantities)
                        {
                            orderQuantity.InsertedBy = MySession.Current.UserNo;
                            orderQuantity.TRFMasterId = budgetFormTRFMaster.Id;
                            orderQuantity.TRFNoText = budgetFormTRFMaster.TRFNoText;


                            int rowAffected = budgetTRFGateway.AddTRFDetEntry(orderQuantity, dbContext);
                            if (rowAffected <= 0)
                            {
                                throw new Exception("Order Quantity information saving failed.");
                            }
                        }


                        foreach (BudgetFormAllRequisitionDetails requisitionQuantity in requisitionQuantities)
                        {

                            int VisaReqId = dbContext.VisaRequisitions
                                .Where(e => e.VisaRequisitionNoText == requisitionQuantity.VisaRequisitionNo)
                                .Select(e => e.Id)
                                .FirstOrDefault();

                            requisitionQuantity.VisaReqId = VisaReqId;

                            int TicketReqId = dbContext.TicketRequisitions
                            .Where(e => e.TicketRequisitionNoText == requisitionQuantity.TicketRequisitionNo)
                            .Select(e => e.Id)
                            .FirstOrDefault();

                            requisitionQuantity.TicketReqId = TicketReqId;

                            int HotelResId = dbContext.HotelReservations
                                .Where(e => e.HotelReservationNoText == requisitionQuantity.HotelReservationNo)
                                .Select(e => e.Id)
                                .FirstOrDefault();

                            requisitionQuantity.HotelResId = HotelResId;


                            requisitionQuantity.InsertedBy = MySession.Current.UserNo;
                            requisitionQuantity.UserNo = MySession.Current.UserNo;
                            requisitionQuantity.TRFMasterId = budgetFormTRFMaster.Id;
                            requisitionQuantity.TRFNoText = budgetFormTRFMaster.TRFNoText;


                            int rowAffected = budgetTRFGateway.AddRequisitionDetEntry(requisitionQuantity, dbContext);
                            if (rowAffected <= 0)
                            {
                                throw new Exception("Requisition Quantity information saving failed.");
                            }
                        }


                        //Email

                        var SupUserNo = dbContext.EnrollSuperVisors.Where(t => t.UserId == budgetFormTRFMaster.UserNo).Select(s => s.SupervisorId).FirstOrDefault();
                        var SupEmail = dbContext.Users.Where(t => t.UserNo == SupUserNo).Select(s => s.Email).FirstOrDefault();

                        if (SupEmail == null)
                        {
                            return Json(new { error = true, message = "No Available Supervisor for the user. Email could not be send" }, JsonRequestBehavior.AllowGet);
                        }

                        string userName = dbContext.Users.Where(t => t.UserNo == budgetFormTRFMaster.UserNo).Select(s => s.FullName).FirstOrDefault();

                        int emailFlag = budgetTRFGateway.SendEmailFromUser(SupEmail, userName, budgetFormTRFMaster, dbContext);

                        if (emailFlag <= 0)
                        {
                            throw new Exception();
                        }



                        dbContext.SaveChanges();
                        dbTransaction.Commit();
                        return Json(new { error = false, message = "Saved successfully. orderNo = " + Gen_Barcode }, JsonRequestBehavior.AllowGet);
                    }
                    catch (Exception ex)
                    {
                        dbTransaction.Rollback();
                        return Json(new { error = true, message = "Oops! Requisition is not saved. Please try again later. " + ex.Message }, JsonRequestBehavior.AllowGet);

                    }
                }
            }
        }


        [HttpPost]
        public ActionResult ShowBudgetApproval(
             int limit,
             int CompanyId,
             int DepartmentId,
             int DesignationId,
             string TRFNoText,
             string EmployeeId,
             int page
             )
        {
            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {
                BudgetTRFGateway budgetTRFGateway = new BudgetTRFGateway();

                var data = budgetTRFGateway.ShowBudgetApproval(
                                                 limit,
                                                 CompanyId,
                                                 DepartmentId,
                                                 DesignationId,
                                                 TRFNoText,
                                                 EmployeeId,
                                                 page,                                             
                                                 dBcontext);

                if (data == null)
                {
                    return Json(new { error = true, message = "Data Not Found." }, JsonRequestBehavior.AllowGet);
                }

                return Json(data);

            }
        }




        [HttpPost]
        public ActionResult EditBudgetApproval([Bind(Include = "Id, TRFNoText, TRFNo, " +
            "TotalCostRequired, TotalAdvanceRequired, Remarks, CurrencyType, BudgetFormTRFDetails, BudgetFormAllRequisitionDetails")]  BudgetFormTRFMaster budgetFormTRFMaster)
        {
            using (TravelManagementDBcontext dbContext = new TravelManagementDBcontext())
            {
                budgetFormTRFMaster.UpdatedBy = MySession.Current.UserNo;
                budgetFormTRFMaster.UserNo = MySession.Current.UserNo;

                using (var dbTransaction = dbContext.Database.BeginTransaction())
                {
                    try
                    {

                        if (budgetFormTRFMaster.TotalAdvanceRequired > budgetFormTRFMaster.TotalCostRequired)
                        {
                            return Json(new { error = true, message = "The amount of advance cannot be greater than the cost." }, JsonRequestBehavior.AllowGet);
                        }


                        BudgetTRFGateway budgetTRFGateway = new BudgetTRFGateway();

                        List<BudgetFormTRFDetails> orderQuantities = budgetFormTRFMaster.BudgetFormTRFDetails;
                        budgetFormTRFMaster.BudgetFormTRFDetails = null;


                        List<BudgetFormAllRequisitionDetails> requisitionQuantities = budgetFormTRFMaster.BudgetFormAllRequisitionDetails;
                        budgetFormTRFMaster.BudgetFormAllRequisitionDetails = null;


                        int rowAffected1 = budgetTRFGateway.UpdateRequisition(budgetFormTRFMaster, dbContext);
                        if (rowAffected1 < 1)
                        {
                            throw new Exception("Information updating failed.");
                        }


                        var details = dbContext.BudgetFormTRFDetailses.Where(x => x.TRFMasterId == budgetFormTRFMaster.Id).ToList();
                        dbContext.BudgetFormTRFDetailses.RemoveRange(details); //details delete
                        int rowAffected2 = dbContext.SaveChanges();
                        if (rowAffected2 < 1)
                        {
                            throw new Exception("Information updating failed.");
                        }


                        var ReqDetails = dbContext.BudgetFormAllRequisitionDetails.Where(x => x.TRFMasterId == budgetFormTRFMaster.Id).ToList();
                        dbContext.BudgetFormAllRequisitionDetails.RemoveRange(ReqDetails); //details delete
                        int rowAffected3 = dbContext.SaveChanges();
                        if (rowAffected3 < 1)
                        {
                            throw new Exception("Information updating failed.");
                        }

                        foreach (BudgetFormTRFDetails orderQuantity in orderQuantities)
                        {
                            orderQuantity.InsertedBy = MySession.Current.UserNo;
                            orderQuantity.TRFMasterId = budgetFormTRFMaster.Id;

                            orderQuantity.TRFNoText = budgetFormTRFMaster.TRFNoText;

                            int rowAffected = budgetTRFGateway.AddTRFDetEntry(orderQuantity, dbContext);
                            if (rowAffected <= 0)
                            {
                                throw new Exception("Order Quantity information saving failed.");
                            }
                        }


                        foreach (BudgetFormAllRequisitionDetails requisitionQuantity in requisitionQuantities)
                        {
                            requisitionQuantity.InsertedBy = MySession.Current.UserNo;
                            requisitionQuantity.TRFMasterId = budgetFormTRFMaster.Id;
                            requisitionQuantity.TRFNoText = budgetFormTRFMaster.TRFNoText;
                            requisitionQuantity.UserNo = MySession.Current.UserNo;


                            int VisaReqId = dbContext.VisaRequisitions
                            .Where(e => e.VisaRequisitionNoText == requisitionQuantity.VisaRequisitionNo)
                            .Select(e => e.Id)
                            .FirstOrDefault();

                            requisitionQuantity.VisaReqId = VisaReqId;

                            int TicketReqId = dbContext.TicketRequisitions
                            .Where(e => e.TicketRequisitionNoText == requisitionQuantity.TicketRequisitionNo)
                            .Select(e => e.Id)
                            .FirstOrDefault();

                            requisitionQuantity.TicketReqId = TicketReqId;

                            int HotelResId = dbContext.HotelReservations
                                .Where(e => e.HotelReservationNoText == requisitionQuantity.HotelReservationNo)
                                .Select(e => e.Id)
                                .FirstOrDefault();

                            requisitionQuantity.HotelResId = HotelResId;


                            int rowAffected = budgetTRFGateway.AddRequsitionDetEntry(requisitionQuantity, dbContext);
                            if (rowAffected <= 0)
                            {
                                throw new Exception("Order Quantity information saving failed.");
                            }
                        }


                        //Email

                        var SupUserNo = dbContext.EnrollSuperVisors.Where(t => t.UserId == budgetFormTRFMaster.UserNo).Select(s => s.SupervisorId).FirstOrDefault();
                        var SupEmail = dbContext.Users.Where(t => t.UserNo == SupUserNo).Select(s => s.Email).FirstOrDefault();

                        if (SupEmail == null)
                        {
                            return Json(new { error = true, message = "No Available Supervisor for the user. Email could not be send" }, JsonRequestBehavior.AllowGet);
                        }

                        string userName = dbContext.Users.Where(t => t.UserNo == budgetFormTRFMaster.UserNo).Select(s => s.FullName).FirstOrDefault();

                        int emailFlag = budgetTRFGateway.SendEmailFromUserUpdate(SupEmail, userName, budgetFormTRFMaster, dbContext);

                        if (emailFlag <= 0)
                        {
                            throw new Exception();
                        }


                        dbContext.SaveChanges();
                        dbTransaction.Commit();
                        return Json(new { error = false, message = "Updated successfully." }, JsonRequestBehavior.AllowGet);

                    }
                    catch (Exception ex)
                    {
                        dbTransaction.Rollback();
                        return Json(new { error = true, message = "Oops! Saving Failed. Please try again later. " + ex.Message }, JsonRequestBehavior.AllowGet);

                    }
                }
            }
        }



        [HttpPost]
        public ActionResult DeleteBudgetApproval(int? Id)
        {

            if (Id == null || Id <= 0)
            {
                return Json(new { error = true, message = "Error! Invalid Request detected." }, JsonRequestBehavior.AllowGet);
            }


            using (TravelManagementDBcontext dBcontext = new TravelManagementDBcontext())
            {

                BudgetTRFGateway budgetTRFGateway = new BudgetTRFGateway();

                int rowAffected = budgetTRFGateway.DeleteBudgetApproval(Convert.ToInt16(Id), dBcontext);
                if (rowAffected > 0)
                {
                    return Json(new { error = false, message = "Deleted Successfully." }, JsonRequestBehavior.AllowGet);
                }
                else if (rowAffected == -3)
                {
                    return Json(new { error = true, message = "ERROR! Invalid Request Detected. Deletation Unsuccessful." }, JsonRequestBehavior.AllowGet);
                }

                return Json(new { error = true, message = "Oops!! Deletation Failed. Please try again later." }, JsonRequestBehavior.AllowGet);

            }

        }
    }
}