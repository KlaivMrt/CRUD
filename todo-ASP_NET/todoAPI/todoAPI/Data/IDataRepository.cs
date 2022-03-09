using System.Collections.Generic;
using System.Threading.Tasks;
using todoAPI.Models;
using todoAPI.Dtos;

namespace todoAPI.Data
{
    public interface IDataRepository
    {

        //------------------------------------------------------------------------------------
        // Project
        //------------------------------------------------------------------------------------
        Task<IEnumerable<Project>> GetProjects(int userId);
        Task<Project> GetProject(int projectId);
        Task<int> DeleteAllProjects(int userId);
        Task<int> DeleteProject(int projectId);
        Task<Project> AddProject(ProjectDto newProject);
        Task<Project> PutProject(Project currentProject);

        //------------------------------------------------------------------------------------
        // Task
        //------------------------------------------------------------------------------------
        Task<IEnumerable<Task_>> GetTasks(int projectId);
        Task<Task_> GetTask(int taskId);
        Task<int> DeleteAllTasks(int projectId);
        Task<int> DeleteTask(int taskId);
        Task<Task_> AddTask(TaskDto newTask);
        Task<Task_> PutTask(Task_ currentTask);

        //------------------------------------------------------------------------------------
        // UserEvents
        //------------------------------------------------------------------------------------
    }
}
