(function() {
  'use strict';

  angular.module('shopular')
    .factory('StorageService', StorageService);

  function StorageService(){

    return {
      getAll : getAll,
      saveNewItem : saveNewItem,
      updateAll : updateAll
    };

    function getAll(){

    }

    function saveNewItem(){

    }

    function updateAll(){
      
    }
  }


}());
