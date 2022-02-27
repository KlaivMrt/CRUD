using System.ComponentModel.DataAnnotations;

namespace todo_ASP.NET.Dtos
{
    public class TaskDto
    {
        [Required]
        public int ProjectId { get; set; }
        [Required]
        [StringLength(25)]
        public string TaskName { get; set; }
    }
}
