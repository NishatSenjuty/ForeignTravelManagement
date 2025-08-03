using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using TravelManagement.Utilities;

namespace TravelManagement.Models
{
    public class HotelReservation : BaseEntity
    {

        public int HotelReservationNo { get; set; }

        [Index("HotelReservationNoIndex", IsUnique = false)]
        [Column(TypeName = "nvarchar")]
        public string HotelReservationNoText { get; set; }

        [Required]
        public int UserNo { get; set; }

        public ActiveStatus HotelResActiveStatus { get; set; } = ActiveStatus.IsActive;


        //Employee

        public string CountryNameUser { get; set; }

        public string CityUser { get; set; }

        public DateTime? CheckInDateUser { get; set; }

        [NotMapped]
        public String CheckInDateUserStr { get; set; }

        public DateTime? CheckOutDateUser { get; set; }

        [NotMapped]
        public String CheckOutDateUserStr { get; set; }

        public string RoomTypeUser { get; set; }

        public string PreferedHotelUser { get; set; }

        public string PreferedLocationUser { get; set; }

        public string BudgetUser { get; set; }

        public string EventAddressUser { get; set; }

        public DateTime? EventDateUser { get; set; }

        [NotMapped]
        public String EventDateUserStr { get; set; }

        public TimeSpan? EventTimeUser { get; set; }

        public string SpecialReqUser { get; set; }

        public string LoyaltyProgNo { get; set; }


        //TD

        public string CountryNameTD { get; set; }

        public string CityTD { get; set; }

        public DateTime? CheckInDateTD { get; set; }

        [NotMapped]
        public String CheckInDateTDStr { get; set; }

        public DateTime? CheckOutDateTD { get; set; }

        [NotMapped]
        public String CheckOutDateTDStr { get; set; }

        public string RoomTypeTD { get; set; }

        public string HotelNameTD { get; set; }

        public string HotelAddressTD { get; set; }

        public ApprovalStatus HotelApprovalStatus { get; set; } = ApprovalStatus.IsApproved;

        public int? ApprovedBy { get; set; }

        public int? RejectedBy { get; set; }


        public string CommentsSupervisor { get; set; }

        //Table

        //[ForeignKey("VisaReqId")]
        //public VisaRequisition VisaRequisition { get; set; }

        //[ForeignKey("TicketReqId")]
        //public TicketRequisition ticketRequisition { get; set; }

        [ForeignKey("ApprovedBy")]
        public User ApprovedByUser { get; set; }

        [ForeignKey("RejectedBy")]
        public User RejectedByUser { get; set; }

        [ForeignKey("UserNo")]
        public User User { get; set; }

        public List<HotelReservationFiles> HotelReservationFiles { get; set; }


    }
}