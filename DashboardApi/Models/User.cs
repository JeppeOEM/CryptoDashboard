namespace DashboardApi.Models;
using System.ComponentModel.DataAnnotations;


public partial class User
{
    [Key]
    public int UserId { get; set; }
    [StringLength(50)]
    public string FirstName { get; set; }

    [StringLength(50)]
    public string LastName { get; set; }

    [StringLength(100)]
    public string Email { get; set; }
    public bool Active { get; set; }

    //By providing a parameterless constructor, you ensure that instances of the User
    //class can be created without explicitly passing values for its properties
    public User()
    {
        FirstName ??= "";
        LastName ??= "";
        Email ??= "";
    }
}
