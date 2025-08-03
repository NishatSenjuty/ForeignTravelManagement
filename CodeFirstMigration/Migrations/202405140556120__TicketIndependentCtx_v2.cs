namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _TicketIndependentCtx_v2 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.TicketRequisitions", "PurposeOfTravelOtherUser", c => c.String(maxLength: 20));
        }
        
        public override void Down()
        {
            DropColumn("dbo.TicketRequisitions", "PurposeOfTravelOtherUser");
        }
    }
}
