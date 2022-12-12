namespace TradeStation
{
   public class Balance
   {
      public string AccountID { get; set; }
      public string AccountType { get; set; }
      public object BalanceDetail { get; set; }
      public string BuyingPower { get; set; }
      public string CashBalance { get; set; }
      public string Commission { get; set; }
      public List<object> CurrencyDetails { get; set; }
      public string Equity { get; set; }
      public string MarketValue { get; set; }
      public string TodaysProfitLoss { get; set; }
      public string UnclearedDeposit { get; set; }
   }
}