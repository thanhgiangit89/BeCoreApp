using AutoMapper;
using BeCoreApp.Application.ViewModels.Blog;
using BeCoreApp.Application.ViewModels.Common;
using BeCoreApp.Application.ViewModels.Enterprise;
using BeCoreApp.Application.ViewModels.Location;
using BeCoreApp.Application.ViewModels.Product;
using BeCoreApp.Application.ViewModels.Project;
using BeCoreApp.Application.ViewModels.RealEstate;
using BeCoreApp.Application.ViewModels.System;
using BeCoreApp.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace BeCoreApp.Application.AutoMapper
{
    public class ViewModelToDomainMappingProfile : Profile
    {
        public ViewModelToDomainMappingProfile()
        {
            CreateMap<ProductCategoryViewModel, ProductCategory>()
                .ConstructUsing(c => new ProductCategory(c.Name, c.Description,
                c.ParentId, c.HomeOrder, c.Image, c.HomeFlag,
                c.SortOrder, c.Status, c.SeoPageTitle, c.SeoAlias, c.SeoKeywords, c.SeoDescription));

            CreateMap<ProductViewModel, Product>()
           .ConstructUsing(c => new Product(c.Name, c.CategoryId, c.Image, c.Price,
           c.OriginalPrice, c.PromotionPrice, c.Description,
           c.Content, c.HomeFlag, c.HotFlag, c.Tags, c.Unit, c.Status, c.SeoPageTitle,
           c.SeoAlias, c.SeoKeywords, c.SeoDescription));

            CreateMap<AppUserViewModel, AppUser>()
            .ConstructUsing(c => new AppUser(c.Id.GetValueOrDefault(Guid.Empty),
            c.FullName, c.UserName, c.Email, c.PhoneNumber, c.Avatar, c.Status));

            CreateMap<PermissionViewModel, Permission>()
            .ConstructUsing(c => new Permission(c.RoleId, c.FunctionId, c.CanCreate,
            c.CanRead, c.CanUpdate, c.CanDelete));


            CreateMap<BillViewModel, Bill>()
              .ConstructUsing(c => new Bill(c.Id, c.CustomerName, c.CustomerAddress,
              c.CustomerMobile, c.CustomerMessage, c.BillStatus,
              c.PaymentMethod, c.Status, c.CustomerId));

            CreateMap<BillDetailViewModel, BillDetail>()
              .ConstructUsing(c => new BillDetail(c.Id, c.BillId, c.ProductId,
              c.Quantity, c.Price, c.ColorId, c.SizeId));

            CreateMap<ContactViewModel, Contact>()
                .ConstructUsing(c => new Contact(c.Id, c.Name, c.Phone,
                c.Email, c.Website, c.Address, c.Other, c.Lng, c.Lat, c.Status));

            CreateMap<FeedbackViewModel, Feedback>()
                .ConstructUsing(c => new Feedback(c.Id, c.Name, c.Email, c.Message, c.Status));

            CreateMap<PageViewModel, Page>()
                .ConstructUsing(c => new Page(c.Id, c.Name, c.Alias, c.Content, c.Status));

            CreateMap<ProvinceViewModel, Province>()
                .ConstructUsing(c => new Province(c.Id, c.Name));

            CreateMap<DistrictViewModel, District>()
                .ConstructUsing(c => new District(c.Id, c.Name, c.ProvinceId));

            CreateMap<WardViewModel, Ward>()
                .ConstructUsing(c => new Ward(c.Id, c.Name, c.DistrictId, c.ProvinceId));

            CreateMap<StreetViewModel, Street>()
                .ConstructUsing(c => new Street(c.Id, c.Name, c.ProvinceId, c.DistrictId, c.WardId));

            CreateMap<TypeViewModel, BeCoreApp.Data.Entities.Type>()
                .ConstructUsing(c => new BeCoreApp.Data.Entities.Type(c.Id, c.Name));

            CreateMap<UnitViewModel, Unit>()
                .ConstructUsing(c => new Unit(c.Id, c.Name, c.TypeId));

            CreateMap<ClassifiedCategoryViewModel, ClassifiedCategory>()
                .ConstructUsing(c => new ClassifiedCategory(c.Id, c.Name, c.TypeId));

            CreateMap<DirectionViewModel, Direction>()
                .ConstructUsing(c => new Direction(c.Id, c.Name));

            CreateMap<ProjectCategoryViewModel, ProjectCategory>()
                .ConstructUsing(c => new ProjectCategory(c.Id, c.Name));

            CreateMap<FieldViewModel, Field>()
    .ConstructUsing(c => new Field(c.Id, c.Name));

            CreateMap<EnterpriseViewModel, Enterprise>()
                .ConstructUsing(c => new Enterprise(c.Id, c.Name));
        }
    }
}
