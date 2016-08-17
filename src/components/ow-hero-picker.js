angular.module('overwatch-hero-picker').component('owHeroPicker', {
    templateUrl: 'ow-hero-picker.html',
    controller: function ($q, $scope, HeroesService, HeroPickerService, LocalStorageKeys) {
        let minHeroShown = 12;

        this.heroesLimit = minHeroShown;
        this.selectedHeroes = {};
        this.heroesList = [];
        this.heroesRating = angular.fromJson(localStorage.getItem(LocalStorageKeys.heroesRatings)) || {};
        this.selectedMap = null;

        $scope.$watch('$ctrl.selectedMap', (value) => {
            if (angular.isDefined(value)) {
                this.getRecommendedHero();
            }
        });

        $scope.$watch('$ctrl.selectedHeroes', (value) => {
            if (value) {
                this.getRecommendedHero();
            }
        }, true);

        $scope.$watch('$ctrl.heroesRating', (value) => {
            if (value) {
                this.getRecommendedHero();
                localStorage.setItem(LocalStorageKeys.heroesRatings, angular.toJson(this.heroesRating));
            }
        }, true);

        this.getRecommendedHero = () => $q.all({
            ratings: HeroPickerService
                .getRecommendedHero(this.selectedHeroes, this.selectedMap, this.heroesRating),
            heroesList: HeroesService.getHeroes()
        }).then(r => {
            this.heroLimit = minHeroShown;
            this.heroFinalScore = r.ratings.finalRating;
            this.heroCounterScore = r.ratings.heroCounterRating;
            this.heroMapScore = r.ratings.heroMapRating;

            this.heroesList = r.heroesList.sort(function (heroA, heroB) {
                if (r.ratings.finalRating[heroB.id] === r.ratings.finalRating[heroA.id]) {
                    if (heroA.name > heroB.name) {
                        return 1;
                    }
                    if (heroA.name < heroB.name) {
                        return -1;
                    }
                    return 0;
                }
                return r.ratings.finalRating[heroB.id] - r.ratings.finalRating[heroA.id];
            });
        });

        this.toggleHeoresLimit = ($event) => {
            if ($event.target.checked) {
                this.heroesLimit = null;
            } else {
                this.heroesLimit = minHeroShown;
            }
        };

        this.recommendedFilter = hero => {
            return this.heroesLimit !== minHeroShown || this.heroFinalScore[hero.id] >= 0;
        };
        this.avoidFilter = hero => this.heroFinalScore[hero.id] > 0;
    }
});
