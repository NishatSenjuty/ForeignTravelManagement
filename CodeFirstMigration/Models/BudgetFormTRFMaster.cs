using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using TravelManagement.Utilities;

namespace TravelManagement.Models
{
    public class BudgetFormTRFMaster : BaseEntity
    {

        [Required]
        public int UserNo { get; set; }

        public int TRFNo { get; set; }

        [Index("TRFNoIndex", IsUnique = false)]
        [Column(TypeName = "nvarchar")]
        public string TRFNoText { get; set; }

        [Required]
        public decimal TotalCostRequired { get; set; }

        [Required]
        public decimal TotalAdvanceRequired { get; set; }

        public decimal TotalDisbursedAmount { get; set; }


        public string Remarks { get; set; }

        public string CurrencyType { get; set; }

        //[Required]
        //public int CurrencyId { get; set; }

        public ActiveStatus TRFActiveStatus { get; set; } = ActiveStatus.IsActive;

        public int? ApprovedBySupervisor { get; set; }

        public int? RejectedBySupervisor { get; set; }

        public ApprovalStatus TicketApprovalStatusSupervisor { get; set; } = ApprovalStatus.IsPending;

        public int? ApprovedByManagement { get; set; }

        public int? RejectedByManagement { get; set; }

        public ApprovalStatus TicketApprovalStatusManagement { get; set; } = ApprovalStatus.IsPending;

        public string CommentsSupervisor { get; set; }

        public string CommentsManagement { get; set; }



        // Table

        [ForeignKey("ApprovedBySupervisor")]
        public User ApprovedBySup { get; set; }

        [ForeignKey("RejectedBySupervisor")]
        public User RejectedBySup { get; set; }

        [ForeignKey("ApprovedByManagement")]
        public User ApprovedByTopM { get; set; }

        [ForeignKey("RejectedByManagement")]
        public User RejectedByTopM { get; set; }

        [ForeignKey("UserNo")]
        public User User { get; set; }  

        //[ForeignKey("CurrencyId")]
        //public Currency Currency { get; set; }

        [NotMapped]
        public List<BudgetFormTRFDetails> BudgetFormTRFDetails { get; set; }

        [NotMapped]
        public List<BudgetFormAllRequisitionDetails> BudgetFormAllRequisitionDetails { get; set; }

    }
}