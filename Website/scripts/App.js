(function() {
	'use strict';
	var $asm = {};
	ss.initAssembly($asm, 'App');
	////////////////////////////////////////////////////////////////////////////////
	// BroadcastController
	var $BroadcastController = function(_scope, BroadcastHub) {
		this.BroadcastHub = null;
		this.username = null;
		this.message = null;
		this.received_messages = [];
		this.BroadcastHub = BroadcastHub;
		BroadcastHub.on('broadcastMessage', ss.mkdel(this, function(msg) {
			ss.add(this.received_messages, msg);
			// since the event is received outside of angular, 
			// force a digest cycle (refresh)
			_scope.$digest();
		}));
	};
	$BroadcastController.__typeName = 'BroadcastController';
	global.BroadcastController = $BroadcastController;
	////////////////////////////////////////////////////////////////////////////////
	// BroadcastHubFactory
	var $BroadcastHubFactory = function(SignalRConnections) {
		this.SignalRConnections = null;
		this.SignalRConnections = SignalRConnections;
	};
	$BroadcastHubFactory.__typeName = 'BroadcastHubFactory';
	global.BroadcastHubFactory = $BroadcastHubFactory;
	////////////////////////////////////////////////////////////////////////////////
	// MainProgram
	var $MainProgram = function() {
	};
	$MainProgram.__typeName = 'MainProgram';
	$MainProgram.Main = function() {
		var app = angular.module('App', []);
		AngularJS.ModuleBuilder.Service($SignalRConnections).call(null, app);
		AngularJS.ModuleBuilder.Factory($BroadcastHubFactory).call(null, app);
		AngularJS.ModuleBuilder.Controller($BroadcastController).call(null, app);
	};
	global.MainProgram = $MainProgram;
	////////////////////////////////////////////////////////////////////////////////
	// Message
	var $Message = function() {
		this.username = null;
		this.message = null;
	};
	$Message.__typeName = 'Message';
	global.Message = $Message;
	////////////////////////////////////////////////////////////////////////////////
	// SignalRConnections
	var $SignalRConnections = function() {
		this.connection = null;
		this.connection = $.hubConnection();
		this.connection.error(function(error) {
			throw new ss.Exception('Signalr error ' + error);
		});
		this.connection.start().done([function() {
			//Window.Alert("started!");
		}]).fail([function() {
			throw new ss.Exception('Signalr start failed ');
		}]);
	};
	$SignalRConnections.__typeName = 'SignalRConnections';
	global.SignalRConnections = $SignalRConnections;
	ss.initClass($BroadcastController, $asm, {
		broadcast: function() {
			this.BroadcastHub.invoke('broadcast', this.username, this.message);
		}
	});
	ss.initClass($BroadcastHubFactory, $asm, {
		BroadcastHub: function() {
			return this.SignalRConnections.connection.createHubProxy('broadcastHub');
		}
	});
	ss.initClass($MainProgram, $asm, {});
	ss.initClass($Message, $asm, {});
	ss.initClass($SignalRConnections, $asm, {});
})();
