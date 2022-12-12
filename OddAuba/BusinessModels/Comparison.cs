// using System;
// using TradeStation;

// namespace OddAuba
// {
//    public class Comparison
//    {
//       public string Ticker { get; set; } = string.Empty;
//       public decimal Change { get; set; }
//       public decimal Score { get; set; } = 0;
//       public bool WashRuleInEffect { get; set; } = false;

//       /// <summary>
//       /// Initiate a<see cref="Comparison"/>instance and calculate
//       /// the comparison of two stocks.
//       /// </summary>
//       /// <param name="currentPosition">The currently owned stock information.</param>
//       /// <param name="potenetialPosition">The stock being compared to in order to determine if making a trade is advisable.</param>
//       /// <param name="currentPositionState">The current market state of the currently owned stock.</param>
//       /// <param name="potentialPositionState">The current market state of the potential stock to buy.</param>
//       public Comparison(
//          Position currentPosition,
//          Position potenetialPosition,
//          StockState currentPositionState,
//          StockState potentialPositionState)
//       {
//          this.Change = CalculateChange(potenetialPosition, potentialPositionState);
//          decimal currentPositionsChange = CalculateChange(currentPosition, currentPositionState);
//          CalculateScore(currentPositionsChange);
//       }

//       private decimal CalculateChange(Position p, StockState s)
//       {
//          throw new NotImplementedException();
//       }

//       private void CalculateScore(decimal currentPositionChange)
//       {
//          // If both values are positive, subtract the small from the larger to get the range between them(5 % up minus 2 % up gives us a 3 % gain)
//          // If both values are negative, make them positive and subtract the smaller from the larger(-1 % and - 4 % becomes 4 - 1 to give us the 3 % gain)
//          // If one is positive and one is negative, make the negative number positive and add them together(2 % and - 1 % becomes 2 + 1 to give us the 3 % gain)
//          decimal cpc = 0;
//          decimal ppc = 0;
//          if (currentPositionChange < 0)
//          {
//             cpc = currentPositionChange * -1;
//          }
//          else if (currentPositionChange > 0)
//          {
//             cpc = currentPositionChange;
//          }

//          if (this.Change < 0)
//          {
//             ppc = this.Change * -1;
//          }
//          else if (this.Change > 0)
//          {
//             ppc = this.Change;
//          }

//          if (cpc > ppc)
//          {
//             this.Score = (cpc - ppc) * 100;
//          }
//          else if (cpc < ppc)
//          {
//             this.Score = (ppc - cpc) * 100;
//          }

//          // // potentialPositionsChange = if(E25>$D25,sum($D25-E25)/$D25,SUM(E25-$D25)/$D25)
//          // //  E25 = currentPositionState.Close
//          // // $D25 = currentPosition.RefPrice
//          // decimal potentialPositionsChange = 0;
//          // if (currentPositionState.Close > currentPosition.RefPrice)
//          // {
//          //    potentialPositionsChange = currentPosition.RefPrice - currentPositionState.Close;
//          // }
//          // else
//          // {
//          //    potentialPositionsChange = currentPositionState.Close - currentPosition.RefPrice;
//          // }

//          // // =sum(F26-F$25)*100
//          // //  F26 = potentialPositionsChange
//          // // $F25 = currentPositionsChange
//          // this.Score = (potentialPositionsChange - currentPositionsChange) * 100;
//       }
//    }
// }