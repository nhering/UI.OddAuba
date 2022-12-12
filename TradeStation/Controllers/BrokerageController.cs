using Microsoft.AspNetCore.Mvc;

namespace TradeStation.Controllers;

[ApiController]
public class BrokerageController : ControllerBase
{
   public BrokerageController() { }

   // [HttpGet("v3/brokerage/accounts")]
   // public List<Account> GetAccounts()
   // {
   //    return new();
   // }

   [HttpGet("v3/brokerage/accounts/{accounts}/balances")]
   public List<Balance> GetBalances([FromRoute] string accounts)
   {
      return new();
   }

   [HttpGet("v3/brokerage/accounts/{accounts}/orders")]
   public List<GetOrder> GetOrders([FromRoute] string accounts)
   {
      return new();
   }

   [HttpGet("v3/brokerage/accounts/{accounts}/positions")]
   public List<Position> GetPositions([FromRoute] string accounts)
   {
      return new();
   }
}
