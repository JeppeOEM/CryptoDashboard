using System.Collections.Generic;
using System.Threading.Tasks;
using DashboardApi.Models;
using Microsoft.EntityFrameworkCore;

namespace DashboardApi.Data
{
    public interface ISectionRepo
    {
        Task<IEnumerable<Section>> GetSections();
        Task<Section> GetSectionById(long id);
        Task AddSection(Section section);
        Task UpdateSection(Section section);
        Task DeleteSection(Section section);
        Task<bool> SectionExists(long id);
    }

}
