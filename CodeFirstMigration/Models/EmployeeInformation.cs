using TravelManagement.Utilities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TravelManagement.Models
{
    public class EmployeeInformation : BaseEntity
    {
        [Required]
        [Column(TypeName = "nvarchar")]
        [MaxLength(10)]
        [Index(nameof(EmployeeId), IsUnique = true)]
        public string EmployeeId { get; set; } 


        [Required]
        [Column(TypeName = "nvarchar")]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required]
        [Column(TypeName = "nvarchar")]
        [MaxLength(50)]
        public string Address { get; set; }

        [Required]
        [Column(TypeName = "nvarchar")]
        [MaxLength(8)]
        public string Gender { get; set; }

        [Required]
        [Column(TypeName = "nvarchar")]
        [MaxLength(4)]
        public string BloodGroup { get; set; }

        [Required]
        public decimal Salary { get; set; }

        [Required]
        [Column(TypeName = "nvarchar")]
        [MaxLength(20)]
        public string ContactNo { get; set; }

        [Required]
        public ActiveStatus ActiveStatus { get; set; } = ActiveStatus.IsActive;

        [Required]
        [Column(TypeName = "int")]
        [Index("CompanyIndex", IsUnique = false)]
        public int? CompanyId { get; set; }   //? means optional. can leave as null

        [ForeignKey("CompanyId")]
        public Company Company { get; set; }

        [Required]
        [Column(TypeName = "int")]
        [Index("SearchIndex", 2, IsUnique = false)]
        public int? DepartmentId { get; set; }

        [ForeignKey("DepartmentId")]
        public Department Department { get; set; }

        [Required]
        [Column(TypeName = "int")]
        [Index("SearchIndex", 3, IsUnique = false)]
        public int? DesignationId { get; set; }

        [ForeignKey("DesignationId")]
        public Designation Designation { get; set; }

        [Required]
        [Column(TypeName = "int")]
        [Index("SearchIndex", 1, IsUnique = false)]
        public int? LocationId { get; set; }

        [ForeignKey("LocationId")]
        public Location Location { get; set; }

        public DateTime? JD { get; set; }

        public DateTime? DOB { get; set; }

        [NotMapped]
        public String DOBStr { get; set; }

        [NotMapped]
        public String JDStr { get; set; }

    }
}