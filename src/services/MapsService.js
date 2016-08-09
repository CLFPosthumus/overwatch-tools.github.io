angular.module('overwatch-hero-picker').service('MapsService', function (Api) {
    this.getMaps = () => Api.getTopic('maps');

});
