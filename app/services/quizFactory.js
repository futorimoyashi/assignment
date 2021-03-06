'use strict';
angular.module('myApp')
    .factory('quizFactory',['$http', function ($http) {
        var quizFactory = {};
        var list =[];
        var self = this;
        var time = 0;

        quizFactory.getTime = function() {
            return time
        };

        quizFactory.setTime = function(value) {
            time = value
        };

        quizFactory.getQuestions =function(subjectCode){
            var promise = $http.get('db/Quizs/' + subjectCode +".js").then(response => {
                list = response.data;
                return list.sort(() => 0.5 - Math.random()).slice(0, time)
            }).catch(reason => alert(reason));

            return promise;
        };

        quizFactory.getQuestion = function (index) {
            if (list.length <= 0 || index >= list.length)
                return null;
            return list.slice(index, 1);
        }
        
        return quizFactory;
    }]);