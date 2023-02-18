using Microsoft.AspNetCore.Mvc.ModelBinding;
using Newtonsoft.Json;

namespace server.Models
{
    public class User
    {
        [JsonProperty(PropertyName = "id")]
        public string? Name { get; set; }

        [JsonProperty(PropertyName = "pwd")]
        public string? Pwd { get; set; }

        [JsonProperty(PropertyName = "salt")]
        public string? Salt { get; set; }

        public override string ToString() {
            return JsonConvert.SerializeObject(this);
        }
    }
}
