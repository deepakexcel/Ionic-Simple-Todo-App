
angular.module('starter', ['ionic', 'ngCordova', 'offline.controller', 'create.controller', 'edit.controller', 'ui.bootstrap.datetimepicker', 'fb.controller', 'app.controller', 'starter.controllers', 'starter.services', 'starter.directives', 'starter.filters', 'ngStorage', 'angular-datepicker', 'GoogleLoginService', 'timestorage'])
        .run(function ($ionicPlatform, $rootScope, $cordovaStatusbar, $state, $cordovaNetwork, $location, $localStorage, $interval, $timeout) {
            $ionicPlatform.ready(function () {
//                console.log(window.cordova.platformId);
//                    console.log("Hello App")
//                if (cordova.platformId == 'android') {
//                    StatusBar.backgroundColorByHexString("#1178bd");
//                    console.log("StatusBar");
//                }
//                

                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && $cordovaNetwork.isOnline()) {
                    $rootScope.ifdeviceReady = true;
                    if (window.cordova && window.cordova.plugins.Keyboard) {
                        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                    }
                    if (window.StatusBar) {
                        $cordovaStatusbar.styleHex('#1178bd');
                        // org.apache.cordova.statusbar required
                        StatusBar.styleDefault();
                    }
//                    if (cordova.platformId == 'android') {
//                    StatusBar.backgroundColorByHexString("#1178bd");
//                    console.log("StatusBar");
//                }


                } else {

                }

                //checking login and goto page on device ready
                if ($localStorage['Initializer'] || $localStorage['todoTasks']) {
                    $state.go('app.addTodo')
                } else {
                    $state.go('login');
                }


                cordova.plugins.notification.local.on("click", function (id, state, json) {
//                    console.log("on click")
//                    console.log(id.id);
//                    console.log(state);
//                    console.log(id.text);
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
                        
                        //$state.go("app.editTodo");
//                    console.log(w);
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
                
//                $interval(function () {
//                    if ($localStorage["todoTasks"]) {
//                        var items = $localStorage["todoTasks"];
////                        console.log(items);
//                        for (var i = 0; i < items.length; i++) {
//                            var itemTime = new Date(items[i].alarmTime).toTimeString();
//                            var itemDate = new Date(items[i].time).toDateString();
////                            console.log("Interval notification" + ":-" + i);
////                            console.log(itemTime);
////                            console.log(itemDate);
////                            console.log(items[i]);
////                            console.log(new Date(items[i].alarmTime))
////                            console.log(new Date());
////                            if (new Date(items[i].alarmTime) == new Date()) {
//                            if ((itemTime == new Date().toTimeString()) && (itemDate == new Date().toDateString())) {
//                                window.plugin.notification.local.schedule({
//                                    id: i, // A unique id of the notification
////                                                    date: new Date($scope.alarmTime), // This expects a date object
//                                    text: items[i].title, // The message that is displayed
//                                    title: "", // The title of the message
////                            at: new Date($scope.alarmTime),
////                                                    every: 1
////                                                      autoCancel: true // Setting this flag and the notification is automatically cancelled when the user clicks it
//                                });
//                            }
//                            console.log("console");
//                        }
//                    }
//                    console.log("timeout 1");
//                }, 30000);



                    });

        })

                .config(function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                            .state('login', {
                                url: "/login",
                                cache: false,
                                templateUrl: "templates/login.html",
                                controller: 'FbCtrl'
                            })
                            .state('fb', {
                                url: "/fb",
                                cache: false,
                                templateUrl: "templates/fb_login.html",
                                controller: 'LoginCtrl'
                            })
                            .state('offline', {
                                url: "/offline",
                                cache: false,
                                templateUrl: "templates/offline.html",
                                controller: 'OfflineCtrl'
                            })
                            .state('app', {
                                url: "/app",
                                abstract: true,
                                templateUrl: "templates/menu.html",
                                controller: 'AppCtrl'
                            })
//                    .state('app.category', {
//                        url: "/category",
//                        cache: false,
//                        views: {
//                            'menuContent': {
//                                templateUrl: "templates/category.html",
//                                controller: 'AddTodoCtrl'
//                            }
//                        }
//                    })

                            .state('app.createTodo', {
                                url: "/createTodo",
                                cache: false,
                                views: {
                                    'menuContent': {
                                        templateUrl: "templates/createTodo.html",
                                        controller: 'CreateTodoCtrl'
                                    }
                                }
                            })

                            .state('app.editTodo', {
                                url: "/editTodo/:a/:b/:c/:d/",
                                cache: false,
                                views: {
                                    'menuContent': {
                                        templateUrl: "templates/editTodo.html",
                                        controller: 'editTodoCtrl'
                                    }
                                }
                            })
//                    .state('app.upcoming', {
//                        url: "/upcoming",
//                        cache: false,
//                        views: {
//                            'menuContent': {
//                                templateUrl: "templates/upcoming.html",
//                                controller: 'AddTodoCtrl'
//                            }
//                        }
//                    })
                            .state('app.trash', {
                                url: "/trash",
                                cache: false,
                                views: {
                                    'menuContent': {
                                        templateUrl: "templates/trash.html",
                                        controller: 'AddTodoCtrl'
                                    }
                                }
                            })
                            .state('app.completed', {
                                url: "/completed",
                                cache: false,
                                views: {
                                    'menuContent': {
                                        templateUrl: "templates/completed.html",
                                        controller: 'AddTodoCtrl'
                                    }
                                }
                            })
                            .state('app.addTodo', {
                                url: "/add_todo",
                                cache: false,
                                views: {
                                    'menuContent': {
                                        templateUrl: "templates/add_todo.html",
                                        controller: 'AddTodoCtrl'
                                    }
                                }
                            });
                    // if none of the above states are matched, use this as the fallback
                    //$urlRouterProvider.otherwise('/app/add_todo');
//            $urlRouterProvider.otherwise('/login');
                });
