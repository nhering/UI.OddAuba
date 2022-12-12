// using System;
// using System.Collections.Generic;
// using System.Linq;
// using TradeStation;

// namespace OddAuba
// {
//    public class TestRunner
//    {
//       private User _user { get; set; }
//       private int _initialInvestment { get; set; }
//       private int _poolSize { get; set; }
//       private int _duration { get; set; }
//       private TestContex _db { get; set; } = new();
//       private int _currentDate { get; set; } // date to emulate trades for
//       private List<Position> _pool { get; set; } = new();
//       private List<Stock> _stocks { get; set; } = new();
//       private List<StockState> _states { get; set; } = new();

//       public TestRunner(User user, int initialInvestment, int poolSize, int duration)
//       {
//          this._user = user;
//          this._initialInvestment = initialInvestment;
//          this._poolSize = poolSize;
//          this._duration = duration;
//       }

//       public async void RunTestAsync()
//       {
//          SetInitialDate();
//          List<int> ids = GetStockIdsForPool();
//          GetStocksForPool(ids);
//          GetRefDateForInitialPool(ids);
//          CreatePositions(ids);
//          SetInitialPosition();

//          while (_duration > 0)
//          {
//             // Get advice
//             // Act on advice
//             GetNextDate();
//             _duration--;
//          }
//       }

//       private void SetInitialDate()
//       {
//          int max = 2999 - _duration;
//          var rand = new Random();
//          int days = rand.Next(1, max);
//          this._currentDate = AddDays(20110103, days);
//          GetNextDate();
//       }

//       private List<int> GetStockIdsForPool()
//       {
//          List<int> selectedIds = new();
//          List<int> invalidIds = new();
//          while (selectedIds.Count < this._poolSize)
//          {
//             SelectStockIdsForPool(selectedIds, invalidIds);
//             ValidateStockIdSelection(selectedIds, invalidIds);
//          }
//          return selectedIds;
//       }

//       private void GetStocksForPool(List<int> selectedIds)
//       {
//          _stocks = _db.Stocks.Where(s => selectedIds.Contains(s.Id)).ToList();
//       }

//       private void SelectStockIdsForPool(List<int> selectedIds, List<int> invalidIds)
//       {
//          int countOfStocksToSelectFrom = 1344;
//          var rand = new Random();
//          while (selectedIds.Count < this._poolSize)
//          {
//             int i = rand.Next(0, countOfStocksToSelectFrom + 1);
//             if (invalidIds.Contains(i))
//             {
//                selectedIds.Remove(i);
//                continue;
//             }
//             if (!selectedIds.Contains(i)) selectedIds.Add(i);
//          }
//       }

//       private void ValidateStockIdSelection(List<int> selectedIds, List<int> invalidIds)
//       {
//          var validStockIds = _db.Stocks.Where(s => selectedIds.Contains(s.Id)).Select(s => s.Id).ToList();

//          if (selectedIds.Count > validStockIds.Count)
//          {
//             selectedIds.ForEach(sId =>
//             {
//                if (!invalidIds.Contains(sId)) invalidIds.Add(sId);
//             });
//          }
//       }

//       private void GetRefDateForInitialPool(List<int> selectedIds)
//       {
//          // Console.WriteLine(" - GetRefDateForInitialPool");
//          // Console.WriteLine(_stocks.Count.ToString());
//          // Console.WriteLine(_currentDate.ToString());

//          var n = new List<StockState>();
//          while (n.Count < selectedIds.Count)
//          {
//             var states = _db.StockStates.Where(s => s.Date == _currentDate).ToList();
//             Console.WriteLine(states.Count.ToString());
//             _stocks.ForEach(s =>
//             {
//                var ss = states.FirstOrDefault(st => st.Ticker == s.Ticker);
//                if (ss != null)
//                {
//                   n.Add(ss);
//                }
//                else
//                {
//                   Console.WriteLine($"No data found for {s.Ticker} on {_currentDate.ToString()}");
//                }
//             });
//             // Console.WriteLine(n.Count.ToString());
//             // Console.WriteLine("---");
//             // Console.WriteLine("---");
//             if (n.Count < selectedIds.Count)
//             {
//                n = new();
//                GetNextDate();
//             }
//          }
//       }

//       private void CreatePositions(List<int> stockIds)
//       {
//          _states = _db.StockStates.Where(s => s.Date == _currentDate).ToList();

//          _stocks.ForEach(s =>
//          {
//             var state = _states.FirstOrDefault(st => st.Ticker == s.Ticker);
//             if (state == null)
//             {
//                throw new($"No matching state while creating positions. Stock: {s.Ticker}");
//             }
//             Position p = new()
//             {
//                UserId = _user.Id,
//                Ticker = s.Ticker,
//                RefDate = _currentDate,
//                RefPrice = state.Close
//             };
//             _pool.Add(p);
//          });
//       }

//       private void SetInitialPosition()
//       {
//          var i = new Random().Next(1, _pool.Count + 1);
//          var price = _states.FirstOrDefault(s => s.Ticker == _pool[i].Ticker).Close;
//          var shares = _initialInvestment / price;

//          _pool[i].RefPrice = price;
//          _pool[i].Shares = shares;

//          _db.Positions.AddRange(_pool);
//          _db.SaveChanges();
//       }

//       private void GetNextDate()
//       {
//          var d = _currentDate;
//          int i = AddDays(d, 1);
//          while (d == _currentDate)
//          {
//             if (_db.StockStates.Any(s => s.Date == i))
//             {
//                _currentDate = i;
//             }
//             else
//             {
//                i = AddDays(i, 1);
//             }
//          }
//       }

//       #region Utilities

//       private int AddDays(int date, int days)
//       {
//          var d = IntToDate(date);
//          var n = d.AddDays(days);
//          return DateToInt(n);
//       }

//       private DateOnly IntToDate(int date)
//       {
//          var str = date.ToString();
//          var y = Convert.ToInt32(str.Substring(0, 4));
//          var m = Convert.ToInt32(str.Substring(4, 2));
//          var d = Convert.ToInt32(str.Substring(6, 2));
//          return new(y, m, d);
//       }

//       private int DateToInt(DateOnly date)
//       {
//          var y = date.Year.ToString();
//          var m = date.Month.ToString().PadLeft(2, '0');
//          var d = date.Day.ToString().PadLeft(2, '0');
//          return Convert.ToInt32($"{y}{m}{d}");
//       }

//       #endregion
//    }
// }