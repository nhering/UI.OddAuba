namespace OddAuba
{
   /// <summary>
   /// Used by the<see cref="AdvisorService"/>as a return
   /// value to be passed to the IBroker after anylizing.
   /// </summary>
   public class Advice
   {
      public string AccountID { get; set; } = string.Empty;
      public bool ShouldTrade { get; set; } = true;
      public string SellStockSymbol { get; set; } = string.Empty;
      public string BuyStockSymbol { get; set; } = string.Empty;
      public bool InitiateWashRule { get; set; } = false;

      public Advice(string accountId, bool shouldTrade, string sellSymbol, string buySymbol)
      {
         this.AccountID = accountId;
         this.ShouldTrade = shouldTrade;
         this.SellStockSymbol = sellSymbol;
         this.BuyStockSymbol = buySymbol;
      }
   }
}
