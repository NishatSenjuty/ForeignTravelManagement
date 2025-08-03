namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _FinalSettlementDetailsCtx_v1 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.FinalSettlementsDetails",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FinalSettlementid = c.Int(nullable: false),
                        TRFNo = c.String(nullable: false),
                        Expenses = c.String(),
                        Days = c.Decimal(nullable: false, precision: 18, scale: 2),
                        CostPerDay = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Total = c.Decimal(nullable: false, precision: 18, scale: 2),
                        InsertedBy = c.Int(),
                        InsertedDateTime = c.DateTime(nullable: false),
                        UpdatedBy = c.Int(),
                        UpdatedDateTime = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.FinalSettlements", t => t.FinalSettlementid)
                .ForeignKey("dbo.Users", t => t.InsertedBy)
                .ForeignKey("dbo.Users", t => t.UpdatedBy);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.FinalSettlementsDetails", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.FinalSettlementsDetails", "InsertedBy", "dbo.Users");
            DropForeignKey("dbo.FinalSettlementsDetails", "FinalSettlementid", "dbo.FinalSettlements");
            DropTable("dbo.FinalSettlementsDetails");
        }
    }
}
