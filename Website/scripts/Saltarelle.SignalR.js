(function() {
	'use strict';
	var $asm = {};
	global.SignalR = global.SignalR || {};
	ss.initAssembly($asm, 'Saltarelle.SignalR');
	////////////////////////////////////////////////////////////////////////////////
	// SignalR.ConnectionSettings
	var $SignalR_ConnectionSettings = function() {
		this.$transport = null;
		this.$callback = null;
		this.$waitForPageLoad = false;
		this.$jsonp = false;
	};
	$SignalR_ConnectionSettings.__typeName = 'SignalR.ConnectionSettings';
	global.SignalR.ConnectionSettings = $SignalR_ConnectionSettings;
	////////////////////////////////////////////////////////////////////////////////
	// SignalR.HubConnectionSettings
	var $SignalR_HubConnectionSettings = function() {
		this.queryString = null;
		this.logging = false;
		this.$useDefaultPath = false;
	};
	$SignalR_HubConnectionSettings.__typeName = 'SignalR.HubConnectionSettings';
	global.SignalR.HubConnectionSettings = $SignalR_HubConnectionSettings;
	////////////////////////////////////////////////////////////////////////////////
	// SignalR.SignalRStateChange
	var $SignalR_SignalRStateChange = function() {
		this.$oldState = 0;
		this.$newState = 0;
	};
	$SignalR_SignalRStateChange.__typeName = 'SignalR.SignalRStateChange';
	global.SignalR.SignalRStateChange = $SignalR_SignalRStateChange;
	ss.initClass($SignalR_ConnectionSettings, $asm, {});
	ss.initClass($SignalR_HubConnectionSettings, $asm, {});
	ss.initClass($SignalR_SignalRStateChange, $asm, {});
})();
