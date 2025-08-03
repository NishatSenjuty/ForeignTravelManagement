namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _BarcodeCtx_v2 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.BarcodeNoes", "CompanyId", "dbo.Companies");
            DropIndex("dbo.BarcodeNoes", "Uk_BarcodeNoText");
            CreateIndex("dbo.BarcodeNoes", "BarcodeNoText", unique: true, name: "Uk_BarcodeNoText");
            DropColumn("dbo.BarcodeNoes", "CompanyId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.BarcodeNoes", "CompanyId", c => c.Int(nullable: false));
            DropIndex("dbo.BarcodeNoes", "Uk_BarcodeNoText");
            CreateIndex("dbo.BarcodeNoes", new[] { "BarcodeNoText", "CompanyId" }, unique: true, name: "Uk_BarcodeNoText");
            AddForeignKey("dbo.BarcodeNoes", "CompanyId", "dbo.Companies", "Id");
        }
    }
}
