using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Cosmos;
using System.Text;
using User = server.Models.User;
using System.Security.Cryptography;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly CosmosClient _client;
        readonly string databaseId;
        readonly string collectionId;
        public IConfiguration Configuration { get; }

        public UserController(CosmosClient client, IConfiguration configuration)
        {
            _client = client;
            Configuration = configuration;

            databaseId = Configuration["DatabaseId"];
            collectionId = "User";
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> AuthenticateUser([FromBody] User user)
        {
            var db_user = GetUser(user.Name);
            if (db_user == null)
            {
                return BadRequest("Bad Username");
            }
            var salt = db_user.Salt;
            var expectedHashedPassword = db_user.Pwd;

            // Hash the password with the same salt and compare it to the expected hashed password
            var hashedPassword = HashPassword(user.Pwd, salt);
            if (!hashedPassword.Equals(expectedHashedPassword))
            {
                return BadRequest("Bad Password");
            }

            return Ok();
        }

        [HttpPost("create_user")]
        public async Task<ActionResult<User>> CreateUser([FromBody] User user)
        {
             // Generate a random salt value
            user.Salt = GenerateSalt();

            // hash password
            user.Pwd = HashPassword(user.Pwd, user.Salt);

            // store user
            await _client.GetContainer(databaseId, collectionId).CreateItemAsync<User>(user, new PartitionKey(user.Name));

            return Ok($"{user.Name} created successfully");
        }

        private User GetUser(string name)
        {
            var container = _client.GetContainer(databaseId, collectionId);

            var userQuery = container.GetItemQueryIterator<User>(
                new QueryDefinition("SELECT * FROM c WHERE c.id = @name")
                    .WithParameter("@name", name)
            );

            var user = userQuery.ReadNextAsync().Result.FirstOrDefault();

            return user;
        }

        private static string HashPassword(string password, string salt)
        {
            using (var sha256 = SHA256.Create())
            {
                var saltedPassword = password + salt;
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(saltedPassword));
                return Convert.ToBase64String(hashedBytes);
            }
        }

        private static string GenerateSalt()
        {
            var salt = new byte[16];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }
            return Convert.ToBase64String(salt);
        }
    }
}
