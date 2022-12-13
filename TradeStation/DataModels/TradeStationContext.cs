using Microsoft.EntityFrameworkCore;

namespace TradeStation
{
   public class TradeStationContex : DbContext
   {
      public DbSet<Stock> Stock { get; set; }
      public DbSet<CloseHistory> CloseHistory { get; set; }

      private string _fileName { get; set; }

      public TradeStationContex(string file = "TradeStationDb.db")
      {
         _fileName = file;
         this.Stock = this.Set<Stock>();
         this.CloseHistory = this.Set<CloseHistory>();
      }

      protected override void OnConfiguring(DbContextOptionsBuilder options)
      {
         options.UseSqlite($"FileName={_fileName}");
      }
   }
}