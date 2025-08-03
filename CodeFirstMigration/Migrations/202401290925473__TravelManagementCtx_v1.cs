namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _TravelManagementCtx_v1 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.EmailListSups",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        EmailList = c.String(nullable: false, maxLength: 4000),
                        InsertedBy = c.Int(),
                        InsertedDateTime = c.DateTime(nullable: false),
                        UpdatedBy = c.Int(),
                        UpdatedDateTime = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.InsertedBy)
                .ForeignKey("dbo.Users", t => t.UpdatedBy);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.EmailListSups", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.EmailListSups", "InsertedBy", "dbo.Users");
            DropTable("dbo.EmailListSups");
        }
    }
}
