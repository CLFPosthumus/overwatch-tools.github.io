angular.module('overwatch-hero-picker').component('owHeroPickerScore', {
    bindings: {
        map: '<',
        counter: '<',
        final: '<'
    },
    controller: function (){
        this.abs = Math.abs;
    },
    templateUrl: 'ow-hero-picker-score.html'
});
