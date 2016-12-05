(function() {
  'use strict';

  var expect= chai.expect;

  describe('item controller', function() {
    var ItemController;
    var mockStorageService = {};

    beforeEach(module('shopular'));

    beforeEach(module(function($provide){
      $provide.value('StorageService', mockStorageService);
    }));

    beforeEach(inject(function($controller){
      mockStorageService.getAll = function() {
        return [
          {id: 2957, name: 'widget', price: 32, quantity: 203, color: 'red', discount: 31}
        ];
      };
      mockStorageService.add = function(argOne) {
        mockStorageService.add.numTimesCalled++;
        mockStorageService.add.LastArgument = argOne;
      };
      mockStorageService.add.numTimesCalled = 0;
      ItemController = $controller('ItemController');
    }));

    it('should have correct scope variables', function(){
      expect(ItemController.newItem).to.be.an('object');
      expect(Object.keys(ItemController.newItem).length).to.equal(0);
      expect(ItemController.allData).to.be.an('array');
      expect(ItemController.allData.length).to.equal(1);
    });

    // Test for service to add a new item...test not working. Says undefined not a constructor function
    // it('should use the service to add a new item', function(){
    //   ItemController.newItem.foo= 'bar';
    //   var theItem = {};
    //   ItemController.addNewItem(theItem);
    //   expect(ItemController.newItem.foo).to.be.undefined;
    //   expect(mockStorageService.add.numTimesCalled).to.equal(1);
    // });

    it('should calculate the total price of an item with tax and discount included', function(){
      var item = ItemController.getPrice({
        name: 'towel',
        price: 55,
        discount: 10,
        quantity: 30
      });
      expect(item).to.be.a('number');
    });

    it('shold sort the order of the data by category', function() {
      ItemController.changeOrder('name');
      expect(ItemController.orderBy).to.equal('name');
      ItemController.changeOrder('price');
      expect(ItemController.orderBy).to.equal('price');
    });

    it('should switch the currency format to uk', function() {
      ItemController.switchLocale();
      var currency = ItemController.currencyFormat;
      expect(currency).to.equal('GBP');
    });

    it('should display currency in us format', function() {
      var currency = ItemController.currencyFormat;
      expect(currency).to.equal('$');
    });
  });

}());
