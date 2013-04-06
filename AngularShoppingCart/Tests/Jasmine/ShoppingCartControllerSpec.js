var shoppingCartStaticData = [
    { "ID": 1, "Name": "Item1", "Price": 100, "Quantity": 5 },
    { "ID": 2, "Name": "Item2", "Price": 55, "Quantity": 10 },
    { "ID": 3, "Name": "Item3", "Price": 60, "Quantity": 20 },
    {"ID": 4, "Name": "Item4", "Price": 65, "Quantity": 8 }
];

    describe("ShoppingCartCtrl", function () {

        //Mocks
        var windowMock, httpBackend, _shoppingData, sharedMock;

        //Controller
        var ctrl;

        //Scope
        var ctrlScope;

        //Data
        var storedItems;

        //Loading shopping module
        beforeEach(function () {
            module("shopping");
        });

        beforeEach(inject(function ($rootScope, $httpBackend, $controller, shoppingData) {

            //Mock for $window service
            windowMock = { location: { href: ""} };

            //Mock for shared service
            sharedMock = {
                setCartItems: jasmine.createSpy('setCartItems')
            };

            //Creating a new scope
            ctrlScope = $rootScope.$new();

            //Assigning $httpBackend mocked service to httpBackend object
            httpBackend = $httpBackend;

            //Assigning shoppingData service to _shoppingData
            _shoppingData = shoppingData;

            //Storing shoppingCartStaticData to an object
            storedItems = shoppingCartStaticData;

            //Creating spies for functions of shoppingData service
            spyOn(shoppingData, 'getAllItems').andCallThrough();
            spyOn(shoppingData, 'addAnItem').andCallThrough();
            spyOn(shoppingData, 'removeItem').andCallThrough();

            //Setting action to be performed when a get request is fired to /api/shoppingCart/
            httpBackend.expectGET('/api/shoppingCart/').respond(storedItems);

            //Creating controller with assigning mocks instead of actual services
            ctrl = $controller(ShoppingCartCtrl, { $scope: ctrlScope, $window: windowMock, shoppingData: _shoppingData, shared: sharedMock });
        }));

        it("Should call getAllItems function on creation of controller", function () {
            expect(_shoppingData.getAllItems).toHaveBeenCalled();

            httpBackend.flush();

            expect(ctrlScope.items.length).not.toBe(0);
        });

        it("Should call addAnItem function of the shoppingData service", function () {
            httpBackend.expectPOST('/api/shoppingCart/', {}).respond(storedItems.push({ "Id": 5, "Name": "Item5", "Price": 70, "Quantity": 10 }));

            ctrlScope.addItem({});

            expect(_shoppingData.addAnItem).toHaveBeenCalled();

            httpBackend.flush();

            expect(storedItems.length).toBe(5);
        });

        it("Should remove item with specified id", function () {
            storedItems = shoppingCartStaticData;

            httpBackend.expectDELETE('/api/shoppingCart/1').respond(storedItems.pop());
            httpBackend.expectGET('/api/shoppingCart/').respond(storedItems);

            ctrlScope.removeItem(1);

            expect(_shoppingData.removeItem).toHaveBeenCalled();

            httpBackend.flush();

            expect(storedItems.length).toBe(4);
        });

        it("Should assign an error message", function () {
            httpBackend.expectDELETE('/api/shoppingCart/1').respond({ status: 500 });

            ctrlScope.removeItem(1);

            expect(ctrlScope.errorMessage).not.toBe("");
        });

        it("Should return a number when a number is passed in", function () {
            var item = { "Number": "123" };
            ctrlScope.sortExpression = "Number";

            var numVal = ctrlScope.mySortFunction(item);

            expect(typeof numVal).toBe("number");
        });

        it("Should calculate totalPrice", function () {
            ctrlScope.items = storedItems;

            expect(ctrlScope.totalPrice()).not.toBe(0);
        });

        it("Should set value in shared and value of href set", function () {
            ctrlScope.items = storedItems;
            ctrlScope.purchase();

            expect(sharedMock.setCartItems).toHaveBeenCalled();
            expect(windowMock.location.href).not.toBe("");
        });
    });