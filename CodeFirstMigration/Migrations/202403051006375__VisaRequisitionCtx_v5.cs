namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _VisaRequisitionCtx_v5 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.VisaRequisitions", "VisaNoTD", c => c.String(maxLength: 20));
        }
        
        public override void Down()
        {
            DropColumn("dbo.VisaRequisitions", "VisaNoTD");
        }
    }
}
