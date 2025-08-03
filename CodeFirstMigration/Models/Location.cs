using TravelManagement.Utilities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TravelManagement.Models
{
    public class Location : BaseEntity
    {

        [Required]
        [Column(TypeName = "int")]
        public int CompanyId { get; set; }

        [Required]
        [Column(TypeName = "nvarchar")]
        [MaxLength(50)]
        [Index("UK_LocationName_CompanyId", 1, IsUnique = true)]

        [Index(nameof(LocationName), IsUnique = true)]
        public string LocationName { get; set; }

        [Required]
        public ActiveStatus LocationActiveStatus { get; set; } = ActiveStatus.IsActive;

        [Index("UK_LocationName_CompanyId", 2, IsUnique = true)]

        [ForeignKey("CompanyId")]
        public Company Company { get; set; }

        public List<Floor> Floors { get; set; }

    }
}