namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _FinalSettlementCtx_v1 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.FinalSettlementFiles",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FinalSettlementId = c.Int(nullable: false),
                        UserNo = c.Int(nullable: false),
                        FileName = c.String(nullable: false, maxLength: 4000),
                        location = c.String(nullable: false, maxLength: 4000),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.FinalSettlements", t => t.FinalSettlementId)
                .ForeignKey("dbo.Users", t => t.UserNo);
            
            CreateTable(
                "dbo.FinalSettlements",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        VisaReqId = c.Int(nullable: false),
                        VisaRequisitionNo = c.String(nullable: false),
                        TicketReqId = c.Int(nullable: false),
                        TicketRequisitionNo = c.String(nullable: false),
                        HotelResId = c.Int(nullable: false),
                        HotelReservationNo = c.String(nullable: false),
                        TRFMasterId = c.Int(nullable: false),
                        TRFNo = c.String(nullable: false),
                        UserNo = c.Int(nullable: false),
                        Cost = c.String(nullable: false),
                        RemainingBalance = c.String(nullable: false),
                        Remarks = c.String(),
                        InsertedBy = c.Int(),
                        InsertedDateTime = c.DateTime(nullable: false),
                        UpdatedBy = c.Int(),
                        UpdatedDateTime = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.BudgetFormTRFMasters", t => t.TRFMasterId)
                .ForeignKey("dbo.HotelReservations", t => t.HotelResId)
                .ForeignKey("dbo.Users", t => t.InsertedBy)
                .ForeignKey("dbo.TicketRequisitions", t => t.TicketReqId)
                .ForeignKey("dbo.Users", t => t.UpdatedBy)
                .ForeignKey("dbo.Users", t => t.UserNo)
                .ForeignKey("dbo.VisaRequisitions", t => t.VisaReqId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.FinalSettlementFiles", "UserNo", "dbo.Users");
            DropForeignKey("dbo.FinalSettlements", "VisaReqId", "dbo.VisaRequisitions");
            DropForeignKey("dbo.FinalSettlements", "UserNo", "dbo.Users");
            DropForeignKey("dbo.FinalSettlements", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.FinalSettlements", "TicketReqId", "dbo.TicketRequisitions");
            DropForeignKey("dbo.FinalSettlements", "InsertedBy", "dbo.Users");
            DropForeignKey("dbo.FinalSettlements", "HotelResId", "dbo.HotelReservations");
            DropForeignKey("dbo.FinalSettlementFiles", "FinalSettlementId", "dbo.FinalSettlements");
            DropForeignKey("dbo.FinalSettlements", "TRFMasterId", "dbo.BudgetFormTRFMasters");
            DropTable("dbo.FinalSettlements");
            DropTable("dbo.FinalSettlementFiles");
        }
    }
}
