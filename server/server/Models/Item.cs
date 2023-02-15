using Newtonsoft.Json;

namespace server.Models
{
    public class Item
    {
        [JsonProperty(PropertyName = "id")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "price")]
        public float Price { get; set; }
        public override string ToString() {
            return JsonConvert.SerializeObject(this);
        }
    }
}
