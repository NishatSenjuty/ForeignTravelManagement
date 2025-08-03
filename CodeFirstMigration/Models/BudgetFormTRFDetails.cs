using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace TravelManagement.Models
{
    public class BudgetFormTRFDetails : BaseEntity
    {
        [Required]
        public int TRFMasterId { get; set; }

        [ForeignKey("TRFMasterId")]
        public BudgetFormTRFMaster BudgetFormTRFMaster { get; set; }

        [Required]
        public string TRFNoText { get; set; }

        public string Expenses { get; set; }

        public decimal Days { get; set; }

        public decimal CostPerDay { get; set; }

        public decimal Total { get; set; }

        public decimal Disburse { get; set; }

        public string RemarksDisbursed { get; set; }

        [NotMapped]
        public List<BudgetFormAllRequisitionDetails> BudgetFormAllRequisitionDetails { get; set; }

    }
}