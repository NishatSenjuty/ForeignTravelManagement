namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _FinalSettlementApprovalSupCtx_v1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.FinalSettlements", "ApprovalStatusSup", c => c.Int(nullable: false));
            AddColumn("dbo.FinalSettlements", "ApprovedBySup", c => c.Int());
            AddColumn("dbo.FinalSettlements", "RejectedBySup", c => c.Int());
            AddForeignKey("dbo.FinalSettlements", "ApprovedBySup", "dbo.Users", "UserNo");
            AddForeignKey("dbo.FinalSettlements", "RejectedByAudit", "dbo.Users", "UserNo");
            AddForeignKey("dbo.FinalSettlements", "RejectedBySup", "dbo.Users", "UserNo");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.FinalSettlements", "RejectedBySup", "dbo.Users");
            DropForeignKey("dbo.FinalSettlements", "RejectedByAudit", "dbo.Users");
            DropForeignKey("dbo.FinalSettlements", "ApprovedBySup", "dbo.Users");
            DropColumn("dbo.FinalSettlements", "RejectedBySup");
            DropColumn("dbo.FinalSettlements", "ApprovedBySup");
            DropColumn("dbo.FinalSettlements", "ApprovalStatusSup");
        }
    }
}
