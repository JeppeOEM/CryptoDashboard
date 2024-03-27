using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DashboardApi.Data;
using DashboardApi.Models;
using DashboardApi.Dtos;
using AutoMapper;

namespace DashboardApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SectionsController : ControllerBase
    {
        private readonly ISectionRepo _sectionRepo;
        private readonly IMapper _mapper;

        public SectionsController(ISectionRepo sectionRepo, IMapper mapper)
        {
            _sectionRepo = sectionRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SectionDto>>> GetSections()
        {
            var sections = await _sectionRepo.GetSections();
            var sectionDtos = _mapper.Map<IEnumerable<SectionDto>>(sections);
            return Ok(sectionDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SectionDto>> GetSection(long id)
        {
            var section = await _sectionRepo.GetSectionById(id);
            if (section == null)
            {
                return NotFound();
            }

            var sectionDto = _mapper.Map<SectionDto>(section);
            return sectionDto;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutSection(long id, SectionDto sectionDto)
        {
            var section = await _sectionRepo.GetSectionById(id);
            if (section == null)
            {
                return NotFound();
            }

            _mapper.Map(sectionDto, section);

            try
            {
                await _sectionRepo.UpdateSection(section);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _sectionRepo.SectionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<SectionDto>> PostSection(SectionDto sectionDto)
        {
            var section = _mapper.Map<Section>(sectionDto);
            await _sectionRepo.AddSection(section);

            var createdSectionDto = _mapper.Map<SectionDto>(section);
            return CreatedAtAction(nameof(GetSection), new { id = createdSectionDto.GridConfig }, createdSectionDto);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSection(long id)
        {
            var section = await _sectionRepo.GetSectionById(id);
            if (section == null)
            {
                return NotFound();
            }

            await _sectionRepo.DeleteSection(section);

            return NoContent();
        }
    }
}
