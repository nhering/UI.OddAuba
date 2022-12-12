// using System.Collections.Generic;
// using DataModels;
// using System.Threading.Tasks;

// namespace OddAuba
// {
//    public interface IBrokerageProvider
//    {
//       public Task<List<Position>> GetPositionsAsync();
//       public Task<List<StockState>> GetStockStateAsync();
//    }

//    public abstract class BrokerageProviderBase
//    {
//       private string _baseUrl { get; set; }

//       public BrokerageProviderBase(string baseUrl)
//       {
//          this._baseUrl = baseUrl;
//       }
//    }
// }