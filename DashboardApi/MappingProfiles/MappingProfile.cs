using AutoMapper;
using DashboardApi.Dtos;
using DashboardApi.Models;

namespace DashboardApi.MappingProfiles
{
    public class SectionProfile : Profile
    {
        public SectionProfile()
        {
            CreateMap<Section, SectionDto>();
            CreateMap<SectionDto, Section>();
        }
    }
}