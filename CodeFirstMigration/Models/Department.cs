using TravelManagement.Utilities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace TravelManagement.Models
{
    public class Department : BaseEntity
    {
        [Required]
        [Column(TypeName = "nvarchar")]
        [MaxLength(60)]
        [Index(nameof(Name), IsUnique = true)]
        public string Name { get; set; }


        [Required]
        public ActiveStatus ActiveStatus { get; set; } = ActiveStatus.IsActive;

    }
}