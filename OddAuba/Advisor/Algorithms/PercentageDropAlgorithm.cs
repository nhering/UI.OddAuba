using System.Collections.Generic;
using DataModels;

namespace OddAuba
{
   public class PercentageDropAlgorithm : AlgorithmBase, IAlgorithm
   {
      public PercentageDropAlgorithm(decimal weight) : base(weight) { }

      public List<SymbolScore> Advise(Position position, List<Pool> stocks, List<ReferencePoint> refPoints)
      {
         //TODO Perform algorithm
         return this.Scores;
      }
   }
}