namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _TicketRequisitionCtx_v2 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.TicketRequisitions", "TicketPriceTD", c => c.String(maxLength: 50));
            AddColumn("dbo.TicketRequisitions", "CurrencyTypeTD", c => c.String(maxLength: 10));
            AlterColumn("dbo.TicketRequisitions", "AirlinesTD", c => c.String(maxLength: 10));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.TicketRequisitions", "AirlinesTD", c => c.String(maxLength: 50));
            DropColumn("dbo.TicketRequisitions", "CurrencyTypeTD");
            DropColumn("dbo.TicketRequisitions", "TicketPriceTD");
        }
    }
}
