angular.module('overwatch-hero-picker').component('owHeroPicker', {
    templateUrl: 'ow-hero-picker.html',
    controller: function ($q, $scope, HeroesService, HeroPickerService) {
        let minHeroShown = 12;

        this.selectedHeroes = {};
        this.heroesList = [];
        this.heroesRating = {};
        this.selectedMap = null;

        $scope.$watch('$ctrl.selectedMap', (value) => {
            if (angular.isDefined(value)){
                this.getRecommendedHero();
            }
        });

        $scope.$watch('$ctrl.selectedHeroes', (value) => {
            if (value) {
                this.getRecommendedHero();
            }
        }, true);

        this.getRecommendedHero = () => $q.all({
                ratings: HeroPickerService.getRecommendedHero(this.selectedHeroes, this.selectedMap),
                heroesList: HeroesService.getHeroes()
            }).then(r => {
                this.heroLimit = minHeroShown;
                this.heroFinalScore = r.ratings.finalRating;
                this.heroCounterScore = r.ratings.heroCounterRating;
                this.heroMapScore = r.ratings.heroMapRating;

                this.heroesList = r.heroesList.sort(function (heroA, heroB) {
                    return r.ratings.finalRating[heroB.id] - r.ratings.finalRating[heroA.id];
                });
            });


        this.recommendedFilter = hero => {
            return this.heroLimit != minHeroShown || this.heroFinalScore[hero.id] >= 0;
        };
        this.avoidFilter = hero => this.heroFinalScore[hero.id] > 0;
    }
});
