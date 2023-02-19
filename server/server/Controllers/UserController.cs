using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Cosmos;
using System.Text;
using User = server.Models.User;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Authorization;
using server.Services;

namespace server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly CosmosClient _client;
        readonly string databaseId;
        readonly string collectionId;
        public IConfiguration Configuration { get; }
        private readonly IUserService _userService;

        public UserController(CosmosClient client, IConfiguration configuration, IUserService userService)
        {
            _client = client;
            Configuration = configuration;

            databaseId = Configuration["DatabaseId"];
            collectionId = "User";

            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<IActionResult> AuthenticateUser([FromBody] User user)
        {
            User db_user = await _userService.Authenticate(user.Name, user.Pwd);
            if (db_user == null) return BadRequest("Invalid login Data");

            return Ok(user.Name);
        }

        [HttpPost("create")]
        public async Task<ActionResult<User>> CreateUser([FromBody] User user)
        {
            User db_user = _userService.GetUser(user.Name);
            if (db_user != null) return BadRequest("User already exists");

             // Generate a random salt value
            user.Salt = _userService.GenerateSalt();

            // hash password
            user.Pwd = _userService.HashPassword(user.Pwd, user.Salt);

            // store user
            await _client.GetContainer(databaseId, collectionId).CreateItemAsync<User>(user, new PartitionKey(user.Name));

            return Ok($"{user.Name} created successfully");
        }
    }
}
