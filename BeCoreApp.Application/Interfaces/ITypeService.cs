using BeCoreApp.Application.ViewModels.RealEstate;
using BeCoreApp.Application.ViewModels.Product;
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
    public interface ITypeService
    {
        PagedResult<TypeViewModel> GetAllPaging(string startDate, string endDate, string keyword,
            int pageIndex, int pageSize);
        List<TypeViewModel> GetAll();

        TypeViewModel GetById(int id);
        void Add(TypeViewModel typeVm);
        void Update(TypeViewModel typeVm);
        void Delete(int id);
        void Save();
    }
}
