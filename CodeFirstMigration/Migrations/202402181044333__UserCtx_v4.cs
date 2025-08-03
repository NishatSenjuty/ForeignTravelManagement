namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _UserCtx_v4 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Users", "EmployeeId", c => c.String(nullable: false, maxLength: 10));
            AddColumn("dbo.Users", "FirstName", c => c.String(nullable: false, maxLength: 255));
            AddColumn("dbo.Users", "MiddleName", c => c.String(maxLength: 255));
            AddColumn("dbo.Users", "LastName", c => c.String(nullable: false, maxLength: 255));
            AddColumn("dbo.Users", "DOB", c => c.DateTime());
            AddColumn("dbo.Users", "Gender", c => c.String(nullable: false, maxLength: 8));
            AddColumn("dbo.Users", "Nationality", c => c.String(nullable: false, maxLength: 255));
            AddColumn("dbo.Users", "PresentAddress", c => c.String(nullable: false, maxLength: 255));
            AddColumn("dbo.Users", "EmgContactNo", c => c.String(nullable: false, maxLength: 255));
            CreateIndex("dbo.Users", "EmployeeId", unique: true, name: "EmployeeId");
        }
        
        public override void Down()
        {
            DropIndex("dbo.Users", "EmployeeId");
            DropColumn("dbo.Users", "EmgContactNo");
            DropColumn("dbo.Users", "PresentAddress");
            DropColumn("dbo.Users", "Nationality");
            DropColumn("dbo.Users", "Gender");
            DropColumn("dbo.Users", "DOB");
            DropColumn("dbo.Users", "LastName");
            DropColumn("dbo.Users", "MiddleName");
            DropColumn("dbo.Users", "FirstName");
            DropColumn("dbo.Users", "EmployeeId");
        }
    }
}
