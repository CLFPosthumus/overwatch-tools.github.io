angular.module('overwatch-hero-picker').component('owHeroList', {
    bindings: {
        selectedHeroes: '='
    },
    templateUrl: 'ow-hero-list.html',

    controller: function (HeroesService, $scope) {

     //   this.selectedHeroes = this.selectedHeroes || [];

        let checkMaxReached = () => {
            this.maxReached = Object.keys(this.selectedHeroes).length === 6;
        };

        this.selectHero = (hero) => {
            if (angular.isDefined(this.selectedHeroes[hero.id])) {
                delete this.selectedHeroes[hero.id];
            } else if (!this.maxReached) {
                this.selectedHeroes[hero.id] = hero;
            }

            checkMaxReached();
        };

        HeroesService.getHeroes().then(heroes => {
            this.heroes = heroes;
        });

        checkMaxReached();
    }
});
