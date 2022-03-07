using System.ComponentModel.DataAnnotations;

namespace todoAPI.Dtos
{
    public class UserDto
    {
        [Required]
        [MinLength(5)]
        [MaxLength(15)]
        public string UserName { get; set; }

        [Required]
        [MinLength(6)]
        public string Password { get; set; }

        [Required]
        [MinLength(10)]
        public string Email { get; set; }
    }
}
