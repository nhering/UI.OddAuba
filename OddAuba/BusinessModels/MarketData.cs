namespace OddAuba
{
   public class MarketData
   {
      public string Symbol { get; set; } = string.Empty;
      public decimal Ask { get; set; } // purchase price
      public decimal Bid { get; set; } // sale price

      public MarketData() { }

      public MarketData(string symbol, decimal ask, decimal bid)
      {
         this.Symbol = symbol;
         this.Ask = ask;
         this.Bid = bid;
      }
   }
}