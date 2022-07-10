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
          // console.log("drawStaveConnector staves", staves.length);
          var context = renderer.getContext();
          new VF.StaveConnector(staves[0], staves[(staves.length - 1)]).setType('brace').setContext(context).draw();
        }
      }
    },
    
    renderBarContents : function (renderer) {
      return function (stave) {
        return function (beamSpecs) {
          return function (vexCurves) {
            return function (musicSpec) {
              return function () {
                return wrapper.drawBarContents(renderer, stave, beamSpecs, vexCurves, musicSpec);
              }
            }
          }
        }
      }
    },

    addBarVoice : function (stave) {
      return function (musicSpec) {
        return function () {
          return wrapper.makeBarVoice(stave, musicSpec);
        }
      }
    },

    addBarStructure : function (renderer) {
      return function (voice) {
        return function (beamSpecs) {
          return function (vexCurves) {
            return function (musicSpec) {
              return function () {
                return wrapper.makeBarStructure(renderer, voice, beamSpecs, vexCurves, musicSpec);
              }
            }
          }
        }
      }
    },

    renderVoices : function (renderer) {
      return function (staves) {
        return function (voices) {
          return function () {
            return wrapper.formatAndDrawVoices(renderer, staves, voices);
          }
        }
      }
    },



    /* draw the contents of the bar, using auto-beaming for the notes */
    drawBarContents: function (renderer, stave, beamSpecs, vexCurves, musicSpec) {
      // console.log("drawBarContents")
      // console.log(musicSpec);
      var context = renderer.getContext();
      var notes = musicSpec.noteSpecs.map(wrapper.makeStaveNote);
      var tuplets = musicSpec.tuplets.map(wrapper.makeTupletLayout (notes));
      var ties = musicSpec.ties.map(wrapper.makeTie (notes));
      // console.log("beamSpecs");
      // console.log(beamSpecs);
      var beams = beamSpecs.map(wrapper.makeBeam (notes));
      var curves = vexCurves.map(wrapper.makeCurve (notes));

      /* add repetitions to the stave (coda, segno etc.) */
      wrapper.addRepetitions (stave, musicSpec.repetitions);

      /* draw the notes.  Try to emulate thw original VexFlow 1.89 formatter */
      wrapper.formatAndDrawNotes (context, stave, notes);

      /* Vex.Flow.Formatter.FormatAndDraw(context, stave, notes); */
      ties.forEach(function(t) {t.setContext(context).draw()})
      beams.forEach(function(b) {b.setContext(context).draw()});
      tuplets.forEach(function(tuplet){
        tuplet.setContext(context).draw();
      });
      curves.forEach(function(c) {c.setContext(context).draw()});
    },


    /* add the notes and make a voice */
    makeBarVoice: function (stave, musicSpec) {
      console.log("makeBarVoice")
      var notes = musicSpec.noteSpecs.map(wrapper.makeStaveNote);

      /* add repetitions to the stave (coda, segno etc.) */
      wrapper.addRepetitions (stave, musicSpec.repetitions);
      /* make a voice */
      const voice = new VF.Voice().setMode(VF.Voice.Mode.SOFT);

      voice.addTickables(notes);
      return voice;
    },


    makeBarStructure: function (renderer, voice, beamSpecs, vexCurves, musicSpec) {
      // console.log("drawBarContents")
      // console.log(musicSpec);
      var context = renderer.getContext();
      var notes = voice.getTickables();
      var tuplets = musicSpec.tuplets.map(wrapper.makeTupletLayout (notes));
      var ties = musicSpec.ties.map(wrapper.makeTie (notes));
      // console.log("beamSpecs");
      // console.log(beamSpecs);
      var beams = beamSpecs.map(wrapper.makeBeam (notes));
      var curves = vexCurves.map(wrapper.makeCurve (notes));

      /* Vex.Flow.Formatter.FormatAndDraw(context, stave, notes); */
      ties.forEach(function(t) {t.setContext(context).draw()})
      beams.forEach(function(b) {b.setContext(context).draw()});
      tuplets.forEach(function(tuplet){
        tuplet.setContext(context).draw();
      });
      curves.forEach(function(c) {c.setContext(context).draw()});
    },

    /*  This formatting appears to be sufficient for our needs.  It attempts to emulate
        the formatting we used successfully with VexFlow 1.2.89.  This went horribly wrong
        for our purposes with VexFlow 3.  The magic softmaxFactor seems to put things right.
    */
    formatAndDrawNotes: function (context, stave, notes) {
      // Create a voice and add the notes.  SOFT mode is not strict about filling the bar 
      // with enough notes to satisfy the time signature which would be disastrous.
      // Users can get it wrong, we'd need to special-case start and end bars etc.
      const voice = new VF.Voice().setMode(VF.Voice.Mode.SOFT);

      voice.addTickables(notes);
      
      // Format and justify the notes
      new VF.Formatter({ softmaxFactor: 5 }).joinVoices([voice]).format([voice]).formatToStave([voice], stave);
  
      
      // Render voice
      voice.draw(context, stave);
    },

    formatAndDrawVoices: function (renderer, staves, voices) {      
      var context = renderer.getContext();

      // Format and justify the notes
      // new VF.Formatter({ softmaxFactor: 5 }).joinVoices(voices).format(voices).formatToStave(voices, stave);
      // new VF.Formatter({ softmaxFactor: 5 }).joinVoices(voices).format(voices);
      new VF.Formatter().joinVoices(voices).format(voices);
      
      for (let i = 0; i < staves.length; ++i) {
        voices[i].draw(context, staves[i]);
        }      
    },


    // make a stave note (n.b. this can represent a single note or a chord)
    makeStaveNote: function (noteSpec) {
      // console.log("makeStaveNote")
      // console.log(noteSpec);
      var sn = new VF.StaveNote(noteSpec.vexNote);
      wrapper.addAccidentals (sn, noteSpec.accidentals);
      wrapper.addDots (sn, noteSpec.dotCount);
      wrapper.addOrnaments (sn, noteSpec.ornaments);
      wrapper.addArticulations (sn, noteSpec.articulations);
      wrapper.addChordSymbol (sn, noteSpec.chordSymbol);

      if (noteSpec.graceKeys.length > 0) {
        var graceNotes = noteSpec.graceKeys.map(wrapper.makeGraceNote);
        wrapper.addGraceAccidentals (graceNotes, noteSpec.graceAccidentals);
        var graceNoteGroup =  new VF.GraceNoteGroup(graceNotes, true);
        sn.addModifier(graceNoteGroup.beamNotes(), 0);
      }
      return sn;
    },

    makeGraceNote: function (graceKey) {
      var note = { keys: [graceKey], duration: '8' };
      return new Vex.Flow.GraceNote (note);
    },

    // make a tuplet layout
    makeTupletLayout: function (notes) {
      return function (vexTuplet) {
        return new Vex.Flow.Tuplet(notes.slice(vexTuplet.startPos, vexTuplet.endPos), {
           num_notes: vexTuplet.p, notes_occupied: vexTuplet.q, location: VF.Tuplet.LOCATION_BOTTOM,
         });
      };
    },

    // make a beam between the specified notes
    makeBeam: function (notes) {
      return function (beamSpec) {
        return new Vex.Flow.Beam(notes.slice(beamSpec[0], beamSpec[1]), true);
      };
    },


    // tie a note to its successor
    makeTie: function (notes) {
      return function (noteIndex) {
        return new VF.StaveTie({
          first_note: notes[noteIndex],
          last_note: notes[noteIndex + 1],
          first_indices: [0],
          last_indices: [0]
        });
      };
    },

    // make a slur represented by a curve
    makeCurve: function (notes) {
      return function (vexCurve) {
        // the slope of the curve is just a simple heuristic
        var controlPoints = [{ x: 0, y: 5 }, { x: 0, y: 5 }]
        if (vexCurve.to - vexCurve.from > 1 ) {
          controlPoints = [{ x: 0, y: 10 }, { x: 0, y: 10 }]
        }
        return new VF.Curve(
          notes[vexCurve.from],
          notes[vexCurve.to],
          { thickness: 2,
            cps: controlPoints
        });
      };
    },

    // add the accidental(s) to the staveNote
    addAccidentals: function (staveNote, accidentals) {
      accidentals.forEach (function (accidentalString, index) {
        if (accidentalString) {
          staveNote.addModifier(new VF.Accidental(accidentalString), index);
        }
      });
    },

    // add any accidentals to the grace notes
    addGraceAccidentals: function (graceNotes, accidentals) {
      accidentals.forEach (function (accidentalString, index) {
        if (accidentalString) {
          /* console.log("grace accidental ", accidentalString, " at ", index); */
          graceNotes[index].addModifier(new VF.Accidental(accidentalString), 0);
        }
      });
    },

    // add the dottedness to the staveNote
    addDots: function (staveNote, dotCount) {
      if (dotCount == 2) {
        VF.Dot.buildAndAttach([staveNote], { all: true });
        VF.Dot.buildAndAttach([staveNote], { all: true });
      }
      else if (dotCount == 1) {
        VF.Dot.buildAndAttach([staveNote], { all: true });
      }
    },

    // add the ornament(s) to the staveNote
    addOrnaments: function (staveNote, ornaments) {
      ornaments.forEach (function (ornament, index) {
        staveNote.addModifier(new VF.Ornament(ornament), 0);
      });
    },

    // add a chord symbol above the note where it is to take effect 
    addChordSymbol: function (staveNote, chordSymbol) {
      var chord = new VF.ChordSymbol().addGlyphOrText(chordSymbol);
      staveNote.addModifier(chord, 0);
    },

    // add the articulation(s) to the staveNote
    addArticulations: function (staveNote, articulations) {
      articulations.forEach (function (articulation, index) {
        // position 3 above stave, position 4 below it
        staveNote.addModifier(new VF.Articulation(articulation).setPosition(4), 0);
      });
    },

    // add the repetitions to the stave
    addRepetitions: function (stave, repetitions) {
      repetitions.forEach (function (repetition, index) {
        // console.log ("repetition:", repetition);
        stave.setRepetitionType(repetition, 25);
      });
    }


  }

}();


export var init = wrapper.init;
export var drawStaveConnector = wrapper.drawStaveConnector;
export var renderBarContents = wrapper.renderBarContents;
export var addBarVoice = wrapper.addBarVoice;
export var addBarStructure = wrapper.addBarStructure;
export var renderVoices = wrapper.renderVoices;