namespace DataModels
{
   public class Account
   {
      public int Id { get; set; }
      public string Email { get; set; } = string.Empty;
      public string FirstName { get; set; } = string.Empty;
      public string LastName { get; set; } = string.Empty;
      public string TradeStationAccountId { get; set; } = string.Empty;
   }
}