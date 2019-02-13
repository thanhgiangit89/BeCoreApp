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
    [Table("Provinces")]
    public class Province : DomainEntity<int>, ISwitchable, IDateTracking
    {
        public Province()
        {
            Districts = new List<District>();
            Wards = new List<Ward>();
            Streets = new List<Street>();
        }

        public Province(int id, string name)
        {
            Id = id;
            Name = name;
            Districts = new List<District>();
            Wards = new List<Ward>();
            Streets = new List<Street>();
        }

        [Required]
        [MaxLength(256)]
        public string Name { set; get; }
        public Status Status { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }

        public virtual ICollection<District> Districts { set; get; }
        public virtual ICollection<Ward> Wards { set; get; }
        public virtual ICollection<Street> Streets { set; get; }
    }
}
