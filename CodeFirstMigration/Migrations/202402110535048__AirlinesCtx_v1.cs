namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _AirlinesCtx_v1 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Airlines",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        AirlinesName = c.String(nullable: false, maxLength: 50),
                        AirlinesActiveStatus = c.Int(nullable: false),
                        InsertedBy = c.Int(),
                        InsertedDateTime = c.DateTime(nullable: false),
                        UpdatedBy = c.Int(),
                        UpdatedDateTime = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.InsertedBy)
                .ForeignKey("dbo.Users", t => t.UpdatedBy)
                .Index(t => t.AirlinesName, unique: true, name: "AirlinesName");
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Airlines", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.Airlines", "InsertedBy", "dbo.Users");
            DropIndex("dbo.Airlines", "AirlinesName");
            DropTable("dbo.Airlines");
        }
    }
}
