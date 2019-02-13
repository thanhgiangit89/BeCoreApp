using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BeCoreApp.Application.Interfaces;
using BeCoreApp.Application.ViewModels.Blog;
using BeCoreApp.Application.ViewModels.Location;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace BeCoreApp.Areas.Admin.Controllers
{
    public class DistrictController : BaseController
    {
        public IDistrictService _districtService;
        public IProvinceService _provinceService;

        public DistrictController(IDistrictService districtService, IProvinceService provinceService)
        {
            _districtService = districtService;
            _provinceService = provinceService;
        }

        public IActionResult Index()
        {
            var provinces = _provinceService.GetAll();
            ViewBag.ProvinceId = new SelectList(provinces, "Id", "Name");
            return View();
        }

        [HttpGet]
        public IActionResult GetById(int id)
        {
            var model = _districtService.GetById(id);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetAllPaging(string keyword, int provinceId, int page, int pageSize)
        {
            var model = _districtService.GetAllPaging("", "", keyword, provinceId, page, pageSize);
            return new OkObjectResult(model);
        }

        [HttpPost]
        public IActionResult SaveEntity(DistrictViewModel districtVm)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }

            if (districtVm.Id == 0)
                _districtService.Add(districtVm);
            else
                _districtService.Update(districtVm);

            _districtService.Save();
            return new OkObjectResult(districtVm);
        }

        [HttpPost]
        public IActionResult Delete(int id)
        {
            if (!ModelState.IsValid)
                return new BadRequestObjectResult(ModelState);

            _districtService.Delete(id);
            _districtService.Save();

            return new OkObjectResult(id);
        }
    }
}