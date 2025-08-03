using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TravelManagement.Utilities
{
    public class MySession
    {
        private MySession()
        {
            MyDate = DateTime.Now;
        }

        //Gets current session
        public static MySession Current
        {
            get
            {
                MySession session =
                    (MySession)HttpContext.Current.Session["[TravelManagementDBcontext]"];
                if (session == null)
                {
                    session = new MySession();
                    HttpContext.Current.Session["[TravelManagementDBcontext]"] = session;
                }
                return session;
            }
        }

        //adding session priorities

        public string UserDisplayName { get; set; }
        public string UserName { get; set; }
        public int UserNo { get; set; }
        public DateTime MyDate { get; set; }
        public int UserRoleId { get; set; }
        public string RoleTitle { get; set; }
        public dynamic NavList { get; set; }
        public dynamic NavListDetails { get; set; }
        public string Email { get; set; }


        public int[] CompaniesId { get; set; }
        public int[] LocationsId { get; set; }
        public int[] FloorsId { get; set; }

       // public string Email { get; set; }
        public string VerificationCode { get; set; }
        public UserStatus UserStatus { get; set; }
        public UserEmailStatus UserEmailStatus { get; set; }
        public string PasswordChangeVerificationCode { get; set; }
        public PasswordChangeStatus PasswordChangeStatus { get; set; }
    }
}