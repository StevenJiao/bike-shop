using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Cosmos;
using server.Models;
using Order = server.Models.Order;
using System;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : Controller
    {
        private readonly CosmosClient _client;
        readonly string databaseId;
        readonly string collectionId;
        public IConfiguration Configuration { get; }

        public OrderController(CosmosClient client, IConfiguration configuration)
        {
            _client = client;
            Configuration = configuration;

            databaseId = Configuration["DatabaseId"];
            collectionId = "Orders";
        }

        [HttpPost("create")]
        public async Task<ActionResult<Order>> CreateOrder([FromBody] Order order)
        {
            await _client.GetContainer(databaseId, collectionId).CreateItemAsync<Order>(order, new PartitionKey(order.Id));

            return Ok($"{order.Id} created successfully");
        }
    }
}
