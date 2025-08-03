namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _VisaTicketHotelRejectCommentCtx_v1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.HotelReservations", "CommentsSupervisor", c => c.String(maxLength: 50));
            AddColumn("dbo.TicketRequisitions", "CommentsSupervisor", c => c.String(maxLength: 50));
            AddColumn("dbo.VisaRequisitions", "CommentsSupervisor", c => c.String(maxLength: 50));
        }
        
        public override void Down()
        {
            DropColumn("dbo.VisaRequisitions", "CommentsSupervisor");
            DropColumn("dbo.TicketRequisitions", "CommentsSupervisor");
            DropColumn("dbo.HotelReservations", "CommentsSupervisor");
        }
    }
}
