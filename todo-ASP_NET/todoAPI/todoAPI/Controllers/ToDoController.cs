using Microsoft.AspNetCore.Mvc;
using todoAPI.Data;

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
        // User
        //------------------------------------------------------------------------------------



        //------------------------------------------------------------------------------------
        // Project
        //------------------------------------------------------------------------------------



        //------------------------------------------------------------------------------------
        // Task
        //------------------------------------------------------------------------------------


    }
}
