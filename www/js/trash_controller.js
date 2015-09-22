
angular.module('trash.controller', [])

        .controller('trashCtrl', function (Alertuser, $ionicLoading, $rootScope, $scope, $state, $q, $localStorage, ConnectParse) {

            $scope.$on('$ionicView.beforeEnter', function () {

//                check for tasks in Localstorage
                if ($localStorage["Initializer"] && !$localStorage['trashTasks']) {
                    $ionicLoading.show({
                        content: '<i class="icon ion-loading-c">',
                        animation: 'fade-in',
                        showBackdrop: true,
                        maxWidth: 100,
                        showDelay: 0
                    });
                    if ($localStorage["Initializer"].length > 18) {
                        console.log('google');
                        console.log(String($localStorage["Initializer"]));
                        var checkTodoList = $q.when(ConnectParse.fetchRecord(String($localStorage["Initializer"])), 0);
                    } else {
                        var checkTodoList = $q.when(ConnectParse.fetchRecord(parseInt($localStorage["Initializer"])), 0);
                        console.log('Facebook');
                    }
                    checkTodoList.then(
                            function (result) {
                                var mytrashlist = [];
                                if (result.length > 0) {
                                    for (var i = 0; i < result.length; i++) {
                                        if (result[i].deleteStatus == true) {
                                            console.log(result[i]);
                                            var mytrashObj = {};
                                            mytrashObj.time = result[i].get("time");
                                            mytrashObj.alarmTime = result[i].get("alarmTime");
                                            mytrashObj.parseStatus = result[i].get("parseStatus");
                                            mytrashObj.title = result[i].get("todo_title");
                                            mytrashObj.done = result[i].get("done");
                                            mytrashObj.deleteStatus = result[i].get("deleteStatus");
                                            mytrashObj.position = result[i].get("position");
//                                        mytrashObj.completed = todostatus[mytrashObj.done];
                                            mytrashlist.push(mytrashObj);

                                            $ionicLoading.hide();
                                            $localStorage['trashTasks'] = mytrashlist;
                                            console.log(mytrashlist[0].done);
//                                    $scope.processLocalStorage($localStorage['trashTasks']);
                                        }
                                    }
                                }
                                else {
                                    $scope.moredata = false;
                                    console.log("No records found");
                                    $localStorage['trashTasks'] = [];
                                    $ionicLoading.hide();
                                }
                            },
                            function (error) {
                                console.log(error);
                            }
                    );
                }
                //calling when not Login(Skip Login)
                else if ($localStorage['trashTasks']) {
//            console.log($localStorage['todoTasks']);
                    $scope.processLocalStorage($localStorage['trashTasks']);
                }

            }); // end of before view change

        });