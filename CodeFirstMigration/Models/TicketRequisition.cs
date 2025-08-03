using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using TravelManagement.Utilities;

namespace TravelManagement.Models
{
    public class TicketRequisition : BaseEntity
    {

        public int TicketRequisitionNo { get; set; }

        [Index("VisaRequisitionNoTextIndex", IsUnique = false)]
        [Column(TypeName = "nvarchar")]
        public string TicketRequisitionNoText { get; set; }

        [Required]
        public int UserNo { get; set; }

        public ActiveStatus TicketReqActiveStatus { get; set; } = ActiveStatus.IsActive;


        //User

        [Column(TypeName = "nvarchar")]
        public string PurposeOfTravelUser { get; set; }

        [Column(TypeName = "nvarchar")]
        public string PurposeOfTravelOtherUser { get; set; }

        public string DestinationUser { get; set; }

        public DateTime? DepartureDateUser { get; set; }

        [NotMapped]
        public String DepartureDateUserStr { get; set; }

        public DateTime? ReturnDateUser { get; set; }

        [NotMapped]
        public String ReturnDateUserStr { get; set; }

        public string AirlinesUser { get; set; }

        public string FlayerNoUser { get; set; }

        public string FlightUser { get; set; }

        public string SeatUser { get; set; }

        public string MealUser { get; set; }

        public string SpecialReqUser { get; set; }

        public string RemarksUser { get; set; }


        //Travel Desk

        public string AirlinesTD { get; set; }

        public DateTime? DepturtureDateTD { get; set; }

        [NotMapped]
        public String DepturtureDateTDStr { get; set; }

        public TimeSpan? DepturtureTimeTD { get; set; }

        public string TerminalNoTD { get; set; }

        public string FlightNoTD { get; set; }

        public string TicketNoTD { get; set; }

        public string TicketTypeTD { get; set; }

        public string TicketPriceTD { get; set; }

        public string CurrencyTypeTD { get; set; }

        public string SeatNoTD { get; set; }

        public string RemarksTD { get; set; }

        public ApprovalStatus TicketApprovalStatus { get; set; } = ApprovalStatus.IsApproved;

        public int? ApprovedBy { get; set; }

        public int? RejectedBy { get; set; }

        public string CommentsSupervisor { get; set; }


        //Table

        [ForeignKey("ApprovedBy")]
        public User ApprovedByUser { get; set; }

        [ForeignKey("RejectedBy")]
        public User RejectedByUser { get; set; }

        //[ForeignKey("VisaReqId")]
        //public VisaRequisition VisaRequisition { get; set; }

        [ForeignKey("UserNo")]
        public User User { get; set; }

        public List<TicketRequisitionFiles> TicketRequisitionFiles { get; set; }

    }
}