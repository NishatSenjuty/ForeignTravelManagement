using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using TravelManagement.Utilities;

namespace TravelManagement.Models
{
    public class FinalSettlement : BaseEntity
    {
        [Required]
        public int TRFMasterId { get; set; }

        [Required]
        public string TRFNo { get; set; }

        [Required]
        public decimal Cost { get; set; }

        [Required]
        public decimal RemainingBalance { get; set; }

        public decimal DisbursedAmount { get; set; }

        public string Comments { get; set; }


        public string Remarks { get; set; }

        public int? ApprovedByAudit { get; set; }

        public int? RejectedByAudit { get; set; }


        public ApprovalStatus FSApprovalStatusAudit { get; set; } = ApprovalStatus.IsPending;


        public int? ApprovedByManagement { get; set; }

        public int? RejectedByManagement { get; set; }

        public ApprovalStatus FSApprovalStatusManagement { get; set; } = ApprovalStatus.IsPending;

        public string ApprovedFSamount { get; set; }

        public string RemarksFSapproval { get; set; }

        public ApprovalStatus AccountsStatusTC { get; set; } = ApprovalStatus.IsPending;

        [Required]
        public int UserNo { get; set; }

        public int? TCbyAccounts { get; set; }

        public string CommentsManagement { get; set; }

        public ApprovalStatus ApprovalStatusSup { get; set; } = ApprovalStatus.IsPending;

        public int? ApprovedBySup { get; set; }

        public int? RejectedBySup { get; set; }

        public string CommentsSupervisor { get; set; }


        //Table

        [ForeignKey("ApprovedBySup")]
        public User ApprovedSup { get; set; }

        [ForeignKey("RejectedBySup")]
        public User RejectedSup { get; set; }

        [ForeignKey("ApprovedByAudit")]
        public User ApprovedAudit { get; set; }

        [ForeignKey("RejectedByAudit")]
        public User RejectedAudit { get; set; }


        [ForeignKey("ApprovedByManagement")]
        public User ApprovedByTopM { get; set; }

        [ForeignKey("RejectedByManagement")]
        public User RejectedByTopM { get; set; }


        [ForeignKey("UserNo")]
        public User User { get; set; }

        [ForeignKey("TCbyAccounts")]
        public User TCbyAccountsUser { get; set; }

        [ForeignKey("TRFMasterId")]
        public BudgetFormTRFMaster BudgetFormTRFMaster { get; set; }



        public List<FinalSettlementFiles> FinalSettlementFiles { get; set; }

        public List<FinalSettlementsDetails> FinalSettlementsDetails { get; set; }

    }
}