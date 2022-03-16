using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using todoAPI.Data;
using todoAPI.Dtos;
using todoAPI.Models;

namespace todoAPI.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;

        public UserController(IUserRepository userRepository, IConfiguration config)
        {
            _userRepository = userRepository;
            _configuration = config;
        }

        //------------------------------------------------------------------------------------
        // User
        //------------------------------------------------------------------------------------

        // -------------------------- Get -------------------------- //

        [HttpPost("sign-in")]
        public async Task<ActionResult<AuthDto>> SignIn(UserLoginDto userLogin)
        {
            try
            {
                User user = await Authenticate(userLogin);
                if (user == null)
                {
                    return BadRequest("This user doesn't exist or the credentials are wrong.");
                }

                AuthDto auth = GenerateJWT(user);

                return Ok(auth);
            }
            catch (ArgumentNullException ar)
            {
                return BadRequest(ar.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // -------------------------- Add -------------------------- //

        [HttpPost("sign-up")]
        public async Task<ActionResult<AuthDto>> SignUp(UserDto newUser)
        {
            try
            {
                string[] acceptedEmails = new string[] { "@gmail.com", "@yahoo.com" };

                for (int i = 0; i < acceptedEmails.Length; i++)
                {
                    if (newUser.Email.Contains(acceptedEmails[i]))
                    {
                        User _newUser = await _userRepository.GetUser(newUser);

                        if (_newUser != null)
                        {
                            return BadRequest("This email already exists.");
                        }
                        string salt = BCrypt.Net.BCrypt.GenerateSalt();
                        newUser.UserPassword = BCrypt.Net.BCrypt.HashPassword(newUser.UserPassword, salt);
                        _newUser = await _userRepository.CreatUser(newUser);

                        AuthDto auth = GenerateJWT(_newUser);

                        return CreatedAtAction(nameof(SignIn), auth);
                    }
                }

                return BadRequest("The email you've provided is not valid.");
            }
            catch (ArgumentNullException ar)
            {
                return BadRequest(ar.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // -------------------------- Delete -------------------------- //

        [HttpDelete("delete-user/{email}")]
        public async Task<ActionResult> DeleteUser(string email)
        {
            try
            {
                await _userRepository.DeleteUser(email);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // -------------------------- JWT -------------------------- //

        private async Task<User> Authenticate(UserLoginDto userLogin)
        {
            try
            {
                User user = await _userRepository.GetUser(userLogin);

                bool isPasswordValid = BCrypt.Net.BCrypt.Verify(userLogin.UserPassword, user.UserPassword);
                if (!isPasswordValid)
                {
                    return null;
                }
                return user;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return null;
            }
        }

        private AuthDto GenerateJWT(User user)
        {
            SymmetricSecurityKey securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            SigningCredentials credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.UserName),
                new Claim(ClaimTypes.Email, user.Email)
            };

            JwtSecurityToken token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credentials
                );

            AuthDto authDto = new AuthDto();
            authDto.Id = user.Id;
            authDto.UserName = user.UserName;
            authDto.UserPassword = user.UserPassword;
            authDto.Email = user.Email;
            authDto.Jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return authDto;
        }
    }
}
