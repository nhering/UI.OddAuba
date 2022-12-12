namespace TradeStation
{
   public class Wallet
   {
      /// <summary>
      /// TradeStation Account ID.
      /// </summary>
      public string AccountID { get; set; }

      /// <summary>
      /// The balance of the specific currency in the account.
      /// </summary>
      public string Balance { get; set; }

      /// <summary>
      /// The amount of cash in the account that can be used to make trades.
      /// </summary>
      public string BalanceAvailableForTrading { get; set; }

      /// <summary>
      /// The amount of cash in the account that can be withdrawn.
      /// </summary>
      public string BalanceAvailableForWithdrawal { get; set; }

      /// <summary>
      /// The currency of the wallet.
      /// </summary>
      public string Currency { get; set; }

      /// <summary>
      /// The status of this wallet - Active, Suspended.
      /// </summary>
      public string Status { get; set; }

      /// <summary>
      /// The unrealized profit or loss for the account wallet.
      /// </summary>
      public string UnrealizedProfitLossAccountCurrency { get; set; }
   }
}
