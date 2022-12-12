using Microsoft.EntityFrameworkCore;

namespace DataModels
{
   public class OddAubaContex : DbContext
   {
      public DbSet<Account> Account { get; set; }
      public DbSet<AccountToken> AccountToken { get; set; }
      public DbSet<Order> Order { get; set; }
      public DbSet<Pool> Pool { get; set; }
      public DbSet<ReferencePoint> ReferencePoint { get; set; }
      public DbSet<Stock> Stock { get; set; }
      public DbSet<StockCloseHistory> StockCloseHistory { get; set; }
      public DbSet<WashRule> WashRule { get; set; }

      public OddAubaContex()
      {
         this.Account = this.Set<Account>();
         this.AccountToken = this.Set<AccountToken>();
         this.Order = this.Set<Order>();
         this.Pool = this.Set<Pool>();
         this.ReferencePoint = this.Set<ReferencePoint>();
         this.Stock = this.Set<Stock>();
         this.StockCloseHistory = this.Set<StockCloseHistory>();
         this.WashRule = this.Set<WashRule>();
      }

      protected override void OnConfiguring(DbContextOptionsBuilder options)
      {
         options.UseSqlite("FileName=LocalDb.db");
      }
   }
}