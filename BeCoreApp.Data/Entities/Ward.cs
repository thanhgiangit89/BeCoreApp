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
    [Table("Wards")]
    public class Ward : DomainEntity<int>, ISwitchable, IDateTracking
    {
        public Ward()
        {
            Streets = new List<Street>();
        }

        public Ward(int id, string name, int districtId, int provinceId)
        {
            Id = id;
            Name = name;
            DistrictId = districtId;
            ProvinceId = provinceId;
            Streets = new List<Street>();

        }

        [Required]
        [MaxLength(256)]
        public string Name { set; get; }
        public Status Status { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        [Required]
        public int DistrictId { get; set; }
        [Required]
        public int ProvinceId { get; set; }

        [ForeignKey("DistrictId")]
        public virtual District District { set; get; }
        [ForeignKey("ProvinceId")]
        public virtual Province Province { set; get; }
        public virtual ICollection<Street> Streets { set; get; }
    }
}
