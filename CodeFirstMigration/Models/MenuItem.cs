using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace TravelManagement.Models
{
    public class MenuItem
    {
        [Key]
        public int MenuItemId { get; set; }

        [Required]
        [Column(TypeName = "nvarchar")]
        [MaxLength(55)]
        public string MenuItemName { get; set; }

        [Required]
        [Column(TypeName = "nvarchar")]
        [MaxLength(25)]
        [Index("UK_MenuItemShortName", IsUnique = true)]

        public string MenuItemShortName { get; set; }

        public int? MenuCategoryId { get; set; }

        //navigation property
        [ForeignKey("MenuCategoryId")]
        public MenuCategory MenuCategory { get; set; }
        public List<EnrollMenu> EnrollMenus { get; set; }

    }
}