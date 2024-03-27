using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DashboardApi.Data;
using DashboardApi.Models;
using Microsoft.EntityFrameworkCore;

namespace DashboardApi.Data
{
    public class SectionRepo : ISectionRepo
    {
        private readonly Context _context;

        public SectionRepo(Context context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Section>> GetSections()
        {
            return await _context.Sections.ToListAsync();
        }

        public async Task<Section> GetSectionById(long id)
        {
            var section = await _context.Sections.FindAsync(id) 
            ?? throw new Exception($"Section with ID {id} not found.");
            
            return section;
        }

        public async Task AddSection(Section section)
        {
            _context.Sections.Add(section);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateSection(Section section)
        {
            _context.Entry(section).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteSection(Section section)
        {
            _context.Sections.Remove(section);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> SectionExists(long id)
        {
            return await _context.Sections.AnyAsync(e => e.Id == id);
        }




    }
}