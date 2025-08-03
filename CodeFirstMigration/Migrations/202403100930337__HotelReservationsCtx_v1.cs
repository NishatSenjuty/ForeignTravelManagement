namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _HotelReservationsCtx_v1 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.HotelReservations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        VisaReqId = c.Int(nullable: false),
                        VisaRequisitionNo = c.String(nullable: false),
                        TicketReqId = c.Int(nullable: false),
                        TicketRequisitionNo = c.String(nullable: false),
                        HotelReservationNo = c.Int(nullable: false),
                        HotelReservationNoText = c.String(maxLength: 4000),
                        UserNo = c.Int(nullable: false),
                        HotelResActiveStatus = c.Int(nullable: false),
                        CountryNameUser = c.String(maxLength: 20),
                        CityUser = c.String(maxLength: 20),
                        CheckInDateUser = c.DateTime(),
                        CheckOutDateUser = c.DateTime(),
                        RoomTypeUser = c.String(maxLength: 20),
                        PreferedHotelUser = c.String(maxLength: 20),
                        PreferedLocationUser = c.String(maxLength: 20),
                        BudgetUser = c.String(maxLength: 20),
                        EventAddressUser = c.String(),
                        EventDateUser = c.DateTime(),
                        EventTimeUser = c.Time(precision: 7),
                        SpecialReqUser = c.String(),
                        LoyaltyProgNo = c.String(),
                        CountryNameTD = c.String(maxLength: 20),
                        CityTD = c.String(maxLength: 20),
                        CheckInDateTD = c.DateTime(),
                        CheckOutDateTD = c.DateTime(),
                        RoomTypeTD = c.String(maxLength: 20),
                        HotelNameTD = c.String(maxLength: 20),
                        HotelAddressTD = c.String(maxLength: 20),
                        InsertedBy = c.Int(),
                        InsertedDateTime = c.DateTime(nullable: false),
                        UpdatedBy = c.Int(),
                        UpdatedDateTime = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.InsertedBy)
                .ForeignKey("dbo.TicketRequisitions", t => t.TicketReqId)
                .ForeignKey("dbo.Users", t => t.UpdatedBy)
                .ForeignKey("dbo.Users", t => t.UserNo)
                .ForeignKey("dbo.VisaRequisitions", t => t.VisaReqId)
                .Index(t => t.HotelReservationNoText, name: "HotelReservationNoIndex");
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.HotelReservations", "VisaReqId", "dbo.VisaRequisitions");
            DropForeignKey("dbo.HotelReservations", "UserNo", "dbo.Users");
            DropForeignKey("dbo.HotelReservations", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.HotelReservations", "TicketReqId", "dbo.TicketRequisitions");
            DropForeignKey("dbo.HotelReservations", "InsertedBy", "dbo.Users");
            DropIndex("dbo.HotelReservations", "HotelReservationNoIndex");
            DropTable("dbo.HotelReservations");
        }
    }
}
