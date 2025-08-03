using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using TravelManagement.Utilities;

namespace TravelManagement.Models
{
    public class FinalSettlementFiles
    {

        [Key]
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "int")]
        public int FinalSettlementId { get; set; }

        [Required]
        [Column(TypeName = "int")]
        public int UserNo { get; set; }

        [Required]
        [Column(TypeName = "nvarchar")]
        public string FileName { get; set; }

        [Required]
        [Column(TypeName = "nvarchar")]
        public string location { get; set; }

        [Required]
        [Column(TypeName = "nvarchar")]
        public string FileType { get; set; }


        [ForeignKey("FinalSettlementId")]
        public FinalSettlement FinalSettlement { get; set; }

        [ForeignKey("UserNo")]
        public User User { get; set; }
    }
}