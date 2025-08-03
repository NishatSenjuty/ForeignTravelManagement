namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _VisaRequisitionCtx_v6 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.VisaRequisitionTDfiles",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        VisaRequisionId = c.Int(nullable: false),
                        UserNo = c.Int(nullable: false),
                        FileName = c.String(nullable: false, maxLength: 4000),
                        location = c.String(nullable: false, maxLength: 4000),
                        FileActiveStatus = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.UserNo)
                .ForeignKey("dbo.VisaRequisitions", t => t.VisaRequisionId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.VisaRequisitionTDfiles", "VisaRequisionId", "dbo.VisaRequisitions");
            DropForeignKey("dbo.VisaRequisitionTDfiles", "UserNo", "dbo.Users");
            DropTable("dbo.VisaRequisitionTDfiles");
        }
    }
}
