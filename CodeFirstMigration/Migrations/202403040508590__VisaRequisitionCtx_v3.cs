namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _VisaRequisitionCtx_v3 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.VisaRequisitionAttachments",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        VisaRequisionId = c.Int(nullable: false),
                        UserNo = c.Int(nullable: false),
                        FileName = c.String(nullable: false, maxLength: 4000),
                        location = c.String(nullable: false, maxLength: 4000),
                        FileType = c.Int(nullable: false),
                        FileActiveStatus = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.UserNo)
                .ForeignKey("dbo.VisaRequisitions", t => t.VisaRequisionId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.VisaRequisitionAttachments", "VisaRequisionId", "dbo.VisaRequisitions");
            DropForeignKey("dbo.VisaRequisitionAttachments", "UserNo", "dbo.Users");
            DropTable("dbo.VisaRequisitionAttachments");
        }
    }
}
