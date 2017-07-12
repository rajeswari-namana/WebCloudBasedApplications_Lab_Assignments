var weatherApp=angular.module('weatherApp',['ngResource','ngRoute']);

//routes
weatherApp.config(function($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl:'home1.html',
            controller:'homeController'

        })
        .when('/forecast',{
            templateUrl:'forecast.html',
            controller:'forecastController'

        })
});

// services
weatherApp.service('cityService',function(){
    this.city="NEW YORK";
});



//controllers
weatherApp.controller('homeController',['$scope','cityService',function($scope, cityService){

    $scope.city=cityService.city;
    $scope.$watch('city',function(){
        cityService.city=$scope.city;
    });

}]);



weatherApp.controller('forecastController',['$scope','cityService','$resource','$http', function($scope,cityService,$resource,$http){

    $scope.city=cityService.city;
    $scope.weatherAPI=$resource("http://api.openweathermap.org/data/2.5/weather",{
        callback: "JSON_CALLBACK" }, { get: { method: "JSONP"}});

    $scope.weatherResult=$scope.weatherAPI.get({q: $scope.city, appid: be1bed75480058c2feebdd4290ef3899});

    $scope.convertToFahrenheit=function(degK){

        return Math.round((1.8 * (degK - 273))+32);
        $scope.startLocationWeatherUrl="https://api.wunderground.com/api/36b799dc821d5836/conditions/q/"+start+".json";
        $scope.endLocationWeatherUrl="https://api.wunderground.com/api/36b799dc821d5836/conditions/q/"+end+".json";
        $http.get(startLocationWeatherUrl).success(function(data) {
            if(data.current_observation==null){
                startLocationWeatherUrl="https://api.wunderground.com/api/36b799dc821d5836/conditions"+data.response.results[0].l+".json";
                $http.get(startLocationWeatherUrl).success(function(data) {
                    markerStart=new google.maps.Marker({
                        map:map
                    });
                    markerStart.setPosition(directionResponse.routes[0].legs[0].start_location);
                    infowindowStart.setContent('<h4>Weather Details</h4><p class="weatherDetails"> Temperature is '+data.current_observation.temp_f+' and '+data.current_observation.weather+'<img src="'+data.current_observation.icon_url+'"/></p>');
                    infowindowStart.open(map,markerStart);
                });
            }
            else{
                markerStart=new google.maps.Marker({
                    map:map
                });
                markerStart.setPosition(directionResponse.routes[0].legs[0].start_location);
                infowindowStart.setContent('<h4>Weather Details</h4><p class="weatherDetails"> Temperature is '+data.current_observation.temp_f+' and '+data.current_observation.weather+'<img src="'+data.current_observation.icon_url+'"/></p>');
                infowindowStart.open(map,markerStart);
            }
        });
        $http.get(endLocationWeatherUrl).success(function(data) {
            if(data.current_observation==null){
                endLocationWeatherUrl="https://api.wunderground.com/api/36b799dc821d5836/conditions"+data.response.results[0].l+".json";
                $http.get(endLocationWeatherUrl).success(function(data) {
                    markerEnd=new google.maps.Marker({
                        map:map
                    });
                    markerEnd.setPosition(directionResponse.routes[0].legs[0].end_location);
                    infowindowEnd.setContent('<h4>Weather Details</h4><p class="weatherDetails"> Temperature is '+data.current_observation.temp_f+' and '+data.current_observation.weather+'<img src="'+data.current_observation.icon_url+'"/></p>');
                    infowindowEnd.open(map,markerEnd);
                });
            }
            else{
                markerEnd=new google.maps.Marker({
                    map:map
                });
                markerEnd.setPosition(directionResponse.routes[0].legs[0].end_location);
                infowindowEnd.setContent('<h4>Weather Details</h4><p class="weatherDetails"> Temperature is '+data.current_observation.temp_f+' and '+data.current_observation.weather+'<img src="'+data.current_observation.icon_url+'"/></p>');
                infowindowEnd.open(map,markerEnd);
            }
        });
    };

    google.maps.event.addDomListener(window, 'load', $scope.initialize);



    }]);
