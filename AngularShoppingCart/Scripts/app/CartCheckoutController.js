function CartCheckoutCtrl($scope,shared) {
    $scope.userDetails = {};

    $scope.detailsSubmitted = false;

    $scope.message = "";

    $scope.checkoutCart = function () {
        $scope.message = "Thank you " + $scope.userDetails.Name + " for using angular shopping cart!\n";
        $scope.message = $scope.message + "We will call on your number " + $scope.userDetails.PhoneNumber + " soon to get your address details.";
        $scope.userDetails = {};
        $scope.detailsSubmitted = true;
    };

    $scope.items = [];

    function loadItems() {
        $scope.items = shared.getCartItems();
    }

    loadItems();
}