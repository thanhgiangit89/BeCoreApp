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
    public interface IStreetService
    {
        PagedResult<StreetViewModel> GetAllPaging(string startDate, string endDate, string keyword,
            int provinceId, int districtId, int wardId, int pageIndex, int pageSize);
        List<StreetViewModel> GetAll();

        StreetViewModel GetById(int id);
        void Add(StreetViewModel streetVm);
        void Update(StreetViewModel streetVm);
        void Delete(int id);
        void Save();
    }
}
