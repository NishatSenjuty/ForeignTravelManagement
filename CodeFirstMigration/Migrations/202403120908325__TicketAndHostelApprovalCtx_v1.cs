namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _TicketAndHostelApprovalCtx_v1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.HotelReservations", "HotelApprovalStatus", c => c.Int(nullable: false));
            AddColumn("dbo.HotelReservations", "ApprovedBy", c => c.Int());
            AddColumn("dbo.HotelReservations", "RejectedBy", c => c.Int());
            AddColumn("dbo.TicketRequisitions", "TicketApprovalStatus", c => c.Int(nullable: false));
            AddColumn("dbo.TicketRequisitions", "ApprovedBy", c => c.Int());
            AddColumn("dbo.TicketRequisitions", "RejectedBy", c => c.Int());
            AddForeignKey("dbo.HotelReservations", "ApprovedBy", "dbo.Users", "UserNo");
            AddForeignKey("dbo.HotelReservations", "RejectedBy", "dbo.Users", "UserNo");
            AddForeignKey("dbo.TicketRequisitions", "ApprovedBy", "dbo.Users", "UserNo");
            AddForeignKey("dbo.TicketRequisitions", "RejectedBy", "dbo.Users", "UserNo");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.TicketRequisitions", "RejectedBy", "dbo.Users");
            DropForeignKey("dbo.TicketRequisitions", "ApprovedBy", "dbo.Users");
            DropForeignKey("dbo.HotelReservations", "RejectedBy", "dbo.Users");
            DropForeignKey("dbo.HotelReservations", "ApprovedBy", "dbo.Users");
            DropColumn("dbo.TicketRequisitions", "RejectedBy");
            DropColumn("dbo.TicketRequisitions", "ApprovedBy");
            DropColumn("dbo.TicketRequisitions", "TicketApprovalStatus");
            DropColumn("dbo.HotelReservations", "RejectedBy");
            DropColumn("dbo.HotelReservations", "ApprovedBy");
            DropColumn("dbo.HotelReservations", "HotelApprovalStatus");
        }
    }
}
