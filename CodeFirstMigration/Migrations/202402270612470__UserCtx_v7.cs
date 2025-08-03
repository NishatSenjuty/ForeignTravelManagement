namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _UserCtx_v7 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.SignUpFileAttachments", "InsertedBy", "dbo.Users");
            DropForeignKey("dbo.SignUpFileAttachments", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.SignUpFileAttachments", "UserNoPk", "dbo.Users");
            RenameColumn(table: "dbo.SignUpFileAttachments", name: "User_UserNo", newName: "UserNo");
            AlterColumn("dbo.SignUpFileAttachments", "FileName", c => c.String(nullable: false, maxLength: 4000));
            AlterColumn("dbo.SignUpFileAttachments", "location", c => c.String(nullable: false, maxLength: 4000));
            AlterColumn("dbo.SignUpFileAttachments", "UserNo", c => c.Int(nullable: false));
            DropColumn("dbo.SignUpFileAttachments", "UserNoPk");
            DropColumn("dbo.SignUpFileAttachments", "InsertedBy");
            DropColumn("dbo.SignUpFileAttachments", "InsertedDateTime");
            DropColumn("dbo.SignUpFileAttachments", "UpdatedBy");
            DropColumn("dbo.SignUpFileAttachments", "UpdatedDateTime");
        }
        
        public override void Down()
        {
            AddColumn("dbo.SignUpFileAttachments", "UpdatedDateTime", c => c.DateTime(nullable: false));
            AddColumn("dbo.SignUpFileAttachments", "UpdatedBy", c => c.Int());
            AddColumn("dbo.SignUpFileAttachments", "InsertedDateTime", c => c.DateTime(nullable: false));
            AddColumn("dbo.SignUpFileAttachments", "InsertedBy", c => c.Int());
            AddColumn("dbo.SignUpFileAttachments", "UserNoPk", c => c.Int(nullable: false));
            AlterColumn("dbo.SignUpFileAttachments", "UserNo", c => c.Int());
            AlterColumn("dbo.SignUpFileAttachments", "location", c => c.String(maxLength: 4000));
            AlterColumn("dbo.SignUpFileAttachments", "FileName", c => c.String(maxLength: 4000));
            RenameColumn(table: "dbo.SignUpFileAttachments", name: "UserNo", newName: "User_UserNo");
            AddForeignKey("dbo.SignUpFileAttachments", "UserNoPk", "dbo.Users", "UserNo");
            AddForeignKey("dbo.SignUpFileAttachments", "UpdatedBy", "dbo.Users", "UserNo");
            AddForeignKey("dbo.SignUpFileAttachments", "InsertedBy", "dbo.Users", "UserNo");
        }
    }
}
