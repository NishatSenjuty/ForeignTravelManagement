using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TravelManagement.Models
{
    public class FinalSettlementsDetails : BaseEntity
    {
        [Required]
        public int FinalSettlementid { get; set; }

        [ForeignKey("FinalSettlementid")]
        public FinalSettlement FinalSettlement { get; set; }

        [Required]
        public string TRFNo { get; set; }

        public string Expenses { get; set; }

        public decimal Days { get; set; }

        public decimal CostPerDay { get; set; }

        public decimal Total { get; set; }
    }
}