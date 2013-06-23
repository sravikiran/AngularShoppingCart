var sharedMock, ctrl, ctrlScope, sampleUserDetails, injector;

module("cart checkout module", {
    setup: function () {
        var shoppingModule = angular.module("shopping");
        injector = angular.injector(['ng', 'shopping']);

        sharedMock = injector.get('shared');
        sinon.spy(sharedMock, "getCartItems");

        sampleUserDetails = { "Name": "Ravi" };

        ctrlScope = injector.get('$rootScope').$new();
        ctrl = injector.get('$controller')(CartCheckoutCtrl, { $scope: ctrlScope, shared: sharedMock });
    },
    teardown: function () {
        sharedMock.getCartItems.restore();
    }
});

test("Should instantiate controller", function () {
    ok(sharedMock.getCartItems.called, "getCartItems function is called");
});

test('Should set message to be displayed when the user chooses to checkout the cart', function () {
    ctrlScope.userDetails = sampleUserDetails;
    ctrlScope.checkoutCart();

    //expect(ctrlScope.message).not.toBe("");
    notEqual(ctrlScope.message, "", "Message is set");

    //expect(ctrlScope.userDetails).not.toBe(sampleUserDetails);
    notEqual(ctrlScope.userDetails, sampleUserDetails, "User details are cleared");

    //expect(ctrlScope.detailsSubmitted).toBe(true);
    equal(ctrlScope.detailsSubmitted,true,"User details are successfully submitted");
});

/*

it('Should instantiate controller', function () {
expect(sharedMock.getCartItems).toHaveBeenCalled();
});

it('Should set message to be displayed when the user chooses to checkout the cart', function () {
ctrlScope.userDetails = sampleUserDetails;
ctrlScope.checkoutCart();
expect(ctrlScope.message).not.toBe("");
expect(ctrlScope.userDetails).not.toBe(sampleUserDetails);
expect(ctrlScope.detailsSubmitted).toBe(true);
});

*/