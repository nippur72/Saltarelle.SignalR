using Microsoft.AspNet.SignalR;
using Microsoft.Owin;
using Owin;

public class BroadcastHub : Hub
{
   public void broadcast(string username, string message)
   {      
      var msg = new { username=username, message=message };
      Clients.All.broadcastMessage(msg);
   }
}
 
 

