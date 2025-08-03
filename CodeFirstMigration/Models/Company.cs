using TravelManagement.Utilities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace TravelManagement.Models
{
    public class Company : BaseEntity
    {
        [Required]
        [Column(TypeName = "nvarchar")]
        [MaxLength(60)]
        [Index(nameof(CompanyName), IsUnique = true)]

        [Index("UK_CompanyName", IsUnique = true)]


        public string CompanyName { get; set; }

        [Required]
        [Column(TypeName = "nvarchar")]
        [MaxLength(100)]
        [Index(nameof(CompanyShortName), IsUnique = true)]

        [Index("UK_CompanyShortName", IsUnique = true)]

        public string CompanyShortName { get; set; }

        [Required]
        public ActiveStatus CompanyActiveStatus { get; set; } = ActiveStatus.IsActive;

        public List<Location> Locations { get; set; }
    }
}