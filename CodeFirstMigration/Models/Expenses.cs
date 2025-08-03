using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using TravelManagement.Utilities;

namespace TravelManagement.Models
{
    public class Expenses : BaseEntity
    {
        [Required]
        [Column(TypeName = "nvarchar")]
        [MaxLength(50)]
        [Index("ExpensesCategory", 1, IsUnique = true)]
        public string ExpensesCategory { get; set; }

        public ActiveStatus ExpensesActiveStatus { get; set; } = ActiveStatus.IsActive;
    }
}