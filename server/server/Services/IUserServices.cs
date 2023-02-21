using System;
using System.Text;
using System.Security.Cryptography;
using User = server.Models.User;
using Microsoft.Azure.Cosmos;
using System.Configuration;
using server.Models;

namespace server.Services
{
    public interface IUserService
    {
        Task<User> Authenticate(string username, string password);
        User GetUser(string username);
        string HashPassword(string password, string hash);
        string GenerateSalt();
    }

    public class UserService : IUserService
    {
        private readonly CosmosClient _client;
        readonly string databaseId;
        readonly string collectionId;
        public IConfiguration Configuration { get; }

        public UserService(CosmosClient client, IConfiguration configuration)
        {
            _client = client;
            Configuration = configuration;

            databaseId = Configuration["DatabaseId"];
            collectionId = "User";
        }

        // authenticates a user against the database
        // returns a User object if found, null otherwise
        public async Task<User> Authenticate(string username, string password)
        {
            // search for user in database
            var db_user = GetUser(username);
            if (db_user == null)
            {
                return null;
            }
            var salt = db_user.Salt;
            var expectedHashedPassword = db_user.Pwd;

            // Hash the password with the same salt and compare it to the expected hashed password
            var hashedPassword = HashPassword(password, salt);
            if (!hashedPassword.Equals(expectedHashedPassword))
            {
                return null;
            }

            return db_user;
        }

        // gets a User from the database with a matching name
        public User GetUser(string name)
        {
            var container = _client.GetContainer(databaseId, collectionId);

            var userQuery = container.GetItemQueryIterator<User>(
                new QueryDefinition("SELECT * FROM c WHERE c.id = @name")
                    .WithParameter("@name", name)
            );

            var user = userQuery.ReadNextAsync().Result.FirstOrDefault();

            return user;
        }

        // hashes password with a salt using SHA256
        public string HashPassword(string password, string salt)
        {
            using (var sha256 = SHA256.Create())
            {
                var saltedPassword = password + salt;
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(saltedPassword));
                return Convert.ToBase64String(hashedBytes);
            }
        }

        // generates a random 16 byte salt
        public string GenerateSalt()
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

