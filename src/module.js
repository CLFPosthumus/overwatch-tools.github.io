angular.module('overwatch-hero-picker', ['ngDialog']).run(function (ngDialog, LocalStorageKeys) {

    if (!localStorage.getItem(LocalStorageKeys.helpBoxRememberClose)) {
        ngDialog.open({
            template: 'how-to-use.html'
        });
    }

});
