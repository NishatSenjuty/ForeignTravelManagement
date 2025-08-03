namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _TRFDecimalChangeCtx_v1 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.BudgetFormTRFDetails", "CostPerDay", c => c.String());
            AlterColumn("dbo.BudgetFormTRFDetails", "Total", c => c.String());
            AlterColumn("dbo.BudgetFormTRFDetails", "Disburse", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.BudgetFormTRFDetails", "Disburse", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AlterColumn("dbo.BudgetFormTRFDetails", "Total", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AlterColumn("dbo.BudgetFormTRFDetails", "CostPerDay", c => c.Decimal(nullable: false, precision: 18, scale: 2));
        }
    }
}
