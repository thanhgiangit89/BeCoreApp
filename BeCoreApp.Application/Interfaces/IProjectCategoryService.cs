using BeCoreApp.Application.ViewModels.Location;
using BeCoreApp.Application.ViewModels.Product;
using BeCoreApp.Application.ViewModels.Project;
using BeCoreApp.Data.Entities;
using BeCoreApp.Data.Enums;
using BeCoreApp.Infrastructure.Interfaces;
using BeCoreApp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BeCoreApp.Application.Interfaces
{
    public interface IProjectCategoryService
    {
        PagedResult<ProjectCategoryViewModel> GetAllPaging(string startDate, string endDate, string keyword,
            int pageIndex, int pageSize);
        List<ProjectCategoryViewModel> GetAll();
        ProjectCategoryViewModel GetById(int id);
        void Add(ProjectCategoryViewModel projectCategoryVm);
        void Update(ProjectCategoryViewModel projectCategoryVm);
        void Delete(int id);
        void Save();
    }
}
