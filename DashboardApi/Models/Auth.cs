namespace DashboardApi.Models;
using System.ComponentModel.DataAnnotations;

partial class Auth


{
    [Key]
    public int Id { get; set; }

    [Required]
    [EmailAddress]
    [StringLength(100)]
    public string Email { get; set; }

    [Required]
    [StringLength(128)] // Length of a SHA512 hash
    public string PasswordHash { get; set; }

    [Required]
    [StringLength(128)] // Length of salt for SHA512
    public string PasswordSalt { get; set; }
    public Auth()
    {
        Email ??= "";
        PasswordHash ??= "";
        PasswordSalt ??= "";

    }
}