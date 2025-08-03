using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using TravelManagement.Utilities;

namespace TravelManagement.Models
{
    public class VisaRequisitionAttachments
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "int")]
        public int VisaRequisionId { get; set; }

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
        public int FileType { get; set; }

        public ActiveStatus FileActiveStatus { get; set; } = ActiveStatus.IsActive;

        [ForeignKey("VisaRequisionId")]
        public VisaRequisition VisaRequisition { get; set; }

        [ForeignKey("UserNo")]
        public User User { get; set; }
    }
}