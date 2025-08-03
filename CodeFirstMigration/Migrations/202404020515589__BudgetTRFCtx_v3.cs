namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _BudgetTRFCtx_v3 : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "dbo.FinalSettlements", name: "TCbyAccounts", newName: "__mig_tmp__0");
            RenameColumn(table: "dbo.FinalSettlements", name: "UserNo", newName: "TCbyAccounts");
            RenameColumn(table: "dbo.FinalSettlements", name: "__mig_tmp__0", newName: "UserNo");
            AlterColumn("dbo.BudgetFormTRFMasters", "TotalCostRequired", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AlterColumn("dbo.BudgetFormTRFMasters", "TotalAdvanceRequired", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AlterColumn("dbo.BudgetFormTRFMasters", "TotalDisbursedAmount", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AlterColumn("dbo.FinalSettlements", "TCbyAccounts", c => c.Int());
            AlterColumn("dbo.FinalSettlements", "UserNo", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.FinalSettlements", "UserNo", c => c.Int());
            AlterColumn("dbo.FinalSettlements", "TCbyAccounts", c => c.Int(nullable: false));
            AlterColumn("dbo.BudgetFormTRFMasters", "TotalDisbursedAmount", c => c.String());
            AlterColumn("dbo.BudgetFormTRFMasters", "TotalAdvanceRequired", c => c.String(nullable: false));
            AlterColumn("dbo.BudgetFormTRFMasters", "TotalCostRequired", c => c.String(nullable: false));
            RenameColumn(table: "dbo.FinalSettlements", name: "UserNo", newName: "__mig_tmp__0");
            RenameColumn(table: "dbo.FinalSettlements", name: "TCbyAccounts", newName: "UserNo");
            RenameColumn(table: "dbo.FinalSettlements", name: "__mig_tmp__0", newName: "TCbyAccounts");
        }
    }
}
