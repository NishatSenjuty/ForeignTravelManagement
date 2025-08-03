namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _UserCtx_v5 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.SignUpFileAttachments",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserNoPk = c.Int(nullable: false),
                        FileName = c.String(maxLength: 4000),
                        location = c.String(maxLength: 4000),
                        FileActiveStatus = c.Int(nullable: false),
                        InsertedBy = c.Int(),
                        InsertedDateTime = c.DateTime(nullable: false),
                        UpdatedBy = c.Int(),
                        UpdatedDateTime = c.DateTime(nullable: false),
                        User_UserNo = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.InsertedBy)
                .ForeignKey("dbo.Users", t => t.UpdatedBy)
                .ForeignKey("dbo.Users", t => t.UserNoPk)
                .ForeignKey("dbo.Users", t => t.User_UserNo);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.SignUpFileAttachments", "User_UserNo", "dbo.Users");
            DropForeignKey("dbo.SignUpFileAttachments", "UserNoPk", "dbo.Users");
            DropForeignKey("dbo.SignUpFileAttachments", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.SignUpFileAttachments", "InsertedBy", "dbo.Users");
            DropTable("dbo.SignUpFileAttachments");
        }
    }
}
