namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _TRFRequisitionDetCtx_v2 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.BudgetFormAllRequisitionDetails", "TRFDetId", "dbo.BudgetFormTRFDetails");
            DropColumn("dbo.BudgetFormAllRequisitionDetails", "TRFDetId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.BudgetFormAllRequisitionDetails", "TRFDetId", c => c.Int(nullable: false));
            AddForeignKey("dbo.BudgetFormAllRequisitionDetails", "TRFDetId", "dbo.BudgetFormTRFDetails", "Id");
        }
    }
}
