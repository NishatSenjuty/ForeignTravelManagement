using TravelManagement.Context;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace TravelManagement.Gateway
{
    public class MenuItemsGateway
    {
        //For User Function - Showing menu data for dropdown *
        public dynamic GetMenuItems(TravelManagementDBcontext dbContext)
        {
            try
            {
                var menuLists = dbContext.MenuItems.Include(m => m.MenuCategory)
                                        .Select(d => new
                                        {
                                            d.MenuItemId,
                                            d.MenuItemName,
                                            d.MenuItemShortName,
                                            d.MenuCategoryId,
                                            d.MenuCategory.MenuCategoryTitle
                                        }).ToList();

                return menuLists;
            }
            catch (Exception)
            {
                return null;
            }
        }

     
    }
}