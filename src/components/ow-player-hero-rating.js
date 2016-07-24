angular.module('overwatch-hero-picker').component('owPlayerHeroRating', {
    bindings: {
        heroesRating: '=',
    },
    templateUrl: 'ow-player-hero-rating.html',
    controller: function (HeroesService) {
        HeroesService.getHeroes().then(heroes => {
            this.heroes = heroes;
        });
    }
});
