using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace TravelManagement.Models
{
    public class UserRole
    {
        [Key]
        public int UserRoleId { get; set; }

        [Required]
        [Column(TypeName = "nvarchar")]
        [MaxLength(100)]
        public string UserRoleTitle { get; set; } 
        public int? ParentUserRoleId { get; set; } 

        //Navigation Property
        public List<User> Users { get; set;}

        [ForeignKey("ParentUserRoleId")]
        public List<UserRole> ParentUserRoles { get; set; }


    }
}