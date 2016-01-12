angular.module('fb.controller', [])
        .controller('FbCtrl', function ($cordovaNetwork, timeStorage, $scope, $timeout, $ionicLoading, $state, $rootScope, googleLogin, $q, ConnectParse, Alertuser, $localStorage, $log) {
            var self = this;

            $scope.$on('$ionicView.enter', function () {
                if ($localStorage["Initializer"]) {
                    $state.go("app.addTodo");
                }
            });

            //click on skip login then call function
            $scope.withoutLogin = function () {
                $ionicLoading.show({
                    content: '<i class="icon ion-loading-c">',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 100,
                    showDelay: 0
                });
                $timeout(function () {
                    $ionicLoading.hide();
                    $state.go("app.addTodo");
                    $rootScope.ifLoogedIn=false;
                }, 1000);
            };

//             via Google Login
            $scope.gLogin = function () {
                console.log("123 Check");
                if (window.cordova) {
                    var opt = {
                        client_id: '183153668398-sn7mh4ddk8lkskqvs7r6v5h3eas7ng8c.apps.googleusercontent.com',
                        redirect_uri: 'http://localhost:8383/myTODO/www/',
                        scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/plus.me',
                        secret: 'yz4pFJNNX-cqu3T3pJyHLlkw'
                    };


                    var gLogSuccess = googleLogin.authorize(opt);

                    gLogSuccess.then(function (res) {
                        $ionicLoading.show({
                            content: '<i class="icon ion-loading-c">',
                            animation: 'fade-in',
                            showBackdrop: true,
                            maxWidth: 100,
                            showDelay: 0
                        });
                        console.log("gooooooooooooooogle")
                        console.log(res);
                        console.log(res.email);
//                   $state.go("app.addTodo");
                        var googleObj = {};
                        googleObj.id = res.google_id;
                        googleObj.fname = res.name;
                        googleObj.lname = res.last_name;
                        googleObj.gender = res.gender;
                        googleObj.profile = res.picture;
                        googleObj.email = res.email;
                        $rootScope.profile = res.picture;
                        console.log(googleObj.fname);
                        $localStorage["loggedUsername"] = googleObj.fname;
                        $localStorage["google_user"] = googleObj;

                        var googleObjSaved = $q.when(ConnectParse.glSave(googleObj));

                        googleObjSaved.then(
                                function (result) {
                                    var ifGranted;
                                    //on successfull storing of user details
                                    console.log("saved" + result.id);
                                    $localStorage["Initializer"] = googleObj.id;

                                    $localStorage["todoTasks"] = (ConnectParse.fetchRecord(String($localStorage["Initializer"])), 0);
                                    console.log($localStorage["todoTasks"]);
                                    // check if the device has permission for local notification
                                    window.plugin.notification.local.hasPermission(function (granted) {
                                        console.log('Permission has been granted 1: ' + granted);
                                        ifGranted = granted;
                                        // if permission is not found register it for local notifiction
                                        if (!ifGranted) {
                                            window.plugin.notification.local.registerPermission(function (granted) {
                                                console.log('Permission has been granted 2: ' + granted);
                                            });
                                        }
                                    });

//                                var datafetch = $q.when(ConnectParse.fetchRecord(String($localStorage["Initializer"])), skip);
                                    console.log();
//                                datafetch.then(function (result) {
                                    $ionicLoading.hide();
//                                    Alertuser.alert("Logging in..");
                                    $state.go("app.addTodo");
//                                })
                                },
                                function (error) {
                                    console.log("failed" + error);
                                }
                        ); // end of parse saving
                    })
                    //alert("not implemented yet");
                } else {
                    
                    $rootScope.ifdeviceReady = true;
//                    $localStorage["loggedUsername"] = "meanishasingh@yahoo.com";
//                    $localStorage["Initializer"] = 348139555381867;
                    $localStorage["loggedUsername"] = "Anurag Jaiswal";
                    $localStorage["Initializer"] = "115700109259737931396";
                   
//                    delete $localStorage["todoTasks"];
                    $state.go("app.addTodo");
                }
            };

//            via Facebook Login

            $scope.fbLogin = function () {
                    console.log("APP Facebook");
                    if (window.cordova) {
                        console.log("APP Facebook");
                        facebookConnectPlugin.login(["public_profile", "email"], function (response) {
                            if (response.authResponse) {
                                console.log("FB CHECKING PHONE");
                                console.log(JSON.stringify(response));

                                console.log(response);

                            } else {
                                // user is not logged in
                                console.log("failed");
                            }
                            self.processFacebook();
                        });
                    }
                    else{
                        console.log("OLD FB PLATFORM")
                    $rootScope.ifdeviceReady = true;
//                    $localStorage["loggedUsername"] = "meanishasingh@yahoo.com";
//                    $localStorage["Initializer"] = 348139555381867;
                    $localStorage["loggedUsername"] = "Anurag Jaiswal";
                    $localStorage["Initializer"] = 866099483482529;
                    delete $localStorage["todoTasks"];
                    $state.go("app.addTodo");
                }
                
            };



            self.processFacebook = function () {
                facebookConnectPlugin.api('/me', null, function (response) {
                    console.log("FB PLUGIN CHECH");
                    console.log(response);
                    if (response.error) {
                        console.log('Unexpected Facebook Login Error: ' + JSON.stringify(response.error));
                        Alertuser.alert('Error! Try Again..');
                    } else {
                        if (response) {
                            console.log("response111");
                            console.log(response);
                            console.log(response.email);
                            console.log(response.link);
                            //show msg user logging in bottom
//                            Alertuser.alert("Logging in..");
                            var facebookObj = {};
                            facebookObj.id = response.id;
                            facebookObj.fname = response.first_name;
                            facebookObj.lname = response.last_name;
                            facebookObj.gender = response.gender;
                            facebookObj.profile = response.link;
                            facebookObj.email = response.name;
                            $localStorage["loggedUsername"] = facebookObj.email;
                            console.log(facebookObj.email);
                            // save to your db or apply ur custom logic
                            var ifFBObjSaved = $q.when(ConnectParse.fbSave(facebookObj));
                            ifFBObjSaved.then(
                                    function (result) {
                                        var ifGranted;
                                        //on successfull storing of user details
                                        console.log("saved" + result.id);
                                        $localStorage["Initializer"] = facebookObj.id;
                                        $localStorage["todoTasks"] = (ConnectParse.fetchRecord(parseInt($localStorage["Initializer"])), 0);
                                        console.log($localStorage["todoTasks"]);
                                        // check if the device has permission for local notification
                                        window.plugin.notification.local.hasPermission(function (granted) {
                                            console.log('Permission has been granted 1: ' + granted);
                                            ifGranted = granted;
                                            // if permission is not found register it for local notifiction
                                            if (!ifGranted) {
                                                window.plugin.notification.local.registerPermission(function (granted) {
                                                    console.log('Permission has been granted 2: ' + granted);
                                                });
                                            }
                                        });


//                                        var datafetch = $q.when(ConnectParse.fetchRecord(String($localStorage["Initializer"])), skip)
//                                        datafetch.then(function (result) {
                                        $state.go("app.addTodo");
//                                        });
                                    },
                                    function (error) {
                                        console.log("failed" + error);
                                    }
                            ); // end of parse saving
                        }//end of if
                    }//end of else
                });
            };//end of processfacebook()

        }); // end of todo controller  

