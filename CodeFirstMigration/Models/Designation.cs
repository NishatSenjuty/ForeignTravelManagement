using TravelManagement.Utilities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TravelManagement.Models
{
    public class Designation  : BaseEntity
    {
        [Required]
        [Column(TypeName = "nvarchar")]
        [MaxLength(50)]
        [Index("DesignationName", 1, IsUnique = true)]
        public string DesignationName { get; set; } 

        public ActiveStatus DesignationActiveStatus { get; set; } = ActiveStatus.IsActive;

    }
}