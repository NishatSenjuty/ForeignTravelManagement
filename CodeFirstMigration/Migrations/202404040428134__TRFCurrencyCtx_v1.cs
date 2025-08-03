namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _TRFCurrencyCtx_v1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.BudgetFormTRFMasters", "CurrencyType", c => c.String(maxLength: 10));
        }
        
        public override void Down()
        {
            DropColumn("dbo.BudgetFormTRFMasters", "CurrencyType");
        }
    }
}
