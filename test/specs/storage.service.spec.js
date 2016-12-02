(function() {
  'use strict';

  var expect = chai.expect;

  describe('storage service', function() {
    var StorageService;

    beforeEach(module('shopular'));

    beforeEach(inject(function(_StorageService_) {
      StorageService = _StorageService_;
    }));

    it('should be able to get an array of items', function() {
      var result= StorageService.getAll();
      expect(result).to.be.an('array');
      expect(result.length).to.equal(12);
      console.log(result[0]);
      expect(result[0].name).to.equal('widget');
      expect(result[5].color).to.equal('beige');

    });

    // it('should be able to save a new item when added to the array', function() {
    //   var result = StorageService.saveNewItem();
    // });





  });

}());
