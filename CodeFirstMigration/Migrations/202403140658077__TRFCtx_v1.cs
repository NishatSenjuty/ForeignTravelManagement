namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _TRFCtx_v1 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.BudgetFormTRFDetails",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        TRFMasterId = c.Int(nullable: false),
                        TRFNoText = c.String(nullable: false),
                        Expenses = c.String(),
                        Days = c.String(),
                        CostPerDay = c.String(),
                        Total = c.String(),
                        InsertedBy = c.Int(),
                        InsertedDateTime = c.DateTime(nullable: false),
                        UpdatedBy = c.Int(),
                        UpdatedDateTime = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.BudgetFormTRFMasters", t => t.TRFMasterId)
                .ForeignKey("dbo.Users", t => t.InsertedBy)
                .ForeignKey("dbo.Users", t => t.UpdatedBy);
            
            CreateTable(
                "dbo.BudgetFormTRFMasters",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        VisaReqId = c.Int(nullable: false),
                        VisaRequisitionNo = c.String(nullable: false),
                        TicketReqId = c.Int(nullable: false),
                        TicketRequisitionNo = c.String(nullable: false),
                        HotelResId = c.Int(nullable: false),
                        HotelReservationNo = c.String(nullable: false),
                        UserNo = c.Int(nullable: false),
                        TRFNo = c.Int(nullable: false),
                        TRFNoText = c.String(maxLength: 4000),
                        TotalCostRequired = c.String(nullable: false),
                        TotalAdvanceRequired = c.String(nullable: false),
                        Remarks = c.String(),
                        InsertedBy = c.Int(),
                        InsertedDateTime = c.DateTime(nullable: false),
                        UpdatedBy = c.Int(),
                        UpdatedDateTime = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.HotelReservations", t => t.HotelResId)
                .ForeignKey("dbo.Users", t => t.InsertedBy)
                .ForeignKey("dbo.TicketRequisitions", t => t.TicketReqId)
                .ForeignKey("dbo.Users", t => t.UpdatedBy)
                .ForeignKey("dbo.Users", t => t.UserNo)
                .ForeignKey("dbo.VisaRequisitions", t => t.VisaReqId)
                .Index(t => t.TRFNoText, name: "TRFNoIndex");
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.BudgetFormTRFDetails", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.BudgetFormTRFDetails", "InsertedBy", "dbo.Users");
            DropForeignKey("dbo.BudgetFormTRFDetails", "TRFMasterId", "dbo.BudgetFormTRFMasters");
            DropForeignKey("dbo.BudgetFormTRFMasters", "VisaReqId", "dbo.VisaRequisitions");
            DropForeignKey("dbo.BudgetFormTRFMasters", "UserNo", "dbo.Users");
            DropForeignKey("dbo.BudgetFormTRFMasters", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.BudgetFormTRFMasters", "TicketReqId", "dbo.TicketRequisitions");
            DropForeignKey("dbo.BudgetFormTRFMasters", "InsertedBy", "dbo.Users");
            DropForeignKey("dbo.BudgetFormTRFMasters", "HotelResId", "dbo.HotelReservations");
            DropIndex("dbo.BudgetFormTRFMasters", "TRFNoIndex");
            DropTable("dbo.BudgetFormTRFMasters");
            DropTable("dbo.BudgetFormTRFDetails");
        }
    }
}
