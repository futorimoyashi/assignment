'use strict';
angular.module('myApp')
    .factory('quizFactory',['$http', function ($http) {
        var quizFactory = {};
        var list =[];
        var self = this;

        quizFactory.getQuestions =function(subjectCode){
            var promise = $http.get('db/Quizs/' + subjectCode +".js").then(response => {
                list = response.data;
                return list;
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