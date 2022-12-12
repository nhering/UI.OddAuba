// using System;
// using System.Collections.Generic;
// using System.Linq;

// namespace OddAuba
// {
//    public class BrokerService
//    {
//       private IBrokerageProvider _provider { get; set; }
//       private List<Advice> _advice { get; set; } = new();
//       private OddAubaContex _db { get; set; } = new();

//       public BrokerService(IBrokerageProvider provider)
//       {
//          this._provider = provider;
//       }

//       #region Interface with service provider

//       public List<Account> GetAccounts()
//       {
//          return _db.Account.ToList();
//       }

//       #endregion

//       #region Gather data for advisor

//       //get positions
//       //get pool
//       //get stock values for pool
//       //get wash rules
//       //remove stocks that have wash rule
//       //remove stocks that already have a position
//       //remove bottom 20%
//       //return

//       #endregion
//    }
// }