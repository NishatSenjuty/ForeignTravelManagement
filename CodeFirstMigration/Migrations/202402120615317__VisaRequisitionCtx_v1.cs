namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _VisaRequisitionCtx_v1 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.VisaRequisitions",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        VisaRequisitionNo = c.Int(nullable: false),
                        VisaRequisitionNoText = c.String(maxLength: 4000),
                        EmpPkID = c.Int(nullable: false),
                        CountryNameTD = c.String(maxLength: 20),
                        VisaIssueDateTD = c.DateTime(),
                        VisaExpiryDateTD = c.DateTime(),
                        RemarksTD = c.String(maxLength: 4000),
                        TypeOfVisaUser = c.String(maxLength: 10),
                        TypeOfVisaOtherUser = c.String(maxLength: 20),
                        PreviouslyDestinedUser = c.String(maxLength: 5),
                        VisaTypePreviousUser = c.String(maxLength: 20),
                        IssueDatePrevUser = c.DateTime(),
                        ExpiryDatePrevUser = c.DateTime(),
                        CountryNameUser = c.String(maxLength: 20),
                        PurposeOfTravelUser = c.String(maxLength: 10),
                        PurposeOfTravelOtherUser = c.String(maxLength: 20),
                        EntryDateUser = c.DateTime(),
                        DepartureUser = c.DateTime(),
                        ReturnUser = c.DateTime(),
                        AccomodationDetUser = c.String(maxLength: 4000),
                        SpecialReqUser = c.String(maxLength: 4000),
                        RemarksUser = c.String(maxLength: 20),
                        InsertedBy = c.Int(),
                        InsertedDateTime = c.DateTime(nullable: false),
                        UpdatedBy = c.Int(),
                        UpdatedDateTime = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.EmployeeInformations", t => t.EmpPkID)
                .ForeignKey("dbo.Users", t => t.InsertedBy)
                .ForeignKey("dbo.Users", t => t.UpdatedBy)
                .Index(t => t.VisaRequisitionNoText, name: "VisaRequisitionNoTextIndex");
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.VisaRequisitions", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.VisaRequisitions", "InsertedBy", "dbo.Users");
            DropForeignKey("dbo.VisaRequisitions", "EmpPkID", "dbo.EmployeeInformations");
            DropIndex("dbo.VisaRequisitions", "VisaRequisitionNoTextIndex");
            DropTable("dbo.VisaRequisitions");
        }
    }
}
