namespace DataModels
{
   public class WashRule
   {
      public int Id { get; set; }
      public int AccountId { get; set; }
      public string Symbol { get; set; } = string.Empty;
      public bool InEffect { get; set; } = true;
      public DateTime EffectiveUntil { get; set; } = DateTime.UtcNow.AddDays(31);

      public WashRule(int accountId, string Symbol)
      {
         this.AccountId = accountId;
         this.Symbol = Symbol;
      }
   }
}