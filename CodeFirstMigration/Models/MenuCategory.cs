using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Security.Permissions;
using System.Web;

namespace TravelManagement.Models
{
    public class MenuCategory
    {
        [Key]
        public int MenuCategoryId { get; set; }

        [Required]
        [Column(TypeName = "nvarchar")]
        [MaxLength(100)]
        public string MenuCategoryTitle { get; set; }
        public int MenuCategoryDisplayIndex { get; set; }

        //navigation property
        public List<MenuItem> MenuItems { get; set; }

    }
}