namespace OddAuba
{
   /// <summary>
   /// This interface only exists because we want to be able to
   /// have multiple broker implementations. They are all able
   /// to perform any logic that is required.
   /// </summary>
   public interface IBroker
   {
      public string Name { get; set; }

      // No specific methods are required for an IBroker implementation.
   }
}