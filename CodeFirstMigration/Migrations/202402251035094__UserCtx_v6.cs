namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _UserCtx_v6 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.SignUpFileAttachments", "FileType", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.SignUpFileAttachments", "FileType");
        }
    }
}
