using System.ComponentModel.DataAnnotations;

namespace todo_ASP.NET.Models
{
    public class Task_
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int ProjectId { get; set; }
        [Required]
        [StringLength(25)]
        public string TaskName { get; set; }
    }
}
