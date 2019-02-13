using BeCoreApp.Data.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace BeCoreApp.Application.ViewModels.Location
{
    public class WardViewModel
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(256)]
        public string Name { set; get; }
        [Required]
        public int DistrictId { get; set; }
        [Required]
        public int ProvinceId { get; set; }
        public Status Status { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public DistrictViewModel District { set; get; }
        public ProvinceViewModel Province { set; get; }
        public ICollection<StreetViewModel> Streets { set; get; }
    }
}
