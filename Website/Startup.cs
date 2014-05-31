﻿using Microsoft.AspNet.SignalR;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(Startup))]

public class Startup
{
   public void Configuration(IAppBuilder app)
   {
      var hubConfiguration = new HubConfiguration();
      hubConfiguration.EnableDetailedErrors = true;
      hubConfiguration.EnableJavaScriptProxies = true;
      app.MapSignalR("/signalr", hubConfiguration);
      
      //app.MapSignalR();
   }
}

