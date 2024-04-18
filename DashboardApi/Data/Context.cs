//System.ComponentModel.DataAnnotations; 
//is a library used for data annotations to define validation rules, specify database constraints

using System.ComponentModel.DataAnnotations;
// is used for defining schema information for database entities. 
//It includes attributes like Table, Column, ForeignKey, DatabaseGenerated, NotMapped, 
//and InverseProperty to specify how properties are mapped to database tables and columns
using System.ComponentModel.DataAnnotations.Schema;
using DashboardApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace DashboardApi.Data;

//inherits from DBContext
//DBContext is EF class for making connection to DB
public class Context : DbContext
{
    private IConfiguration _config;

    public Context(IConfiguration config)
    {
        _config = config;
    }

    //In Entity Framework, the DbSet<T> class is typically used to represent a table in a database.
    // structure is defined in the "schemas" Stock / Company
    public virtual DbSet<Section> Sections { get; set; } = default!;
    public virtual DbSet<User> Users { get; set; } = default!;


    //default;
    // For reference types(classes, interfaces, delegates) the default value is null. 
    //For numeric types(such as int, float, etc.), 
    // the default value is 0. For bool, it's falsew, and for char, it's '\0'.

    // public IQueryable<IntervalResult> GetWeeklyResults(DateTime value)
    // {
    //     if (value.Kind != DateTimeKind.Utc)
    //     {
    //         // Read this and cry https://www.npgsql.org/doc/types/datetime.html
    //         throw new ArgumentException("DateTime.Kind must be of UTC to convert to timestamp with time zone");
    //     }

    //     return FromExpression(() => GetWeeklyResults(value));
    // }

    //is called by EntityFramework when it needs to create a new instance of DBContextOptionsBuilder AKA when DbContext is called
    //a way to connect
    protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options
            // .UseNpgsql(connectionString: "Server=localhost;User Id=postgres;Password=password;Database=postgres;");
            .UseNpgsql(_config.GetConnectionString("DefaultConnection"), optionsBuilder => optionsBuilder.EnableRetryOnFailure());
    // .UseNpgsql(connectionString: _config.GetConnectionString("TimescaleConnection"), options => options.EnableRetryOnFailure());

    //.LogTo(Console.WriteLine)


    //Will map
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // modelBuilder
        //     .HasDbFunction(typeof(StocksDbContext).GetMethod(nameof(GetWeeklyResults), new[] { typeof(DateTime) })!)
        //     .HasName("get_weekly_results")
        //     .IsBuiltIn(false);

        // modelBuilder.HasDefaultSchema()
    }
}

