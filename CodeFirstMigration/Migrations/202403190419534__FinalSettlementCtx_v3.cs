namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _FinalSettlementCtx_v3 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.FinalSettlements", "Comments", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.FinalSettlements", "Comments");
        }
    }
}
