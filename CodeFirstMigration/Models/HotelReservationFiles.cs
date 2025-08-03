using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using TravelManagement.Utilities;

namespace TravelManagement.Models
{
    public class HotelReservationFiles
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "int")]
        public int HotelReservationId { get; set; }

        [Required]
        [Column(TypeName = "int")]
        public int UserNo { get; set; }

        [Required]
        [Column(TypeName = "nvarchar")]
        public string FileName { get; set; }

        [Required]
        [Column(TypeName = "nvarchar")]
        public string location { get; set; }

        public ActiveStatus HotelActiveStatus { get; set; } = ActiveStatus.IsActive;

        [ForeignKey("HotelReservationId")]
        public HotelReservation hotelReservation { get; set; }

        [ForeignKey("UserNo")]
        public User User { get; set; }
    }
}