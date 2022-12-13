namespace DataModels
{
   public class Order
   {
      public int Id { get; set; }
      public string Symbol { get; set; } = string.Empty;
      public string Status { get; set; } = string.Empty;
   }
}