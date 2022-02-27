using System.ComponentModel.DataAnnotations;

namespace todo_ASP.NET.Dtos
{
    public class ProjectDto
    {
        [Required]
        public int UserId { get; set; }
        [Required]
        [StringLength(25)]
        public string ProjectName { get; set; }
    }
}
