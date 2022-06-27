"use strict";

var wrapper = function() {

  var VF = null;

  return {
      
    init : function () {
      VF = Vex.Flow;    
    }

  }

}();


export var init = wrapper.init;