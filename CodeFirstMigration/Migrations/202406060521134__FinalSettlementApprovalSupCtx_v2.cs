namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _FinalSettlementApprovalSupCtx_v2 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.FinalSettlements", "CommentsSupervisor", c => c.String());
            AlterColumn("dbo.FinalSettlements", "CommentsManagement", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.FinalSettlements", "CommentsManagement", c => c.String(maxLength: 50));
            DropColumn("dbo.FinalSettlements", "CommentsSupervisor");
        }
    }
}
