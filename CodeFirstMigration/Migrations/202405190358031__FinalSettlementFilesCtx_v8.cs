namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _FinalSettlementFilesCtx_v8 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.FinalSettlementFiles", "FileType", c => c.String(nullable: false, maxLength: 4000));
        }
        
        public override void Down()
        {
            DropColumn("dbo.FinalSettlementFiles", "FileType");
        }
    }
}
