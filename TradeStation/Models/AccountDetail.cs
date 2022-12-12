namespace TradeStation
{
   public class AccountDetail
   {
      public bool CryptoEnabled { get; set; }
      public bool DayTradingQualified { get; set; }
      public bool EnrolledInRegTProgram { get; set; }
      public bool IsStockLocateEligible { get; set; }
      public int OptionApprovalLevel { get; set; }
      public bool PatternDayTrader { get; set; }
      public bool RequiresBuyingPowerWarning { get; set; }
   }
}