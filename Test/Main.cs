using System;

using System.Html;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Serialization;
using System.Diagnostics;

using SignalR;

using AngularJS;

public class MainProgram
{
   public static void Main()
   {                    
      Module app = new Module("App");
      
      app.Service<SignalRConnections>();
      app.Factory<BroadcastHubFactory>();
      app.Controller<BroadcastController>();
   } 
}




