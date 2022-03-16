using System.Collections.Generic;
using System.Threading.Tasks;
using todoAPI.Models;
using todoAPI.Dtos;


namespace todoAPI.Data
{
    public interface IUserRepository
    {
        //------------------------------------------------------------------------------------
        // User
        //------------------------------------------------------------------------------------
        Task<User> GetUser(UserLoginDto userLogin);
        Task<User> GetUser(UserDto userLogin);
        Task<User> CreatUser(UserDto newUser);
        Task<int> DeleteUser(string email);

    }
}
