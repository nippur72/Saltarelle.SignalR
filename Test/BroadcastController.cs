using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Html;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

using AngularJS;
using SignalR;

public class Message
{
   public string username;
   public string message;
}

public class BroadcastController
{
   // injectables
   public hubProxy BroadcastHub;

   // model
   public string username;
   public string message;

   public List<Message> received_messages = new List<Message>();

   public BroadcastController(Scope _scope, hubProxy BroadcastHub)
   {       
      this.BroadcastHub = BroadcastHub;
      
      BroadcastHub.on<Message>("broadcastMessage", (msg)=>
      {                  
         received_messages.Add(msg);                                    
         // since the event is received outside of angular, 
         // force a digest cycle (refresh)
         _scope.Digest();
      });            
   }

   public void broadcast()
   {      
      BroadcastHub.invoke("broadcast",username,message);      
   }
}
