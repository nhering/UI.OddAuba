namespace TradeStation
{
   public class Quote
   {
      public string Symbol { get; set; } // REQUIRED
      public string Open { get; set; }
      public string High { get; set; }
      public string Low { get; set; }
      public string PreviousClose { get; set; }
      public string Last { get; set; }
      public string Ask { get; set; } // REQUIRED
      public string AskSize { get; set; }
      public string Bid { get; set; } // REQUIRED
      public string BidSize { get; set; }
      public string NetChange { get; set; }
      public string NetChangePct { get; set; }
      public string High52Week { get; set; }
      public string High52WeekTimestamp { get; set; }
      public string Low52Week { get; set; }
      public string Low52WeekTimestamp { get; set; }
      public string Volume { get; set; }
      public string PreviousVolume { get; set; }
      public string Close { get; set; }
      public string DailyOpenInterest { get; set; }
      public string TradeTime { get; set; }
      public string TickSizeTier { get; set; }
      public object MarketFlags { get; set; }
      public string LastSize { get; set; }
      public string LastVenue { get; set; }
      public string VWAP { get; set; }
   }
}