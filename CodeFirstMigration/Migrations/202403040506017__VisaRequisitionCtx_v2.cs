namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _VisaRequisitionCtx_v2 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.VisaRequisitions", "VisaReqActiveStatus", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.VisaRequisitions", "VisaReqActiveStatus");
        }
    }
}
