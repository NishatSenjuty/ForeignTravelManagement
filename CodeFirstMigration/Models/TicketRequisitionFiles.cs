using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using TravelManagement.Utilities;

namespace TravelManagement.Models
{
    public class TicketRequisitionFiles
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "int")]
        public int TicketRequisionId { get; set; }

        [Required]
        [Column(TypeName = "int")]
        public int UserNo { get; set; }

        [Required]
        [Column(TypeName = "nvarchar")]
        public string FileName { get; set; }

        [Required]
        [Column(TypeName = "nvarchar")]
        public string location { get; set; }

        public ActiveStatus TicketActiveStatus { get; set; } = ActiveStatus.IsActive;

        [ForeignKey("TicketRequisionId")]
        public TicketRequisition ticketRequisition { get; set; }

        [ForeignKey("UserNo")]
        public User User { get; set; }
    }
}