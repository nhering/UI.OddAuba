using Microsoft.AspNetCore.Mvc;

namespace TradeStation.Controllers;

[ApiController]
public class OrderExecutionController : ControllerBase
{
   public OrderExecutionController() { }

   [HttpPost("v3/orderexecution/ordergroups")]
   public List<string> PlaceGroupOrder([FromBody] string accounts)
   {
      return accounts.Split(',').ToList();
   }
}
