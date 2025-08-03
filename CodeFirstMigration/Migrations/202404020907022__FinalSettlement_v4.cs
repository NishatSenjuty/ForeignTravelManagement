namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _FinalSettlement_v4 : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "dbo.FinalSettlements", name: "TCbyAccounts", newName: "__mig_tmp__0");
            RenameColumn(table: "dbo.FinalSettlements", name: "UserNo", newName: "TCbyAccounts");
            RenameColumn(table: "dbo.FinalSettlements", name: "__mig_tmp__0", newName: "UserNo");
            AlterColumn("dbo.FinalSettlements", "TCbyAccounts", c => c.Int());
            AlterColumn("dbo.FinalSettlements", "Cost", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AlterColumn("dbo.FinalSettlements", "RemainingBalance", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AlterColumn("dbo.FinalSettlements", "DisbursedAmount", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AlterColumn("dbo.FinalSettlements", "UserNo", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.FinalSettlements", "UserNo", c => c.Int());
            AlterColumn("dbo.FinalSettlements", "DisbursedAmount", c => c.String());
            AlterColumn("dbo.FinalSettlements", "RemainingBalance", c => c.String(nullable: false));
            AlterColumn("dbo.FinalSettlements", "Cost", c => c.String(nullable: false));
            AlterColumn("dbo.FinalSettlements", "TCbyAccounts", c => c.Int(nullable: false));
            RenameColumn(table: "dbo.FinalSettlements", name: "UserNo", newName: "__mig_tmp__0");
            RenameColumn(table: "dbo.FinalSettlements", name: "TCbyAccounts", newName: "UserNo");
            RenameColumn(table: "dbo.FinalSettlements", name: "__mig_tmp__0", newName: "TCbyAccounts");
        }
    }
}
