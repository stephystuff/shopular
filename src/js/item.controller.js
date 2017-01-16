(function() {
  'use strict';

  angular.module('shopular')
  .controller('ItemController', ItemController);

  ItemController.$inject = [ 'StorageService' ];

  function ItemController (StorageService){
    this.newItem = {};
    this.allData = StorageService.getAll();

    this.tax=1.575;
    this.orderBy = 'name';

    this.uk = false;
    this.currencyFormat = '$';

    this.switchLocale = function switchLocale(){
      this.uk = !this.uk;
      if(this.uk) {
        this.currencyFormat = 'GBP';
      } else {
        this.currencyFormat = '$';
      }
    };

    /**
    * Get price of an intem in correct currency
    * @param  {Object} items Item for sale that you want price of
    * @return {Number}       The price of the item in correct currency
    */
    this.getPrice = function getPrice(items){
      var startingPrice = ((items.price - items.discount) * this.tax);
      // console.log('price getter', this.uk, startingPrice);
      if(this.uk === true) {
        startingPrice *= 1.5;
      }
      return startingPrice;
    };

    this.changeOrder = function changeOrder(foobar){
      console.log('hello');
      this.orderBy = foobar;
    };

    this.addNewItem = function addNewItem(item){
      StorageService.saveNewItem(item);
    };

  }

}());
