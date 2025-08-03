using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TravelManagement.Utilities
{
    public static class DateParse
    {
        public static DateTime StringToDateTime(this string any)
        {
            DateTime parsedDate;
            DateTime.TryParseExact(any,
                  "dd/MM/yyyy",
                  System.Globalization.CultureInfo.InvariantCulture,
                  System.Globalization.DateTimeStyles.None,
                  out parsedDate);
            return parsedDate;
        }
    }
}