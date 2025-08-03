namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _TRFCtx_v2 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.BudgetFormTRFMasters", "TRFActiveStatus", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.BudgetFormTRFMasters", "TRFActiveStatus");
        }
    }
}
