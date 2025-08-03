using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TravelManagement.Models
{
    public class LoginAttempt
    {
        [Key]
        [Required]
        [Index(nameof(LoginAttemptFromSessionId), IsUnique = true)]
        public int LoginAttemptFromSessionId { get; set; }

        public int UserNo { get; set; }

        [Required]
        [Column(TypeName = "nvarchar")]
        [MaxLength(10)]
        public string AttemptType { get; set; } = "Login";
        public DateTime LoginDateTime { get; set; } = DateTime.Now;

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

        //[Key]
        [Required]
        [Column(TypeName = "nvarchar")]
        [MaxLength(20)]
        public string LoginAttemptNo { get; set; }
    }
}