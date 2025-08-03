namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _TicketHotel_v1 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.TicketRequisitions", "VisaReqId", "dbo.VisaRequisitions");
            DropForeignKey("dbo.HotelReservations", "TicketReqId", "dbo.TicketRequisitions");
            DropForeignKey("dbo.HotelReservations", "VisaReqId", "dbo.VisaRequisitions");
            DropColumn("dbo.HotelReservations", "VisaReqId");
            DropColumn("dbo.HotelReservations", "VisaRequisitionNo");
            DropColumn("dbo.HotelReservations", "TicketReqId");
            DropColumn("dbo.HotelReservations", "TicketRequisitionNo");
            DropColumn("dbo.TicketRequisitions", "VisaReqId");
            DropColumn("dbo.TicketRequisitions", "VisaRequisitionNo");
        }
        
        public override void Down()
        {
            AddColumn("dbo.TicketRequisitions", "VisaRequisitionNo", c => c.String(nullable: false));
            AddColumn("dbo.TicketRequisitions", "VisaReqId", c => c.Int(nullable: false));
            AddColumn("dbo.HotelReservations", "TicketRequisitionNo", c => c.String(nullable: false));
            AddColumn("dbo.HotelReservations", "TicketReqId", c => c.Int(nullable: false));
            AddColumn("dbo.HotelReservations", "VisaRequisitionNo", c => c.String(nullable: false));
            AddColumn("dbo.HotelReservations", "VisaReqId", c => c.Int(nullable: false));
            AddForeignKey("dbo.HotelReservations", "VisaReqId", "dbo.VisaRequisitions", "Id");
            AddForeignKey("dbo.HotelReservations", "TicketReqId", "dbo.TicketRequisitions", "Id");
            AddForeignKey("dbo.TicketRequisitions", "VisaReqId", "dbo.VisaRequisitions", "Id");
        }
    }
}
