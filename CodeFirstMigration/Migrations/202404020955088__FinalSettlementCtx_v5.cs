namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _FinalSettlementCtx_v5 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.FinalSettlements", "TCbyAccounts", "dbo.Users");
            DropForeignKey("dbo.FinalSettlements", "UserNo", "dbo.Users");
            DropColumn("dbo.FinalSettlements", "UserNo");
            DropColumn("dbo.FinalSettlements", "TCbyAccounts");
        }
        
        public override void Down()
        {
            AddColumn("dbo.FinalSettlements", "TCbyAccounts", c => c.Int());
            AddColumn("dbo.FinalSettlements", "UserNo", c => c.Int(nullable: false));
            AddForeignKey("dbo.FinalSettlements", "UserNo", "dbo.Users", "UserNo");
            AddForeignKey("dbo.FinalSettlements", "TCbyAccounts", "dbo.Users", "UserNo");
        }
    }
}
