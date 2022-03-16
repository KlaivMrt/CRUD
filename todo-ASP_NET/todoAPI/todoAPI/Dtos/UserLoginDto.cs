using System.ComponentModel.DataAnnotations;

namespace todoAPI.Dtos
{
    public class UserLoginDto
    {
        [Required]
        [MinLength(6)]
        public string UserPassword { get; set; }

        [Required]
        [MinLength(10)]
        public string Email { get; set; }
    }
}
