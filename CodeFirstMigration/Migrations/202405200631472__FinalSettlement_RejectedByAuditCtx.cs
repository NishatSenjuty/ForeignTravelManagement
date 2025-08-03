namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _FinalSettlement_RejectedByAuditCtx : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.FinalSettlements", "RejectedByAudit", c => c.Int());
        }
        
        public override void Down()
        {
            DropColumn("dbo.FinalSettlements", "RejectedByAudit");
        }
    }
}
