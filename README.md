chrome-rDebug
=============

Api for using chrome remote debugging protocol. Written to provide a bridge api for AppJS v2.0

The API implements all methods detailed in the spec: https://developers.google.com/chrome-developer-tools/docs/protocol/1.0/

Page Api:
=========

* pageNavigate(url)
* pageReload
* pageDisableEvents
* pageEnableEvents
 
Console Api:
============
* consoleClearMessages
* consoleEnable
* consoleDisable

DOM Api:
========
* domGetDocument
* domGetOuterHTML
* domHideHighlight
* domHighlightNode
* domHighlightRect
* domMoveTo
* domQuerySelector
* domQuerySelectorAll
* domRemoveAttribute
* domRemoveNode
* domRequestChildNodes
* domRequestNode
* domResolveNode
* domSetAttributeValue
* domSetAttributesAsText
* domSetNodeName
* domSetNodeValue
* domSetOutputHTML

DOM Debugger Api:
=================
* domDebuggerRemoveDomBreakpoint
* domDebuggerRemoveEventListenerBreakpoint
* domDebuggerRemoveXHRBreakpoint
* domDebuggerSetDomBreakpoint
* domDebuggerSetEventListenerBreakpoint
* domDebuggerSetXHRBreakpoint 

Runtime Api:
============
* runtimeCallFunctionOn
* runtimeEvaluate
* runtimeGetProperties
* runtimeReleaseObject
* runtimeReleaseObjectGroup 

Timeline Api:
=============
* timelineStart
* timelineEnd

Network Api:
============
* networkCanClearBrowserCache
* networkCanClearBrowserCookies
* networkClearBrowserCache
* networkClearBrowserCookies
* networkEnableEvents
* networkDisableEvents
* networkGetResponseBody
* networkSetCacheDisabled
* networkSetExtraHTTPHeaders
* networkSetUserAgentOverride

Event Api:
==========
Register to handle a given event, use '*' to handle all events.

Event Api Example code:-

    rDebugApi.on('DOM.documentUpdated',function(event) {
        console.log("Event:document updated");
    });
    rDebugApi.on('*',function(event) {
        //fired for all events.
        console.log("Event:",event);
    });

Methods like consoleEnable will turn on console events so you can handle them. consoleDisable and similar functions will then turn off those events.
