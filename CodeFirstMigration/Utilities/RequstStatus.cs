using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TravelManagement.Utilities
{
    public enum RequestStatusType
    {
        AccessDenied,
        ValidationError,
        Invalid,
        Save,
        Update,
        Delete,
        Data
    }

    public static class RequstStatus
    {
        /// <summary>
        /// Returns object for JSON
        /// </summary>
        /// <param name="requestType"></param>
        /// <param name="rowsAffected"></param>
        /// <returns></returns>
        public static object Return(RequestStatusType requestType, int rowsAffected = -10)
        {

            if (requestType == RequestStatusType.AccessDenied)
                return new { error = true, message = "Invalid request detected! You are not authorized to access." };

            if (requestType == RequestStatusType.ValidationError)
                return new { error = true, message = "Please Input all the information properly." };

            if (requestType == RequestStatusType.Invalid)
            {
                return new { error = true, message = "ERROR! Invalid Request Detected." };
            }

            if (requestType == RequestStatusType.Save)
            {
                if (rowsAffected > 0)
                {
                    return new { error = false, message = "Saved Successfully." };
                }
                else if (rowsAffected == -2)
                {
                    return new { error = true, message = "ERROR! Invalid Request Detected. Data has not been saved." };
                }
            }

            if (requestType == RequestStatusType.Update)
            {
                if (rowsAffected > 0)
                {
                    return new { error = false, message = "Updated Successfully." };
                }
                else if (rowsAffected == 0)
                {
                    return new { error = true, message = "Data didn't update. You didn't change anything." };
                }
                else if (rowsAffected == -2)
                {
                    return new { error = true, message = "ERROR! Invalid Request Detected. Data has not been updated." };
                }
                else if (rowsAffected == -3)
                {
                    return new { error = true, message = "Updatation Failed. Data not found." };
                }

                return new { error = true, message = "Oops!! Updatation Failed. Please try again later." };
            }

            if (requestType == RequestStatusType.Delete)
            {
                if (rowsAffected > 0)
                {
                    return new { error = false, message = "Deleted Successfully." };
                }
                else if (rowsAffected == -2)
                {
                    return new { error = true, message = "ERROR! Invalid Request Detected. Data has not been deleted." };
                }
                else if (rowsAffected == -3)
                {
                    return new { error = true, message = "Deletion Failed. Data not found." };
                }

                return new { error = true, message = "Oops!! Deletion Failed. Please try again later." };
            }

            return new { error = true, message = "Operation Unsuccessful. Try again." };
        }

        /// <summary>
        /// Returns object for JSON after checking the data provided
        /// </summary>
        /// <param name="requestType"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        public static object ReturnForData(RequestStatusType requestType, dynamic data)
        {
            if (requestType == RequestStatusType.Data)
            {
                if (data != null)
                    return new { error = false, data };
                else
                    return new { error = true, message = "Data Not Found." };
            }

            return new { error = true, message = "Operation Unsuccessful. Try again." };
        }
    }
}