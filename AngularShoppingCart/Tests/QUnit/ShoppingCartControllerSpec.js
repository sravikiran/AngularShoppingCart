var shoppingCartStaticData = [
    { "ID": 1, "Name": "Item1", "Price": 100, "Quantity": 5 },
    { "ID": 2, "Name": "Item2", "Price": 55, "Quantity": 10 },
    { "ID": 3, "Name": "Item3", "Price": 60, "Quantity": 20 },
    { "ID": 4, "Name": "Item4", "Price": 65, "Quantity": 8 }
];

//Mocks
var windowMock, httpBackend, _shoppingData, sharedMock;

//Injector
var injector;

//Controller
var ctrl;

//Scope
var ctrlScope;

//Data
var storedItems;

module("shopping module", {
    setup: function () {
        
        var appMocks = angular.module("appMocks", []);

        appMocks.config(function ($provide) {
            $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
        });

        injector = angular.injector(['ng', 'shopping', 'appMocks']);
        
        httpBackend = injector.get('$httpBackend');
        httpBackend.expectGET('/api/shoppingCart/').respond(storedItems);

        //Mock for $window service
        windowMock = { location: { href: ""} };

        //Mock for shared service
        sharedMock = injector.get('shared');
        sinon.spy(sharedMock, 'setCartItems');

        //Creating a new scope
        ctrlScope = injector.get('$rootScope').$new();

        //Assigning shoppingData service to _shoppingData
        _shoppingData = injector.get('shoppingData');

        //Creating spies for functions of shoppingData service
        sinon.stub(_shoppingData, "getAllItems", _shoppingData.getAllItems);
        sinon.stub(_shoppingData, "addAnItem", _shoppingData.addAnItem);
        sinon.stub(_shoppingData, "removeItem", _shoppingData.removeItem);

        //Storing shoppingCartStaticData to an object
        storedItems = shoppingCartStaticData;

        //Creating controller with assigning mocks instead of actual services
        ctrl = injector.get('$controller')(ShoppingCartCtrl, { $scope: ctrlScope, $window: windowMock, shoppingData: _shoppingData, shared: sharedMock });
    },
    teardown: function () {
        sharedMock.setCartItems.restore();

        _shoppingData.getAllItems.restore();
        _shoppingData.addAnItem.restore();
        _shoppingData.removeItem.restore();
    }
});

test("Should call getAllItems function on creation of controller", function () {
    ok(_shoppingData.getAllItems.called, "getAllItems is called");
    httpBackend.flush();
    notEqual(storedItems.length, 0, "Number of items loaded is not 0");
});

test("Should call addAnItem function of the shoppingData service", function () {
    httpBackend.expectPOST('/api/shoppingCart/', {}).respond(storedItems.push({ "Id": 5, "Name": "Item5", "Price": 70, "Quantity": 10 }));
    ctrlScope.addItem({});

    ok(_shoppingData.addAnItem.called, "addAnItem function is called");

    httpBackend.flush();

    equal(storedItems.length, 5, "New item is added to the list");
});

test("Should remove item with specified id", function () {
    storedItems = shoppingCartStaticData;

    httpBackend.expectDELETE('/api/shoppingCart/1').respond(storedItems.pop());
    httpBackend.expectGET('/api/shoppingCart/').respond(storedItems);

    ctrlScope.removeItem(1);

    ok(_shoppingData.removeItem.called, "removeItem is called");

    httpBackend.flush();

    equal(storedItems.length, 4, "An item is removed from the list");
});

test("Should assign an error message", function () {
    httpBackend.expectDELETE('/api/shoppingCart/1').respond({ status: 500 });

    ctrlScope.removeItem(1);

    notEqual(ctrlScope.errorMessage,"","An error message is set to the variable in scope");
});

test("Should return a number when a number is passed in", function () {
    var item = { "Number": "123" };
    ctrlScope.sortExpression = "Number";

    var numVal = ctrlScope.mySortFunction(item);

    equal(typeof numVal, "number", "Value returned is a number");
});

test("Should calculate totalPrice", function () {
    ctrlScope.items = storedItems;

    notEqual(ctrlScope.totalPrice(), 0, "Total price is calculated");
});


test("Should set value in shared and value of href set", function () {
    ctrlScope.items = storedItems;
    ctrlScope.purchase();

    ok(sharedMock.setCartItems.called, "setCartItems function is called");
    notEqual(windowMock.location.href,"","URL of the page is modified");
});
