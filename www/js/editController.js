angular.module('edit.controller', ["angular-datepicker"])
        .controller('editTodoCtrl', function ($cordovaNetwork, $filter, $stateParams, $ionicPopup, $cordovaDatePicker, Alertuser, $rootScope, $scope, $state, $q, $localStorage, ConnectParse) {

            var item_title = $stateParams.a;
            var item_date = $stateParams.b;
            var item_time = $stateParams.c;
            var item_position = $stateParams.d;

            console.log(item_date);
            console.log(item_time);


            $scope.mytask = {};
            console.log($stateParams.a);



            $scope.saveee = function () {
                alert($scope.model.title);
            };

            $scope.datePickerOptions = {
                format: 'dd-mm-yyyy', // ISO formatted date
                onClose: function (e) {
                    //alert(e);
                    // do something when the picker closes   
                }
            };
            $scope.TimePickerOptions = {
                format: 'dd-mm-yyyy', // ISO formatted date
                onClose: function (e) {
                    //alert(e);
                    // do something when the picker closes   
                }
            };
            $scope.now = {};
            $scope.now.date;
            $scope.now.time;
            $scope.showReminder = false;
            $scope.userPreTags = [];
            $scope.isshowrem = true;
            $scope.myDates = [
                {title: "Today"},
                {title: "Tomorrow"},
                {title: "Select a date.."}
            ];
            $scope.myTimes = [
                {title: "Morning", dtime: "9:00am"},
                {title: "Afternoon", dtime: "1:00pm"},
                {title: "Evening", dtime: "5:00pm"},
                {title: "Night", dtime: "8:00pm"},
                {title: "Select a time..", dtime: ""}
            ];
            $scope.mytime = $scope.myTimes[0];
            $scope.selectTime = function () {
                console.log("time");
                var timeflag = this.mytime.title;
                var date_options = {
                    date: new Date(),
                    mode: 'time', // or 'date'
                    minDate: new Date() - 10000,
                    allowOldDates: false,
                    allowFutureDates: true,
                    doneButtonLabel: 'Change',
                    doneButtonColor: '#F2F3F4',
                    cancelButtonLabel: 'Default',
                    cancelButtonColor: '#000000'
                };
                if (timeflag === "Morning") {
                    console.log("mor");
                    var d = new Date();
                    d.setHours(9);
                    d.setMinutes(0);
                    $scope.alarmTime = d.getTime();
                }
                if (timeflag === "Afternoon") {
                    console.log("aftre");
                    var d = new Date();
                    d.setHours(13);
                    d.setMinutes(0);
                    $scope.alarmTime = d.getTime();
                }
                Demen
                if (timeflag === "Evening") {
                    console.log("Evening");
                    var d = new Date();
                    d.setHours(17);
                    d.setMinutes(0);
                    $scope.alarmTime = d.getTime();
                }
                if (timeflag === "Night") {
                    console.log("night");
                    var d = new Date();
                    d.setHours(20);
                    d.setMinutes(0);
                    $scope.alarmTime = d.getTime();
                }
                if (timeflag === "Select a time..") {
                    console.log("select time");
                    //if its mobile
                    if (window.cordova) {
                        if (window.cordova) {
                            $cordovaDatePicker.show(date_options).then(function (time) {
                                $scope.alarmTime = time.getTime();
                            });
                        }
                    }
                    //if its desktoop
                    else {
                        console.log("desktop");
                        var d = new Date();
                        $scope.alarmTime = d.getTime();
                        //$('.clockpicker').clockpicker('show');
                    }
                }
            };

//            $scope.gotoTask = function () {
//                $state.go("app.addTodo");
//            }

            $scope.mydate = $scope.myDates[0];
            $scope.selectDate = function () {
                var timeflag;
                var date_options = {
                    date: new Date(),
                    mode: 'date', // or 'time'
                    minDate: new Date() - 10000,
                    allowOldDates: false,
                    allowFutureDates: true,
                    doneButtonLabel: 'Change',
                    doneButtonColor: '#F2F3F4',
                    cancelButtonLabel: 'Default',
                    cancelButtonColor: '#000000'
                };
                timeflag = this.mydate.title;
                if (timeflag === "Today") {
                    $scope.todoAlarm = new Date().getTime();
                }
                if (timeflag === "Tomorrow") {
                    var d = new Date();
                    var tday = d.getDate();
                    d.setDate(tday + 1);
                    $scope.todoAlarm = d.getTime();
                }
                if (timeflag === "Select a date..") {
                    console.log("select");
                    //if its mobile
                    if (window.cordova) {
                        $cordovaDatePicker.show(date_options).then(function (date) {
                            $scope.todoAlarm = date.getTime();
                        });
                    }
                    //if its desktoop
                    else {
                        console.log("desktop");
                        $scope.todoAlarm = new Date().getTime();
                        //$('.clockpicker').clockpicker('show');
                    }
                }
            };

            if (window.cordova && !$cordovaNetwork.isOnline()) {
                $state.go('offline');
            }
            $scope.defaultTime = function () {
                console.log("time adjusted");
                var d = new Date();
                var tdate = d.getDate();
                d.setDate(tdate);
                $scope.todoAlarm = d.getTime();
                var t = d.getHours();
                if (t >= 20 && t < 23) {
                    d.setDate(tdate + 1);
                    $scope.todoAlarm = d.getTime();
                    $scope.mydate = $scope.myDates[1];
//                    $scope.mytime = $scope.myTimes[0];
                }
                else if (t >= 17 && t < 20) {
//                    $scope.mytime = $scope.myTimes[3];
                    d.setHours(20);
                    d.setMinutes(0);
                    $scope.alarmTime = d.getTime();

                }
                else if (t >= 13 && t < 17) {
//                    $scope.mytime = $scope.myTimes[2];
                    d.setHours(17);
                    d.setMinutes(0);
                    $scope.alarmTime = d.getTime();

                }
                else if (t >= 9 && t < 13) {
//                    $scope.mytime = $scope.myTimes[1];
                    d.setHours(13);
                    d.setMinutes(0);
                    $scope.alarmTime = d.getTime();

                }
                else if (t > 0 && t < 9) {
//                    $scope.mytime = $scope.myTimes[0];
                    d.setHours(9);
                    d.setMinutes(0);
                    $scope.alarmTime = d.getTime();
                }

                // end of curTime

            };
            $scope.$on('$ionicView.enter', function () {
//                $scope.mytime={title:''};
                $scope.mytask.title = item_title;
                $scope.mydate.title = item_date;
                $scope.mytime.title = item_time;
                console.log($scope.mytask.title);
//                if (!$localStorage["Initializer"]) {
//                    $state.go("app.addTodo");
//                }
                //$scope.todoAlarm = $scope.mydate;
                $scope.defaultTime();
                $scope.curTime = new Date().getTime();
                //alert($scope.todoAlarm.getDate() + "" + $scope.alarmTime.getHours());
                var tags = [];
                if ($localStorage["userTags"]) {
                    tags = $localStorage["userTags"];
                    console.log("TAG 17");
                }
                for (var i = 0; i < tags.length; i++) {
                    console.log("TAG 18");
                    var tagObj = {};
                    tagObj.title = tags[i];
                    tagObj.selected = false;
                    tagObj.removed = false;
                    tagObj.color = $scope.colorPicker(tagObj.title);
                    $scope.userPreTags.push(tagObj);
                    console.log("TAG HELLO");
                    console.log(tagObj);
                }
            }); // end of before view change
            var todostatus = {};
            todostatus.true = "item-completed";
            todostatus.false = "item-not-completed";
            // colour picker
            var color = [
                "#FFE6E6",
                "#FFB2B2",
                "#FFFFF0",
                "#F5E0EB",
                "#FAF0F5",
                "#E6FAF0",
                "#CCF5E0",
                "#E6F5FA",
                "#B2E0F0",
                "#FFE0B2",
                "#FFF5E6",
                "#FFF0FF",
                "#FFE6FF",
                "#E0EBEB",
                "#D1E0E0",
            ];
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



            $scope.noReminder = function () {
                $scope.showReminder = false;
                this.showReminder = false;
                $scope.todoAlarm = null;
                $scope.alarmTime = null;
            };
            $scope.reminderTi$locationme = {
            };
            var counter = 0;





            $scope.showDate = function (selection, e) {

                console.log(selection);

                console.log($scope.mydate.title);
                //adjust time
                var d = new Date();
                if (selection === "Today") {
                    $scope.todoAlarm = d.getTime();
//                    $scope.model.date = "Today";
                }
                if (selection === "Tomorrow") {
                    d.setDate(d.getDate() + 1);
                    $scope.todoAlarm = d.getTime();
//                    $scope.model.date = "Tomorrow";
                }
                $scope.mydate.title = selection;
//                if($scope.reminderTime.isTimeDisplaying===true){
//                    $scope.reminderTime.isTimeDisplaying=false;
//                }
                // $scope.reminderTime.isDateDisplaying = !$scope.reminderTime.isDateDisplaying;
                if (selection === "Select a date..") {
//                    $scope.model.date = "";
                    $scope.pickDate1();

                }

            };

            $scope.pickDate1 = function () {
                $scope.aaa = true;
//                $scope.bbb=false;
                if ($scope.reminderTime.isTimeDisplaying == true) {
                    $scope.reminderTime.isTimeDisplaying = false;
                }
                if ($scope.reminderTime.isDateDisplaying == true) {
                    $scope.reminderTime.isDateDisplaying = false;
                }

                $scope.tmp = {};
                $scope.tmp.newDate = $scope.model.date;


                var date_options = $ionicPopup.show({
                    template: "<datetimepicker ng-model=" + "tmp.newDate" + "   data-datetimepicker-config=" + "{minView:'day'}" + "></datetimepicker>",
                    title: "Date",
                    date: new Date(),
                    mode: 'date',
                    scope: $scope,
                    buttons: [
                        {text: 'Cancel'},
                        {
                            text: '<b>Save</b>',
                            type: 'button-positive',
                            onTap: function (e) {
                                var date = $filter('date')($scope.tmp.newDate, 'dd MM yyyy');
//                                $scope.model.date = date;
                                $scope.mydate.title = date;
                                console.log(date)
//                                date_options = date;
                                $scope.todoAlarm = $scope.tmp.newDate.getTime();
//                                alert($scope.todoAlarm);
                                return  date;
                            }
                        }
                    ]
                });

                date_options.then(function (res) {
                    console.log("Response");
                    console.log(res);
//                    $scope.todoAlarm = res.getTime();
                });

            };




            $scope.pickTime1 = function () {
                $scope.aaa = false;
                $scope.bbb = true;
                if ($scope.reminderTime.isTimeDisplaying == true) {
                    $scope.reminderTime.isTimeDisplaying = false;
                }
                if ($scope.reminderTime.isDateDisplaying == true) {
                    $scope.reminderTime.isDateDisplaying = false;
                }

                $scope.tmp1 = {};

                $scope.tmp1.newDate = $scope.model.time;

                var time_options = $ionicPopup.show({
                    template: "<datetimepicker ng-model=" + "tmp1.newDate" + "   data-datetimepicker-config=" + "{startView:'hour',minView:'minute'}" + "></datetimepicker>",
                    title: "Time",
                    scope: $scope,
                    buttons: [
                        {text: 'Cancel'},
                        {
                            text: '<b>Save</b>',
                            type: 'button-positive',
                            onTap: function (e) {
                                var time = $filter('date')($scope.tmp1.newDate, 'HH:mm');
//                                $scope.model.time = time;
                                $scope.mytime.title = time;
                                console.log(time);
                                $scope.alarmTime = $scope.tmp1.newDate.getTime();
//                                console.log("time");
//                                console.log("TimePopup");
//                                console.log($scope.alarmTime);
//                                console.log(new Date($scope.alarmTime));
                            }
                        }
                    ]
                });
            };

            $scope.showTime = function (e, selection) {
                //e.preventDefault();
//                e.stopPropagation();
                var d = new Date();
                if (selection === "Morning") {
                    d.setHours(9);
                    d.setMinutes(0);
                    $scope.alarmTime = d.getTime();
//                    $scope.model.time = "Morning";
                }
                if (selection === "Afternoon") {
                    d.setHours(13);
                    d.setMinutes(0);
                    d.setDate(d.getDate() + 1);
                    $scope.alarmTime = d.getTime();
//                    $scope.model.time = "Afternoon";
                }
                if (selection === "Evening") {
                    d.setHours(17);
                    d.setMinutes(0);
                    $scope.alarmTime = d.getTime();
//                    $scope.model.time = "Evening";
                }
                if (selection === "Night") {
                    d.setHours(20);
                    d.setMinutes(0);
                    d.setDate(d.getDate() + 1);
                    $scope.alarmTime = d.getTime();
//                    $scope.model.time = "Night";

                }

                $scope.mytime.title = selection;


                if (selection === "Select a time..") {

                    $scope.model.time = '';
                    $scope.pickTime1();
                }
            };

            $scope.reminderTime = {};
            $scope.reminderTime.isTimeDisplaying = false;
            $scope.reminderTime.isDateDisplaying = false;


            $scope.editRecordd = function () {
                
                console.log($scope.mytask.title);
                 console.log(parseInt($scope.todoAlarm));
                  console.log($scope.alarmTime);
                   console.log("hiiiiii");
                    console.log("hello");
                
               
                if (!$scope.mytask.title || $scope.mytask.title === " " || $scope.mytask.title === "" || $scope.mytask.title.length === 0) {
                    if (window.cordova) {
                        Alertuser.alert("Please add the task");
                        return false;
                    }
                    else {
                        alert("Please add the task");
                        return false;
                    }
                }
                
                for(var i=0;i<$localStorage["todoTasks"].length; i++){
                    if($localStorage["todoTasks"].title == item_title){
                         var timee = $localStorage["todoTasks"].time;
                    }
                }
                
               
                var val = $scope.mytask.title;
                var todoObj = {};
                todoObj.title = val;
                if ($scope.todoAlarm) {
                                    todoObj.time = parseInt($scope.todoAlarm);
                                    console.log(new Date($scope.todoAlarm).getDate());
                                    console.log(new Date(todoObj.time).getDate());
                                }
                                if ($scope.alarmTime) {
                                    todoObj.alarmTime = $scope.alarmTime;
                                    console.log(new Date($scope.alarmTime).getHours());
                                    console.log(new Date(todoObj.alarmTime).getHours());
                                }
                                todoObj.parseStatus = true;
                                todoObj.done = false;
                                
                                console.log("editRecord controller CALLED");
                                        var uid =$localStorage["Initializer"]
                                        var editRecord = $q.when(ConnectParse.update(item_position, uid, todoObj));
                                        editRecord.then(
                                                function (result) {
                                                    var storedTask=$localStorage["todoTasks"];
//                                                    console.log(storedTask);
//                                                    console.log(storedTask[1].position);
                                                    var storedTask=$localStorage["todoTasks"];
                                                    for(var i=0; i< storedTask.length;i++){
                                                        
                                                        if(storedTask[i].position==item_position){
                                                            storedTask[i].title=todoObj.title;
                                                            storedTask[i].alarmTime=todoObj.alarmTime;
                                                            storedTask[i].time=todoObj.time;
                                                        }
                                                    }
                                                    $localStorage['todoTasks'] = storedTask;
                                                    console.log("edited");
                                                    $state.go("app.addTodo");
                                                }, function (error) {
                                            console.log("Not edited");
                                        });
                                    }
                           
                           
//                           var storedTodoTasks = [];
//                                if ($localStorage["todoTasks"]) {
//                                    storedTodoTasks = $localStorage['todoTasks'];
//                                }
//                                console.log(storedTodoTasks.length);
//                                storedTodoTasks.push(todoObj);
//                                $localStorage['todoTasks'] = storedTodoTasks;
//                                $state.go('app.addTodo');
                           
                        
//            }
//                alert("Edit called");
                
//                var val = $scope.mytask.title;
//                console.log(new Date($scope.todoAlarm).getHours());
//                var date_options = {
//                    date: new Date(),
//                    mode: 'date', // or 'time'
//                    minDate: new Date() - 10000,
//                    allowOldDates: false,
//                    allowFutureDates: true,
//                    doneButtonLabel: 'Change',
//                    doneButtonColor: '#F2F3F4',
//                    cancelButtonLabel: 'Default',
//                    cancelButtonColor: '#000000'
//                };
//                if ($rootScope.ifdeviceReady && window.cordova) {
//                    console.log("ready");
//                    console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
//                    //$scope.todoAlarm = date.getTime();
//                    //console.log($scope.todoAlarm);
//                    var newPos;
//                    if ($localStorage["Initializer"].length > 18) {
//                        console.log('google');
//                        console.log(String($localStorage["Initializer"]));
//                        var checkTodoList = $q.when(ConnectParse.checkIfRecordExist(String($localStorage["Initializer"])));
//                    } else {
//                        var checkTodoList = $q.when(ConnectParse.checkIfRecordExist(parseInt($localStorage["Initializer"])));
//                    }
//                    console.log(checkTodoList);
//                    checkTodoList.then(
//                            function (result) {
//                                var newIndex;
//                                if (result.length > 0) {
//                                    for (var i = 0; i < result.length; i++) {
////                                    if (time === result[i].get("time")) {
////                                        newIndex = i;
////                                        console.log(newIndex);
////                                        var editRecord = $q.when(ConnectParse.update(result[i], "todo_title", editTodo));
//
//                                    }
//                                }
//
//                                else {
//                                    console.log("No records found");
//                                }
//
//                                console.log("checkTodoListtttttt");
//                                if (result.length > 0) {
//                                    newPos = result[0].get("position") + 1;
//                                }
//                                else {
//                                    newPos = 0;
//                                }
//
//                                var todoObj = {};
//                                //poopulate todo item
//
//                                todoObj.title = val;
//                                if ($scope.todoAlarm) {
//                                    todoObj.time = parseInt($scope.todoAlarm);
//                                    console.log(new Date($scope.todoAlarm).getDate());
//                                    console.log(new Date(todoObj.time).getDate());
//                                }
//                                if ($scope.alarmTime) {
//                                    todoObj.alarmTime = $scope.alarmTime;
//                                    console.log(new Date($scope.alarmTime).getHours());
//                                    console.log(new Date(todoObj.alarmTime).getHours());
//                                }
//                                todoObj.parseStatus = true;
//                                todoObj.done = false;
//                                if ($localStorage["Initializer"].length > 18) {
//                                    todoObj.userID = String($localStorage["Initializer"]);
//                                } else {
//                                    todoObj.userID = parseInt($localStorage["Initializer"]);
//                                }
//                                todoObj.completed = todostatus[todoObj.done];
//                                todoObj.position = newPos;
//                                //tags of user
//
//                                console.log(todoObj);
//                                Alertuser.saveAlert("Saved..");
//                                var storedTodoTasks = $localStorage['todoTasks'];
//                                storedTodoTasks.unshift(todoObj);
//
//                                console.log("dnkcvdnskvnkjj");
//                                console.log($localStorage["Initializer"].length);
//
////                                if ($localStorage["Initializer"].length > 18) {
//                                var editRecord = $q.when(ConnectParse.update(result[i], item_position, todoObj));
//                                alert(editRecord);
////                                } else {
//                                //set myToDoObject variable in cloud with values calling parse service
////                                    var setToDoList = $q.when(ConnectParse.save(todoObj));
////                                }
//
//                                editRecord.then(function (result) {
//                                    console.log("edited");
//                                    if (result) {
//                                        $scope.mytask.title = "";
//                                        console.log("Local Notification");
//                                        console.log(result);
//                                        console.log(result.time);
//                                        //schedule local notification fro saved todo
//
//                                        window.plugin.notification.local.schedule({
//                                            id: String(result.time), // A unique id of the notification
////                                                    date: new Date($scope.alarmTime), // This expects a date object
//                                            text: "Notification  :- " + result.title, // The message that is displayed
//                                            title: "Reminder", // The title of the message
//                                            at: new Date($scope.alarmTime),
////                                                    every: 1
////                                                      autoCancel: true // Setting this flag and the notification is automatically cancelled when the user clicks it
//                                        });
//                                        console.log(new Date($scope.alarmTime));
//
//                                    }
//                                }, function (error) {
//                                    console.log("Not edited");
//                                });
//
//                                $state.go('app.addTodo');
//                            },
//                            function (error) {
//                                console.log(error);
//                            }
//                    );
//                    console.log("Y set" + $scope.todoAlarm);
//                }
//                else {
//                    var newPos;
//                    var checkTodoList = $q.when(ConnectParse.checkIfRecordExist(parseInt($localStorage["Initializer"])));
//                    checkTodoList.then(
//                            function (result) {
//                                console.log("res fetched : " + result.length);
//                                if (result.length > 0) {
//
//                                    for (var i = 0; i < result.length; i++) {
////                                        console.log(result[i]);
//                                        if (item_position == result[i].get("position")) {
//                                            console.log(result[i].get("position"));
//                                            var todoObj = {};
//                                            //poopulate todo item
//                                            todoObj.title = val;
////                                console.log(val);
//                                            if ($scope.todoAlarm) {
//                                                todoObj.time = parseInt($scope.todoAlarm);
//                                                console.log(new Date($scope.todoAlarm).getDate());
//                                                console.log(new Date(todoObj.time).getDate());
//                                            }
//                                            if ($scope.alarmTime) {
//                                                todoObj.alarmTime = $scope.alarmTime;
//                                                console.log(new Date($scope.alarmTime).getHours());
//                                                console.log(new Date(todoObj.alarmTime).getHours());
//                                            }
//                                            todoObj.parseStatus = true;
//                                            todoObj.done = false;
//                                            todoObj.userID = parseInt($localStorage["Initializer"]);
//                                            todoObj.completed = todostatus[todoObj.done];
//                                            todoObj.position = newPos;
//                                            //tags of user
//                                            var tempTags = [];
//                                            var selectedTags = "";
//                                            for (var i = 0; i < $scope.userPreTags.length; i++) {
//                                                if ($scope.userPreTags[i].selected === true && $scope.userPreTags[i].removed === false) {
//                                                    tempTags.push($scope.userPreTags[i].title);
//                                                }
//                                            }
//
//
//
//                                            //tag fetching closed
//                                            todoObj.todoTag = selectedTags;
//                                            //$scope.todoList.unshift(todoObj);
//                                            console.log(todoObj);
////                                alert("Saved..");
//                                            var storedTodoTasks = [];
//                                            if ($localStorage["todoTasks"]) {
//                                                storedTodoTasks = $localStorage['todoTasks'];
//                                            }
//                                            console.log(storedTodoTasks.length);
//                                            storedTodoTasks.push(todoObj);
//                                            $localStorage['todoTasks'] = storedTodoTasks;
//                                            $state.go('app.addTodo');
//                                            //set myToDoObject variable in cloud with values calling parse service
//                                            var setToDoList = $q.when(ConnectParse.update(result[i], item_position, todoObj));
//                                            setToDoList.then(
//                                                    function (result) {
//                                                        if (result) {
//                                                            console.log(result.title);
//
//                                                        }
//                                                    },
//                                                    function (error) {
//                                                        console.log(error);
//                                                    }
//                                            );
//
//                                        } else {
//
//                                            console.log("Rec not fnd")
//                                        }
//                                    }
//                                }
//                            },
//                            function (error) {
//                                console.log(error);
//                            }
//                    );
//                }
//
//
//            };

//            }
        });