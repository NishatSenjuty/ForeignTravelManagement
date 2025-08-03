namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _VisaApprovalCtx_v1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.VisaRequisitions", "VisaApprovalStatus", c => c.Int(nullable: false));
            AddColumn("dbo.VisaRequisitions", "ApprovedBy", c => c.Int());
            AddColumn("dbo.VisaRequisitions", "RejectedBy", c => c.Int());
            AddForeignKey("dbo.VisaRequisitions", "ApprovedBy", "dbo.Users", "UserNo");
            AddForeignKey("dbo.VisaRequisitions", "RejectedBy", "dbo.Users", "UserNo");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.VisaRequisitions", "RejectedBy", "dbo.Users");
            DropForeignKey("dbo.VisaRequisitions", "ApprovedBy", "dbo.Users");
            DropColumn("dbo.VisaRequisitions", "RejectedBy");
            DropColumn("dbo.VisaRequisitions", "ApprovedBy");
            DropColumn("dbo.VisaRequisitions", "VisaApprovalStatus");
        }
    }
}
