angular.module('starter.services', [])
        .service("Data", function () {
            var tasks = [];
            var taskObj = {};
            taskObj.title = "";
        })
        .service("Alertuser", function () {
            this.alert = function (msg) {
                console.log(msg);
                if (window.plugins) {
                    window.plugins.toast.showLongBottom(msg, function (a) {
                        console.log("msg");
                    }, function (b) {
                    });
                }

            };
            this.saveAlert = function (msg) {
                console.log(msg);
                if (window.plugins) {
                    window.plugins.toast.showShortCenter(msg, function (a) {
                        console.log("msg");
                    }, function (b) {
                    });
                }

            };
        })
        .service("ConnectParse", function ($q) {
            var service = {};
            var ToDoObject = Parse.Object.extend("ToDoObject");
            var FBAppUser = Parse.Object.extend("FBAppUser");
            var GoogleAppUser = Parse.Object.extend("GoogleAppUser");
            service.fbSave = function (todoObj) {
                console.log("FB LOGIN SERVICE CALLED");
                console.log(todoObj);
//                var ToDoObject1 = Parse.Object.extend("ToDoObject1");
                var parseObj = new FBAppUser();
//                parseObj.set("fbid", parseInt(todoObj.id));
//                parseObj.set("fname", String(todoObj.fname));
//                parseObj.set("lname", String(todoObj.lname));
//                parseObj.set("gender", String(todoObj.gender));
//                parseObj.set("profile", String(todoObj.profile));
                parseObj.set("fbid", parseInt(todoObj.id));
                parseObj.set("fname", String(todoObj.fname));
                parseObj.set("lname", String(todoObj.lname));
                parseObj.set("gender", String(todoObj.gender));
                parseObj.set("profile", String(todoObj.profile));
                var promiseObject = $q.defer();
                parseObj.save(null, {
                    success: function (data) {
                        console.log("succ 1 erhrt5hrt5hhtr5htr");
                        // Execute any logic that should take place after the object is saved.
                        promiseObject.resolve(data);
                        console.log(data)
                        console.log("succ erhrt5hrt5hhtr5htr");
                    },
                    error: function (data, error) {
                        console.log("err");
                        // Execute any logic that should take place if the save fails.
                        // error is a Parse.Error with an error code and message.
                        promiseObject.reject(error.message);
                    }
                });
                return promiseObject.promise;
            };

            service.glSave = function (todoObj) {
                console.log("GOOGLE Login SERVICE CALLED");
                console.log(todoObj);
                var parseObj = new GoogleAppUser();
                parseObj.set("google_id", String(todoObj.id));
                parseObj.set("name", String(todoObj.fname));
                parseObj.set("email", String(todoObj.email));
                parseObj.set("gender", String(todoObj.gender));
                parseObj.set("user_id", String(todoObj.id));
                var promiseObject = $q.defer();
                parseObj.save(null, {
                    success: function (data) {
                        console.log("succ 1 erhrt5hrt5hhtr5htr");
                        // Execute any logic that should take place after the object is saved.
                        promiseObject.resolve(data);
                        console.log(data)
                        console.log("succ erhrt5hrt5hhtr5htr");
                    },
                    error: function (data, error) {
                        console.log("err");
                        // Execute any logic that should take place if the save fails.
                        // error is a Parse.Error with an error code and message.
                        promiseObject.reject(error.message);
                    }
                });
                return promiseObject.promise;
            };
            service.save = function (todoObj) {
                console.log("SAVE SERVICE CALLED");
                if (todoObj.userID) {
                    //var ToDoObject1 = Parse.Object.extend("ToDoObject1");
                    var parseObj = new ToDoObject();
                    parseObj.set("userID", parseInt(todoObj.userID));
                    parseObj.set("parseStatus", false);
                    parseObj.set("done", todoObj.done);
//                parseobj.set("todoalarm", todoObj.todoAlarm)
                    if (todoObj.time) {
                        parseObj.set("time", todoObj.time);
                        console.log("time");
                    }
                    if (todoObj.alarmTime) {
                        parseObj.set("alarmTime", todoObj.alarmTime);
                        console.log("alarmTime");
                    }
                    parseObj.set("todo_title", todoObj.title);
                    parseObj.set("position", todoObj.position);
                    console.log("Task Saved...");
                    console.log(todoObj.todoTag);

                    var promiseObject = $q.defer();
                    parseObj.save(null, {
                        success: function (data) {
                            console.log("success todoTag");
                            // Execute any logic that should take place after the object is saved.
                            var ifRetrieved = service.retrieve(data.id);
                            ifRetrieved.then(
                                    function (result) {
                                        console.log("success ifRetrieved");
                                        promiseObject.resolve(result);
                                    },
                                    function (error) {
                                        console.log("success error");
                                        promiseObject.reject(error);
                                    }
                            );

                        },
                        error: function (data, error) {
                            console.log("error error");
                            // Execute any logic that should take place if the save fails.
                            // error is a Parse.Error with an error code and message.
                            promiseObject.reject(error.message);
                        }
                    });
                    return promiseObject.promise;
                }
            };

            service.Gsave = function (todoObj) {
                console.log("GSAVE SERVICE CALLED");
                //var ToDoObject1 = Parse.Object.extend("ToDoObject1");
                var parseObj = new ToDoObject();
                parseObj.set("g_userID", String(todoObj.userID));
                parseObj.set("parseStatus", false);
                parseObj.set("done", todoObj.done);
                if (todoObj.time) {
                    parseObj.set("time", todoObj.time);
                    console.log("time");
                }
                if (todoObj.alarmTime) {
                    parseObj.set("alarmTime", todoObj.alarmTime);
                    console.log("alarmTime");
                }
                parseObj.set("todo_title", todoObj.title);
                parseObj.set("position", todoObj.position);
                console.log("Task Saved...");
                console.log(todoObj.todoTag);
                var promiseObject = $q.defer();
                parseObj.save(null, {
                    success: function (data) {
                        console.log("success todoTag");
                        // Execute any logic that should take place after the object is saved.
                        var ifRetrieved = service.retrieve(data.id);
                        ifRetrieved.then(
                                function (result) {
                                    console.log("success ifRetrieved");
                                    promiseObject.resolve(result);
                                },
                                function (error) {
                                    console.log("success error");
                                    promiseObject.reject(error);
                                }
                        );

                    },
                    error: function (data, error) {
                        console.log("error error");
                        // Execute any logic that should take place if the save fails.
                        // error is a Parse.Error with an error code and message.
                        promiseObject.reject(error.message);
                    }
                });
                return promiseObject.promise;
            };
            
            service.trashSave = function (trashObj) {
                console.log("Trash SAVE SERVICE CALLED");
                console.log(trashObj);
                if (trashObj.userID) {
                    var parseObj1 = new TrashObject();
                    if(String(trashObj.userID).length > 18){
                        parseObj1.set("g_userID", String(trashObj.userID));
                    }else{
                        parseObj1.set("userID", parseInt(trashObj.userID));
                    }
//                    if(trashObj.userID.length)
                    
                    parseObj1.set("parseStatus", false);
                    parseObj1.set("done", trashObj.done);
//                parseobj.set("todoalarm", todoObj.todoAlarm)
                    if (trashObj.time) {
                        parseObj1.set("time", trashObj.time);
                        console.log("time");
                    }
                    if (trashObj.alarmTime) {
                        parseObj1.set("alarmTime", trashObj.alarmTime);
                        console.log("alarmTime");
                    }
                    parseObj1.set("todo_title", trashObj.title);
                    parseObj1.set("position", trashObj.position);
                    console.log("Task Saved...");
                    console.log(trashObj.todoTag);

                    var promiseObject = $q.defer();
                    parseObj1.save(null, {
                        success: function (data) {
                            console.log("success todoTag");
                            // Execute any logic that should take place after the object is saved.
                            var ifRetrieved = service.retrieve(data.id);
                            ifRetrieved.then(
                                    function (result) {
                                        console.log("success ifRetrieved");
                                        promiseObject.resolve(result);
                                    },
                                    function (error) {
                                        console.log("success error");
                                        promiseObject.reject(error);
                                    }
                            );

                        },
                        error: function (data, error) {
                            console.log("error error");
                            // Execute any logic that should take place if the save fails.
                            // error is a Parse.Error with an error code and message.
                            promiseObject.reject(error.message);
                        }
                    });
                    return promiseObject.promise;
                }
            };



            service.retrieve = function (parseObjID) {
                console.log("retrieve SERVICE CALLED");
                console.log("Hiiii" + parseObjID);
                var myToDoQuery = new Parse.Query(ToDoObject);
                var myResponse = $q.defer();
                var myDataObj = {};
                myToDoQuery.get(parseObjID, {
                    success: function (responseObj)
                    {
                        // The object was retrieved successfully.
                        myDataObj.time = responseObj.get("time");
                        myDataObj.parseStatus = responseObj.get("parseStatus");
                        myDataObj.title = responseObj.get("todo_title");
                        myDataObj.done = responseObj.get("done");
                        myResponse.resolve(myDataObj);
                    },
                    error: function (error) {
                        // The object was not retrieved successfully.
                        // error is a Parse.Error with an error code and message.
                        myResponse.reject(error.message);
                    }
                });
                return myResponse.promise;
            };

            service.searchData = function (value) {
                var myToDoQuery = new Parse.Query(ToDoObject);
                var myResponse = $q.defer();
                var myDataObj = {};
                var ddd = myToDoQuery.contains("todo_title", value);
                myToDoQuery.get(value, {
                    success: function (responseObj)
                    {
                        // The object was retrieved successfully.
                        myDataObj.time = responseObj.get("time");
                        myDataObj.parseStatus = responseObj.get("parseStatus");
                        myDataObj.title = responseObj.get("todo_title");
                        myDataObj.done = responseObj.get("done");
                        myResponse.resolve(myDataObj);
                    },
                    error: function (error) {
                        // The object was not retrieved successfully.
                        // error is a Parse.Error with an error code and message.
                        myResponse.reject(error.message);
                    }
                });
                return myResponse.promise;
            }

            service.update = function (item_pos, uid, toUpdateobj) {
//                var toUpdateValue = toUpdateobj.title;
                var promiseObject = $q.defer();
//                alert(item_pos);
                var parseObj;
                var query = new Parse.Query(ToDoObject);
                if (uid) {
                    if (uid.length > 18) {
                        var ddd = query.equalTo("g_userID", String(uid));
                    } else {
                        var ddd = query.equalTo("userID", parseInt(uid));
                    }
                }
                console.log(ddd);
//                query.descending("position");
                query.find({
                    success: function (results) {

                        if (results.length > 0) {
                            for (var i = 0; i < results.length; i++) {
//                                console.log(results[i].get("position"));
                                if (parseInt(item_pos) === results[i].get("position")) {
                                    console.log(results[i].get("position"));
                                    parseObj = results[i];
                                    parseObj.save(null, {
                                        success: function (data) {

                                            // Execute any logic that should take place after the object is saved.

                                            parseObj.set("todo_title", toUpdateobj.title);
                                            parseObj.set("alarmTime", toUpdateobj.alarmTime);
                                            parseObj.set("time", toUpdateobj.time);
                                            parseObj.save();
                                            promiseObject.resolve(data);
                                        },
                                        error: function (data, error) {
                                            promiseObject.reject(error.message);
                                        }
                                    });
                                }
                            }
                        }

                        promiseObject.resolve(results);
                        console.log("rec exist");
//                        console.log(results);
                    },
                    error: function (error) {
                        promiseObject.reject(error.message);
                        console.log("rec not exist");
                        console.log(error);
                        console.log(error.message);

                    }
                });
                console.log(toUpdateobj);
                return promiseObject.promise;
            };



//            service.update = function (parseObj, toUpdateField, toUpdateobj) {
//                console.log("UPDATE SERVICE CALLED");
//                console.log(parseObj);
//                console.log(toUpdateField);
//                console.log(toUpdateobj);
//                var promiseObject = $q.defer();
//                var query = new Parse.Query(ToDoObject);
//                query.equalTo("position", toUpdateField);
//                query.find({
//                    success: function (results) {
//                        console.log(results);
//                        promiseObject.resolve(results);
//                        console.log("rec exist");
//                        console.log(results);
//                        parseObj.save(null, {
//                            success: function (data) {
////                                parseObj.set("todo_title", "");
//                                   parseObj.set("userID", toUpdateobj.userID)
//                                parseObj.set("todo_title", toUpdateobj.title);
//                                parseObj.set("parseStatus", toUpdateobj.parseStatus);
//                                parseObj.set("done", toUpdateobj.done);
//                                parseObj.set("time", toUpdateobj.time);
//                                parseObj.set("alarmTime", toUpdateobj.alarmTime);
//                                parseObj.set("position", toUpdateobj.position);
//                                console.log("Task Updated...");
//
//                                parseObj.save();
//                                promiseObject.resolve(data);
//                            },
//                            error: function (data, error) {
//                                promiseObject.reject(error.message);
//                            }
//                        });
//                    },
//                    error: function (error) {
//                        promiseObject.reject(error.message);
//                        console.log("rec not exist");
//                        console.log(error);
//                        console.log(error.message);
//
//                    }
//                });
////                return promiseObject.promise;
////                var toUpdateValue = toUpdateobj.title;
////                var promiseObject = $q.defer();
////                parseObj.save(null, {
////                    success: function (data) {
////                        
////                        // Execute any logic that should take place after the object is saved.
////                        parseObj.set(toUpdateField, toUpdateValue);
////                        parseObj.save();
////                        promiseObject.resolve(data);
////                    },
////                    error: function (data, error) {
////                        promiseObject.reject(error.message);
////                    }
////                });
//                return promiseObject.promise;
//            };
            service.complete = function (parseObj, toUpdateField, doneStatus) {
                console.log(parseObj);
                console.log(toUpdateField);
                console.log(doneStatus);
                console.log("complete SERVICE CALLED");
                var toUpdateValue = doneStatus;
                var promiseObject = $q.defer();
                parseObj.save(null, {
                    success: function (data) {

                        // Execute any logic that should take place after the object is saved.
                        parseObj.set(toUpdateField, toUpdateValue);
                        parseObj.save();
                        promiseObject.resolve(data);
                    },
                    error: function (data, error) {
                        promiseObject.reject(error.message);
                    }
                });
                return promiseObject.promise;
            };
            service.checkQuery = function (parseDatatype, fieldName, fieldValue) {
                console.log("checkQuery SERVICE CALLED");
                var promiseObject = $q.defer();
                var query = new Parse.Query(parseDatatype);
                query.equalTo(fieldName, fieldValue);
                query.find({
                    success: function (results) {
                        promiseObject.resolve(results);
                    },
                    error: function (error) {
                        promiseObject.reject(error.message);
                    }
                });
                return promiseObject.promise;

            };
            service.checkIfRecordExist = function (userid) {
                console.log("checkIfRecordExist SERVICE CALLED");
                var promiseObject = $q.defer();
                var query = new Parse.Query(ToDoObject);
                if (userid.length > 18) {
                    query.equalTo("g_userID", String(userid));
                } else {
                    query.equalTo("userID", parseInt(userid));
                }
                query.descending("position");
                query.find({
                    success: function (results) {
                        promiseObject.resolve(results);
                        console.log("rec exist");
//                        console.log(results);
                    },
                    error: function (error) {
                        promiseObject.reject(error.message);
                        console.log("rec not exist");
                        console.log(error);
                        console.log(error.message);

                    }
                });
                return promiseObject.promise;

            };
            service.checkPosition = function (userid) {
                console.log("checkPosition SERVICE CALLED");
                console.log(userid);
                var promiseObject = $q.defer();
                var query = new Parse.Query(ToDoObject);
                if (userid.length > 18) {
                    query.equalTo("g_userID", String(userid));
                } else {
                    query.equalTo("userID", parseInt(userid));
                }
                query.descending("position");
                query.find({
                    success: function (results) {
                        console.log(results);
                        promiseObject.resolve(results);
                    },
                    error: function (error) {
                        promiseObject.reject(error.message);
                    }
                });
                return promiseObject.promise;

            };
            service.fetchRecord = function (userid, userskip) {
                console.log("Login CHECK FETCH");
                console.log(userid);
                console.log(userskip);
                var promiseObject = $q.defer();
                var query = new Parse.Query(ToDoObject);
                if (userid.length > 18) {
                    query.equalTo("g_userID", String(userid));
                } else {
                    query.equalTo("userID", parseInt(userid));
                }
                query.limit(10);
                query.skip(userskip);
                query.descending("position");
                query.find({
                    success: function (results) {
                        promiseObject.resolve(results);
                        console.log(userid);
//                        console.log(userskip);
                        console.log("success");
//                        console.log(results);

                    },
                    error: function (error) {
                        promiseObject.reject(error.message);
                        console.log("eror");
                        console.log(error)
                    }
                });
                return promiseObject.promise;

            };
            
              service.deleteRecord = function (parseObj) {
                console.log(parseObj);
//                console.log(toUpdateField);
//                console.log(doneStatus);
                console.log("Delete SERVICE CALLED");
                var toUpdateValue = true;
                var promiseObject = $q.defer();
                parseObj.save(null, {
                    success: function (data) {
                        // Execute any logic that should take place after the object is saved.
                        parseObj.set("deleteStatus", toUpdateValue);
                        parseObj.save();
                        promiseObject.resolve(data);
                    },
                    error: function (data, error) {
                        promiseObject.reject(error.message);
                    }
                });
                return promiseObject.promise;
            };
            
            service.deleteParseRecord = function (parseObj) {
                console.log("deleteRecord SERVICE CALLED");
                var promiseObject = $q.defer();

                parseObj.destroy({
                    success: function (data) {
                        // Execute any logic that should take place after the object it is deleted.
                        promiseObject.resolve(data);
                    },
                    error: function (data, error) {
                        // Execute any logic that should take place if the save fails.
                        // error is a Parse.Error with an error code and message.
                        promiseObject.reject(error.message);
                    }
                });
                return promiseObject.promise;
            };
            return service;

        });
