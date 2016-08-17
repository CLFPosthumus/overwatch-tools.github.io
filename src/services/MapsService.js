angular.module('overwatch-hero-picker').service('MapsService', function MapsService(Api) {
    this.getMaps = () => Api.getTopic('maps');

});
