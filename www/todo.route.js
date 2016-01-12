angular.module('starter', ['ionic', 'ngCordova', 'offline.controller', 'create.controller', 'edit.controller', 'ui.bootstrap.datetimepicker', 'fb.controller', 'app.controller', 'starter.controllers', 'starter.services', 'starter.directives', 'starter.filters', 'ngStorage', 'angular-datepicker', 'GoogleLoginService', 'timestorage'])
                .config(function ($stateProvider, $urlRouterProvider) {
                    $stateProvider
                            .state('login', {
                                url: "/login",
                                cache: false,
                                templateUrl: "login/login.html",
                                controller: 'FbCtrl'
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
           $urlRouterProvider.otherwise('/login');
                });
