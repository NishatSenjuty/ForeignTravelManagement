namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _TRFRejectCommentCtx_v1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.BudgetFormTRFMasters", "CommentsSupervisor", c => c.String(maxLength: 50));
        }
        
        public override void Down()
        {
            DropColumn("dbo.BudgetFormTRFMasters", "CommentsSupervisor");
        }
    }
}
