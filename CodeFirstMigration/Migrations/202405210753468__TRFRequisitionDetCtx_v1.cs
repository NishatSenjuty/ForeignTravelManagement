namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _TRFRequisitionDetCtx_v1 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.BudgetFormTRFMasters", "HotelResId", "dbo.HotelReservations");
            DropForeignKey("dbo.BudgetFormTRFMasters", "TicketReqId", "dbo.TicketRequisitions");
            DropForeignKey("dbo.BudgetFormTRFMasters", "VisaReqId", "dbo.VisaRequisitions");
            CreateTable(
                "dbo.BudgetFormAllRequisitionDetails",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        TRFMasterId = c.Int(nullable: false),
                        TRFDetId = c.Int(nullable: false),
                        TRFNoText = c.String(nullable: false),
                        VisaReqId = c.Int(nullable: false),
                        VisaRequisitionNo = c.String(nullable: false),
                        TicketReqId = c.Int(nullable: false),
                        TicketRequisitionNo = c.String(nullable: false),
                        HotelResId = c.Int(nullable: false),
                        HotelReservationNo = c.String(nullable: false),
                        UserNo = c.Int(nullable: false),
                        InsertedBy = c.Int(),
                        InsertedDateTime = c.DateTime(nullable: false),
                        UpdatedBy = c.Int(),
                        UpdatedDateTime = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.BudgetFormTRFDetails", t => t.TRFDetId)
                .ForeignKey("dbo.BudgetFormTRFMasters", t => t.TRFMasterId)
                .ForeignKey("dbo.HotelReservations", t => t.HotelResId)
                .ForeignKey("dbo.Users", t => t.InsertedBy)
                .ForeignKey("dbo.TicketRequisitions", t => t.TicketReqId)
                .ForeignKey("dbo.Users", t => t.UpdatedBy)
                .ForeignKey("dbo.Users", t => t.UserNo)
                .ForeignKey("dbo.VisaRequisitions", t => t.VisaReqId);
            
            DropColumn("dbo.BudgetFormTRFMasters", "VisaReqId");
            DropColumn("dbo.BudgetFormTRFMasters", "VisaRequisitionNo");
            DropColumn("dbo.BudgetFormTRFMasters", "TicketReqId");
            DropColumn("dbo.BudgetFormTRFMasters", "TicketRequisitionNo");
            DropColumn("dbo.BudgetFormTRFMasters", "HotelResId");
            DropColumn("dbo.BudgetFormTRFMasters", "HotelReservationNo");
        }
        
        public override void Down()
        {
            AddColumn("dbo.BudgetFormTRFMasters", "HotelReservationNo", c => c.String(nullable: false));
            AddColumn("dbo.BudgetFormTRFMasters", "HotelResId", c => c.Int(nullable: false));
            AddColumn("dbo.BudgetFormTRFMasters", "TicketRequisitionNo", c => c.String(nullable: false));
            AddColumn("dbo.BudgetFormTRFMasters", "TicketReqId", c => c.Int(nullable: false));
            AddColumn("dbo.BudgetFormTRFMasters", "VisaRequisitionNo", c => c.String(nullable: false));
            AddColumn("dbo.BudgetFormTRFMasters", "VisaReqId", c => c.Int(nullable: false));
            DropForeignKey("dbo.BudgetFormAllRequisitionDetails", "VisaReqId", "dbo.VisaRequisitions");
            DropForeignKey("dbo.BudgetFormAllRequisitionDetails", "UserNo", "dbo.Users");
            DropForeignKey("dbo.BudgetFormAllRequisitionDetails", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.BudgetFormAllRequisitionDetails", "TicketReqId", "dbo.TicketRequisitions");
            DropForeignKey("dbo.BudgetFormAllRequisitionDetails", "InsertedBy", "dbo.Users");
            DropForeignKey("dbo.BudgetFormAllRequisitionDetails", "HotelResId", "dbo.HotelReservations");
            DropForeignKey("dbo.BudgetFormAllRequisitionDetails", "TRFMasterId", "dbo.BudgetFormTRFMasters");
            DropForeignKey("dbo.BudgetFormAllRequisitionDetails", "TRFDetId", "dbo.BudgetFormTRFDetails");
            DropTable("dbo.BudgetFormAllRequisitionDetails");
            AddForeignKey("dbo.BudgetFormTRFMasters", "VisaReqId", "dbo.VisaRequisitions", "Id");
            AddForeignKey("dbo.BudgetFormTRFMasters", "TicketReqId", "dbo.TicketRequisitions", "Id");
            AddForeignKey("dbo.BudgetFormTRFMasters", "HotelResId", "dbo.HotelReservations", "Id");
        }
    }
}
