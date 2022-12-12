using System.Collections.Generic;
using System.Text.Json;
using System.Net.Http;
using System.Threading.Tasks;

namespace OddAuba
{
   public class TradeStationService
   {
      private HttpClient _client { get; set; } = new();

      public TradeStationService()
      {
         string baseUrl = "https://localhost:7137/";
         this._client.BaseAddress = new(baseUrl);
      }

      #region MarketData

      // Get quote snapshots
      public async Task<List<MarketData>> GetMarketData(string symbols)
      {
         string resBody = await _client.GetStringAsync($"quotes/{symbols}");
         return JsonSerializer.Deserialize<List<MarketData>>(resBody);
      }

      #endregion

      #region Brokerage

      // Get balances

      // Get orders

      // Get positions

      #endregion

      #region OrderExecution

      // Post order group

      #endregion
   }
}