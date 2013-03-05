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
								//return viewValue;
							}
							else {
								ctrl.$setValidity('validPrice', false);
							}
							return viewValue;
						});
					}
				};
			});