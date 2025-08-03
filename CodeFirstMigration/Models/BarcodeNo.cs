using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TravelManagement.Models
{
    public class BarcodeNo
    {
        [Key]
        public int BarcodeNoId { get; set; }

        [Required]
        [Column(TypeName = "nvarchar")]
        [MaxLength(20)]
        [Index("Uk_BarcodeNoText", 1, IsUnique = true)]
        public string BarcodeNoText { get; set; }

        //[Required]
        ////[Column(TypeName = "nvarchar")]
        ////[MaxLength(10)]
        //[Index("Uk_BarcodeNoText", 2, IsUnique = true)]
        //public int CompanyId { get; set; }

        public DateTime CreateDateTime { get; set; } = DateTime.Now;

        [Required]
        [Column(TypeName = "nvarchar")]
        [MaxLength(10)]
        public string BarcodeForStatus { get; set; }

        //Navigation Property
        //[ForeignKey("CompanyId")]
        //public Company Company { get; set; }
    }
}