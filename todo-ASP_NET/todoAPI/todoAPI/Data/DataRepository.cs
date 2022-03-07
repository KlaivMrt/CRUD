using System.Collections.Generic;
using System.Threading.Tasks;
using todoAPI.Dtos;
using todoAPI.Models;
using System.Linq;


namespace todoAPI.Data
{
    public class DataRepository : IDataRepository
    {
        //------------------------------------------------------------------------------------
        // User
        //------------------------------------------------------------------------------------
        public async Task<User> GetUser()
        {
            throw new System.NotImplementedException();
        }

        public async Task<User> CreatUser()
        {
            throw new System.NotImplementedException();
        }

        //------------------------------------------------------------------------------------
        // Project
        //------------------------------------------------------------------------------------

        public async Task<IEnumerable<Project>> GetProjects(int userId)
        {
            throw new System.NotImplementedException();
        }

        public async Task<Project> GetProject(int projectId)
        {
            throw new System.NotImplementedException();
        }

        public async Task<Project> AddProject(ProjectDto newProject)
        {
            throw new System.NotImplementedException();
        }

        public async Task<int> DeleteProject(int projectId)
        {
            throw new System.NotImplementedException();
        }

        public async Task<Project> PutProject(Project currentProject)
        {
            throw new System.NotImplementedException();
        }

        //------------------------------------------------------------------------------------
        // Task
        //------------------------------------------------------------------------------------


        public async Task<IEnumerable<Task_>> GetTasks(int projectId)
        {
            throw new System.NotImplementedException();
        }

        public async Task<Task_> GetTask(int taskId)
        {
            throw new System.NotImplementedException();
        }

        public async Task<Task> AddTask(TaskDto newTask)
        {
            throw new System.NotImplementedException();
        }

        public async Task<int> DeleteTask(int taskId)
        {
            throw new System.NotImplementedException();
        }

        public async Task<Task_> PutTask(Task_ task)
        {
            throw new System.NotImplementedException();
        }
    }
}
