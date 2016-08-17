angular.module('overwatch-hero-picker').service('HeroesService', function HeroesService(Api) {
    this.getHeroes = () => Api.getTopic('heroes');
    this.getMatching = () => Api.getTopic('matching');
});
