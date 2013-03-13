angular.module('shopping', []).filter('rupee', function () {
			return function (item) {
				return "Rs. " + item;
			}
		})
		.directive('validPrice', function () {
			return {
				require: "ngModel",
				link: function (scope, elm, attrs, ctrl) {

					var regex = /^\d{2,4}(\.\d{1,2})?$/;
					ctrl.$parsers.unshift(function (viewValue) {
						var floatValue = parseFloat(viewValue);
						if (floatValue >= 50 && floatValue <= 5000 && regex.test(viewValue)) {
							ctrl.$setValidity('validPrice', true);
							
						}
						else {
							ctrl.$setValidity('validPrice', false);
						}
						return viewValue;
					});
				}
			};
		})
		.factory('shoppingData',function($http, $q){
			return{
				apiPath:'/api/shoppingCart/',
				getAllItems: function(){
					//Creating a deferred object
					var deferred = $q.defer();

					//Calling Web API to fetch shopping cart items
					$http.get(this.apiPath).success(function(data){
		    
            		//Passing data to deferred's resolve function on successful completion
					deferred.resolve(data);
				}).error(function(){
			    
                	//Sending a friendly error message incase of failure
					deferred.reject("An error occured while fetching items");
				});

				//Returning the promise object
				return deferred.promise;
			},
			addAnItem: function(item){
				var deferred = $q.defer();
				$http.post(this.apiPath,item).success(function(){
					deferred.resolve();
				}).error(function(){
					deferred.reject("An error occured while adding the new item");
				});
				return deferred.promise;
			},
			removeItem: function(id){
				var deferred = $q.defer();
				$http.delete(this.apiPath+id).success(function(){
			    	deferred.resolve();
				}).error(function(){
					deferred.reject("An error occured while deleting item");
				});
				return deferred.promise;
			}
		}
	});