
angular.module('starter', ['ionic', 'ngCordova', 'offline.controller', 'create.controller', 'edit.controller', 'ui.bootstrap.datetimepicker', 'fb.controller', 'app.controller', 'starter.controllers', 'starter.services', 'starter.directives', 'starter.filters', 'ngStorage', 'angular-datepicker', 'GoogleLoginService', 'timestorage'])
        .run(function ($ionicPlatform, $rootScope, $state, $cordovaNetwork, $location, $localStorage, $interval) {
            $ionicPlatform.ready(function () {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && $cordovaNetwork.isOnline()) {
                    $rootScope.ifdeviceReady = true;
                    if (window.cordova && window.cordova.plugins.Keyboard) {
                        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                        cordova.plugins.Keyboard.disableScroll(true);
                    }
                    if (window.StatusBar) {
                        // org.apache.cordova.statusbar required
                        StatusBar.styleDefault();
                    }
                    

                }
                $interval(function() {
                    if ($localStorage["todoTasks"]) {
                        var items = $localStorage["todoTasks"];
                        console.log(items);
                        for (var i = 0; i < items.length; i++) {
                            var itemTime=new Date(items[i].alarmTime).toTimeString();
                            var itemDate=new Date(items[i].time).toDateString();
                            console.log("Interval notification" + ":-" + i);
                            console.log(itemTime);
                            console.log(itemDate);
                            console.log(items[i]);
                            console.log(new Date(items[i].alarmTime))
                                if (new Date(items[i].alarmTime) === new Date()) {
                            window.plugin.notification.local.schedule({
                                id: i, // A unique id of the notification
//                                                    date: new Date($scope.alarmTime), // This expects a date object
                                text: "Notification  :- "+items[i].title, // The message that is displayed
                                title: "Reminder", // The title of the message
//                            at: new Date($scope.alarmTime),
//                                                    every: 1
//                                                      autoCancel: true // Setting this flag and the notification is automatically cancelled when the user clicks it
                            });
                                }
                                console.log("console");
                        }
                    }
                    console.log("timeout 1");
                }, 30000);
                
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
                    .state('app.category', {
                        url: "/category",
                        cache: false,
                        views: {
                            'menuContent': {
                                templateUrl: "templates/category.html",
                                controller: 'AddTodoCtrl'
                            }
                        }
                    })

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
                    .state('app.upcoming', {
                        url: "/upcoming",
                        cache: false,
                        views: {
                            'menuContent': {
                                templateUrl: "templates/upcoming.html",
                                controller: 'AddTodoCtrl'
                            }
                        }
                    })
                    .state('app.today', {
                        url: "/today",
                        cache: false,
                        views: {
                            'menuContent': {
                                templateUrl: "templates/today.html",
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
            $urlRouterProvider.otherwise('/login');
        });
