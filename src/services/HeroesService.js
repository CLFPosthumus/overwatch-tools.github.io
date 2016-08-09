angular.module('overwatch-hero-picker').service('HeroesService', function (Api) {
    this.getHeroes = () => Api.getTopic('heroes');
    this.getMatching = () => Api.getTopic('matching');
});
