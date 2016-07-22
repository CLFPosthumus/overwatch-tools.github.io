angular.module('overwatch-hero-picker').component('owHeroList', {
    bindings: {
        selectedHeroes: '='
    },
    templateUrl: 'ow-hero-list.html',
    controller: function ($http, $document, $scope) {
        let checkMaxReached = () => {
            this.maxReached = Object.keys(this.selectedHeroes).length === 6;
        };

        $http.get('data/heroes.json').then(response => this.heroes = response.data);

        this.focused = true;
        this.selectedHeroes = {};

        checkMaxReached();

        this.selectHero = (hero) => {

            if (angular.isDefined(this.selectedHeroes[hero.id])) {
                delete this.selectedHeroes[hero.id];
            } else if (!this.maxReached){
                this.selectedHeroes[hero.id] = hero;
            }

            checkMaxReached();

            if (this.maxReached) {
                this.focused = false;
            }

        };

        $scope.$watch('$ctrl.focused', checkMaxReached);

        $document.on('keyup', (event) => {
            if (event.keyCode === 27) {
                this.focused = false;
                $scope.$apply();
            }

        });
    }
});
