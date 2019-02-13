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
    public class WardController : BaseController
    {
        public IDistrictService _districtService;
        public IProvinceService _provinceService;
        public IWardService _wardService;

        public WardController(IDistrictService districtService,
            IProvinceService provinceService,
            IWardService wardService)
        {
            _districtService = districtService;
            _provinceService = provinceService;
            _wardService = wardService;
        }

        public IActionResult Index()
        {
            var provinces = _provinceService.GetAll();
            ViewBag.ProvinceId = new SelectList(provinces, "Id", "Name");

            var districts = _districtService.GetAll();
            ViewBag.DistrictId = new SelectList(districts, "Id", "Name");

            return View();
        }

        public IActionResult GetDistricts(int provinceId, bool type)
        {
            var districts = _districtService.GetAllByProvinceId(provinceId);
            ViewBag.DistrictId = new SelectList(districts, "Id", "Name");
            return PartialView(type);
        }

        [HttpGet]
        public IActionResult GetById(int id)
        {
            var model = _wardService.GetById(id);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetAllPaging(string keyword, int provinceId, int districtId, int page, int pageSize)
        {
            var model = _wardService.GetAllPaging("", "", keyword, provinceId, districtId, page, pageSize);
            return new OkObjectResult(model);
        }

        [HttpPost]
        public IActionResult SaveEntity(WardViewModel wardVm)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }

            if (wardVm.Id == 0)
                _wardService.Add(wardVm);
            else
                _wardService.Update(wardVm);

            _wardService.Save();
            return new OkObjectResult(wardVm);
        }

        [HttpPost]
        public IActionResult Delete(int id)
        {
            if (!ModelState.IsValid)
                return new BadRequestObjectResult(ModelState);

            _wardService.Delete(id);
            _wardService.Save();

            return new OkObjectResult(id);
        }
    }
}