namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _ExpensesCtx_v1 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Expenses",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ExpensesCategory = c.String(nullable: false, maxLength: 50),
                        ExpensesActiveStatus = c.Int(nullable: false),
                        InsertedBy = c.Int(),
                        InsertedDateTime = c.DateTime(nullable: false),
                        UpdatedBy = c.Int(),
                        UpdatedDateTime = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.InsertedBy)
                .ForeignKey("dbo.Users", t => t.UpdatedBy)
                .Index(t => t.ExpensesCategory, unique: true, name: "ExpensesCategory");
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Expenses", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.Expenses", "InsertedBy", "dbo.Users");
            DropIndex("dbo.Expenses", "ExpensesCategory");
            DropTable("dbo.Expenses");
        }
    }
}
