namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _FinalSettlementCtx_ReqDet : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.FinalSettlements", "HotelResId", "dbo.HotelReservations");
            DropForeignKey("dbo.FinalSettlements", "TicketReqId", "dbo.TicketRequisitions");
            DropForeignKey("dbo.FinalSettlements", "VisaReqId", "dbo.VisaRequisitions");
            DropColumn("dbo.FinalSettlements", "VisaReqId");
            DropColumn("dbo.FinalSettlements", "VisaRequisitionNo");
            DropColumn("dbo.FinalSettlements", "TicketReqId");
            DropColumn("dbo.FinalSettlements", "TicketRequisitionNo");
            DropColumn("dbo.FinalSettlements", "HotelResId");
            DropColumn("dbo.FinalSettlements", "HotelReservationNo");
        }
        
        public override void Down()
        {
            AddColumn("dbo.FinalSettlements", "HotelReservationNo", c => c.String(nullable: false));
            AddColumn("dbo.FinalSettlements", "HotelResId", c => c.Int(nullable: false));
            AddColumn("dbo.FinalSettlements", "TicketRequisitionNo", c => c.String(nullable: false));
            AddColumn("dbo.FinalSettlements", "TicketReqId", c => c.Int(nullable: false));
            AddColumn("dbo.FinalSettlements", "VisaRequisitionNo", c => c.String(nullable: false));
            AddColumn("dbo.FinalSettlements", "VisaReqId", c => c.Int(nullable: false));
            AddForeignKey("dbo.FinalSettlements", "VisaReqId", "dbo.VisaRequisitions", "Id");
            AddForeignKey("dbo.FinalSettlements", "TicketReqId", "dbo.TicketRequisitions", "Id");
            AddForeignKey("dbo.FinalSettlements", "HotelResId", "dbo.HotelReservations", "Id");
        }
    }
}
