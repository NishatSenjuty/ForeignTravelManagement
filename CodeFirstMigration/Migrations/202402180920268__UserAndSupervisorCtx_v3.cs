namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _UserAndSupervisorCtx_v3 : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.Users", "FK_PrimaryCompanyId");
            DropIndex("dbo.Users", "FK_PrimaryLocationId");
            AlterColumn("dbo.Users", "PrimaryCompanyId", c => c.Int());
            AlterColumn("dbo.Users", "PrimaryLocationId", c => c.Int());
            CreateIndex("dbo.Users", "PrimaryCompanyId", name: "FK_PrimaryCompanyId");
            CreateIndex("dbo.Users", "PrimaryLocationId", name: "FK_PrimaryLocationId");
        }
        
        public override void Down()
        {
            DropIndex("dbo.Users", "FK_PrimaryLocationId");
            DropIndex("dbo.Users", "FK_PrimaryCompanyId");
            AlterColumn("dbo.Users", "PrimaryLocationId", c => c.Int(nullable: false));
            AlterColumn("dbo.Users", "PrimaryCompanyId", c => c.Int(nullable: false));
            CreateIndex("dbo.Users", "PrimaryLocationId", name: "FK_PrimaryLocationId");
            CreateIndex("dbo.Users", "PrimaryCompanyId", name: "FK_PrimaryCompanyId");
        }
    }
}
