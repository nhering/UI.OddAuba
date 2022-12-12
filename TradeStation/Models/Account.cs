namespace TradeStation
{
   public class Account
   {
      public AccountDetail AccountDetail { get; set; } = new();
      public string AccountID { get; set; } = "1";
      public string AccountType { get; set; } = "Margin";
      public string Alias { get; set; }
      public string AltID { get; set; }
      public string Currency { get; set; } = "USD";
      public string Status { get; set; } = "active";
   }
}