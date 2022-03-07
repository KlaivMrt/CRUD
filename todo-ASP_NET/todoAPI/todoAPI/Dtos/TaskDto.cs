using System.ComponentModel.DataAnnotations;
using System;

namespace todoAPI.Dtos
{
    public class TaskDto
    {
        [Required]
        public int ProjectId { get; set; }

        [Required]
        [MaxLength(30)]
        [MinLength(5)]
        public string TaskName { get; set; }

        [Required]
        public int Completed { get; set; }

        [MaxLength(100)]
        public string Notes { get; set; }

        [Required]
        public DateTime CreatedDateTime { get; set; }

        public DateTime CompletedDateTime { get; set; }
    }
}
