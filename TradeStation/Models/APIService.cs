using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace TradeStation
{
   public class APIService
   {
      private string _baseUrl = "https://api.tradestation.com/v3/";
      private APIService _instance { get; set; }
      public APIService Instance
      {
         get
         {
            if (_instance == null)
            {
               _instance = new();
            }
            return _instance;
         }
      }

      private HttpClient _client { get; set; }
      private HttpClient Client
      {
         get
         {
            if (_client == null)
            {
               _client = new();
            }
            return _client;
         }
      }

      public APIService() { }

      public async Task<List<GetOrder>> GetOrders(string accounts)
      {
         var endPoint = $"brokerage/accounts/{accounts}/orders";
         using HttpResponseMessage response = await _client.GetAsync(endPoint);
         response.EnsureSuccessStatusCode();
         string responseBody = await response.Content.ReadAsStringAsync();
         return JsonSerializer.Deserialize<List<GetOrder>>(responseBody);
      }
   }
}