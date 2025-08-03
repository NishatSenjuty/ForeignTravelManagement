namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _FinalSettlementCtx_v2 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.FinalSettlements", "DisbursedAmount", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.FinalSettlements", "DisbursedAmount");
        }
    }
}
