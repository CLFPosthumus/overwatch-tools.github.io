angular.module('overwatch-hero-picker').component('owHero', {
    bindings: {
        hero: '='
    },
    templateUrl: 'ow-hero.html',
    transclude: true
});
