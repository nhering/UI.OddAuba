namespace TradeStation
{
   public class CloseHistory
   {
      public int Id { get; set; }
      public string Symbol { get; set; } = string.Empty;
      public DateTime Date { get; set; }
      public decimal Close { get; set; }

      public static CloseHistory FromCSV(string csv)
      {
         CloseHistory result = new();
         // < TICKER >,< PER >,< DATE >,< TIME >,< OPEN >,< HIGH >,< LOW >,< CLOSE >,< VOL >,< OPENINT >
         // A.US,D,19991118,000000,29.5594,32.4842,25.9889,28.5858,68866780.626131,0
         var strArr = csv.Split(',');
         result.Symbol = strArr[0].Replace(".US", "");
         result.Date = DateFromString(strArr[2]);
         result.Close = Convert.ToDecimal(strArr[7]);
         return result;
      }

      private static DateTime DateFromString(string str)
      {
         // 19991118
         int y = Convert.ToInt32(str.Substring(0, 4));
         int m = Convert.ToInt32(str.Substring(4, 2));
         int d = Convert.ToInt32(str.Substring(6, 2));
         return new(y, m, d);
      }
   }
}