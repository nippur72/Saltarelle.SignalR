using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Html;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;

using AngularJS;
using SignalR;

// this object holds the main SignalR connection

public class SignalRConnections
{
   public hubConnection connection;

   public SignalRConnections()
   {
      connection = hubConnection.connection();              

      connection.error((error)=>
      {
         throw new Exception("Signalr error "+error);
      });

      connection.start().Done(()=>
      {
         //Window.Alert("started!");
      })
      .Fail(()=>
      {
         throw new Exception("Signalr start failed ");
      });      
   }   
}

// giving the global SignalR connection, creates the "broadcastHub"

public class BroadcastHubFactory
{
   public SignalRConnections SignalRConnections;

   public BroadcastHubFactory(SignalRConnections SignalRConnections)
   {
      this.SignalRConnections = SignalRConnections;
   }

   public hubProxy BroadcastHub()
   {      
      return SignalRConnections.connection.createHubProxy("broadcastHub");
   }
}



