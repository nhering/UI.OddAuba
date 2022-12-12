namespace DataModels
{
   public class Stock
   {
      public int Id { get; set; }
      public string Company { get; set; } = string.Empty;
      public string Symbol { get; set; } = string.Empty;

      public static Stock FromCSV(string csv)
      {
         Stock result = new();
         // < TICKER >,< PER >,< DATE >,< TIME >,< OPEN >,< HIGH >,< LOW >,< CLOSE >,< VOL >,< OPENINT >
         // A.US,D,19991118,000000,29.5594,32.4842,25.9889,28.5858,68866780.626131,0
         var strArr = csv.Split(',');
         result.Symbol = strArr[0].Replace(".US", "");
         return result;
      }
   }
}