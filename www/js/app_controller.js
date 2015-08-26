angular.module('app.controller', [])

        .controller('AppCtrl', function ($scope, Alertuser, $timeout, $cordovaNetwork, ConnectParse, $q, $state, $rootScope, $localStorage, $ionicLoading) {
            $scope.loggedUser = $localStorage["loggedUsername"];
            if($localStorage["google_user"]){
            $scope.userprofile = $localStorage["google_user"].profile;
            $scope.emailid = $localStorage["google_user"].email;
        }
            $scope.$on('$ionicView.enter', function () {
                
                if ($localStorage["Initializer"]) {
                    $rootScope.ifLoogedIn = true;
                }
                if ($localStorage["Initializer"]) {
                    var ifTagsFetched = $q.when(ConnectParse.checkIfRecordExist(parseInt($localStorage["Initializer"])));
                    ifTagsFetched.then(
                            function (result) {
                                var tags = [];
                                if (result.length > 0) {
                                    for (var i = 0; i < result.length; i++) {
                                        //put all tags together ever used by user
                                        var tagString = result[i].get("todoTag");
                                        if(tagString){
                                            var userTags = tagString.split(",");
                                        }
                                        else{
                                            var userTags="";
                                        }
                                        for (var j = 0; j < userTags.length; j++) {
                                            tags.push(userTags[j]);
                                        }
                                    }
                                    tags = tags.filter(function (value, index, self) {
                                        return self.indexOf(value) === index;
                                    });
                                    $localStorage["userTags"] = tags;
                                    $scope.userTags = tags;
                                }
                                else {
                                    console.log("No records found");
                                }
                            },
                            function (error) {
                                console.log(error);
                            }
                    );
                }
                else {
                    if ($localStorage["userTags"]) {
                        $scope.userTags = $localStorage["userTags"];
                    }
                }

            });
            $scope.filterCategory = function () {
                var selectedTag = this.tag;
                console.log(selectedTag);
                console.log("selectedTag");
                $rootScope.selectedTag = selectedTag;
                $state.go("app.category");
            };
            $scope.login = function () {
                $state.go("login");
            };

            $scope.logout = function () {
//                 $localStorage.$reset();
                console.log("logging out");
                $ionicLoading.show({
                    content: '<i class="icon ion-loading-c">',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 100,
                    showDelay: 0
                });
               
                delete $localStorage["Initializer"];
                delete $localStorage["Parse/F8TOhK8zoN69mY0OydaZBgVOcFT4xAxlLYegGFX2/installationId"];
                console.log("a");
                
                $timeout(function () {
                    
                     $state.go('app.addTodo');
                     $ionicLoading.hide();
                }, 1000);
                Alertuser.alert("Logging out..");
                $rootScope.ifLoogedIn = false;
               
               
               
                console.log("c");
            }; // end of logout function
        });



