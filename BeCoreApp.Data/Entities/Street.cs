using BeCoreApp.Data.Enums;
using BeCoreApp.Data.Interfaces;
using BeCoreApp.Infrastructure.SharedKernel;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace BeCoreApp.Data.Entities
{
    [Table("Streets")]
    public class Street : DomainEntity<int>, ISwitchable, IDateTracking
    {
        public Street()
        {
        }

        public Street(int id, string name, int provinceId, int districtId, int wardId)
        {
            Id = id;
            Name = name;
            ProvinceId = provinceId;
            DistrictId = districtId;
            WardId = wardId;
        }

        [Required]
        [MaxLength(256)]
        public string Name { set; get; }
        public Status Status { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        [Required]
        public int ProvinceId { get; set; }
        [Required]
        public int DistrictId { get; set; }
        [Required]
        public int WardId { get; set; }

        [ForeignKey("ProvinceId")]
        public virtual Province Province { set; get; }

        [ForeignKey("DistrictId")]
        public virtual District District { set; get; }

        [ForeignKey("WardId")]
        public virtual Ward Ward { set; get; }
    }
}
