namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _FSApprovalCtx_v1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.FinalSettlements", "ApprovedByAudit", c => c.Int());
            AddColumn("dbo.FinalSettlements", "RejectedByAudit", c => c.Int());
            AddColumn("dbo.FinalSettlements", "FSApprovalStatusAudit", c => c.Int(nullable: false));
            AddColumn("dbo.FinalSettlements", "ApprovedByManagement", c => c.Int());
            AddColumn("dbo.FinalSettlements", "RejectedByManagement", c => c.Int());
            AddColumn("dbo.FinalSettlements", "FSApprovalStatusManagement", c => c.Int(nullable: false));
            AddColumn("dbo.FinalSettlements", "ApprovedFSamount", c => c.String());
            AddColumn("dbo.FinalSettlements", "RemarksFSapproval", c => c.String());
            AddForeignKey("dbo.FinalSettlements", "ApprovedByAudit", "dbo.Users", "UserNo");
            AddForeignKey("dbo.FinalSettlements", "ApprovedByManagement", "dbo.Users", "UserNo");
            AddForeignKey("dbo.FinalSettlements", "RejectedByAudit", "dbo.Users", "UserNo");
            AddForeignKey("dbo.FinalSettlements", "RejectedByManagement", "dbo.Users", "UserNo");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.FinalSettlements", "RejectedByManagement", "dbo.Users");
            DropForeignKey("dbo.FinalSettlements", "RejectedByAudit", "dbo.Users");
            DropForeignKey("dbo.FinalSettlements", "ApprovedByManagement", "dbo.Users");
            DropForeignKey("dbo.FinalSettlements", "ApprovedByAudit", "dbo.Users");
            DropColumn("dbo.FinalSettlements", "RemarksFSapproval");
            DropColumn("dbo.FinalSettlements", "ApprovedFSamount");
            DropColumn("dbo.FinalSettlements", "FSApprovalStatusManagement");
            DropColumn("dbo.FinalSettlements", "RejectedByManagement");
            DropColumn("dbo.FinalSettlements", "ApprovedByManagement");
            DropColumn("dbo.FinalSettlements", "FSApprovalStatusAudit");
            DropColumn("dbo.FinalSettlements", "RejectedByAudit");
            DropColumn("dbo.FinalSettlements", "ApprovedByAudit");
        }
    }
}
