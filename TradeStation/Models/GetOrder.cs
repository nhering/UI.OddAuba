using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TradeStation
{
   public class GetOrder
   {
      /// <summary>
      /// TradeStation Account ID.
      /// </summary>
      [Required]
      public string AccountID { get; set; }

      /// <summary>
      /// object (AdvancedOptions)
      /// </summary>
      public object? AdvancedOptions { get; set; }

      /// <summary>
      /// Array of objects (OrderRequestLegs)
      /// </summary>
      public List<object>? Legs { get; set; }

      /// <summary>
      /// The limit price for this order.
      /// </summary>
      public string? LimitPrice { get; set; }

      /// <summary>
      /// The order type of the order.<br/>
      /// </summary>
      /// <value>
      /// Enum: "Limit" "StopMarket" "Market" "StopLimit"
      /// </value>
      [Required]
      public string OrderType { get; set; }

      /// <summary>
      /// Identifies the routing selection made by the customer when placing the order.
      /// </summary>
      public string? Routing { get; set; }

      /// <summary>
      /// The stop price for StopLimit and StopMarket orders.
      /// </summary>
      /// <value></value>
      public string? StopPrice { get; set; }












      // /// <summary>
      // /// TradeAction represents the different trade actions that can be sent to or received from WebAPI. Conveys the intent of the trade:
      // /// <list type='bullet'>
      // /// <item>BUY - crypto, equities and futures</item>
      // /// <item>SELL - crypto, equities and futures</item>
      // /// <item>BUYTOCOVER - equities</item>
      // /// <item>SELLSHORT - equities</item>
      // /// <item>BUYTOOPEN - options</item>
      // /// <item>BUYTOCLOSE - options</item>
      // /// <item>SELLTOOPEN - options</item>
      // /// <item>SELLTOCLOSE - options</item>
      // /// </list>
      // /// </summary>
      // [Required]
      // public string TradeAction { get; set; }
   }
}