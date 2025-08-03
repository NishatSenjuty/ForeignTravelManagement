namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _FSapprovalCtx_v2 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.FinalSettlements", "RejectedByAudit", "dbo.Users");
            DropColumn("dbo.FinalSettlements", "RejectedByAudit");
        }
        
        public override void Down()
        {
            AddColumn("dbo.FinalSettlements", "RejectedByAudit", c => c.Int());
            AddForeignKey("dbo.FinalSettlements", "RejectedByAudit", "dbo.Users", "UserNo");
        }
    }
}
