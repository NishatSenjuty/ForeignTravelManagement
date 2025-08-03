using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace TravelManagement.Models
{
    public class SessionHistory
    {
        [Key]
        public int SessionHistoryId { get; set; }
        public int UserNo { get; set; }

        [Required]
        [Column(TypeName = "nvarchar")]
        [MaxLength(10)]
        public string SessionType { get; set; } = "Login";
        public DateTime CreatedDateTime { get; set; } = DateTime.Now;
        [Column(TypeName = "nvarchar")]
        [MaxLength(55)]
        public string Browser { get; set; }
        [Column(TypeName = "nvarchar")]
        [MaxLength(55)]
        public string OperatingSystem { get; set; }
        [Column(TypeName = "nvarchar")]
        [MaxLength(25)]
        public string IPaddress { get; set; }

        //navigation property
        [ForeignKey("UserNo")]
        public User User { get; set; }

    }
}