angular.module('app.controller', [])

        .controller('AppCtrl', function ($scope, $ionicHistory, Alertuser, $timeout, $ionicPlatform, $cordovaNetwork, ConnectParse, $q, $state, $rootScope, $localStorage, $ionicLoading) {

            $rootScope.mode = {
                searchbx: ''
            }
            var countBack = 0;
            $ionicPlatform.registerBackButtonAction(function (event) {

                if ($state.$current.name == "app.addTodo")
                {
                    if ($rootScope.mode.searchbx == true) {
                        $rootScope.mode.searchbx = false;
                        console.log($rootScope.mode.searchbx);
//                        $ionicHistory.goBack();
                    } else {
                        countBack++;
                    }
                    if (countBack == 1) {
                        Alertuser.alert("press back again to exit");
                        $timeout(function () {
                            countBack = 0;
                        }, 2000);
                    } else if (countBack == 2) {
                        navigator.app.exitApp();
                        countBack = 0;
                    }

                }
                else if ($state.$current.name == "login") {
//                     countBack++;//                    
                    if (countBack == 1) {
                        Alertuser.alert("press back again to exit");
                        $timeout(function () {
                            countBack = 0;
//                            window.plugins.toast.hide();
                        }, 2000);
                    } else if (countBack == 2) {
                        navigator.app.exitApp();
//                        window.plugins.toast.hide();
                        countBack = 0;
                    }
                }
                else {

                    navigator.app.backHistory();
                    $ionicHistory.nextViewOptions({
                                            disableBack: true
                                        });

                }
            }, 100);

            $scope.cut = function (email) {
                if(email){
                if (email.length > 25) {
                    var email2 = email.substr(0, 25);
                    var email1 = email2 + '....';
                    return email1;
                }
                else {
                    return email;
                }
            }
            }
            $scope.$on('$ionicView.enter', function () {
                if (!$localStorage['Initializer']) {
                    $scope.profileList = true;
                }

                if (window.cordova) {
                    if ($localStorage['Initializer']) {
                        if ($localStorage['Initializer'].length > 18) {
                            $scope.loggedUser = $localStorage["loggedUsername"];
                            if ($localStorage["google_user"]) {
                                $scope.userprofile = $localStorage["google_user"].profile;
                                $scope.emailid = $localStorage["google_user"].email;
                            }
                        } else {
                            var fbid = $localStorage["Initializer"];
                            $scope.loggedUser = $localStorage["loggedUsername"];
                            $scope.userprofile = "http://graph.facebook.com/"+fbid+"/picture?type=square";
                        }
                    }
                } else {
                    if ($localStorage['Initializer']) {
                        if ($localStorage['Initializer'].length > 18) {
                            $scope.loggedUser = $localStorage["loggedUsername"];
                            if ($localStorage["google_user"]) {
                                $scope.userprofile = $localStorage["google_user"].profile;
                                $scope.emailid = $localStorage["google_user"].email;
                            } else {
                                $scope.userprofile = "images/google.png"
                                $scope.emailid = "anurag@excellencetechnologies.in"
                            }
                        } else {
                            var fbid = $localStorage["Initializer"];
                            console.log(fbid);
                            $scope.loggedUser = $localStorage["loggedUsername"];
                            $scope.userprofile = "http://graph.facebook.com/"+fbid+"/picture?type=square"
                        }
                    }
                }

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
                                        if (tagString) {
                                            var userTags = tagString.split(",");
                                        }
                                        else {
                                            var userTags = "";
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
                $rootScope.searchbx = false;
                delete $localStorage["todoTasks"];
                $state.go("login");
            };

            $scope.logout = function () {
                $rootScope.searchbx = false;
                $scope.abc = false;
                $scope.profileList = true;

//                $scope.loggedUser = 'Not Logged in';
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
                delete $localStorage["todoTasks"];
                delete $localStorage["google_user"];
                delete $localStorage["Parse/F8TOhK8zoN69mY0OydaZBgVOcFT4xAxlLYegGFX2/installationId"];
                ;

                console.log("a");
                $timeout(function () {
                    $state.go("login")
                    $ionicLoading.hide();
                }, 1000);
                Alertuser.alert("Logging out..");
                $scope.ifLoogedIn = false;
                console.log("c");
            }; // end of logout function
        });