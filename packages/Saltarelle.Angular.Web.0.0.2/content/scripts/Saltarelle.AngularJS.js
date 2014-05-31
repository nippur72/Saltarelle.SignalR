﻿(function() {
	'use strict';
	var $asm = {};
	global.AngularJS = global.AngularJS || {};
	global.AngularJS.UiRouter = global.AngularJS.UiRouter || {};
	ss.initAssembly($asm, 'Saltarelle.AngularJS');
	////////////////////////////////////////////////////////////////////////////////
	// AngularJS.Angular.BuiltinFilters
	var $angular$BuiltinFilters = function() {
	};
	$angular$BuiltinFilters.__typeName = 'angular$BuiltinFilters';
	global.angular$BuiltinFilters = $angular$BuiltinFilters;
	////////////////////////////////////////////////////////////////////////////////
	// AngularJS.BindingStrategies
	var $AngularJS_BindingStrategies = function() {
	};
	$AngularJS_BindingStrategies.__typeName = 'AngularJS.BindingStrategies';
	global.AngularJS.BindingStrategies = $AngularJS_BindingStrategies;
	////////////////////////////////////////////////////////////////////////////////
	// AngularJS.DefinitionObject
	var $AngularJS_DefinitionObject = function() {
	};
	$AngularJS_DefinitionObject.__typeName = 'AngularJS.DefinitionObject';
	global.AngularJS.DefinitionObject = $AngularJS_DefinitionObject;
	////////////////////////////////////////////////////////////////////////////////
	// AngularJS.DirectiveDefinitionHelper
	var $AngularJS_DirectiveDefinitionHelper = function() {
		this.Restrict = 2;
		this.Priority = null;
		this.Terminal = null;
		this.Template = null;
		this.TemplateUrl = null;
		this.Replace = false;
		this.Transclude = false;
		this.ScopeMode = 0;
		this.$ScopeAttributes = [];
		this.$Require = [];
		this.$ControllerType = null;
		this.ControllerAs = null;
		this.Compile = null;
		this.Link = null;
	};
	$AngularJS_DirectiveDefinitionHelper.__typeName = 'AngularJS.DirectiveDefinitionHelper';
	global.AngularJS.DirectiveDefinitionHelper = $AngularJS_DirectiveDefinitionHelper;
	////////////////////////////////////////////////////////////////////////////////
	// AngularJS.Event
	var $AngularJS_Event = function() {
		this.targetScope = null;
		this.currentScope = null;
		this.name = null;
		this.stopPropagation = null;
		this.preventDefault = null;
		this.defaultPrevented = false;
	};
	$AngularJS_Event.__typeName = 'AngularJS.Event';
	global.AngularJS.Event = $AngularJS_Event;
	////////////////////////////////////////////////////////////////////////////////
	// AngularJS.IDirective
	var $AngularJS_IDirective = function() {
	};
	$AngularJS_IDirective.__typeName = 'AngularJS.IDirective';
	global.AngularJS.IDirective = $AngularJS_IDirective;
	////////////////////////////////////////////////////////////////////////////////
	// AngularJS.IResourceObject
	var $AngularJS_IResourceObject = function() {
	};
	$AngularJS_IResourceObject.__typeName = 'AngularJS.IResourceObject';
	global.AngularJS.IResourceObject = $AngularJS_IResourceObject;
	////////////////////////////////////////////////////////////////////////////////
	// AngularJS.ModuleBuilder
	var $AngularJS_ModuleBuilder = function() {
	};
	$AngularJS_ModuleBuilder.__typeName = 'AngularJS.ModuleBuilder';
	$AngularJS_ModuleBuilder.PatchDollarName = function(name) {
		if (ss.startsWithString(name, '_')) {
			return '$' + name.substring(1);
		}
		else {
			return name;
		}
	};
	$AngularJS_ModuleBuilder.PatchDollarName$1 = function(names) {
		var result = [];
		for (var t = 0; t < names.length; t++) {
			ss.add(result, $AngularJS_ModuleBuilder.PatchDollarName(names[t]));
		}
		return Array.prototype.slice.call(result);
	};
	$AngularJS_ModuleBuilder.CommaSeparatedList = function(parameters) {
		var result = '';
		for (var t = 0; t < parameters.length; t++) {
			result += parameters[t];
			if (t !== parameters.length - 1) {
				result += ',';
			}
		}
		return result;
	};
	$AngularJS_ModuleBuilder.FixAnnotation = function(type) {
		var constructor = $AngularJS_TypeExtensionMethods.GetConstructorFunction(type);
		// gets and annotate constructor parameter; annotations are stored in type.$inject                                             
		var parameters = $AngularJS_ModuleBuilder.PatchDollarName$1(angular.injector().annotate(constructor));
		// fix "$" in parameter names
		constructor.$inject = parameters;
		return parameters;
	};
	$AngularJS_ModuleBuilder.Controller = function(T) {
		return function(module) {
			var type = T;
			$AngularJS_ModuleBuilder.FixAnnotation(type);
			module.controller(ss.getTypeName(type), type);
		};
	};
	$AngularJS_ModuleBuilder.Service = function(T) {
		return function(module) {
			var type = T;
			$AngularJS_ModuleBuilder.FixAnnotation(type);
			// patch service name for names starting with "$"                
			var servicename = $AngularJS_ModuleBuilder.PatchDollarName(ss.getTypeName(T));
			module.service(servicename, type);
		};
	};
	$AngularJS_ModuleBuilder.Config = function(T) {
		return function(module) {
			var type = T;
			var parameters = $AngularJS_ModuleBuilder.FixAnnotation(type);
			var plist = $AngularJS_ModuleBuilder.CommaSeparatedList(parameters);
			// "run" function are called without a "this" reference, so we need to instantiate the class with "new"
			var body = '{ new ' + ss.getTypeName(type) + '(' + plist + '); }';
			var F = new Function(parameters, body);
			F.$inject = parameters;
			module.config(F);
		};
	};
	$AngularJS_ModuleBuilder.Run = function(T) {
		return function(module) {
			var type = T;
			var parameters = $AngularJS_ModuleBuilder.FixAnnotation(type);
			var plist = $AngularJS_ModuleBuilder.CommaSeparatedList(parameters);
			// "run" function are called without a "this" reference, so we need to instantiate the class with "new"
			var body = '{ new ' + ss.getTypeName(type) + '(' + plist + '); }';
			var F = new Function(parameters, body);
			F.$inject = parameters;
			module.run(F);
		};
	};
	$AngularJS_ModuleBuilder.Factory = function(T) {
		return function(module) {
			var type = T;
			var parameters = $AngularJS_ModuleBuilder.FixAnnotation(type);
			var plist = $AngularJS_ModuleBuilder.CommaSeparatedList(parameters);
			// register all public instance methods as factory                      
			var $t1 = $AngularJS_TypeExtensionMethods.GetInstanceMethodNames(type);
			for (var $t2 = 0; $t2 < $t1.length; $t2++) {
				var funcname = $t1[$t2];
				var body = '{ return (new ' + ss.getTypeName(type) + '(' + plist + ')).' + funcname + '(); }';
				var F = new Function(parameters, body);
				module.factory($AngularJS_ModuleBuilder.PatchDollarName(funcname), F);
			}
		};
	};
	$AngularJS_ModuleBuilder.Filter = function(T) {
		return function(module) {
			var type = T;
			var parameters = $AngularJS_ModuleBuilder.FixAnnotation(type);
			var plist = $AngularJS_ModuleBuilder.CommaSeparatedList(parameters);
			// register all public instance methods as filters                      
			var $t1 = $AngularJS_TypeExtensionMethods.GetInstanceMethodNames(type);
			for (var $t2 = 0; $t2 < $t1.length; $t2++) {
				var funcname = $t1[$t2];
				var body = '{ var $ob = new ' + ss.getTypeName(type) + '(' + plist + '); return $ob.' + funcname + '; }';
				var F = new Function(parameters, body);
				module.filter($AngularJS_ModuleBuilder.PatchDollarName(funcname), F);
			}
		};
	};
	$AngularJS_ModuleBuilder.Directive = function(T) {
		return function(module) {
			var type = T;
			var parameters = $AngularJS_ModuleBuilder.FixAnnotation(type);
			var plist = $AngularJS_ModuleBuilder.CommaSeparatedList(parameters);
			// a directive is a (injectable) function returning a definition object
			var body = '{ var $ob = new ' + ss.getTypeName(type) + '(' + plist + '); return $ob.GetDefinition(); }';
			var F = new Function(parameters, body);
			// extract directive name from the class name
			var DirectiveName = ss.getTypeName(type);
			if (!ss.endsWithString(DirectiveName, 'Directive')) {
				throw new ss.Exception("'" + DirectiveName + "' must end with the suffix 'Directive'");
			}
			DirectiveName = DirectiveName.substr(0, DirectiveName.length - 9);
			module.directive(DirectiveName, F);
		};
	};
	$AngularJS_ModuleBuilder.Animation = function(T) {
		return function(module, name) {
			//
			//         Type type = typeof(T);
			//
			//         
			//
			//         // TODO when there will be IsSubClassOf
			//
			//         //if(!type.IsSubclassOf(DirectiveDefinition)) throw new Exception(String.Format("{0} is not sub class of {1}",type.Name,typeof(DirectiveDefinition).Name);
			//
			//         
			//
			//         Function fun = CreateAnimationFunction(type);
			//
			//         var parameters = Angular.Injector().Annotate(fun);
			//
			//         var fcall = fun.CreateFunctionCall(parameters);
			//
			//         Animation(module, name==null ? type.Name : name, fcall);
		};
	};
	$AngularJS_ModuleBuilder.$CreateAnimationFunction = function(type) {
		return null;
		//
		//         string body = "";
		//
		//         string thisref = "this";
		//
		//         
		//
		//         body+="var $animob = {};\r\n";
		//
		//         
		//
		//         // gets and annotate constructor parameter; annotations are stored in type.$inject
		//
		//         var parameters = Angular.Injector().Annotate(type.GetConstructorFunction());
		//
		//         
		//
		//         // takes method into $scope, binding "$scope" to "this"
		//
		//         foreach(string funcname in type.GetInstanceMethodNames())
		//
		//         {
		//
		//         body += String.Format("{2}.{1} = {0}.prototype.{1}.bind({2});\r\n",type.FullName,funcname,thisref);
		//
		//         
		//
		//         if(funcname=="Start" || funcname=="Setup" || funcname=="Cancel" )
		//
		//         {
		//
		//         body += String.Format("$animob.{0} = {2}.{1};\r\n",funcname.ToLower(),funcname,thisref);
		//
		//         }
		//
		//         }
		//
		//         
		//
		//         // put call at the end so that methods are defined first
		//
		//         body+=String.Format("{0}.apply({1},arguments);\r\n",type.FullName,thisref);
		//
		//         body+=String.Format("return $animob;\r\n");
		//
		//         return TypeExtensionMethods.CreateNewFunction(parameters,body);
	};
	global.AngularJS.ModuleBuilder = $AngularJS_ModuleBuilder;
	////////////////////////////////////////////////////////////////////////////////
	// AngularJS.ResourceObjectExtensions
	var $AngularJS_ResourceObjectExtensions = function() {
	};
	$AngularJS_ResourceObjectExtensions.__typeName = 'AngularJS.ResourceObjectExtensions';
	global.AngularJS.ResourceObjectExtensions = $AngularJS_ResourceObjectExtensions;
	////////////////////////////////////////////////////////////////////////////////
	// AngularJS.ResourceRequest
	var $AngularJS_ResourceRequest$1 = function(T) {
		var $type = function(resob) {
			this.resource = null;
			this.Action = null;
			this.Parameters = null;
			this.PostData = null;
			this.Success = null;
			this.Error = null;
			this.resource = resob;
		};
		ss.registerGenericClassInstance($type, $AngularJS_ResourceRequest$1, [T], {
			ExecuteRequest: function() {
				return ss.getDefaultValue(T);
			},
			ExecuteRequestArray: function() {
				return null;
			}
		}, function() {
			return null;
		}, function() {
			return [];
		});
		return $type;
	};
	$AngularJS_ResourceRequest$1.__typeName = 'AngularJS.ResourceRequest$1';
	ss.initGenericClass($AngularJS_ResourceRequest$1, $asm, 1);
	global.AngularJS.ResourceRequest$1 = $AngularJS_ResourceRequest$1;
	////////////////////////////////////////////////////////////////////////////////
	// AngularJS.RestrictFlags
	var $AngularJS_RestrictFlags = function() {
	};
	$AngularJS_RestrictFlags.__typeName = 'AngularJS.RestrictFlags';
	global.AngularJS.RestrictFlags = $AngularJS_RestrictFlags;
	////////////////////////////////////////////////////////////////////////////////
	// AngularJS.RouteParams
	var $AngularJS_RouteParams = function() {
	};
	$AngularJS_RouteParams.__typeName = 'AngularJS.RouteParams';
	global.AngularJS.RouteParams = $AngularJS_RouteParams;
	////////////////////////////////////////////////////////////////////////////////
	// AngularJS.Scope
	var $AngularJS_Scope = function() {
	};
	$AngularJS_Scope.__typeName = 'AngularJS.Scope';
	global.AngularJS.Scope = $AngularJS_Scope;
	////////////////////////////////////////////////////////////////////////////////
	// AngularJS.ScopeBindings
	var $AngularJS_ScopeBindings = function(ScopeVariableName) {
		this.ScopeName = null;
		this.AttributeName = null;
		this.Strategy = 0;
		this.ScopeName = ScopeVariableName;
		this.Strategy = 0;
	};
	$AngularJS_ScopeBindings.__typeName = 'AngularJS.ScopeBindings';
	$AngularJS_ScopeBindings.$ctor2 = function(ScopeVariableName, AlternateAttributeName) {
		this.ScopeName = null;
		this.AttributeName = null;
		this.Strategy = 0;
		this.ScopeName = ScopeVariableName;
		this.Strategy = 0;
		this.AttributeName = AlternateAttributeName;
	};
	$AngularJS_ScopeBindings.$ctor1 = function(ScopeVariableName, Strategy) {
		this.ScopeName = null;
		this.AttributeName = null;
		this.Strategy = 0;
		this.ScopeName = ScopeVariableName;
		this.Strategy = Strategy;
	};
	$AngularJS_ScopeBindings.$ctor3 = function(ScopeVariableName, Strategy, AlternateAttributeName) {
		this.ScopeName = null;
		this.AttributeName = null;
		this.Strategy = 0;
		this.ScopeName = ScopeVariableName;
		this.Strategy = Strategy;
		this.AttributeName = AlternateAttributeName;
	};
	global.AngularJS.ScopeBindings = $AngularJS_ScopeBindings;
	////////////////////////////////////////////////////////////////////////////////
	// AngularJS.ScopeModes
	var $AngularJS_ScopeModes = function() {
	};
	$AngularJS_ScopeModes.__typeName = 'AngularJS.ScopeModes';
	global.AngularJS.ScopeModes = $AngularJS_ScopeModes;
	////////////////////////////////////////////////////////////////////////////////
	// AngularJS.TypeExtensionMethods
	var $AngularJS_TypeExtensionMethods = function() {
	};
	$AngularJS_TypeExtensionMethods.__typeName = 'AngularJS.TypeExtensionMethods';
	$AngularJS_TypeExtensionMethods.GetInstanceMethodNames = function(type) {
		var result = [];
		var $t1 = ss.getEnumerator(Object.keys(type.prototype));
		try {
			while ($t1.moveNext()) {
				var key = $t1.current();
				if (key !== 'constructor') {
					ss.add(result, key);
				}
			}
		}
		finally {
			$t1.dispose();
		}
		return result;
	};
	$AngularJS_TypeExtensionMethods.GetConstructorFunction = function(type) {
		return type.prototype['constructor'];
	};
	global.AngularJS.TypeExtensionMethods = $AngularJS_TypeExtensionMethods;
	////////////////////////////////////////////////////////////////////////////////
	// AngularJS.UiRouter.StateEventsExtensions
	var $AngularJS_UiRouter_StateEventsExtensions = function() {
	};
	$AngularJS_UiRouter_StateEventsExtensions.__typeName = 'AngularJS.UiRouter.StateEventsExtensions';
	$AngularJS_UiRouter_StateEventsExtensions.OnStateChangeStart = function(_rootscope, Function) {
		_rootscope.$on('$stateChangeStart', Function);
	};
	$AngularJS_UiRouter_StateEventsExtensions.OnViewContentLoading = function(_scope, Function) {
		_scope.$on('$viewContentLoading', Function);
	};
	$AngularJS_UiRouter_StateEventsExtensions.OnViewContentLoaded = function(_scope, Function) {
		_scope.$on('$viewContentLoaded', Function);
	};
	global.AngularJS.UiRouter.StateEventsExtensions = $AngularJS_UiRouter_StateEventsExtensions;
	ss.initClass($angular$BuiltinFilters, $asm, {});
	ss.initEnum($AngularJS_BindingStrategies, $asm, { Unidirectional: 0, Bidirectional: 1, AsFunction: 2 });
	ss.initClass($AngularJS_DefinitionObject, $asm, {});
	ss.initClass($AngularJS_DirectiveDefinitionHelper, $asm, {
		Controller: function(T) {
			return function() {
				var type = T;
				this.$ControllerType = type;
			};
		},
		$RestrictString: function() {
			var s = '';
			if ((this.Restrict & 1) === 1) {
				s += 'E';
			}
			if ((this.Restrict & 2) === 2) {
				s += 'A';
			}
			if ((this.Restrict & 4) === 4) {
				s += 'C';
			}
			if ((this.Restrict & 8) === 8) {
				s += 'M';
			}
			return s;
		},
		$RequireDirectiveString: function(ControllerName, LookParent, Optional) {
			var s = ControllerName;
			if (Optional) {
				s = '?' + s;
			}
			if (LookParent) {
				s = '^' + s;
			}
			return s;
		},
		RequireDirective: function(ControllerName, LookParent, Optional) {
			ss.add(this.$Require, this.$RequireDirectiveString(ControllerName, LookParent, Optional));
		},
		BindAttribute: function(ScopeVariableName) {
			ss.add(this.$ScopeAttributes, new $AngularJS_ScopeBindings(ScopeVariableName));
		},
		BindAttribute$2: function(ScopeVariableName, AlternateAttributeName) {
			ss.add(this.$ScopeAttributes, new $AngularJS_ScopeBindings.$ctor2(ScopeVariableName, AlternateAttributeName));
		},
		BindAttribute$1: function(ScopeVariableName, Strategy) {
			ss.add(this.$ScopeAttributes, new $AngularJS_ScopeBindings.$ctor1(ScopeVariableName, Strategy));
		},
		BindAttribute$3: function(ScopeVariableName, Strategy, AlternateAttributeName) {
			ss.add(this.$ScopeAttributes, new $AngularJS_ScopeBindings.$ctor3(ScopeVariableName, Strategy, AlternateAttributeName));
		},
		ToDefinitionObject: function() {
			var result = {};
			// maps priority
			if (ss.isValue(this.Priority)) {
				result['priority'] = this.Priority;
			}
			// maps terminal
			if (ss.isValue(this.Priority)) {
				result['termina'] = this.Terminal;
			}
			// maps restrict
			result['restrict'] = this.$RestrictString();
			// maps template and templateUrl
			if (ss.isValue(this.Template)) {
				result['template'] = this.Template;
			}
			else if (ss.isValue(this.TemplateUrl)) {
				result['templateUrl'] = this.TemplateUrl;
			}
			// maps replace
			result['replace'] = this.Replace;
			// maps transclude
			result['transclude'] = this.Transclude;
			// TODO 'element'
			// maps scope
			if (this.ScopeMode === 0) {
				result['scope'] = false;
			}
			else if (this.ScopeMode === 1) {
				result['scope'] = true;
			}
			else if (this.ScopeMode === 2) {
				var scope = {};
				for (var $t1 = 0; $t1 < this.$ScopeAttributes.length; $t1++) {
					var sb = this.$ScopeAttributes[$t1];
					scope[sb.ScopeName] = sb.ScopeBindingString();
				}
				result['scope'] = scope;
			}
			// maps compile and link function
			if (!ss.staticEquals(this.Compile, null)) {
				result['compile'] = this.Compile;
			}
			if (!ss.staticEquals(this.Link, null)) {
				result['link'] = this.Link;
			}
			// maps (shared) controller         
			if (ss.isValue(this.$ControllerType)) {
				result['controller'] = this.$ControllerType;
			}
			// maps controllerAs 
			if (ss.isValue(this.ControllerAs)) {
				result['controllerAs'] = this.ControllerAs;
			}
			// maps require
			if (ss.isValue(this.$Require)) {
				if (this.$Require.length === 1) {
					result['require'] = this.$Require[0];
				}
				else {
					result['require'] = this.$Require;
				}
				// as array of strings
			}
			return result;
		}
	});
	ss.initClass($AngularJS_Event, $asm, {});
	ss.initInterface($AngularJS_IDirective, $asm, { GetDefinition: null });
	ss.initInterface($AngularJS_IResourceObject, $asm, {});
	ss.initClass($AngularJS_ModuleBuilder, $asm, {});
	ss.initClass($AngularJS_ResourceObjectExtensions, $asm, {});
	ss.initEnum($AngularJS_RestrictFlags, $asm, { Element: 1, Attribute: 2, Class: 4, Comment: 8 });
	ss.initClass($AngularJS_RouteParams, $asm, {});
	ss.initClass($AngularJS_Scope, $asm, {});
	ss.initClass($AngularJS_ScopeBindings, $asm, {
		ScopeBindingString: function() {
			var s = '';
			if (this.Strategy === 0) {
				s = '@';
			}
			else if (this.Strategy === 1) {
				s = '=';
			}
			else if (this.Strategy === 2) {
				s = '&';
			}
			if (ss.isValue(this.AttributeName)) {
				s += this.AttributeName;
			}
			return s;
		}
	});
	$AngularJS_ScopeBindings.$ctor2.prototype = $AngularJS_ScopeBindings.$ctor1.prototype = $AngularJS_ScopeBindings.$ctor3.prototype = $AngularJS_ScopeBindings.prototype;
	ss.initEnum($AngularJS_ScopeModes, $asm, { Existing: 0, New: 1, Isolate: 2 });
	ss.initClass($AngularJS_TypeExtensionMethods, $asm, {});
	ss.initClass($AngularJS_UiRouter_StateEventsExtensions, $asm, {});
	ss.setMetadata($AngularJS_RestrictFlags, { enumFlags: true });
})();
