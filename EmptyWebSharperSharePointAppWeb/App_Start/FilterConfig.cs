using System.Web;
using System.Web.Mvc;

namespace EmptyWebSharperSharePointAppWeb
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());

            filters.Add(new WebSharper.AspNetMvc.Filter());
        }
    }
}
