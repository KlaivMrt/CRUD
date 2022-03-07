using System.Collections.Generic;
using System.Threading.Tasks;
using todoAPI.Models;
using todoAPI.Dtos;

namespace todoAPI.Data
{
    public interface IDataRepository
    {
        //------------------------------------------------------------------------------------
        // User
        //------------------------------------------------------------------------------------
        Task<User> GetUser();
        Task<User> CreatUser();

        //------------------------------------------------------------------------------------
        // Project
        //------------------------------------------------------------------------------------
        Task<IEnumerable<Project>> GetProjects(int userId);
        Task<Project> GetProject(int projectId);
        Task<Project> AddProject(ProjectDto newProject);
        Task<int> DeleteProject(int projectId);
        Task<Project> PutProject(Project currentProject);

        //------------------------------------------------------------------------------------
        // Task
        //------------------------------------------------------------------------------------
        Task<IEnumerable<Task_>> GetTasks(int projectId);
        Task<Task_> GetTask(int taskId);
        Task<Task> AddTask(TaskDto newTask);
        Task<int> DeleteTask(int taskId);
        Task<Task_> PutTask(Task_ task);
    }
}
