using BeCoreApp.Application.ViewModels.Enterprise;
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
    public interface IEnterpriseService
    {
        PagedResult<EnterpriseViewModel> GetAllPaging(string startDate, string endDate, string keyword, int pageIndex, int pageSize);
        List<EnterpriseViewModel> GetAll();
        EnterpriseViewModel GetById(int id);
        void Add(EnterpriseViewModel enterpriseVm);
        void Update(EnterpriseViewModel enterpriseVm);
        void Delete(int id);
        void Save();
    }
}
