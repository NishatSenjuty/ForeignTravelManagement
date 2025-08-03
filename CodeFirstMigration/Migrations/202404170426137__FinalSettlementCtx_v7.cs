namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _FinalSettlementCtx_v7 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.FinalSettlements", "CommentsManagement", c => c.String(maxLength: 50));
        }
        
        public override void Down()
        {
            DropColumn("dbo.FinalSettlements", "CommentsManagement");
        }
    }
}
