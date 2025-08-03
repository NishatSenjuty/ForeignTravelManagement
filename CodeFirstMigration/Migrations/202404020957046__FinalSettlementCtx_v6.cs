namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _FinalSettlementCtx_v6 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.FinalSettlements", "UserNo", c => c.Int(nullable: false));
            AddColumn("dbo.FinalSettlements", "TCbyAccounts", c => c.Int());
            AddForeignKey("dbo.FinalSettlements", "TCbyAccounts", "dbo.Users", "UserNo");
            AddForeignKey("dbo.FinalSettlements", "UserNo", "dbo.Users", "UserNo");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.FinalSettlements", "UserNo", "dbo.Users");
            DropForeignKey("dbo.FinalSettlements", "TCbyAccounts", "dbo.Users");
            DropColumn("dbo.FinalSettlements", "TCbyAccounts");
            DropColumn("dbo.FinalSettlements", "UserNo");
        }
    }
}
