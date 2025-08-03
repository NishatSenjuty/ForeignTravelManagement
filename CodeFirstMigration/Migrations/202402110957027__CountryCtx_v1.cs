namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _CountryCtx_v1 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Countries",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CountryName = c.String(nullable: false, maxLength: 50),
                        CountryActiveStatus = c.Int(nullable: false),
                        InsertedBy = c.Int(),
                        InsertedDateTime = c.DateTime(nullable: false),
                        UpdatedBy = c.Int(),
                        UpdatedDateTime = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.InsertedBy)
                .ForeignKey("dbo.Users", t => t.UpdatedBy)
                .Index(t => t.CountryName, unique: true, name: "CountryName");
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Countries", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.Countries", "InsertedBy", "dbo.Users");
            DropIndex("dbo.Countries", "CountryName");
            DropTable("dbo.Countries");
        }
    }
}
