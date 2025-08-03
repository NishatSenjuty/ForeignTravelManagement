namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitializeDatabase : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Companies",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CompanyName = c.String(nullable: false, maxLength: 60),
                        CompanyShortName = c.String(nullable: false, maxLength: 100),
                        CompanyActiveStatus = c.Int(nullable: false),
                        InsertedBy = c.Int(),
                        InsertedDateTime = c.DateTime(nullable: false),
                        UpdatedBy = c.Int(),
                        UpdatedDateTime = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.InsertedBy)
                .ForeignKey("dbo.Users", t => t.UpdatedBy)
                .Index(t => t.CompanyName, unique: true, name: "CompanyName")
                .Index(t => t.CompanyName, unique: true, name: "UK_CompanyName")
                .Index(t => t.CompanyShortName, unique: true, name: "CompanyShortName")
                .Index(t => t.CompanyShortName, unique: true, name: "UK_CompanyShortName");
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        UserNo = c.Int(nullable: false, identity: true),
                        FullName = c.String(nullable: false, maxLength: 255),
                        UserName = c.String(nullable: false, maxLength: 255),
                        Email = c.String(maxLength: 255),
                        ContactNo = c.String(maxLength: 20),
                        UserRoleId = c.Int(nullable: false),
                        PassPhrase = c.String(nullable: false),
                        AddedDateTime = c.DateTime(nullable: false),
                        UserStatus = c.Int(nullable: false),
                        UserEmailStatus = c.Int(nullable: false),
                        InsertedBy = c.Int(),
                    })
                .PrimaryKey(t => t.UserNo)
                .ForeignKey("dbo.Users", t => t.InsertedBy)
                .ForeignKey("dbo.UserRoles", t => t.UserRoleId)
                .Index(t => t.UserName, unique: true, name: "UK_User_UserName")
                .Index(t => t.UserRoleId, name: "FK_User_UserRoleId");
            
            CreateTable(
                "dbo.EnrollCompanyLocationFloors",
                c => new
                    {
                        EnrollCompanyLocationFloorId = c.Int(nullable: false, identity: true),
                        UserNo = c.Int(nullable: false),
                        CompanyId = c.Int(nullable: false),
                        LocationId = c.Int(nullable: false),
                        FloorId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.EnrollCompanyLocationFloorId)
                .ForeignKey("dbo.Companies", t => t.CompanyId)
                .ForeignKey("dbo.Floors", t => t.FloorId)
                .ForeignKey("dbo.Locations", t => t.LocationId)
                .ForeignKey("dbo.Users", t => t.UserNo)
                .Index(t => new { t.UserNo, t.CompanyId, t.LocationId, t.FloorId }, unique: true, name: "UK_EnrollCompanyLocationFloor");
            
            CreateTable(
                "dbo.Floors",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FloorName = c.String(nullable: false, maxLength: 50),
                        CompanyId = c.Int(nullable: false),
                        LocationId = c.Int(nullable: false),
                        FloorActiveStatus = c.Int(nullable: false),
                        InsertedBy = c.Int(),
                        InsertedDateTime = c.DateTime(nullable: false),
                        UpdatedBy = c.Int(),
                        UpdatedDateTime = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Companies", t => t.CompanyId)
                .ForeignKey("dbo.Users", t => t.InsertedBy)
                .ForeignKey("dbo.Locations", t => t.LocationId)
                .ForeignKey("dbo.Users", t => t.UpdatedBy)
                .Index(t => new { t.FloorName, t.CompanyId, t.LocationId }, unique: true, name: "UK_FloorName_CompanyId_LocationId");
            
            CreateTable(
                "dbo.Locations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CompanyId = c.Int(nullable: false),
                        LocationName = c.String(nullable: false, maxLength: 50),
                        LocationActiveStatus = c.Int(nullable: false),
                        InsertedBy = c.Int(),
                        InsertedDateTime = c.DateTime(nullable: false),
                        UpdatedBy = c.Int(),
                        UpdatedDateTime = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Companies", t => t.CompanyId)
                .ForeignKey("dbo.Users", t => t.InsertedBy)
                .ForeignKey("dbo.Users", t => t.UpdatedBy)
                .Index(t => t.LocationName, unique: true, name: "LocationName")
                .Index(t => t.LocationName, unique: true, name: "UK_LocationName_CompanyId");
            
            CreateTable(
                "dbo.EnrollMenus",
                c => new
                    {
                        EnrollMenuId = c.Int(nullable: false, identity: true),
                        UserNo = c.Int(nullable: false),
                        MenuItemId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.EnrollMenuId)
                .ForeignKey("dbo.MenuItems", t => t.MenuItemId)
                .ForeignKey("dbo.Users", t => t.UserNo)
                .Index(t => new { t.UserNo, t.MenuItemId }, unique: true, name: "UK_EnrollMenu");
            
            CreateTable(
                "dbo.MenuItems",
                c => new
                    {
                        MenuItemId = c.Int(nullable: false, identity: true),
                        MenuItemName = c.String(nullable: false, maxLength: 55),
                        MenuItemShortName = c.String(nullable: false, maxLength: 25),
                        MenuCategoryId = c.Int(),
                    })
                .PrimaryKey(t => t.MenuItemId)
                .ForeignKey("dbo.MenuCategories", t => t.MenuCategoryId)
                .Index(t => t.MenuItemShortName, unique: true, name: "UK_MenuItemShortName");
            
            CreateTable(
                "dbo.MenuCategories",
                c => new
                    {
                        MenuCategoryId = c.Int(nullable: false, identity: true),
                        MenuCategoryTitle = c.String(nullable: false, maxLength: 100),
                        MenuCategoryDisplayIndex = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.MenuCategoryId);
            
            CreateTable(
                "dbo.UserRoles",
                c => new
                    {
                        UserRoleId = c.Int(nullable: false, identity: true),
                        UserRoleTitle = c.String(nullable: false, maxLength: 100),
                        ParentUserRoleId = c.Int(),
                    })
                .PrimaryKey(t => t.UserRoleId)
                .ForeignKey("dbo.UserRoles", t => t.ParentUserRoleId);
            
            CreateTable(
                "dbo.Departments",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 60),
                        ActiveStatus = c.Int(nullable: false),
                        InsertedBy = c.Int(),
                        InsertedDateTime = c.DateTime(nullable: false),
                        UpdatedBy = c.Int(),
                        UpdatedDateTime = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.InsertedBy)
                .ForeignKey("dbo.Users", t => t.UpdatedBy)
                .Index(t => t.Name, unique: true, name: "Name");
            
            CreateTable(
                "dbo.Designations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        DesignationName = c.String(nullable: false, maxLength: 50),
                        DesignationActiveStatus = c.Int(nullable: false),
                        InsertedBy = c.Int(),
                        InsertedDateTime = c.DateTime(nullable: false),
                        UpdatedBy = c.Int(),
                        UpdatedDateTime = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.InsertedBy)
                .ForeignKey("dbo.Users", t => t.UpdatedBy)
                .Index(t => t.DesignationName, unique: true, name: "DesignationName");
            
            CreateTable(
                "dbo.EmployeeInformations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        EmployeeId = c.String(nullable: false, maxLength: 10),
                        Name = c.String(nullable: false, maxLength: 50),
                        Address = c.String(nullable: false, maxLength: 50),
                        Gender = c.String(nullable: false, maxLength: 8),
                        BloodGroup = c.String(nullable: false, maxLength: 4),
                        Salary = c.Decimal(nullable: false, precision: 18, scale: 2),
                        ContactNo = c.String(nullable: false, maxLength: 20),
                        ActiveStatus = c.Int(nullable: false),
                        CompanyId = c.Int(nullable: false),
                        DepartmentId = c.Int(nullable: false),
                        DesignationId = c.Int(nullable: false),
                        LocationId = c.Int(nullable: false),
                        JD = c.DateTime(),
                        DOB = c.DateTime(),
                        InsertedBy = c.Int(),
                        InsertedDateTime = c.DateTime(nullable: false),
                        UpdatedBy = c.Int(),
                        UpdatedDateTime = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Companies", t => t.CompanyId)
                .ForeignKey("dbo.Departments", t => t.DepartmentId)
                .ForeignKey("dbo.Designations", t => t.DesignationId)
                .ForeignKey("dbo.Users", t => t.InsertedBy)
                .ForeignKey("dbo.Locations", t => t.LocationId)
                .ForeignKey("dbo.Users", t => t.UpdatedBy)
                .Index(t => t.EmployeeId, unique: true, name: "EmployeeId")
                .Index(t => t.CompanyId, name: "CompanyIndex")
                .Index(t => new { t.LocationId, t.DepartmentId, t.DesignationId }, name: "SearchIndex");
            
            CreateTable(
                "dbo.LoginAttempts",
                c => new
                    {
                        LoginAttemptFromSessionId = c.Int(nullable: false, identity: true),
                        UserNo = c.Int(nullable: false),
                        AttemptType = c.String(nullable: false, maxLength: 10),
                        LoginDateTime = c.DateTime(nullable: false),
                        Browser = c.String(maxLength: 55),
                        OperatingSystem = c.String(maxLength: 55),
                        IPaddress = c.String(maxLength: 25),
                        LoginAttemptNo = c.String(nullable: false, maxLength: 20),
                    })
                .PrimaryKey(t => t.LoginAttemptFromSessionId)
                .ForeignKey("dbo.Users", t => t.UserNo)
                .Index(t => t.LoginAttemptFromSessionId, unique: true, name: "LoginAttemptFromSessionId");
            
            CreateTable(
                "dbo.SessionHistories",
                c => new
                    {
                        SessionHistoryId = c.Int(nullable: false, identity: true),
                        UserNo = c.Int(nullable: false),
                        SessionType = c.String(nullable: false, maxLength: 10),
                        CreatedDateTime = c.DateTime(nullable: false),
                        Browser = c.String(maxLength: 55),
                        OperatingSystem = c.String(maxLength: 55),
                        IPaddress = c.String(maxLength: 25),
                    })
                .PrimaryKey(t => t.SessionHistoryId)
                .ForeignKey("dbo.Users", t => t.UserNo);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.SessionHistories", "UserNo", "dbo.Users");
            DropForeignKey("dbo.LoginAttempts", "UserNo", "dbo.Users");
            DropForeignKey("dbo.EmployeeInformations", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.EmployeeInformations", "LocationId", "dbo.Locations");
            DropForeignKey("dbo.EmployeeInformations", "InsertedBy", "dbo.Users");
            DropForeignKey("dbo.EmployeeInformations", "DesignationId", "dbo.Designations");
            DropForeignKey("dbo.EmployeeInformations", "DepartmentId", "dbo.Departments");
            DropForeignKey("dbo.EmployeeInformations", "CompanyId", "dbo.Companies");
            DropForeignKey("dbo.Designations", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.Designations", "InsertedBy", "dbo.Users");
            DropForeignKey("dbo.Departments", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.Departments", "InsertedBy", "dbo.Users");
            DropForeignKey("dbo.Companies", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.Companies", "InsertedBy", "dbo.Users");
            DropForeignKey("dbo.Users", "UserRoleId", "dbo.UserRoles");
            DropForeignKey("dbo.UserRoles", "ParentUserRoleId", "dbo.UserRoles");
            DropForeignKey("dbo.Users", "InsertedBy", "dbo.Users");
            DropForeignKey("dbo.EnrollMenus", "UserNo", "dbo.Users");
            DropForeignKey("dbo.MenuItems", "MenuCategoryId", "dbo.MenuCategories");
            DropForeignKey("dbo.EnrollMenus", "MenuItemId", "dbo.MenuItems");
            DropForeignKey("dbo.EnrollCompanyLocationFloors", "UserNo", "dbo.Users");
            DropForeignKey("dbo.EnrollCompanyLocationFloors", "LocationId", "dbo.Locations");
            DropForeignKey("dbo.EnrollCompanyLocationFloors", "FloorId", "dbo.Floors");
            DropForeignKey("dbo.Floors", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.Locations", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.Locations", "InsertedBy", "dbo.Users");
            DropForeignKey("dbo.Floors", "LocationId", "dbo.Locations");
            DropForeignKey("dbo.Locations", "CompanyId", "dbo.Companies");
            DropForeignKey("dbo.Floors", "InsertedBy", "dbo.Users");
            DropForeignKey("dbo.Floors", "CompanyId", "dbo.Companies");
            DropForeignKey("dbo.EnrollCompanyLocationFloors", "CompanyId", "dbo.Companies");
            DropIndex("dbo.LoginAttempts", "LoginAttemptFromSessionId");
            DropIndex("dbo.EmployeeInformations", "SearchIndex");
            DropIndex("dbo.EmployeeInformations", "CompanyIndex");
            DropIndex("dbo.EmployeeInformations", "EmployeeId");
            DropIndex("dbo.Designations", "DesignationName");
            DropIndex("dbo.Departments", "Name");
            DropIndex("dbo.MenuItems", "UK_MenuItemShortName");
            DropIndex("dbo.EnrollMenus", "UK_EnrollMenu");
            DropIndex("dbo.Locations", "UK_LocationName_CompanyId");
            DropIndex("dbo.Locations", "LocationName");
            DropIndex("dbo.Floors", "UK_FloorName_CompanyId_LocationId");
            DropIndex("dbo.EnrollCompanyLocationFloors", "UK_EnrollCompanyLocationFloor");
            DropIndex("dbo.Users", "FK_User_UserRoleId");
            DropIndex("dbo.Users", "UK_User_UserName");
            DropIndex("dbo.Companies", "UK_CompanyShortName");
            DropIndex("dbo.Companies", "CompanyShortName");
            DropIndex("dbo.Companies", "UK_CompanyName");
            DropIndex("dbo.Companies", "CompanyName");
            DropTable("dbo.SessionHistories");
            DropTable("dbo.LoginAttempts");
            DropTable("dbo.EmployeeInformations");
            DropTable("dbo.Designations");
            DropTable("dbo.Departments");
            DropTable("dbo.UserRoles");
            DropTable("dbo.MenuCategories");
            DropTable("dbo.MenuItems");
            DropTable("dbo.EnrollMenus");
            DropTable("dbo.Locations");
            DropTable("dbo.Floors");
            DropTable("dbo.EnrollCompanyLocationFloors");
            DropTable("dbo.Users");
            DropTable("dbo.Companies");
        }
    }
}
