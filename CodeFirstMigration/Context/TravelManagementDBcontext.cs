
using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Web;
using TravelManagement.Models;

namespace TravelManagement.Context
{
    public class TravelManagementDBcontext : DbContext
    {
        public TravelManagementDBcontext() : base("TravelManagementDBcontext") 
        { 
        
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<ForeignKeyIndexConvention>();
            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();
            modelBuilder.Conventions.Remove<ManyToManyCascadeDeleteConvention>();

            modelBuilder.Entity<EnrollSuperVisor>()
                  .HasRequired(m => m.User)
                  .WithMany(t => t.UserNos)
                  .HasForeignKey(m => m.UserId)
                  .WillCascadeOnDelete(false);

            modelBuilder.Entity<EnrollSuperVisor>()
                        .HasRequired(m => m.Supervisor)
                        .WithMany(t => t.SuperVisors)
                        .HasForeignKey(m => m.SupervisorId)
                        .WillCascadeOnDelete(false);


        }

        public DbSet<EnrollSuperVisor> EnrollSuperVisors { get; set; }

        public DbSet<Company> Companies { get; set; }
        public DbSet<Department> Departments { get; set; }  
        public DbSet<Location> Locations { get; set; }
        public DbSet<Designation> Designations { get; set; }
        public DbSet<EmployeeInformation> EmplyeeInformations { get; set; }
        public DbSet<Floor> Floors { get; set; }
        public DbSet<SessionHistory> SessionHistories { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<EnrollCompanyLocationFloor> EnrollCompanyLocationFloors { get; set; }
        public DbSet<MenuCategory> MenuCategorys { get; set; }
        public DbSet<MenuItem> MenuItems { get; set; }
        public DbSet<EnrollMenu> EnrollMenus { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<LoginAttempt> LoginAttempt { get; set; }
        public DbSet<EmailListSup> EmailListSups { get; set; }
        public DbSet<Airlines> Airlineses { get; set; }
        public DbSet<Expenses> Expensess { get; set; }
        public DbSet<Country> Countries { get; set; }     
        public DbSet<VisaRequisition> VisaRequisitions { get; set; }
        public DbSet<SignUpFileAttachment> SignUpFileAttachments { get; set; }
        public DbSet<Currency> Currencies { get; set; }
        public DbSet<VisaRequisitionAttachments> VisaRequisitionAttachments { get; set; }
        public DbSet<BarcodeNo> BarcodeNos { get; set; }
        public DbSet<VisaRequisitionTDfiles> visaRequisitionTDfiles { get; set; }
        public DbSet<TicketRequisition> TicketRequisitions { get; set; }

        public DbSet<TicketRequisitionFiles> TicketRequisitionFiles { get; set; }

        public DbSet<HotelReservation> HotelReservations { get; set; }

        public DbSet<BudgetFormTRFMaster> BudgetFormTRFMasters { get; set; }

        public DbSet<BudgetFormTRFDetails> BudgetFormTRFDetailses { get; set; }

        public DbSet<FinalSettlement> FinalSettlements { get; set; }

        public DbSet<FinalSettlementFiles> FinalSettlementFiles { get; set; }

        public DbSet<HotelReservationFiles> HotelReservationFiles { get; set; }

        public DbSet<FinalSettlementsDetails> FinalSettlementsDetails { get; set; }

        public DbSet<BudgetFormAllRequisitionDetails> BudgetFormAllRequisitionDetails { get; set; }




    }
}