using TravelManagement.Utilities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace TravelManagement.Models
{
    public class Floor   : BaseEntity
    {
        [Required]
        [Column(TypeName = "nvarchar")]
        [MaxLength(50)]
        [Index("UK_FloorName_CompanyId_LocationId", 1, IsUnique = true)]
        public string FloorName { get; set; }

        [Required]
        [Index("UK_FloorName_CompanyId_LocationId", 2, IsUnique = true)]
        public int CompanyId { get; set; }

        [Required]
        [Index("UK_FloorName_CompanyId_LocationId", 3, IsUnique = true)]
        public int LocationId { get; set; }
        public ActiveStatus FloorActiveStatus { get; set; } = ActiveStatus.IsActive;

        //Navigation Property
        [ForeignKey("CompanyId")]
        public Company Company { get; set; }

        [ForeignKey("LocationId")]
        public Location Location { get; set; }

    }
}