using DataModels;

namespace OddAuba
{
   public class DataService
   {
      private OddAubaContex _db { get; set; }

      public DataService()
      {
         _db = new();
      }
   }
}