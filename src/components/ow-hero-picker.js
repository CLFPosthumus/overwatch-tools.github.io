angular.module('overwatch-hero-picker').component('owHeroPicker', {
    templateUrl: 'ow-hero-picker.html',
    controller: function ($q, $scope, HeroesService, HeroPickerService) {
        this.selectedHeroes = [];
        this.heroesList = [];


        $scope.$watchCollection('$ctrl.selectedHeroes', (value) => {
            //debugger;
            if (value && Object.keys(value).length > 0) {
                this.getRecommendedHero();
            } else {
                this.heroesList.length = 0;
            }
        });

        this.getRecommendedHero = () => {
            return $q.all({
                recommendedCounterScore: HeroPickerService.getRecommendedHero(this.selectedHeroes),
                heroesList: HeroesService.getHeroes()
            }).then(r => {
                this.heroCounterScore = r.recommendedCounterScore;
                this.heroesList = r.heroesList.sort(function (heroA, heroB) {
                    return r.recommendedCounterScore[heroA.id] - r.recommendedCounterScore[heroB.id];
                });
            });
        };

        this.abs = Math.abs;
        this.recommendedFilter = hero => {
            return this.heroCounterScore[hero.id] <= 0;
        };
        this.avoidFilter = hero => this.heroCounterScore[hero.id] > 0;
    }
});
