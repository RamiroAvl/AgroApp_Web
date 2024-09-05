using AgroApp_Web.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace AgroApp_Web.Controllers
{
    //em Views/Home säo as paginas do controller home
    //então se o a home tem uma ação (metodo), ela precisa ter uma view daquele metodo ex: Index.cshtml e Privacy.cshtml
    public class HomeController : Controller
    {
                //private readonly ILogger<HomeController> _logger;

               // public HomeController(ILogger<HomeController> logger)
               // {
                //    _logger = logger;
                //}

        //
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
