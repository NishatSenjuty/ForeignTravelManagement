namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _UserAndSupervisorCtx_v2 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.EnrollSuperVisors",
                c => new
                    {
                        EnrollSupervisorId = c.Int(nullable: false, identity: true),
                        UserId = c.Int(nullable: false),
                        SupervisorId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.EnrollSupervisorId)
                .ForeignKey("dbo.Users", t => t.SupervisorId)
                .ForeignKey("dbo.Users", t => t.UserId)
                .Index(t => new { t.UserId, t.SupervisorId }, unique: true, name: "UK_EnrollSuperVisor");
            
            AddColumn("dbo.Users", "DepartmentId", c => c.Int());
            AddColumn("dbo.Users", "DesignationId", c => c.Int());
            AddColumn("dbo.Users", "PrimaryCompanyId", c => c.Int(nullable: false));
            AddColumn("dbo.Users", "PrimaryLocationId", c => c.Int(nullable: false));
            CreateIndex("dbo.Users", "DepartmentId", name: "FK_DepartmentId");
            CreateIndex("dbo.Users", "DesignationId", name: "FK_DesignationId");
            CreateIndex("dbo.Users", "PrimaryCompanyId", name: "FK_PrimaryCompanyId");
            CreateIndex("dbo.Users", "PrimaryLocationId", name: "FK_PrimaryLocationId");
            AddForeignKey("dbo.Users", "PrimaryCompanyId", "dbo.Companies", "Id");
            AddForeignKey("dbo.Users", "DepartmentId", "dbo.Departments", "Id");
            AddForeignKey("dbo.Users", "DesignationId", "dbo.Designations", "Id");
            AddForeignKey("dbo.Users", "PrimaryLocationId", "dbo.Locations", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.EnrollSuperVisors", "UserId", "dbo.Users");
            DropForeignKey("dbo.EnrollSuperVisors", "SupervisorId", "dbo.Users");
            DropForeignKey("dbo.Users", "PrimaryLocationId", "dbo.Locations");
            DropForeignKey("dbo.Users", "DesignationId", "dbo.Designations");
            DropForeignKey("dbo.Users", "DepartmentId", "dbo.Departments");
            DropForeignKey("dbo.Users", "PrimaryCompanyId", "dbo.Companies");
            DropIndex("dbo.EnrollSuperVisors", "UK_EnrollSuperVisor");
            DropIndex("dbo.Users", "FK_PrimaryLocationId");
            DropIndex("dbo.Users", "FK_PrimaryCompanyId");
            DropIndex("dbo.Users", "FK_DesignationId");
            DropIndex("dbo.Users", "FK_DepartmentId");
            DropColumn("dbo.Users", "PrimaryLocationId");
            DropColumn("dbo.Users", "PrimaryCompanyId");
            DropColumn("dbo.Users", "DesignationId");
            DropColumn("dbo.Users", "DepartmentId");
            DropTable("dbo.EnrollSuperVisors");
        }
    }
}
