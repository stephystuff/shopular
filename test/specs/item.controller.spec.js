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
        return [id
        ];
      };
    }));
  });

}());
