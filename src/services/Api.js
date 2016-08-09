angular.module('overwatch-hero-picker').service('Api', function Api($log, $rootScope, $q, WS_API) {
    let socket = new eio.Socket(WS_API, {
        transports: ['websocket']
    });
    let topics = {};

    function readMessage(data) {
        let dataObj = JSON.parse(data);

        topics[dataObj.topic] = topics[dataObj.topic] || $q.defer();

        $rootScope.$broadcast('api.' + dataObj.topic, dataObj.content);
        topics[dataObj.topic].resolve(dataObj.content);
    }

    socket.on('open', function () {
        socket.on('message', readMessage);
    });

    this.getTopic = function (topic) {
        topics[topic] = topics[topic] || $q.defer();
        return topics[topic].promise;
    };
});
