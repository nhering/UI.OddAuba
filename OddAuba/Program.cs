using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using OddAuba;
using DataModels;
using TradeStation;

TradeStationContex db = new("../TradeStation/TradeStationDb.db");

#region Consume historic stock data

// db.Stock.RemoveRange(db.Stock);
// db.StockState.RemoveRange(db.StockState);
// db.Account.RemoveRange(db.Account);
// db.SaveChanges();

// var consumeHistoricStockDataTimer = new Timer();

// // Data sourced from: https://stooq.com/db/h/
// var dir = Directory.GetCurrentDirectory();
// var files = Directory.EnumerateFiles("../RawData/nyse_daily");
// int countOfStockStates = 0;
// int savePoint = 0;

// DateTime cutoff = new(2011, 1, 2);
// foreach (var file in files)
// {
//    List<CloseHistory> histories = new();
//    Stock stock = new();
//    int lineCount = 0;
//    foreach (var txt in File.ReadAllLines(file))
//    {
//       if (lineCount == 0) { lineCount++; }
//       else if (lineCount == 1)
//       {
//          stock = Stock.FromCSV(txt);
//          lineCount++;
//       }
//       else
//       {
//          if (!string.IsNullOrEmpty(txt))
//          {
//             var ss = CloseHistory.FromCSV(txt);
//             if (ss.Date > cutoff)
//             {
//                histories.Add(ss);
//             }
//          }
//       }
//    }

//    var a = "-----";
//    if (histories.Count >= 2999)
//    {
//       a = $"Added - Current Total {countOfStockStates.ToString("#,###")}";
//       db.Stock.Add(stock);
//       db.CloseHistory.AddRange(histories);
//       countOfStockStates += histories.Count;
//       savePoint += histories.Count;
//       if (savePoint > 1000000)
//       {
//          Console.WriteLine("Saving...");
//          db.SaveChanges();
//          savePoint = 0;
//       }
//    }

//    Console.WriteLine($"{stock.Symbol.PadRight(10, ' ')}{histories.Count.ToString("#,###").PadLeft(5, ' ')} {a}");
// };
// Console.WriteLine($"Saving remaining {savePoint.ToString("#,###")} StockStates.");
// db.SaveChanges();
// Console.WriteLine($"Total {countOfStockStates.ToString("#,###")}");
// consumeHistoricStockDataTimer.TimeStamp();

#endregion

#region Consume company names data

// var consumeCompanyNameTimer = new Timer();

// decimal countOfAdded = 0;
// decimal countOfNotAdded = 0;

// var dir = Directory.GetCurrentDirectory();
// var files = Directory.EnumerateFiles("../RawData/company_info");
// var stocks = db.Stock.ToList();
// List<Stock> stocksToUpdate = new();
// foreach (var file in files)
// {
//    stocksToUpdate = new();
//    foreach (var txt in File.ReadAllLines(file))
//    {
//       if (!string.IsNullOrEmpty(txt))
//       {
//          //example txt: A,Agilent Technologies,Life Sciences Tools & Services,44.65B
//          var strArr = txt.Split(".US");
//          var symbol = strArr[0].Trim();
//          var companyName = strArr[1].Trim();
//          var stockToUpdate = stocks.FirstOrDefault(s => s.Symbol == symbol);
//          if (stockToUpdate != null)
//          {
//             Console.WriteLine($"{symbol.PadRight(8, ' ')} Adding company name: {companyName}");
//             stockToUpdate.Company = companyName;
//             stocksToUpdate.Add(stockToUpdate);
//             countOfAdded++;
//          }
//          else
//          {
//             Console.WriteLine(symbol);
//             countOfNotAdded++;
//          }
//       }
//    }
//    db.Stock.UpdateRange(stocksToUpdate);
//    db.SaveChanges();
// }

// var percentAdded = (countOfAdded / stocks.Count);
// Console.WriteLine($"Added names to {percentAdded.ToString("P2")}% ({countOfAdded} of {stocks.Count}) symbols.");

// consumeCompanyNameTimer.TimeStamp();

#endregion

#region Integration Tests

// var t01 = new Timer();

// TradeStationService ts = new TradeStationService();
// var data = await ts.GetMarketData("A,AA,AAIC");

// t01.TimeStamp();

#endregion

#region Timer

public class Timer
{
   private DateTime _start { get; set; }
   public Timer()
   {
      this._start = DateTime.Now;
   }
   public void TimeStamp()
   {
      TimeSpan dur = DateTime.Now - _start;
      string h = dur.Hours.ToString().PadLeft(2, '0');
      string m = dur.Minutes.ToString().PadLeft(2, '0');
      string s = dur.Seconds.ToString().PadLeft(2, '0');
      Console.WriteLine($"{h}:{m}:{s}");
   }
}

#endregion
