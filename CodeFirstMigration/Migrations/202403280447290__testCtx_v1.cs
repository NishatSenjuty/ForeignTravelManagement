namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _testCtx_v1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.BudgetFormTRFDetails", "Disburse", c => c.String());
            AddColumn("dbo.BudgetFormTRFDetails", "RemarksDisbursed", c => c.String());
            AddColumn("dbo.BudgetFormTRFMasters", "TotalDisbursedAmount", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.BudgetFormTRFMasters", "TotalDisbursedAmount");
            DropColumn("dbo.BudgetFormTRFDetails", "RemarksDisbursed");
            DropColumn("dbo.BudgetFormTRFDetails", "Disburse");
        }
    }
}
