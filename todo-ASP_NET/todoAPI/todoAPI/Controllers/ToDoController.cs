using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using todoAPI.Data;
using todoAPI.Dtos;
using todoAPI.Models;

namespace todoAPI.Controllers
{
    [Route("api/todo")]
    [ApiController]
    public class ToDoController: ControllerBase
    {
        private readonly IDataRepository _repository;

        public ToDoController(IDataRepository repository)
        {
            _repository = repository;
        }
        //------------------------------------------------------------------------------------
        // Project
        //------------------------------------------------------------------------------------


        // ------------------------------- Get ------------------------------- //


        [HttpGet("get-projects/{userId}")]
        public async Task<ActionResult<IEnumerable<Project>>> GetProjects(int userId)
        {
            try
            {
                IEnumerable<Project> projects = await _repository.GetProjects(userId);
                return Ok(projects);

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

        [HttpGet("get-project/{projectId}")]
        public async Task<ActionResult<Project>> GetProject(int projectId)
        {
            try
            {
                Project project = await _repository.GetProject(projectId);
                return Ok(project);

            }
            catch(ArgumentNullException ar)
            {
                return BadRequest(ar.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        // ------------------------------- Delete ------------------------------- //

        [HttpDelete("delete-projects/{userId}")]
        public async Task<ActionResult> DeleteAllProjects(int userId)
        {
            try
            {
                await _repository.DeleteAllProjects(userId);
                return NoContent();
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


        [HttpDelete("delete-project/{projectId}")]
        public async Task<ActionResult> DeleteProject(int projectId)
        {
            try
            {
                await _repository.DeleteProject(projectId);
                return NoContent();
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

        // ------------------------------- Add ------------------------------- //

        [HttpPost("add-project")]
        public async Task<ActionResult<Project>> AddProject(ProjectDto newProject)
        {
            try
            {
                Project _newProject = await _repository.AddProject(newProject);
                return CreatedAtAction(nameof(GetProject),
                    new { projectId = _newProject.Id},
                    _newProject);
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

        // ------------------------------- Put ------------------------------- //
        
        [HttpPut("put-project")]
        public async Task<ActionResult<Project>> PutProject(Project upProject)
        {
            try
            {
                Project _upProject = await _repository.PutProject(upProject);
                return CreatedAtAction(nameof(GetProject),
                            new {projectId = _upProject.Id},
                            _upProject);
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


        //------------------------------------------------------------------------------------
        // Task
        //------------------------------------------------------------------------------------

        // ------------------------------- Get ------------------------------- //
        
        [HttpGet("get-tasks/{projectId}")]
        public async Task<ActionResult<IEnumerable<Task_>>> GetTasks(int projectId)
        {
            try
            {
                IEnumerable<Task_> tasks = await _repository.GetTasks(projectId);
                return Ok(tasks);

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

        [HttpGet("get-task/{taskId}")]
        public async Task<ActionResult<Task_>> GetTask(int taskId)
        {
            try
            {
                Task_ task = await _repository.GetTask(taskId);
                return Ok(task);

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

        // ------------------------------- Delete ------------------------------- //
        
        [HttpDelete("delete-tasks/{projectId}")]
        public async Task<ActionResult> DeleteAllTask(int projectId)
        {
            try
            {
                await _repository.DeleteAllTasks(projectId);
                return NoContent();

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

        [HttpDelete("delete-task/{taskId}")]
        public async Task<ActionResult> DeleteTask(int taskId)
        {
            try
            {
                await _repository.DeleteTask(taskId);
                return NoContent();

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

        // ------------------------------- Add ------------------------------- //
        
        [HttpPost("add-task")]
        public async Task<ActionResult<Task_>> AddTask(TaskDto newTask)
        {
            try
            {
                Task_ _newTask = await _repository.AddTask(newTask);
                Console.WriteLine(_newTask.Id);
                return Ok(_newTask);
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

        // ------------------------------- Put ------------------------------- //
        
        public async Task<ActionResult<Task_>> PutTask(Task_ upTask)
        {

            try
            {
                Task_ _upTask = await _repository.PutTask(upTask);
                return CreatedAtAction(nameof(GetTask),
                    new {taskId = _upTask.Id},
                    _upTask);
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
    }
}
