angular.module('starter.directives', [])
        .directive('stopEvent', function () {
            return {
                restrict: 'A',
                link: function (scope, element, attr) {
                    element.bind('click', function (e) {
                        e.stopPropagation();
                    });
                }
            };
        })
        .directive('closeSubmenu', function ($document) {    
            return {
                link: function ($scope, element, attrs) {
                    $document.bind('click', function (event) {
                        var isClickedMenuElementChild = event.target;
                        var submenuButton = isClickedMenuElementChild.id;
                        //console.log(isClickedMenuElementChild);
                        if (submenuButton === "dateBtn" || submenuButton === "timeBtn") {
                            console.log("dir");
                            if (submenuButton === "dateBtn") {
                                console.log("datebtn");
                                if ($scope.reminderTime.isTimeDisplaying === true) {
                                    $scope.reminderTime.isTimeDisplaying = false;
                                }
                                $scope.reminderTime.isDateDisplaying = true;
                            }
                            if (submenuButton === "timeBtn") {
                                console.log("timebtn");
                                if ($scope.reminderTime.isDateDisplaying === true) {
                                    $scope.reminderTime.isDateDisplaying = false;
                                }
                                $scope.reminderTime.isTimeDisplaying = true;
                            }
                            $scope.$apply();
                            return;
                        }
                        else {
                            console.log("no date time");
                            if ($scope.reminderTime.isTimeDisplaying === true) {
                                $scope.reminderTime.isTimeDisplaying = false;
                            }
                            if ($scope.reminderTime.isDateDisplaying === true) {
                                $scope.reminderTime.isDateDisplaying = false;
                            }
                        }
                        $scope.$apply();
                    });
                }
            };
        });


