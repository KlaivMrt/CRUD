using Microsoft.AspNetCore.Mvc;
using todo_ASP.NET.Data;
using todo_ASP.NET.Models;
using todo_ASP.NET.Dtos;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
//using Microsoft.Extensions.Configuration;

namespace todo_ASP.NET.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController: ControllerBase
    {
        private readonly IDataRepository _dataRepository;
        public TodoController(IDataRepository dataRepository)
        {
            _dataRepository = dataRepository;
        }

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
