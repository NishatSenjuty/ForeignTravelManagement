namespace TravelManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _VisaRequisitionCtx_v4 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.VisaRequisitions", "EmpPkID", "dbo.EmployeeInformations");
            AddColumn("dbo.VisaRequisitions", "UserNo", c => c.Int(nullable: false));
            AddForeignKey("dbo.VisaRequisitions", "UserNo", "dbo.Users", "UserNo");
            DropColumn("dbo.VisaRequisitions", "EmpPkID");
        }
        
        public override void Down()
        {
            AddColumn("dbo.VisaRequisitions", "EmpPkID", c => c.Int(nullable: false));
            DropForeignKey("dbo.VisaRequisitions", "UserNo", "dbo.Users");
            DropColumn("dbo.VisaRequisitions", "UserNo");
            AddForeignKey("dbo.VisaRequisitions", "EmpPkID", "dbo.EmployeeInformations", "Id");
        }
    }
}
