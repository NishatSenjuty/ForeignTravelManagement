namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _TransactionClosureCtx_v1 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.FinalSettlements", "UserNo", "dbo.Users");
            AddColumn("dbo.FinalSettlements", "AccountsStatusTC", c => c.Int(nullable: false));
            AddColumn("dbo.FinalSettlements", "TCbyAccounts", c => c.Int());
            AddForeignKey("dbo.FinalSettlements", "TCbyAccounts", "dbo.Users", "UserNo");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.FinalSettlements", "TCbyAccounts", "dbo.Users");
            DropColumn("dbo.FinalSettlements", "TCbyAccounts");
            DropColumn("dbo.FinalSettlements", "AccountsStatusTC");
            AddForeignKey("dbo.FinalSettlements", "UserNo", "dbo.Users", "UserNo");
        }
    }
}
