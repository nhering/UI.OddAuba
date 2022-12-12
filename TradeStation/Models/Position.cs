using System.ComponentModel.DataAnnotations;

namespace TradeStation
{
   /// <summary>
   /// This is the response object from <br/>
   /// https://api.tradestation.com/v3/brokerage/accounts/{accounts}/positions <br/>
   /// Not something we need to save.
   /// </summary>
   public class Position
   {

      [Required]
      public string AccountId { get; set; }

      [Required]
      public string AssetType { get; set; } = "Stock"; // (alsways STOCK) not STOCKOPTION or FUTURE
      public string AveragePrice { get; set; }

      [Required]
      public string Bid { get; set; } // willing to sell at (current market value - $.01)

      [Required]
      public string Ask { get; set; } // willing to buy at (current market value + $.01)
      public string ConversionRate { get; set; }
      public string DayTradeRequirements { get; set; }
      public string ExpirationDate { get; set; }
      public string InitialRequirement { get; set; }
      public string Last { get; set; }
      public string LongShort { get; set; } // LONG | SHORT
      public string MarketToMarketPrice { get; set; }
      public string MarketValue { get; set; }
      public string PositionId { get; set; }

      [Required]
      public string Quantity { get; set; }

      [Required]
      public string Symbol { get; set; }
      public string TimeStamp { get; set; }
      public string TodaysProfitLoss { get; set; }
      public string TotalCost { get; set; }
      public string UnrealizedProfitLoss { get; set; }
      public string UnrealizedProfitLossPercent { get; set; }
      public string UnrealizedProfitLossQty { get; set; }
   }
}

