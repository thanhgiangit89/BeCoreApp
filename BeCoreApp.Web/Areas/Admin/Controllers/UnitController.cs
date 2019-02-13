using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BeCoreApp.Application.Interfaces;
using BeCoreApp.Application.ViewModels.Blog;
using BeCoreApp.Application.ViewModels.Location;
using BeCoreApp.Application.ViewModels.RealEstate;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace BeCoreApp.Areas.Admin.Controllers
{
    public class UnitController : BaseController
    {
        public IUnitService _unitService;
        public ITypeService _typeService;

        public UnitController(IUnitService unitService, ITypeService typeService)
        {
            _unitService = unitService;
            _typeService = typeService;
        }

        public IActionResult Index()
        {
            var types = _typeService.GetAll();
            ViewBag.TypeId = new SelectList(types, "Id", "Name");
            return View();
        }

        [HttpGet]
        public IActionResult GetById(int id)
        {
            var model = _unitService.GetById(id);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetAllPaging(string keyword, int typeId, int page, int pageSize)
        {
            var model = _unitService.GetAllPaging("", "", keyword, typeId, page, pageSize);
            return new OkObjectResult(model);
        }

        [HttpPost]
        public IActionResult SaveEntity(UnitViewModel unitVm)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }

            if (unitVm.Id == 0)
                _unitService.Add(unitVm);
            else
                _unitService.Update(unitVm);

            _unitService.Save();
            return new OkObjectResult(unitVm);
        }

        [HttpPost]
        public IActionResult Delete(int id)
        {
            if (!ModelState.IsValid)
                return new BadRequestObjectResult(ModelState);

            _unitService.Delete(id);
            _unitService.Save();

            return new OkObjectResult(id);
        }
    }
}