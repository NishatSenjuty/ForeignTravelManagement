namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _TRFRejectCommentCtx_v2 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.BudgetFormTRFMasters", "CommentsManagement", c => c.String(maxLength: 50));
        }
        
        public override void Down()
        {
            DropColumn("dbo.BudgetFormTRFMasters", "CommentsManagement");
        }
    }
}
