using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using System;

namespace todoAPI.Models
{
    public class Task_
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [ForeignKey("FK_Project")]
        public int ProjectId { get; set; }

        [Required]
        [MaxLength(30)]
        [MinLength(5)]
        public string TaskName { get; set; }

        [DefaultValue(0)]
        public int Completed { get; set; }

        [MaxLength(100)]
        public string Notes { get; set; }

        [Required]
        public DateTime CreatedDateTime { get; set; }

        public DateTime CompletedDateTime { get; set; }
    }
}
