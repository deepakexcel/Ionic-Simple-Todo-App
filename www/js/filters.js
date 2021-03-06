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
//                console.log(items);
//                console.log(searchText);
                var resItem = [];
                for (var i = 0; i < items.length; i++) {
                    for (var j = 0; j < items[i].todoTag.length; j++) {
//                        console.log(items[i].title + "--" + items[i].todoTag);
                        if (items[i].todoTag[j].title === searchText) {
                            resItem.push(items[i]);
//                            console.log(items[i]);
//                            console.log("final");
                        }
                    }

                }
                return resItem;
            };
        })
        .filter('titlecase', function () {
            return function (str) {
//                console.log(str);
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
//                    if (itemDate == todayDate) {
                        todayItem.push(items[i]);
//                    }
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
                var thisweek = todayDate+3;
//                console.log("UPPPPCCCOOOMMMIIINNNGG");
//                console.log(thisweek);
                for (var i = 0; i < items.length; i++) {
                    var itemDate = new Date(items[i].time).getDate();
                    if (itemDate > thisweek) {
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
