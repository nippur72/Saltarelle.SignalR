<%@ Page Language="C#" AutoEventWireup="true"  %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
   <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
   <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
   <meta charset="utf-8"/>
   <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
   <meta name="fragment" content="!"/>   
   <title></title> 

   <!-- javascript libraries -->
   <%=this.NoCacheJavaScript("~scripts/jquery-2.1.0.js")%>
   <%=this.NoCacheJavaScript("~scripts/jquery-ui-1.10.4.js")%>   
   <%=this.NoCacheJavaScript("~scripts/angular.js")%>    
   
   <!-- saltarelle and its libraries -->
   <%=this.NoCacheJavaScript("~scripts/mscorlib.js")%>
   <%=this.NoCacheJavaScript("~scripts/Saltarelle.AngularJS.js")%>
   <%=this.NoCacheJavaScript("~scripts/Saltarelle.SignalR.js")%>

   <!-- the application -->
   <%=this.NoCacheJavaScript("~scripts/App.js")%>
   
   <!-- signalr -->
   <%=this.NoCacheJavaScript("~scripts/jquery.signalR-2.0.3.min.js")%>
   <script src="signalr/hubs"></script>

   <script type="text/javascript">
      MainProgram.Main();
   </script>        
   <link href="css/bootstrap.css" rel="stylesheet" type="text/css"/>
   <link href="css/bootstrap-theme.css" rel="stylesheet" type="text/css"/>
   <link href="css/basic.css" rel="stylesheet" type="text/css"/>
</head>

<body ng-app="App">   

   <div id="wrapper" ng-controller="BroadcastController as ctrl">     
      <header>
         <h1>Saltarelle.SignalR sample "chat" app</h1>
      </header>
      <p>Note: to see it working, open two or more browser windows pointing this URL.</p>
      <p>
         Your name: <input ng-model="ctrl.username"/>
         Message: <input ng-model="ctrl.message"/>
         <button ng-click="ctrl.broadcast()">Broadcast</button>
      </p>
      
      <hr />
      What was received so far:
      <ul>
         <li ng-repeat="msg in ctrl.received_messages">{{msg.username}} wrote: {{msg.message}}</li>
      </ul>
      <footer>Sample chat app</footer>      
   </div>   
</body>

</html>
