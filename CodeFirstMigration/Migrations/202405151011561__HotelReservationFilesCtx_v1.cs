namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _HotelReservationFilesCtx_v1 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.HotelReservationFiles",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        HotelReservationId = c.Int(nullable: false),
                        UserNo = c.Int(nullable: false),
                        FileName = c.String(nullable: false, maxLength: 4000),
                        location = c.String(nullable: false, maxLength: 4000),
                        HotelActiveStatus = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.HotelReservations", t => t.HotelReservationId)
                .ForeignKey("dbo.Users", t => t.UserNo);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.HotelReservationFiles", "UserNo", "dbo.Users");
            DropForeignKey("dbo.HotelReservationFiles", "HotelReservationId", "dbo.HotelReservations");
            DropTable("dbo.HotelReservationFiles");
        }
    }
}
