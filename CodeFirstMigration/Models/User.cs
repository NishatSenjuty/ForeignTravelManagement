using TravelManagement.Utilities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Net.Mail;
using System.Runtime.Remoting.Lifetime;
using System.Web;

namespace TravelManagement.Models
{
    public class User
    {
        [Key]
        public int UserNo { get; set; }

        [Required]
        [Column(TypeName = "nvarchar")]
        [MaxLength(10)]
        [Index(nameof(EmployeeId), IsUnique = true)]
        public string EmployeeId { get; set; }

        [Required]
        [Column(TypeName = "nvarchar")]
        [MaxLength(255)]
        public string FullName { get; set; }

        [Required]
        [Column(TypeName = "nvarchar")]
        [MaxLength(255)]
        public string FirstName { get; set; }

        [Column(TypeName = "nvarchar")]
        [MaxLength(255)]
        public string MiddleName { get; set; }

        [Required]
        [Column(TypeName = "nvarchar")]
        [MaxLength(255)]
        public string LastName { get; set; }

        public DateTime? DOB { get; set; }

        [NotMapped]
        public String DOBStr { get; set; }

        [Required]
        [Column(TypeName = "nvarchar")]
        [MaxLength(8)]
        public string Gender { get; set; }

        [Required]
        [Column(TypeName = "nvarchar")]
        [MaxLength(255)]
        public string Nationality { get; set; }

        [Required]
        [Column(TypeName = "nvarchar")]
        [MaxLength(255)]
        public string PresentAddress { get; set; }

        [Required]
        [Column(TypeName = "nvarchar")]
        [MaxLength(255)]
        public string EmgContactNo { get; set; }

        [Required]
        [Column(TypeName = "nvarchar")]
        [MinLength(4)]
        [MaxLength(255)]
        [Index("UK_User_UserName", IsUnique = true)]
        public string UserName { get; set; }

        [Column(TypeName = "nvarchar")]
        [MaxLength(255)]
        public string Email { get; set; }

        [Column(TypeName = "nvarchar")]
        [MaxLength(20)]
        public string ContactNo { get; set; }

        [Index("FK_User_UserRoleId")]
        public int UserRoleId { get; set; }

        /// ////////////////////////////////
        [Index("FK_DepartmentId")]
        public int? DepartmentId { get; set; }

        [Index("FK_DesignationId")]
        public int? DesignationId { get; set; }

        [Index("FK_PrimaryCompanyId")]
        public int? PrimaryCompanyId { get; set; }

        [Index("FK_PrimaryLocationId")]
        public int? PrimaryLocationId { get; set; }
        /// //////////////////////////////

        [Required]
        [Column(TypeName = "nvarchar(MAX)")]
        public string PassPhrase { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime AddedDateTime { get; set; } = TimeZone.CurrentTimeZone.ToLocalTime(DateTime.Now);
        public UserStatus UserStatus { get; set; } = UserStatus.active;
        public UserEmailStatus UserEmailStatus { get; set; } = UserEmailStatus.NotVerified;
        public int? InsertedBy { get; set; }
        [NotMapped]
        public int[] MenuList { get; set; }

        [NotMapped]
        public int[] SuperVisorList { get; set; }

        //navigation property

        [ForeignKey("PrimaryCompanyId")]
        public Company Companys { get; set; }

        [ForeignKey("PrimaryLocationId")]
        public Location Locations { get; set; }

        [ForeignKey("DesignationId")]
        public Designation Designation { get; set; }

        [ForeignKey("DepartmentId")]
        public Department Department { get; set; }

        [ForeignKey("UserRoleId")]
        public UserRole UserRole { get; set; }
        [ForeignKey("InsertedBy")]
        public List<User> InsertedByUser { get; set; }
        public List<EnrollCompanyLocationFloor> EnrollCompanyLocationFloors { get; set; }
        public List<EnrollMenu> EnrollMenus { get; set; }

        public List<EnrollSuperVisor> UserNos { get; set; }
        public List<EnrollSuperVisor> SuperVisors { get; set; }

        public List<SignUpFileAttachment> SignUpFileAttachments { get; set; }
    }
}