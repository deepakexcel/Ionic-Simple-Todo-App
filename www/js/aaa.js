angular.module('starter.filters', [])
        .filter('reverse', function () {
            return function (todolist) {
                return todolist.slice().reverse();
            };
        })
        .filter('sameweek', function () {
            return function (item) {
//                console.log("SAME WEEK");
//                 console.log(item);
//                var alarmDate=new Date(item.alarmTime).toDateString();
//                 var currDate=new Date().toDateString();
//                    console.log("THIS WEEK");
////                    console.log(items[i].title);
//                    console.log(currDate);
//                    console.log(alarmDate);
//                    if(currDate!==alarmDate){
                var d = new Date();
                var curweek = getWeek(d);
                d = new Date(item);
                var itemweek = getWeek(d);
                if (itemweek === curweek) {
                    return true;
                }
                else {
                    return false;
                }
                return false;
                function getWeek(d) {
                    // Create a copy of this date object
                    var target = new Date(d.valueOf());

                    // ISO week date weeks start on monday
                    // so correct the day number
                    var dayNr = (d.getDay() + 6) % 7;
                    
                    // ISO 8601 states that week 1 is the week
                    // with the first thursday of that year.
                    // Set the target date to the thursday in the target week
                    target.setDate(target.getDate() - dayNr + 3);

                    // Store the millisecond value of the target date
                    var firstThursday = target.valueOf();

                    // Set the target to the first thursday of the year
                    // First set the target to january first
                    target.setMonth(0, 1);
                    // Not a thursday? Correct the date to the next thursday
                    if (target.getDay() != 4) {
                        target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
                    }

                    // The weeknumber is the number of weeks between the 
                    // first thursday of the year and the thursday in the target week
                    return 1 + Math.ceil((firstThursday - target) / 604800000); // 604800000 = 7 * 24 * 3600 * 1000
                }
//            };

            }
        })
        .filter('thisweek', function () {
            return function (items) {
                var thisweekdays = [];

                for (var i = 0; i < items.length; i++) {
                    var d = new Date(items[i].time);
                    var alarmDate = new Date(items[i].time).toDateString();
                    var currDate = new Date().toDateString();
                    if (currDate === alarmDate) {
                        continue;
                    }else{
//                    console.log("THIS WEEK");
//                    console.log(items[i].title);
//                    console.log(currDate);
//                    console.log(new Date(items[i].alarmTime));
//                    console.log(new Date(items[i].time))

//                    console.log(alarmDate);
                    var itemweek = getWeek(d);
//                    console.log(itemweek);
                    var curweek = getWeek(new Date());

                    if (itemweek === curweek) {
//                        console.log("if cond")
//                        console.log(itemweek);
//                        console.log(curweek);
                            thisweekdays.push(items[i]);
                        
                        }
                        
                    }

                }
                return thisweekdays;
                function getWeek(d) {
                    // Create a copy of this date object
                    var target = new Date(d.valueOf());

                    // ISO week date weeks start on monday
                    // so correct the day number
                    var dayNr = (d.getDay() + 6) % 7;

                    // ISO 8601 states that week 1 is the week
                    // with the first thursday of that year.
                    // Set the target date to the thursday in the target week
                    target.setDate(target.getDate() - dayNr + 3);

                    // Store the millisecond value of the target date
                    var firstThursday = target.valueOf();

                    // Set the target to the first thursday of the year
                    // First set the target to january first
                    target.setMonth(0, 1);
                    // Not a thursday? Correct the date to the next thursday
                    if (target.getDay() != 4) {
                        target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
                    }

                    // The weeknumber is the number of weeks between the 
                    // first thursday of the year and the thursday in the target week
                    return 1 + Math.ceil((firstThursday - target) / 604800000); // 604800000 = 7 * 24 * 3600 * 1000
                }
            };
        })
        .filter('category', function ($rootScope) {
            console.log("TAG 1f");
            return function (items) {
                var searchText = $rootScope.selectedTag;
                console.log(items);
                console.log(searchText);
                var resItem = [];
                for (var i = 0; i < items.length; i++) {
                    for (var j = 0; j < items[i].todoTag.length; j++) {
                        console.log(items[i].title + "--" + items[i].todoTag);
                        if (items[i].todoTag[j].title === searchText) {
                            resItem.push(items[i]);
                            console.log(items[i]);
                            console.log("final");
                        }
                    }

                }
                return resItem;
            };
        })
        .filter('titlecase', function () {
            return function (str) {
                console.log(str);
                if (str)
                    return str.replace(/\w\S*/g, function (txt) {
                        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                    });
            };
        })
        .filter('today', function () {
            return function (items) {
                var todayItem = [];
                var todayDate = new Date().getDate();
                for (var i = 0; i < items.length; i++) {
                    var itemDate = new Date(items[i].time).getDate();
                    if (itemDate == todayDate) {
                        todayItem.push(items[i]);
                    }
                }
                return todayItem;
            };
        })
        .filter('todaymenu', function () {
            return function (item) {
                var todayDate = new Date().getDate();
                var itemDate = new Date(item.time).getDate();
                if (itemDate == todayDate) {
                    return true;
                }
                else
                    return false;
            };
        })
        .filter('upcoming', function () {
            return function (items) {
                //alert(todayItem);
                var todayItem = [];
                var todayDate = new Date().getDate();
                for (var i = 0; i < items.length; i++) {
                    var itemDate = new Date(items[i].time).getDate();
                    if (itemDate > todayDate) {
                        todayItem.push(items[i]);
                    }
                }
                return todayItem;
            };
        })
        .filter('upcomingmenu', function () {
            return function (item) {
                var todayDate = new Date().getDate();
                var itemDate = new Date(item.time).getDate();
                if (itemDate > todayDate) {
                    return true;
                }
                else
                    return false;
            };
        })
        .filter('sortByDate', function () {
            return function (todolist) {
                return sortItem(todolist);
            };
            function sortItem(todolist) {
                return todolist.sort(function (a, b) {
                    return a.time - b.time;
                });
            }
        });



[{"time":1440492075296,"alarmTime":1440502215296,"parseStatus":false,"title":"Demen Anu","done":false,"position":115,"completed":"item-not-completed"},{"time":1440491933482,"alarmTime":1440502253482,"parseStatus":false,"title":"Basuri tyjytj","done":false,"position":114,"completed":"item-not-completed"},{"time":1440491542046,"alarmTime":1440502222046,"parseStatus":false,"title":"Basuri Basuri","done":false,"position":113,"completed":"item-not-completed"},{"time":1440491501236,"alarmTime":1440502241236,"parseStatus":false,"title":"Chandan Singh","done":false,"position":112,"completed":"item-not-completed"},{"time":1440491478383,"alarmTime":1440502218383,"parseStatus":false,"title":"Demen","done":false,"position":111,"completed":"item-not-completed"},{"time":1439317800000,"alarmTime":1440478500000,"parseStatus":false,"title":"Demen","done":false,"position":110,"completed":"item-not-completed"},{"time":1440477419122,"alarmTime":1440476700000,"parseStatus":false,"title":"yukmykm","done":false,"position":109,"completed":"item-not-completed"},{"time":1440408212140,"alarmTime":1440415832140,"parseStatus":false,"title":"jyjyjk","done":false,"position":108,"completed":"item-not-completed"},{"time":1440009000000,"alarmTime":1440052200000,"parseStatus":false,"title":"Chandan","done":false,"position":107,"completed":"item-not-completed"},{"time":1440046649973,"alarmTime":1440048600000,"parseStatus":false,"title":"Rajan","done":false,"position":106,"completed":"item-not-completed"},{"title":"Demen Anufgbfgn","time":1440492334687,"alarmTime":1440502234687,"parseStatus":true,"done":false,"userID":866099483482529,"completed":"item-not-completed","position":116,"todoTag":""}]


//""id":"100286145672851621741","fname":"Anurag Jaiswal","profile":"https://lh3.googleusercontent.com/-2B4nX-0BGvE/AAAAAAAAAAI/AAAAAAAAABY/DP8M8VliU0U/photo.jpg","email":"ajaisanu@gmail.com""