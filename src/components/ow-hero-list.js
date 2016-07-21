angular.module('overwatch-hero-picker').component('owHeroList', {
    bindings: {
        onHeroSelection: '&'
    },
    templateUrl: 'ow-hero-list.html',
    controller: function ($http){
        $http.get('data/heroes.json').then(response => this.heroes = response.data);
        
        this.selectHero = (hero) => {
            this.onHeroSelection(hero);
        }
    }
});
