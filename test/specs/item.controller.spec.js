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
      mockStorageService.saveNewItem = function(argOne) {
        mockStorageService.saveNewItem.numTimesCalled++;
        mockStorageService.saveNewItem.LastArgument = argOne;
      };
      mockStorageService.saveNewItem.numTimesCalled = 0;
      ItemController = $controller('ItemController');
    }));

    it('should have correct scope variables', function(){
      expect(ItemController.newItem).to.be.an('object');
      expect(Object.keys(ItemController.newItem).length).to.equal(0);
      expect(ItemController.allData).to.be.an('array');
      expect(ItemController.allData.length).to.equal(1);
    });

    it('should use the service to add a new item', function(){
      var newItemAdded = {};
      ItemController.newItem.umbrella = 'accessory';

      ItemController.addNewItem(newItemAdded);
      expect(ItemController.newItem.umbrella).to.equal('accessory');
      expect(mockStorageService.saveNewItem.numTimesCalled).to.equal(1);
    });

    it('should calculate the total price of an item with tax and discount included', function(){
      var price = ItemController.getPrice({
        name: 'towel',
        price: 55,
        discount: 10,
        quantity: 30
      });
      var correctPrice = ((55 - 10) * ItemController.tax);
      expect(price).to.be.a('number');
      expect(price).to.equal(correctPrice);
      ItemController.uk = true;
      var newPrice = ItemController.getPrice({
        name: 'towel',
        price: 55,
        discount: 10,
        quantity: 30
      });
      expect(newPrice).to.equal(correctPrice * 1.5);
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
