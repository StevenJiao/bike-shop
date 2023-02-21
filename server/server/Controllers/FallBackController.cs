using System.Net.Mime;
using Microsoft.AspNetCore.Mvc;

namespace server.Controllers
{
    public class FallbackController : Controller
    {
        public IActionResult Index()
        {
            // fallback onto the wwwroot/index.html generated from react client
            return PhysicalFile(Path.Combine(Directory.GetCurrentDirectory(),
                "wwwroot", "index.html"), MediaTypeNames.Text.Html);
        }
    }
}