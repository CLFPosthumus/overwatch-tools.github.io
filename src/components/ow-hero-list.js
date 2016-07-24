angular.module('overwatch-hero-picker').component('owHeroList', {
    bindings: {
        selectedHeroes: '=',
        heroesRating: '='
    },
    templateUrl: 'ow-hero-list.html',

    controller: function (HeroesService) {
        let checkMaxReached = () => {
            this.maxReached = Object.keys(this.selectedHeroes).length === 6;
        };

        HeroesService.getHeroes().then(heroes => {
            this.heroes = heroes;
        });

        // $scope.$watch('$ctrl.heroes', function(heroes) {
        //
        //     angular.forEach(heroes, (hero) => {
        //
        //         let heroScope = $scope.$new();
        //
        //         heroScope.hero = hero;
        //         $timeout(function(){
        //             $transclude(heroScope, function(clone, innerScope) {
        //                 //clone is a copy of the transcluded DOM element content.
        //                 console.log(clone);
        //
        //                 //append the transcluded element.
        //                 $element.append($compile(clone)(innerScope));
        //             });
        //         },1000)
        //
        //     });
        // });

        this.selectedHeroes = {};

        checkMaxReached();

        this.selectHero = (hero) => {

            if (angular.isDefined(this.selectedHeroes[hero.id])) {
                delete this.selectedHeroes[hero.id];
            } else if (!this.maxReached) {
                this.selectedHeroes[hero.id] = hero;
            }

            checkMaxReached();

        };

    }
});