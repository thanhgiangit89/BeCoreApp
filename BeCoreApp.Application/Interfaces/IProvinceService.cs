using BeCoreApp.Application.ViewModels.Location;
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
    public interface IProvinceService
    {
        PagedResult<ProvinceViewModel> GetAllPaging(string startDate, string endDate, string keyword,
            int pageIndex, int pageSize);
        List<ProvinceViewModel> GetAll();

        ProvinceViewModel GetById(int id);
        void Add(ProvinceViewModel provinceVm);
        void Update(ProvinceViewModel provinceVm);
        void Delete(int id);
        void Save();
    }
}
