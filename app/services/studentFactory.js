'use strict';
angular.module('myApp')
    .factory('studentFactory',['$http', function ($http) {
        var studentFactory = {};
        var student = {};
        var list =[];
        var isLogin = false;
        var self = this;

        studentFactory.getIsLogin=()=>{
            return isLogin;
        };
        studentFactory.setIsLogin =(value)=>{
            isLogin = value;
        };

        studentFactory.checkLogin = (username, password)=>{
            var promise = studentFactory.getStudents().then((data)=>{
                var students = data.filter(item=>{
                    return item.username === username && item.password === password;
                });
                return students;
            });

            return promise;
        };

        studentFactory.forgotPassword = (username, email)=>{
            var promise = studentFactory.getStudents().then((data)=>{
                var students = data.filter(item=>{
                    return item.username === username && item.email === email;
                });
                return students;
            });

            return promise;
        };

        studentFactory.getStudents = function(){
            var promise = $http.get('http://localhost:8080/students').then(response => {
                list = response.data;
                return list;
            }).catch(reason => alert(reason));

            return promise;
        };
        studentFactory.getList = function () {
            return list;
        };

        return studentFactory;
    }]);