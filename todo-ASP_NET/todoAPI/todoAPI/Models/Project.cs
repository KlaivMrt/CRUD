using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace todoAPI.Models
{
    public class Project
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [ForeignKey("FK_User")]
        public int UserId{ get; set; }

        [Required]
        [MaxLength(50)]
        [MinLength(5)]
        public string ProjectName { get; set; }

        [Required]
        [DefaultValue(1)]
        public int Active { get; set; }

        [DefaultValue(0)]
        public int Completed { get; set; }

        [DefaultValue(null)]
        [MaxLength(150)]
        public string Notes { get; set; }

        [Required]
        public DateTime CreatedDateTime { get; set; }

        public DateTime CompletedDateTime { get; set; }

        public List<Task_> Tasks { get; set; }
    }
}
