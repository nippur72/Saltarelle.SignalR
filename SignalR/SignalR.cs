using System;
using System.Html;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Serialization;
using System.Diagnostics;

using jQueryApi;

namespace SignalR
{
   [Imported]
   public class HubConnectionSettings
   {
      public string queryString;
      public bool logging;
      bool useDefaultPath;
   }
   
   [Imported]
   public sealed class ConnectionSettings 
   {
      dynamic transport;
      dynamic callback;
      bool waitForPageLoad;
      bool jsonp;

      [InlineCode("{}")] public ConnectionSettings() {}
   }

   [Imported]
   public class SignalRStateChange 
   {
       int oldState;
       int newState;
   }

   [Imported]
   public class hubConnection 
   {
      [InlineCode("$.hubConnection()")]
      public static hubConnection connection() { return null; }

      public hubProxy createHubProxy(string name) { return null; } 

      public jQueryDeferred start() { return null; }
      public jQueryDeferred start(ConnectionSettings settings) { return null; }
      public jQueryDeferred start(ConnectionSettings settings, Action callback) { return null; }
      public void send(string data) {}
      public void stop() {}
      public void stop(bool async) {}
      public void stop(bool async, bool notifyServer) {}    

      [IntrinsicProperty] public bool logging { get; set; }

      public void starting(Action handler) {  }
      public void received(Action<object> handler) {  }
      public void error(Action<string> handler) {  }
      public void stateChanged(Action<SignalRStateChange> handler) {  }
      public void disconnected(Action handler) {  }
      public void connectionSlow(Action handler) {  }      
      public void reconnecting(Action handler) {  }
      public void reconnected(Action handler) {  } 
   }

   [Imported]
   public class hubProxy
   {
      public object state;
      public hubConnection connection;
      public string hubName;
      public void init(hubConnection connection, string hubName) { }
      public bool hasSubscriptions() { return false; }
      public hubProxy on<T>(string eventName, Action<T> ob) { return this; }
      public hubProxy off<T>(string eventName, Action<T> ob ) { return this; }
      [ExpandParams] public void invoke(string methodname, params object[] parameters) {}         
   }   
}
