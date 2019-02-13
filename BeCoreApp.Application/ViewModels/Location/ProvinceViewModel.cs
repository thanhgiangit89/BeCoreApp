using BeCoreApp.Data.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace BeCoreApp.Application.ViewModels.Location
{
    public class ProvinceViewModel
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(256)]
        public string Name { set; get; }
        public Status Status { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }

        public ICollection<DistrictViewModel> Districts { set; get; }
        public ICollection<WardViewModel> Wards { set; get; }
        public ICollection<StreetViewModel> Streets { set; get; }
    }
}
