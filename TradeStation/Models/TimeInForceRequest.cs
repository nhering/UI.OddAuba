using System.ComponentModel.DataAnnotations;

namespace TradeStation
{
   public class TimeInForceRequest
   {
      /// <summary>
      /// Duration defines the duration that can be sent to or received.
      /// <br/>Valid values are:
      /// <list type='bullet'>
      /// <item>DAY - Day, valid until the end of the regular trading session.</item>
      /// <item>DYP - Day Plus; valid until the end of the extended trading session.</item>
      /// <item>GTC - Good till canceled.</item>
      /// <item>GCP - Good till canceled plus.</item>
      /// <item>GTD - Good through date.</item>
      /// <item>GDP - Good through date plus.</item>
      /// <item>OPG - At the opening; only valid for listed stocks at the opening session Price.</item>
      /// <item>CLO - On Close; orders that target the closing session of an exchange.</item>
      /// <item>IOC - Immediate or Cancel; filled immediately or canceled, partial fills are accepted.</item>
      /// <item>FOK - Fill or Kill; orders are filled entirely or canceled, partial fills are not accepted.</item>
      /// <item>1 - 1 minute; expires after the 1 minute.</item>
      /// <item>3 - 3 minutes; expires after the 3 minutes.</item>
      /// <item>5 - 5 minutes; expires after the 5 minutes.</item>
      /// </list>
      /// </summary>
      [Required]
      public string Duration { get; set; } = "DAY";
      public object? Expiration { get; set; }
   }
}