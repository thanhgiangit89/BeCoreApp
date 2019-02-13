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
    [Table("ClassifiedCategories")]
    public class ClassifiedCategory : DomainEntity<int>, ISwitchable, IDateTracking
    {
        public ClassifiedCategory()
        {
        }

        public ClassifiedCategory(int id, string name, int typeId)
        {
            Id = id;
            Name = name;
            TypeId = typeId;
        }

        [Required]
        [MaxLength(256)]
        public string Name { set; get; }
        public Status Status { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public int TypeId { get; set; }

        [ForeignKey("TypeId")]
        public virtual Type Type { set; get; }
    }
}
