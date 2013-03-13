function ShoppingCartCtrl($scope, shoppingData) {
    $scope.items = [];

    $scope.item = {};

    $scope.sortExpression = "Name";

    function refreshItems() {
        shoppingData.getAllItems().then(function (data) {
            $scope.items = data;
        },
                function (errorMessage) {
                    assignError(errorMessage);
                });
    };

    $scope.addItem = function (item) {
        shoppingData.addAnItem(item).then(function () {
            refreshItems();
        },
                function (errorMessage) {
                    assignError(errorMessage);
                });

        $scope.item = {};
        $scope.itemForm.$setPristine();
    };

    $scope.removeItem = function (id) {
        shoppingData.removeItem(id).then(function () {
            refreshItems();
        },
                function (errorMessage) {
                    assignError(errorMessage);
                });
    };

    function assignError(errorMessage) {
        $scope.error = errorMessage;
    };

    $scope.mySortFunction = function (item) {
        if (isNaN(item[$scope.sortExpression]))
            return item[$scope.sortExpression];
        return parseInt(item[$scope.sortExpression]);
    };

    $scope.totalPrice = function () {
        var total = 0;
        for (count = 0; count < $scope.items.length; count++) {
            total += $scope.items[count].Price * $scope.items[count].Quantity;
        }
        return total;
    };

    $scope.name = /^[a-zA-Z ]*$/;

    $scope.integerval = /^\d*$/;

    refreshItems();
}