angular.module('overwatch-hero-picker').component('owHeroPicker', {
    templateUrl: 'ow-hero-picker.html',
    controller: function () {
        this.selectedHeroes = [];

        this.onHeroSelected = hero => {
            this.selectedHeroes.push(hero);
        };

        this.removeSelectedHero = index => {
            this.selectedHeroes.splice(index, 1);
        };
    }
});
