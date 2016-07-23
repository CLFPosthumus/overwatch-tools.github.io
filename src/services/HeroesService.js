angular.module('overwatch-hero-picker').service('HeroesService', function ($http) {
    this.getHeroes = () => $http.get('data/heroes.json').then(response => response.data);
    this.getMatching = () => $http.get('data/matching.json').then(response => response.data);
});
