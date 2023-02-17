using Newtonsoft.Json;

namespace server.Models
{
    public class Order
    {

        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "admin_name")]
        public string AdminName { get; set; }

        [JsonProperty(PropertyName = "customer_name")]
        public string CustomerName { get; set; }

        [JsonProperty(PropertyName = "order_date")]
        public DateTime OrderDate { get; set; }

        [JsonProperty(PropertyName = "order_items")]
        public Dictionary<string, int> OrderItems { get; set; }

        [JsonProperty(PropertyName = "total_price")]
        public int TotalPrice { get; set; }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
