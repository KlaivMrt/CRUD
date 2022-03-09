using System.ComponentModel.DataAnnotations;
using todoAPI.Models;

namespace todoAPI.Dtos
{
    public class AuthDto : User
    {
        public string Jwt { get; set; }
    }
}
