using AutoMapper;
using AutoMapper.QueryableExtensions;
using BeCoreApp.Application.Interfaces;
using BeCoreApp.Application.ViewModels.Enterprise;
using BeCoreApp.Data.Entities;
using BeCoreApp.Data.Enums;
using BeCoreApp.Data.IRepositories;
using BeCoreApp.Infrastructure.Interfaces;
using BeCoreApp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;

namespace BeCoreApp.Application.Implementation
{
    public class EnterpriseService : IEnterpriseService
    {
        private IEnterpriseRepository _enterpriseRepository;
        private IUnitOfWork _unitOfWork;

        public EnterpriseService(IEnterpriseRepository enterpriseRepository,
            IUnitOfWork unitOfWork)
        {
            _enterpriseRepository = enterpriseRepository;
            _unitOfWork = unitOfWork;
        }

        public PagedResult<EnterpriseViewModel> GetAllPaging(string startDate, string endDate, string keyword, int pageIndex, int pageSize)
        {
            var query = _enterpriseRepository.FindAll();
            if (!string.IsNullOrEmpty(startDate))
            {
                DateTime start = DateTime.ParseExact(startDate, "dd/MM/yyyy", CultureInfo.GetCultureInfo("vi-VN"));
                query = query.Where(x => x.DateCreated >= start);
            }
            if (!string.IsNullOrEmpty(endDate))
            {
                DateTime end = DateTime.ParseExact(endDate, "dd/MM/yyyy", CultureInfo.GetCultureInfo("vi-VN"));
                query = query.Where(x => x.DateCreated <= end);
            }
            if (!string.IsNullOrEmpty(keyword))
            {
                query = query.Where(x => x.Name.Contains(keyword));
            }

            var totalRow = query.Count();
            var data = query.OrderByDescending(x => x.DateCreated).Skip((pageIndex - 1) * pageSize).Take(pageSize)
                .ProjectTo<EnterpriseViewModel>().ToList();

            return new PagedResult<EnterpriseViewModel>()
            {
                CurrentPage = pageIndex,
                PageSize = pageSize,
                Results = data,
                RowCount = totalRow
            };
        }

        public List<EnterpriseViewModel> GetAll()
        {
            return _enterpriseRepository.FindAll().Where(x => x.Status == Status.Active)
                .ProjectTo<EnterpriseViewModel>().ToList();
        }
        public EnterpriseViewModel GetById(int id)
        {
            return Mapper.Map<Enterprise, EnterpriseViewModel>(_enterpriseRepository.FindById(id));
        }

        public void Add(EnterpriseViewModel districtVm)
        {
            var district = Mapper.Map<EnterpriseViewModel, Enterprise>(districtVm);
            _enterpriseRepository.Add(district);
        }

        public void Update(EnterpriseViewModel districtVm)
        {
            var district = Mapper.Map<EnterpriseViewModel, Enterprise>(districtVm);
            _enterpriseRepository.Update(district);
        }

        public void Delete(int id)
        {
            _enterpriseRepository.Remove(id);
        }

        public void Save()
        {
            _unitOfWork.Commit();
        }
    }
}
