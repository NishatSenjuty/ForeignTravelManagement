using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using TravelManagement.Models;

namespace TravelManagement.Models
{
    public class EmailListSup : BaseEntity
    {
        [Required]
        [Column(TypeName = "nvarchar")]

        public string EmailList { get; set; }
    }
}