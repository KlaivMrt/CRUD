using System.ComponentModel.DataAnnotations;
using System;

namespace todoAPI.Dtos
{
    public class ProjectDto
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        [MaxLength(50)]
        [MinLength(5)]
        public string ProjectName { get; set; }

        [Required]
        [MaxLength(150)]
        public string Notes { get; set; }

        [Required]
        public DateTime CreatedDatetime { get; set; }

        public DateTime CompletedDateTime { get; set; }
    }
}
