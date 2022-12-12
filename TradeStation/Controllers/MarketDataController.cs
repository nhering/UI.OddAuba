using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;


namespace TradeStation
{
   [ApiController]
   public class MarketDataController : ControllerBase
   {
      public MarketDataController() { }

      [HttpGet("v3/marketdata/quotes/{symbols}")]
      public List<string> GetQuoteSnapshots([FromRoute] string symbols)
      {

         return symbols.Split(',').ToList();
      }
   }
}
