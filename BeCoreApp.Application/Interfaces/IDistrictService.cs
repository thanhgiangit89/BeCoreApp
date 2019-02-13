﻿using BeCoreApp.Application.ViewModels.Location;
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
    public interface IDistrictService
    {
        PagedResult<DistrictViewModel> GetAllPaging(string startDate, string endDate, string keyword,int provinceId,
            int pageIndex, int pageSize);
        List<DistrictViewModel> GetAll();
        List<DistrictViewModel> GetAllByProvinceId(int provinceId);
        DistrictViewModel GetById(int id);
        void Add(DistrictViewModel districtVm);
        void Update(DistrictViewModel districtVm);
        void Delete(int id);
        void Save();
    }
}