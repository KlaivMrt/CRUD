using System.ComponentModel.DataAnnotations;

namespace todo_ASP.NET.Dtos
{
    public class UserDto
    {
        [Required]
        public string Password { get; set; }
        [Required]
        [StringLength(25)]
        public string Email { get; set; }
    }
}
