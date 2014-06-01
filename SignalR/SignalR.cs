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
   public class ConnectionSettings 
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

      public void error(Action<string> errorFunction) { }
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
      
      public hubProxy starting(Action handler) { return this; }
      public hubProxy received(Action<object> handler) { return this; }
      public hubProxy error(Action<string> handler) { return this; }
      public hubProxy stateChanged(Action<SignalRStateChange> handler) { return this; }
      public hubProxy disconnected(Action handler) { return this; }
      public hubProxy connectionSlow(Action handler) { return this; }
      public hubProxy sending(Action handler) { return this; }
      public hubProxy reconnecting(Action handler) { return this; }
      public hubProxy reconnected(Action handler) { return this; } 
   }   
}
