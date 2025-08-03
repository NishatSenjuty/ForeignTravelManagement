using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TravelManagement.Utilities
{
    public enum UserStatus
    {
        //inactive, active, banned //An enum type is a distinct value type that declares a set of named constants.
        inactive = 0,
        active = 1,
        banned = 2
    }

    public enum UserEmailStatus
    {

        NotVerified = 0,
        Verified = 1
    }
    public enum PasswordChangeStatus
    {

        NotVerified = 0,
        Verified = 1
    }
}