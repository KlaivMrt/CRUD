using System.ComponentModel.DataAnnotations;

namespace todo_ASP.NET.Models
{
    public class Project
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        [StringLength(25)]
        public string ProjectName { get; set; }
    }
}
