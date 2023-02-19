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

        [HttpGet("all")]
        public async Task<ActionResult<List<Order>>> GetAllOrders()
        {
            // initialize orders store
            List<Order> orders = new();

            // get iterator of orders
            FeedIterator<Order> feedIterator = _client
                .GetContainer(databaseId, collectionId)
                .GetItemQueryIterator<Order>(
                    "SELECT * FROM c ORDER BY c.order_date"
                );

            // iterate over all results
            while (feedIterator.HasMoreResults)
            {
                // get the feed item
                FeedResponse<Order> feedResponse = await feedIterator.ReadNextAsync();

                // add the feed item into our final list
                orders.AddRange(feedResponse);
            }

            // return all items stored
            return Ok(orders);
        }
    }
}
