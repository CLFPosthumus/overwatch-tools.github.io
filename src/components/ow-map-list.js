angular.module('overwatch-hero-picker').component('owMapList', {
    bindings: {
        selectedMap: '='
    },
    templateUrl: 'ow-map-list.html',
    controller: function (MapsService, MapModes) {

        this.selectedMap = null;
        this.mapModes = MapModes;
        MapsService.getMaps().then(maps => {
            this.mapsGroups = maps.groups.sort(function (a, b) {
                if (a.type === 'KOTH' && b.type !== 'KOTH') {
                    return 1;
                }
                if (b.type === 'KOTH' && a.type !== 'KOTH') {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
                return 0;
            });
        });

        this.selectMap = (map) => {
            if (map === this.selectedMap) {
                this.selectedMap = null;
            } else {
                this.selectedMap = map;
            }
        };
    }
});
