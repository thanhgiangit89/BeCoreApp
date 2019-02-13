using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BeCoreApp.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BeCoreApp.Areas.Admin.Controllers
{
    public class HomeController : BaseController
    {
        //private readonly IReportService _reportService;

        public HomeController()
        {
        }

        public IActionResult Index()
        {
            var email = User.GetSpecificClaim("Email");

            return View();
        }

        //public async Task<IActionResult> GetRevenue(string fromDate, string toDate)
        //{
        //    return new OkObjectResult(/*await _reportService.GetReportAsync(fromDate, toDate)*/);
        //}
    }
}