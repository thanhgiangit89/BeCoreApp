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
    public class ClassifiedCategoryController : BaseController
    {
        public IClassifiedCategoryService _classifiedCategoryService;
        public ITypeService _typeService;

        public ClassifiedCategoryController(IClassifiedCategoryService classifiedCategoryService, ITypeService typeService)
        {
            _classifiedCategoryService = classifiedCategoryService;
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
            var model = _classifiedCategoryService.GetById(id);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetAllPaging(string keyword, int typeId, int page, int pageSize)
        {
            var model = _classifiedCategoryService.GetAllPaging("", "", keyword, typeId, page, pageSize);
            return new OkObjectResult(model);
        }

        [HttpPost]
        public IActionResult SaveEntity(ClassifiedCategoryViewModel classifiedCategoryVm)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }

            if (classifiedCategoryVm.Id == 0)
                _classifiedCategoryService.Add(classifiedCategoryVm);
            else
                _classifiedCategoryService.Update(classifiedCategoryVm);

            _classifiedCategoryService.Save();
            return new OkObjectResult(classifiedCategoryVm);
        }

        [HttpPost]
        public IActionResult Delete(int id)
        {
            if (!ModelState.IsValid)
                return new BadRequestObjectResult(ModelState);

            _classifiedCategoryService.Delete(id);
            _classifiedCategoryService.Save();

            return new OkObjectResult(id);
        }
    }
}