using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using TravelManagement.Utilities;

namespace TravelManagement.Models
{
    public class Country : BaseEntity
    {
        [Required]
        [Column(TypeName = "nvarchar")]
        [MaxLength(50)]
        [Index(nameof(CountryName), IsUnique = true)]
        public string CountryName { get; set; }


        [Required]
        public ActiveStatus CountryActiveStatus { get; set; } = ActiveStatus.IsActive;
    }
}