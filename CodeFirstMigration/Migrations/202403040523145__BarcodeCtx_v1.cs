namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _BarcodeCtx_v1 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.BarcodeNoes",
                c => new
                    {
                        BarcodeNoId = c.Int(nullable: false, identity: true),
                        BarcodeNoText = c.String(nullable: false, maxLength: 20),
                        CompanyId = c.Int(nullable: false),
                        CreateDateTime = c.DateTime(nullable: false),
                        BarcodeForStatus = c.String(nullable: false, maxLength: 10),
                    })
                .PrimaryKey(t => t.BarcodeNoId)
                .ForeignKey("dbo.Companies", t => t.CompanyId)
                .Index(t => new { t.BarcodeNoText, t.CompanyId }, unique: true, name: "Uk_BarcodeNoText");
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.BarcodeNoes", "CompanyId", "dbo.Companies");
            DropIndex("dbo.BarcodeNoes", "Uk_BarcodeNoText");
            DropTable("dbo.BarcodeNoes");
        }
    }
}
