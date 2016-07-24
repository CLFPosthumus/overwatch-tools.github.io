angular.module('overwatch-hero-picker').component('owHeroPicker', {
    templateUrl: 'ow-hero-picker.html',
    controller: function ($q, $scope, HeroesService, HeroPickerService) {
        this.selectedHeroes = [];
        this.heroesList = [];
        this.heroesRating = {};
        this.selectedMap = null;

        $scope.$watch('$ctrl.selectedMap', (value) => {
            if (angular.isDefined(value)){
                this.getRecommendedHero();
            }
        });

        $scope.$watchCollection('$ctrl.selectedHeroes', (value) => {
            if (value) {
                this.getRecommendedHero();
            }
        });

        this.getRecommendedHero = () => {
            return $q.all({
                ratings: HeroPickerService.getRecommendedHero(this.selectedHeroes, this.selectedMap),
                heroesList: HeroesService.getHeroes()
            }).then(r => {
                this.heroFinalScore = r.ratings.finalRating;
                this.heroCounterScore = r.ratings.heroCounterRating;
                this.heroMapScore = r.ratings.heroMapRating;

                this.heroesList = r.heroesList.sort(function (heroA, heroB) {
                    return r.ratings.finalRating[heroA.id] - r.ratings.finalRating[heroB.id];
                });
            });
        };

        this.recommendedFilter = hero => {
            return this.heroFinalScore[hero.id] <= 0;
        };
        this.avoidFilter = hero => this.heroFinalScore[hero.id] > 0;
    }
});
