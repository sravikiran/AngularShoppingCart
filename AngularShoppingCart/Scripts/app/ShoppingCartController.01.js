function ShoppingCartCtrl($scope, $http) {
			$scope.items = [];

			$scope.item = {};

			$scope.sortExpression = "Name";

			function refreshItems(){
				$http.get('/api/shoppingCart/').success(function (data) {
					$scope.items = data;
				});
			};

			$scope.addItem = function (item) {
				$http.post('/api/shoppingCart/', item).success(function(){
					refreshItems();
				});
				$scope.item = {};
				$scope.itemForm.$setPristine();
			};

			$scope.removeItem = function (id) {
				$http.delete('/api/shoppingCart/'+id).success(function(){
					refreshItems();
				});
			};

			$scope.mySortFunction = function(item) {
				if(isNaN(item[$scope.sortExpression]))
					return item[$scope.sortExpression];
				return parseInt(item[$scope.sortExpression]);
			};

			$scope.totalPrice = function(){
				var total = 0;
					for(count=0;count<$scope.items.length;count++){
						total += $scope.items[count].Price*$scope.items[count].Quantity;
					}
					return total;
			};

			$scope.name=/^[a-zA-Z ]*$/;
		
			$scope.integerval=/^\d*$/;

			refreshItems();
		}