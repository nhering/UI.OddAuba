namespace OddAuba
{
   public class Position
   {
      public string Symbol { get; }
      public decimal Shares { get; }
      public decimal Price { get; }
      public decimal Value
      {
         get
         {
            return Shares * Price;
         }
      }

      public Position(string symbol, decimal shares, decimal price)
      {
         this.Symbol = symbol;
         this.Shares = shares;
         this.Price = price;
      }
   }
}
