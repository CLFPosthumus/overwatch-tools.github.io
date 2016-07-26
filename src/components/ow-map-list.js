angular.module('overwatch-hero-picker').component('owMapList', {
    bindings: {
        selectedMap: '='
    },
    templateUrl: 'ow-map-list.html',
    controller: function (MapsService, MapModes) {

        this.selectedMap = null;
        this.mapModes = MapModes;
        MapsService.getMaps().then(maps => {
            this.maps = maps.sort(function(a,b){
                if (a.mode === 'KOTH' && b.mode !== 'KOTH'){
                    return 1;
                }
                if (b.mode === 'KOTH' && a.mode !== 'KOTH'){
                    return -1;
                }
                if (a.id > b.id){
                    return 1;
                }
                if (a.id < b.id){
                    return -1;
                }
                return 0;
            });
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
