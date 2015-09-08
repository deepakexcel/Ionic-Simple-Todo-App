angular.module('edit.controller', ["angular-datepicker"])
        .controller('editTodoCtrl', function ($cordovaNetwork, $ionicHistory, $filter, $stateParams, $ionicPopup, $cordovaDatePicker, Alertuser, $rootScope, $scope, $state, $q, $localStorage, ConnectParse) {

            var item_title = $stateParams.a;
            var item_date = $stateParams.b;
            var item_time = $stateParams.c;
            var item_position = $stateParams.d;
            console.log(item_date);
            console.log(item_time);
            $scope.mytask = {};
            console.log($stateParams.a);
//            $scope.saveee = function () {
//                alert($scope.model.title);
//            };
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
            $scope.mytime = {title: ''}
            $scope.mytime.title = $scope.myTimes[0].title;
            //Time Selection
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


            $scope.mydate = {title: ''}
            $scope.mydate.title = $scope.myDates[0].title;
            //Date Selection
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

            $scope.$on('$ionicView.enter', function () {
                //retriving data frm model
                $scope.mytask.title = item_title;
                $scope.mydate.title = item_date;
                $scope.mytime.title = item_time;
                console.log($scope.mytask.title);
                if ($scope.mytask.title.length > 45) {
                    $scope.high = "70px";
                } else {
                    $scope.high = "45px";
                }
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

            //selecting Date from Datepicker
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
                                var date = $filter('date')($scope.tmp.newDate, 'dd - MM - yyyy');
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

//          Selecting time from timepicker
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
                                var time = $filter('date')($scope.tmp1.newDate, 'hh:mm a');
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

//  showing date 
            $scope.showDate = function (selection, e) {
                console.log(selection);
                console.log($scope.mydate.title);
                //adjust time
                var d = new Date();
                if (selection === "Today") {
                    $scope.todoAlarm = d.getTime();
                }
                if (selection === "Tomorrow") {
                    d.setDate(d.getDate() + 1);
                    $scope.todoAlarm = d.getTime();
                }
                $scope.mydate.title = selection;

                if (selection === "Select a date..") {
                    $scope.pickDate1();

                }

            };

            $scope.showTime = function (e, selection) {
             
                var d = new Date();
                if (selection === "Morning") {
                    d.setHours(9);
                    d.setMinutes(0);
                    $scope.alarmTime = d.getTime();
                }
                if (selection === "Afternoon") {
                    d.setHours(13);
                    d.setMinutes(0);
                    d.setDate(d.getDate() + 1);
                    $scope.alarmTime = d.getTime();
                }
                if (selection === "Evening") {
                    d.setHours(17);
                    d.setMinutes(0);
                    $scope.alarmTime = d.getTime();
                }
                if (selection === "Night") {
                    d.setHours(20);
                    d.setMinutes(0);
                    d.setDate(d.getDate() + 1);
                    $scope.alarmTime = d.getTime();
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
            $scope.highedt = "30px";
            $scope.goedt = function (event) {
                if ($scope.mytask.title.length > 45) {
                    $scope.high = "70px";
                } else {
                    $scope.high = "50px";
                }
                var key = event.keyCode;

//                console.log(key);
                if (key == 13) {
                    $scope.addTodo();
                }

            };

//          Editing tasks
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

                for (var i = 0; i < $localStorage["todoTasks"].length; i++) {
                    if ($localStorage["todoTasks"].title == item_title) {
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
                var uid = $localStorage["Initializer"]
                var editRecord = $q.when(ConnectParse.update(item_position, uid, todoObj));
                editRecord.then(
                        function (result) {
                            var storedTask = $localStorage["todoTasks"];
//                                                    console.log(storedTask);
//                                                    console.log(storedTask[1].position);
                            var storedTask = $localStorage["todoTasks"];

                            for (var i = 0; i < storedTask.length; i++) {

                                if (storedTask[i].position == item_position) {
                                    storedTask[i].title = todoObj.title;
                                    storedTask[i].alarmTime = todoObj.alarmTime;
                                    storedTask[i].time = todoObj.time;

                                    console.log("Edited Notification ");
//                                                console.log(result);
                                    if (storedTask[i].time && window.cordova) {
                                        var dat = new Date(todoObj.time);
                                        var tm = new Date(todoObj.alarmTime);
                                        var x = new Date(new Date().toDateString()).getTime();
                                        var finalTime = (new Date((dat.getTime() + tm.getTime()) - x));
                                        console.log(finalTime);
                                        console.log(" Edit Main Hoon Date");
                                        //schedule local notification fro saved todo
                                        console.log("Result Time hai")
                                        window.plugin.notification.local.schedule({
                                            id: String(storedTask[i].time),
                                            text: todoObj.title,
                                            title: "",
                                            at: finalTime,
//                                                    
                                        });
                                        console.log(new Date(storedTask[i].alarmTime));

                                    }
                                }
                            }
                            $localStorage['todoTasks'] = storedTask;
                            console.log("edited");
                            $state.go("app.addTodo");

                        }, function (error) {
                    console.log("Not edited");
                    var storedTask = $localStorage["todoTasks"];
//                                                    console.log(storedTask);
//                                                    console.log(storedTask[1].position);
                    var storedTask = $localStorage["todoTasks"];
                    for (var i = 0; i < storedTask.length; i++) {

                        if (storedTask[i].position == item_position) {
                            storedTask[i].title = todoObj.title;
                            storedTask[i].alarmTime = todoObj.alarmTime;
                            storedTask[i].time = todoObj.time;

                            console.log("OffLine Edited Notification ");
                            var dat = new Date(todoObj.time);
                            var tm = new Date(todoObj.alarmTime);
                            var x = new Date(new Date().toDateString()).getTime();
                            var finalTime = (new Date((dat.getTime() + tm.getTime()) - x));
                            console.log(finalTime);
                            console.log("offline Edit Main Hoon Date");
//                                                console.log(result);
                            if (storedTask[i].time && window.cordova) {
                                //schedule local notification fro saved todo
                                console.log("Result Time hai")
                                window.plugin.notification.local.schedule({
                                    id: String(storedTask[i].time),
                                    text: todoObj.title,
                                    title: "",
                                    at: finalTime,
//                                                    
                                });
                                console.log(new Date(storedTask[i].alarmTime));

                            }
                        }
                    }
                    $localStorage['todoTasks'] = storedTask;
                    console.log("edited in localstorage");
                    $state.go("app.addTodo");

                });
            }


        });