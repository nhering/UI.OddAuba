using System;

namespace OddAuba
{
   public class SymbolScore
   {
      public string Symbol { get; set; }
      public decimal Score { get; set; }

      public SymbolScore(string symbol, decimal score)
      {
         this.Symbol = symbol;
         this.Score = score;
      }
   }
}