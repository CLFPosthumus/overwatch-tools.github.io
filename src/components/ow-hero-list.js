angular.module('overwatch-hero-picker').component('owHeroList', {
    bindings: {
        selectedHeroes: '='
    },
    templateUrl: 'ow-hero-list.html',
    controller: function ($http, $document, $scope) {
        $http.get('data/heroes.json').then(response => this.heroes = response.data);
        this.focused = true;
        this.selectedHeroes = {};

        this.selectHero = (hero) => {
            if (angular.isDefined(this.selectedHeroes[hero.id])) {
                delete this.selectedHeroes[hero.id];
            } else {
                this.selectedHeroes[hero.id] = hero;
            }
            if (Object.keys(this.selectedHeroes).length === 6){
                this.focused = false;
            }

        };

        $document.on('keyup', (event) => {
            if (event.keyCode === 27) {
                this.focused = false;
                $scope.$apply();
            }

        });
    }
});
