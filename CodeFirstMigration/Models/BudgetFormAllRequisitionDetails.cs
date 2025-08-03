using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TravelManagement.Models
{
    public class BudgetFormAllRequisitionDetails : BaseEntity
    {
        [Required]
        public int TRFMasterId { get; set; }

        [ForeignKey("TRFMasterId")]
        public BudgetFormTRFMaster BudgetFormTRFMaster { get; set; }


        [Required]
        public string TRFNoText { get; set; }


        [Required]
        public int VisaReqId { get; set; }

        [Required]
        public string VisaRequisitionNo { get; set; }

        [Required]
        public int TicketReqId { get; set; }

        [Required]
        public string TicketRequisitionNo { get; set; }
        [Required]
        public int HotelResId { get; set; }

        [Required]
        public string HotelReservationNo { get; set; }

        [Required]
        public int UserNo { get; set; }



        [ForeignKey("VisaReqId")]
        public VisaRequisition VisaRequisition { get; set; }

        [ForeignKey("TicketReqId")]
        public TicketRequisition ticketRequisition { get; set; }

        [ForeignKey("HotelResId")]
        public HotelReservation HotelReservation { get; set; }

        [ForeignKey("UserNo")]
        public User User { get; set; }
    }
}