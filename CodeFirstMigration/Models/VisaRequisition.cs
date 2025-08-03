using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using TravelManagement.Utilities;

namespace TravelManagement.Models
{
    public class VisaRequisition : BaseEntity
    {

        public int VisaRequisitionNo { get; set; }

        [Index("VisaRequisitionNoTextIndex", IsUnique = false)]
        [Column(TypeName = "nvarchar")]
        public string VisaRequisitionNoText { get; set; }

        [Required]
        public int UserNo { get; set; }


        //Travel Desk

        public string VisaNoTD { get; set; }

        public string CountryNameTD { get; set; }

        public DateTime? VisaIssueDateTD { get; set; }

        [NotMapped]
        public String VisaIssueDateTDStr { get; set; }

        public DateTime? VisaExpiryDateTD { get; set; }

        [NotMapped]
        public String VisaExpiryDateTDStr { get; set; }

        [Column(TypeName = "nvarchar")]
        public string RemarksTD { get; set; }

        //User

        [Column(TypeName = "nvarchar")]
        public string TypeOfVisaUser { get; set; }

        [Column(TypeName = "nvarchar")]
        public string TypeOfVisaOtherUser { get; set; }

        [Column(TypeName = "nvarchar")]
        public string PreviouslyDestinedUser { get; set; }

        [Column(TypeName = "nvarchar")]
        public string VisaTypePreviousUser { get; set; }

        public DateTime? IssueDatePrevUser { get; set; }

        [NotMapped]
        public String IssueDatePrevUserStr { get; set; }

        public DateTime? ExpiryDatePrevUser { get; set; }

        [NotMapped]
        public String ExpiryDatePrevUserStr { get; set; }

        [Column(TypeName = "nvarchar")]
        public string CountryNameUser { get; set; }

        [Column(TypeName = "nvarchar")]
        public string PurposeOfTravelUser { get; set; }

        [Column(TypeName = "nvarchar")]
        public string PurposeOfTravelOtherUser { get; set; }

        public DateTime? EntryDateUser { get; set; }

        [NotMapped]
        public String EntryDateUserStr { get; set; }

        public DateTime? DepartureUser { get; set; }

        [NotMapped]
        public String DepartureUserStr { get; set; }

        public DateTime? ReturnUser { get; set; }

        [NotMapped]
        public String ReturnUserStr { get; set; }

        [Column(TypeName = "nvarchar")]
        public string AccomodationDetUser { get; set; }

        [Column(TypeName = "nvarchar")]
        public string SpecialReqUser { get; set; }

        [Column(TypeName = "nvarchar")]
        public string RemarksUser { get; set; }

        [Required]
        public ActiveStatus VisaReqActiveStatus { get; set; } = ActiveStatus.IsActive;

        public ApprovalStatus VisaApprovalStatus { get; set; } = ApprovalStatus.IsPending;

        public int? ApprovedBy { get; set; }

        public int? RejectedBy { get; set; }


        [MaxLength(50)]
        public string CommentsSupervisor { get; set; }

        //Table
        [ForeignKey("UserNo")]
        public User User { get; set; }

        [ForeignKey("ApprovedBy")]
        public User ApprovedByUser { get; set; }

        [ForeignKey("RejectedBy")]
        public User RejectedByUser { get; set; }

        public List<VisaRequisitionAttachments> VisaRequisitionAttachments { get; set; } 
        public List<VisaRequisitionTDfiles> visaRequisitionTDfiles { get; set; }

    }
}