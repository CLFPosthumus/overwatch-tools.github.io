angular.module('overwatch-hero-picker', ['ngDialog']).run(function (ngDialog, LocalStorageKeys, $window, $document, $templateCache) {
    function setFullScreen() {
        var doc = $document[0];
        var docEl = $document[0].documentElement;

        var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen ||
            docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen ||
            doc.msExitFullscreen;

        if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement &&
            !doc.msFullscreenElement) {
            requestFullScreen.call(docEl);
        }
        else {
            cancelFullScreen.call(doc);
        }
        $document.off('touchstart', setFullScreen);
    }

    function showHelpMessage() {
        if (!localStorage.getItem(LocalStorageKeys.helpBoxRememberClose)) {
            ngDialog.open({
                template: 'how-to-use.html'
            });
        }
    }

    function isTouchSupported() {
        var msTouchEnabled = window.navigator.msMaxTouchPoints;
        var generalTouchEnabled = "ontouchstart" in document;

        return msTouchEnabled || generalTouchEnabled;
    }

    if (isTouchSupported()) {
        $templateCache.put('touchLayer', '<div ng-click="closeThisDialog()">Please touch to go full screen<br><small>(Drag from top to show address bar)</small></div>');
        $document.on('touchstart', setFullScreen);
        let dialog = ngDialog.open({
            template: 'touchLayer'
        });

        dialog.closePromise.then(showHelpMessage);
    } else {
        showHelpMessage();
    }




});
