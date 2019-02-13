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
    public class StreetController : BaseController
    {
        public IDistrictService _districtService;
        public IProvinceService _provinceService;
        public IWardService _wardService;
        public IStreetService _streetService;

        public StreetController(IDistrictService districtService,
            IProvinceService provinceService,
            IWardService wardService,
            IStreetService streetService)
        {
            _districtService = districtService;
            _provinceService = provinceService;
            _wardService = wardService;
            _streetService = streetService;
        }

        public IActionResult Index()
        {
            var provinces = _provinceService.GetAll();
            ViewBag.ProvinceId = new SelectList(provinces, "Id", "Name");

            var districts = _districtService.GetAll();
            ViewBag.DistrictId = new SelectList(districts, "Id", "Name");

            var wards = _wardService.GetAll();
            ViewBag.WardId = new SelectList(wards, "Id", "Name");

            return View();
        }


        public IActionResult GetDistricts(int provinceId, bool type)
        {
            var districts = _districtService.GetAllByProvinceId(provinceId);
            ViewBag.DistrictId = new SelectList(districts, "Id", "Name");
            return PartialView(type);
        }

        public IActionResult GetWards(int districtId, bool type)
        {
            var wards = _wardService.GetAllByDistrictId(districtId);
            ViewBag.WardId = new SelectList(wards, "Id", "Name");
            return PartialView(type);
        }

        [HttpGet]
        public IActionResult GetById(int id)
        {
            var model = _streetService.GetById(id);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetAllPaging(string keyword, int provinceId, int districtId, int wardId, int page, int pageSize)
        {
            var model = _streetService.GetAllPaging("", "", keyword, provinceId, districtId, wardId, page, pageSize);
            return new OkObjectResult(model);
        }

        [HttpPost]
        public IActionResult SaveEntity(StreetViewModel streetVm)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }

            if (streetVm.Id == 0)
                _streetService.Add(streetVm);
            else
                _streetService.Update(streetVm);

            _streetService.Save();
            return new OkObjectResult(streetVm);
        }

        [HttpPost]
        public IActionResult Delete(int id)
        {
            if (!ModelState.IsValid)
                return new BadRequestObjectResult(ModelState);

            _streetService.Delete(id);
            _streetService.Save();

            return new OkObjectResult(id);
        }
    }
}