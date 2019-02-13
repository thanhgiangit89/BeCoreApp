using BeCoreApp.WebAPI.Dapper.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BeCoreApp.WebAPI.Dapper.Dtos
{
    public class PagedResult<T>
    {
        public PagedResult()
        {
            Items = new List<T>();
        }
        public List<T> Items { get; set; }
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public int TotalRow { get; set; }
    }
}
