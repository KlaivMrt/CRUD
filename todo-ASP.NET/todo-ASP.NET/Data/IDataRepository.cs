using System.Collections.Generic;
using todo_ASP.NET.Models;
using todo_ASP.NET.Dtos;
using System.Threading.Tasks;

namespace todo_ASP.NET.Data
{
    public interface IDataRepository
    {
        Task<IEnumerable<Project>> GetProjects(int userId);
        Task<Project> GetProject(int projectId);
        Task<Project> AddProject(ProjectDto project);
        Task<int> DeleteProject(int projectId);
        Task<Project> PutProject(Project project);

        Task<IEnumerable<Task_>> GetTasks(int projectId);
        Task<Task_> GetTask(int taskId);
        Task<Task_> AddTask(TaskDto project);
        Task<int> DeleteTask(int projectId);
        Task<Task_> PutTask(Task_ task);

        Task<User> GerUser();

    }
}
