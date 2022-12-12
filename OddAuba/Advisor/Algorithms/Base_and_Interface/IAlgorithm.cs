using System.Collections.Generic;
using DataModels;

namespace OddAuba
{
   public interface IAlgorithm
   {
      public decimal Weight { get; }
      public List<SymbolScore> Advise(Position position, List<Stock> stocks, List<ReferencePoint> references);
   }
}
