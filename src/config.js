angular.module('overwatch-hero-picker').config(function ($httpProvider,ngDialogProvider, $touchProvider) {
    $httpProvider.defaults.cache = true;
    $touchProvider.ngClickOverrideEnabled(true);

    ngDialogProvider.setDefaults({
        className: 'ngdialog-theme-default',
        width: '90%',
        closeByDocument: true,
        closeByEscape: true,
        trapFocus:false
    });

});

