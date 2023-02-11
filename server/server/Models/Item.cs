using Newtonsoft.Json;

namespace server.Models
{
    public class Item
    {
        [JsonProperty(PropertyName = "id")]
        public int Id { get; set; }
        public override string ToString() {
            return JsonConvert.SerializeObject(this);
        }
    }
}
