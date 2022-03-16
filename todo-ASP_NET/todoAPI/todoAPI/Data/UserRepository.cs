using Dapper;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Threading.Tasks;
using todoAPI.Dtos;
using todoAPI.Models;

namespace todoAPI.Data
{
    public class UserRepository : IUserRepository
    {
        public readonly string _connectionString;
        public UserRepository(IConfiguration configuration)
        {
            _connectionString = configuration["ConnectionStrings:ToDoConnection"];
        }

        //------------------------------------------------------------------------------------
        // User
        //------------------------------------------------------------------------------------

        // -------------------------- Get -------------------------- //
        public async Task<User> GetUser(UserLoginDto userLogin)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                User user = await connection.QueryFirstOrDefaultAsync<User>(@"exec Get_User @Email = @Email", new { Email = userLogin.Email });
                return user;
            }
        }

        public async Task<User> GetUser(UserDto userLogin)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                User user = await connection.QueryFirstOrDefaultAsync<User>(@"exec Get_User @Email = @Email", new { Email = userLogin.Email });
                return user;
            }
        }

        // -------------------------- Add -------------------------- //

        public async Task<User> CreatUser(UserDto newUser)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                User _newUser = await connection.QueryFirstAsync<User>(@"exec Add_User @UserName = @UserName,
                                                                                       @UserPassword = @UserPassword,
                                                                                       @Email = @Email",
                                                                                       newUser);
                return _newUser;
            }
        }

        // -------------------------- Delete -------------------------- //
        public async Task<int> DeleteUser(string email)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                return await connection.ExecuteAsync(@"exec Delete_User @Email = @Email", new {Email = email});
            }
        }
    }
}
