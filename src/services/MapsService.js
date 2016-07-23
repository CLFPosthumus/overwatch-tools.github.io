angular.module('overwatch-hero-picker').service('MapsService', function ($http) {
    this.getMaps = () => $http.get('data/maps.json').then(response => response.data);

});
