using Microsoft.EntityFrameworkCore;
using DashboardApi.Models;
using DashboardApi.Data;
using Microsoft.Extensions.DependencyInjection;
using AutoMapper;
using DashboardApi.Dtos;
using DashboardApi.MappingProfiles;
using System.Reflection;



var builder = WebApplication.CreateBuilder(args);

//INFO: An assembly is a dll or exe compiled from projects code.

//Here i running the mappings from MappingProfiles folder 
builder.Services.AddAutoMapper(Assembly.GetExecutingAssembly());

//registers the database context with the dependency injection container. 
//When your application requests an instance of Context, the container will provide it.
builder.Services.AddDbContext<Context>(options =>
//DefaultConnection is from appsettings.json
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")
        ?? throw new InvalidOperationException("Connection string not found.")));


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors((options) =>
    {
        options.AddPolicy("DevCors", (corsBuilder) =>
            {
                corsBuilder.WithOrigins("http://localhost:5173")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials();
            });
        options.AddPolicy("ProdCors", (corsBuilder) =>
            {
                corsBuilder.WithOrigins("https://myProductionSite.com")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials();
            });
    });
//###################################################
//scoped connection. IoC = Inversion of control container
//The IoC container manages the creation of these objects 
//and ensures that dependencies are correctly resolved. 
//Using IoC, we’re delegating the responsibility of dealing with the DI to ASP.NET
//Core native resources rather than doing it manually.
//####################################################

//AddScoped: a single instance of the service is created and used for the lifetime of a request
builder.Services.AddScoped<ISectionRepo, SectionRepo>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();

if (app.Environment.IsDevelopment())
{
    app.UseCors("DevCors");
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseCors("ProdCors");
    app.UseHttpsRedirection();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
