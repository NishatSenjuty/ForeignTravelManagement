using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace TravelManagement.Models
{
    public class EnrollMenu
    {
        [Key]
        public int EnrollMenuId { get; set; }
        [Index("UK_EnrollMenu", 1, IsUnique = true)]

        public int UserNo { get; set; }
        [Index("UK_EnrollMenu", 2, IsUnique = true)]
        public int MenuItemId { get; set; }

        //navigation property
        [ForeignKey("UserNo")]
        public User User { get; set; }

        [ForeignKey("MenuItemId")]
        public MenuItem MenuItem { get; set; }

    }
}