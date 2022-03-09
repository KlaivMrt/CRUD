using System.Collections.Generic;
using System.Threading.Tasks;
using todoAPI.Dtos;
using todoAPI.Models;
using System.Linq;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using Dapper;

namespace todoAPI.Data
{
    public class DataRepository : IDataRepository
    {
        public readonly string _connectionString;
        public DataRepository(IConfiguration configuration)
        {
            _connectionString = configuration["ConnectionStrings:ToDoConnection"];
        }

        //------------------------------------------------------------------------------------
        // Project
        //------------------------------------------------------------------------------------


        // ------------------------------- Get ------------------------------- //


        public async Task<IEnumerable<Project>> GetProjects(int userId)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                IEnumerable<Project> projects = await connection.QueryAsync<Project>(@"exec Get_All_Projects_By_UserId @UserId = @UserId",
                                                                        new { UserId = userId });
                return projects;
            }
        }

        public async Task<Project> GetProject(int projectId)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                Project project = await connection.QueryFirstAsync<Project>(@"exec Get_Project @ProjectId = @Id",
                                        new { Id = projectId });
                return project;
            }
        }

        // ------------------------------- Delete ------------------------------- //


        public async Task<int> DeleteAllProjects(int userId)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                return await connection.ExecuteAsync(@"exec Delete_All_Projects_By_UserId @UserId = @Id",
                                            new { Id = userId });
            }
        }

        public async Task<int> DeleteProject(int projectId)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                return await connection.ExecuteAsync(@"exec Delete_Project @ProjectId = @Id",
                                            new { Id = projectId });
            }
        }

        // ------------------------------- Add ------------------------------- //


        public async Task<Project> AddProject(ProjectDto newProject)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                int id = await connection.QueryFirstAsync<int>(@"exec Add_Project @UserId = @UserId,
                                                                                  @ProjectName = @ProjectName,
                                                                                  @Active = @Active,
                                                                                  @Completed = @Completed,
                                                                                  @Notes = @Notes,
                                                                                  @CreatedDateTime = @CreatedDateTime,
                                                                                  @CompletedDateTime = @CompletedDateTime",
                                                                                  newProject);
                return await GetProject(id);
            }
        }


        // ------------------------------- Put ------------------------------- //


        public async Task<Project> PutProject(Project currentProject)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                Project project = await connection.QueryFirstAsync<Project>(@"exec Put_Project @Id = @Id,
                                                                                               @UserId = @UserId,
                                                                                               @ProjectName = @ProjectName,
                                                                                               @Active = @Active,
                                                                                               @Completed = @Completed,
                                                                                               @Notes = @Notes,
                                                                                               @CreatedDateTime = @CreatedDateTime,
                                                                                               @CompletedDateTime = @CompletedDateTime",
                                                                                               currentProject);
                return project;
            }
        }

        //------------------------------------------------------------------------------------
        // Task
        //------------------------------------------------------------------------------------

        // ------------------------------- Get ------------------------------- //

        public async Task<IEnumerable<Task_>> GetTasks(int projectId)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                IEnumerable<Task_> tasks = await connection.QueryAsync<Task_>(@"exec Get_All_Tasks_By_ProjectId @ProjectId = @ProjectId",
                                                                                        new { ProjectId = projectId });
                return tasks;
            }
        }

        public async Task<Task_> GetTask(int taskId)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                Task_ task = await connection.QueryFirstAsync<Task_>(@"exec Get_Task @TaskId = @TaskId", new { TaskId = taskId });
                System.Console.WriteLine(task.Id);
                return task;
            }
        }

        // ------------------------------- Delete ------------------------------- //

        public async Task<int> DeleteAllTasks(int projectId)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                return await connection.ExecuteAsync(@"exec Delete_All_Tasks_By_ProjectId @ProjectId = @ProjectId",
                                                        new { ProjectId = projectId });
            }
        }

        public async Task<int> DeleteTask(int taskId)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                return await connection.ExecuteAsync(@"exec Delete_Task @TaskId = @TaskId",
                                                        new { TaskId = taskId });
            }
        }

        // ------------------------------- Add ------------------------------- //

        public async Task<Task_> AddTask(TaskDto newTask)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                int id = await connection.QueryFirstAsync<int>(@"exec Add_Task @ProjectId = @ProjectId,
                                                                               @TaskName = @TaskName,
                                                                               @Completed = @Completed,
                                                                               @Notes = @Notes,
                                                                               @CreatedDateTime = @CreatedDateTime,
                                                                               @CompletedDateTime = @CompletedDateTime",
                                                                               newTask);
                return await GetTask(id);
            }
        }

        // ------------------------------- Put ------------------------------- //

        public async Task<Task_> PutTask(Task_ currenTask)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                Task_ task = await connection.QueryFirstAsync<Task_>(@"exec Put_Task @Id = @Id,
                                                                                     @ProjectId = @ProjectId,
                                                                                     @TaskName = @TaskName,
                                                                                     @Completed = @Completed,
                                                                                     @Notes = @Notes,
                                                                                     @CreatedDateTime = @CreatedDateTime,
                                                                                     @CompletedDateTime = @CompletedDateTime",
                                                                                     currenTask);
                return task;
            }
        }
    }



    //------------------------------------------------------------------------------------
    // UserEvents
    //------------------------------------------------------------------------------------

}
