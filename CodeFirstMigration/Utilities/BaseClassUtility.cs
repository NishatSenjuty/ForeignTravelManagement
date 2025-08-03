using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text.RegularExpressions;
using System.Web;

namespace TravelManagement.Utilities
{
    public static class BaseClassUtility
    {
        public static bool IsValidContactNo(string value)
        {
            if (value == "" || value == null)
            {
                return true;
            }
            return Regex.IsMatch(value, @"^(?:\+88|01)?(?:\d{11}|\d{13})$");
        }

        //Validating phone number
        public static string ValidatePhoneNumber(string phone)
        {
            if (phone != null)
            {
                if (phone.Length == 10)
                {
                    if (phone.Substring(0, 1) == "1")
                    {
                        string checkedPhone = RemoveNonNumeric("0" + phone);
                        if (checkedPhone == "valid")
                        {
                            return "0" + phone;
                        }
                        else if (checkedPhone == "invalid")
                        {
                            return "invalid";
                        }
                    }
                    else
                    {
                        return "invalid";

                    }

                }
                else if (phone.Length == 11)
                {
                    if (phone.Substring(0, 2) == "01")
                    {
                        string checkedPhone = RemoveNonNumeric(phone);
                        if (checkedPhone == "valid")
                        {
                            return phone;
                        }
                        else if (checkedPhone == "invalid")
                        {
                            return "invalid";
                        }
                    }
                    else
                    {
                        return "invalid";
                    }
                }
                else if (phone.Length == 13)
                {
                    if (phone.Substring(0, 4) == "8801")
                    {
                        string checkedPhone = RemoveNonNumeric(phone.Substring(2, 11));
                        if (checkedPhone == "valid")
                        {
                            return phone.Substring(2, 11);
                        }
                        else if (checkedPhone == "invalid")
                        {
                            return "invalid";
                        }
                    }
                    else
                    {
                        return "invalid";
                    }
                }
                else if (phone.Length == 15)
                {
                    if (phone.Substring(0, 6) == "008801")
                    {
                        string checkedPhone = RemoveNonNumeric(phone.Substring(4, 11));
                        if (checkedPhone == "valid")
                        {
                            return phone.Substring(4, 11);
                        }
                        else if (checkedPhone == "invalid")
                        {
                            return "invalid";
                        }
                    }
                    else
                    {
                        return "invalid";
                    }
                }

            }
            return null;
        }
        public static string RemoveNonNumeric(string phone)
        {
            return Regex.IsMatch(phone, @"^(?:\+88|01|0088)?\d{11}$") ? "valid" : "invalid";

        }


        //private Random random = new Random();

        //public string RandomString(int length)
        //{
        //    const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        //    return new string(Enumerable.Repeat(chars, length)
        //        .Select(s => s[random.Next(s.Length)]).ToArray());
        //}
    }
}