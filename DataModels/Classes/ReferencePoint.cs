namespace DataModels
{
   public class ReferencePoint
   {
      public int Id { get; set; }
      public int AccountId { get; set; }
      public string Symbol { get; set; } = string.Empty;
      public DateTime ReferenceDate { get; set; } = DateTime.UtcNow;
      public decimal ReferencePrice { get; set; }
      public decimal PurchasePrice { get; set; }
   }
}