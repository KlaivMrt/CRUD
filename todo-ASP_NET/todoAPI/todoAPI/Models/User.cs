using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace todoAPI.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MinLength(5)]
        [MaxLength(15)]
        public string UserName { get; set; }

        [Required]
        public string UserPassword { get; set; }

        [Required]
        [MinLength(10)]
        public string Email { get; set; }

        public List<Project> Projects { get; set; }
    }
}
