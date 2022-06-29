"use strict";

var wrapper = function() {

  var VF = null;

  return {
      
    init : function () {
      console.log("init");
      VF = Vex.Flow;    
    },

    drawStaveConnector : function (renderer) {
      return function (staves) {
        return function () {
          console.log("drawStaveConnector staves", staves.length);
          var context = renderer.getContext();
          new VF.StaveConnector(staves[0], staves[(staves.length - 1)]).setType('brace').setContext(context).draw();
        }
      }
    }


  }

}();


export var init = wrapper.init;
export var drawStaveConnector = wrapper.drawStaveConnector;