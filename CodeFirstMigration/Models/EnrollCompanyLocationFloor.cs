using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace TravelManagement.Models
{
    public class EnrollCompanyLocationFloor
    {
        [Key]
        public int EnrollCompanyLocationFloorId { get; set; }
        [Index("UK_EnrollCompanyLocationFloor", 1, IsUnique = true)]
        public int UserNo { get; set; }
        [Index("UK_EnrollCompanyLocationFloor", 2, IsUnique = true)]
        public int CompanyId { get; set; }
        [Index("UK_EnrollCompanyLocationFloor", 3, IsUnique = true)]
        public int LocationId { get; set; }
        [Index("UK_EnrollCompanyLocationFloor", 4, IsUnique = true)]
        public int FloorId { get; set; }

        //navigation property
        [ForeignKey("UserNo")]
        public User User { get; set; }
        [ForeignKey("CompanyId")]
        public Company Company { get; set; }

        [ForeignKey("LocationId")]
        public Location Location { get; set; }

        [ForeignKey("FloorId")]
        public Floor Floor { get; set; }

    }
}