using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TradeStation
{
   public class PlaceOrder
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
      /// For internal use only.For TradeStation Margin accounts enrolled in the Reg-T program, clients should send confirmation that the customer has been shown appropriate buying power warnings in advance of placing an order that could potentially violate the account's buying power. Valid values are: Enforced, Preconfirmed, and Confirmed.
      /// </summary>
      public string? BuyingPowerWarning { get; set; }

      /// <summary>
      /// Array of objects (OrderRequestLegs)
      /// </summary>
      public List<object>? Legs { get; set; }

      /// <summary>
      /// The limit price for this order.
      /// </summary>
      public string? LimitPrice { get; set; }

      /// <summary>
      /// Array of objects (OrderRequestOSO)
      /// </summary>
      public List<object>? OSOs { get; set; }

      /// <summary>
      /// Non-Crypto orders only.A unique identifier regarding an order used to prevent duplicates. Must be unique per API key, per order, per user.
      /// </summary>
      [MinLength(1)]
      [MaxLength(25)]
      public string? OrderConfirmID { get; set; }

      /// <summary>
      /// The order type of the order.<br/>
      /// </summary>
      /// <value>
      /// Enum: "Limit" "StopMarket" "Market" "StopLimit"
      /// </value>
      [Required]
      public string OrderType { get; set; }

      /// <summary>
      /// The quantity of the order.
      /// </summary>
      [Required]
      public string Quantity { get; set; }

      /// <summary>
      /// The route of the order. For USDCUSD Crypto orders, route must be specified as USDC.For all other Crypto currencies, Route will default to TSSR if not specified. For Stocks and Options, Route value will default to Intelligent if no value is set.Routes can be obtained from Get Routes.
      /// </summary>
      public string? Route { get; set; } = "Intelligent";

      /// <summary>
      /// The stop price for this order.
      /// </summary>
      /// <value></value>
      public string? StopPrice { get; set; }

      /// <summary>
      /// The symbol used for this order.
      /// </summary>
      [Required]
      public string Symbol { get; set; }

      /// <summary>
      /// TimeInForce defines the duration and duration timestamp. For USDCUSD Crypto orders, IOC is required.
      /// </summary>
      [Required]
      public TimeInForceRequest TimeInForce { get; set; }

      /// <summary>
      /// TradeAction represents the different trade actions that can be sent to or received from WebAPI. Conveys the intent of the trade:
      /// <list type='bullet'>
      /// <item>BUY - crypto, equities and futures</item>
      /// <item>SELL - crypto, equities and futures</item>
      /// <item>BUYTOCOVER - equities</item>
      /// <item>SELLSHORT - equities</item>
      /// <item>BUYTOOPEN - options</item>
      /// <item>BUYTOCLOSE - options</item>
      /// <item>SELLTOOPEN - options</item>
      /// <item>SELLTOCLOSE - options</item>
      /// </list>
      /// </summary>
      [Required]
      public string TradeAction { get; set; }
   }
}