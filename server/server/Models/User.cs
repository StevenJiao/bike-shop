using Microsoft.AspNetCore.Mvc.ModelBinding;
using Newtonsoft.Json;

namespace server.Models
{
    public class User
    {
        [BindRequired]
        [JsonProperty(PropertyName = "id")]
        public string Name { get; set; }

        [BindRequired]
        [JsonProperty(PropertyName = "pwd")]
        public string Pwd { get; set; }

        [BindNever]
        [JsonProperty(PropertyName = "salt")]
        public string Salt { get; set; }

        public override string ToString() {
            return JsonConvert.SerializeObject(this);
        }
    }
}
