using Microsoft.Extensions.Configuration;
using Microsoft.Data.SqlClient;
using Dapper;
using todo_ASP.NET.Models;
using todo_ASP.NET.Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace todo_ASP.NET.Data
{
    public class DataRepository : IDataRepository
    {
        public readonly string _connectionString;
        public DataRepository(IConfiguration configuration)
        {
            _connectionString = configuration["ConnectionStrings:DefaultConnection"];
        }
        public async Task<User> GetUser(UserDto userLogin)
        {
            Console.WriteLine(userLogin.Email != null ? userLogin.Email : "no email");
            Console.WriteLine(userLogin.Password != null ? userLogin.Password : "no password");
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                User user = await connection.QueryFirstAsync<User>(@"exec Get_User @Email = @Email", new { Email = userLogin.Email });
                return user;
            }
        }

        public async Task<IEnumerable<Project>> GetProjects(int userId)
        {
            using(SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                IEnumerable<Project> response = await connection.QueryAsync<Project>(@"exec Get_All_Projects_By_UserId @UserId = @UserId",
                    new {UserId = userId});
                return response;
            }
        }

        public async Task<Project> GetProject(int projectId)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                Project response = await connection.QueryFirstAsync<Project>(@"exec Get_Project @ProjectId = @Id", new {Id = projectId});
                return response;
            }
        }

        public async Task<Project> AddProject(ProjectDto project)
        {
            Console.WriteLine(project.UserId + " " + project.ProjectName);
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                int result = await connection.QueryFirstOrDefaultAsync<int>(@"exec Add_Project
                                                    @UserId = @UserId,
                                                    @ProjectName = @ProjectName",
                                                    project);
                return await GetProject(result);
            }
        }

        public async Task<int> DeleteProject(int projectId)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                int result = await connection.ExecuteAsync(@"exec Delete_Project @ProjectId = @Id",
                                                     new {Id = projectId});

                return result;
            }
        }

        public async Task<Project> PutProject(Project upProject)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                Project result = await connection.QueryFirstOrDefaultAsync<Project>(@"exec Put_Project @ProjectId = @Id, @UserId = @UserId, @ProjectName = @ProjectName", upProject);
                return result;
            }
        }

        public async Task<IEnumerable<Task_>> GetTasks(int projectId)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                IEnumerable<Task_> response = await connection.QueryAsync<Task_>(@"exec Get_All_Tasks_By_ProjectId @ProjectId = @Id", new { Id = projectId });
                return response;
            }
        }

        public async Task<Task_> GetTask(int taskId)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                Task_ response = await connection.QueryFirstAsync<Task_>(@"exec Get_Task @TaskId = @Id", new {Id = taskId});
                return response;
            }
        }

        public async Task<Task_> AddTask(TaskDto task)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                int result = await connection.QueryFirstOrDefaultAsync<int>(@"exec Add_Task @ProjectId = @ProjectId,
                                                    @TaskName = @TaskName",
                                                    task);
                return await GetTask(result);
            }
        }

        public async Task<int> DeleteTask(int taskId)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                int result = await connection.ExecuteAsync(@"exec Delete_Task @TaskId = @Id",
                                                      new {Id = taskId});
                return result;
            }
        }

        public async Task<Task_> PutTask(Task_ upTask)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                Task_ result = await connection.QueryFirstOrDefaultAsync<Task_>(@"exec Put_Task @TaskId = @Id, @ProjectId = @ProjectId, @TaskName = @TaskName", upTask);
                return result;
            }

        }
    }   
}
