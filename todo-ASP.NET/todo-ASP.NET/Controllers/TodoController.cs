using Microsoft.AspNetCore.Mvc;
using todo_ASP.NET.Data;
using todo_ASP.NET.Models;
using todo_ASP.NET.Dtos;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

namespace todo_ASP.NET.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController: ControllerBase
    {
        private readonly IDataRepository _dataRepository;
        private readonly IConfiguration _configuration;
        public TodoController(IDataRepository dataRepository, IConfiguration config)
        {
            _dataRepository = dataRepository;
            _configuration = config;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserDto userLogin)
        {

            try
            {
                User user = await Authenticate(userLogin);

                if (user != null && user.Password == userLogin.Password)
                {
                    string token = Generate(user);
                    return Ok(token);
                }
                return NotFound();
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        private async Task<User> Authenticate(UserDto userLogin)
        {
            User user = await _dataRepository.GetUser(userLogin);

            if (user != null )
            {
                return user;
            }
            return null;
        }

        private string Generate(User user)
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
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: credentials
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [Authorize]
        [HttpGet("projects/{userId}")]
        public async Task<ActionResult<IEnumerable<Project>>> GetProjects(int userId)
        {
            try
            {
                IEnumerable<Project> projects = await _dataRepository.GetProjects(userId);
                return Ok(projects);

            }
            catch (ArgumentNullException)
            {
                return NotFound();

            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpGet("get-project/{projectId}")]
        public async Task<ActionResult<Project>> GetProject(int projectId)
        {
            try
            {
                Project project = await _dataRepository.GetProject(projectId);
                return Ok(project);

            }catch (ArgumentNullException)
            {
                return NotFound();

            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpPost("create-project")]
        public async Task<ActionResult<Project>> AddProject(ProjectDto project)
        {
            try
            {
                Project newProject = await _dataRepository.AddProject(project);
                return CreatedAtAction(nameof(GetProject),
                    new { projectId = newProject.Id },
                    newProject);
            }
            catch (ArgumentNullException)
            {
                return NotFound();
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }

        [Authorize]
        [HttpDelete("delete-project/{projectId}")]
        public async Task<ActionResult> DeleteProject(int projectId)
        {
            try
            {
                await _dataRepository.DeleteProject(projectId);
                return NoContent();

            }
            catch (ArgumentNullException)
            {
                return NotFound();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpPut("put-project")]
        public async Task<ActionResult<Project>> PutProject(Project upProject)
        {
            try
            {
                Project newProject = await _dataRepository.PutProject(upProject);
                if (newProject == null)
                {
                    throw new ArgumentNullException();
                }
                return CreatedAtAction(nameof(GetProject),
                    new {projectId = newProject.Id},
                    newProject);

            }
            catch (ArgumentNullException)
            {
                return NotFound();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpGet("tasks/{projectId}")]
        public async Task<ActionResult<IEnumerable<Task_>>> GetTasks(int projectId)
        {
            try
            {
                IEnumerable<Task_> tasks = await _dataRepository.GetTasks(projectId);
                return Ok(tasks);

            }
            catch (ArgumentNullException)
            {
                return NotFound();

            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpGet("get-task/{taskId}")]
        public async Task<ActionResult<Task_>> GetTask(int taskId)
        {
            try
            {
                Task_ task = await _dataRepository.GetTask(taskId);
                return Ok(task);
            }
            catch (ArgumentNullException)
            {
                return NotFound();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpPost("create-task")]
        public async Task<ActionResult<Task_>> AddTask(TaskDto task)
        {
            try
            {
                Task_ newTask = await _dataRepository.AddTask(task);
                return CreatedAtAction(nameof(GetTask),
                    new {taskId = newTask.Id},
                    newTask);

            }
            catch (ArgumentNullException)
            {
                return NotFound();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpDelete("delete-task/{taskId}")]
        public async Task<ActionResult> DeleteTask(int taskId)
        {
            try
            {
               await _dataRepository.DeleteTask(taskId);
               return NoContent();

            }catch (ArgumentNullException)
            {
                return NotFound(taskId);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [Authorize]
        [HttpPut("put-task")]
        public async Task<ActionResult<Task_>> PutTask(Task_ upTask)
        {
            try
            {
                Task_ newTask = await _dataRepository.PutTask(upTask);
                if (newTask == null)
                {
                    throw new ArgumentNullException();
                }

                return CreatedAtAction(nameof(GetTask),
                    new {taskId = newTask.Id},
                    newTask);

            }
            catch (ArgumentNullException)
            {
                return NotFound();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
