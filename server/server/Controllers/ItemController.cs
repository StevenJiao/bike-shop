using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Cosmos;
using Item = server.Models.Item;

namespace server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : Controller
    {
        private readonly CosmosClient _client;
        readonly string databaseId;
        readonly string collectionId;
        public IConfiguration Configuration { get; }

        public ItemController(CosmosClient client, IConfiguration configuration)
        {
            _client = client;
            Configuration = configuration;

            databaseId = Configuration["DatabaseId"];
            collectionId = "Items";
        }

        // for administrator purposes; create an item when required
        [HttpPost("create")]
        public async Task<ActionResult<Item>> CreateItem([FromBody] Item item)
        {
            await _client.GetContainer(databaseId, collectionId).CreateItemAsync<Item>(item, new PartitionKey(item.Name));

            return Ok($"{item.Name} created successfully");
        }

        [HttpGet("all")]
        public async Task<ActionResult<List<Item>>> GetItems()
        {
            // initialize items store
            List<Item> items = new();

            // get iterator of items 
            FeedIterator<Item> feedIterator = _client.GetContainer(databaseId, collectionId).GetItemQueryIterator<Item>("SELECT * FROM c");

            // iterate over all results
            while (feedIterator.HasMoreResults)
            {
                // get the feed item
                FeedResponse<Item> feedResponse = await feedIterator.ReadNextAsync();

                // add the feed item into our final list
                items.AddRange(feedResponse);
            }

            // return all items stored
            return Ok(items);
        }

        [HttpGet("one")]
        public ActionResult<Item> GetOne(string name)
        {
            // get iterator of items 
            FeedIterator<Item> feedIterator = _client.GetContainer(databaseId, collectionId)
                .GetItemQueryIterator<Item>(
                    new QueryDefinition("SELECT * FROM c WHERE c.id = @name")
                    .WithParameter("@name", name)
                );

            Item item = feedIterator.ReadNextAsync().Result.FirstOrDefault();

            // return all items stored
            return Ok(item);
        }
    }
}
