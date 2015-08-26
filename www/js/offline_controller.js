angular.module('offline.controller', [])

        .controller('OfflineCtrl', function($scope, $rootScope, $localStorage, $cordovaNetwork, $state) {
            //network switched to online
            $rootScope.$on('$cordovaNetwork:online', function(event, networkState) {
                console.log("online" + $cordovaNetwork.getNetwork());
                if ($localStorage["Initializer"]) {
                    $state.go("app.addTodo");
                }
                else
                {
                    $state.go("fb");
                }
            });
        })

        ;


