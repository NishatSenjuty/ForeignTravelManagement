namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _BudgetTRFCtx_v4 : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "dbo.FinalSettlements", name: "TCbyAccounts", newName: "__mig_tmp__0");
            RenameColumn(table: "dbo.FinalSettlements", name: "UserNo", newName: "TCbyAccounts");
            RenameColumn(table: "dbo.FinalSettlements", name: "__mig_tmp__0", newName: "UserNo");
            AlterColumn("dbo.BudgetFormTRFDetails", "Days", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AlterColumn("dbo.BudgetFormTRFDetails", "CostPerDay", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AlterColumn("dbo.BudgetFormTRFDetails", "Total", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AlterColumn("dbo.BudgetFormTRFDetails", "Disburse", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AlterColumn("dbo.FinalSettlements", "TCbyAccounts", c => c.Int());
            AlterColumn("dbo.FinalSettlements", "UserNo", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.FinalSettlements", "UserNo", c => c.Int());
            AlterColumn("dbo.FinalSettlements", "TCbyAccounts", c => c.Int(nullable: false));
            AlterColumn("dbo.BudgetFormTRFDetails", "Disburse", c => c.String());
            AlterColumn("dbo.BudgetFormTRFDetails", "Total", c => c.String());
            AlterColumn("dbo.BudgetFormTRFDetails", "CostPerDay", c => c.String());
            AlterColumn("dbo.BudgetFormTRFDetails", "Days", c => c.String());
            RenameColumn(table: "dbo.FinalSettlements", name: "UserNo", newName: "__mig_tmp__0");
            RenameColumn(table: "dbo.FinalSettlements", name: "TCbyAccounts", newName: "UserNo");
            RenameColumn(table: "dbo.FinalSettlements", name: "__mig_tmp__0", newName: "TCbyAccounts");
        }
    }
}
