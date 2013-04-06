
describe("CartCheckoutCtrl", function () {

    var sharedMock, ctrl, ctrlScope, sampleUserDetails;

    beforeEach(inject(function ($rootScope, $controller) {
        sharedMock = {
            getCartItems: jasmine.createSpy('getCartItems')
        };

        sampleUserDetails = { "Name": "Ravi" };
        ctrlScope = $rootScope.$new();
        ctrl = $controller(CartCheckoutCtrl, { $scope: ctrlScope, shared: sharedMock });
    }));

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
});
