namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _TicketRequisionCtx_v1 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.TicketRequisitionFiles",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        TicketRequisionId = c.Int(nullable: false),
                        UserNo = c.Int(nullable: false),
                        FileName = c.String(nullable: false, maxLength: 4000),
                        location = c.String(nullable: false, maxLength: 4000),
                        TicketActiveStatus = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.TicketRequisitions", t => t.TicketRequisionId)
                .ForeignKey("dbo.Users", t => t.UserNo);
            
            CreateTable(
                "dbo.TicketRequisitions",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        VisaReqId = c.Int(nullable: false),
                        VisaRequisitionNo = c.String(nullable: false),
                        TicketRequisitionNo = c.Int(nullable: false),
                        TicketRequisitionNoText = c.String(maxLength: 4000),
                        UserNo = c.Int(nullable: false),
                        TicketReqActiveStatus = c.Int(nullable: false),
                        PurposeOfTravelUser = c.String(maxLength: 10),
                        DestinationUser = c.String(maxLength: 20),
                        DepartureDateUser = c.DateTime(),
                        ReturnDateUser = c.DateTime(),
                        AirlinesUser = c.String(maxLength: 4),
                        FlayerNoUser = c.String(maxLength: 20),
                        FlightUser = c.String(maxLength: 20),
                        SeatUser = c.String(maxLength: 10),
                        MealUser = c.String(maxLength: 100),
                        SpecialReqUser = c.String(),
                        RemarksUser = c.String(),
                        AirlinesTD = c.String(maxLength: 50),
                        DepturtureDateTD = c.DateTime(),
                        DepturtureTimeTD = c.Time(precision: 7),
                        TerminalNoTD = c.String(maxLength: 20),
                        FlightNoTD = c.String(maxLength: 20),
                        TicketNoTD = c.String(maxLength: 20),
                        TicketTypeTD = c.String(maxLength: 10),
                        SeatNoTD = c.String(maxLength: 20),
                        RemarksTD = c.String(maxLength: 100),
                        InsertedBy = c.Int(),
                        InsertedDateTime = c.DateTime(nullable: false),
                        UpdatedBy = c.Int(),
                        UpdatedDateTime = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.InsertedBy)
                .ForeignKey("dbo.Users", t => t.UpdatedBy)
                .ForeignKey("dbo.Users", t => t.UserNo)
                .ForeignKey("dbo.VisaRequisitions", t => t.VisaReqId)
                .Index(t => t.TicketRequisitionNoText, name: "VisaRequisitionNoTextIndex");
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.TicketRequisitionFiles", "UserNo", "dbo.Users");
            DropForeignKey("dbo.TicketRequisitions", "VisaReqId", "dbo.VisaRequisitions");
            DropForeignKey("dbo.TicketRequisitions", "UserNo", "dbo.Users");
            DropForeignKey("dbo.TicketRequisitions", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.TicketRequisitionFiles", "TicketRequisionId", "dbo.TicketRequisitions");
            DropForeignKey("dbo.TicketRequisitions", "InsertedBy", "dbo.Users");
            DropIndex("dbo.TicketRequisitions", "VisaRequisitionNoTextIndex");
            DropTable("dbo.TicketRequisitions");
            DropTable("dbo.TicketRequisitionFiles");
        }
    }
}
