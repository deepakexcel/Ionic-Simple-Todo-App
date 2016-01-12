angular.module('starter', ['ionic', 'ngCordova', 'offline.controller', 'create.controller', 'edit.controller', 'ui.bootstrap.datetimepicker', 'fb.controller', 'app.controller', 'starter.controllers', 'starter.services', 'starter.directives', 'starter.filters', 'ngStorage', 'angular-datepicker', 'GoogleLoginService', 'timestorage'])
        .run(function ($ionicPlatform, $rootScope, $cordovaStatusbar, $state, $cordovaNetwork, $location, $localStorage, $interval, $timeout) {
            $ionicPlatform.ready(function () {

                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && $cordovaNetwork.isOnline()) {
                    $rootScope.ifdeviceReady = true;
                    if (window.cordova && window.cordova.plugins.Keyboard) {
                        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                    }
                    if (window.StatusBar) {
                        $cordovaStatusbar.styleHex('#1178bd');
                        StatusBar.styleDefault();
                    }
                } else {

                }

                //checking login and goto page on device ready
                if ($localStorage['Initializer'] || $localStorage['todoTasks']) {
                    $state.go('app.addTodo')
                } else {
                    $state.go('login');
                }


                cordova.plugins.notification.local.on("click", function (id, state, json) {
                    var notifyId = id.id;
                    var w = window.plugin.notification.local.cancel(notifyId);
                    var tasks = $localStorage["todoTasks"];
                        console.log("Tasks = ");
                        console.log(tasks);
                        for(var i=0;i<tasks.length; i++){
                            if(tasks[i].position == notifyId){
                                console.log("Find Task");
                                console.log(tasks[i]);
                                var dat = new Date(tasks[i].time);
                                var tim = new Date(tasks[i].alarmTime);
                                console.log("DAte :- "+ dat +"Time :- " + tim);
                               $state.go("app.editTodo", {a: tasks[i].title, b: dat, c: tim, d: tasks[i].position})
                            }
                        }
                });
                cordova.plugins.notification.local.on("clear", function (id, state, json) {
                    console.log("On Cancle")
                    console.log(id.id);
                    console.log(state);
                    console.log(id.text);
                   
                    var notifyId = id.id;
                    var w = window.plugin.notification.local.cancel(notifyId);
                    
                    console.log("cancle call");
                });
                    });
        });