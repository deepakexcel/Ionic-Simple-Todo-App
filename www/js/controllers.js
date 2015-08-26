angular.module('starter.controllers', [])
        .controller('AddTodoCtrl', function (Alertuser, $timeout, $ionicNavBarDelegate, $window, $ionicLoading, $ionicPopup, $cordovaNetwork, $scope, $state, $rootScope, $q, ConnectParse, $localStorage) {
            $scope.isTodayVisible = true;
            $scope.isLaterVisible = true;
            $scope.isThisWeekVisible = true;
            $scope.isCompletedVisible = true;
            $scope.showToday = function () {
                $scope.isTodayVisible = !$scope.isTodayVisible;
            };

            $scope.showThisWeek = function () {
                $scope.isThisWeekVisible = !$scope.isThisWeekVisible;
            };
            $scope.showLater = function () {
                $scope.isLaterVisible = !$scope.isLaterVisible;
            };
            $scope.showCompleted = function () {
                $scope.isCompletedVisible = !$scope.isCompletedVisible;
            };
            $scope.showReorder = false;
            $rootScope.ifdeviceReady = true;
            //if (window.cordova && !$cordovaNetwork.isOnline()) {
            //    $state.go('offline');
            //}

//            if($scope.isTodayVisible == true){}
            $scope.moredata = true;
            $scope.todoList = [];
            $scope.todoAlarm;
            var skip = 10;
            var todostatus = {};
            todostatus.true = "item-completed";
            todostatus.false = "item-not-completed";
            // colour picker
            var color = ["#FFE6E6", "#FFB2B2", "#FFFFF0", "#F5E0EB", "#FAF0F5", "#E6FAF0", "#CCF5E0", "#E6F5FA", "#B2E0F0", "#FFE0B2", "#FFF5E6", "#FFF0FF", "#FFE6FF", "#E0EBEB", "#D1E0E0", ];
            $scope.addSelf = function (num) {
                var sum = 0;
                while (num > 0)
                {
                    sum += num % 10;
                    num = Math.floor(num / 10);
                }
                if (sum > 9)
                {
                    sum = $scope.addSelf(sum);
                }
                return sum;
            };
            $scope.colorPicker = function (value) {
                var colorVal = 0;
                var alphabets = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
                for (var i = 0; i < value.length; i++) {
                    var char = value.substr(i, 1);
                    var charValue = alphabets.indexOf(char);
                    colorVal = colorVal + charValue;
                }
                //multiply by tag 3 alphabet value, - last alphabet
                var x = (colorVal * alphabets.indexOf(value.substr(2, 1))) - (alphabets.indexOf(value.substr((value.length - 1), 1)));
                if (x > 20) {
                    x = $scope.addSelf(colorVal);
                }
                //multiply by tag 3 alphabet value
                return color[x];
            };
            //code
            $scope.processLocalStorage = function (xTodoList) {
                console.log("processLocalStorage CALLED");
                var result = xTodoList;
                var mytodolist = [];
                if (result && result.length > 0) {
                    for (var i = 0; i < result.length; i++) {
                        var mytodoobj = {};
                        mytodoobj.time = result[i].time;
                        mytodoobj.alarmTime = result[i].alarmTime;
                        mytodoobj.todoAlarm = result[i].todoAlarm;
                        if (!result[i].parseStatus === false) {
                            mytodoobj.parseStatus = false;
                        }
                        else {
                            mytodoobj.parseStatus = result[i].parseStatus;
                        }
                        mytodoobj.title = result[i].title;
                        mytodoobj.done = result[i].done;
                        mytodoobj.position = result[i].position;
                        mytodoobj.completed = todostatus[mytodoobj.done];
                        mytodoobj.todoTag = [];
                        var tagString = "";
                        if (result[i].todoTag) {
                            tagString = result[i].todoTag;
                            console.log(tagString);
                            var temptags = tagString.split(",");
                            for (var j = 0; j < temptags.length; j++) {
                                var tagObj = {};
                                tagObj.title = temptags[j];
                                tagObj.color = $scope.colorPicker(tagObj.title);
                                mytodoobj.todoTag.push(tagObj);
                            }
                        }
                        mytodolist.unshift(mytodoobj);
                    }
                    $scope.todoList = mytodolist;
//                    console.log($scope.todoList)
                }
            };
            $scope.$on('$ionicView.beforeEnter', function () {

                if ($localStorage["Initializer"] && !$localStorage['todoTasks']) {
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
                                var mytodolist = [];
                                if (result.length > 0) {
                                    for (var i = 0; i < result.length; i++) {
                                        console.log(result[i]);
                                        var mytodoobj = {};
                                        mytodoobj.time = result[i].get("time");
                                        mytodoobj.alarmTime = result[i].get("alarmTime");
                                        mytodoobj.parseStatus = result[i].get("parseStatus");
                                        mytodoobj.title = result[i].get("todo_title");
                                        mytodoobj.done = result[i].get("done");
                                        mytodoobj.position = result[i].get("position");
                                        mytodoobj.completed = todostatus[mytodoobj.done];
                                        mytodoobj.todoTag = result[i].get("todoTag");
                                        mytodolist.push(mytodoobj);
                                    }
                                    $ionicLoading.hide();
                                    $localStorage['todoTasks'] = mytodolist;
                                    $scope.processLocalStorage($localStorage['todoTasks']);
                                }
                                else {
                                    $scope.moredata = false;
                                    console.log("No records found");
                                    $localStorage['todoTasks'] = [];
                                    $ionicLoading.hide();
                                }
                            },
                            function (error) {
                                console.log(error);
                            }
                    );
                }
                else if ($localStorage['todoTasks']) {
                    $scope.processLocalStorage($localStorage['todoTasks']);
                }
            }); // end of before view change


            $scope.setTitle = function () {
                $ionicNavBarDelegate.title('Tasks');
            };
            $scope.search = function (x, data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].position === x) {
                        return i;
                    }
                    else {
                        return false;
                    }
                }
            };

            var itempos = [];
            var items = [];
            var i = 0;
            $scope.store = function (item, index) {


                itempos[i] = item.position;
                items[i] = item;

                console.log("Store" + itempos[i]);
                console.log("Store" + itempos[i - 1]);
                console.log(item.position);
                console.log(i);
                console.log(index);
                console.log(item);
                i++;
            };
            $scope.completedRecord = function (item, index) {
                console.log("completedRecord controller CALLED");
                console.log(item);
                if ($localStorage["Initializer"]) {
                    console.log($localStorage["Initializer"]);
                    item.completed = todostatus[item.done];
                    var searchRes = $scope.search(item.position, $scope.todoList);
                    console.log(searchRes);
                    console.log(item.position + $scope.todoList);
                    if (!searchRes) {
                        console.log("position not found");
                    }
                    else {
                        $scope.todoList.splice(index, 1);
                        $scope.todoList.splice(index, 0, item);
                    }

                    if ($localStorage["Initializer"].length > 18) {
                        console.log("Google");
                        var checkTodoList = $q.when(ConnectParse.checkIfRecordExist(String($localStorage["Initializer"])));

                    } else {
                        console.log("faCEBOOK");
                        var checkTodoList = $q.when(ConnectParse.checkIfRecordExist(parseInt($localStorage["Initializer"])));


                    }
                    checkTodoList.then(
                            function (result) {
                                var newIndex;
                                if (result.length > 0) {
                                    for (var i = 0; i < result.length; i++) {
                                        if (item.position === result[i].get("position")) {
                                            console.log(result[i]);
                                            console.log(result[i].get("position"));
                                            newIndex = i;
                                            console.log(newIndex + "Hello");
                                            var editRecord = $q.when(ConnectParse.complete(result[i], "done", item.done));
                                            editRecord.then(
                                                    function (result) {
                                                        console.log("completed");
//                                                        Alertuser.alert("Completed..");
                                                    }, function (error) {
                                                console.log("Not completed");
                                            });
                                        }
                                    }
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
                    if (window.cordova) {
                        Alertuser.alert("Please Login to make changes..");
                        if (item.done == true) {
                            item.done = false;
                        }
                        else {
                            item.done = true;
                        }

                        item.completed = todostatus[item.done];
                        var searchRes = $scope.search(item.position, $scope.todoList);
                        if (!searchRes) {
                            console.log("position not found");
                        }
                        else {
                            $scope.todoList.splice(index, 1);
                            $scope.todoList.splice(index, 0, item);
                        }
                    }
                    else {
                        alert("Please Login to make changes.." + item.done);
                        if (item.done == true) {
                            item.done = false;
                        }
                        else {
                            item.done = true;
                        }

                        item.completed = todostatus[item.done];
                        var searchRes = $scope.search(item.position, $scope.todoList);
                        if (!searchRes) {
                            console.log("position not found");
                        }
                        else {
                            $scope.todoList.splice(index, 1);
                            $scope.todoList.splice(index, 0, item);
                        }
                        //return false;
                    }
                }

            };

//            var itempos=[];
//            var items=[];
//            var i=0;
//            $scope.store = function (item, index) {
//                
//                
//                itempos[i]=item.position;
//                items[i]= item;
//                
//                
//                console.log("Store" +  itempos[i]);
//                console.log("Store" +  itempos[i-1]);
//                console.log(item.position);
//                console.log(i);
//                console.log(index);
//                console.log(item);
//                i++;
//                
//                return items;
//            };

            $rootScope.deleteRecord = function () {
//                $ionicLoading.show({
////                duration: 3000,
//                    template: '<p class="spinner-energized"><ion-spinner icon="spiral"/></p>'
//                });
//                $scope.store(items);
//                console.log(items);
//                for(var j=0; j<items.length-1; j++){
//                    console.log(items[j].position);
//                    console.log(items[j].title);
//                }
//                console.log("deleteRecord controller CALLED");
//                console.log(x);
//                console.log(y);
//                console.log(index + " deleted pos: " + item.position);
//                $scope.todoList.splice(index, 1);
                if ($localStorage["Initializer"].length > 18) {
                    var checkTodoList = $q.when(ConnectParse.checkIfRecordExist(String($localStorage["Initializer"])));
                } else {
                    var checkTodoList = $q.when(ConnectParse.checkIfRecordExist(parseInt($localStorage["Initializer"])));
                }
                checkTodoList.then(
                        function (result) {
                            var newIndex;
                            if (result.length > 0) {
                                for (var i = 0; i < result.length; i++) {
                                    var objpos = result[i].get("position");
                                    var objstatus = result[i].get("done");
                                    console.log("parseStatus");
                                    console.log(objstatus);
                                    console.log(result[i].get("todo_title"));
                                    if (objstatus === true) {
                                        newIndex = i;
                                        console.log(newIndex);
                                        var deleteRecord = $q.when(ConnectParse.deleteRecord(result[i]));
                                        deleteRecord.then(
                                                function (result) {
                                                    console.log("Record deleted");

                                                }, function (error) {
                                            console.log("Not deleted");


                                        });
                                    }
                                }
                            }
                            else {
                                console.log("No records found");
                            }
                            $scope.refreshMe();
//                            $ionicLoading.hide();
//                            Alertuser.alert("record deleted");
                        },
                        function (error) {
                            $ionicLoading.hide();
//                            Alertuser.alert(error);
                            console.log(error);
                        }
                );
            };
            $scope.reorderMe = function (item, from, to) {
                console.log("reorderMe controller CALLED");
                //refresh the display list
                var status;
                console.log(from + "  " + to + "  " + item.position);
                console.log(item);
                $scope.todoList.splice(from, 1);
                $scope.todoList.splice(to, 0, item);
                var newFrom = ($scope.todoList.length - from) - 1;
                var newTo = ($scope.todoList.length - to) - 1;
                if (newFrom < newTo)
                    status = true;
                else
                    status = false;
                console.log(status);
                if ($localStorage["Initializer"].length > 18) {
                    var checkTodoList = $q.when(ConnectParse.checkPosition(String($localStorage["Initializer"])));
                } else {
                    var checkTodoList = $q.when(ConnectParse.checkPosition(parseInt($localStorage["Initializer"])));
                }
                checkTodoList.then(
                        function (result) {
                            //var temp_result = result;
                            if (status) {
                                console.log("down");
                                for (var i = 0; i < result.length; i++) {
                                    if (result[i].get("position") >= newFrom && result[i].get("position") <= newTo) {
                                        console.log(result[i].get("todo_title"));
                                        if (result[i].get("position") == item.position) {
                                            console.log(result[i].get("todo_title"));
                                            console.log(result[i].get("position") + "--" + item.position);
                                            //set position of item to new position
                                            var editRecord = $q.when(ConnectParse.complete(result[i], "position", newTo));
                                            editRecord.then(
                                                    function (result) {
                                                        console.log("reposition set");
                                                    }, function (error) {
                                                console.log("Not set");
                                            });
                                        }
                                        else {
                                            //increase the position by 1
                                            console.log(result[i].get("todo_title"));
                                            var editRecord = $q.when(ConnectParse.complete(result[i], "position", result[i].get("position") - 1));
                                            editRecord.then(
                                                    function (result) {
                                                        console.log("memposition set");
                                                    }, function (error) {
                                                console.log("Not set");
                                            });
                                        }
                                    }
                                }
                                //reload
                                //$state.go($state.current, {}, {reload: true});
                            }
                            else {
                                for (var i = 0; i < result.length; i++) {
                                    if (result[i].get("position") <= newFrom && result[i].get("position") >= newTo) {
                                        if (result[i].get("position") == item.position) {
                                            console.log(result[i].get("position") + "--" + item.position);
                                            //set position of item to new position
                                            var editRecord = $q.when(ConnectParse.complete(result[i], "position", newTo));
                                            editRecord.then(
                                                    function (result) {
                                                        console.log("reposition set");
                                                    }, function (error) {
                                                console.log("Not set");
                                            });
                                        }
                                        else {
                                            //increase the position by 1
                                            var editRecord = $q.when(ConnectParse.complete(result[i], "position", result[i].get("position") + 1));
                                            editRecord.then(
                                                    function (result) {
                                                        console.log("mem-position set");
                                                    }, function (error) {
                                                console.log("Not set");
                                            });
                                        }
                                    }
                                }
                                //reload
                                //$state.go($state.current, {}, {reload: true});
                            }
                        },
                        function (error) {
                            console.log(error);
                        }
                );
            };

            

//            $scope.editing = function (editItem, date, time) {
//
//                $scope.todo_title = 'Test';
//
//                var go = $state.go("app.editTodo");
//                go.then(function(res){
//                    console.log(res);
//                     $scope.editt(editItem);
//                });
//                console.log("Editing Todo");
//                console.log(editItem);
//                console.log(date);
//                console.log(time);

    
//                var dt = new Date(date).toDateString();
////                console.log(dt);
//                var tm = new Date(time).toTimeString();
          
//                console.log(tm);
//                $scope.model.titl="Anurag;"
//               $scope.editt(editItem);
                   

//            }

 $rootScope.model={
     titl:''
 }
$scope.editing=function(item, date, time){
    console.log(item);
    
    var dt = new Date(date).getDate() + " " + new Date(date).getMonth()+ " " + new Date(date).getUTCFullYear();
    var tm = new Date(time).getHours() + ":" + new Date(time).getMinutes() ;
    console.log(dt);
    console.log(tm);
    var itemss = $localStorage["todoTasks"];
    for(var i=0; i<itemss.length; i++){
//        console.log(itemss[i]);
        if((itemss[i].title == item) && (itemss[i].time == date)){
            var pos = itemss[i].position;
            console.log("Poss :- "+ pos);
        }
    }
//    console.log(pos);
    var s= $state.go("app.editTodo", {a: item, b: dt, c: tm, d: pos});
//   s.then(function(res){
//      $rootScope.model.titl= a;
//      console.log($rootScope.model.titl);
//   }) 
};
            
            
            $scope.callEdit = function (index, item) {
                console.log("callEdit controller CALLED");
                console.log(this.showReorder);
                if (this.showReorder) {
                    console.log(this.showReorder);
                    return false;
                }
                console.log("edit called");
                var time = item.time;
                $scope.data = {};
                // An elaborate, custom popup
                $ionicPopup.prompt({
                    title: 'Edit you todo',
                    inputType: 'text',
                    inputPlaceholder: 'Enter your Todo here',
                    okText: 'SAVE',
                    okType: 'button-calm'
                }).then(function (res) {
                    if (!res || res === " " || res.length === 0) {
                        return false;
                    }
                    var editItem = {
                        time: new Date().getTime(),
                        title: res,
                        parseStatus: false,
                        position: item.position,
                        done: false
                    };
                    $scope.todoList.splice(index, 1);
                    $scope.todoList.splice(index, 0, editItem);
                    $scope.editRecord(time, editItem);
                });
            };
            $scope.editRecord = function (time, editTodo) {
                console.log("editRecord controller CALLED");
                if ($localStorage["Initializer"].length > 18) {
                    console.log('google');
                    console.log(String($localStorage["Initializer"]));
                    var checkTodoList = $q.when(ConnectParse.checkIfRecordExist(String($localStorage["Initializer"])));
                } else {
                    var checkTodoList = $q.when(ConnectParse.checkIfRecordExist(parseInt($localStorage["Initializer"])));
                }
                checkTodoList.then(
                        function (result) {
                            console.log(result);
                            var newIndex;
                            if (result.length > 0) {
                                for (var i = 0; i < result.length; i++) {
                                    console.log(result[i]);
                                    if (time === result[i].get("time")) {
                                        console.log(result[i]);
                                        newIndex = i;
                                        console.log(newIndex);
                                        var editRecord = $q.when(ConnectParse.update(result[i], "todo_title", editTodo));
                                        editRecord.then(
                                                function (result) {
                                                    console.log("edited");
                                                }, function (error) {
                                            console.log("Not edited");
                                        });
                                    }
                                }
                            }
                            else {
                                console.log("No records found");
                            }
                        },
                        function (error) {
                            console.log(error);
                        }
                );
            };
            $scope.refreshMe = function () {
                console.log("refreshMe controller CALLED");
                console.log("refresh");
                $localStorage["todoTasks"] = '';
                $scope.todoList = "";
                $scope.moredata = true;
                skip = 0;
                if ($localStorage["Initializer"]) {

                    if ($localStorage["Initializer"].length > 18) {
                        console.log('google');
                        console.log(String($localStorage["Initializer"]));

                        var checkTodoList = $q.when(ConnectParse.fetchRecord(String($localStorage["Initializer"])), skip);
                    } else {
                        var checkTodoList = $q.when(ConnectParse.fetchRecord(parseInt($localStorage["Initializer"])), skip);
                        console.log('Facebook')
                    }
//                    var checkTodoList = $q.when(ConnectParse.fetchRecord(parseInt($localStorage["Initializer"]), skip));
                    checkTodoList.then(
                            function (result) {
//                                console.log(result);
                                var mytodolist = [];
                                if (result.length > 0) {
                                    console.log("11");
                                    if (result.length < 10) {
                                        $scope.moredata = false;
                                        console.log("12");
                                    }
                                    for (var i = 0; i < result.length; i++) {
                                        var mytodoobj = {};
                                        mytodoobj.time = result[i].get("time");
                                        mytodoobj.alarmTime = result[i].get("alarmTime");
                                        mytodoobj.parseStatus = result[i].get("parseStatus");
                                        mytodoobj.title = result[i].get("todo_title");
                                        mytodoobj.done = result[i].get("done");
                                        mytodoobj.position = result[i].get("position");
                                        mytodoobj.completed = todostatus[mytodoobj.done];
                                        mytodoobj.todoTag = result[i].get("todoTag");
                                        mytodolist.push(mytodoobj);
                                        console.log("13");

                                    }
                                    $localStorage['todoTasks'] = mytodolist;
                                    $scope.processLocalStorage($localStorage['todoTasks']);
                                    console.log("14");

                                    skip = skip + 10;
                                    $scope.$broadcast('scroll.infiniteScrollComplete');
                                    $scope.$broadcast('scroll.resize');
                                    $scope.$broadcast('scroll.refreshComplete');
                                }
                                else {

                                    $scope.$broadcast('scroll.infiniteScrollComplete');
                                    $scope.$broadcast('scroll.refreshComplete');
                                    console.log("No records found  11");
                                }
                            },
                            function (error) {
                                console.log(error);
                                $scope.$broadcast('scroll.infiniteScrollComplete');
                                $scope.$broadcast('scroll.refreshComplete');
                            }
                    );
                }
                else if (!$localStorage["Initializer"] && $localStorage['todoTasks']) {
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    $scope.$broadcast('scroll.refreshComplete');
                    $scope.processLocalStorage($localStorage['todoTasks']);
                }
            };
            $scope.createTodo = function () {
                $state.go("app.createTodo");
            };

//            var self = this;
//    $scope.showNotification=function(){
//        console.log("Show Notification");
//        console.log($localStorage["todoTasks"]);
//};
        })
        ;

