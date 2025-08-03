using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TravelManagement.Models
{
    public class EnrollSuperVisor
    {
        [Key]
        public int EnrollSupervisorId { get; set; }
        [Index("UK_EnrollSuperVisor", 1, IsUnique = true)]

        public int UserId { get; set; }
        [Index("UK_EnrollSuperVisor", 2, IsUnique = true)]
        public int SupervisorId { get; set; }

        //navigation property
        [ForeignKey("UserId")]
        public User User { get; set; }

        [ForeignKey("SupervisorId")]
        public User Supervisor { get; set; }
    }
}