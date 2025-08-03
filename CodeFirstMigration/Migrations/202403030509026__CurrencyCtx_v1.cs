namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _CurrencyCtx_v1 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Currencies",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CurrencyName = c.String(nullable: false, maxLength: 50),
                        CurrencyActiveStatus = c.Int(nullable: false),
                        InsertedBy = c.Int(),
                        InsertedDateTime = c.DateTime(nullable: false),
                        UpdatedBy = c.Int(),
                        UpdatedDateTime = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.InsertedBy)
                .ForeignKey("dbo.Users", t => t.UpdatedBy)
                .Index(t => t.CurrencyName, unique: true, name: "CurrencyName");
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Currencies", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.Currencies", "InsertedBy", "dbo.Users");
            DropIndex("dbo.Currencies", "CurrencyName");
            DropTable("dbo.Currencies");
        }
    }
}
