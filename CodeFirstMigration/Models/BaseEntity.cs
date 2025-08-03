using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace TravelManagement.Models
{
    public class BaseEntity
    {
        [Key]

        public int Id { get; set; } 

        public int? InsertedBy { get; set; }

        public DateTime InsertedDateTime { get; set; } = DateTime.Now;

        public int? UpdatedBy { get; set; }

        public DateTime UpdatedDateTime { get; set; } = DateTime.Now;

        [ForeignKey("InsertedBy")]
        public User InsertedByUser { get; set; }

        [ForeignKey("UpdatedBy")]
        public User UpdatedByUser { get; set; }
    }
}