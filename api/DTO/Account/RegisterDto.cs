using System.ComponentModel.DataAnnotations;

namespace api.DTO.Account;

public class RegisterDto
{
    [Required]
    public String? UserName { get; set; } 
    [Required]
    [EmailAddress]
    public String? Email { get; set; } 
    [Required] 
    public String? Password { get; set; }
}