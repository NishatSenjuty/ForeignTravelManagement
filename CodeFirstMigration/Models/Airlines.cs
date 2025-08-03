using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using TravelManagement.Utilities;

namespace TravelManagement.Models
{
    public class Airlines : BaseEntity
    {
        [Required]
        [Column(TypeName = "nvarchar")]
        [MaxLength(50)]
        [Index("AirlinesName", 1, IsUnique = true)]
        public string AirlinesName { get; set; }

        public ActiveStatus AirlinesActiveStatus { get; set; } = ActiveStatus.IsActive;
    }
}