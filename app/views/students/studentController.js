'use strict';

angular.module('myApp.student', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/listStudents', {
            templateUrl: 'views/students/list.html',
            controller: 'StudentCtrl',
            resolve: {
                initialData: (studentFactory) => {
                    return studentFactory.getStudents();
                }
            }
        }).when('/login',{
            templateUrl: 'views/students/login.html',
            controller: 'LoginCtrl'
        }).when('/logout',{
            templateUrl: 'views/students/logout.html',
            controller: 'LogoutCtrl'
        })
        .when('/add',{
            templateUrl: 'views/students/add.html',
            controller: 'AddCtrl'
        })
        .when('/forgot',{
            templateUrl: 'views/students/forgot.html',
            controller: 'ForgotCtrl'
        })
        .when('/change',{
            templateUrl: 'views/students/change.html',
            controller: 'ChangeCtrl'
        })
        .when('/profile',{
            templateUrl: 'views/students/profile.html',
            controller: 'ProfileCtrl'
        });
    }])
    .controller('StudentCtrl', ['studentFactory','$scope', function ( studentFactory, $scope) {
        $scope.students = studentFactory.getList();
    }])
    .controller('LoginCtrl', ['studentFactory','$scope','$location', function ( studentFactory, $scope, $location) {
        $scope.loginForm = {};
        $scope.errorMessage = null;

        $scope.checkLogin=()=>{
            studentFactory.checkLogin($scope.loginForm.username, $scope.loginForm.password).then(data => {
                if (data != null && data.length>0){
                    studentFactory.setIsLogin(true);
                    sessionStorage.setItem('id', data[0].id)
                    $location.path('/');
                    $scope.errorMessage = null;
                }else{
                    studentFactory.setIsLogin(false);
                    $scope.errorMessage = "Invalid username or password";
                }

            });
        };
    }])
    .controller('LogoutCtrl', ['studentFactory','$scope','$location', function ( studentFactory, $scope, $location) {
        $scope.logout = ()=>{
            studentFactory.setIsLogin(false);
            sessionStorage.clear();
            $location.path('/');
        };
        $scope.cancelLogout = ()=>{
            $location.path('/');
        };
    }])
    .controller('AddCtrl', ['studentFactory','$scope','$location', function ( studentFactory, $scope, $location) {
        $scope.addForm = {};
        $scope.add = function() {
            axios.post('http://localhost:8080/students', {
                username: $scope.addForm.username,
                password: $scope.addForm.password,
                fullname: $scope.addForm.fullname,
                email: $scope.addForm.email,
                gender: $scope.addForm.gender,
                birthday: $scope.addForm.birthday,
                schoolfee: $scope.addForm.schoolfee,
                marks: "0"
              })
              .then(function (response) {
                $location.path('/');
              })
              .catch(function (error) {
                $scope.errorMessage = "Add Failed!";
                $location.path('/');
              });
        }
    }])
    .controller('ForgotCtrl', ['studentFactory','$scope', function ( studentFactory, $scope) {
        $scope.forgotForm = {};
        $scope.errorMessage = null;

        $scope.getPassword = function() {
            studentFactory.forgotPassword($scope.forgotForm.username, $scope.forgotForm.email).then(data => {
                if (data!=null && data.length>0) {
                    $scope.errorMessage = null;
                    $scope.password = data[0].password;
                } else {
                    $scope.errorMessage = 'Wrong inputs';
                }
            });
        }
    }])
    .controller('ChangeCtrl', ['studentFactory','$scope','$location', function ( studentFactory, $scope) {
        $scope.changeForm = {};
        $scope.changePassword = function() {
            axios.patch('http://localhost:8080/students/'+sessionStorage.getItem('id'), {
                password: $scope.changeForm.newPassword
              })
              .then(function (response) {
                $scope.msg = "abc";
              })
              .catch(function (error) {
                $scope.errorMessage = "Update Failed!";
              });
        }
    }])
    .controller('ProfileCtrl', ['studentFactory','$scope','$location', function ( studentFactory, $scope) {
        $scope.profileForm = {};
        $scope.update = function() {
            axios.patch('http://localhost:8080/students/'+sessionStorage.getItem('id'), {
                fullname: $scope.changeForm.fullname,
                email: $scope.changeForm.email,
                birthday: $scope.changeForm.birthday,
                schoolfee: $scope.changeForm.schoolfee
              })
              .then(function (response) {
                $scope.msg = "abc";
              })
              .catch(function (error) {
                $scope.errorMessage = "Update Failed!";
              });
        }
    }]);

