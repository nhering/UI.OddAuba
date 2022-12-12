namespace OddAuba
{
   public abstract class BrokerBase
   {
      private AdvisorService _advisor { get; set; }

      public BrokerBase(AdvisorService advisor)
      {
         this._advisor = advisor;
      }
   }
}
