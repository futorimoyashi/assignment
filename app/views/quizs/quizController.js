'use strict';

angular.module('myApp.quiz', ['ngRoute','ui.bootstrap'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/takeQuiz/:subjectCode', {
            templateUrl: 'views/quizs/quiz.html',
            controller: 'QuizCtrl',
        });
    }])
    .controller('QuizCtrl', ['quizFactory','subjectFactory','$scope','$routeParams','$interval','$location',function (quizFactory, subjectFactory, $scope, $routeParams,$interval,$location) {
        $scope.currentQuestion = 0;
        $scope.questions=[];
        $scope.time = 60;
        $scope.quizMarks = 0;
        $scope.answer = {};

        var code = $location.path();
        subjectFactory.getNameSubject(code.slice(10)).then(data => {
            $scope.nameSubject = data;
        });

        var stop = $interval(function() {
            $scope.time --;
            if ($scope.time === 0) {
                $interval.cancel(stop);
                $scope.submitQuiz();
            }
        }, 1000);

        quizFactory.getQuestions($routeParams.subjectCode).then((data)=>{
            $scope.questions = data;
        });

        $scope.question = () => {
            return $scope.questions[$scope.currentQuestion];
        };

        $scope.setQuestionIndex = (newIndex)=>{
            if ($scope.answer.choice == $scope.question().AnswerId){
                $scope.quizMarks += $scope.question().Marks;
            }

            $scope.currentQuestion = newIndex;

            return $scope.currentQuestion;
        };
        
        $scope.questionTotal = ()=>{
            return $scope.questions.length;
        };

        $scope.sumup = false;

        $scope.submitQuiz = ()=>{
            if ($scope.answer === $scope.question().AnswerId){
                $scope.quizMarks += $scope.question().Marks;
            }

            $scope.sumup = true;
            $interval.cancel(stop);

            axios.get('http://localhost:8080/students/'+sessionStorage.getItem('id')).then(function(res) {
                axios.patch('http://localhost:8080/students/'+sessionStorage.getItem('id'), {
                    marks: parseInt(res.data.marks) + parseInt($scope.quizMarks)
                })
            });
        }
    }]);
