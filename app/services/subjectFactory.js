'use strict';
angular.module('myApp')
    .factory('subjectFactory',['$http', function ($http) {
        var subjectFactory = {};
        var list =[];
        var subject = {};
        var self = this;

        subjectFactory.getSubjects = function(){
            var promise = $http.get('db/Subjects.json').then(response => {
                list = response.data;
                return list;
            }).catch(reason => alert(reason));

            return promise;
        };

        subjectFactory.getNameSubject = function(subjectCode) {
            var promise = subjectFactory.getSubjects().then((data)=>{
                var subject = data.filter(item=>{
                    return item.Id === subjectCode;
                });
                return subject[0].Name;
            });

            return promise;
        };

        subjectFactory.getList = function () {
            return list;
        };

        return subjectFactory;
    }]);