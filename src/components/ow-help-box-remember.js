angular.module('overwatch-hero-picker').component('owHelpBoxRemember', {
    templateUrl: 'ow-help-box-remember.html',
    controller: function (LocalStorageKeys) {

        this.isKeepShowingChecked = !localStorage.getItem(LocalStorageKeys.helpBoxRememberClose);

        this.rememberHelpClose = function ($event) {
            if ($event.target.checked) {
                localStorage.removeItem(LocalStorageKeys.helpBoxRememberClose);
            } else {
                localStorage.setItem(LocalStorageKeys.helpBoxRememberClose, 'true');
            }

        };
    }
});
