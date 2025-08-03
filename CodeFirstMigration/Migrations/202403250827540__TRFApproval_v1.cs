namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _TRFApproval_v1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.BudgetFormTRFMasters", "ApprovedBySupervisor", c => c.Int());
            AddColumn("dbo.BudgetFormTRFMasters", "RejectedBySupervisor", c => c.Int());
            AddColumn("dbo.BudgetFormTRFMasters", "TicketApprovalStatusSupervisor", c => c.Int(nullable: false));
            AddColumn("dbo.BudgetFormTRFMasters", "ApprovedByManagement", c => c.Int());
            AddColumn("dbo.BudgetFormTRFMasters", "RejectedByManagement", c => c.Int());
            AddColumn("dbo.BudgetFormTRFMasters", "TicketApprovalStatusManagement", c => c.Int(nullable: false));
            AddForeignKey("dbo.BudgetFormTRFMasters", "ApprovedBySupervisor", "dbo.Users", "UserNo");
            AddForeignKey("dbo.BudgetFormTRFMasters", "ApprovedByManagement", "dbo.Users", "UserNo");
            AddForeignKey("dbo.BudgetFormTRFMasters", "RejectedBySupervisor", "dbo.Users", "UserNo");
            AddForeignKey("dbo.BudgetFormTRFMasters", "RejectedByManagement", "dbo.Users", "UserNo");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.BudgetFormTRFMasters", "RejectedByManagement", "dbo.Users");
            DropForeignKey("dbo.BudgetFormTRFMasters", "RejectedBySupervisor", "dbo.Users");
            DropForeignKey("dbo.BudgetFormTRFMasters", "ApprovedByManagement", "dbo.Users");
            DropForeignKey("dbo.BudgetFormTRFMasters", "ApprovedBySupervisor", "dbo.Users");
            DropColumn("dbo.BudgetFormTRFMasters", "TicketApprovalStatusManagement");
            DropColumn("dbo.BudgetFormTRFMasters", "RejectedByManagement");
            DropColumn("dbo.BudgetFormTRFMasters", "ApprovedByManagement");
            DropColumn("dbo.BudgetFormTRFMasters", "TicketApprovalStatusSupervisor");
            DropColumn("dbo.BudgetFormTRFMasters", "RejectedBySupervisor");
            DropColumn("dbo.BudgetFormTRFMasters", "ApprovedBySupervisor");
        }
    }
}
