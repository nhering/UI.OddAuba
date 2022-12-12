using System.Collections.Generic;

namespace OddAuba
{
   public abstract class AlgorithmBase
   {
      private decimal _weight { get; set; } = 0;
      public decimal Weight
      {
         get
         {
            return _weight;
         }
      }

      private List<SymbolScore> _scores { get; set; } = new();
      public List<SymbolScore> Scores
      {
         get
         {
            _scores.ForEach(s => { s.Score = s.Score * _weight; });
            return _scores;
         }
      }

      public AlgorithmBase(decimal weight)
      {
         this._weight = weight;
      }
   }
}