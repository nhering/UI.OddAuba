namespace DataModels
{
   public class AccountToken
   {
      public int Id { get; set; }
      public string AccountId { get; set; } = string.Empty;
      public string Token { get; set; } = string.Empty;
   }
}