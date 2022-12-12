using System;
using System.Collections.Generic;
using System.Linq;
using DataModels;

namespace OddAuba
{
   public class AdvisorService
   {
      private string _accountId { get; set; }
      private List<Advice> _advice { get; set; } = new();
      public List<Advice> Advice
      {
         get
         {
            Advise();
            return _advice;
         }
      }

      private List<IAlgorithm> _algorithms
      {
         get
         {
            return new()
            {
               new PercentageDropAlgorithm(1) //TODO Implement a setting for the weight argument
            };
         }
      }

      private List<Position> _positions { get; set; } = new();
      private List<Stock> _stocks { get; set; }
      private List<ReferencePoint> _stockReferencePoints { get; set; }

      public AdvisorService(string accountId, List<Position> positions, List<Stock> stocks, List<ReferencePoint> stockReferences)
      {
         this._accountId = accountId;
         this._positions = positions;
         this._stocks = stocks;
         this._stockReferencePoints = stockReferences;
      }

      private void Advise()
      {
         _positions.ForEach(p =>
         {
            List<SymbolScore> scores = new();
            _algorithms.ForEach(a =>
            {
               if (a.Weight != 0)
               {
                  var scoresToApply = a.Advise(p, _stocks, _stockReferencePoints);
                  ApplyScores(scoresToApply, ref scores);
               }
            });
            Advice a = GenerateAdvice(p, scores);
            _advice.Add(a);
            RemoveFromAvailableStocks(a.BuyStockSymbol);
         });
      }

      private void ApplyScores(List<SymbolScore> scoresToApply, ref List<SymbolScore> finalScores)
      {
         for (int i = 0; i < scoresToApply.Count; i++)
         {
            var scoreToApply = scoresToApply[i];
            if (!finalScores.Contains(scoreToApply))
            {
               finalScores.Add(scoreToApply);
            }
            else
            {
               int index = finalScores.FindIndex(0, finalScores.Count, s => s.Symbol == scoreToApply.Symbol);
               finalScores[index].Score += scoreToApply.Score;
            }
         }
      }

      private Advice GenerateAdvice(Position position, List<SymbolScore> scores)
      {
         var buyScore = GetMaxSymbolScore(scores);

         var shouldTrade = true;
         var sellSymbol = position.Symbol;
         var buySymbol = string.Empty;

         if (buyScore.Score == 0)
         {
            shouldTrade = false;
         }
         else
         {
            buySymbol = buyScore.Symbol;
         }

         return new(_accountId, shouldTrade, sellSymbol, buySymbol);
      }

      private SymbolScore GetMaxSymbolScore(List<SymbolScore> scores)
      {
         decimal max = GetMaxScore(scores);
         SymbolScore result = scores.FirstOrDefault(s => s.Score == max);
         if (result == null)
         {
            return new(string.Empty, max);
         }
         else
         {
            return result;
         }
      }

      private decimal GetMaxScore(List<SymbolScore> scores)
      {
         decimal result = 0;
         scores.ForEach(s =>
         {
            if (s.Score > result) result = s.Score;
         });
         return result;
      }

      private void RemoveFromAvailableStocks(string symbol)
      {
         int count = _stocks.Count;
         var toRemove = _stocks.FirstOrDefault(s => s.Symbol == symbol);
         if (toRemove == null) return;
         bool removed = _stocks.Remove(toRemove);
         if (!removed) throw new Exception("No stock removed from available stocks when building advice.");
      }
   }
}