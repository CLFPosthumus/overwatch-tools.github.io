angular.module('overwatch-hero-picker').component('owResetPlayerHeroRating', {
    template: '<button ng-click="$ctrl.resetRatings()">Reset ratings</button>',
    bindings: {
        heroesRating: '='
    },
    controller: function (LocalStorageKeys) {
        this.resetRatings = () => {
            localStorage.removeItem(LocalStorageKeys.heroesRatings);
            // debugger;
            for (let i in this.heroesRating){
                if (this.heroesRating.hasOwnProperty(i)){
                    this.heroesRating[i] = 0;
                }
            }
        };
    }
});
