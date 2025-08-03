using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using TravelManagement.Utilities;

namespace TravelManagement.Models
{
    public class Currency : BaseEntity
    {
        [Required]
        [Column(TypeName = "nvarchar")]
        [MaxLength(50)]
        [Index("CurrencyName", 1, IsUnique = true)]
        public string CurrencyName { get; set; }

        public ActiveStatus CurrencyActiveStatus { get; set; } = ActiveStatus.IsActive;
    }
}