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
    [Table("Districts")]
    public class District : DomainEntity<int>, ISwitchable, IDateTracking
    {
        public District()
        {
            Wards = new List<Ward>();
            Streets = new List<Street>();
        }

        public District(int id, string name, int provinceId)
        {
            Id = id;
            Name = name;
            ProvinceId = provinceId;
            Wards = new List<Ward>();
            Streets = new List<Street>();
        }
        [Required]
        [MaxLength(256)]
        public string Name { set; get; }
        public Status Status { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        [Required]
        public int ProvinceId { get; set; }

        [ForeignKey("ProvinceId")]
        public virtual Province Province { set; get; }
        public virtual ICollection<Ward> Wards { set; get; }
        public virtual ICollection<Street> Streets { set; get; }
    }
}
