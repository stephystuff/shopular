(function() {
  'use strict';

  var expect = chai.expect;

  describe('storage service', function() {
    var StorageService;

    beforeEach(module('shopular'));

    beforeEach(function clearLocalStorage() {
      window.localStorage.clear();
    });

    beforeEach(inject(function(_StorageService_) {
      StorageService = _StorageService_;
    }));

    it('should be able to get an array of items', function() {
      var result= StorageService.getAll();
      expect(result).to.be.an('array');
      expect(result.length).to.equal(12);
      console.log(result[0]);
      expect(result[0]).to.include.keys('name', 'price', 'quantity', 'color', 'discount');
      expect(result[0].name).to.equal('widget');
      expect(result[5].color).to.equal('beige');
    });

    it('should be able to save a new item when added to the array', function() {
      StorageService.saveNewItem({
        name: 'tennis racquet',
        price: 106,
        quantity: 3,
        color: 'mint',
        discount: 10
      });
      var allItems = StorageService.getAll();
      expect(allItems.length).to.equal(13);
      expect(allItems[0]).to.include.keys('name', 'price', 'quantity', 'color', 'discount');
    });

    // it('should fail if user does not provide all required fields for adding a new item');
    //   var newItem = StorageService.saveNewItem({
    //     name: 'balloon',
    //     price: 3,
    //     quantity: 25,
    //     discount: 0
    //   });
    //   expect(newItem).to.be.undefined;
  });

}());
