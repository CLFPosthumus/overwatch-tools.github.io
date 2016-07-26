angular.module('overwatch-hero-picker').config(function ($httpProvider,ngDialogProvider) {
    $httpProvider.defaults.cache = true;

    ngDialogProvider.setDefaults({
        className: 'ngdialog-theme-default',
        width: '50%',
        closeByDocument: true,
        closeByEscape: true
    });
});

