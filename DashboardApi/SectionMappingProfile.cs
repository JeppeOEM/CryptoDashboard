using AutoMapper;
using DashboardApi.Dtos;
using DashboardApi.Models;

public class SectionMappingProfile : Profile
{
    public SectionMappingProfile()
    {
        CreateMap<SectionDto, Section>();
        // Add more mappings as needed
    }
}