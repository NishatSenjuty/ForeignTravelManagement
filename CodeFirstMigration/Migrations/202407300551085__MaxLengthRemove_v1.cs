namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _MaxLengthRemove_v1 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.BudgetFormTRFMasters", "CurrencyType", c => c.String());
            AlterColumn("dbo.BudgetFormTRFMasters", "CommentsSupervisor", c => c.String());
            AlterColumn("dbo.BudgetFormTRFMasters", "CommentsManagement", c => c.String());
            AlterColumn("dbo.HotelReservations", "CountryNameUser", c => c.String());
            AlterColumn("dbo.HotelReservations", "CityUser", c => c.String());
            AlterColumn("dbo.HotelReservations", "RoomTypeUser", c => c.String());
            AlterColumn("dbo.HotelReservations", "PreferedHotelUser", c => c.String());
            AlterColumn("dbo.HotelReservations", "PreferedLocationUser", c => c.String());
            AlterColumn("dbo.HotelReservations", "BudgetUser", c => c.String());
            AlterColumn("dbo.HotelReservations", "CountryNameTD", c => c.String());
            AlterColumn("dbo.HotelReservations", "CityTD", c => c.String());
            AlterColumn("dbo.HotelReservations", "RoomTypeTD", c => c.String());
            AlterColumn("dbo.HotelReservations", "HotelNameTD", c => c.String());
            AlterColumn("dbo.HotelReservations", "HotelAddressTD", c => c.String());
            AlterColumn("dbo.HotelReservations", "CommentsSupervisor", c => c.String());
            AlterColumn("dbo.TicketRequisitions", "PurposeOfTravelUser", c => c.String(maxLength: 4000));
            AlterColumn("dbo.TicketRequisitions", "PurposeOfTravelOtherUser", c => c.String(maxLength: 4000));
            AlterColumn("dbo.TicketRequisitions", "DestinationUser", c => c.String());
            AlterColumn("dbo.TicketRequisitions", "AirlinesUser", c => c.String());
            AlterColumn("dbo.TicketRequisitions", "FlayerNoUser", c => c.String());
            AlterColumn("dbo.TicketRequisitions", "FlightUser", c => c.String());
            AlterColumn("dbo.TicketRequisitions", "SeatUser", c => c.String());
            AlterColumn("dbo.TicketRequisitions", "MealUser", c => c.String());
            AlterColumn("dbo.TicketRequisitions", "AirlinesTD", c => c.String());
            AlterColumn("dbo.TicketRequisitions", "TerminalNoTD", c => c.String());
            AlterColumn("dbo.TicketRequisitions", "FlightNoTD", c => c.String());
            AlterColumn("dbo.TicketRequisitions", "TicketNoTD", c => c.String());
            AlterColumn("dbo.TicketRequisitions", "TicketTypeTD", c => c.String());
            AlterColumn("dbo.TicketRequisitions", "TicketPriceTD", c => c.String());
            AlterColumn("dbo.TicketRequisitions", "CurrencyTypeTD", c => c.String());
            AlterColumn("dbo.TicketRequisitions", "SeatNoTD", c => c.String());
            AlterColumn("dbo.TicketRequisitions", "RemarksTD", c => c.String());
            AlterColumn("dbo.TicketRequisitions", "CommentsSupervisor", c => c.String());
            AlterColumn("dbo.VisaRequisitions", "VisaNoTD", c => c.String());
            AlterColumn("dbo.VisaRequisitions", "CountryNameTD", c => c.String());
            AlterColumn("dbo.VisaRequisitions", "TypeOfVisaUser", c => c.String(maxLength: 4000));
            AlterColumn("dbo.VisaRequisitions", "TypeOfVisaOtherUser", c => c.String(maxLength: 4000));
            AlterColumn("dbo.VisaRequisitions", "PreviouslyDestinedUser", c => c.String(maxLength: 4000));
            AlterColumn("dbo.VisaRequisitions", "VisaTypePreviousUser", c => c.String(maxLength: 4000));
            AlterColumn("dbo.VisaRequisitions", "CountryNameUser", c => c.String(maxLength: 4000));
            AlterColumn("dbo.VisaRequisitions", "PurposeOfTravelUser", c => c.String(maxLength: 4000));
            AlterColumn("dbo.VisaRequisitions", "PurposeOfTravelOtherUser", c => c.String(maxLength: 4000));
            AlterColumn("dbo.VisaRequisitions", "RemarksUser", c => c.String(maxLength: 4000));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.VisaRequisitions", "RemarksUser", c => c.String(maxLength: 20));
            AlterColumn("dbo.VisaRequisitions", "PurposeOfTravelOtherUser", c => c.String(maxLength: 20));
            AlterColumn("dbo.VisaRequisitions", "PurposeOfTravelUser", c => c.String(maxLength: 10));
            AlterColumn("dbo.VisaRequisitions", "CountryNameUser", c => c.String(maxLength: 20));
            AlterColumn("dbo.VisaRequisitions", "VisaTypePreviousUser", c => c.String(maxLength: 20));
            AlterColumn("dbo.VisaRequisitions", "PreviouslyDestinedUser", c => c.String(maxLength: 5));
            AlterColumn("dbo.VisaRequisitions", "TypeOfVisaOtherUser", c => c.String(maxLength: 20));
            AlterColumn("dbo.VisaRequisitions", "TypeOfVisaUser", c => c.String(maxLength: 10));
            AlterColumn("dbo.VisaRequisitions", "CountryNameTD", c => c.String(maxLength: 20));
            AlterColumn("dbo.VisaRequisitions", "VisaNoTD", c => c.String(maxLength: 20));
            AlterColumn("dbo.TicketRequisitions", "CommentsSupervisor", c => c.String(maxLength: 50));
            AlterColumn("dbo.TicketRequisitions", "RemarksTD", c => c.String(maxLength: 100));
            AlterColumn("dbo.TicketRequisitions", "SeatNoTD", c => c.String(maxLength: 20));
            AlterColumn("dbo.TicketRequisitions", "CurrencyTypeTD", c => c.String(maxLength: 10));
            AlterColumn("dbo.TicketRequisitions", "TicketPriceTD", c => c.String(maxLength: 50));
            AlterColumn("dbo.TicketRequisitions", "TicketTypeTD", c => c.String(maxLength: 10));
            AlterColumn("dbo.TicketRequisitions", "TicketNoTD", c => c.String(maxLength: 20));
            AlterColumn("dbo.TicketRequisitions", "FlightNoTD", c => c.String(maxLength: 20));
            AlterColumn("dbo.TicketRequisitions", "TerminalNoTD", c => c.String(maxLength: 20));
            AlterColumn("dbo.TicketRequisitions", "AirlinesTD", c => c.String(maxLength: 10));
            AlterColumn("dbo.TicketRequisitions", "MealUser", c => c.String(maxLength: 100));
            AlterColumn("dbo.TicketRequisitions", "SeatUser", c => c.String(maxLength: 10));
            AlterColumn("dbo.TicketRequisitions", "FlightUser", c => c.String(maxLength: 20));
            AlterColumn("dbo.TicketRequisitions", "FlayerNoUser", c => c.String(maxLength: 20));
            AlterColumn("dbo.TicketRequisitions", "AirlinesUser", c => c.String(maxLength: 4));
            AlterColumn("dbo.TicketRequisitions", "DestinationUser", c => c.String(maxLength: 20));
            AlterColumn("dbo.TicketRequisitions", "PurposeOfTravelOtherUser", c => c.String(maxLength: 20));
            AlterColumn("dbo.TicketRequisitions", "PurposeOfTravelUser", c => c.String(maxLength: 10));
            AlterColumn("dbo.HotelReservations", "CommentsSupervisor", c => c.String(maxLength: 50));
            AlterColumn("dbo.HotelReservations", "HotelAddressTD", c => c.String(maxLength: 20));
            AlterColumn("dbo.HotelReservations", "HotelNameTD", c => c.String(maxLength: 20));
            AlterColumn("dbo.HotelReservations", "RoomTypeTD", c => c.String(maxLength: 20));
            AlterColumn("dbo.HotelReservations", "CityTD", c => c.String(maxLength: 20));
            AlterColumn("dbo.HotelReservations", "CountryNameTD", c => c.String(maxLength: 20));
            AlterColumn("dbo.HotelReservations", "BudgetUser", c => c.String(maxLength: 20));
            AlterColumn("dbo.HotelReservations", "PreferedLocationUser", c => c.String(maxLength: 20));
            AlterColumn("dbo.HotelReservations", "PreferedHotelUser", c => c.String(maxLength: 20));
            AlterColumn("dbo.HotelReservations", "RoomTypeUser", c => c.String(maxLength: 20));
            AlterColumn("dbo.HotelReservations", "CityUser", c => c.String(maxLength: 20));
            AlterColumn("dbo.HotelReservations", "CountryNameUser", c => c.String(maxLength: 20));
            AlterColumn("dbo.BudgetFormTRFMasters", "CommentsManagement", c => c.String(maxLength: 50));
            AlterColumn("dbo.BudgetFormTRFMasters", "CommentsSupervisor", c => c.String(maxLength: 50));
            AlterColumn("dbo.BudgetFormTRFMasters", "CurrencyType", c => c.String(maxLength: 10));
        }
    }
}
