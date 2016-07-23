angular.module('overwatch-hero-picker').component('owMapList', {
    bindings: {
        selectedMap: '='
    },
    templateUrl: 'ow-map-list.html',
    controller: function (MapsService, $document, $scope) {

        this.selectedMap = null;

        MapsService.getMaps().then(maps => {
            this.maps = maps;
        });

        this.selectMap = (map) => {
            if (map === this.selectedMap){
                this.selectedMap = null;
            } else {
                this.selectedMap = map;
            }
        };
    }
});
