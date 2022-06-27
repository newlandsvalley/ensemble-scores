(() => {
  // output/Abc.EnsembleScore.Renderer/foreign.js
  var wrapper = function() {
    var VF = null;
    return {
      init: function() {
        VF = Vex.Flow;
      }
    };
  }();
  var init = wrapper.init;

  // output/Control.Apply/foreign.js
  var arrayApply = function(fs) {
    return function(xs) {
      var l = fs.length;
      var k = xs.length;
      var result = new Array(l * k);
      var n = 0;
      for (var i = 0; i < l; i++) {
        var f = fs[i];
        for (var j = 0; j < k; j++) {
          result[n++] = f(xs[j]);
        }
      }
      return result;
    };
  };

  // output/Control.Semigroupoid/index.js
  var semigroupoidFn = {
    compose: function(f) {
      return function(g) {
        return function(x) {
          return f(g(x));
        };
      };
    }
  };
  var compose = function(dict) {
    return dict.compose;
  };
  var composeFlipped = function(dictSemigroupoid) {
    return function(f) {
      return function(g) {
        return compose(dictSemigroupoid)(g)(f);
      };
    };
  };

  // output/Control.Category/index.js
  var identity = function(dict) {
    return dict.identity;
  };
  var categoryFn = {
    identity: function(x) {
      return x;
    },
    Semigroupoid0: function() {
      return semigroupoidFn;
    }
  };

  // output/Data.Boolean/index.js
  var otherwise = true;

  // output/Data.Function/index.js
  var flip = function(f) {
    return function(b) {
      return function(a) {
        return f(a)(b);
      };
    };
  };
  var $$const = function(a) {
    return function(v) {
      return a;
    };
  };

  // output/Data.Functor/foreign.js
  var arrayMap = function(f) {
    return function(arr) {
      var l = arr.length;
      var result = new Array(l);
      for (var i = 0; i < l; i++) {
        result[i] = f(arr[i]);
      }
      return result;
    };
  };

  // output/Data.Unit/foreign.js
  var unit = void 0;

  // output/Type.Proxy/index.js
  var $$Proxy = /* @__PURE__ */ function() {
    function $$Proxy2() {
    }
    ;
    $$Proxy2.value = new $$Proxy2();
    return $$Proxy2;
  }();

  // output/Data.Functor/index.js
  var map = function(dict) {
    return dict.map;
  };
  var mapFlipped = function(dictFunctor) {
    return function(fa) {
      return function(f) {
        return map(dictFunctor)(f)(fa);
      };
    };
  };
  var $$void = function(dictFunctor) {
    return map(dictFunctor)($$const(unit));
  };
  var voidRight = function(dictFunctor) {
    return function(x) {
      return map(dictFunctor)($$const(x));
    };
  };
  var functorFn = {
    map: /* @__PURE__ */ compose(semigroupoidFn)
  };
  var functorArray = {
    map: arrayMap
  };

  // output/Control.Apply/index.js
  var applyArray = {
    apply: arrayApply,
    Functor0: function() {
      return functorArray;
    }
  };
  var apply = function(dict) {
    return dict.apply;
  };
  var applyFirst = function(dictApply) {
    return function(a) {
      return function(b) {
        return apply(dictApply)(map(dictApply.Functor0())($$const)(a))(b);
      };
    };
  };
  var applySecond = function(dictApply) {
    return function(a) {
      return function(b) {
        return apply(dictApply)(map(dictApply.Functor0())($$const(identity(categoryFn)))(a))(b);
      };
    };
  };
  var lift2 = function(dictApply) {
    return function(f) {
      return function(a) {
        return function(b) {
          return apply(dictApply)(map(dictApply.Functor0())(f)(a))(b);
        };
      };
    };
  };

  // output/Control.Applicative/index.js
  var pure = function(dict) {
    return dict.pure;
  };
  var liftA1 = function(dictApplicative) {
    return function(f) {
      return function(a) {
        return apply(dictApplicative.Apply0())(pure(dictApplicative)(f))(a);
      };
    };
  };

  // output/Control.Bind/foreign.js
  var arrayBind = function(arr) {
    return function(f) {
      var result = [];
      for (var i = 0, l = arr.length; i < l; i++) {
        Array.prototype.push.apply(result, f(arr[i]));
      }
      return result;
    };
  };

  // output/Control.Bind/index.js
  var bindArray = {
    bind: arrayBind,
    Apply0: function() {
      return applyArray;
    }
  };
  var bind = function(dict) {
    return dict.bind;
  };
  var join = function(dictBind) {
    return function(m) {
      return bind(dictBind)(m)(identity(categoryFn));
    };
  };

  // output/Data.Semigroup/foreign.js
  var concatString = function(s1) {
    return function(s2) {
      return s1 + s2;
    };
  };
  var concatArray = function(xs) {
    return function(ys) {
      if (xs.length === 0)
        return ys;
      if (ys.length === 0)
        return xs;
      return xs.concat(ys);
    };
  };

  // output/Data.Symbol/index.js
  var reflectSymbol = function(dict) {
    return dict.reflectSymbol;
  };

  // output/Record.Unsafe/foreign.js
  var unsafeGet = function(label) {
    return function(rec) {
      return rec[label];
    };
  };
  var unsafeSet = function(label) {
    return function(value) {
      return function(rec) {
        var copy = {};
        for (var key2 in rec) {
          if ({}.hasOwnProperty.call(rec, key2)) {
            copy[key2] = rec[key2];
          }
        }
        copy[label] = value;
        return copy;
      };
    };
  };

  // output/Data.Semigroup/index.js
  var semigroupString = {
    append: concatString
  };
  var semigroupRecordNil = {
    appendRecord: function(v) {
      return function(v1) {
        return function(v2) {
          return {};
        };
      };
    }
  };
  var semigroupArray = {
    append: concatArray
  };
  var appendRecord = function(dict) {
    return dict.appendRecord;
  };
  var semigroupRecord = function() {
    return function(dictSemigroupRecord) {
      return {
        append: appendRecord(dictSemigroupRecord)($$Proxy.value)
      };
    };
  };
  var append = function(dict) {
    return dict.append;
  };
  var semigroupFn = function(dictSemigroup) {
    return {
      append: function(f) {
        return function(g) {
          return function(x) {
            return append(dictSemigroup)(f(x))(g(x));
          };
        };
      }
    };
  };
  var semigroupRecordCons = function(dictIsSymbol) {
    return function() {
      return function(dictSemigroupRecord) {
        return function(dictSemigroup) {
          return {
            appendRecord: function(v) {
              return function(ra) {
                return function(rb) {
                  var tail2 = appendRecord(dictSemigroupRecord)($$Proxy.value)(ra)(rb);
                  var key2 = reflectSymbol(dictIsSymbol)($$Proxy.value);
                  var insert5 = unsafeSet(key2);
                  var get3 = unsafeGet(key2);
                  return insert5(append(dictSemigroup)(get3(ra))(get3(rb)))(tail2);
                };
              };
            }
          };
        };
      };
    };
  };

  // output/Control.Alt/index.js
  var alt = function(dict) {
    return dict.alt;
  };

  // output/Data.Bounded/foreign.js
  var topInt = 2147483647;
  var bottomInt = -2147483648;
  var topChar = String.fromCharCode(65535);
  var bottomChar = String.fromCharCode(0);
  var topNumber = Number.POSITIVE_INFINITY;
  var bottomNumber = Number.NEGATIVE_INFINITY;

  // output/Data.Ord/foreign.js
  var unsafeCompareImpl = function(lt) {
    return function(eq2) {
      return function(gt) {
        return function(x) {
          return function(y) {
            return x < y ? lt : x === y ? eq2 : gt;
          };
        };
      };
    };
  };
  var ordIntImpl = unsafeCompareImpl;
  var ordStringImpl = unsafeCompareImpl;
  var ordCharImpl = unsafeCompareImpl;

  // output/Data.Eq/foreign.js
  var refEq = function(r1) {
    return function(r2) {
      return r1 === r2;
    };
  };
  var eqBooleanImpl = refEq;
  var eqIntImpl = refEq;
  var eqCharImpl = refEq;
  var eqStringImpl = refEq;

  // output/Data.Eq/index.js
  var eqString = {
    eq: eqStringImpl
  };
  var eqRowNil = {
    eqRecord: function(v) {
      return function(v1) {
        return function(v2) {
          return true;
        };
      };
    }
  };
  var eqRecord = function(dict) {
    return dict.eqRecord;
  };
  var eqRec = function() {
    return function(dictEqRecord) {
      return {
        eq: eqRecord(dictEqRecord)($$Proxy.value)
      };
    };
  };
  var eqInt = {
    eq: eqIntImpl
  };
  var eqChar = {
    eq: eqCharImpl
  };
  var eqBoolean = {
    eq: eqBooleanImpl
  };
  var eq = function(dict) {
    return dict.eq;
  };
  var eqRowCons = function(dictEqRecord) {
    return function() {
      return function(dictIsSymbol) {
        return function(dictEq) {
          return {
            eqRecord: function(v) {
              return function(ra) {
                return function(rb) {
                  var tail2 = eqRecord(dictEqRecord)($$Proxy.value)(ra)(rb);
                  var key2 = reflectSymbol(dictIsSymbol)($$Proxy.value);
                  var get3 = unsafeGet(key2);
                  return eq(dictEq)(get3(ra))(get3(rb)) && tail2;
                };
              };
            }
          };
        };
      };
    };
  };
  var notEq = function(dictEq) {
    return function(x) {
      return function(y) {
        return eq(eqBoolean)(eq(dictEq)(x)(y))(false);
      };
    };
  };

  // output/Data.Ordering/index.js
  var LT = /* @__PURE__ */ function() {
    function LT2() {
    }
    ;
    LT2.value = new LT2();
    return LT2;
  }();
  var GT = /* @__PURE__ */ function() {
    function GT2() {
    }
    ;
    GT2.value = new GT2();
    return GT2;
  }();
  var EQ = /* @__PURE__ */ function() {
    function EQ2() {
    }
    ;
    EQ2.value = new EQ2();
    return EQ2;
  }();
  var eqOrdering = {
    eq: function(v) {
      return function(v1) {
        if (v instanceof LT && v1 instanceof LT) {
          return true;
        }
        ;
        if (v instanceof GT && v1 instanceof GT) {
          return true;
        }
        ;
        if (v instanceof EQ && v1 instanceof EQ) {
          return true;
        }
        ;
        return false;
      };
    }
  };

  // output/Data.Ring/foreign.js
  var intSub = function(x) {
    return function(y) {
      return x - y | 0;
    };
  };

  // output/Data.Semiring/foreign.js
  var intAdd = function(x) {
    return function(y) {
      return x + y | 0;
    };
  };
  var intMul = function(x) {
    return function(y) {
      return x * y | 0;
    };
  };

  // output/Data.Semiring/index.js
  var zero = function(dict) {
    return dict.zero;
  };
  var semiringInt = {
    add: intAdd,
    zero: 0,
    mul: intMul,
    one: 1
  };
  var one = function(dict) {
    return dict.one;
  };
  var mul = function(dict) {
    return dict.mul;
  };
  var add = function(dict) {
    return dict.add;
  };

  // output/Data.Ring/index.js
  var sub = function(dict) {
    return dict.sub;
  };
  var ringInt = {
    sub: intSub,
    Semiring0: function() {
      return semiringInt;
    }
  };
  var negate = function(dictRing) {
    return function(a) {
      return sub(dictRing)(zero(dictRing.Semiring0()))(a);
    };
  };

  // output/Data.Ord/index.js
  var ordString = /* @__PURE__ */ function() {
    return {
      compare: ordStringImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqString;
      }
    };
  }();
  var ordInt = /* @__PURE__ */ function() {
    return {
      compare: ordIntImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqInt;
      }
    };
  }();
  var ordChar = /* @__PURE__ */ function() {
    return {
      compare: ordCharImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqChar;
      }
    };
  }();
  var compare = function(dict) {
    return dict.compare;
  };
  var greaterThan = function(dictOrd) {
    return function(a1) {
      return function(a2) {
        var v = compare(dictOrd)(a1)(a2);
        if (v instanceof GT) {
          return true;
        }
        ;
        return false;
      };
    };
  };
  var greaterThanOrEq = function(dictOrd) {
    return function(a1) {
      return function(a2) {
        var v = compare(dictOrd)(a1)(a2);
        if (v instanceof LT) {
          return false;
        }
        ;
        return true;
      };
    };
  };
  var lessThan = function(dictOrd) {
    return function(a1) {
      return function(a2) {
        var v = compare(dictOrd)(a1)(a2);
        if (v instanceof LT) {
          return true;
        }
        ;
        return false;
      };
    };
  };
  var signum = function(dictOrd) {
    return function(dictRing) {
      return function(x) {
        var $47 = lessThan(dictOrd)(x)(zero(dictRing.Semiring0()));
        if ($47) {
          return negate(dictRing)(one(dictRing.Semiring0()));
        }
        ;
        var $48 = greaterThan(dictOrd)(x)(zero(dictRing.Semiring0()));
        if ($48) {
          return one(dictRing.Semiring0());
        }
        ;
        return x;
      };
    };
  };
  var max = function(dictOrd) {
    return function(x) {
      return function(y) {
        var v = compare(dictOrd)(x)(y);
        if (v instanceof LT) {
          return y;
        }
        ;
        if (v instanceof EQ) {
          return x;
        }
        ;
        if (v instanceof GT) {
          return x;
        }
        ;
        throw new Error("Failed pattern match at Data.Ord (line 181, column 3 - line 184, column 12): " + [v.constructor.name]);
      };
    };
  };
  var abs = function(dictOrd) {
    return function(dictRing) {
      return function(x) {
        var $57 = greaterThanOrEq(dictOrd)(x)(zero(dictRing.Semiring0()));
        if ($57) {
          return x;
        }
        ;
        return negate(dictRing)(x);
      };
    };
  };

  // output/Data.Bounded/index.js
  var top = function(dict) {
    return dict.top;
  };
  var boundedInt = {
    top: topInt,
    bottom: bottomInt,
    Ord0: function() {
      return ordInt;
    }
  };
  var boundedChar = {
    top: topChar,
    bottom: bottomChar,
    Ord0: function() {
      return ordChar;
    }
  };
  var bottom = function(dict) {
    return dict.bottom;
  };

  // output/Data.Show/foreign.js
  var showIntImpl = function(n) {
    return n.toString();
  };
  var showCharImpl = function(c) {
    var code = c.charCodeAt(0);
    if (code < 32 || code === 127) {
      switch (c) {
        case "\x07":
          return "'\\a'";
        case "\b":
          return "'\\b'";
        case "\f":
          return "'\\f'";
        case "\n":
          return "'\\n'";
        case "\r":
          return "'\\r'";
        case "	":
          return "'\\t'";
        case "\v":
          return "'\\v'";
      }
      return "'\\" + code.toString(10) + "'";
    }
    return c === "'" || c === "\\" ? "'\\" + c + "'" : "'" + c + "'";
  };

  // output/Data.Show/index.js
  var showInt = {
    show: showIntImpl
  };
  var showChar = {
    show: showCharImpl
  };
  var show = function(dict) {
    return dict.show;
  };

  // output/Data.Maybe/index.js
  var Nothing = /* @__PURE__ */ function() {
    function Nothing2() {
    }
    ;
    Nothing2.value = new Nothing2();
    return Nothing2;
  }();
  var Just = /* @__PURE__ */ function() {
    function Just2(value0) {
      this.value0 = value0;
    }
    ;
    Just2.create = function(value0) {
      return new Just2(value0);
    };
    return Just2;
  }();
  var maybe$prime = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2 instanceof Nothing) {
          return v(unit);
        }
        ;
        if (v2 instanceof Just) {
          return v1(v2.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 250, column 1 - line 250, column 62): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  };
  var maybe = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2 instanceof Nothing) {
          return v;
        }
        ;
        if (v2 instanceof Just) {
          return v1(v2.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 237, column 1 - line 237, column 51): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  };
  var isNothing = /* @__PURE__ */ maybe(true)(/* @__PURE__ */ $$const(false));
  var isJust = /* @__PURE__ */ maybe(false)(/* @__PURE__ */ $$const(true));
  var functorMaybe = {
    map: function(v) {
      return function(v1) {
        if (v1 instanceof Just) {
          return new Just(v(v1.value0));
        }
        ;
        return Nothing.value;
      };
    }
  };
  var fromMaybe = function(a) {
    return maybe(a)(identity(categoryFn));
  };
  var fromJust = function() {
    return function(v) {
      if (v instanceof Just) {
        return v.value0;
      }
      ;
      throw new Error("Failed pattern match at Data.Maybe (line 288, column 1 - line 288, column 46): " + [v.constructor.name]);
    };
  };
  var applyMaybe = {
    apply: function(v) {
      return function(v1) {
        if (v instanceof Just) {
          return map(functorMaybe)(v.value0)(v1);
        }
        ;
        if (v instanceof Nothing) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 67, column 1 - line 69, column 30): " + [v.constructor.name, v1.constructor.name]);
      };
    },
    Functor0: function() {
      return functorMaybe;
    }
  };
  var bindMaybe = {
    bind: function(v) {
      return function(v1) {
        if (v instanceof Just) {
          return v1(v.value0);
        }
        ;
        if (v instanceof Nothing) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 125, column 1 - line 127, column 28): " + [v.constructor.name, v1.constructor.name]);
      };
    },
    Apply0: function() {
      return applyMaybe;
    }
  };

  // output/Data.Either/index.js
  var Left = /* @__PURE__ */ function() {
    function Left2(value0) {
      this.value0 = value0;
    }
    ;
    Left2.create = function(value0) {
      return new Left2(value0);
    };
    return Left2;
  }();
  var Right = /* @__PURE__ */ function() {
    function Right2(value0) {
      this.value0 = value0;
    }
    ;
    Right2.create = function(value0) {
      return new Right2(value0);
    };
    return Right2;
  }();
  var functorEither = {
    map: function(f) {
      return function(m) {
        if (m instanceof Left) {
          return new Left(m.value0);
        }
        ;
        if (m instanceof Right) {
          return new Right(f(m.value0));
        }
        ;
        throw new Error("Failed pattern match at Data.Either (line 31, column 1 - line 31, column 52): " + [m.constructor.name]);
      };
    }
  };
  var either = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2 instanceof Left) {
          return v(v2.value0);
        }
        ;
        if (v2 instanceof Right) {
          return v1(v2.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Either (line 208, column 1 - line 208, column 64): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  };
  var hush = /* @__PURE__ */ function() {
    return either($$const(Nothing.value))(Just.create);
  }();
  var applyEither = {
    apply: function(v) {
      return function(v1) {
        if (v instanceof Left) {
          return new Left(v.value0);
        }
        ;
        if (v instanceof Right) {
          return map(functorEither)(v.value0)(v1);
        }
        ;
        throw new Error("Failed pattern match at Data.Either (line 70, column 1 - line 72, column 30): " + [v.constructor.name, v1.constructor.name]);
      };
    },
    Functor0: function() {
      return functorEither;
    }
  };
  var bindEither = {
    bind: /* @__PURE__ */ either(function(e) {
      return function(v) {
        return new Left(e);
      };
    })(function(a) {
      return function(f) {
        return f(a);
      };
    }),
    Apply0: function() {
      return applyEither;
    }
  };
  var applicativeEither = /* @__PURE__ */ function() {
    return {
      pure: Right.create,
      Apply0: function() {
        return applyEither;
      }
    };
  }();
  var monadEither = {
    Applicative0: function() {
      return applicativeEither;
    },
    Bind1: function() {
      return bindEither;
    }
  };

  // output/Effect/foreign.js
  var pureE = function(a) {
    return function() {
      return a;
    };
  };
  var bindE = function(a) {
    return function(f) {
      return function() {
        return f(a())();
      };
    };
  };

  // output/Control.Monad/index.js
  var ap = function(dictMonad) {
    return function(f) {
      return function(a) {
        return bind(dictMonad.Bind1())(f)(function(f$prime) {
          return bind(dictMonad.Bind1())(a)(function(a$prime) {
            return pure(dictMonad.Applicative0())(f$prime(a$prime));
          });
        });
      };
    };
  };

  // output/Data.EuclideanRing/foreign.js
  var intDegree = function(x) {
    return Math.min(Math.abs(x), 2147483647);
  };
  var intDiv = function(x) {
    return function(y) {
      if (y === 0)
        return 0;
      return y > 0 ? Math.floor(x / y) : -Math.floor(x / -y);
    };
  };
  var intMod = function(x) {
    return function(y) {
      if (y === 0)
        return 0;
      var yy = Math.abs(y);
      return (x % yy + yy) % yy;
    };
  };

  // output/Data.CommutativeRing/index.js
  var commutativeRingInt = {
    Ring0: function() {
      return ringInt;
    }
  };

  // output/Data.EuclideanRing/index.js
  var mod = function(dict) {
    return dict.mod;
  };
  var gcd = function($copy_dictEq) {
    return function($copy_dictEuclideanRing) {
      return function($copy_a) {
        return function($copy_b) {
          var $tco_var_dictEq = $copy_dictEq;
          var $tco_var_dictEuclideanRing = $copy_dictEuclideanRing;
          var $tco_var_a = $copy_a;
          var $tco_done = false;
          var $tco_result;
          function $tco_loop(dictEq, dictEuclideanRing, a, b) {
            var $8 = eq(dictEq)(b)(zero(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0()));
            if ($8) {
              $tco_done = true;
              return a;
            }
            ;
            $tco_var_dictEq = dictEq;
            $tco_var_dictEuclideanRing = dictEuclideanRing;
            $tco_var_a = b;
            $copy_b = mod(dictEuclideanRing)(a)(b);
            return;
          }
          ;
          while (!$tco_done) {
            $tco_result = $tco_loop($tco_var_dictEq, $tco_var_dictEuclideanRing, $tco_var_a, $copy_b);
          }
          ;
          return $tco_result;
        };
      };
    };
  };
  var euclideanRingInt = {
    degree: intDegree,
    div: intDiv,
    mod: intMod,
    CommutativeRing0: function() {
      return commutativeRingInt;
    }
  };
  var div = function(dict) {
    return dict.div;
  };

  // output/Data.Monoid/index.js
  var monoidString = {
    mempty: "",
    Semigroup0: function() {
      return semigroupString;
    }
  };
  var monoidArray = {
    mempty: [],
    Semigroup0: function() {
      return semigroupArray;
    }
  };
  var mempty = function(dict) {
    return dict.mempty;
  };
  var monoidFn = function(dictMonoid) {
    return {
      mempty: function(v) {
        return mempty(dictMonoid);
      },
      Semigroup0: function() {
        return semigroupFn(dictMonoid.Semigroup0());
      }
    };
  };

  // output/Effect/index.js
  var $runtime_lazy = function(name2, moduleName, init4) {
    var state2 = 0;
    var val;
    return function(lineNumber) {
      if (state2 === 2)
        return val;
      if (state2 === 1)
        throw new ReferenceError(name2 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state2 = 1;
      val = init4();
      state2 = 2;
      return val;
    };
  };
  var monadEffect = {
    Applicative0: function() {
      return applicativeEffect;
    },
    Bind1: function() {
      return bindEffect;
    }
  };
  var bindEffect = {
    bind: bindE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var applicativeEffect = {
    pure: pureE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var $lazy_functorEffect = /* @__PURE__ */ $runtime_lazy("functorEffect", "Effect", function() {
    return {
      map: liftA1(applicativeEffect)
    };
  });
  var $lazy_applyEffect = /* @__PURE__ */ $runtime_lazy("applyEffect", "Effect", function() {
    return {
      apply: ap(monadEffect),
      Functor0: function() {
        return $lazy_functorEffect(0);
      }
    };
  });

  // output/Control.Monad.Error.Class/index.js
  var throwError = function(dict) {
    return dict.throwError;
  };

  // output/Data.Identity/index.js
  var Identity = function(x) {
    return x;
  };
  var functorIdentity = {
    map: function(f) {
      return function(m) {
        return f(m);
      };
    }
  };
  var applyIdentity = {
    apply: function(v) {
      return function(v1) {
        return v(v1);
      };
    },
    Functor0: function() {
      return functorIdentity;
    }
  };
  var bindIdentity = {
    bind: function(v) {
      return function(f) {
        return f(v);
      };
    },
    Apply0: function() {
      return applyIdentity;
    }
  };
  var applicativeIdentity = {
    pure: Identity,
    Apply0: function() {
      return applyIdentity;
    }
  };
  var monadIdentity = {
    Applicative0: function() {
      return applicativeIdentity;
    },
    Bind1: function() {
      return bindIdentity;
    }
  };

  // output/Control.Monad.Rec.Class/index.js
  var Loop = /* @__PURE__ */ function() {
    function Loop2(value0) {
      this.value0 = value0;
    }
    ;
    Loop2.create = function(value0) {
      return new Loop2(value0);
    };
    return Loop2;
  }();
  var Done = /* @__PURE__ */ function() {
    function Done2(value0) {
      this.value0 = value0;
    }
    ;
    Done2.create = function(value0) {
      return new Done2(value0);
    };
    return Done2;
  }();
  var tailRecM = function(dict) {
    return dict.tailRecM;
  };
  var tailRec = function(f) {
    var go = function($copy_v) {
      var $tco_done = false;
      var $tco_result;
      function $tco_loop(v) {
        if (v instanceof Loop) {
          $copy_v = f(v.value0);
          return;
        }
        ;
        if (v instanceof Done) {
          $tco_done = true;
          return v.value0;
        }
        ;
        throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 93, column 3 - line 93, column 25): " + [v.constructor.name]);
      }
      ;
      while (!$tco_done) {
        $tco_result = $tco_loop($copy_v);
      }
      ;
      return $tco_result;
    };
    return function($55) {
      return go(f($55));
    };
  };
  var monadRecEither = {
    tailRecM: function(f) {
      return function(a0) {
        var g = function(v) {
          if (v instanceof Left) {
            return new Done(new Left(v.value0));
          }
          ;
          if (v instanceof Right && v.value0 instanceof Loop) {
            return new Loop(f(v.value0.value0));
          }
          ;
          if (v instanceof Right && v.value0 instanceof Done) {
            return new Done(new Right(v.value0.value0));
          }
          ;
          throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 121, column 7 - line 121, column 33): " + [v.constructor.name]);
        };
        return tailRec(g)(f(a0));
      };
    },
    Monad0: function() {
      return monadEither;
    }
  };
  var bifunctorStep = {
    bimap: function(v) {
      return function(v1) {
        return function(v2) {
          if (v2 instanceof Loop) {
            return new Loop(v(v2.value0));
          }
          ;
          if (v2 instanceof Done) {
            return new Done(v1(v2.value0));
          }
          ;
          throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 29, column 1 - line 31, column 34): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
        };
      };
    }
  };

  // output/Data.HeytingAlgebra/foreign.js
  var boolConj = function(b1) {
    return function(b2) {
      return b1 && b2;
    };
  };
  var boolDisj = function(b1) {
    return function(b2) {
      return b1 || b2;
    };
  };
  var boolNot = function(b) {
    return !b;
  };

  // output/Data.HeytingAlgebra/index.js
  var tt = function(dict) {
    return dict.tt;
  };
  var not = function(dict) {
    return dict.not;
  };
  var ff = function(dict) {
    return dict.ff;
  };
  var disj = function(dict) {
    return dict.disj;
  };
  var heytingAlgebraBoolean = {
    ff: false,
    tt: true,
    implies: function(a) {
      return function(b) {
        return disj(heytingAlgebraBoolean)(not(heytingAlgebraBoolean)(a))(b);
      };
    },
    conj: boolConj,
    disj: boolDisj,
    not: boolNot
  };
  var conj = function(dict) {
    return dict.conj;
  };

  // output/Data.Tuple/index.js
  var Tuple = /* @__PURE__ */ function() {
    function Tuple2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Tuple2.create = function(value0) {
      return function(value1) {
        return new Tuple2(value0, value1);
      };
    };
    return Tuple2;
  }();
  var uncurry = function(f) {
    return function(v) {
      return f(v.value0)(v.value1);
    };
  };
  var snd = function(v) {
    return v.value1;
  };
  var functorTuple = {
    map: function(f) {
      return function(m) {
        return new Tuple(m.value0, f(m.value1));
      };
    }
  };
  var fst = function(v) {
    return v.value0;
  };

  // output/Control.Monad.State.Class/index.js
  var state = function(dict) {
    return dict.state;
  };
  var put = function(dictMonadState) {
    return function(s) {
      return state(dictMonadState)(function(v) {
        return new Tuple(unit, s);
      });
    };
  };
  var get = function(dictMonadState) {
    return state(dictMonadState)(function(s) {
      return new Tuple(s, s);
    });
  };

  // output/Control.Monad.Trans.Class/index.js
  var lift = function(dict) {
    return dict.lift;
  };

  // output/Control.Monad.Except.Trans/index.js
  var ExceptT = function(x) {
    return x;
  };
  var withExceptT = function(dictFunctor) {
    return function(f) {
      return function(v) {
        var mapLeft = function(v1) {
          return function(v2) {
            if (v2 instanceof Right) {
              return new Right(v2.value0);
            }
            ;
            if (v2 instanceof Left) {
              return new Left(v1(v2.value0));
            }
            ;
            throw new Error("Failed pattern match at Control.Monad.Except.Trans (line 42, column 3 - line 42, column 32): " + [v1.constructor.name, v2.constructor.name]);
          };
        };
        return map(dictFunctor)(mapLeft(f))(v);
      };
    };
  };
  var runExceptT = function(v) {
    return v;
  };
  var monadTransExceptT = {
    lift: function(dictMonad) {
      return function(m) {
        return bind(dictMonad.Bind1())(m)(function(a) {
          return pure(dictMonad.Applicative0())(new Right(a));
        });
      };
    }
  };
  var mapExceptT = function(f) {
    return function(v) {
      return f(v);
    };
  };
  var functorExceptT = function(dictFunctor) {
    return {
      map: function(f) {
        return mapExceptT(map(dictFunctor)(map(functorEither)(f)));
      }
    };
  };
  var monadExceptT = function(dictMonad) {
    return {
      Applicative0: function() {
        return applicativeExceptT(dictMonad);
      },
      Bind1: function() {
        return bindExceptT(dictMonad);
      }
    };
  };
  var bindExceptT = function(dictMonad) {
    return {
      bind: function(v) {
        return function(k) {
          return bind(dictMonad.Bind1())(v)(either(function() {
            var $89 = pure(dictMonad.Applicative0());
            return function($90) {
              return $89(Left.create($90));
            };
          }())(function(a) {
            var v1 = k(a);
            return v1;
          }));
        };
      },
      Apply0: function() {
        return applyExceptT(dictMonad);
      }
    };
  };
  var applyExceptT = function(dictMonad) {
    return {
      apply: ap(monadExceptT(dictMonad)),
      Functor0: function() {
        return functorExceptT(dictMonad.Bind1().Apply0().Functor0());
      }
    };
  };
  var applicativeExceptT = function(dictMonad) {
    return {
      pure: function() {
        var $91 = pure(dictMonad.Applicative0());
        return function($92) {
          return ExceptT($91(Right.create($92)));
        };
      }(),
      Apply0: function() {
        return applyExceptT(dictMonad);
      }
    };
  };
  var monadStateExceptT = function(dictMonadState) {
    return {
      state: function(f) {
        return lift(monadTransExceptT)(dictMonadState.Monad0())(state(dictMonadState)(f));
      },
      Monad0: function() {
        return monadExceptT(dictMonadState.Monad0());
      }
    };
  };
  var monadThrowExceptT = function(dictMonad) {
    return {
      throwError: function() {
        var $101 = pure(dictMonad.Applicative0());
        return function($102) {
          return ExceptT($101(Left.create($102)));
        };
      }(),
      Monad0: function() {
        return monadExceptT(dictMonad);
      }
    };
  };

  // output/Control.Plus/index.js
  var empty = function(dict) {
    return dict.empty;
  };

  // output/Control.Monad.State.Trans/index.js
  var functorStateT = function(dictFunctor) {
    return {
      map: function(f) {
        return function(v) {
          return function(s) {
            return map(dictFunctor)(function(v1) {
              return new Tuple(f(v1.value0), v1.value1);
            })(v(s));
          };
        };
      }
    };
  };
  var evalStateT = function(dictFunctor) {
    return function(v) {
      return function(s) {
        return map(dictFunctor)(fst)(v(s));
      };
    };
  };
  var monadStateT = function(dictMonad) {
    return {
      Applicative0: function() {
        return applicativeStateT(dictMonad);
      },
      Bind1: function() {
        return bindStateT(dictMonad);
      }
    };
  };
  var bindStateT = function(dictMonad) {
    return {
      bind: function(v) {
        return function(f) {
          return function(s) {
            return bind(dictMonad.Bind1())(v(s))(function(v1) {
              var v3 = f(v1.value0);
              return v3(v1.value1);
            });
          };
        };
      },
      Apply0: function() {
        return applyStateT(dictMonad);
      }
    };
  };
  var applyStateT = function(dictMonad) {
    return {
      apply: ap(monadStateT(dictMonad)),
      Functor0: function() {
        return functorStateT(dictMonad.Bind1().Apply0().Functor0());
      }
    };
  };
  var applicativeStateT = function(dictMonad) {
    return {
      pure: function(a) {
        return function(s) {
          return pure(dictMonad.Applicative0())(new Tuple(a, s));
        };
      },
      Apply0: function() {
        return applyStateT(dictMonad);
      }
    };
  };
  var monadStateStateT = function(dictMonad) {
    return {
      state: function(f) {
        var $112 = pure(dictMonad.Applicative0());
        return function($113) {
          return $112(f($113));
        };
      },
      Monad0: function() {
        return monadStateT(dictMonad);
      }
    };
  };

  // output/Data.Array/foreign.js
  var range = function(start) {
    return function(end) {
      var step2 = start > end ? -1 : 1;
      var result = new Array(step2 * (end - start) + 1);
      var i = start, n = 0;
      while (i !== end) {
        result[n++] = i;
        i += step2;
      }
      result[n] = i;
      return result;
    };
  };
  var replicateFill = function(count) {
    return function(value) {
      if (count < 1) {
        return [];
      }
      var result = new Array(count);
      return result.fill(value);
    };
  };
  var replicatePolyfill = function(count) {
    return function(value) {
      var result = [];
      var n = 0;
      for (var i = 0; i < count; i++) {
        result[n++] = value;
      }
      return result;
    };
  };
  var replicate = typeof Array.prototype.fill === "function" ? replicateFill : replicatePolyfill;
  var fromFoldableImpl = function() {
    function Cons3(head6, tail2) {
      this.head = head6;
      this.tail = tail2;
    }
    var emptyList = {};
    function curryCons(head6) {
      return function(tail2) {
        return new Cons3(head6, tail2);
      };
    }
    function listToArray(list) {
      var result = [];
      var count = 0;
      var xs = list;
      while (xs !== emptyList) {
        result[count++] = xs.head;
        xs = xs.tail;
      }
      return result;
    }
    return function(foldr2) {
      return function(xs) {
        return listToArray(foldr2(curryCons)(emptyList)(xs));
      };
    };
  }();
  var length = function(xs) {
    return xs.length;
  };
  var indexImpl = function(just) {
    return function(nothing) {
      return function(xs) {
        return function(i) {
          return i < 0 || i >= xs.length ? nothing : just(xs[i]);
        };
      };
    };
  };
  var findIndexImpl = function(just) {
    return function(nothing) {
      return function(f) {
        return function(xs) {
          for (var i = 0, l = xs.length; i < l; i++) {
            if (f(xs[i]))
              return just(i);
          }
          return nothing;
        };
      };
    };
  };
  var _updateAt = function(just) {
    return function(nothing) {
      return function(i) {
        return function(a) {
          return function(l) {
            if (i < 0 || i >= l.length)
              return nothing;
            var l1 = l.slice();
            l1[i] = a;
            return just(l1);
          };
        };
      };
    };
  };
  var reverse = function(l) {
    return l.slice().reverse();
  };
  var concat = function(xss) {
    if (xss.length <= 1e4) {
      return Array.prototype.concat.apply([], xss);
    }
    var result = [];
    for (var i = 0, l = xss.length; i < l; i++) {
      var xs = xss[i];
      for (var j = 0, m = xs.length; j < m; j++) {
        result.push(xs[j]);
      }
    }
    return result;
  };
  var filter = function(f) {
    return function(xs) {
      return xs.filter(f);
    };
  };
  var sortByImpl = function() {
    function mergeFromTo(compare2, fromOrdering, xs1, xs2, from3, to) {
      var mid;
      var i;
      var j;
      var k;
      var x;
      var y;
      var c;
      mid = from3 + (to - from3 >> 1);
      if (mid - from3 > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, from3, mid);
      if (to - mid > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, mid, to);
      i = from3;
      j = mid;
      k = from3;
      while (i < mid && j < to) {
        x = xs2[i];
        y = xs2[j];
        c = fromOrdering(compare2(x)(y));
        if (c > 0) {
          xs1[k++] = y;
          ++j;
        } else {
          xs1[k++] = x;
          ++i;
        }
      }
      while (i < mid) {
        xs1[k++] = xs2[i++];
      }
      while (j < to) {
        xs1[k++] = xs2[j++];
      }
    }
    return function(compare2) {
      return function(fromOrdering) {
        return function(xs) {
          var out;
          if (xs.length < 2)
            return xs;
          out = xs.slice(0);
          mergeFromTo(compare2, fromOrdering, out, xs.slice(0), 0, xs.length);
          return out;
        };
      };
    };
  }();
  var slice = function(s) {
    return function(e) {
      return function(l) {
        return l.slice(s, e);
      };
    };
  };
  var zipWith = function(f) {
    return function(xs) {
      return function(ys) {
        var l = xs.length < ys.length ? xs.length : ys.length;
        var result = new Array(l);
        for (var i = 0; i < l; i++) {
          result[i] = f(xs[i])(ys[i]);
        }
        return result;
      };
    };
  };
  var unsafeIndexImpl = function(xs) {
    return function(n) {
      return xs[n];
    };
  };

  // output/Control.Monad.ST.Internal/foreign.js
  var map_ = function(f) {
    return function(a) {
      return function() {
        return f(a());
      };
    };
  };
  function newSTRef(val) {
    return function() {
      return { value: val };
    };
  }
  var read2 = function(ref) {
    return function() {
      return ref.value;
    };
  };
  var modifyImpl2 = function(f) {
    return function(ref) {
      return function() {
        var t = f(ref.value);
        ref.value = t.state;
        return t.value;
      };
    };
  };
  var write2 = function(a) {
    return function(ref) {
      return function() {
        return ref.value = a;
      };
    };
  };

  // output/Control.Monad.ST.Internal/index.js
  var modify$prime = modifyImpl2;
  var modify2 = function(f) {
    return modify$prime(function(s) {
      var s$prime = f(s);
      return {
        state: s$prime,
        value: s$prime
      };
    });
  };
  var functorST = {
    map: map_
  };

  // output/Data.Array.ST/foreign.js
  function newSTArray() {
    return [];
  }
  var pushAll = function(as) {
    return function(xs) {
      return function() {
        return xs.push.apply(xs, as);
      };
    };
  };
  var unsafeFreeze = function(xs) {
    return function() {
      return xs;
    };
  };
  function copyImpl(xs) {
    return function() {
      return xs.slice();
    };
  }
  var thaw = copyImpl;
  var sortByImpl2 = function() {
    function mergeFromTo(compare2, fromOrdering, xs1, xs2, from3, to) {
      var mid;
      var i;
      var j;
      var k;
      var x;
      var y;
      var c;
      mid = from3 + (to - from3 >> 1);
      if (mid - from3 > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, from3, mid);
      if (to - mid > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, mid, to);
      i = from3;
      j = mid;
      k = from3;
      while (i < mid && j < to) {
        x = xs2[i];
        y = xs2[j];
        c = fromOrdering(compare2(x)(y));
        if (c > 0) {
          xs1[k++] = y;
          ++j;
        } else {
          xs1[k++] = x;
          ++i;
        }
      }
      while (i < mid) {
        xs1[k++] = xs2[i++];
      }
      while (j < to) {
        xs1[k++] = xs2[j++];
      }
    }
    return function(compare2) {
      return function(fromOrdering) {
        return function(xs) {
          return function() {
            if (xs.length < 2)
              return xs;
            mergeFromTo(compare2, fromOrdering, xs, xs.slice(0), 0, xs.length);
            return xs;
          };
        };
      };
    };
  }();

  // output/Data.Array.ST/index.js
  var withArray = function(f) {
    return function(xs) {
      return function __do() {
        var result = thaw(xs)();
        f(result)();
        return unsafeFreeze(result)();
      };
    };
  };
  var push = function(a) {
    return pushAll([a]);
  };

  // output/Data.Array.ST.Iterator/index.js
  var Iterator = /* @__PURE__ */ function() {
    function Iterator2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Iterator2.create = function(value0) {
      return function(value1) {
        return new Iterator2(value0, value1);
      };
    };
    return Iterator2;
  }();
  var peek = function(v) {
    return function __do() {
      var i = read2(v.value1)();
      return v.value0(i);
    };
  };
  var next = function(v) {
    return function __do() {
      var i = read2(v.value1)();
      modify2(function(v1) {
        return v1 + 1 | 0;
      })(v.value1)();
      return v.value0(i);
    };
  };
  var pushWhile = function(p) {
    return function(iter) {
      return function(array) {
        return function __do() {
          var $$break = newSTRef(false)();
          while (map(functorST)(not(heytingAlgebraBoolean))(read2($$break))()) {
            (function __do2() {
              var mx = peek(iter)();
              if (mx instanceof Just && p(mx.value0)) {
                push(mx.value0)(array)();
                return $$void(functorST)(next(iter))();
              }
              ;
              return $$void(functorST)(write2(true)($$break))();
            })();
          }
          ;
          return {};
        };
      };
    };
  };
  var iterator = function(f) {
    return map(functorST)(Iterator.create(f))(newSTRef(0));
  };
  var iterate = function(iter) {
    return function(f) {
      return function __do() {
        var $$break = newSTRef(false)();
        while (map(functorST)(not(heytingAlgebraBoolean))(read2($$break))()) {
          (function __do2() {
            var mx = next(iter)();
            if (mx instanceof Just) {
              return f(mx.value0)();
            }
            ;
            if (mx instanceof Nothing) {
              return $$void(functorST)(write2(true)($$break))();
            }
            ;
            throw new Error("Failed pattern match at Data.Array.ST.Iterator (line 42, column 5 - line 44, column 47): " + [mx.constructor.name]);
          })();
        }
        ;
        return {};
      };
    };
  };

  // output/Data.Foldable/foreign.js
  var foldrArray = function(f) {
    return function(init4) {
      return function(xs) {
        var acc = init4;
        var len = xs.length;
        for (var i = len - 1; i >= 0; i--) {
          acc = f(xs[i])(acc);
        }
        return acc;
      };
    };
  };
  var foldlArray = function(f) {
    return function(init4) {
      return function(xs) {
        var acc = init4;
        var len = xs.length;
        for (var i = 0; i < len; i++) {
          acc = f(acc)(xs[i]);
        }
        return acc;
      };
    };
  };

  // output/Data.Bifunctor/index.js
  var bimap = function(dict) {
    return dict.bimap;
  };

  // output/Data.Maybe.First/index.js
  var First = function(x) {
    return x;
  };
  var semigroupFirst = {
    append: function(v) {
      return function(v1) {
        if (v instanceof Just) {
          return v;
        }
        ;
        return v1;
      };
    }
  };
  var monoidFirst = /* @__PURE__ */ function() {
    return {
      mempty: Nothing.value,
      Semigroup0: function() {
        return semigroupFirst;
      }
    };
  }();

  // output/Data.Monoid.Conj/index.js
  var Conj = function(x) {
    return x;
  };
  var semigroupConj = function(dictHeytingAlgebra) {
    return {
      append: function(v) {
        return function(v1) {
          return conj(dictHeytingAlgebra)(v)(v1);
        };
      }
    };
  };
  var monoidConj = function(dictHeytingAlgebra) {
    return {
      mempty: tt(dictHeytingAlgebra),
      Semigroup0: function() {
        return semigroupConj(dictHeytingAlgebra);
      }
    };
  };

  // output/Data.Monoid.Disj/index.js
  var Disj = function(x) {
    return x;
  };
  var semigroupDisj = function(dictHeytingAlgebra) {
    return {
      append: function(v) {
        return function(v1) {
          return disj(dictHeytingAlgebra)(v)(v1);
        };
      }
    };
  };
  var monoidDisj = function(dictHeytingAlgebra) {
    return {
      mempty: ff(dictHeytingAlgebra),
      Semigroup0: function() {
        return semigroupDisj(dictHeytingAlgebra);
      }
    };
  };

  // output/Unsafe.Coerce/foreign.js
  var unsafeCoerce2 = function(x) {
    return x;
  };

  // output/Safe.Coerce/index.js
  var coerce = function() {
    return unsafeCoerce2;
  };

  // output/Data.Newtype/index.js
  var unwrap = coerce;
  var under = function() {
    return function() {
      return function(v) {
        return coerce();
      };
    };
  };
  var alaF = function() {
    return function() {
      return function() {
        return function() {
          return function(v) {
            return coerce();
          };
        };
      };
    };
  };

  // output/Data.Foldable/index.js
  var foldr = function(dict) {
    return dict.foldr;
  };
  var foldl = function(dict) {
    return dict.foldl;
  };
  var maximumBy = function(dictFoldable) {
    return function(cmp) {
      var max$prime = function(v) {
        return function(v1) {
          if (v instanceof Nothing) {
            return new Just(v1);
          }
          ;
          if (v instanceof Just) {
            return new Just(function() {
              var $164 = eq(eqOrdering)(cmp(v.value0)(v1))(GT.value);
              if ($164) {
                return v.value0;
              }
              ;
              return v1;
            }());
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 441, column 3 - line 441, column 27): " + [v.constructor.name, v1.constructor.name]);
        };
      };
      return foldl(dictFoldable)(max$prime)(Nothing.value);
    };
  };
  var foldMapDefaultR = function(dictFoldable) {
    return function(dictMonoid) {
      return function(f) {
        return foldr(dictFoldable)(function(x) {
          return function(acc) {
            return append(dictMonoid.Semigroup0())(f(x))(acc);
          };
        })(mempty(dictMonoid));
      };
    };
  };
  var foldableArray = {
    foldr: foldrArray,
    foldl: foldlArray,
    foldMap: function(dictMonoid) {
      return foldMapDefaultR(foldableArray)(dictMonoid);
    }
  };
  var foldMap = function(dict) {
    return dict.foldMap;
  };
  var foldM = function(dictFoldable) {
    return function(dictMonad) {
      return function(f) {
        return function(b0) {
          return foldl(dictFoldable)(function(b) {
            return function(a) {
              return bind(dictMonad.Bind1())(b)(flip(f)(a));
            };
          })(pure(dictMonad.Applicative0())(b0));
        };
      };
    };
  };
  var any = function(dictFoldable) {
    return function(dictHeytingAlgebra) {
      return alaF()()()()(Disj)(foldMap(dictFoldable)(monoidDisj(dictHeytingAlgebra)));
    };
  };
  var elem = function(dictFoldable) {
    return function(dictEq) {
      var $326 = any(dictFoldable)(heytingAlgebraBoolean);
      var $327 = eq(dictEq);
      return function($328) {
        return $326($327($328));
      };
    };
  };
  var all = function(dictFoldable) {
    return function(dictHeytingAlgebra) {
      return alaF()()()()(Conj)(foldMap(dictFoldable)(monoidConj(dictHeytingAlgebra)));
    };
  };

  // output/Data.Traversable/foreign.js
  var traverseArrayImpl = function() {
    function array1(a) {
      return [a];
    }
    function array2(a) {
      return function(b) {
        return [a, b];
      };
    }
    function array3(a) {
      return function(b) {
        return function(c) {
          return [a, b, c];
        };
      };
    }
    function concat2(xs) {
      return function(ys) {
        return xs.concat(ys);
      };
    }
    return function(apply2) {
      return function(map2) {
        return function(pure2) {
          return function(f) {
            return function(array) {
              function go(bot, top2) {
                switch (top2 - bot) {
                  case 0:
                    return pure2([]);
                  case 1:
                    return map2(array1)(f(array[bot]));
                  case 2:
                    return apply2(map2(array2)(f(array[bot])))(f(array[bot + 1]));
                  case 3:
                    return apply2(apply2(map2(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                  default:
                    var pivot = bot + Math.floor((top2 - bot) / 4) * 2;
                    return apply2(map2(concat2)(go(bot, pivot)))(go(pivot, top2));
                }
              }
              return go(0, array.length);
            };
          };
        };
      };
    };
  }();

  // output/Data.Const/index.js
  var Const = function(x) {
    return x;
  };
  var functorConst = {
    map: function(f) {
      return function(m) {
        return m;
      };
    }
  };
  var applyConst = function(dictSemigroup) {
    return {
      apply: function(v) {
        return function(v1) {
          return append(dictSemigroup)(v)(v1);
        };
      },
      Functor0: function() {
        return functorConst;
      }
    };
  };
  var applicativeConst = function(dictMonoid) {
    return {
      pure: function(v) {
        return mempty(dictMonoid);
      },
      Apply0: function() {
        return applyConst(dictMonoid.Semigroup0());
      }
    };
  };

  // output/Data.Maybe.Last/index.js
  var Last = function(x) {
    return x;
  };
  var semigroupLast = {
    append: function(v) {
      return function(v1) {
        if (v1 instanceof Just) {
          return v1;
        }
        ;
        if (v1 instanceof Nothing) {
          return v;
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe.Last (line 54, column 1 - line 56, column 36): " + [v.constructor.name, v1.constructor.name]);
      };
    }
  };
  var monoidLast = /* @__PURE__ */ function() {
    return {
      mempty: Nothing.value,
      Semigroup0: function() {
        return semigroupLast;
      }
    };
  }();

  // output/Data.Traversable/index.js
  var traverse = function(dict) {
    return dict.traverse;
  };
  var sequenceDefault = function(dictTraversable) {
    return function(dictApplicative) {
      return traverse(dictTraversable)(dictApplicative)(identity(categoryFn));
    };
  };
  var traversableArray = {
    traverse: function(dictApplicative) {
      return traverseArrayImpl(apply(dictApplicative.Apply0()))(map(dictApplicative.Apply0().Functor0()))(pure(dictApplicative));
    },
    sequence: function(dictApplicative) {
      return sequenceDefault(traversableArray)(dictApplicative);
    },
    Functor0: function() {
      return functorArray;
    },
    Foldable1: function() {
      return foldableArray;
    }
  };
  var sequence = function(dict) {
    return dict.sequence;
  };

  // output/Data.Unfoldable/foreign.js
  var unfoldrArrayImpl = function(isNothing2) {
    return function(fromJust2) {
      return function(fst2) {
        return function(snd2) {
          return function(f) {
            return function(b) {
              var result = [];
              var value = b;
              while (true) {
                var maybe2 = f(value);
                if (isNothing2(maybe2))
                  return result;
                var tuple = fromJust2(maybe2);
                result.push(fst2(tuple));
                value = snd2(tuple);
              }
            };
          };
        };
      };
    };
  };

  // output/Data.Unfoldable1/foreign.js
  var unfoldr1ArrayImpl = function(isNothing2) {
    return function(fromJust2) {
      return function(fst2) {
        return function(snd2) {
          return function(f) {
            return function(b) {
              var result = [];
              var value = b;
              while (true) {
                var tuple = f(value);
                result.push(fst2(tuple));
                var maybe2 = snd2(tuple);
                if (isNothing2(maybe2))
                  return result;
                value = fromJust2(maybe2);
              }
            };
          };
        };
      };
    };
  };

  // output/Data.Semigroup.Foldable/index.js
  var JoinWith = function(x) {
    return x;
  };
  var semigroupJoinWith = function(dictSemigroup) {
    return {
      append: function(v) {
        return function(v1) {
          return function(j) {
            return append(dictSemigroup)(v(j))(append(dictSemigroup)(j)(v1(j)));
          };
        };
      }
    };
  };
  var joinee = function(v) {
    return v;
  };
  var foldMap1 = function(dict) {
    return dict.foldMap1;
  };
  var intercalateMap = function(dictFoldable1) {
    return function(dictSemigroup) {
      return function(j) {
        return function(f) {
          return function(foldable) {
            return joinee(foldMap1(dictFoldable1)(semigroupJoinWith(dictSemigroup))(function($123) {
              return JoinWith($$const(f($123)));
            })(foldable))(j);
          };
        };
      };
    };
  };

  // output/Data.Semigroup.Traversable/index.js
  var traverse1 = function(dict) {
    return dict.traverse1;
  };
  var sequence1 = function(dict) {
    return dict.sequence1;
  };

  // output/Data.Unfoldable1/index.js
  var unfoldr1 = function(dict) {
    return dict.unfoldr1;
  };
  var unfoldable1Array = {
    unfoldr1: /* @__PURE__ */ unfoldr1ArrayImpl(isNothing)(/* @__PURE__ */ fromJust())(fst)(snd)
  };
  var replicate1 = function(dictUnfoldable1) {
    return function(n) {
      return function(v) {
        var step2 = function(i) {
          if (i <= 0) {
            return new Tuple(v, Nothing.value);
          }
          ;
          if (otherwise) {
            return new Tuple(v, new Just(i - 1 | 0));
          }
          ;
          throw new Error("Failed pattern match at Data.Unfoldable1 (line 68, column 5 - line 68, column 39): " + [i.constructor.name]);
        };
        return unfoldr1(dictUnfoldable1)(step2)(n - 1 | 0);
      };
    };
  };
  var replicate1A = function(dictApply) {
    return function(dictUnfoldable1) {
      return function(dictTraversable1) {
        return function(n) {
          return function(m) {
            return sequence1(dictTraversable1)(dictApply)(replicate1(dictUnfoldable1)(n)(m));
          };
        };
      };
    };
  };

  // output/Data.Unfoldable/index.js
  var unfoldr = function(dict) {
    return dict.unfoldr;
  };
  var unfoldableArray = {
    unfoldr: /* @__PURE__ */ unfoldrArrayImpl(isNothing)(/* @__PURE__ */ fromJust())(fst)(snd),
    Unfoldable10: function() {
      return unfoldable1Array;
    }
  };
  var replicate2 = function(dictUnfoldable) {
    return function(n) {
      return function(v) {
        var step2 = function(i) {
          var $7 = i <= 0;
          if ($7) {
            return Nothing.value;
          }
          ;
          return new Just(new Tuple(v, i - 1 | 0));
        };
        return unfoldr(dictUnfoldable)(step2)(n);
      };
    };
  };
  var fromMaybe2 = function(dictUnfoldable) {
    return unfoldr(dictUnfoldable)(function(b) {
      return map(functorMaybe)(flip(Tuple.create)(Nothing.value))(b);
    });
  };

  // output/Data.Array/index.js
  var zip = /* @__PURE__ */ function() {
    return zipWith(Tuple.create);
  }();
  var updateAt = /* @__PURE__ */ function() {
    return _updateAt(Just.create)(Nothing.value);
  }();
  var unsafeIndex = function() {
    return unsafeIndexImpl;
  };
  var toUnfoldable = function(dictUnfoldable) {
    return function(xs) {
      var len = length(xs);
      var f = function(i) {
        if (i < len) {
          return new Just(new Tuple(unsafeIndex()(xs)(i), i + 1 | 0));
        }
        ;
        if (otherwise) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Data.Array (line 156, column 3 - line 158, column 26): " + [i.constructor.name]);
      };
      return unfoldr(dictUnfoldable)(f)(0);
    };
  };
  var take = function(n) {
    return function(xs) {
      var $57 = n < 1;
      if ($57) {
        return [];
      }
      ;
      return slice(0)(n)(xs);
    };
  };
  var snoc = function(xs) {
    return function(x) {
      return withArray(push(x))(xs)();
    };
  };
  var singleton2 = function(a) {
    return [a];
  };
  var $$null = function(xs) {
    return length(xs) === 0;
  };
  var mapWithIndex = function(f) {
    return function(xs) {
      return zipWith(f)(range(0)(length(xs) - 1 | 0))(xs);
    };
  };
  var index = /* @__PURE__ */ function() {
    return indexImpl(Just.create)(Nothing.value);
  }();
  var last = function(xs) {
    return index(xs)(length(xs) - 1 | 0);
  };
  var modifyAt = function(i) {
    return function(f) {
      return function(xs) {
        var go = function(x) {
          return updateAt(i)(f(x))(xs);
        };
        return maybe(Nothing.value)(go)(index(xs)(i));
      };
    };
  };
  var head = function(xs) {
    return index(xs)(0);
  };
  var groupBy = function(op) {
    return function(xs) {
      return function __do() {
        var result = newSTArray();
        var iter = iterator(function(v) {
          return index(xs)(v);
        })();
        iterate(iter)(function(x) {
          return $$void(functorST)(function __do2() {
            var sub2 = newSTArray();
            push(x)(sub2)();
            pushWhile(op(x))(iter)(sub2)();
            var grp = unsafeFreeze(sub2)();
            return push(grp)(result)();
          });
        })();
        return unsafeFreeze(result)();
      }();
    };
  };
  var fromFoldable = function(dictFoldable) {
    return fromFoldableImpl(foldr(dictFoldable));
  };
  var foldl2 = /* @__PURE__ */ foldl(foldableArray);
  var findIndex = /* @__PURE__ */ function() {
    return findIndexImpl(Just.create)(Nothing.value);
  }();
  var elemIndex = function(dictEq) {
    return function(x) {
      return findIndex(function(v) {
        return eq(dictEq)(v)(x);
      });
    };
  };
  var drop = function(n) {
    return function(xs) {
      var $79 = n < 1;
      if ($79) {
        return xs;
      }
      ;
      return slice(n)(length(xs))(xs);
    };
  };
  var cons2 = function(x) {
    return function(xs) {
      return append(semigroupArray)([x])(xs);
    };
  };
  var concatMap = /* @__PURE__ */ flip(/* @__PURE__ */ bind(bindArray));
  var mapMaybe = function(f) {
    return concatMap(function() {
      var $99 = maybe([])(singleton2);
      return function($100) {
        return $99(f($100));
      };
    }());
  };
  var catMaybes = /* @__PURE__ */ mapMaybe(/* @__PURE__ */ identity(categoryFn));

  // output/Data.String.Common/foreign.js
  var toLower = function(s) {
    return s.toLowerCase();
  };
  var toUpper = function(s) {
    return s.toUpperCase();
  };

  // output/Data.Abc/index.js
  var Volta = /* @__PURE__ */ function() {
    function Volta2(value0) {
      this.value0 = value0;
    }
    ;
    Volta2.create = function(value0) {
      return new Volta2(value0);
    };
    return Volta2;
  }();
  var VoltaRange = /* @__PURE__ */ function() {
    function VoltaRange2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    VoltaRange2.create = function(value0) {
      return function(value1) {
        return new VoltaRange2(value0, value1);
      };
    };
    return VoltaRange2;
  }();
  var Thin = /* @__PURE__ */ function() {
    function Thin2() {
    }
    ;
    Thin2.value = new Thin2();
    return Thin2;
  }();
  var ThinThin = /* @__PURE__ */ function() {
    function ThinThin2() {
    }
    ;
    ThinThin2.value = new ThinThin2();
    return ThinThin2;
  }();
  var ThinThick = /* @__PURE__ */ function() {
    function ThinThick2() {
    }
    ;
    ThinThick2.value = new ThinThick2();
    return ThinThick2;
  }();
  var ThickThin = /* @__PURE__ */ function() {
    function ThickThin2() {
    }
    ;
    ThickThin2.value = new ThickThin2();
    return ThickThin2;
  }();
  var Invisible = /* @__PURE__ */ function() {
    function Invisible2() {
    }
    ;
    Invisible2.value = new Invisible2();
    return Invisible2;
  }();
  var A = /* @__PURE__ */ function() {
    function A2() {
    }
    ;
    A2.value = new A2();
    return A2;
  }();
  var B = /* @__PURE__ */ function() {
    function B2() {
    }
    ;
    B2.value = new B2();
    return B2;
  }();
  var C = /* @__PURE__ */ function() {
    function C2() {
    }
    ;
    C2.value = new C2();
    return C2;
  }();
  var D = /* @__PURE__ */ function() {
    function D2() {
    }
    ;
    D2.value = new D2();
    return D2;
  }();
  var E = /* @__PURE__ */ function() {
    function E2() {
    }
    ;
    E2.value = new E2();
    return E2;
  }();
  var F = /* @__PURE__ */ function() {
    function F2() {
    }
    ;
    F2.value = new F2();
    return F2;
  }();
  var G = /* @__PURE__ */ function() {
    function G2() {
    }
    ;
    G2.value = new G2();
    return G2;
  }();
  var Major = /* @__PURE__ */ function() {
    function Major2() {
    }
    ;
    Major2.value = new Major2();
    return Major2;
  }();
  var Minor = /* @__PURE__ */ function() {
    function Minor2() {
    }
    ;
    Minor2.value = new Minor2();
    return Minor2;
  }();
  var Ionian = /* @__PURE__ */ function() {
    function Ionian2() {
    }
    ;
    Ionian2.value = new Ionian2();
    return Ionian2;
  }();
  var Dorian = /* @__PURE__ */ function() {
    function Dorian2() {
    }
    ;
    Dorian2.value = new Dorian2();
    return Dorian2;
  }();
  var Phrygian = /* @__PURE__ */ function() {
    function Phrygian2() {
    }
    ;
    Phrygian2.value = new Phrygian2();
    return Phrygian2;
  }();
  var Lydian = /* @__PURE__ */ function() {
    function Lydian2() {
    }
    ;
    Lydian2.value = new Lydian2();
    return Lydian2;
  }();
  var Mixolydian = /* @__PURE__ */ function() {
    function Mixolydian2() {
    }
    ;
    Mixolydian2.value = new Mixolydian2();
    return Mixolydian2;
  }();
  var Aeolian = /* @__PURE__ */ function() {
    function Aeolian2() {
    }
    ;
    Aeolian2.value = new Aeolian2();
    return Aeolian2;
  }();
  var Locrian = /* @__PURE__ */ function() {
    function Locrian2() {
    }
    ;
    Locrian2.value = new Locrian2();
    return Locrian2;
  }();
  var LeftArrow = /* @__PURE__ */ function() {
    function LeftArrow2(value0) {
      this.value0 = value0;
    }
    ;
    LeftArrow2.create = function(value0) {
      return new LeftArrow2(value0);
    };
    return LeftArrow2;
  }();
  var RightArrow = /* @__PURE__ */ function() {
    function RightArrow2(value0) {
      this.value0 = value0;
    }
    ;
    RightArrow2.create = function(value0) {
      return new RightArrow2(value0);
    };
    return RightArrow2;
  }();
  var AboveNextSymbol = /* @__PURE__ */ function() {
    function AboveNextSymbol2() {
    }
    ;
    AboveNextSymbol2.value = new AboveNextSymbol2();
    return AboveNextSymbol2;
  }();
  var BelowNextSymbol = /* @__PURE__ */ function() {
    function BelowNextSymbol2() {
    }
    ;
    BelowNextSymbol2.value = new BelowNextSymbol2();
    return BelowNextSymbol2;
  }();
  var LeftOfNextSymbol = /* @__PURE__ */ function() {
    function LeftOfNextSymbol2() {
    }
    ;
    LeftOfNextSymbol2.value = new LeftOfNextSymbol2();
    return LeftOfNextSymbol2;
  }();
  var RightOfNextSymbol = /* @__PURE__ */ function() {
    function RightOfNextSymbol2() {
    }
    ;
    RightOfNextSymbol2.value = new RightOfNextSymbol2();
    return RightOfNextSymbol2;
  }();
  var Discretional = /* @__PURE__ */ function() {
    function Discretional2() {
    }
    ;
    Discretional2.value = new Discretional2();
    return Discretional2;
  }();
  var Sharp = /* @__PURE__ */ function() {
    function Sharp2() {
    }
    ;
    Sharp2.value = new Sharp2();
    return Sharp2;
  }();
  var Flat = /* @__PURE__ */ function() {
    function Flat2() {
    }
    ;
    Flat2.value = new Flat2();
    return Flat2;
  }();
  var DoubleSharp = /* @__PURE__ */ function() {
    function DoubleSharp2() {
    }
    ;
    DoubleSharp2.value = new DoubleSharp2();
    return DoubleSharp2;
  }();
  var DoubleFlat = /* @__PURE__ */ function() {
    function DoubleFlat2() {
    }
    ;
    DoubleFlat2.value = new DoubleFlat2();
    return DoubleFlat2;
  }();
  var Natural = /* @__PURE__ */ function() {
    function Natural2() {
    }
    ;
    Natural2.value = new Natural2();
    return Natural2;
  }();
  var Implicit = /* @__PURE__ */ function() {
    function Implicit2() {
    }
    ;
    Implicit2.value = new Implicit2();
    return Implicit2;
  }();
  var Pitch = /* @__PURE__ */ function() {
    function Pitch2(value0) {
      this.value0 = value0;
    }
    ;
    Pitch2.create = function(value0) {
      return new Pitch2(value0);
    };
    return Pitch2;
  }();
  var Area = /* @__PURE__ */ function() {
    function Area2(value0) {
      this.value0 = value0;
    }
    ;
    Area2.create = function(value0) {
      return new Area2(value0);
    };
    return Area2;
  }();
  var Book = /* @__PURE__ */ function() {
    function Book2(value0) {
      this.value0 = value0;
    }
    ;
    Book2.create = function(value0) {
      return new Book2(value0);
    };
    return Book2;
  }();
  var Composer = /* @__PURE__ */ function() {
    function Composer2(value0) {
      this.value0 = value0;
    }
    ;
    Composer2.create = function(value0) {
      return new Composer2(value0);
    };
    return Composer2;
  }();
  var Discography = /* @__PURE__ */ function() {
    function Discography2(value0) {
      this.value0 = value0;
    }
    ;
    Discography2.create = function(value0) {
      return new Discography2(value0);
    };
    return Discography2;
  }();
  var FileUrl = /* @__PURE__ */ function() {
    function FileUrl2(value0) {
      this.value0 = value0;
    }
    ;
    FileUrl2.create = function(value0) {
      return new FileUrl2(value0);
    };
    return FileUrl2;
  }();
  var Group = /* @__PURE__ */ function() {
    function Group2(value0) {
      this.value0 = value0;
    }
    ;
    Group2.create = function(value0) {
      return new Group2(value0);
    };
    return Group2;
  }();
  var History = /* @__PURE__ */ function() {
    function History2(value0) {
      this.value0 = value0;
    }
    ;
    History2.create = function(value0) {
      return new History2(value0);
    };
    return History2;
  }();
  var Instruction = /* @__PURE__ */ function() {
    function Instruction2(value0) {
      this.value0 = value0;
    }
    ;
    Instruction2.create = function(value0) {
      return new Instruction2(value0);
    };
    return Instruction2;
  }();
  var Key = /* @__PURE__ */ function() {
    function Key2(value0) {
      this.value0 = value0;
    }
    ;
    Key2.create = function(value0) {
      return new Key2(value0);
    };
    return Key2;
  }();
  var UnitNoteLength = /* @__PURE__ */ function() {
    function UnitNoteLength2(value0) {
      this.value0 = value0;
    }
    ;
    UnitNoteLength2.create = function(value0) {
      return new UnitNoteLength2(value0);
    };
    return UnitNoteLength2;
  }();
  var Meter = /* @__PURE__ */ function() {
    function Meter2(value0) {
      this.value0 = value0;
    }
    ;
    Meter2.create = function(value0) {
      return new Meter2(value0);
    };
    return Meter2;
  }();
  var Macro = /* @__PURE__ */ function() {
    function Macro2(value0) {
      this.value0 = value0;
    }
    ;
    Macro2.create = function(value0) {
      return new Macro2(value0);
    };
    return Macro2;
  }();
  var Notes = /* @__PURE__ */ function() {
    function Notes2(value0) {
      this.value0 = value0;
    }
    ;
    Notes2.create = function(value0) {
      return new Notes2(value0);
    };
    return Notes2;
  }();
  var Origin = /* @__PURE__ */ function() {
    function Origin2(value0) {
      this.value0 = value0;
    }
    ;
    Origin2.create = function(value0) {
      return new Origin2(value0);
    };
    return Origin2;
  }();
  var Parts = /* @__PURE__ */ function() {
    function Parts2(value0) {
      this.value0 = value0;
    }
    ;
    Parts2.create = function(value0) {
      return new Parts2(value0);
    };
    return Parts2;
  }();
  var Tempo = /* @__PURE__ */ function() {
    function Tempo2(value0) {
      this.value0 = value0;
    }
    ;
    Tempo2.create = function(value0) {
      return new Tempo2(value0);
    };
    return Tempo2;
  }();
  var Rhythm = /* @__PURE__ */ function() {
    function Rhythm2(value0) {
      this.value0 = value0;
    }
    ;
    Rhythm2.create = function(value0) {
      return new Rhythm2(value0);
    };
    return Rhythm2;
  }();
  var Remark = /* @__PURE__ */ function() {
    function Remark2(value0) {
      this.value0 = value0;
    }
    ;
    Remark2.create = function(value0) {
      return new Remark2(value0);
    };
    return Remark2;
  }();
  var Source = /* @__PURE__ */ function() {
    function Source2(value0) {
      this.value0 = value0;
    }
    ;
    Source2.create = function(value0) {
      return new Source2(value0);
    };
    return Source2;
  }();
  var SymbolLine = /* @__PURE__ */ function() {
    function SymbolLine2(value0) {
      this.value0 = value0;
    }
    ;
    SymbolLine2.create = function(value0) {
      return new SymbolLine2(value0);
    };
    return SymbolLine2;
  }();
  var Title = /* @__PURE__ */ function() {
    function Title2(value0) {
      this.value0 = value0;
    }
    ;
    Title2.create = function(value0) {
      return new Title2(value0);
    };
    return Title2;
  }();
  var UserDefined = /* @__PURE__ */ function() {
    function UserDefined2(value0) {
      this.value0 = value0;
    }
    ;
    UserDefined2.create = function(value0) {
      return new UserDefined2(value0);
    };
    return UserDefined2;
  }();
  var Voice = /* @__PURE__ */ function() {
    function Voice2(value0) {
      this.value0 = value0;
    }
    ;
    Voice2.create = function(value0) {
      return new Voice2(value0);
    };
    return Voice2;
  }();
  var WordsAfter = /* @__PURE__ */ function() {
    function WordsAfter2(value0) {
      this.value0 = value0;
    }
    ;
    WordsAfter2.create = function(value0) {
      return new WordsAfter2(value0);
    };
    return WordsAfter2;
  }();
  var WordsAligned = /* @__PURE__ */ function() {
    function WordsAligned2(value0) {
      this.value0 = value0;
    }
    ;
    WordsAligned2.create = function(value0) {
      return new WordsAligned2(value0);
    };
    return WordsAligned2;
  }();
  var ReferenceNumber = /* @__PURE__ */ function() {
    function ReferenceNumber2(value0) {
      this.value0 = value0;
    }
    ;
    ReferenceNumber2.create = function(value0) {
      return new ReferenceNumber2(value0);
    };
    return ReferenceNumber2;
  }();
  var Transcription = /* @__PURE__ */ function() {
    function Transcription2(value0) {
      this.value0 = value0;
    }
    ;
    Transcription2.create = function(value0) {
      return new Transcription2(value0);
    };
    return Transcription2;
  }();
  var FieldContinuation = /* @__PURE__ */ function() {
    function FieldContinuation2(value0) {
      this.value0 = value0;
    }
    ;
    FieldContinuation2.create = function(value0) {
      return new FieldContinuation2(value0);
    };
    return FieldContinuation2;
  }();
  var Comment = /* @__PURE__ */ function() {
    function Comment2(value0) {
      this.value0 = value0;
    }
    ;
    Comment2.create = function(value0) {
      return new Comment2(value0);
    };
    return Comment2;
  }();
  var UnsupportedHeader = /* @__PURE__ */ function() {
    function UnsupportedHeader2() {
    }
    ;
    UnsupportedHeader2.value = new UnsupportedHeader2();
    return UnsupportedHeader2;
  }();
  var Note = /* @__PURE__ */ function() {
    function Note2(value0) {
      this.value0 = value0;
    }
    ;
    Note2.create = function(value0) {
      return new Note2(value0);
    };
    return Note2;
  }();
  var BrokenRhythmPair = /* @__PURE__ */ function() {
    function BrokenRhythmPair2(value0, value1, value2) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value2;
    }
    ;
    BrokenRhythmPair2.create = function(value0) {
      return function(value1) {
        return function(value2) {
          return new BrokenRhythmPair2(value0, value1, value2);
        };
      };
    };
    return BrokenRhythmPair2;
  }();
  var Rest = /* @__PURE__ */ function() {
    function Rest2(value0) {
      this.value0 = value0;
    }
    ;
    Rest2.create = function(value0) {
      return new Rest2(value0);
    };
    return Rest2;
  }();
  var Tuplet = /* @__PURE__ */ function() {
    function Tuplet2(value0) {
      this.value0 = value0;
    }
    ;
    Tuplet2.create = function(value0) {
      return new Tuplet2(value0);
    };
    return Tuplet2;
  }();
  var DecoratedSpace = /* @__PURE__ */ function() {
    function DecoratedSpace2(value0) {
      this.value0 = value0;
    }
    ;
    DecoratedSpace2.create = function(value0) {
      return new DecoratedSpace2(value0);
    };
    return DecoratedSpace2;
  }();
  var Annotation = /* @__PURE__ */ function() {
    function Annotation2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Annotation2.create = function(value0) {
      return function(value1) {
        return new Annotation2(value0, value1);
      };
    };
    return Annotation2;
  }();
  var ChordSymbol = /* @__PURE__ */ function() {
    function ChordSymbol2(value0) {
      this.value0 = value0;
    }
    ;
    ChordSymbol2.create = function(value0) {
      return new ChordSymbol2(value0);
    };
    return ChordSymbol2;
  }();
  var Chord = /* @__PURE__ */ function() {
    function Chord2(value0) {
      this.value0 = value0;
    }
    ;
    Chord2.create = function(value0) {
      return new Chord2(value0);
    };
    return Chord2;
  }();
  var Inline = /* @__PURE__ */ function() {
    function Inline2(value0) {
      this.value0 = value0;
    }
    ;
    Inline2.create = function(value0) {
      return new Inline2(value0);
    };
    return Inline2;
  }();
  var Spacer = /* @__PURE__ */ function() {
    function Spacer2(value0) {
      this.value0 = value0;
    }
    ;
    Spacer2.create = function(value0) {
      return new Spacer2(value0);
    };
    return Spacer2;
  }();
  var Ignore = /* @__PURE__ */ function() {
    function Ignore2() {
    }
    ;
    Ignore2.value = new Ignore2();
    return Ignore2;
  }();
  var Continuation = /* @__PURE__ */ function() {
    function Continuation2(value0) {
      this.value0 = value0;
    }
    ;
    Continuation2.create = function(value0) {
      return new Continuation2(value0);
    };
    return Continuation2;
  }();
  var Score = /* @__PURE__ */ function() {
    function Score2(value0) {
      this.value0 = value0;
    }
    ;
    Score2.create = function(value0) {
      return new Score2(value0);
    };
    return Score2;
  }();
  var BodyInfo = /* @__PURE__ */ function() {
    function BodyInfo2(value0) {
      this.value0 = value0;
    }
    ;
    BodyInfo2.create = function(value0) {
      return new BodyInfo2(value0);
    };
    return BodyInfo2;
  }();
  var showVolta = {
    show: function(v) {
      if (v instanceof Volta) {
        return show(showInt)(v.value0);
      }
      ;
      if (v instanceof VoltaRange) {
        return show(showInt)(v.value0) + ("-" + show(showInt)(v.value1));
      }
      ;
      throw new Error("Failed pattern match at Data.Abc (line 204, column 1 - line 206, column 58): " + [v.constructor.name]);
    }
  };
  var showPitchClass = {
    show: function(v) {
      if (v instanceof A) {
        return "A";
      }
      ;
      if (v instanceof B) {
        return "B";
      }
      ;
      if (v instanceof C) {
        return "C";
      }
      ;
      if (v instanceof D) {
        return "D";
      }
      ;
      if (v instanceof E) {
        return "E";
      }
      ;
      if (v instanceof F) {
        return "F";
      }
      ;
      if (v instanceof G) {
        return "G";
      }
      ;
      throw new Error("Failed pattern match at Data.Abc (line 279, column 1 - line 286, column 15): " + [v.constructor.name]);
    }
  };
  var middlecOctave = 5;
  var eqThickness = {
    eq: function(x) {
      return function(y) {
        if (x instanceof Thin && y instanceof Thin) {
          return true;
        }
        ;
        if (x instanceof ThinThin && y instanceof ThinThin) {
          return true;
        }
        ;
        if (x instanceof ThinThick && y instanceof ThinThick) {
          return true;
        }
        ;
        if (x instanceof ThickThin && y instanceof ThickThin) {
          return true;
        }
        ;
        if (x instanceof Invisible && y instanceof Invisible) {
          return true;
        }
        ;
        return false;
      };
    }
  };
  var eqPitchCLass = {
    eq: function(x) {
      return function(y) {
        if (x instanceof A && y instanceof A) {
          return true;
        }
        ;
        if (x instanceof B && y instanceof B) {
          return true;
        }
        ;
        if (x instanceof C && y instanceof C) {
          return true;
        }
        ;
        if (x instanceof D && y instanceof D) {
          return true;
        }
        ;
        if (x instanceof E && y instanceof E) {
          return true;
        }
        ;
        if (x instanceof F && y instanceof F) {
          return true;
        }
        ;
        if (x instanceof G && y instanceof G) {
          return true;
        }
        ;
        return false;
      };
    }
  };
  var ordPitchCLass = {
    compare: function(x) {
      return function(y) {
        if (x instanceof A && y instanceof A) {
          return EQ.value;
        }
        ;
        if (x instanceof A) {
          return LT.value;
        }
        ;
        if (y instanceof A) {
          return GT.value;
        }
        ;
        if (x instanceof B && y instanceof B) {
          return EQ.value;
        }
        ;
        if (x instanceof B) {
          return LT.value;
        }
        ;
        if (y instanceof B) {
          return GT.value;
        }
        ;
        if (x instanceof C && y instanceof C) {
          return EQ.value;
        }
        ;
        if (x instanceof C) {
          return LT.value;
        }
        ;
        if (y instanceof C) {
          return GT.value;
        }
        ;
        if (x instanceof D && y instanceof D) {
          return EQ.value;
        }
        ;
        if (x instanceof D) {
          return LT.value;
        }
        ;
        if (y instanceof D) {
          return GT.value;
        }
        ;
        if (x instanceof E && y instanceof E) {
          return EQ.value;
        }
        ;
        if (x instanceof E) {
          return LT.value;
        }
        ;
        if (y instanceof E) {
          return GT.value;
        }
        ;
        if (x instanceof F && y instanceof F) {
          return EQ.value;
        }
        ;
        if (x instanceof F) {
          return LT.value;
        }
        ;
        if (y instanceof F) {
          return GT.value;
        }
        ;
        if (x instanceof G && y instanceof G) {
          return EQ.value;
        }
        ;
        throw new Error("Failed pattern match at Data.Abc (line 289, column 1 - line 289, column 48): " + [x.constructor.name, y.constructor.name]);
      };
    },
    Eq0: function() {
      return eqPitchCLass;
    }
  };
  var eqMode = {
    eq: function(x) {
      return function(y) {
        if (x instanceof Major && y instanceof Major) {
          return true;
        }
        ;
        if (x instanceof Minor && y instanceof Minor) {
          return true;
        }
        ;
        if (x instanceof Ionian && y instanceof Ionian) {
          return true;
        }
        ;
        if (x instanceof Dorian && y instanceof Dorian) {
          return true;
        }
        ;
        if (x instanceof Phrygian && y instanceof Phrygian) {
          return true;
        }
        ;
        if (x instanceof Lydian && y instanceof Lydian) {
          return true;
        }
        ;
        if (x instanceof Mixolydian && y instanceof Mixolydian) {
          return true;
        }
        ;
        if (x instanceof Aeolian && y instanceof Aeolian) {
          return true;
        }
        ;
        if (x instanceof Locrian && y instanceof Locrian) {
          return true;
        }
        ;
        return false;
      };
    }
  };
  var eqAccidental = {
    eq: function(x) {
      return function(y) {
        if (x instanceof Sharp && y instanceof Sharp) {
          return true;
        }
        ;
        if (x instanceof Flat && y instanceof Flat) {
          return true;
        }
        ;
        if (x instanceof DoubleSharp && y instanceof DoubleSharp) {
          return true;
        }
        ;
        if (x instanceof DoubleFlat && y instanceof DoubleFlat) {
          return true;
        }
        ;
        if (x instanceof Natural && y instanceof Natural) {
          return true;
        }
        ;
        if (x instanceof Implicit && y instanceof Implicit) {
          return true;
        }
        ;
        return false;
      };
    }
  };
  var enumPitchClass = {
    succ: function(v) {
      if (v instanceof C) {
        return new Just(D.value);
      }
      ;
      if (v instanceof D) {
        return new Just(E.value);
      }
      ;
      if (v instanceof E) {
        return new Just(F.value);
      }
      ;
      if (v instanceof F) {
        return new Just(G.value);
      }
      ;
      if (v instanceof G) {
        return new Just(A.value);
      }
      ;
      if (v instanceof A) {
        return new Just(B.value);
      }
      ;
      if (v instanceof B) {
        return new Just(C.value);
      }
      ;
      throw new Error("Failed pattern match at Data.Abc (line 291, column 1 - line 306, column 18): " + [v.constructor.name]);
    },
    pred: function(v) {
      if (v instanceof C) {
        return new Just(B.value);
      }
      ;
      if (v instanceof D) {
        return new Just(C.value);
      }
      ;
      if (v instanceof E) {
        return new Just(D.value);
      }
      ;
      if (v instanceof F) {
        return new Just(E.value);
      }
      ;
      if (v instanceof G) {
        return new Just(F.value);
      }
      ;
      if (v instanceof A) {
        return new Just(G.value);
      }
      ;
      if (v instanceof B) {
        return new Just(A.value);
      }
      ;
      throw new Error("Failed pattern match at Data.Abc (line 291, column 1 - line 306, column 18): " + [v.constructor.name]);
    },
    Ord0: function() {
      return ordPitchCLass;
    }
  };

  // output/Data.Enum/foreign.js
  function toCharCode(c) {
    return c.charCodeAt(0);
  }
  function fromCharCode(c) {
    return String.fromCharCode(c);
  }

  // output/Data.Enum/index.js
  var toEnum = function(dict) {
    return dict.toEnum;
  };
  var succ = function(dict) {
    return dict.succ;
  };
  var pred = function(dict) {
    return dict.pred;
  };
  var fromEnum = function(dict) {
    return dict.fromEnum;
  };
  var toEnumWithDefaults = function(dictBoundedEnum) {
    return function(low) {
      return function(high) {
        return function(x) {
          var v = toEnum(dictBoundedEnum)(x);
          if (v instanceof Just) {
            return v.value0;
          }
          ;
          if (v instanceof Nothing) {
            var $54 = x < fromEnum(dictBoundedEnum)(bottom(dictBoundedEnum.Bounded0()));
            if ($54) {
              return low;
            }
            ;
            return high;
          }
          ;
          throw new Error("Failed pattern match at Data.Enum (line 158, column 33 - line 160, column 62): " + [v.constructor.name]);
        };
      };
    };
  };
  var defaultSucc = function(toEnum$prime) {
    return function(fromEnum$prime) {
      return function(a) {
        return toEnum$prime(fromEnum$prime(a) + 1 | 0);
      };
    };
  };
  var defaultPred = function(toEnum$prime) {
    return function(fromEnum$prime) {
      return function(a) {
        return toEnum$prime(fromEnum$prime(a) - 1 | 0);
      };
    };
  };
  var charToEnum = function(v) {
    if (v >= bottom(boundedInt) && v <= top(boundedInt)) {
      return new Just(fromCharCode(v));
    }
    ;
    return Nothing.value;
  };
  var enumChar = {
    succ: /* @__PURE__ */ defaultSucc(charToEnum)(toCharCode),
    pred: /* @__PURE__ */ defaultPred(charToEnum)(toCharCode),
    Ord0: function() {
      return ordChar;
    }
  };
  var boundedEnumChar = /* @__PURE__ */ function() {
    return {
      cardinality: toCharCode(top(boundedChar)) - toCharCode(bottom(boundedChar)) | 0,
      toEnum: charToEnum,
      fromEnum: toCharCode,
      Bounded0: function() {
        return boundedChar;
      },
      Enum1: function() {
        return enumChar;
      }
    };
  }();

  // output/Data.NonEmpty/index.js
  var NonEmpty = /* @__PURE__ */ function() {
    function NonEmpty2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    NonEmpty2.create = function(value0) {
      return function(value1) {
        return new NonEmpty2(value0, value1);
      };
    };
    return NonEmpty2;
  }();
  var unfoldable1NonEmpty = function(dictUnfoldable) {
    return {
      unfoldr1: function(f) {
        return function(b) {
          return uncurry(NonEmpty.create)(map(functorTuple)(unfoldr(dictUnfoldable)(map(functorMaybe)(f)))(f(b)));
        };
      }
    };
  };
  var singleton3 = function(dictPlus) {
    return function(a) {
      return new NonEmpty(a, empty(dictPlus));
    };
  };
  var functorNonEmpty = function(dictFunctor) {
    return {
      map: function(f) {
        return function(m) {
          return new NonEmpty(f(m.value0), map(dictFunctor)(f)(m.value1));
        };
      }
    };
  };
  var foldableNonEmpty = function(dictFoldable) {
    return {
      foldMap: function(dictMonoid) {
        return function(f) {
          return function(v) {
            return append(dictMonoid.Semigroup0())(f(v.value0))(foldMap(dictFoldable)(dictMonoid)(f)(v.value1));
          };
        };
      },
      foldl: function(f) {
        return function(b) {
          return function(v) {
            return foldl(dictFoldable)(f)(f(b)(v.value0))(v.value1);
          };
        };
      },
      foldr: function(f) {
        return function(b) {
          return function(v) {
            return f(v.value0)(foldr(dictFoldable)(f)(b)(v.value1));
          };
        };
      }
    };
  };
  var traversableNonEmpty = function(dictTraversable) {
    return {
      sequence: function(dictApplicative) {
        return function(v) {
          return apply(dictApplicative.Apply0())(map(dictApplicative.Apply0().Functor0())(NonEmpty.create)(v.value0))(sequence(dictTraversable)(dictApplicative)(v.value1));
        };
      },
      traverse: function(dictApplicative) {
        return function(f) {
          return function(v) {
            return apply(dictApplicative.Apply0())(map(dictApplicative.Apply0().Functor0())(NonEmpty.create)(f(v.value0)))(traverse(dictTraversable)(dictApplicative)(f)(v.value1));
          };
        };
      },
      Functor0: function() {
        return functorNonEmpty(dictTraversable.Functor0());
      },
      Foldable1: function() {
        return foldableNonEmpty(dictTraversable.Foldable1());
      }
    };
  };
  var foldable1NonEmpty = function(dictFoldable) {
    return {
      foldMap1: function(dictSemigroup) {
        return function(f) {
          return function(v) {
            return foldl(dictFoldable)(function(s) {
              return function(a1) {
                return append(dictSemigroup)(s)(f(a1));
              };
            })(f(v.value0))(v.value1);
          };
        };
      },
      foldr1: function(f) {
        return function(v) {
          return maybe(v.value0)(f(v.value0))(foldr(dictFoldable)(function(a1) {
            var $165 = maybe(a1)(f(a1));
            return function($166) {
              return Just.create($165($166));
            };
          })(Nothing.value)(v.value1));
        };
      },
      foldl1: function(f) {
        return function(v) {
          return foldl(dictFoldable)(f)(v.value0)(v.value1);
        };
      },
      Foldable0: function() {
        return foldableNonEmpty(dictFoldable);
      }
    };
  };

  // output/Data.List.Types/index.js
  var Nil = /* @__PURE__ */ function() {
    function Nil3() {
    }
    ;
    Nil3.value = new Nil3();
    return Nil3;
  }();
  var Cons = /* @__PURE__ */ function() {
    function Cons3(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Cons3.create = function(value0) {
      return function(value1) {
        return new Cons3(value0, value1);
      };
    };
    return Cons3;
  }();
  var NonEmptyList = function(x) {
    return x;
  };
  var nelCons = function(a) {
    return function(v) {
      return new NonEmpty(a, new Cons(v.value0, v.value1));
    };
  };
  var listMap = function(f) {
    var chunkedRevMap = function($copy_chunksAcc) {
      return function($copy_v) {
        var $tco_var_chunksAcc = $copy_chunksAcc;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(chunksAcc, v) {
          if (v instanceof Cons && (v.value1 instanceof Cons && v.value1.value1 instanceof Cons)) {
            $tco_var_chunksAcc = new Cons(v, chunksAcc);
            $copy_v = v.value1.value1.value1;
            return;
          }
          ;
          var unrolledMap = function(v1) {
            if (v1 instanceof Cons && (v1.value1 instanceof Cons && v1.value1.value1 instanceof Nil)) {
              return new Cons(f(v1.value0), new Cons(f(v1.value1.value0), Nil.value));
            }
            ;
            if (v1 instanceof Cons && v1.value1 instanceof Nil) {
              return new Cons(f(v1.value0), Nil.value);
            }
            ;
            return Nil.value;
          };
          var reverseUnrolledMap = function($copy_v1) {
            return function($copy_acc) {
              var $tco_var_v1 = $copy_v1;
              var $tco_done1 = false;
              var $tco_result2;
              function $tco_loop2(v1, acc) {
                if (v1 instanceof Cons && (v1.value0 instanceof Cons && (v1.value0.value1 instanceof Cons && v1.value0.value1.value1 instanceof Cons))) {
                  $tco_var_v1 = v1.value1;
                  $copy_acc = new Cons(f(v1.value0.value0), new Cons(f(v1.value0.value1.value0), new Cons(f(v1.value0.value1.value1.value0), acc)));
                  return;
                }
                ;
                $tco_done1 = true;
                return acc;
              }
              ;
              while (!$tco_done1) {
                $tco_result2 = $tco_loop2($tco_var_v1, $copy_acc);
              }
              ;
              return $tco_result2;
            };
          };
          $tco_done = true;
          return reverseUnrolledMap(chunksAcc)(unrolledMap(v));
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_chunksAcc, $copy_v);
        }
        ;
        return $tco_result;
      };
    };
    return chunkedRevMap(Nil.value);
  };
  var functorList = {
    map: listMap
  };
  var functorNonEmptyList = /* @__PURE__ */ functorNonEmpty(functorList);
  var foldableList = {
    foldr: function(f) {
      return function(b) {
        var rev = function() {
          var go = function($copy_acc) {
            return function($copy_v) {
              var $tco_var_acc = $copy_acc;
              var $tco_done = false;
              var $tco_result;
              function $tco_loop(acc, v) {
                if (v instanceof Nil) {
                  $tco_done = true;
                  return acc;
                }
                ;
                if (v instanceof Cons) {
                  $tco_var_acc = new Cons(v.value0, acc);
                  $copy_v = v.value1;
                  return;
                }
                ;
                throw new Error("Failed pattern match at Data.List.Types (line 107, column 7 - line 107, column 23): " + [acc.constructor.name, v.constructor.name]);
              }
              ;
              while (!$tco_done) {
                $tco_result = $tco_loop($tco_var_acc, $copy_v);
              }
              ;
              return $tco_result;
            };
          };
          return go(Nil.value);
        }();
        var $205 = foldl(foldableList)(flip(f))(b);
        return function($206) {
          return $205(rev($206));
        };
      };
    },
    foldl: function(f) {
      var go = function($copy_b) {
        return function($copy_v) {
          var $tco_var_b = $copy_b;
          var $tco_done1 = false;
          var $tco_result;
          function $tco_loop(b, v) {
            if (v instanceof Nil) {
              $tco_done1 = true;
              return b;
            }
            ;
            if (v instanceof Cons) {
              $tco_var_b = f(b)(v.value0);
              $copy_v = v.value1;
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.List.Types (line 111, column 12 - line 113, column 30): " + [v.constructor.name]);
          }
          ;
          while (!$tco_done1) {
            $tco_result = $tco_loop($tco_var_b, $copy_v);
          }
          ;
          return $tco_result;
        };
      };
      return go;
    },
    foldMap: function(dictMonoid) {
      return function(f) {
        return foldl(foldableList)(function(acc) {
          var $207 = append(dictMonoid.Semigroup0())(acc);
          return function($208) {
            return $207(f($208));
          };
        })(mempty(dictMonoid));
      };
    }
  };
  var foldableNonEmptyList = /* @__PURE__ */ foldableNonEmpty(foldableList);
  var semigroupList = {
    append: function(xs) {
      return function(ys) {
        return foldr(foldableList)(Cons.create)(ys)(xs);
      };
    }
  };
  var traversableList = {
    traverse: function(dictApplicative) {
      return function(f) {
        var $222 = map(dictApplicative.Apply0().Functor0())(foldl(foldableList)(flip(Cons.create))(Nil.value));
        var $223 = foldl(foldableList)(function(acc) {
          var $225 = lift2(dictApplicative.Apply0())(flip(Cons.create))(acc);
          return function($226) {
            return $225(f($226));
          };
        })(pure(dictApplicative)(Nil.value));
        return function($224) {
          return $222($223($224));
        };
      };
    },
    sequence: function(dictApplicative) {
      return traverse(traversableList)(dictApplicative)(identity(categoryFn));
    },
    Functor0: function() {
      return functorList;
    },
    Foldable1: function() {
      return foldableList;
    }
  };
  var traversableNonEmptyList = /* @__PURE__ */ traversableNonEmpty(traversableList);
  var unfoldable1List = {
    unfoldr1: function(f) {
      return function(b) {
        var go = function($copy_source) {
          return function($copy_memo) {
            var $tco_var_source = $copy_source;
            var $tco_done = false;
            var $tco_result;
            function $tco_loop(source3, memo) {
              var v = f(source3);
              if (v.value1 instanceof Just) {
                $tco_var_source = v.value1.value0;
                $copy_memo = new Cons(v.value0, memo);
                return;
              }
              ;
              if (v.value1 instanceof Nothing) {
                $tco_done = true;
                return foldl(foldableList)(flip(Cons.create))(Nil.value)(new Cons(v.value0, memo));
              }
              ;
              throw new Error("Failed pattern match at Data.List.Types (line 135, column 22 - line 137, column 61): " + [v.constructor.name]);
            }
            ;
            while (!$tco_done) {
              $tco_result = $tco_loop($tco_var_source, $copy_memo);
            }
            ;
            return $tco_result;
          };
        };
        return go(b)(Nil.value);
      };
    }
  };
  var unfoldableList = {
    unfoldr: function(f) {
      return function(b) {
        var go = function($copy_source) {
          return function($copy_memo) {
            var $tco_var_source = $copy_source;
            var $tco_done = false;
            var $tco_result;
            function $tco_loop(source3, memo) {
              var v = f(source3);
              if (v instanceof Nothing) {
                $tco_done = true;
                return foldl(foldableList)(flip(Cons.create))(Nil.value)(memo);
              }
              ;
              if (v instanceof Just) {
                $tco_var_source = v.value0.value1;
                $copy_memo = new Cons(v.value0.value0, memo);
                return;
              }
              ;
              throw new Error("Failed pattern match at Data.List.Types (line 142, column 22 - line 144, column 52): " + [v.constructor.name]);
            }
            ;
            while (!$tco_done) {
              $tco_result = $tco_loop($tco_var_source, $copy_memo);
            }
            ;
            return $tco_result;
          };
        };
        return go(b)(Nil.value);
      };
    },
    Unfoldable10: function() {
      return unfoldable1List;
    }
  };
  var unfoldable1NonEmptyList = /* @__PURE__ */ unfoldable1NonEmpty(unfoldableList);
  var foldable1NonEmptyList = /* @__PURE__ */ foldable1NonEmpty(foldableList);
  var applyList = {
    apply: function(v) {
      return function(v1) {
        if (v instanceof Nil) {
          return Nil.value;
        }
        ;
        if (v instanceof Cons) {
          return append(semigroupList)(map(functorList)(v.value0)(v1))(apply(applyList)(v.value1)(v1));
        }
        ;
        throw new Error("Failed pattern match at Data.List.Types (line 157, column 1 - line 159, column 48): " + [v.constructor.name, v1.constructor.name]);
      };
    },
    Functor0: function() {
      return functorList;
    }
  };
  var applyNonEmptyList = {
    apply: function(v) {
      return function(v1) {
        return new NonEmpty(v.value0(v1.value0), append(semigroupList)(apply(applyList)(v.value1)(new Cons(v1.value0, Nil.value)))(apply(applyList)(new Cons(v.value0, v.value1))(v1.value1)));
      };
    },
    Functor0: function() {
      return functorNonEmptyList;
    }
  };
  var altList = {
    alt: /* @__PURE__ */ append(semigroupList),
    Functor0: function() {
      return functorList;
    }
  };
  var plusList = /* @__PURE__ */ function() {
    return {
      empty: Nil.value,
      Alt0: function() {
        return altList;
      }
    };
  }();
  var applicativeNonEmptyList = {
    pure: /* @__PURE__ */ function() {
      var $236 = singleton3(plusList);
      return function($237) {
        return NonEmptyList($236($237));
      };
    }(),
    Apply0: function() {
      return applyNonEmptyList;
    }
  };
  var traversable1NonEmptyList = {
    traverse1: function(dictApply) {
      return function(f) {
        return function(v) {
          return mapFlipped(dictApply.Functor0())(foldl(foldableList)(function(acc) {
            var $238 = lift2(dictApply)(flip(nelCons))(acc);
            return function($239) {
              return $238(f($239));
            };
          })(map(dictApply.Functor0())(pure(applicativeNonEmptyList))(f(v.value0)))(v.value1))(function(v1) {
            return foldl(foldableList)(flip(nelCons))(pure(applicativeNonEmptyList)(v1.value0))(v1.value1);
          });
        };
      };
    },
    sequence1: function(dictApply) {
      return traverse1(traversable1NonEmptyList)(dictApply)(identity(categoryFn));
    },
    Foldable10: function() {
      return foldable1NonEmptyList;
    },
    Traversable1: function() {
      return traversableNonEmptyList;
    }
  };

  // output/Data.List/index.js
  var uncons = function(v) {
    if (v instanceof Nil) {
      return Nothing.value;
    }
    ;
    if (v instanceof Cons) {
      return new Just({
        head: v.value0,
        tail: v.value1
      });
    }
    ;
    throw new Error("Failed pattern match at Data.List (line 259, column 1 - line 259, column 66): " + [v.constructor.name]);
  };
  var toUnfoldable2 = function(dictUnfoldable) {
    return unfoldr(dictUnfoldable)(function(xs) {
      return map(functorMaybe)(function(rec) {
        return new Tuple(rec.head, rec.tail);
      })(uncons(xs));
    });
  };
  var snoc2 = function(xs) {
    return function(x) {
      return foldr(foldableList)(Cons.create)(new Cons(x, Nil.value))(xs);
    };
  };
  var singleton4 = function(a) {
    return new Cons(a, Nil.value);
  };
  var reverse2 = /* @__PURE__ */ function() {
    var go = function($copy_acc) {
      return function($copy_v) {
        var $tco_var_acc = $copy_acc;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(acc, v) {
          if (v instanceof Nil) {
            $tco_done = true;
            return acc;
          }
          ;
          if (v instanceof Cons) {
            $tco_var_acc = new Cons(v.value0, acc);
            $copy_v = v.value1;
            return;
          }
          ;
          throw new Error("Failed pattern match at Data.List (line 368, column 3 - line 368, column 19): " + [acc.constructor.name, v.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_acc, $copy_v);
        }
        ;
        return $tco_result;
      };
    };
    return go(Nil.value);
  }();
  var $$null2 = function(v) {
    if (v instanceof Nil) {
      return true;
    }
    ;
    return false;
  };
  var manyRec = function(dictMonadRec) {
    return function(dictAlternative) {
      return function(p) {
        var go = function(acc) {
          return bind(dictMonadRec.Monad0().Bind1())(alt(dictAlternative.Plus1().Alt0())(map(dictAlternative.Plus1().Alt0().Functor0())(Loop.create)(p))(pure(dictAlternative.Applicative0())(new Done(unit))))(function(aa) {
            return pure(dictAlternative.Applicative0())(bimap(bifunctorStep)(function(v) {
              return new Cons(v, acc);
            })(function(v) {
              return reverse2(acc);
            })(aa));
          });
        };
        return tailRecM(dictMonadRec)(go)(Nil.value);
      };
    };
  };
  var length2 = /* @__PURE__ */ foldl(foldableList)(function(acc) {
    return function(v) {
      return acc + 1 | 0;
    };
  })(0);
  var head2 = function(v) {
    if (v instanceof Nil) {
      return Nothing.value;
    }
    ;
    if (v instanceof Cons) {
      return new Just(v.value0);
    }
    ;
    throw new Error("Failed pattern match at Data.List (line 230, column 1 - line 230, column 22): " + [v.constructor.name]);
  };
  var filter2 = function(p) {
    var go = function($copy_acc) {
      return function($copy_v) {
        var $tco_var_acc = $copy_acc;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(acc, v) {
          if (v instanceof Nil) {
            $tco_done = true;
            return reverse2(acc);
          }
          ;
          if (v instanceof Cons) {
            if (p(v.value0)) {
              $tco_var_acc = new Cons(v.value0, acc);
              $copy_v = v.value1;
              return;
            }
            ;
            if (otherwise) {
              $tco_var_acc = acc;
              $copy_v = v.value1;
              return;
            }
            ;
          }
          ;
          throw new Error("Failed pattern match at Data.List (line 390, column 3 - line 390, column 27): " + [acc.constructor.name, v.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_acc, $copy_v);
        }
        ;
        return $tco_result;
      };
    };
    return go(Nil.value);
  };

  // output/Partial.Unsafe/foreign.js
  var _unsafePartial = function(f) {
    return f();
  };

  // output/Partial/foreign.js
  var _crashWith = function(msg) {
    throw new Error(msg);
  };

  // output/Partial/index.js
  var crashWith = function() {
    return _crashWith;
  };

  // output/Partial.Unsafe/index.js
  var unsafePartial = _unsafePartial;
  var unsafeCrashWith = function(msg) {
    return unsafePartial(function() {
      return crashWith()(msg);
    });
  };

  // output/Data.Map.Internal/index.js
  var Leaf = /* @__PURE__ */ function() {
    function Leaf2() {
    }
    ;
    Leaf2.value = new Leaf2();
    return Leaf2;
  }();
  var Two = /* @__PURE__ */ function() {
    function Two2(value0, value1, value2, value3) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value2;
      this.value3 = value3;
    }
    ;
    Two2.create = function(value0) {
      return function(value1) {
        return function(value2) {
          return function(value3) {
            return new Two2(value0, value1, value2, value3);
          };
        };
      };
    };
    return Two2;
  }();
  var Three = /* @__PURE__ */ function() {
    function Three2(value0, value1, value2, value3, value4, value5, value6) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value2;
      this.value3 = value3;
      this.value4 = value4;
      this.value5 = value5;
      this.value6 = value6;
    }
    ;
    Three2.create = function(value0) {
      return function(value1) {
        return function(value2) {
          return function(value3) {
            return function(value4) {
              return function(value5) {
                return function(value6) {
                  return new Three2(value0, value1, value2, value3, value4, value5, value6);
                };
              };
            };
          };
        };
      };
    };
    return Three2;
  }();
  var TwoLeft = /* @__PURE__ */ function() {
    function TwoLeft2(value0, value1, value2) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value2;
    }
    ;
    TwoLeft2.create = function(value0) {
      return function(value1) {
        return function(value2) {
          return new TwoLeft2(value0, value1, value2);
        };
      };
    };
    return TwoLeft2;
  }();
  var TwoRight = /* @__PURE__ */ function() {
    function TwoRight2(value0, value1, value2) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value2;
    }
    ;
    TwoRight2.create = function(value0) {
      return function(value1) {
        return function(value2) {
          return new TwoRight2(value0, value1, value2);
        };
      };
    };
    return TwoRight2;
  }();
  var ThreeLeft = /* @__PURE__ */ function() {
    function ThreeLeft2(value0, value1, value2, value3, value4, value5) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value2;
      this.value3 = value3;
      this.value4 = value4;
      this.value5 = value5;
    }
    ;
    ThreeLeft2.create = function(value0) {
      return function(value1) {
        return function(value2) {
          return function(value3) {
            return function(value4) {
              return function(value5) {
                return new ThreeLeft2(value0, value1, value2, value3, value4, value5);
              };
            };
          };
        };
      };
    };
    return ThreeLeft2;
  }();
  var ThreeMiddle = /* @__PURE__ */ function() {
    function ThreeMiddle2(value0, value1, value2, value3, value4, value5) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value2;
      this.value3 = value3;
      this.value4 = value4;
      this.value5 = value5;
    }
    ;
    ThreeMiddle2.create = function(value0) {
      return function(value1) {
        return function(value2) {
          return function(value3) {
            return function(value4) {
              return function(value5) {
                return new ThreeMiddle2(value0, value1, value2, value3, value4, value5);
              };
            };
          };
        };
      };
    };
    return ThreeMiddle2;
  }();
  var ThreeRight = /* @__PURE__ */ function() {
    function ThreeRight2(value0, value1, value2, value3, value4, value5) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value2;
      this.value3 = value3;
      this.value4 = value4;
      this.value5 = value5;
    }
    ;
    ThreeRight2.create = function(value0) {
      return function(value1) {
        return function(value2) {
          return function(value3) {
            return function(value4) {
              return function(value5) {
                return new ThreeRight2(value0, value1, value2, value3, value4, value5);
              };
            };
          };
        };
      };
    };
    return ThreeRight2;
  }();
  var KickUp = /* @__PURE__ */ function() {
    function KickUp2(value0, value1, value2, value3) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value2;
      this.value3 = value3;
    }
    ;
    KickUp2.create = function(value0) {
      return function(value1) {
        return function(value2) {
          return function(value3) {
            return new KickUp2(value0, value1, value2, value3);
          };
        };
      };
    };
    return KickUp2;
  }();
  var singleton5 = function(k) {
    return function(v) {
      return new Two(Leaf.value, k, v, Leaf.value);
    };
  };
  var toUnfoldable3 = function(dictUnfoldable) {
    return function(m) {
      var go = function($copy_v) {
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(v) {
          if (v instanceof Nil) {
            $tco_done = true;
            return Nothing.value;
          }
          ;
          if (v instanceof Cons) {
            if (v.value0 instanceof Leaf) {
              $copy_v = v.value1;
              return;
            }
            ;
            if (v.value0 instanceof Two && (v.value0.value0 instanceof Leaf && v.value0.value3 instanceof Leaf)) {
              $tco_done = true;
              return new Just(new Tuple(new Tuple(v.value0.value1, v.value0.value2), v.value1));
            }
            ;
            if (v.value0 instanceof Two && v.value0.value0 instanceof Leaf) {
              $tco_done = true;
              return new Just(new Tuple(new Tuple(v.value0.value1, v.value0.value2), new Cons(v.value0.value3, v.value1)));
            }
            ;
            if (v.value0 instanceof Two) {
              $copy_v = new Cons(v.value0.value0, new Cons(singleton5(v.value0.value1)(v.value0.value2), new Cons(v.value0.value3, v.value1)));
              return;
            }
            ;
            if (v.value0 instanceof Three) {
              $copy_v = new Cons(v.value0.value0, new Cons(singleton5(v.value0.value1)(v.value0.value2), new Cons(v.value0.value3, new Cons(singleton5(v.value0.value4)(v.value0.value5), new Cons(v.value0.value6, v.value1)))));
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 624, column 18 - line 633, column 71): " + [v.value0.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 623, column 3 - line 623, column 19): " + [v.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($copy_v);
        }
        ;
        return $tco_result;
      };
      return unfoldr(dictUnfoldable)(go)(new Cons(m, Nil.value));
    };
  };
  var lookup = function(dictOrd) {
    return function(k) {
      var comp = compare(dictOrd);
      var go = function($copy_v) {
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(v) {
          if (v instanceof Leaf) {
            $tco_done = true;
            return Nothing.value;
          }
          ;
          if (v instanceof Two) {
            var v2 = comp(k)(v.value1);
            if (v2 instanceof EQ) {
              $tco_done = true;
              return new Just(v.value2);
            }
            ;
            if (v2 instanceof LT) {
              $copy_v = v.value0;
              return;
            }
            ;
            $copy_v = v.value3;
            return;
          }
          ;
          if (v instanceof Three) {
            var v3 = comp(k)(v.value1);
            if (v3 instanceof EQ) {
              $tco_done = true;
              return new Just(v.value2);
            }
            ;
            var v4 = comp(k)(v.value4);
            if (v4 instanceof EQ) {
              $tco_done = true;
              return new Just(v.value5);
            }
            ;
            if (v3 instanceof LT) {
              $copy_v = v.value0;
              return;
            }
            ;
            if (v4 instanceof GT) {
              $copy_v = v.value6;
              return;
            }
            ;
            $copy_v = v.value3;
            return;
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 241, column 5 - line 241, column 22): " + [v.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($copy_v);
        }
        ;
        return $tco_result;
      };
      return go;
    };
  };
  var functorMap = {
    map: function(v) {
      return function(v1) {
        if (v1 instanceof Leaf) {
          return Leaf.value;
        }
        ;
        if (v1 instanceof Two) {
          return new Two(map(functorMap)(v)(v1.value0), v1.value1, v(v1.value2), map(functorMap)(v)(v1.value3));
        }
        ;
        if (v1 instanceof Three) {
          return new Three(map(functorMap)(v)(v1.value0), v1.value1, v(v1.value2), map(functorMap)(v)(v1.value3), v1.value4, v(v1.value5), map(functorMap)(v)(v1.value6));
        }
        ;
        throw new Error("Failed pattern match at Data.Map.Internal (line 116, column 1 - line 119, column 110): " + [v.constructor.name, v1.constructor.name]);
      };
    }
  };
  var fromZipper = function($copy_dictOrd) {
    return function($copy_v) {
      return function($copy_tree) {
        var $tco_var_dictOrd = $copy_dictOrd;
        var $tco_var_v = $copy_v;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(dictOrd, v, tree) {
          if (v instanceof Nil) {
            $tco_done = true;
            return tree;
          }
          ;
          if (v instanceof Cons) {
            if (v.value0 instanceof TwoLeft) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v.value1;
              $copy_tree = new Two(tree, v.value0.value0, v.value0.value1, v.value0.value2);
              return;
            }
            ;
            if (v.value0 instanceof TwoRight) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v.value1;
              $copy_tree = new Two(v.value0.value0, v.value0.value1, v.value0.value2, tree);
              return;
            }
            ;
            if (v.value0 instanceof ThreeLeft) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v.value1;
              $copy_tree = new Three(tree, v.value0.value0, v.value0.value1, v.value0.value2, v.value0.value3, v.value0.value4, v.value0.value5);
              return;
            }
            ;
            if (v.value0 instanceof ThreeMiddle) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v.value1;
              $copy_tree = new Three(v.value0.value0, v.value0.value1, v.value0.value2, tree, v.value0.value3, v.value0.value4, v.value0.value5);
              return;
            }
            ;
            if (v.value0 instanceof ThreeRight) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v.value1;
              $copy_tree = new Three(v.value0.value0, v.value0.value1, v.value0.value2, v.value0.value3, v.value0.value4, v.value0.value5, tree);
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 462, column 3 - line 467, column 88): " + [v.value0.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 459, column 1 - line 459, column 80): " + [v.constructor.name, tree.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_dictOrd, $tco_var_v, $copy_tree);
        }
        ;
        return $tco_result;
      };
    };
  };
  var insert = function(dictOrd) {
    return function(k) {
      return function(v) {
        var up = function($copy_v1) {
          return function($copy_v2) {
            var $tco_var_v1 = $copy_v1;
            var $tco_done = false;
            var $tco_result;
            function $tco_loop(v1, v2) {
              if (v1 instanceof Nil) {
                $tco_done = true;
                return new Two(v2.value0, v2.value1, v2.value2, v2.value3);
              }
              ;
              if (v1 instanceof Cons) {
                if (v1.value0 instanceof TwoLeft) {
                  $tco_done = true;
                  return fromZipper(dictOrd)(v1.value1)(new Three(v2.value0, v2.value1, v2.value2, v2.value3, v1.value0.value0, v1.value0.value1, v1.value0.value2));
                }
                ;
                if (v1.value0 instanceof TwoRight) {
                  $tco_done = true;
                  return fromZipper(dictOrd)(v1.value1)(new Three(v1.value0.value0, v1.value0.value1, v1.value0.value2, v2.value0, v2.value1, v2.value2, v2.value3));
                }
                ;
                if (v1.value0 instanceof ThreeLeft) {
                  $tco_var_v1 = v1.value1;
                  $copy_v2 = new KickUp(new Two(v2.value0, v2.value1, v2.value2, v2.value3), v1.value0.value0, v1.value0.value1, new Two(v1.value0.value2, v1.value0.value3, v1.value0.value4, v1.value0.value5));
                  return;
                }
                ;
                if (v1.value0 instanceof ThreeMiddle) {
                  $tco_var_v1 = v1.value1;
                  $copy_v2 = new KickUp(new Two(v1.value0.value0, v1.value0.value1, v1.value0.value2, v2.value0), v2.value1, v2.value2, new Two(v2.value3, v1.value0.value3, v1.value0.value4, v1.value0.value5));
                  return;
                }
                ;
                if (v1.value0 instanceof ThreeRight) {
                  $tco_var_v1 = v1.value1;
                  $copy_v2 = new KickUp(new Two(v1.value0.value0, v1.value0.value1, v1.value0.value2, v1.value0.value3), v1.value0.value4, v1.value0.value5, new Two(v2.value0, v2.value1, v2.value2, v2.value3));
                  return;
                }
                ;
                throw new Error("Failed pattern match at Data.Map.Internal (line 498, column 5 - line 503, column 108): " + [v1.value0.constructor.name, v2.constructor.name]);
              }
              ;
              throw new Error("Failed pattern match at Data.Map.Internal (line 495, column 3 - line 495, column 56): " + [v1.constructor.name, v2.constructor.name]);
            }
            ;
            while (!$tco_done) {
              $tco_result = $tco_loop($tco_var_v1, $copy_v2);
            }
            ;
            return $tco_result;
          };
        };
        var comp = compare(dictOrd);
        var down = function($copy_ctx) {
          return function($copy_v1) {
            var $tco_var_ctx = $copy_ctx;
            var $tco_done1 = false;
            var $tco_result;
            function $tco_loop(ctx, v1) {
              if (v1 instanceof Leaf) {
                $tco_done1 = true;
                return up(ctx)(new KickUp(Leaf.value, k, v, Leaf.value));
              }
              ;
              if (v1 instanceof Two) {
                var v2 = comp(k)(v1.value1);
                if (v2 instanceof EQ) {
                  $tco_done1 = true;
                  return fromZipper(dictOrd)(ctx)(new Two(v1.value0, k, v, v1.value3));
                }
                ;
                if (v2 instanceof LT) {
                  $tco_var_ctx = new Cons(new TwoLeft(v1.value1, v1.value2, v1.value3), ctx);
                  $copy_v1 = v1.value0;
                  return;
                }
                ;
                $tco_var_ctx = new Cons(new TwoRight(v1.value0, v1.value1, v1.value2), ctx);
                $copy_v1 = v1.value3;
                return;
              }
              ;
              if (v1 instanceof Three) {
                var v3 = comp(k)(v1.value1);
                if (v3 instanceof EQ) {
                  $tco_done1 = true;
                  return fromZipper(dictOrd)(ctx)(new Three(v1.value0, k, v, v1.value3, v1.value4, v1.value5, v1.value6));
                }
                ;
                var v4 = comp(k)(v1.value4);
                if (v4 instanceof EQ) {
                  $tco_done1 = true;
                  return fromZipper(dictOrd)(ctx)(new Three(v1.value0, v1.value1, v1.value2, v1.value3, k, v, v1.value6));
                }
                ;
                if (v3 instanceof LT) {
                  $tco_var_ctx = new Cons(new ThreeLeft(v1.value1, v1.value2, v1.value3, v1.value4, v1.value5, v1.value6), ctx);
                  $copy_v1 = v1.value0;
                  return;
                }
                ;
                if (v3 instanceof GT && v4 instanceof LT) {
                  $tco_var_ctx = new Cons(new ThreeMiddle(v1.value0, v1.value1, v1.value2, v1.value4, v1.value5, v1.value6), ctx);
                  $copy_v1 = v1.value3;
                  return;
                }
                ;
                $tco_var_ctx = new Cons(new ThreeRight(v1.value0, v1.value1, v1.value2, v1.value3, v1.value4, v1.value5), ctx);
                $copy_v1 = v1.value6;
                return;
              }
              ;
              throw new Error("Failed pattern match at Data.Map.Internal (line 478, column 3 - line 478, column 55): " + [ctx.constructor.name, v1.constructor.name]);
            }
            ;
            while (!$tco_done1) {
              $tco_result = $tco_loop($tco_var_ctx, $copy_v1);
            }
            ;
            return $tco_result;
          };
        };
        return down(Nil.value);
      };
    };
  };
  var pop = function(dictOrd) {
    return function(k) {
      var up = function($copy_ctxs) {
        return function($copy_tree) {
          var $tco_var_ctxs = $copy_ctxs;
          var $tco_done = false;
          var $tco_result;
          function $tco_loop(ctxs, tree) {
            if (ctxs instanceof Nil) {
              $tco_done = true;
              return tree;
            }
            ;
            if (ctxs instanceof Cons) {
              if (ctxs.value0 instanceof TwoLeft && (ctxs.value0.value2 instanceof Leaf && tree instanceof Leaf)) {
                $tco_done = true;
                return fromZipper(dictOrd)(ctxs.value1)(new Two(Leaf.value, ctxs.value0.value0, ctxs.value0.value1, Leaf.value));
              }
              ;
              if (ctxs.value0 instanceof TwoRight && (ctxs.value0.value0 instanceof Leaf && tree instanceof Leaf)) {
                $tco_done = true;
                return fromZipper(dictOrd)(ctxs.value1)(new Two(Leaf.value, ctxs.value0.value1, ctxs.value0.value2, Leaf.value));
              }
              ;
              if (ctxs.value0 instanceof TwoLeft && ctxs.value0.value2 instanceof Two) {
                $tco_var_ctxs = ctxs.value1;
                $copy_tree = new Three(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0, ctxs.value0.value2.value1, ctxs.value0.value2.value2, ctxs.value0.value2.value3);
                return;
              }
              ;
              if (ctxs.value0 instanceof TwoRight && ctxs.value0.value0 instanceof Two) {
                $tco_var_ctxs = ctxs.value1;
                $copy_tree = new Three(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3, ctxs.value0.value1, ctxs.value0.value2, tree);
                return;
              }
              ;
              if (ctxs.value0 instanceof TwoLeft && ctxs.value0.value2 instanceof Three) {
                $tco_done = true;
                return fromZipper(dictOrd)(ctxs.value1)(new Two(new Two(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0), ctxs.value0.value2.value1, ctxs.value0.value2.value2, new Two(ctxs.value0.value2.value3, ctxs.value0.value2.value4, ctxs.value0.value2.value5, ctxs.value0.value2.value6)));
              }
              ;
              if (ctxs.value0 instanceof TwoRight && ctxs.value0.value0 instanceof Three) {
                $tco_done = true;
                return fromZipper(dictOrd)(ctxs.value1)(new Two(new Two(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3), ctxs.value0.value0.value4, ctxs.value0.value0.value5, new Two(ctxs.value0.value0.value6, ctxs.value0.value1, ctxs.value0.value2, tree)));
              }
              ;
              if (ctxs.value0 instanceof ThreeLeft && (ctxs.value0.value2 instanceof Leaf && (ctxs.value0.value5 instanceof Leaf && tree instanceof Leaf))) {
                $tco_done = true;
                return fromZipper(dictOrd)(ctxs.value1)(new Three(Leaf.value, ctxs.value0.value0, ctxs.value0.value1, Leaf.value, ctxs.value0.value3, ctxs.value0.value4, Leaf.value));
              }
              ;
              if (ctxs.value0 instanceof ThreeMiddle && (ctxs.value0.value0 instanceof Leaf && (ctxs.value0.value5 instanceof Leaf && tree instanceof Leaf))) {
                $tco_done = true;
                return fromZipper(dictOrd)(ctxs.value1)(new Three(Leaf.value, ctxs.value0.value1, ctxs.value0.value2, Leaf.value, ctxs.value0.value3, ctxs.value0.value4, Leaf.value));
              }
              ;
              if (ctxs.value0 instanceof ThreeRight && (ctxs.value0.value0 instanceof Leaf && (ctxs.value0.value3 instanceof Leaf && tree instanceof Leaf))) {
                $tco_done = true;
                return fromZipper(dictOrd)(ctxs.value1)(new Three(Leaf.value, ctxs.value0.value1, ctxs.value0.value2, Leaf.value, ctxs.value0.value4, ctxs.value0.value5, Leaf.value));
              }
              ;
              if (ctxs.value0 instanceof ThreeLeft && ctxs.value0.value2 instanceof Two) {
                $tco_done = true;
                return fromZipper(dictOrd)(ctxs.value1)(new Two(new Three(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0, ctxs.value0.value2.value1, ctxs.value0.value2.value2, ctxs.value0.value2.value3), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
              }
              ;
              if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value0 instanceof Two) {
                $tco_done = true;
                return fromZipper(dictOrd)(ctxs.value1)(new Two(new Three(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3, ctxs.value0.value1, ctxs.value0.value2, tree), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
              }
              ;
              if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value5 instanceof Two) {
                $tco_done = true;
                return fromZipper(dictOrd)(ctxs.value1)(new Two(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Three(tree, ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5.value0, ctxs.value0.value5.value1, ctxs.value0.value5.value2, ctxs.value0.value5.value3)));
              }
              ;
              if (ctxs.value0 instanceof ThreeRight && ctxs.value0.value3 instanceof Two) {
                $tco_done = true;
                return fromZipper(dictOrd)(ctxs.value1)(new Two(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Three(ctxs.value0.value3.value0, ctxs.value0.value3.value1, ctxs.value0.value3.value2, ctxs.value0.value3.value3, ctxs.value0.value4, ctxs.value0.value5, tree)));
              }
              ;
              if (ctxs.value0 instanceof ThreeLeft && ctxs.value0.value2 instanceof Three) {
                $tco_done = true;
                return fromZipper(dictOrd)(ctxs.value1)(new Three(new Two(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0), ctxs.value0.value2.value1, ctxs.value0.value2.value2, new Two(ctxs.value0.value2.value3, ctxs.value0.value2.value4, ctxs.value0.value2.value5, ctxs.value0.value2.value6), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
              }
              ;
              if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value0 instanceof Three) {
                $tco_done = true;
                return fromZipper(dictOrd)(ctxs.value1)(new Three(new Two(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3), ctxs.value0.value0.value4, ctxs.value0.value0.value5, new Two(ctxs.value0.value0.value6, ctxs.value0.value1, ctxs.value0.value2, tree), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
              }
              ;
              if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value5 instanceof Three) {
                $tco_done = true;
                return fromZipper(dictOrd)(ctxs.value1)(new Three(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Two(tree, ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5.value0), ctxs.value0.value5.value1, ctxs.value0.value5.value2, new Two(ctxs.value0.value5.value3, ctxs.value0.value5.value4, ctxs.value0.value5.value5, ctxs.value0.value5.value6)));
              }
              ;
              if (ctxs.value0 instanceof ThreeRight && ctxs.value0.value3 instanceof Three) {
                $tco_done = true;
                return fromZipper(dictOrd)(ctxs.value1)(new Three(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Two(ctxs.value0.value3.value0, ctxs.value0.value3.value1, ctxs.value0.value3.value2, ctxs.value0.value3.value3), ctxs.value0.value3.value4, ctxs.value0.value3.value5, new Two(ctxs.value0.value3.value6, ctxs.value0.value4, ctxs.value0.value5, tree)));
              }
              ;
              $tco_done = true;
              return unsafeCrashWith("The impossible happened in partial function `up`.");
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 552, column 5 - line 573, column 86): " + [ctxs.constructor.name]);
          }
          ;
          while (!$tco_done) {
            $tco_result = $tco_loop($tco_var_ctxs, $copy_tree);
          }
          ;
          return $tco_result;
        };
      };
      var removeMaxNode = function($copy_ctx) {
        return function($copy_m) {
          var $tco_var_ctx = $copy_ctx;
          var $tco_done1 = false;
          var $tco_result;
          function $tco_loop(ctx, m) {
            if (m instanceof Two && (m.value0 instanceof Leaf && m.value3 instanceof Leaf)) {
              $tco_done1 = true;
              return up(ctx)(Leaf.value);
            }
            ;
            if (m instanceof Two) {
              $tco_var_ctx = new Cons(new TwoRight(m.value0, m.value1, m.value2), ctx);
              $copy_m = m.value3;
              return;
            }
            ;
            if (m instanceof Three && (m.value0 instanceof Leaf && (m.value3 instanceof Leaf && m.value6 instanceof Leaf))) {
              $tco_done1 = true;
              return up(new Cons(new TwoRight(Leaf.value, m.value1, m.value2), ctx))(Leaf.value);
            }
            ;
            if (m instanceof Three) {
              $tco_var_ctx = new Cons(new ThreeRight(m.value0, m.value1, m.value2, m.value3, m.value4, m.value5), ctx);
              $copy_m = m.value6;
              return;
            }
            ;
            $tco_done1 = true;
            return unsafeCrashWith("The impossible happened in partial function `removeMaxNode`.");
          }
          ;
          while (!$tco_done1) {
            $tco_result = $tco_loop($tco_var_ctx, $copy_m);
          }
          ;
          return $tco_result;
        };
      };
      var maxNode = function($copy_m) {
        var $tco_done2 = false;
        var $tco_result;
        function $tco_loop(m) {
          if (m instanceof Two && m.value3 instanceof Leaf) {
            $tco_done2 = true;
            return {
              key: m.value1,
              value: m.value2
            };
          }
          ;
          if (m instanceof Two) {
            $copy_m = m.value3;
            return;
          }
          ;
          if (m instanceof Three && m.value6 instanceof Leaf) {
            $tco_done2 = true;
            return {
              key: m.value4,
              value: m.value5
            };
          }
          ;
          if (m instanceof Three) {
            $copy_m = m.value6;
            return;
          }
          ;
          $tco_done2 = true;
          return unsafeCrashWith("The impossible happened in partial function `maxNode`.");
        }
        ;
        while (!$tco_done2) {
          $tco_result = $tco_loop($copy_m);
        }
        ;
        return $tco_result;
      };
      var comp = compare(dictOrd);
      var down = function($copy_ctx) {
        return function($copy_m) {
          var $tco_var_ctx = $copy_ctx;
          var $tco_done3 = false;
          var $tco_result;
          function $tco_loop(ctx, m) {
            if (m instanceof Leaf) {
              $tco_done3 = true;
              return Nothing.value;
            }
            ;
            if (m instanceof Two) {
              var v = comp(k)(m.value1);
              if (m.value3 instanceof Leaf && v instanceof EQ) {
                $tco_done3 = true;
                return new Just(new Tuple(m.value2, up(ctx)(Leaf.value)));
              }
              ;
              if (v instanceof EQ) {
                var max3 = maxNode(m.value0);
                $tco_done3 = true;
                return new Just(new Tuple(m.value2, removeMaxNode(new Cons(new TwoLeft(max3.key, max3.value, m.value3), ctx))(m.value0)));
              }
              ;
              if (v instanceof LT) {
                $tco_var_ctx = new Cons(new TwoLeft(m.value1, m.value2, m.value3), ctx);
                $copy_m = m.value0;
                return;
              }
              ;
              $tco_var_ctx = new Cons(new TwoRight(m.value0, m.value1, m.value2), ctx);
              $copy_m = m.value3;
              return;
            }
            ;
            if (m instanceof Three) {
              var leaves = function() {
                if (m.value0 instanceof Leaf && (m.value3 instanceof Leaf && m.value6 instanceof Leaf)) {
                  return true;
                }
                ;
                return false;
              }();
              var v = comp(k)(m.value4);
              var v3 = comp(k)(m.value1);
              if (leaves && v3 instanceof EQ) {
                $tco_done3 = true;
                return new Just(new Tuple(m.value2, fromZipper(dictOrd)(ctx)(new Two(Leaf.value, m.value4, m.value5, Leaf.value))));
              }
              ;
              if (leaves && v instanceof EQ) {
                $tco_done3 = true;
                return new Just(new Tuple(m.value5, fromZipper(dictOrd)(ctx)(new Two(Leaf.value, m.value1, m.value2, Leaf.value))));
              }
              ;
              if (v3 instanceof EQ) {
                var max3 = maxNode(m.value0);
                $tco_done3 = true;
                return new Just(new Tuple(m.value2, removeMaxNode(new Cons(new ThreeLeft(max3.key, max3.value, m.value3, m.value4, m.value5, m.value6), ctx))(m.value0)));
              }
              ;
              if (v instanceof EQ) {
                var max3 = maxNode(m.value3);
                $tco_done3 = true;
                return new Just(new Tuple(m.value5, removeMaxNode(new Cons(new ThreeMiddle(m.value0, m.value1, m.value2, max3.key, max3.value, m.value6), ctx))(m.value3)));
              }
              ;
              if (v3 instanceof LT) {
                $tco_var_ctx = new Cons(new ThreeLeft(m.value1, m.value2, m.value3, m.value4, m.value5, m.value6), ctx);
                $copy_m = m.value0;
                return;
              }
              ;
              if (v3 instanceof GT && v instanceof LT) {
                $tco_var_ctx = new Cons(new ThreeMiddle(m.value0, m.value1, m.value2, m.value4, m.value5, m.value6), ctx);
                $copy_m = m.value3;
                return;
              }
              ;
              $tco_var_ctx = new Cons(new ThreeRight(m.value0, m.value1, m.value2, m.value3, m.value4, m.value5), ctx);
              $copy_m = m.value6;
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 525, column 16 - line 548, column 80): " + [m.constructor.name]);
          }
          ;
          while (!$tco_done3) {
            $tco_result = $tco_loop($tco_var_ctx, $copy_m);
          }
          ;
          return $tco_result;
        };
      };
      return down(Nil.value);
    };
  };
  var empty2 = /* @__PURE__ */ function() {
    return Leaf.value;
  }();
  var fromFoldable2 = function(dictOrd) {
    return function(dictFoldable) {
      return foldl(dictFoldable)(function(m) {
        return function(v) {
          return insert(dictOrd)(v.value0)(v.value1)(m);
        };
      })(empty2);
    };
  };
  var $$delete = function(dictOrd) {
    return function(k) {
      return function(m) {
        return maybe(m)(snd)(pop(dictOrd)(k)(m));
      };
    };
  };
  var alter = function(dictOrd) {
    return function(f) {
      return function(k) {
        return function(m) {
          var v = f(lookup(dictOrd)(k)(m));
          if (v instanceof Nothing) {
            return $$delete(dictOrd)(k)(m);
          }
          ;
          if (v instanceof Just) {
            return insert(dictOrd)(k)(v.value0)(m);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 596, column 15 - line 598, column 25): " + [v.constructor.name]);
        };
      };
    };
  };
  var update = function(dictOrd) {
    return function(f) {
      return function(k) {
        return function(m) {
          return alter(dictOrd)(maybe(Nothing.value)(f))(k)(m);
        };
      };
    };
  };

  // output/Data.Abc.KeySignature/index.js
  var White = /* @__PURE__ */ function() {
    function White2(value0) {
      this.value0 = value0;
    }
    ;
    White2.create = function(value0) {
      return new White2(value0);
    };
    return White2;
  }();
  var Black = /* @__PURE__ */ function() {
    function Black2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Black2.create = function(value0) {
      return function(value1) {
        return new Black2(value0, value1);
      };
    };
    return Black2;
  }();
  var successor = function(pc) {
    return fromJust()(succ(enumPitchClass)(pc));
  };
  var rotate = function(n) {
    return function(xs) {
      return append(semigroupArray)(drop(n)(xs))(take(n)(xs));
    };
  };
  var predecessor = function(pc) {
    return fromJust()(pred(enumPitchClass)(pc));
  };
  var pianoOctave = /* @__PURE__ */ function() {
    return [new White(C.value), new Black(C.value, D.value), new White(D.value), new Black(D.value, E.value), new White(E.value), new White(F.value), new Black(F.value, G.value), new White(G.value), new Black(G.value, A.value), new White(A.value), new Black(A.value, B.value), new White(B.value)];
  }();
  var pianoKeyToPitch = function(isFlatCtx) {
    return function(pianoKey) {
      var convertPianoKey = function(v) {
        return function(v1) {
          if (v1 instanceof White) {
            return new Pitch({
              pitchClass: v1.value0,
              accidental: Natural.value
            });
          }
          ;
          if (v1 instanceof Black) {
            if (v) {
              return new Pitch({
                pitchClass: v1.value1,
                accidental: Flat.value
              });
            }
            ;
            return new Pitch({
              pitchClass: v1.value0,
              accidental: Sharp.value
            });
          }
          ;
          throw new Error("Failed pattern match at Data.Abc.KeySignature (line 410, column 5 - line 410, column 52): " + [v.constructor.name, v1.constructor.name]);
        };
      };
      return convertPianoKey(isFlatCtx)(pianoKey);
    };
  };
  var notesInChromaticScale = 12;
  var isFSharp = function(ks) {
    return eq(eqPitchCLass)(ks.pitchClass)(F.value) && (eq(eqAccidental)(ks.accidental)(Sharp.value) && (eq(eqMode)(ks.mode)(Major.value) || eq(eqMode)(ks.mode)(Ionian.value)));
  };
  var fSharpScale = /* @__PURE__ */ function() {
    return new Cons(new Pitch({
      pitchClass: F.value,
      accidental: Sharp.value
    }), new Cons(new Pitch({
      pitchClass: G.value,
      accidental: Sharp.value
    }), new Cons(new Pitch({
      pitchClass: A.value,
      accidental: Sharp.value
    }), new Cons(new Pitch({
      pitchClass: B.value,
      accidental: Natural.value
    }), new Cons(new Pitch({
      pitchClass: C.value,
      accidental: Sharp.value
    }), new Cons(new Pitch({
      pitchClass: D.value,
      accidental: Sharp.value
    }), new Cons(new Pitch({
      pitchClass: E.value,
      accidental: Sharp.value
    }), Nil.value)))))));
  }();
  var fSharpKeySet = /* @__PURE__ */ filter2(function(v) {
    return eq(eqAccidental)(v.value0.accidental)(Sharp.value);
  })(fSharpScale);
  var eqPianoKey = {
    eq: function(x) {
      return function(y) {
        if (x instanceof White && y instanceof White) {
          return eq(eqPitchCLass)(x.value0)(y.value0);
        }
        ;
        if (x instanceof Black && y instanceof Black) {
          return eq(eqPitchCLass)(x.value0)(y.value0) && eq(eqPitchCLass)(x.value1)(y.value1);
        }
        ;
        return false;
      };
    }
  };
  var distanceFromMajor = function(mode2) {
    if (mode2 instanceof Dorian) {
      return 10;
    }
    ;
    if (mode2 instanceof Phrygian) {
      return 8;
    }
    ;
    if (mode2 instanceof Lydian) {
      return 7;
    }
    ;
    if (mode2 instanceof Mixolydian) {
      return 5;
    }
    ;
    if (mode2 instanceof Aeolian) {
      return 3;
    }
    ;
    if (mode2 instanceof Minor) {
      return 3;
    }
    ;
    if (mode2 instanceof Locrian) {
      return 1;
    }
    ;
    if (mode2 instanceof Major) {
      return 0;
    }
    ;
    if (mode2 instanceof Ionian) {
      return 0;
    }
    ;
    throw new Error("Failed pattern match at Data.Abc.KeySignature (line 390, column 3 - line 399, column 16): " + [mode2.constructor.name]);
  };
  var distanceFromC = function(keySig) {
    return fromMaybe(0)(elemIndex(eqPianoKey)(keySig)(pianoOctave));
  };
  var diatonicScaleOffsets = [0, 2, 4, 5, 7, 9, 11];
  var pianoKeyScale = function(keySig) {
    return function(mode2) {
      var shift = mod(euclideanRingInt)(distanceFromC(keySig) + distanceFromMajor(mode2) | 0)(notesInChromaticScale);
      var scale = rotate(shift)(pianoOctave);
      var tonic = fromMaybe(new White(C.value))(head(scale));
      var lookup3 = function(key2) {
        return fromMaybe(new White(C.value))(index(scale)(key2));
      };
      var keys3 = map(functorArray)(lookup3)(diatonicScaleOffsets);
      return new Tuple(tonic, keys3);
    };
  };
  var defaultKey = /* @__PURE__ */ function() {
    return {
      keySignature: {
        pitchClass: C.value,
        accidental: Natural.value,
        mode: Major.value
      },
      modifications: Nil.value,
      properties: empty2
    };
  }();
  var buildPianoKey = function(v) {
    if (v.value0.accidental instanceof Flat) {
      return new Black(predecessor(v.value0.pitchClass), v.value0.pitchClass);
    }
    ;
    if (v.value0.accidental instanceof Sharp) {
      return new Black(v.value0.pitchClass, successor(v.value0.pitchClass));
    }
    ;
    return new White(v.value0.pitchClass);
  };
  var blackKeySet = function(keySig) {
    return function(mode2) {
      var v = pianoKeyScale(keySig)(mode2);
      var isBlackKey = function(v1) {
        if (v1 instanceof White) {
          return false;
        }
        ;
        if (v1 instanceof Black) {
          return true;
        }
        ;
        throw new Error("Failed pattern match at Data.Abc.KeySignature (line 355, column 5 - line 355, column 38): " + [v1.constructor.name]);
      };
      return new Tuple(v.value0, filter(isBlackKey)(v.value1));
    };
  };
  var keySet = function(ks) {
    var pianoKeySignature = buildPianoKey(new Pitch({
      pitchClass: ks.pitchClass,
      accidental: ks.accidental
    }));
    var v = blackKeySet(pianoKeySignature)(ks.mode);
    var isFlatCtx = function() {
      if (v.value0 instanceof White && v.value0.value0 instanceof F) {
        return true;
      }
      ;
      if (v.value0 instanceof White) {
        return false;
      }
      ;
      return true;
    }();
    var basicKeySet = toUnfoldable(unfoldableList)(map(functorArray)(pianoKeyToPitch(isFlatCtx))(v.value1));
    var $118 = isFSharp(ks);
    if ($118) {
      return fSharpKeySet;
    }
    ;
    if (v.value0 instanceof Black && (v.value0.value0 instanceof F && v.value0.value1 instanceof G)) {
      return new Cons(new Pitch({
        pitchClass: C.value,
        accidental: Flat.value
      }), basicKeySet);
    }
    ;
    return basicKeySet;
  };

  // output/Data.Int/foreign.js
  var fromNumberImpl = function(just) {
    return function(nothing) {
      return function(n) {
        return (n | 0) === n ? just(n) : nothing;
      };
    };
  };
  var toNumber = function(n) {
    return n;
  };
  var fromStringAsImpl = function(just) {
    return function(nothing) {
      return function(radix) {
        var digits;
        if (radix < 11) {
          digits = "[0-" + (radix - 1).toString() + "]";
        } else if (radix === 11) {
          digits = "[0-9a]";
        } else {
          digits = "[0-9a-" + String.fromCharCode(86 + radix) + "]";
        }
        var pattern = new RegExp("^[\\+\\-]?" + digits + "+$", "i");
        return function(s) {
          if (pattern.test(s)) {
            var i = parseInt(s, radix);
            return (i | 0) === i ? just(i) : nothing;
          } else {
            return nothing;
          }
        };
      };
    };
  };
  var pow = function(x) {
    return function(y) {
      return Math.pow(x, y) | 0;
    };
  };

  // output/Data.Number/foreign.js
  var isFiniteImpl = isFinite;
  var round = Math.round;

  // output/Data.Int/index.js
  var fromStringAs = /* @__PURE__ */ function() {
    return fromStringAsImpl(Just.create)(Nothing.value);
  }();
  var fromString = /* @__PURE__ */ fromStringAs(10);
  var fromNumber = /* @__PURE__ */ function() {
    return fromNumberImpl(Just.create)(Nothing.value);
  }();
  var unsafeClamp = function(x) {
    if (!isFiniteImpl(x)) {
      return 0;
    }
    ;
    if (x >= toNumber(top(boundedInt))) {
      return top(boundedInt);
    }
    ;
    if (x <= toNumber(bottom(boundedInt))) {
      return bottom(boundedInt);
    }
    ;
    if (otherwise) {
      return fromMaybe(0)(fromNumber(x));
    }
    ;
    throw new Error("Failed pattern match at Data.Int (line 72, column 1 - line 72, column 29): " + [x.constructor.name]);
  };
  var round2 = function($23) {
    return unsafeClamp(round($23));
  };

  // output/Data.List.NonEmpty/index.js
  var wrappedOperation = function(name2) {
    return function(f) {
      return function(v) {
        var v1 = f(new Cons(v.value0, v.value1));
        if (v1 instanceof Cons) {
          return new NonEmpty(v1.value0, v1.value1);
        }
        ;
        if (v1 instanceof Nil) {
          return unsafeCrashWith("Impossible: empty list in NonEmptyList " + name2);
        }
        ;
        throw new Error("Failed pattern match at Data.List.NonEmpty (line 92, column 3 - line 94, column 81): " + [v1.constructor.name]);
      };
    };
  };
  var toList = function(v) {
    return new Cons(v.value0, v.value1);
  };
  var toUnfoldable4 = function(dictUnfoldable) {
    var $165 = unfoldr(dictUnfoldable)(function(xs) {
      return map(functorMaybe)(function(rec) {
        return new Tuple(rec.head, rec.tail);
      })(uncons(xs));
    });
    return function($166) {
      return $165(toList($166));
    };
  };
  var singleton6 = /* @__PURE__ */ function() {
    var $169 = singleton3(plusList);
    return function($170) {
      return NonEmptyList($169($170));
    };
  }();
  var reverse3 = /* @__PURE__ */ wrappedOperation("reverse")(reverse2);
  var length3 = function(v) {
    return 1 + length2(v.value1) | 0;
  };
  var head4 = function(v) {
    return v.value0;
  };
  var cons4 = function(y) {
    return function(v) {
      return new NonEmpty(y, new Cons(v.value0, v.value1));
    };
  };

  // output/Data.Ratio/index.js
  var Ratio = /* @__PURE__ */ function() {
    function Ratio2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Ratio2.create = function(value0) {
      return function(value1) {
        return new Ratio2(value0, value1);
      };
    };
    return Ratio2;
  }();
  var reduce = function(dictOrd) {
    return function(dictEuclideanRing) {
      return function(n) {
        return function(d) {
          var g = gcd(dictOrd.Eq0())(dictEuclideanRing)(n)(d);
          var d$prime = div(dictEuclideanRing)(d)(g);
          return new Ratio(mul(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0())(div(dictEuclideanRing)(n)(g))(signum(dictOrd)(dictEuclideanRing.CommutativeRing0().Ring0())(d$prime)), abs(dictOrd)(dictEuclideanRing.CommutativeRing0().Ring0())(d$prime));
        };
      };
    };
  };
  var semiringRatio = function(dictOrd) {
    return function(dictEuclideanRing) {
      return {
        one: new Ratio(one(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0()), one(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0())),
        mul: function(v) {
          return function(v1) {
            return reduce(dictOrd)(dictEuclideanRing)(mul(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0())(v.value0)(v1.value0))(mul(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0())(v.value1)(v1.value1));
          };
        },
        zero: new Ratio(zero(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0()), one(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0())),
        add: function(v) {
          return function(v1) {
            return reduce(dictOrd)(dictEuclideanRing)(add(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0())(mul(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0())(v.value0)(v1.value1))(mul(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0())(v.value1)(v1.value0)))(mul(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0())(v.value1)(v1.value1));
          };
        }
      };
    };
  };
  var ringRatio = function(dictOrd) {
    return function(dictEuclideanRing) {
      return {
        sub: function(v) {
          return function(v1) {
            return reduce(dictOrd)(dictEuclideanRing)(sub(dictEuclideanRing.CommutativeRing0().Ring0())(mul(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0())(v.value0)(v1.value1))(mul(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0())(v.value1)(v1.value0)))(mul(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0())(v.value1)(v1.value1));
          };
        },
        Semiring0: function() {
          return semiringRatio(dictOrd)(dictEuclideanRing);
        }
      };
    };
  };
  var numerator = function(v) {
    return v.value0;
  };
  var denominator = function(v) {
    return v.value1;
  };
  var commutativeRingRatio = function(dictOrd) {
    return function(dictEuclideanRing) {
      return {
        Ring0: function() {
          return ringRatio(dictOrd)(dictEuclideanRing);
        }
      };
    };
  };
  var euclideanRingRatio = function(dictOrd) {
    return function(dictEuclideanRing) {
      return {
        degree: function(v) {
          return 1;
        },
        div: function(v) {
          return function(v1) {
            return reduce(dictOrd)(dictEuclideanRing)(mul(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0())(v.value0)(v1.value1))(mul(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0())(v.value1)(v1.value0));
          };
        },
        mod: function(v) {
          return function(v1) {
            return zero(semiringRatio(dictOrd)(dictEuclideanRing));
          };
        },
        CommutativeRing0: function() {
          return commutativeRingRatio(dictOrd)(dictEuclideanRing);
        }
      };
    };
  };

  // output/Data.Rational/index.js
  var toNumber2 = function(x) {
    return toNumber(numerator(x)) / toNumber(denominator(x));
  };
  var fromInt = function(i) {
    return reduce(ordInt)(euclideanRingInt)(i)(1);
  };

  // output/VexFlow.Abc.TickableContext/index.js
  var TickableContext = /* @__PURE__ */ function() {
    function TickableContext2(value0, value1, value2) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value2;
    }
    ;
    TickableContext2.create = function(value0) {
      return function(value1) {
        return function(value2) {
          return new TickableContext2(value0, value1, value2);
        };
      };
    };
    return TickableContext2;
  }();
  var tickableSemigroupCtx = {
    append: function(v) {
      return function(v1) {
        return new TickableContext(v.value0 + v1.value0 | 0, v.value1 + v1.value1 | 0, add(semiringRatio(ordInt)(euclideanRingInt))(v.value2)(v1.value2));
      };
    }
  };
  var tickableMonoidCtx = /* @__PURE__ */ function() {
    return {
      mempty: new TickableContext(0, 0, fromInt(0)),
      Semigroup0: function() {
        return tickableSemigroupCtx;
      }
    };
  }();
  var tickableCountWidth = function(n) {
    if (n === 1) {
      return 1.5;
    }
    ;
    if (n === 2) {
      return 2.5;
    }
    ;
    return toNumber(n);
  };
  var pixelsPerItem = 35;
  var keySignatureWidth = function(keySignature3) {
    var v = length2(keySet(keySignature3));
    if (v === 0) {
      return 0;
    }
    ;
    if (v === 1) {
      return 1;
    }
    ;
    if (v === 2) {
      return 1;
    }
    ;
    return 1.5;
  };
  var graceLength = function(maybeGraceNote) {
    return fromMaybe(0)(map(functorMaybe)(function(g) {
      return length3(g.notes);
    })(maybeGraceNote));
  };
  var getRorNsGraceLength = function(rOrNs) {
    var f = function(acc) {
      return function(rOrN) {
        if (rOrN instanceof Left) {
          return 0 + acc | 0;
        }
        ;
        if (rOrN instanceof Right) {
          return graceLength(rOrN.value0.maybeGrace) + acc | 0;
        }
        ;
        throw new Error("Failed pattern match at VexFlow.Abc.TickableContext (line 98, column 7 - line 102, column 53): " + [rOrN.constructor.name]);
      };
    };
    return foldl(foldableArray)(f)(0)(rOrNs);
  };
  var getRorNsDuration = function(rOrNs) {
    var f = function(acc) {
      return function(rOrN) {
        if (rOrN instanceof Left) {
          return add(semiringRatio(ordInt)(euclideanRingInt))(rOrN.value0.duration)(acc);
        }
        ;
        if (rOrN instanceof Right) {
          return add(semiringRatio(ordInt)(euclideanRingInt))(rOrN.value0.abcNote.duration)(acc);
        }
        ;
        throw new Error("Failed pattern match at VexFlow.Abc.TickableContext (line 88, column 7 - line 90, column 68): " + [rOrN.constructor.name]);
      };
    };
    return foldl(foldableArray)(f)(fromInt(0))(rOrNs);
  };
  var getTickableContext = function(m) {
    if (m instanceof Note) {
      return new TickableContext(1, graceLength(m.value0.maybeGrace), m.value0.abcNote.duration);
    }
    ;
    if (m instanceof Rest) {
      return new TickableContext(1, 0, m.value0.duration);
    }
    ;
    if (m instanceof Chord) {
      var abcNote2 = head4(m.value0.notes);
      var duration = mul(semiringRatio(ordInt)(euclideanRingInt))(m.value0.duration)(abcNote2.duration);
      return new TickableContext(1, 0, duration);
    }
    ;
    if (m instanceof BrokenRhythmPair) {
      return new TickableContext(2, graceLength(m.value0.maybeGrace) + graceLength(m.value2.maybeGrace) | 0, add(semiringRatio(ordInt)(euclideanRingInt))(m.value0.abcNote.duration)(m.value2.abcNote.duration));
    }
    ;
    if (m instanceof Tuplet) {
      var reduction = reduce(ordInt)(euclideanRingInt)(m.value0.signature.q)(m.value0.signature.p);
      var graceNoteLength = getRorNsGraceLength(toUnfoldable4(unfoldableArray)(m.value0.restsOrNotes));
      var duration = mul(semiringRatio(ordInt)(euclideanRingInt))(reduction)(getRorNsDuration(toUnfoldable4(unfoldableArray)(m.value0.restsOrNotes)));
      return new TickableContext(m.value0.signature.r, graceNoteLength, duration);
    }
    ;
    return mempty(tickableMonoidCtx);
  };
  var estimateBarWidth = function(hasClef) {
    return function(hasTimeSig) {
      return function(maybeKeySig) {
        return function(abcBar) {
          var v = foldMap(foldableList)(tickableMonoidCtx)(getTickableContext)(abcBar.music);
          var timeSigCount = function() {
            if (hasTimeSig) {
              return 1;
            }
            ;
            return 0;
          }();
          var keySigCount = maybe(0)(keySignatureWidth)(maybeKeySig);
          var clefCount = function() {
            if (hasClef) {
              return 1;
            }
            ;
            return 0;
          }();
          return round2((clefCount + timeSigCount + keySigCount + tickableCountWidth(v.value0) + 0.5 * toNumber(v.value1)) * pixelsPerItem);
        };
      };
    };
  };

  // output/VexFlow.Types/index.js
  var Single = /* @__PURE__ */ function() {
    function Single2() {
    }
    ;
    Single2.value = new Single2();
    return Single2;
  }();
  var Double = /* @__PURE__ */ function() {
    function Double2() {
    }
    ;
    Double2.value = new Double2();
    return Double2;
  }();
  var NoLine = /* @__PURE__ */ function() {
    function NoLine2() {
    }
    ;
    NoLine2.value = new NoLine2();
    return NoLine2;
  }();
  var titleDepth = 48;
  var staveSeparation = 110;
  var staveIndentation = 10;
  var musicSpecSemigroup = {
    append: function(v) {
      return function(v1) {
        return append(semigroupRecord()(semigroupRecordCons({
          reflectSymbol: function() {
            return "beatMarkers";
          }
        })()(semigroupRecordCons({
          reflectSymbol: function() {
            return "chordSymbols";
          }
        })()(semigroupRecordCons({
          reflectSymbol: function() {
            return "contextChanges";
          }
        })()(semigroupRecordCons({
          reflectSymbol: function() {
            return "noteSpecs";
          }
        })()(semigroupRecordCons({
          reflectSymbol: function() {
            return "repetitions";
          }
        })()(semigroupRecordCons({
          reflectSymbol: function() {
            return "slurBrackets";
          }
        })()(semigroupRecordCons({
          reflectSymbol: function() {
            return "tickableContext";
          }
        })()(semigroupRecordCons({
          reflectSymbol: function() {
            return "ties";
          }
        })()(semigroupRecordCons({
          reflectSymbol: function() {
            return "tuplets";
          }
        })()(semigroupRecordCons({
          reflectSymbol: function() {
            return "typesettingSpaces";
          }
        })()(semigroupRecordNil)(semigroupArray))(semigroupArray))(semigroupArray))(tickableSemigroupCtx))(semigroupArray))(semigroupArray))(semigroupArray))(semigroupArray))(semigroupArray))(semigroupArray)))(v)(v1);
      };
    }
  };
  var musicSpecMonoid = {
    mempty: {
      noteSpecs: /* @__PURE__ */ mempty(monoidArray),
      tuplets: /* @__PURE__ */ mempty(monoidArray),
      ties: /* @__PURE__ */ mempty(monoidArray),
      tickableContext: /* @__PURE__ */ mempty(tickableMonoidCtx),
      contextChanges: /* @__PURE__ */ mempty(monoidArray),
      slurBrackets: /* @__PURE__ */ mempty(monoidArray),
      beatMarkers: /* @__PURE__ */ mempty(monoidArray),
      repetitions: /* @__PURE__ */ mempty(monoidArray),
      typesettingSpaces: /* @__PURE__ */ mempty(monoidArray),
      chordSymbols: /* @__PURE__ */ mempty(monoidArray)
    },
    Semigroup0: function() {
      return musicSpecSemigroup;
    }
  };
  var defaultConfig = {
    parentElementId: "canvas",
    width: 1600,
    height: 800,
    scale: 0.8,
    isSVG: true,
    titled: true,
    showChordSymbols: false
  };

  // output/Abc.EnsembleScore.Generator/index.js
  var mergeFurtherVoiceLine = function(a2) {
    return function(a3) {
      return zipWith(cons2)(a2)(a3);
    };
  };
  var merge2VoiceLines = function(a1) {
    return function(a2) {
      return zipWith(function(x) {
        return function(y) {
          return cons2(x)(singleton2(y));
        };
      })(a1)(a2);
    };
  };
  var mergeVoiceLines = function(v) {
    if (v.length === 2) {
      return pure(applicativeExceptT(monadStateT(monadIdentity)))(merge2VoiceLines(v[0].barSpecs)(v[1].barSpecs));
    }
    ;
    if (v.length === 3) {
      return pure(applicativeExceptT(monadStateT(monadIdentity)))(mergeFurtherVoiceLine(v[0].barSpecs)(merge2VoiceLines(v[1].barSpecs)(v[2].barSpecs)));
    }
    ;
    if (v.length === 4) {
      return pure(applicativeExceptT(monadStateT(monadIdentity)))(mergeFurtherVoiceLine(v[0].barSpecs)(mergeFurtherVoiceLine(v[1].barSpecs)(merge2VoiceLines(v[2].barSpecs)(v[3].barSpecs))));
    }
    ;
    return throwError(monadThrowExceptT(monadStateT(monadIdentity)))("This module only supports polyphony with between 2 and 4 voices");
  };
  var buildVoiceBarSpec = function(bs) {
    return {
      startLine: bs.startLine,
      endLineThickness: bs.endLineThickness,
      endLineRepeat: bs.endLineRepeat,
      volta: bs.volta,
      timeSignature: bs.timeSignature,
      beamSpecs: bs.beamSpecs,
      curves: bs.curves,
      musicSpec: bs.musicSpec
    };
  };
  var buildMultiStaveBarSpec = function(xOffset) {
    return function(multiBars) {
      var width = fromMaybe(0)(maximumBy(foldableArray)(compare(ordInt))(map(functorArray)(function(v) {
        return v.width;
      })(multiBars)));
      var voices = map(functorArray)(buildVoiceBarSpec)(multiBars);
      var positioning = {
        width,
        xOffset
      };
      return {
        positioning,
        voices
      };
    };
  };
  var buildMultiStaveLine = function(mergedStaveLine) {
    var f = function(acc) {
      return function(barSpecs) {
        var nextXOffset = function() {
          var v = head(barSpecs);
          if (v instanceof Nothing) {
            return 0;
          }
          ;
          if (v instanceof Just) {
            return v.value0.width + v.value0.xOffset | 0;
          }
          ;
          throw new Error("Failed pattern match at Abc.EnsembleScore.Generator (line 91, column 9 - line 95, column 34): " + [v.constructor.name]);
        }();
        return cons2(buildMultiStaveBarSpec(nextXOffset)(barSpecs))(acc);
      };
    };
    return reverse(foldl2(f)([])(mergedStaveLine));
  };
  var buildMultiStaveSpec = function(ss) {
    var f = function(s) {
      return bind(bindExceptT(monadStateT(monadIdentity)))(get(monadStateExceptT(monadStateStateT(monadIdentity))))(function(ensembleContext) {
        return bind(bindExceptT(monadStateT(monadIdentity)))(put(monadStateExceptT(monadStateStateT(monadIdentity)))(function() {
          var $16 = {};
          for (var $17 in ensembleContext) {
            if ({}.hasOwnProperty.call(ensembleContext, $17)) {
              $16[$17] = ensembleContext[$17];
            }
            ;
          }
          ;
          $16.nextStaveNo = ensembleContext.nextStaveNo + 1 | 0;
          return $16;
        }()))(function() {
          return pure(applicativeExceptT(monadStateT(monadIdentity)))({
            staveNo: ensembleContext.nextStaveNo,
            initialxOffset: staveIndentation,
            initialyOffset: (staveSeparation * ensembleContext.nextStaveNo | 0) + titleDepth | 0,
            keySignature: s.keySignature,
            isNewTimeSignature: s.isNewTimeSignature,
            mTempo: s.mTempo,
            clefString: s.clefString
          });
        });
      });
    };
    return bind(bindExceptT(monadStateT(monadIdentity)))(mergeVoiceLines(ss))(function(mergedVoiceLines) {
      var multiStaveLine = buildMultiStaveLine(mergedVoiceLines);
      return bind(bindExceptT(monadStateT(monadIdentity)))(traverse(traversableArray)(applicativeExceptT(monadStateT(monadIdentity)))(f)(ss))(function(multiStaveVoices) {
        return pure(applicativeExceptT(monadStateT(monadIdentity)))({
          multiStaveVoices,
          multiStaveLine
        });
      });
    });
  };
  var buildEnsembleScore = function(staveSpecs) {
    return traverse(traversableArray)(applicativeExceptT(monadStateT(monadIdentity)))(buildMultiStaveSpec)(staveSpecs);
  };
  var runBuildEnsembleScore = function(staveSpecs) {
    return unwrap()(evalStateT(functorIdentity)(runExceptT(buildEnsembleScore(staveSpecs)))({
      nextStaveNo: 0
    }));
  };

  // output/Data.Lens.Internal.Forget/index.js
  var Forget = function(x) {
    return x;
  };
  var profunctorForget = {
    dimap: function(f) {
      return function(v) {
        return function(v1) {
          return function($24) {
            return v1(f($24));
          };
        };
      };
    }
  };
  var strongForget = {
    first: function(v) {
      return function($25) {
        return v(fst($25));
      };
    },
    second: function(v) {
      return function($26) {
        return v(snd($26));
      };
    },
    Profunctor0: function() {
      return profunctorForget;
    }
  };
  var choiceForget = function(dictMonoid) {
    return {
      left: function(v) {
        return either(v)(mempty(monoidFn(dictMonoid)));
      },
      right: function(v) {
        return either(mempty(monoidFn(dictMonoid)))(v);
      },
      Profunctor0: function() {
        return profunctorForget;
      }
    };
  };
  var wanderForget = function(dictMonoid) {
    return {
      wander: function(f) {
        return function(v) {
          return alaF()()()()(Const)(f(applicativeConst(dictMonoid)))(v);
        };
      },
      Strong0: function() {
        return strongForget;
      },
      Choice1: function() {
        return choiceForget(dictMonoid);
      }
    };
  };

  // output/Data.Profunctor/index.js
  var profunctorFn = {
    dimap: function(a2b) {
      return function(c2d) {
        return function(b2c) {
          return function($8) {
            return c2d(b2c(a2b($8)));
          };
        };
      };
    }
  };
  var dimap = function(dict) {
    return dict.dimap;
  };
  var rmap = function(dictProfunctor) {
    return function(b2c) {
      return dimap(dictProfunctor)(identity(categoryFn))(b2c);
    };
  };

  // output/Data.Profunctor.Choice/index.js
  var right = function(dict) {
    return dict.right;
  };
  var choiceFn = {
    left: function(v) {
      return function(v1) {
        if (v1 instanceof Left) {
          return new Left(v(v1.value0));
        }
        ;
        if (v1 instanceof Right) {
          return new Right(v1.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Profunctor.Choice (line 32, column 1 - line 35, column 16): " + [v.constructor.name, v1.constructor.name]);
      };
    },
    right: /* @__PURE__ */ map(functorEither),
    Profunctor0: function() {
      return profunctorFn;
    }
  };

  // output/Data.Profunctor.Strong/index.js
  var strongFn = {
    first: function(a2b) {
      return function(v) {
        return new Tuple(a2b(v.value0), v.value1);
      };
    },
    second: /* @__PURE__ */ map(functorTuple),
    Profunctor0: function() {
      return profunctorFn;
    }
  };
  var second = function(dict) {
    return dict.second;
  };
  var first = function(dict) {
    return dict.first;
  };
  var splitStrong = function(dictCategory) {
    return function(dictStrong) {
      return function(l) {
        return function(r) {
          return composeFlipped(dictCategory.Semigroupoid0())(first(dictStrong)(l))(second(dictStrong)(r));
        };
      };
    };
  };
  var fanout = function(dictCategory) {
    return function(dictStrong) {
      return function(l) {
        return function(r) {
          var split3 = dimap(dictStrong.Profunctor0())(identity(categoryFn))(function(a) {
            return new Tuple(a, a);
          })(identity(dictCategory));
          return composeFlipped(dictCategory.Semigroupoid0())(split3)(splitStrong(dictCategory)(dictStrong)(l)(r));
        };
      };
    };
  };

  // output/Data.Lens.Internal.Wander/index.js
  var wanderFunction = {
    wander: function(t) {
      return alaF()()()()(Identity)(t(applicativeIdentity));
    },
    Strong0: function() {
      return strongFn;
    },
    Choice1: function() {
      return choiceFn;
    }
  };
  var wander = function(dict) {
    return dict.wander;
  };

  // output/Data.Lens.Prism/index.js
  var prism = function(to) {
    return function(fro) {
      return function(dictChoice) {
        return function(pab) {
          return dimap(dictChoice.Profunctor0())(fro)(either(identity(categoryFn))(identity(categoryFn)))(right(dictChoice)(rmap(dictChoice.Profunctor0())(to)(pab)));
        };
      };
    };
  };
  var prism$prime = function(to) {
    return function(fro) {
      return function(dictChoice) {
        return prism(to)(function(s) {
          return maybe(new Left(s))(Right.create)(fro(s));
        })(dictChoice);
      };
    };
  };

  // output/Data.Lens.Lens/index.js
  var lens$prime = function(to) {
    return function(dictStrong) {
      return function(pab) {
        return dimap(dictStrong.Profunctor0())(to)(function(v) {
          return v.value1(v.value0);
        })(first(dictStrong)(pab));
      };
    };
  };
  var lens = function(get3) {
    return function(set3) {
      return function(dictStrong) {
        return lens$prime(function(s) {
          return new Tuple(get3(s), function(b) {
            return set3(s)(b);
          });
        })(dictStrong);
      };
    };
  };

  // output/Record/index.js
  var set = function(dictIsSymbol) {
    return function() {
      return function() {
        return function(l) {
          return function(b) {
            return function(r) {
              return unsafeSet(reflectSymbol(dictIsSymbol)(l))(b)(r);
            };
          };
        };
      };
    };
  };
  var get2 = function(dictIsSymbol) {
    return function() {
      return function(l) {
        return function(r) {
          return unsafeGet(reflectSymbol(dictIsSymbol)(l))(r);
        };
      };
    };
  };

  // output/Data.Lens.Record/index.js
  var prop = function(dictIsSymbol) {
    return function() {
      return function() {
        return function(l) {
          return function(dictStrong) {
            return lens(get2(dictIsSymbol)()(l))(flip(set(dictIsSymbol)()()(l)))(dictStrong);
          };
        };
      };
    };
  };

  // output/Data.Abc.Optics/index.js
  var _properties = function(dictStrong) {
    return prop({
      reflectSymbol: function() {
        return "properties";
      }
    })()()($$Proxy.value)(dictStrong);
  };
  var _headers = function(dictStrong) {
    return prop({
      reflectSymbol: function() {
        return "headers";
      }
    })()()($$Proxy.value)(dictStrong);
  };
  var _Voice = function(dictChoice) {
    return prism$prime(Voice.create)(function(v) {
      if (v instanceof Voice) {
        return new Just(v.value0);
      }
      ;
      return Nothing.value;
    })(dictChoice);
  };
  var _UnitNoteLength = function(dictChoice) {
    return prism$prime(UnitNoteLength.create)(function(v) {
      if (v instanceof UnitNoteLength) {
        return new Just(v.value0);
      }
      ;
      return Nothing.value;
    })(dictChoice);
  };
  var _Title = function(dictChoice) {
    return prism$prime(Title.create)(function(v) {
      if (v instanceof Title) {
        return new Just(v.value0);
      }
      ;
      return Nothing.value;
    })(dictChoice);
  };
  var _Tempo = function(dictChoice) {
    return prism$prime(Tempo.create)(function(v) {
      if (v instanceof Tempo) {
        return new Just(v.value0);
      }
      ;
      return Nothing.value;
    })(dictChoice);
  };
  var _ModifiedKeySignature = function(dictChoice) {
    return prism$prime(Key.create)(function(v) {
      if (v instanceof Key) {
        return new Just(v.value0);
      }
      ;
      return Nothing.value;
    })(dictChoice);
  };
  var _Meter = function(dictChoice) {
    return prism$prime(Meter.create)(function(v) {
      if (v instanceof Meter) {
        return new Just(v.value0);
      }
      ;
      return Nothing.value;
    })(dictChoice);
  };

  // output/Data.Lens.Fold/index.js
  var foldMapOf = /* @__PURE__ */ under()()(Forget);
  var lastOf = function(p) {
    var $92 = unwrap();
    var $93 = foldMapOf(p)(function($95) {
      return Last(Just.create($95));
    });
    return function($94) {
      return $92($93($94));
    };
  };
  var firstOf = function(p) {
    var $112 = unwrap();
    var $113 = foldMapOf(p)(function($115) {
      return First(Just.create($115));
    });
    return function($114) {
      return $112($113($114));
    };
  };

  // output/Control.Monad.State/index.js
  var evalState = function(v) {
    return function(s) {
      var v1 = v(s);
      return v1.value0;
    };
  };

  // output/Data.Lens.Setter/index.js
  var over = function(l) {
    return l;
  };
  var set2 = function(l) {
    return function(b) {
      return over(l)($$const(b));
    };
  };

  // output/Data.Lens.Traversal/index.js
  var traversed = function(dictTraversable) {
    return function(dictWander) {
      return wander(dictWander)(function(dictApplicative) {
        return traverse(dictTraversable)(dictApplicative);
      });
    };
  };

  // output/Data.Abc.Metadata/index.js
  var normaliseChord = function(abcChord2) {
    var v = toNumber2(abcChord2.duration);
    if (v === 1) {
      return abcChord2;
    }
    ;
    var notes2 = map(functorNonEmptyList)(function(n) {
      return {
        duration: mul(semiringRatio(ordInt)(euclideanRingInt))(n.duration)(abcChord2.duration),
        accidental: n.accidental,
        octave: n.octave,
        pitchClass: n.pitchClass,
        tied: n.tied
      };
    })(abcChord2.notes);
    return {
      leftSlurs: abcChord2.leftSlurs,
      decorations: abcChord2.decorations,
      notes: notes2,
      duration: reduce(ordInt)(euclideanRingInt)(1)(1),
      rightSlurs: abcChord2.rightSlurs
    };
  };
  var isEmptyStave = function(bars2) {
    var isEmptyBar = function(bar3) {
      var f = function(music$prime) {
        if (music$prime instanceof Spacer) {
          return true;
        }
        ;
        if (music$prime instanceof Ignore) {
          return true;
        }
        ;
        if (music$prime instanceof Continuation) {
          return true;
        }
        ;
        return false;
      };
      return all(foldableList)(heytingAlgebraBoolean)(f)(bar3.music) || $$null2(bar3.music);
    };
    return all(foldableList)(heytingAlgebraBoolean)(isEmptyBar)(bars2);
  };
  var getUnitNoteLength = function(tune) {
    return firstOf(function() {
      var $29 = _headers(strongForget);
      var $30 = traversed(traversableList)(wanderForget(monoidFirst));
      var $31 = _UnitNoteLength(choiceForget(monoidFirst));
      return function($32) {
        return $29($30($31($32)));
      };
    }())(tune);
  };
  var getTempoSig = function(tune) {
    return firstOf(function() {
      var $37 = _headers(strongForget);
      var $38 = traversed(traversableList)(wanderForget(monoidFirst));
      var $39 = _Tempo(choiceForget(monoidFirst));
      return function($40) {
        return $37($38($39($40)));
      };
    }())(tune);
  };
  var getMeter = function(tune) {
    return join(bindMaybe)(firstOf(function() {
      var $41 = _headers(strongForget);
      var $42 = traversed(traversableList)(wanderForget(monoidFirst));
      var $43 = _Meter(choiceForget(monoidFirst));
      return function($44) {
        return $41($42($43($44)));
      };
    }())(tune));
  };
  var getKeySig = function(tune) {
    return firstOf(function() {
      var $45 = _headers(strongForget);
      var $46 = traversed(traversableList)(wanderForget(monoidFirst));
      var $47 = _ModifiedKeySignature(choiceForget(monoidFirst));
      return function($48) {
        return $45($46($47($48)));
      };
    }())(tune);
  };
  var dotFactor = function(i) {
    if (i === 1) {
      return reduce(ordInt)(euclideanRingInt)(1)(2);
    }
    ;
    if (i === 2) {
      return reduce(ordInt)(euclideanRingInt)(3)(4);
    }
    ;
    if (i === 3) {
      return reduce(ordInt)(euclideanRingInt)(7)(8);
    }
    ;
    return reduce(ordInt)(euclideanRingInt)(0)(1);
  };

  // output/Data.Abc.Voice/index.js
  var VoiceLabel = /* @__PURE__ */ function() {
    function VoiceLabel2(value0) {
      this.value0 = value0;
    }
    ;
    VoiceLabel2.create = function(value0) {
      return new VoiceLabel2(value0);
    };
    return VoiceLabel2;
  }();
  var NoLabel = /* @__PURE__ */ function() {
    function NoLabel2() {
    }
    ;
    NoLabel2.value = new NoLabel2();
    return NoLabel2;
  }();
  var runVoiceM = function(initialLabel) {
    return function(v) {
      var v1 = evalStateT(functorIdentity)(v)(initialLabel);
      return v1;
    };
  };
  var retitleFromVoiceLabel = function(tune) {
    return function(v) {
      var retitle = function(voiceName) {
        return function(headers2) {
          var v1 = firstOf(function() {
            var $76 = traversed(traversableList)(wanderForget(monoidFirst));
            var $77 = _Title(choiceForget(monoidFirst));
            return function($78) {
              return $76($77($78));
            };
          }())(headers2);
          if (v1 instanceof Just) {
            var predicate = function(h) {
              if (h instanceof Voice) {
                return h.value0.id === voiceName;
              }
              ;
              return true;
            };
            var filteredHeaders = filter2(predicate)(headers2);
            return set2(function() {
              var $79 = traversed(traversableList)(wanderFunction);
              var $80 = _Title(choiceFn);
              return function($81) {
                return $79($80($81));
              };
            }())("voice " + voiceName)(filteredHeaders);
          }
          ;
          var predicate = function(h) {
            if (h instanceof ReferenceNumber) {
              return false;
            }
            ;
            if (h instanceof Title) {
              return false;
            }
            ;
            if (h instanceof Voice) {
              return h.value0.id === voiceName;
            }
            ;
            return true;
          };
          var filteredRetitledHeaders = filter2(predicate)(headers2);
          return new Cons(new ReferenceNumber(new Just(1)), new Cons(new Title("voice " + voiceName), filteredRetitledHeaders));
        };
      };
      if (v.value0 instanceof VoiceLabel) {
        var newHeaders = retitle(v.value0.value0)(tune.headers);
        return new Tuple(v.value0.value0, {
          headers: newHeaders,
          body: v.value1
        });
      }
      ;
      if (v.value0 instanceof NoLabel) {
        return new Tuple("unnamed", {
          headers: tune.headers,
          body: v.value1
        });
      }
      ;
      throw new Error("Failed pattern match at Data.Abc.Voice (line 242, column 3 - line 248, column 54): " + [v.value0.constructor.name]);
    };
  };
  var inlineLabel = function(bars2) {
    var mFirstBarMusic = join(bindMaybe)(map(functorMaybe)(function($82) {
      return head2(function(v) {
        return v.music;
      }($82));
    })(head2(bars2)));
    if (mFirstBarMusic instanceof Just && mFirstBarMusic.value0 instanceof Inline) {
      if (mFirstBarMusic.value0.value0 instanceof Voice) {
        return new Just(new VoiceLabel(mFirstBarMusic.value0.value0.value0.id));
      }
      ;
      return Nothing.value;
    }
    ;
    return Nothing.value;
  };
  var scoreLabelOrDefault = function(currentVoiceLabel) {
    return function(bars2) {
      var v = inlineLabel(bars2);
      if (v instanceof Just) {
        return v.value0;
      }
      ;
      return currentVoiceLabel;
    };
  };
  var initialVoiceLabel = function(tune) {
    var v = lastOf(function() {
      var $83 = _headers(strongForget);
      var $84 = traversed(traversableList)(wanderForget(monoidLast));
      var $85 = _Voice(choiceForget(monoidLast));
      return function($86) {
        return $83($84($85($86)));
      };
    }())(tune);
    if (v instanceof Just) {
      return new VoiceLabel(v.value0.id);
    }
    ;
    return NoLabel.value;
  };
  var eqVoiceLabel = {
    eq: function(x) {
      return function(y) {
        if (x instanceof VoiceLabel && y instanceof VoiceLabel) {
          return x.value0 === y.value0;
        }
        ;
        if (x instanceof NoLabel && y instanceof NoLabel) {
          return true;
        }
        ;
        return false;
      };
    }
  };
  var ordVoiceLabel = {
    compare: function(x) {
      return function(y) {
        if (x instanceof VoiceLabel && y instanceof VoiceLabel) {
          return compare(ordString)(x.value0)(y.value0);
        }
        ;
        if (x instanceof VoiceLabel) {
          return LT.value;
        }
        ;
        if (y instanceof VoiceLabel) {
          return GT.value;
        }
        ;
        if (x instanceof NoLabel && y instanceof NoLabel) {
          return EQ.value;
        }
        ;
        throw new Error("Failed pattern match at Data.Abc.Voice (line 62, column 1 - line 62, column 48): " + [x.constructor.name, y.constructor.name]);
      };
    },
    Eq0: function() {
      return eqVoiceLabel;
    }
  };
  var addToAll = function(bp) {
    return function(vmap) {
      return map(functorMap)(function(v) {
        return snoc2(v)(bp);
      })(vmap);
    };
  };
  var addAtLabel = function(label) {
    return function(bp) {
      return function(map2) {
        var v = lookup(ordVoiceLabel)(label)(map2);
        if (v instanceof Just) {
          return insert(ordVoiceLabel)(label)(snoc2(v.value0)(bp))(map2);
        }
        ;
        return insert(ordVoiceLabel)(label)(singleton4(bp))(map2);
      };
    };
  };
  var voiceFold = function(b) {
    var foldf = function(vmap) {
      return function(bp) {
        if (bp instanceof BodyInfo) {
          if (bp.value0 instanceof Voice) {
            return bind(bindStateT(monadIdentity))(put(monadStateStateT(monadIdentity))(new VoiceLabel(bp.value0.value0.id)))(function() {
              return pure(applicativeStateT(monadIdentity))(addAtLabel(new VoiceLabel(bp.value0.value0.id))(bp)(vmap));
            });
          }
          ;
          return pure(applicativeStateT(monadIdentity))(addToAll(bp)(vmap));
        }
        ;
        if (bp instanceof Score) {
          return bind(bindStateT(monadIdentity))(get(monadStateStateT(monadIdentity)))(function(currentVoice) {
            var $71 = !isEmptyStave(bp.value0);
            if ($71) {
              return pure(applicativeStateT(monadIdentity))(addAtLabel(scoreLabelOrDefault(currentVoice)(bp.value0))(bp)(vmap));
            }
            ;
            return pure(applicativeStateT(monadIdentity))(vmap);
          });
        }
        ;
        throw new Error("Failed pattern match at Data.Abc.Voice (line 154, column 7 - line 167, column 22): " + [bp.constructor.name]);
      };
    };
    return foldM(foldableList)(monadStateT(monadIdentity))(foldf)(empty2)(b);
  };
  var voiceMap = function(tune) {
    var initialLabel = initialVoiceLabel(tune);
    return runVoiceM(initialLabel)(voiceFold(tune.body));
  };
  var partitionVoices = function(tune) {
    var tuples = toUnfoldable3(unfoldableArray)(voiceMap(tune));
    return map(functorArray)(function() {
      var $87 = retitleFromVoiceLabel(tune);
      return function($88) {
        return snd($87($88));
      };
    }())(tuples);
  };

  // output/VexFlow.Score/foreign.js
  var wrapper2 = function() {
    var VF = null;
    return {
      initialiseCanvas: function(config2) {
        return function() {
          return wrapper2.init(config2);
        };
      },
      resizeCanvas: function(renderer) {
        return function(config2) {
          return function() {
            return wrapper2.reinitCanvas(renderer, config2);
          };
        };
      },
      clearCanvas: function(renderer) {
        return function() {
          var context = renderer.getContext();
          context.clear();
        };
      },
      newStaveImpl: function(staveConfig) {
        return function(clef) {
          return function(keySignature3) {
            return function() {
              return wrapper2.makeStave(staveConfig, clef, keySignature3);
            };
          };
        };
      },
      displayBarBeginRepeat: function(stave) {
        return function(message2) {
          return function() {
            stave.setBegBarType(VF.Barline.type.REPEAT_BEGIN);
            if (message2) {
              stave.setText(message2, VF.Modifier.Position.ABOVE, { shift_y: 5, justification: VF.TextNote.Justification.LEFT });
            }
          };
        };
      },
      displayBarEndRepeat: function(stave) {
        return function() {
          stave.setEndBarType(VF.Barline.type.REPEAT_END);
        };
      },
      displayBarBothRepeat: function(stave) {
        return function() {
          stave.setBegBarType(VF.Barline.type.REPEAT_BEGIN);
          stave.setEndBarType(VF.Barline.type.REPEAT_END);
        };
      },
      displayVolta: function(stave) {
        return function(volta2) {
          return function() {
            return wrapper2.drawVolta(stave, volta2);
          };
        };
      },
      renderText: function(renderer) {
        return function(title2) {
          return function(font) {
            return function(x) {
              return function(y) {
                return function() {
                  return wrapper2.drawText(renderer, title2, font, x, y);
                };
              };
            };
          };
        };
      },
      renderStave: function(renderer) {
        return function(stave) {
          return function() {
            return wrapper2.drawStave(renderer, stave);
          };
        };
      },
      getStaveWidth: function(stave) {
        return function() {
          return stave.getWidth();
        };
      },
      addTimeSignature: function(stave) {
        return function(timeSignature) {
          return function() {
            return wrapper2.drawTimeSignature(stave, timeSignature);
          };
        };
      },
      addKeySignature: function(stave) {
        return function(keySignature3) {
          return function() {
            return wrapper2.drawKeySignature(stave, keySignature3, "");
          };
        };
      },
      addTempoMarkingImpl: function(stave) {
        return function(tempo2) {
          return function() {
            return wrapper2.drawTempoMarking(stave, tempo2);
          };
        };
      },
      renderBarContents: function(renderer) {
        return function(stave) {
          return function(beamSpecs) {
            return function(vexCurves2) {
              return function(musicSpec) {
                return function() {
                  return wrapper2.drawBarContents(renderer, stave, beamSpecs, vexCurves2, musicSpec);
                };
              };
            };
          };
        };
      },
      init: function(config2) {
        VF = Vex.Flow;
        var renderer;
        if (config2.isSVG) {
          renderer = new VF.Renderer(config2.parentElementId, VF.Renderer.Backends.SVG);
        } else {
          renderer = new VF.Renderer(config2.parentElementId, VF.Renderer.Backends.CANVAS);
        }
        renderer.resize(config2.width, config2.height);
        var context = renderer.getContext();
        context.scale(config2.scale, config2.scale);
        return renderer;
      },
      reinitCanvas: function(renderer, config2) {
        renderer.resize(config2.width, config2.height);
        var context = renderer.getContext();
        context.scale(config2.scale, config2.scale);
        return renderer;
      },
      makeStave: function(staveConfig, clef, keySignature3) {
        var staveOptions = new Object();
        staveOptions.right_bar = staveConfig.hasRightBar;
        staveOptions.fill_style = staveConfig.lineColour;
        var stave = new VF.Stave(staveConfig.x, staveConfig.y, staveConfig.width, staveOptions);
        if (staveConfig.hasDoubleRightBar) {
          stave.setEndBarType(VF.Barline.type.DOUBLE);
        }
        if (staveConfig.barNo == 0) {
          wrapper2.drawKeySignature(stave, keySignature3, clef);
        }
        return stave;
      },
      drawStave: function(renderer, stave) {
        var context = renderer.getContext();
        stave.setContext(context).draw();
      },
      drawTimeSignature: function(stave, timeSignature) {
        var meter2 = timeSignature.numerator + "/" + timeSignature.denominator;
        stave.setTimeSignature(meter2);
      },
      drawVolta: function(stave, volta2) {
        var voltaType;
        switch (volta2.voltaType) {
          case 2:
            voltaType = VF.Volta.type.BEGIN;
            break;
          case 3:
            voltaType = VF.Volta.type.MID;
            break;
          case 4:
            voltaType = VF.Volta.type.END;
            break;
          case 5:
            voltaType = VF.Volta.type.BEGIN_END;
            break;
          default:
            voltaType = VF.Volta.type.NONE;
        }
        stave.setVoltaType(voltaType, volta2.iteration, 25);
      },
      drawText: function(renderer, title2, font, x, y) {
        var context = renderer.getContext();
        context.setRawFont(font);
        context.fillText(title2, x, y);
      },
      drawKeySignature: function(stave, keySignature3, clef) {
        if (clef) {
          stave.addClef(clef);
        }
        stave.setKeySignature(keySignature3);
      },
      drawTempoMarking: function(stave, tempo2) {
        stave.setTempo(tempo2, 0);
      },
      drawBarContents: function(renderer, stave, beamSpecs, vexCurves2, musicSpec) {
        var context = renderer.getContext();
        var notes2 = musicSpec.noteSpecs.map(wrapper2.makeStaveNote);
        var tuplets = musicSpec.tuplets.map(wrapper2.makeTupletLayout(notes2));
        var ties = musicSpec.ties.map(wrapper2.makeTie(notes2));
        var beams = beamSpecs.map(wrapper2.makeBeam(notes2));
        var curves = vexCurves2.map(wrapper2.makeCurve(notes2));
        wrapper2.addRepetitions(stave, musicSpec.repetitions);
        wrapper2.formatAndDrawNotes(context, stave, notes2);
        ties.forEach(function(t) {
          t.setContext(context).draw();
        });
        beams.forEach(function(b) {
          b.setContext(context).draw();
        });
        tuplets.forEach(function(tuplet3) {
          tuplet3.setContext(context).draw();
        });
        curves.forEach(function(c) {
          c.setContext(context).draw();
        });
      },
      formatAndDrawNotes: function(context, stave, notes2) {
        const voice2 = new VF.Voice().setMode(VF.Voice.Mode.SOFT);
        voice2.addTickables(notes2);
        new VF.Formatter({ softmaxFactor: 5 }).joinVoices([voice2]).format([voice2]).formatToStave([voice2], stave);
        voice2.draw(context, stave);
      },
      makeStaveNote: function(noteSpec) {
        var sn = new VF.StaveNote(noteSpec.vexNote);
        wrapper2.addAccidentals(sn, noteSpec.accidentals);
        wrapper2.addDots(sn, noteSpec.dotCount);
        wrapper2.addOrnaments(sn, noteSpec.ornaments);
        wrapper2.addArticulations(sn, noteSpec.articulations);
        wrapper2.addChordSymbol(sn, noteSpec.chordSymbol);
        if (noteSpec.graceKeys.length > 0) {
          var graceNotes = noteSpec.graceKeys.map(wrapper2.makeGraceNote);
          wrapper2.addGraceAccidentals(graceNotes, noteSpec.graceAccidentals);
          var graceNoteGroup = new VF.GraceNoteGroup(graceNotes, true);
          sn.addModifier(graceNoteGroup.beamNotes(), 0);
        }
        return sn;
      },
      makeGraceNote: function(graceKey) {
        var note2 = { keys: [graceKey], duration: "8" };
        return new Vex.Flow.GraceNote(note2);
      },
      makeTupletLayout: function(notes2) {
        return function(vexTuplet) {
          return new Vex.Flow.Tuplet(notes2.slice(vexTuplet.startPos, vexTuplet.endPos), {
            num_notes: vexTuplet.p,
            notes_occupied: vexTuplet.q,
            location: VF.Tuplet.LOCATION_BOTTOM
          });
        };
      },
      makeBeam: function(notes2) {
        return function(beamSpec) {
          return new Vex.Flow.Beam(notes2.slice(beamSpec[0], beamSpec[1]), true);
        };
      },
      makeTie: function(notes2) {
        return function(noteIndex) {
          return new VF.StaveTie({
            first_note: notes2[noteIndex],
            last_note: notes2[noteIndex + 1],
            first_indices: [0],
            last_indices: [0]
          });
        };
      },
      makeCurve: function(notes2) {
        return function(vexCurve) {
          var controlPoints = [{ x: 0, y: 5 }, { x: 0, y: 5 }];
          if (vexCurve.to - vexCurve.from > 1) {
            controlPoints = [{ x: 0, y: 10 }, { x: 0, y: 10 }];
          }
          return new VF.Curve(notes2[vexCurve.from], notes2[vexCurve.to], {
            thickness: 2,
            cps: controlPoints
          });
        };
      },
      addAccidentals: function(staveNote, accidentals) {
        accidentals.forEach(function(accidentalString, index4) {
          if (accidentalString) {
            staveNote.addModifier(new VF.Accidental(accidentalString), index4);
          }
        });
      },
      addGraceAccidentals: function(graceNotes, accidentals) {
        accidentals.forEach(function(accidentalString, index4) {
          if (accidentalString) {
            graceNotes[index4].addModifier(new VF.Accidental(accidentalString), 0);
          }
        });
      },
      addDots: function(staveNote, dotCount) {
        if (dotCount == 2) {
          VF.Dot.buildAndAttach([staveNote], { all: true });
          VF.Dot.buildAndAttach([staveNote], { all: true });
        } else if (dotCount == 1) {
          VF.Dot.buildAndAttach([staveNote], { all: true });
        }
      },
      addOrnaments: function(staveNote, ornaments2) {
        ornaments2.forEach(function(ornament, index4) {
          staveNote.addModifier(new VF.Ornament(ornament), 0);
        });
      },
      addChordSymbol: function(staveNote, chordSymbol2) {
        var chord3 = new VF.ChordSymbol().addGlyphOrText(chordSymbol2);
        staveNote.addModifier(chord3, 0);
      },
      addArticulations: function(staveNote, articulations2) {
        articulations2.forEach(function(articulation, index4) {
          staveNote.addModifier(new VF.Articulation(articulation).setPosition(4), 0);
        });
      },
      addRepetitions: function(stave, repetitions) {
        repetitions.forEach(function(repetition, index4) {
          stave.setRepetitionType(repetition, 25);
        });
      }
    };
  }();
  var initialiseCanvas = wrapper2.initialiseCanvas;
  var resizeCanvas = wrapper2.resizeCanvas;
  var clearCanvas = wrapper2.clearCanvas;
  var newStaveImpl = wrapper2.newStaveImpl;
  var renderStave = wrapper2.renderStave;
  var renderText = wrapper2.renderText;
  var getStaveWidth = wrapper2.getStaveWidth;
  var displayBarBeginRepeat = wrapper2.displayBarBeginRepeat;
  var displayBarEndRepeat = wrapper2.displayBarEndRepeat;
  var displayBarBothRepeat = wrapper2.displayBarBothRepeat;
  var renderBarContents = wrapper2.renderBarContents;
  var displayVolta = wrapper2.displayVolta;
  var addTimeSignature = wrapper2.addTimeSignature;
  var addKeySignature = wrapper2.addKeySignature;
  var addTempoMarkingImpl = wrapper2.addTempoMarkingImpl;

  // output/Data.String.CodePoints/foreign.js
  var hasArrayFrom = typeof Array.from === "function";
  var hasStringIterator = typeof Symbol !== "undefined" && Symbol != null && typeof Symbol.iterator !== "undefined" && typeof String.prototype[Symbol.iterator] === "function";
  var hasFromCodePoint = typeof String.prototype.fromCodePoint === "function";
  var hasCodePointAt = typeof String.prototype.codePointAt === "function";
  var _unsafeCodePointAt0 = function(fallback) {
    return hasCodePointAt ? function(str) {
      return str.codePointAt(0);
    } : fallback;
  };
  var _singleton = function(fallback) {
    return hasFromCodePoint ? String.fromCodePoint : fallback;
  };
  var _take = function(fallback) {
    return function(n) {
      if (hasStringIterator) {
        return function(str) {
          var accum = "";
          var iter = str[Symbol.iterator]();
          for (var i = 0; i < n; ++i) {
            var o = iter.next();
            if (o.done)
              return accum;
            accum += o.value;
          }
          return accum;
        };
      }
      return fallback(n);
    };
  };
  var _toCodePointArray = function(fallback) {
    return function(unsafeCodePointAt02) {
      if (hasArrayFrom) {
        return function(str) {
          return Array.from(str, unsafeCodePointAt02);
        };
      }
      return fallback;
    };
  };

  // output/Data.String.CodeUnits/foreign.js
  var fromCharArray = function(a) {
    return a.join("");
  };
  var toCharArray = function(s) {
    return s.split("");
  };
  var singleton7 = function(c) {
    return c;
  };
  var _charAt = function(just) {
    return function(nothing) {
      return function(i) {
        return function(s) {
          return i >= 0 && i < s.length ? just(s.charAt(i)) : nothing;
        };
      };
    };
  };
  var length4 = function(s) {
    return s.length;
  };
  var drop3 = function(n) {
    return function(s) {
      return s.substring(n);
    };
  };

  // output/Data.String.Unsafe/foreign.js
  var charAt = function(i) {
    return function(s) {
      if (i >= 0 && i < s.length)
        return s.charAt(i);
      throw new Error("Data.String.Unsafe.charAt: Invalid index.");
    };
  };

  // output/Data.String.CodeUnits/index.js
  var charAt2 = /* @__PURE__ */ function() {
    return _charAt(Just.create)(Nothing.value);
  }();

  // output/Data.String.CodePoints/index.js
  var $runtime_lazy2 = function(name2, moduleName, init4) {
    var state2 = 0;
    var val;
    return function(lineNumber) {
      if (state2 === 2)
        return val;
      if (state2 === 1)
        throw new ReferenceError(name2 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state2 = 1;
      val = init4();
      state2 = 2;
      return val;
    };
  };
  var CodePoint = function(x) {
    return x;
  };
  var unsurrogate = function(lead) {
    return function(trail) {
      return (((lead - 55296 | 0) * 1024 | 0) + (trail - 56320 | 0) | 0) + 65536 | 0;
    };
  };
  var isTrail = function(cu) {
    return 56320 <= cu && cu <= 57343;
  };
  var isLead = function(cu) {
    return 55296 <= cu && cu <= 56319;
  };
  var uncons2 = function(s) {
    var v = length4(s);
    if (v === 0) {
      return Nothing.value;
    }
    ;
    if (v === 1) {
      return new Just({
        head: fromEnum(boundedEnumChar)(charAt(0)(s)),
        tail: ""
      });
    }
    ;
    var cu1 = fromEnum(boundedEnumChar)(charAt(1)(s));
    var cu0 = fromEnum(boundedEnumChar)(charAt(0)(s));
    var $21 = isLead(cu0) && isTrail(cu1);
    if ($21) {
      return new Just({
        head: unsurrogate(cu0)(cu1),
        tail: drop3(2)(s)
      });
    }
    ;
    return new Just({
      head: cu0,
      tail: drop3(1)(s)
    });
  };
  var unconsButWithTuple = function(s) {
    return map(functorMaybe)(function(v) {
      return new Tuple(v.head, v.tail);
    })(uncons2(s));
  };
  var toCodePointArrayFallback = function(s) {
    return unfoldr(unfoldableArray)(unconsButWithTuple)(s);
  };
  var unsafeCodePointAt0Fallback = function(s) {
    var cu0 = fromEnum(boundedEnumChar)(charAt(0)(s));
    var $25 = isLead(cu0) && length4(s) > 1;
    if ($25) {
      var cu1 = fromEnum(boundedEnumChar)(charAt(1)(s));
      var $26 = isTrail(cu1);
      if ($26) {
        return unsurrogate(cu0)(cu1);
      }
      ;
      return cu0;
    }
    ;
    return cu0;
  };
  var unsafeCodePointAt0 = /* @__PURE__ */ _unsafeCodePointAt0(unsafeCodePointAt0Fallback);
  var toCodePointArray = /* @__PURE__ */ _toCodePointArray(toCodePointArrayFallback)(unsafeCodePointAt0);
  var length5 = function($52) {
    return length(toCodePointArray($52));
  };
  var fromCharCode2 = /* @__PURE__ */ function() {
    var $53 = toEnumWithDefaults(boundedEnumChar)(bottom(boundedChar))(top(boundedChar));
    return function($54) {
      return singleton7($53($54));
    };
  }();
  var singletonFallback = function(v) {
    if (v <= 65535) {
      return fromCharCode2(v);
    }
    ;
    var lead = div(euclideanRingInt)(v - 65536 | 0)(1024) + 55296 | 0;
    var trail = mod(euclideanRingInt)(v - 65536 | 0)(1024) + 56320 | 0;
    return fromCharCode2(lead) + fromCharCode2(trail);
  };
  var singleton8 = /* @__PURE__ */ _singleton(singletonFallback);
  var takeFallback = function(n) {
    return function(v) {
      if (n < 1) {
        return "";
      }
      ;
      var v1 = uncons2(v);
      if (v1 instanceof Just) {
        return singleton8(v1.value0.head) + takeFallback(n - 1 | 0)(v1.value0.tail);
      }
      ;
      return v;
    };
  };
  var take4 = /* @__PURE__ */ _take(takeFallback);
  var splitAt2 = function(i) {
    return function(s) {
      var before = take4(i)(s);
      return {
        before,
        after: drop3(length4(before))(s)
      };
    };
  };
  var eqCodePoint = {
    eq: function(x) {
      return function(y) {
        return x === y;
      };
    }
  };
  var ordCodePoint = {
    compare: function(x) {
      return function(y) {
        return compare(ordInt)(x)(y);
      };
    },
    Eq0: function() {
      return eqCodePoint;
    }
  };
  var drop4 = function(n) {
    return function(s) {
      return drop3(length4(take4(n)(s)))(s);
    };
  };
  var codePointFromChar = /* @__PURE__ */ function() {
    var $55 = fromEnum(boundedEnumChar);
    return function($56) {
      return CodePoint($55($56));
    };
  }();
  var boundedCodePoint = {
    bottom: 0,
    top: 1114111,
    Ord0: function() {
      return ordCodePoint;
    }
  };
  var boundedEnumCodePoint = /* @__PURE__ */ function() {
    return {
      cardinality: 1114111 + 1 | 0,
      fromEnum: function(v) {
        return v;
      },
      toEnum: function(n) {
        if (n >= 0 && n <= 1114111) {
          return new Just(n);
        }
        ;
        if (otherwise) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Data.String.CodePoints (line 63, column 1 - line 68, column 26): " + [n.constructor.name]);
      },
      Bounded0: function() {
        return boundedCodePoint;
      },
      Enum1: function() {
        return $lazy_enumCodePoint(0);
      }
    };
  }();
  var $lazy_enumCodePoint = /* @__PURE__ */ $runtime_lazy2("enumCodePoint", "Data.String.CodePoints", function() {
    return {
      succ: defaultSucc(toEnum(boundedEnumCodePoint))(fromEnum(boundedEnumCodePoint)),
      pred: defaultPred(toEnum(boundedEnumCodePoint))(fromEnum(boundedEnumCodePoint)),
      Ord0: function() {
        return ordCodePoint;
      }
    };
  });

  // output/Data.Array.NonEmpty.Internal/foreign.js
  var traverse1Impl = function() {
    function Cont(fn) {
      this.fn = fn;
    }
    var emptyList = {};
    var ConsCell = function(head6, tail2) {
      this.head = head6;
      this.tail = tail2;
    };
    function finalCell(head6) {
      return new ConsCell(head6, emptyList);
    }
    function consList(x) {
      return function(xs) {
        return new ConsCell(x, xs);
      };
    }
    function listToArray(list) {
      var arr = [];
      var xs = list;
      while (xs !== emptyList) {
        arr.push(xs.head);
        xs = xs.tail;
      }
      return arr;
    }
    return function(apply2) {
      return function(map2) {
        return function(f) {
          var buildFrom = function(x, ys) {
            return apply2(map2(consList)(f(x)))(ys);
          };
          var go = function(acc, currentLen, xs) {
            if (currentLen === 0) {
              return acc;
            } else {
              var last4 = xs[currentLen - 1];
              return new Cont(function() {
                var built = go(buildFrom(last4, acc), currentLen - 1, xs);
                return built;
              });
            }
          };
          return function(array) {
            var acc = map2(finalCell)(f(array[array.length - 1]));
            var result = go(acc, array.length - 1, array);
            while (result instanceof Cont) {
              result = result.fn();
            }
            return map2(listToArray)(result);
          };
        };
      };
    };
  }();

  // output/Data.Array.NonEmpty/index.js
  var toArray = function(v) {
    return v;
  };
  var adaptMaybe = function(f) {
    var $70 = fromJust();
    return function($71) {
      return $70(f(toArray($71)));
    };
  };
  var head5 = /* @__PURE__ */ adaptMaybe(head);
  var last3 = /* @__PURE__ */ adaptMaybe(last);
  var adaptAny = function(f) {
    return function($73) {
      return f(toArray($73));
    };
  };
  var length6 = /* @__PURE__ */ adaptAny(length);

  // output/Data.Lens.AffineTraversal/index.js
  var affineTraversal$prime = function(to) {
    return function(dictStrong) {
      return function(dictChoice) {
        return function(pab) {
          return dimap(dictChoice.Profunctor0())(to)(function(v) {
            return either(identity(categoryFn))(v.value0)(v.value1);
          })(second(dictStrong)(right(dictChoice)(pab)));
        };
      };
    };
  };
  var affineTraversal = function(set3) {
    return function(pre) {
      return function(dictStrong) {
        return function(dictChoice) {
          return affineTraversal$prime(fanout(categoryFn)(strongFn)(set3)(pre))(dictStrong)(dictChoice);
        };
      };
    };
  };

  // output/Foreign.Object/foreign.js
  function toArrayWithKey(f) {
    return function(m) {
      var r = [];
      for (var k in m) {
        if (hasOwnProperty.call(m, k)) {
          r.push(f(k)(m[k]));
        }
      }
      return r;
    };
  }
  var keys2 = Object.keys || toArrayWithKey(function(k) {
    return function() {
      return k;
    };
  });

  // output/Data.Lens.Index/index.js
  var indexMap = function(dictOrd) {
    return {
      ix: function(k) {
        return function(dictStrong) {
          return function(dictChoice) {
            var set3 = function(s) {
              return function(b) {
                return update(dictOrd)(function(v) {
                  return new Just(b);
                })(k)(s);
              };
            };
            var pre = function(s) {
              return maybe(new Left(s))(Right.create)(lookup(dictOrd)(k)(s));
            };
            return affineTraversal(set3)(pre)(dictStrong)(dictChoice);
          };
        };
      }
    };
  };

  // output/Data.Lens.At/index.js
  var atMap = function(dictOrd) {
    return {
      at: function(k) {
        return function(dictStrong) {
          return lens(lookup(dictOrd)(k))(function(m) {
            return maybe$prime(function(v) {
              return $$delete(dictOrd)(k)(m);
            })(function(v) {
              return insert(dictOrd)(k)(v)(m);
            });
          })(dictStrong);
        };
      },
      Index0: function() {
        return indexMap(dictOrd);
      }
    };
  };
  var at = function(dict) {
    return dict.at;
  };

  // output/VexFlow.Abc.Beat/index.js
  var exactBeatNumber = function(phraseDur) {
    return function(beatDur) {
      return function(noteIndex) {
        var beats = div(euclideanRingRatio(ordInt)(euclideanRingInt))(phraseDur)(beatDur);
        var $1 = noteIndex === 0;
        if ($1) {
          return Nothing.value;
        }
        ;
        var v = denominator(beats);
        if (v === 1) {
          return new Just({
            beatNumber: numerator(beats),
            noteIndex
          });
        }
        ;
        return Nothing.value;
      };
    };
  };
  var beatDuration = function(ts) {
    if (ts.numerator === 3 && ts.denominator === 2) {
      return reduce(ordInt)(euclideanRingInt)(1)(2);
    }
    ;
    if (ts.numerator === 6 && ts.denominator === 8) {
      return reduce(ordInt)(euclideanRingInt)(3)(8);
    }
    ;
    if (ts.numerator === 9 && ts.denominator === 8) {
      return reduce(ordInt)(euclideanRingInt)(3)(8);
    }
    ;
    if (ts.numerator === 12 && ts.denominator === 8) {
      return reduce(ordInt)(euclideanRingInt)(3)(8);
    }
    ;
    return reduce(ordInt)(euclideanRingInt)(1)(ts.denominator);
  };

  // output/VexFlow.Abc.ContextChange/index.js
  var Treble = /* @__PURE__ */ function() {
    function Treble2() {
    }
    ;
    Treble2.value = new Treble2();
    return Treble2;
  }();
  var Alto = /* @__PURE__ */ function() {
    function Alto2() {
    }
    ;
    Alto2.value = new Alto2();
    return Alto2;
  }();
  var Tenor = /* @__PURE__ */ function() {
    function Tenor2() {
    }
    ;
    Tenor2.value = new Tenor2();
    return Tenor2;
  }();
  var Bass = /* @__PURE__ */ function() {
    function Bass2() {
    }
    ;
    Bass2.value = new Bass2();
    return Bass2;
  }();
  var MeterChange = /* @__PURE__ */ function() {
    function MeterChange2(value0) {
      this.value0 = value0;
    }
    ;
    MeterChange2.create = function(value0) {
      return new MeterChange2(value0);
    };
    return MeterChange2;
  }();
  var KeyChange = /* @__PURE__ */ function() {
    function KeyChange2(value0) {
      this.value0 = value0;
    }
    ;
    KeyChange2.create = function(value0) {
      return new KeyChange2(value0);
    };
    return KeyChange2;
  }();
  var UnitNoteChange = /* @__PURE__ */ function() {
    function UnitNoteChange2(value0) {
      this.value0 = value0;
    }
    ;
    UnitNoteChange2.create = function(value0) {
      return new UnitNoteChange2(value0);
    };
    return UnitNoteChange2;
  }();
  var ClefChange = /* @__PURE__ */ function() {
    function ClefChange2(value0) {
      this.value0 = value0;
    }
    ;
    ClefChange2.create = function(value0) {
      return new ClefChange2(value0);
    };
    return ClefChange2;
  }();
  var showClef = {
    show: function(v) {
      if (v instanceof Treble) {
        return "treble";
      }
      ;
      if (v instanceof Alto) {
        return "alto";
      }
      ;
      if (v instanceof Tenor) {
        return "tenor";
      }
      ;
      if (v instanceof Bass) {
        return "bass";
      }
      ;
      throw new Error("Failed pattern match at VexFlow.Abc.ContextChange (line 19, column 1 - line 23, column 21): " + [v.constructor.name]);
    }
  };

  // output/VexFlow.Abc.Utils/index.js
  var updateAbcContext = function(abcContext) {
    return function(change) {
      if (change instanceof MeterChange) {
        var timeSignature = {
          numerator: change.value0.value0,
          denominator: change.value0.value1
        };
        return {
          timeSignature,
          keySignature: abcContext.keySignature,
          mTempo: abcContext.mTempo,
          unitNoteLength: abcContext.unitNoteLength,
          clef: abcContext.clef,
          staveNo: abcContext.staveNo,
          accumulatedStaveWidth: abcContext.accumulatedStaveWidth,
          isMidVolta: abcContext.isMidVolta,
          isNewTimeSignature: true,
          maxWidth: abcContext.maxWidth,
          pendingRepeatBegin: abcContext.pendingRepeatBegin,
          beatDuration: beatDuration({
            numerator: change.value0.value0,
            denominator: change.value0.value1
          }),
          showChordSymbols: abcContext.showChordSymbols
        };
      }
      ;
      if (change instanceof KeyChange) {
        return {
          timeSignature: abcContext.timeSignature,
          keySignature: change.value0.keySignature,
          mTempo: abcContext.mTempo,
          unitNoteLength: abcContext.unitNoteLength,
          clef: abcContext.clef,
          staveNo: abcContext.staveNo,
          accumulatedStaveWidth: abcContext.accumulatedStaveWidth,
          isMidVolta: abcContext.isMidVolta,
          isNewTimeSignature: false,
          maxWidth: abcContext.maxWidth,
          pendingRepeatBegin: abcContext.pendingRepeatBegin,
          beatDuration: abcContext.beatDuration,
          showChordSymbols: abcContext.showChordSymbols
        };
      }
      ;
      if (change instanceof UnitNoteChange) {
        return {
          timeSignature: abcContext.timeSignature,
          keySignature: abcContext.keySignature,
          mTempo: abcContext.mTempo,
          unitNoteLength: change.value0,
          clef: abcContext.clef,
          staveNo: abcContext.staveNo,
          accumulatedStaveWidth: abcContext.accumulatedStaveWidth,
          isMidVolta: abcContext.isMidVolta,
          isNewTimeSignature: false,
          maxWidth: abcContext.maxWidth,
          pendingRepeatBegin: abcContext.pendingRepeatBegin,
          beatDuration: abcContext.beatDuration,
          showChordSymbols: abcContext.showChordSymbols
        };
      }
      ;
      if (change instanceof ClefChange) {
        return {
          timeSignature: abcContext.timeSignature,
          keySignature: abcContext.keySignature,
          mTempo: abcContext.mTempo,
          unitNoteLength: abcContext.unitNoteLength,
          clef: change.value0,
          staveNo: abcContext.staveNo,
          accumulatedStaveWidth: abcContext.accumulatedStaveWidth,
          isMidVolta: abcContext.isMidVolta,
          isNewTimeSignature: false,
          maxWidth: abcContext.maxWidth,
          pendingRepeatBegin: abcContext.pendingRepeatBegin,
          beatDuration: abcContext.beatDuration,
          showChordSymbols: abcContext.showChordSymbols
        };
      }
      ;
      throw new Error("Failed pattern match at VexFlow.Abc.Utils (line 198, column 3 - line 223, column 10): " + [change.constructor.name]);
    };
  };
  var noteTicks = function(unitNoteLength2) {
    return function(d) {
      return round2(toNumber2(mul(semiringRatio(ordInt)(euclideanRingInt))(mul(semiringRatio(ordInt)(euclideanRingInt))(unitNoteLength2)(d))(fromInt(128))));
    };
  };
  var vexDuration = function(unitNoteLength2) {
    return function(d) {
      var v = noteTicks(unitNoteLength2)(d);
      if (v === 128) {
        return new Right({
          vexDurString: "w",
          dots: 0
        });
      }
      ;
      if (v === 112) {
        return new Right({
          vexDurString: "h",
          dots: 2
        });
      }
      ;
      if (v === 96) {
        return new Right({
          vexDurString: "h",
          dots: 1
        });
      }
      ;
      if (v === 64) {
        return new Right({
          vexDurString: "h",
          dots: 0
        });
      }
      ;
      if (v === 56) {
        return new Right({
          vexDurString: "q",
          dots: 2
        });
      }
      ;
      if (v === 48) {
        return new Right({
          vexDurString: "q",
          dots: 1
        });
      }
      ;
      if (v === 32) {
        return new Right({
          vexDurString: "q",
          dots: 0
        });
      }
      ;
      if (v === 28) {
        return new Right({
          vexDurString: "8",
          dots: 2
        });
      }
      ;
      if (v === 24) {
        return new Right({
          vexDurString: "8",
          dots: 1
        });
      }
      ;
      if (v === 16) {
        return new Right({
          vexDurString: "8",
          dots: 0
        });
      }
      ;
      if (v === 14) {
        return new Right({
          vexDurString: "16",
          dots: 2
        });
      }
      ;
      if (v === 12) {
        return new Right({
          vexDurString: "16",
          dots: 1
        });
      }
      ;
      if (v === 8) {
        return new Right({
          vexDurString: "16",
          dots: 0
        });
      }
      ;
      if (v === 7) {
        return new Right({
          vexDurString: "32",
          dots: 2
        });
      }
      ;
      if (v === 6) {
        return new Right({
          vexDurString: "32",
          dots: 1
        });
      }
      ;
      if (v === 4) {
        return new Right({
          vexDurString: "32",
          dots: 0
        });
      }
      ;
      if (v === 3) {
        return new Right({
          vexDurString: "64",
          dots: 1
        });
      }
      ;
      if (v === 2) {
        return new Right({
          vexDurString: "64",
          dots: 0
        });
      }
      ;
      return new Left("too long or too dotted duration: " + (show(showInt)(numerator(d)) + ("/" + show(showInt)(denominator(d)))));
    };
  };
  var noteDotCount = function(ctx) {
    return function(abcNote2) {
      var v = vexDuration(ctx.unitNoteLength)(abcNote2.duration);
      if (v instanceof Right) {
        return v.value0.dots;
      }
      ;
      return 0;
    };
  };
  var normaliseBroken = function(broken) {
    return function(gn1) {
      return function(gn2) {
        var up = function(i) {
          return add(semiringRatio(ordInt)(euclideanRingInt))(fromInt(1))(dotFactor(i));
        };
        var down = function(i) {
          return sub(ringRatio(ordInt)(euclideanRingInt))(fromInt(1))(dotFactor(i));
        };
        if (broken instanceof LeftArrow) {
          var righta = {
            duration: mul(semiringRatio(ordInt)(euclideanRingInt))(gn2.abcNote.duration)(up(broken.value0)),
            accidental: gn2.abcNote.accidental,
            octave: gn2.abcNote.octave,
            pitchClass: gn2.abcNote.pitchClass,
            tied: gn2.abcNote.tied
          };
          var lefta = {
            duration: mul(semiringRatio(ordInt)(euclideanRingInt))(gn1.abcNote.duration)(down(broken.value0)),
            accidental: gn1.abcNote.accidental,
            octave: gn1.abcNote.octave,
            pitchClass: gn1.abcNote.pitchClass,
            tied: gn1.abcNote.tied
          };
          return new Tuple({
            abcNote: lefta,
            decorations: gn1.decorations,
            leftSlurs: gn1.leftSlurs,
            maybeGrace: gn1.maybeGrace,
            rightSlurs: gn1.rightSlurs
          }, {
            abcNote: righta,
            decorations: gn2.decorations,
            leftSlurs: gn2.leftSlurs,
            maybeGrace: gn2.maybeGrace,
            rightSlurs: gn2.rightSlurs
          });
        }
        ;
        if (broken instanceof RightArrow) {
          var righta = {
            duration: mul(semiringRatio(ordInt)(euclideanRingInt))(gn2.abcNote.duration)(down(broken.value0)),
            accidental: gn2.abcNote.accidental,
            octave: gn2.abcNote.octave,
            pitchClass: gn2.abcNote.pitchClass,
            tied: gn2.abcNote.tied
          };
          var lefta = {
            duration: mul(semiringRatio(ordInt)(euclideanRingInt))(gn1.abcNote.duration)(up(broken.value0)),
            accidental: gn1.abcNote.accidental,
            octave: gn1.abcNote.octave,
            pitchClass: gn1.abcNote.pitchClass,
            tied: gn1.abcNote.tied
          };
          return new Tuple({
            abcNote: lefta,
            decorations: gn1.decorations,
            leftSlurs: gn1.leftSlurs,
            maybeGrace: gn1.maybeGrace,
            rightSlurs: gn1.rightSlurs
          }, {
            abcNote: righta,
            decorations: gn2.decorations,
            leftSlurs: gn2.leftSlurs,
            maybeGrace: gn2.maybeGrace,
            rightSlurs: gn2.rightSlurs
          });
        }
        ;
        throw new Error("Failed pattern match at VexFlow.Abc.Utils (line 139, column 5 - line 158, column 71): " + [broken.constructor.name]);
      };
    };
  };
  var nextStaveNo = function(v) {
    if (v instanceof Nothing) {
      return new Just(0);
    }
    ;
    if (v instanceof Just) {
      return new Just(v.value0 + 1 | 0);
    }
    ;
    throw new Error("Failed pattern match at VexFlow.Abc.Utils (line 233, column 1 - line 233, column 38): " + [v.constructor.name]);
  };
  var isEmptyMusicSpec = function(v) {
    return $$null(v.noteSpecs) && $$null(v.repetitions);
  };
  var compoundVexDuration = function(vexDur) {
    var dStr = fromCharArray(replicate(vexDur.dots)("d"));
    return vexDur.vexDurString + dStr;
  };
  var cMajor = defaultKey;
  var buildTempo = function(bpm) {
    return function(d) {
      var v = vexDuration(fromInt(1))(d);
      if (v instanceof Right) {
        return new Right({
          duration: v.value0.vexDurString,
          dots: v.value0.dots,
          bpm
        });
      }
      ;
      if (v instanceof Left) {
        return new Left(v.value0);
      }
      ;
      throw new Error("Failed pattern match at VexFlow.Abc.Utils (line 107, column 3 - line 111, column 15): " + [v.constructor.name]);
    };
  };
  var tempoMarking = function(tempoSig) {
    var tempoNoteLength = foldl(foldableNonEmptyList)(add(semiringRatio(ordInt)(euclideanRingInt)))(fromInt(0))(tempoSig.noteLengths);
    return hush(buildTempo(tempoSig.bpm)(tempoNoteLength));
  };
  var applyContextChanges = function(abcContext) {
    return function(eSpec) {
      if (eSpec instanceof Right) {
        return foldl(foldableArray)(updateAbcContext)(abcContext)(eSpec.value0.contextChanges);
      }
      ;
      return abcContext;
    };
  };
  var _clef = function(dictStrong) {
    return at(atMap(ordString))("clef")(dictStrong);
  };
  var getVoiceClef = function(tune) {
    var f = function(s) {
      if (s === "Alto") {
        return Alto.value;
      }
      ;
      if (s === "alto") {
        return Alto.value;
      }
      ;
      if (s === "Tenor") {
        return Tenor.value;
      }
      ;
      if (s === "tenor") {
        return Tenor.value;
      }
      ;
      if (s === "Bass") {
        return Bass.value;
      }
      ;
      if (s === "bass") {
        return Bass.value;
      }
      ;
      return Treble.value;
    };
    var clefString = join(bindMaybe)(lastOf(function() {
      var $46 = _headers(strongForget);
      var $47 = traversed(traversableList)(wanderForget(monoidLast));
      var $48 = _Voice(choiceForget(monoidLast));
      var $49 = _properties(strongForget);
      var $50 = _clef(strongForget);
      return function($51) {
        return $46($47($48($49($50($51)))));
      };
    }())(tune));
    return map(functorMaybe)(f)(clefString);
  };
  var initialAbcContext = function(tune) {
    return function(config2) {
      var meterSignature2 = fromMaybe(new Tuple(4, 4))(getMeter(tune));
      var unitNoteLength2 = fromMaybe(reduce(ordInt)(euclideanRingInt)(1)(8))(getUnitNoteLength(tune));
      var modifiedKeySignature = fromMaybe(cMajor)(map(functorMaybe)(identity(categoryFn))(getKeySig(tune)));
      var mTempo = maybe(Nothing.value)(tempoMarking)(getTempoSig(tune));
      var clef = fromMaybe(Treble.value)(getVoiceClef(tune));
      var $43 = $$null2(modifiedKeySignature.modifications);
      if ($43) {
        return new Right({
          timeSignature: {
            numerator: meterSignature2.value0,
            denominator: meterSignature2.value1
          },
          keySignature: modifiedKeySignature.keySignature,
          mTempo,
          unitNoteLength: unitNoteLength2,
          clef,
          staveNo: Nothing.value,
          accumulatedStaveWidth: staveIndentation,
          isMidVolta: false,
          isNewTimeSignature: true,
          maxWidth: round2(toNumber(config2.width - staveIndentation | 0) / config2.scale),
          pendingRepeatBegin: false,
          beatDuration: beatDuration({
            numerator: meterSignature2.value0,
            denominator: meterSignature2.value1
          }),
          showChordSymbols: config2.showChordSymbols
        });
      }
      ;
      return new Left("modifications to standard key signatures are not supported");
    };
  };

  // output/VexFlow.Abc.Volta/index.js
  var isEndVolta = function(barLine) {
    if (barLine.iteration instanceof Nothing) {
      return notEq(eqThickness)(barLine.thickness)(Thin.value) && notEq(eqThickness)(barLine.thickness)(Invisible.value) || (barLine.endRepeats + barLine.startRepeats | 0) > 0;
    }
    ;
    if (barLine.iteration instanceof Just) {
      return true;
    }
    ;
    throw new Error("Failed pattern match at VexFlow.Abc.Volta (line 105, column 3 - line 110, column 11): " + [barLine.iteration.constructor.name]);
  };
  var isMidVolta = function(barLine) {
    return function(current) {
      var $3 = isJust(barLine.iteration);
      if ($3) {
        return true;
      }
      ;
      var $4 = isEndVolta(barLine);
      if ($4) {
        return false;
      }
      ;
      return current;
    };
  };
  var startVolta = function(barLine) {
    return function(isCurrentlyMidVolta) {
      if (barLine.iteration instanceof Nothing) {
        if (isCurrentlyMidVolta) {
          var $7 = isEndVolta(barLine);
          if ($7) {
            return Nothing.value;
          }
          ;
          return new Just({
            voltaType: 3,
            iteration: ""
          });
        }
        ;
        return Nothing.value;
      }
      ;
      if (barLine.iteration instanceof Just) {
        return new Just({
          voltaType: 2,
          iteration: intercalateMap(foldable1NonEmptyList)(semigroupString)(",")(show(showVolta))(barLine.iteration.value0)
        });
      }
      ;
      throw new Error("Failed pattern match at VexFlow.Abc.Volta (line 44, column 3 - line 60, column 10): " + [barLine.iteration.constructor.name]);
    };
  };
  var completeVolta = function(mvolta) {
    if (mvolta instanceof Nothing) {
      return Nothing.value;
    }
    ;
    if (mvolta instanceof Just) {
      var newVoltaType = function() {
        if (mvolta.value0.voltaType === 2) {
          return 5;
        }
        ;
        if (mvolta.value0.voltaType === 3) {
          return 4;
        }
        ;
        if (mvolta.value0.voltaType === 5) {
          return 4;
        }
        ;
        return mvolta.value0.voltaType;
      }();
      return new Just({
        voltaType: newVoltaType,
        iteration: mvolta.value0.iteration
      });
    }
    ;
    throw new Error("Failed pattern match at VexFlow.Abc.Volta (line 67, column 3 - line 84, column 50): " + [mvolta.constructor.name]);
  };

  // output/VexFlow.Abc.BarEnd/index.js
  var staveWidth = function(bs) {
    return maybe(0)(function(b) {
      return b.xOffset + b.width | 0;
    })(last(bs));
  };
  var staveEndsWithRepeatBegin = function(bs) {
    var isBeginVolta = function(b) {
      return b.startLine.startRepeats > 0;
    };
    return maybe(false)(isBeginVolta)(last(bs));
  };
  var simpleBarLine = /* @__PURE__ */ function() {
    return {
      endRepeats: 0,
      thickness: Thin.value,
      startRepeats: 0,
      iteration: Nothing.value
    };
  }();
  var redundantBar = function(barSpec) {
    return isEmptyMusicSpec(barSpec.musicSpec) && barSpec.barNumber !== 0;
  };
  var fillStaveLine = function(maxWidth) {
    return function(bs) {
      var v = last(bs);
      if (v instanceof Just) {
        var currentWidth = v.value0.xOffset + v.value0.width | 0;
        var $4 = currentWidth <= maxWidth;
        if ($4) {
          var completionBar = {
            barNumber: v.value0.barNumber + 1 | 0,
            width: maxWidth - currentWidth | 0,
            xOffset: currentWidth,
            startLine: simpleBarLine,
            endLineThickness: NoLine.value,
            endLineRepeat: false,
            volta: Nothing.value,
            beamSpecs: [],
            curves: [],
            musicSpec: mempty(musicSpecMonoid),
            timeSignature: v.value0.timeSignature
          };
          return snoc(bs)(completionBar);
        }
        ;
        return bs;
      }
      ;
      if (v instanceof Nothing) {
        return bs;
      }
      ;
      throw new Error("Failed pattern match at VexFlow.Abc.BarEnd (line 84, column 3 - line 108, column 9): " + [v.constructor.name]);
    };
  };
  var barlineThickness = function(barLine) {
    if (barLine.thickness instanceof Thin) {
      return Single.value;
    }
    ;
    if (barLine.thickness instanceof Invisible) {
      return NoLine.value;
    }
    ;
    return Double.value;
  };
  var shiftBarEnd = function(acc) {
    return function(barSpec) {
      return bind(bindStateT(monadIdentity))(get(monadStateStateT(monadIdentity)))(function(lastBarType) {
        var newVolta = function() {
          var $7 = isEndVolta(lastBarType);
          if ($7) {
            return completeVolta(barSpec.volta);
          }
          ;
          return barSpec.volta;
        }();
        var lastLineThickness = barlineThickness(lastBarType);
        var isLastBarEndRepeat = lastBarType.endRepeats > 0;
        var newBarSpec = {
          endLineRepeat: isLastBarEndRepeat,
          endLineThickness: lastLineThickness,
          volta: newVolta,
          barNumber: barSpec.barNumber,
          beamSpecs: barSpec.beamSpecs,
          curves: barSpec.curves,
          musicSpec: barSpec.musicSpec,
          startLine: barSpec.startLine,
          timeSignature: barSpec.timeSignature,
          width: barSpec.width,
          xOffset: barSpec.xOffset
        };
        return bind(bindStateT(monadIdentity))(put(monadStateStateT(monadIdentity))(barSpec.startLine))(function() {
          var $8 = redundantBar(barSpec);
          if ($8) {
            return pure(applicativeStateT(monadIdentity))(acc);
          }
          ;
          return pure(applicativeStateT(monadIdentity))(cons2(newBarSpec)(acc));
        });
      });
    };
  };
  var shiftBarEnds = /* @__PURE__ */ foldM(foldableArray)(/* @__PURE__ */ monadStateT(monadIdentity))(shiftBarEnd)(/* @__PURE__ */ mempty(monoidArray));
  var repositionBarEndRepeats = function(bs) {
    return evalState(shiftBarEnds(reverse(bs)))(simpleBarLine);
  };

  // output/Data.String.Utils/foreign.js
  function endsWithImpl(searchString, s) {
    return s.endsWith(searchString);
  }
  function includesImpl(searchString, str) {
    return str.includes(searchString);
  }
  function startsWithImpl(searchString, s) {
    return s.startsWith(searchString);
  }

  // output/Data.String.Regex/foreign.js
  var regexImpl = function(left2) {
    return function(right2) {
      return function(s1) {
        return function(s2) {
          try {
            return right2(new RegExp(s1, s2));
          } catch (e) {
            return left2(e.message);
          }
        };
      };
    };
  };
  var _match = function(just) {
    return function(nothing) {
      return function(r) {
        return function(s) {
          var m = s.match(r);
          if (m == null || m.length === 0) {
            return nothing;
          } else {
            for (var i = 0; i < m.length; i++) {
              m[i] = m[i] == null ? nothing : just(m[i]);
            }
            return just(m);
          }
        };
      };
    };
  };

  // output/Data.String.Regex.Flags/index.js
  var noFlags = {
    global: false,
    ignoreCase: false,
    multiline: false,
    dotAll: false,
    sticky: false,
    unicode: false
  };

  // output/Data.String.Regex/index.js
  var renderFlags = function(v) {
    return function() {
      if (v.global) {
        return "g";
      }
      ;
      return "";
    }() + (function() {
      if (v.ignoreCase) {
        return "i";
      }
      ;
      return "";
    }() + (function() {
      if (v.multiline) {
        return "m";
      }
      ;
      return "";
    }() + (function() {
      if (v.dotAll) {
        return "s";
      }
      ;
      return "";
    }() + (function() {
      if (v.sticky) {
        return "y";
      }
      ;
      return "";
    }() + function() {
      if (v.unicode) {
        return "u";
      }
      ;
      return "";
    }()))));
  };
  var regex = function(s) {
    return function(f) {
      return regexImpl(Left.create)(Right.create)(s)(renderFlags(f));
    };
  };
  var match = /* @__PURE__ */ function() {
    return _match(Just.create)(Nothing.value);
  }();

  // output/Data.String.Utils/index.js
  var startsWith = function(searchString) {
    return function(s) {
      return startsWithImpl(searchString, s);
    };
  };
  var includes = function(searchString) {
    return function(s) {
      return includesImpl(searchString, s);
    };
  };
  var endsWith = function(searchString) {
    return function(s) {
      return endsWithImpl(searchString, s);
    };
  };

  // output/VexFlow.Abc.Repetition/index.js
  var buildRepetition = function(decoration2) {
    var repetitionMap = fromFoldable2(ordString)(foldableArray)([new Tuple("coda", 2), new Tuple("segno", 4), new Tuple("D.C.", 6), new Tuple("dacoda", 7), new Tuple("dacapo", 8), new Tuple("D.S.", 9), new Tuple("fine", 12)]);
    return fromMaybe(1)(lookup(ordString)(decoration2)(repetitionMap));
  };

  // output/VexFlow.Abc.Slur/index.js
  var LeftBracket = /* @__PURE__ */ function() {
    function LeftBracket2(value0) {
      this.value0 = value0;
    }
    ;
    LeftBracket2.create = function(value0) {
      return new LeftBracket2(value0);
    };
    return LeftBracket2;
  }();
  var RightBracket = /* @__PURE__ */ function() {
    function RightBracket2(value0) {
      this.value0 = value0;
    }
    ;
    RightBracket2.create = function(value0) {
      return new RightBracket2(value0);
    };
    return RightBracket2;
  }();
  var SlurStack = /* @__PURE__ */ function() {
    function SlurStack2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    SlurStack2.create = function(value0) {
      return function(value1) {
        return new SlurStack2(value0, value1);
      };
    };
    return SlurStack2;
  }();
  var pop2 = function(v) {
    if (v.value0 instanceof Nil) {
      return new Tuple(Nothing.value, new SlurStack(Nil.value, v.value1));
    }
    ;
    if (v.value0 instanceof Cons) {
      return new Tuple(new Just(v.value0.value0), new SlurStack(v.value0.value1, v.value1));
    }
    ;
    throw new Error("Failed pattern match at VexFlow.Abc.Slur (line 78, column 1 - line 78, column 56): " + [v.constructor.name]);
  };
  var push2 = function(slurStack) {
    return function($$new2) {
      if ($$new2 instanceof RightBracket) {
        var v = pop2(slurStack);
        if (v.value0 instanceof Just && v.value0.value0 instanceof LeftBracket) {
          return new SlurStack(v.value1.value0, cons2({
            from: v.value0.value0.value0,
            to: $$new2.value0
          })(v.value1.value1));
        }
        ;
        if (v.value0 instanceof Just) {
          return new SlurStack(new Cons($$new2, new Cons(v.value0.value0, v.value1.value0)), v.value1.value1);
        }
        ;
        if (v.value0 instanceof Nothing) {
          return new SlurStack(new Cons($$new2, v.value1.value0), v.value1.value1);
        }
        ;
        throw new Error("Failed pattern match at VexFlow.Abc.Slur (line 64, column 9 - line 70, column 43): " + [v.value0.constructor.name]);
      }
      ;
      return new SlurStack(new Cons($$new2, slurStack.value0), slurStack.value1);
    };
  };
  var empty5 = /* @__PURE__ */ function() {
    return new SlurStack(Nil.value, []);
  }();
  var vexCurves = function(brackets) {
    var v = foldl(foldableArray)(push2)(empty5)(brackets);
    return reverse(v.value1);
  };

  // output/VexFlow.Abc.Translate/index.js
  var ornaments = function(decorations2) {
    var f = function(acc) {
      return function(decoration2) {
        if (decoration2 === "T") {
          return cons2("tr")(acc);
        }
        ;
        if (decoration2 === "trill") {
          return cons2("tr")(acc);
        }
        ;
        if (decoration2 === "turn") {
          return cons2("turn")(acc);
        }
        ;
        if (decoration2 === "P") {
          return cons2("upmordent")(acc);
        }
        ;
        if (decoration2 === "uppermordent") {
          return cons2("upmordent")(acc);
        }
        ;
        if (decoration2 === "M") {
          return cons2("mordent")(acc);
        }
        ;
        if (decoration2 === "lowermordent") {
          return cons2("mordent")(acc);
        }
        ;
        return acc;
      };
    };
    return foldl(foldableList)(f)([])(decorations2);
  };
  var headerChange = function(h) {
    if (h instanceof Key) {
      return [new KeyChange(h.value0)];
    }
    ;
    if (h instanceof UnitNoteLength) {
      return [new UnitNoteChange(h.value0)];
    }
    ;
    if (h instanceof Meter) {
      if (h.value0 instanceof Just) {
        return [new MeterChange(h.value0.value0)];
      }
      ;
      return [];
    }
    ;
    if (h instanceof Voice) {
      var v = lookup(ordString)("clef")(h.value0.properties);
      if (v instanceof Just && v.value0 === "Bass") {
        return [new ClefChange(Bass.value)];
      }
      ;
      if (v instanceof Just && v.value0 === "bass") {
        return [new ClefChange(Bass.value)];
      }
      ;
      if (v instanceof Just && v.value0 === "Tenor") {
        return [new ClefChange(Tenor.value)];
      }
      ;
      if (v instanceof Just && v.value0 === "tenor") {
        return [new ClefChange(Tenor.value)];
      }
      ;
      if (v instanceof Just && v.value0 === "Alto") {
        return [new ClefChange(Alto.value)];
      }
      ;
      if (v instanceof Just && v.value0 === "alto") {
        return [new ClefChange(Alto.value)];
      }
      ;
      return [new ClefChange(Treble.value)];
    }
    ;
    return [];
  };
  var buildSlurBrackets = function(noteIndex) {
    return function(startCount) {
      return function(endCount) {
        return append(semigroupArray)(replicate2(unfoldableArray)(startCount)(new LeftBracket(noteIndex)))(replicate2(unfoldableArray)(endCount)(new RightBracket(noteIndex)));
      };
    };
  };
  var buildTupletPrefaceSlurs = function(noteIndex) {
    return function(startCount) {
      return buildSlurBrackets(noteIndex)(startCount)(0);
    };
  };
  var buildMusicSpecFromNs = function(tCtx) {
    return function(noteIndex) {
      return function(mBeatMarker) {
        return function(gn1) {
          return function(gn2) {
            return function(ens) {
              var slurBrackets = append(semigroupArray)(buildSlurBrackets(noteIndex)(gn1.leftSlurs)(gn1.rightSlurs))(buildSlurBrackets(noteIndex + 1 | 0)(gn2.leftSlurs)(gn2.rightSlurs));
              return map(functorEither)(function(ns) {
                return {
                  noteSpecs: ns,
                  tuplets: [],
                  ties: [],
                  tickableContext: tCtx,
                  contextChanges: [],
                  slurBrackets,
                  beatMarkers: fromMaybe2(unfoldableArray)(mBeatMarker),
                  repetitions: [],
                  typesettingSpaces: [],
                  chordSymbols: []
                };
              })(ens);
            };
          };
        };
      };
    };
  };
  var buildMusicSpecFromN = function(tCtx) {
    return function(noteIndex) {
      return function(mBeatMarker) {
        return function(isTied) {
          return function(slurStartCount) {
            return function(slurEndCount) {
              return function(ens) {
                return map(functorEither)(function(ns) {
                  return {
                    noteSpecs: [ns],
                    tuplets: [],
                    ties: function() {
                      if (isTied) {
                        return [noteIndex];
                      }
                      ;
                      return [];
                    }(),
                    tickableContext: tCtx,
                    contextChanges: [],
                    slurBrackets: buildSlurBrackets(noteIndex)(slurStartCount)(slurEndCount),
                    beatMarkers: fromMaybe2(unfoldableArray)(mBeatMarker),
                    repetitions: [],
                    typesettingSpaces: [],
                    chordSymbols: []
                  };
                })(ens);
              };
            };
          };
        };
      };
    };
  };
  var buildMusicSpecFromDecorations = function(decorations2) {
    return function(noteIndex) {
      var v = mempty(musicSpecMonoid);
      var repetitions = map(functorArray)(buildRepetition)(fromFoldable(foldableList)(decorations2));
      return {
        noteSpecs: v.noteSpecs,
        tuplets: v.tuplets,
        ties: v.ties,
        tickableContext: v.tickableContext,
        contextChanges: v.contextChanges,
        slurBrackets: v.slurBrackets,
        beatMarkers: v.beatMarkers,
        repetitions,
        typesettingSpaces: [noteIndex],
        chordSymbols: v.chordSymbols
      };
    };
  };
  var buildMusicSpecFromContextChange = function(contextChanges) {
    var v = mempty(musicSpecMonoid);
    return {
      noteSpecs: v.noteSpecs,
      tuplets: v.tuplets,
      ties: v.ties,
      tickableContext: v.tickableContext,
      contextChanges,
      slurBrackets: v.slurBrackets,
      beatMarkers: v.beatMarkers,
      repetitions: v.repetitions,
      typesettingSpaces: v.typesettingSpaces,
      chordSymbols: v.chordSymbols
    };
  };
  var buildMusicSpecFromChordSymbol = function(symbol) {
    return function(noteIndex) {
      var v = mempty(musicSpecMonoid);
      return {
        noteSpecs: v.noteSpecs,
        tuplets: v.tuplets,
        ties: v.ties,
        tickableContext: v.tickableContext,
        contextChanges: v.contextChanges,
        slurBrackets: v.slurBrackets,
        beatMarkers: v.beatMarkers,
        repetitions: v.repetitions,
        typesettingSpaces: v.typesettingSpaces,
        chordSymbols: [{
          name: symbol.name,
          noteIndex
        }]
      };
    };
  };
  var buildInterTupletSlurs = function(noteIndex) {
    return function(tupletNotes) {
      var f = function(pos) {
        return function(rOrN) {
          if (rOrN instanceof Left) {
            return [];
          }
          ;
          if (rOrN instanceof Right) {
            return buildSlurBrackets(noteIndex + pos | 0)(rOrN.value0.leftSlurs)(rOrN.value0.rightSlurs);
          }
          ;
          throw new Error("Failed pattern match at VexFlow.Abc.Translate (line 551, column 7 - line 554, column 79): " + [rOrN.constructor.name]);
        };
      };
      return concat(mapWithIndex(f)(toUnfoldable4(unfoldableArray)(tupletNotes)));
    };
  };
  var buildTupletSlurs = function(noteIndex) {
    return function(prefaceSlurCount) {
      return function(tupletNotes) {
        return append(semigroupArray)(buildTupletPrefaceSlurs(noteIndex)(prefaceSlurCount))(buildInterTupletSlurs(noteIndex)(tupletNotes));
      };
    };
  };
  var articulations = function(artics) {
    var f = function(acc) {
      return function(decoration2) {
        if (decoration2 === ".") {
          return cons2("a.")(acc);
        }
        ;
        if (decoration2 === "upbow") {
          return cons2("a|")(acc);
        }
        ;
        if (decoration2 === "u") {
          return cons2("a|")(acc);
        }
        ;
        if (decoration2 === "downbow") {
          return cons2("am")(acc);
        }
        ;
        if (decoration2 === "v") {
          return cons2("am")(acc);
        }
        ;
        if (decoration2 === "L") {
          return cons2("a>")(acc);
        }
        ;
        if (decoration2 === "accent") {
          return cons2("a>")(acc);
        }
        ;
        if (decoration2 === "emphasis") {
          return cons2("a>")(acc);
        }
        ;
        if (decoration2 === "H") {
          return cons2("a@a")(acc);
        }
        ;
        if (decoration2 === "fermata") {
          return cons2("a@a")(acc);
        }
        ;
        if (decoration2 === "tenuto") {
          return cons2("a-")(acc);
        }
        ;
        return acc;
      };
    };
    return foldl(foldableList)(f)([])(artics);
  };
  var accidental = function(v) {
    if (v instanceof Sharp) {
      return "#";
    }
    ;
    if (v instanceof Flat) {
      return "b";
    }
    ;
    if (v instanceof DoubleSharp) {
      return "##";
    }
    ;
    if (v instanceof DoubleFlat) {
      return "bb";
    }
    ;
    if (v instanceof Natural) {
      return "n";
    }
    ;
    if (v instanceof Implicit) {
      return "";
    }
    ;
    throw new Error("Failed pattern match at VexFlow.Abc.Translate (line 64, column 1 - line 64, column 35): " + [v.constructor.name]);
  };
  var noteAccidental = function(abcNote2) {
    return accidental(abcNote2.accidental);
  };
  var pitch = function(pc) {
    return function(acc) {
      return function(oct) {
        return toLower(show(showPitchClass)(pc)) + (accidental(acc) + ("/" + show(showInt)(oct)));
      };
    };
  };
  var notePitch = function(abcNote2) {
    return pitch(abcNote2.pitchClass)(abcNote2.accidental)(abcNote2.octave - 1 | 0);
  };
  var chord = function(context) {
    return function(abcChord0) {
      var abcChord2 = normaliseChord(abcChord0);
      var accidentals = map(functorArray)(noteAccidental)(toUnfoldable4(unfoldableArray)(abcChord2.notes));
      var keys3 = map(functorArray)(notePitch)(toUnfoldable4(unfoldableArray)(abcChord2.notes));
      var representativeNote = head4(abcChord2.notes);
      var eVexDur = vexDuration(context.unitNoteLength)(representativeNote.duration);
      var dotCount = noteDotCount(context)(representativeNote);
      if (eVexDur instanceof Right) {
        var vexNote = {
          clef: show(showClef)(context.clef),
          keys: keys3,
          duration: compoundVexDuration(eVexDur.value0),
          auto_stem: true
        };
        return new Right({
          vexNote,
          accidentals,
          dotCount,
          graceKeys: [],
          graceAccidentals: [],
          ornaments: [],
          articulations: [],
          noteTicks: noteTicks(context.unitNoteLength)(representativeNote.duration),
          chordSymbol: ""
        });
      }
      ;
      if (eVexDur instanceof Left) {
        return new Left(eVexDur.value0);
      }
      ;
      throw new Error("Failed pattern match at VexFlow.Abc.Translate (line 269, column 5 - line 290, column 23): " + [eVexDur.constructor.name]);
    };
  };
  var graceableNote = function(context) {
    return function(gn) {
      var key2 = notePitch(gn.abcNote);
      var graceNotes = maybe([])(function(grace2) {
        return toUnfoldable4(unfoldableArray)(grace2.notes);
      })(gn.maybeGrace);
      var graceKeys = map(functorArray)(notePitch)(graceNotes);
      var graceAccidentals = map(functorArray)(noteAccidental)(graceNotes);
      var eVexDur = vexDuration(context.unitNoteLength)(gn.abcNote.duration);
      if (eVexDur instanceof Right) {
        var vexNote = {
          clef: show(showClef)(context.clef),
          keys: [key2],
          duration: compoundVexDuration(eVexDur.value0),
          auto_stem: true
        };
        return new Right({
          vexNote,
          accidentals: [accidental(gn.abcNote.accidental)],
          dotCount: eVexDur.value0.dots,
          graceKeys,
          graceAccidentals,
          ornaments: ornaments(gn.decorations),
          articulations: articulations(gn.decorations),
          noteTicks: noteTicks(context.unitNoteLength)(gn.abcNote.duration),
          chordSymbol: ""
        });
      }
      ;
      if (eVexDur instanceof Left) {
        return new Left(eVexDur.value0);
      }
      ;
      throw new Error("Failed pattern match at VexFlow.Abc.Translate (line 185, column 5 - line 206, column 23): " + [eVexDur.constructor.name]);
    };
  };
  var brokenRhythm = function(context) {
    return function(gn1) {
      return function(broken) {
        return function(gn2) {
          var v = normaliseBroken(broken)(gn1)(gn2);
          var enote2 = graceableNote(context)(v.value1);
          var enote1 = graceableNote(context)(v.value0);
          var v1 = new Tuple(enote1, enote2);
          if (v1.value0 instanceof Right && v1.value1 instanceof Right) {
            return new Right([v1.value0.value0, v1.value1.value0]);
          }
          ;
          if (v1.value0 instanceof Left) {
            return new Left(v1.value0.value0);
          }
          ;
          if (v1.value1 instanceof Left) {
            return new Left(v1.value1.value0);
          }
          ;
          throw new Error("Failed pattern match at VexFlow.Abc.Translate (line 302, column 5 - line 308, column 16): " + [v1.constructor.name]);
        };
      };
    };
  };
  var restPitch = function(v) {
    if (v instanceof Bass) {
      return pitch(D.value)(Implicit.value)(3);
    }
    ;
    if (v instanceof Tenor) {
      return pitch(A.value)(Implicit.value)(3);
    }
    ;
    if (v instanceof Alto) {
      return pitch(C.value)(Implicit.value)(4);
    }
    ;
    return pitch(B.value)(Implicit.value)(4);
  };
  var rest = function(context) {
    return function(abcRest2) {
      var key2 = restPitch(context.clef);
      var eVexDur = vexDuration(context.unitNoteLength)(abcRest2.duration);
      if (eVexDur instanceof Right) {
        var vexNote = {
          clef: show(showClef)(context.clef),
          keys: [key2],
          duration: compoundVexDuration(eVexDur.value0) + "r",
          auto_stem: true
        };
        return new Right({
          vexNote,
          accidentals: [],
          dotCount: eVexDur.value0.dots,
          graceKeys: [],
          graceAccidentals: [],
          ornaments: [],
          articulations: [],
          noteTicks: noteTicks(context.unitNoteLength)(abcRest2.duration),
          chordSymbol: ""
        });
      }
      ;
      if (eVexDur instanceof Left) {
        return new Left(eVexDur.value0);
      }
      ;
      throw new Error("Failed pattern match at VexFlow.Abc.Translate (line 218, column 5 - line 239, column 23): " + [eVexDur.constructor.name]);
    };
  };
  var restOrNote = function(context) {
    return function(rOrn) {
      if (rOrn instanceof Left) {
        return rest(context)(rOrn.value0);
      }
      ;
      if (rOrn instanceof Right) {
        return graceableNote(context)(rOrn.value0);
      }
      ;
      throw new Error("Failed pattern match at VexFlow.Abc.Translate (line 340, column 3 - line 344, column 31): " + [rOrn.constructor.name]);
    };
  };
  var tuplet = function(context) {
    return function(startOffset) {
      return function(signature) {
        return function(rns) {
          var vexTuplet = {
            p: signature.p,
            q: signature.q,
            startPos: startOffset,
            endPos: startOffset + length(rns) | 0
          };
          var isTied = function() {
            var v = last(rns);
            if (v instanceof Just && v.value0 instanceof Right) {
              return v.value0.value0.abcNote.tied;
            }
            ;
            return false;
          }();
          var enoteSpecs = sequence(traversableArray)(applicativeEither)(map(functorArray)(restOrNote(context))(rns));
          if (enoteSpecs instanceof Right) {
            return new Right({
              vexTuplet,
              noteSpecs: enoteSpecs.value0,
              tied: isTied
            });
          }
          ;
          if (enoteSpecs instanceof Left) {
            return new Left(enoteSpecs.value0);
          }
          ;
          throw new Error("Failed pattern match at VexFlow.Abc.Translate (line 328, column 5 - line 336, column 15): " + [enoteSpecs.constructor.name]);
        };
      };
    };
  };
  var music = function(context) {
    return function(tickablePosition) {
      return function(noteIndex) {
        return function(phraseDuration) {
          return function(m) {
            var tickableContext = getTickableContext(m);
            var barFraction = mul(semiringRatio(ordInt)(euclideanRingInt))(phraseDuration)(context.unitNoteLength);
            var mBeatMarker = exactBeatNumber(barFraction)(context.beatDuration)(noteIndex);
            if (m instanceof Note) {
              return buildMusicSpecFromN(tickableContext)(noteIndex)(mBeatMarker)(m.value0.abcNote.tied)(m.value0.leftSlurs)(m.value0.rightSlurs)(graceableNote(context)(m.value0));
            }
            ;
            if (m instanceof Rest) {
              return buildMusicSpecFromN(tickableContext)(noteIndex)(mBeatMarker)(false)(0)(0)(rest(context)(m.value0));
            }
            ;
            if (m instanceof Chord) {
              return buildMusicSpecFromN(tickableContext)(noteIndex)(mBeatMarker)(false)(m.value0.leftSlurs)(m.value0.rightSlurs)(chord(context)(m.value0));
            }
            ;
            if (m instanceof BrokenRhythmPair) {
              return buildMusicSpecFromNs(tickableContext)(noteIndex)(mBeatMarker)(m.value0)(m.value2)(brokenRhythm(context)(m.value0)(m.value1)(m.value2));
            }
            ;
            if (m instanceof Tuplet) {
              var eRes = tuplet(context)(tickablePosition)(m.value0.signature)(toUnfoldable4(unfoldableArray)(m.value0.restsOrNotes));
              return map(functorEither)(function(tupletSpec) {
                return {
                  noteSpecs: tupletSpec.noteSpecs,
                  tuplets: [tupletSpec.vexTuplet],
                  ties: function() {
                    if (tupletSpec.tied) {
                      return [(noteIndex + length(tupletSpec.noteSpecs) | 0) - 1 | 0];
                    }
                    ;
                    return [];
                  }(),
                  tickableContext,
                  contextChanges: mempty(monoidArray),
                  slurBrackets: buildTupletSlurs(noteIndex)(m.value0.leftSlurs)(m.value0.restsOrNotes),
                  beatMarkers: fromMaybe2(unfoldableArray)(mBeatMarker),
                  repetitions: mempty(monoidArray),
                  typesettingSpaces: mempty(monoidArray),
                  chordSymbols: mempty(monoidArray)
                };
              })(eRes);
            }
            ;
            if (m instanceof ChordSymbol) {
              if (context.showChordSymbols) {
                return new Right(buildMusicSpecFromChordSymbol(m.value0)(noteIndex));
              }
              ;
              return new Right(mempty(musicSpecMonoid));
            }
            ;
            if (m instanceof Inline) {
              return new Right(buildMusicSpecFromContextChange(headerChange(m.value0)));
            }
            ;
            if (m instanceof DecoratedSpace) {
              return new Right(buildMusicSpecFromDecorations(m.value0)(noteIndex));
            }
            ;
            return new Right(mempty(musicSpecMonoid));
          };
        };
      };
    };
  };

  // output/VexFlow.Abc.Beam/index.js
  var Beamable = /* @__PURE__ */ function() {
    function Beamable2() {
    }
    ;
    Beamable2.value = new Beamable2();
    return Beamable2;
  }();
  var Unbeamable = /* @__PURE__ */ function() {
    function Unbeamable2() {
    }
    ;
    Unbeamable2.value = new Unbeamable2();
    return Unbeamable2;
  }();
  var StartOnly = /* @__PURE__ */ function() {
    function StartOnly2() {
    }
    ;
    StartOnly2.value = new StartOnly2();
    return StartOnly2;
  }();
  var quarterNoteTicks = 32;
  var lookupRanges = function(idx) {
    return function(bm) {
      return fromMaybe([])(lookup(ordInt)(idx)(bm));
    };
  };
  var eqBeamability = {
    eq: function(x) {
      return function(y) {
        if (x instanceof Beamable && y instanceof Beamable) {
          return true;
        }
        ;
        if (x instanceof Unbeamable && y instanceof Unbeamable) {
          return true;
        }
        ;
        if (x instanceof StartOnly && y instanceof StartOnly) {
          return true;
        }
        ;
        return false;
      };
    }
  };
  var groupBeamableNotes = function(bns) {
    var f = function(a) {
      return function(b) {
        return notEq(eqBeamability)(a.beamability)(Unbeamable.value) && eq(eqBeamability)(b.beamability)(Beamable.value);
      };
    };
    return filter(function(g) {
      return length6(g) > 1;
    })(groupBy(f)(bns));
  };
  var getBeamRanges = function(bns) {
    var createBeamRange = function(bg) {
      var start = head5(bg);
      var end = last3(bg);
      return {
        start: start.noteIndex,
        end: end.noteIndex + 1 | 0
      };
    };
    return map(functorArray)(createBeamRange)(groupBeamableNotes(bns));
  };
  var commonTime = {
    numerator: 4,
    denominator: 4
  };
  var beamableNote = function(typesettingSpaces) {
    return function(offset) {
      return function(idx) {
        return function(noteSpec) {
          var noteIndex = offset + idx | 0;
          var beamability = function() {
            var $9 = noteSpec.noteTicks >= quarterNoteTicks || endsWith("r")(noteSpec.vexNote.duration);
            if ($9) {
              return Unbeamable.value;
            }
            ;
            var $10 = elem(foldableArray)(eqInt)(noteIndex)(typesettingSpaces);
            if ($10) {
              return StartOnly.value;
            }
            ;
            return Beamable.value;
          }();
          return {
            noteIndex,
            beamability
          };
        };
      };
    };
  };
  var beamFunc = function(noteSpecs) {
    return function(typesettingSpaces) {
      return function(acc) {
        return function(beatMarker) {
          var notesInBeat = slice(acc.beatMarker.noteIndex)(beatMarker.noteIndex)(noteSpecs);
          var beamables = mapWithIndex(beamableNote(typesettingSpaces)(acc.beatMarker.noteIndex))(notesInBeat);
          var beamRanges = getBeamRanges(beamables);
          return {
            beatMarker,
            beams: insert(ordInt)(beatMarker.beatNumber)(beamRanges)(acc.beams)
          };
        };
      };
    };
  };
  var anUncoalesceableRange = function(r1) {
    return function(r2) {
      return (r1.end - r1.start | 0) !== 2 || (r2.end - r2.start | 0) !== 2;
    };
  };
  var coalesce = function(v) {
    return function(v1) {
      return function(v2) {
        if (v.length === 1 && v1.length === 1) {
          var $14 = elem(foldableArray)(eqInt)(v1[0].start)(v2) || anUncoalesceableRange(v[0])(v1[0]);
          if ($14) {
            return append(semigroupArray)([v[0]])([v1[0]]);
          }
          ;
          return [{
            start: v[0].start,
            end: v1[0].end
          }];
        }
        ;
        return append(semigroupArray)(v)(v1);
      };
    };
  };
  var optimiseCommonTimeBeaming = function(bm) {
    return function(typesettingSpaces) {
      return append(semigroupArray)(coalesce(lookupRanges(1)(bm))(lookupRanges(2)(bm))(typesettingSpaces))(coalesce(lookupRanges(3)(bm))(lookupRanges(4)(bm))(typesettingSpaces));
    };
  };
  var calculateStandardBeams = function(timeSignature) {
    return function(noteSpecs) {
      return function(beatMarkers) {
        return function(typesettingSpaces) {
          var initialBM = {
            beatNumber: 0,
            noteIndex: 0
          };
          var result = foldl(foldableArray)(beamFunc(noteSpecs)(typesettingSpaces))({
            beatMarker: initialBM,
            beams: empty2
          })(beatMarkers);
          var $17 = eq(eqRec()(eqRowCons(eqRowCons(eqRowNil)()({
            reflectSymbol: function() {
              return "numerator";
            }
          })(eqInt))()({
            reflectSymbol: function() {
              return "denominator";
            }
          })(eqInt)))(commonTime)(timeSignature);
          if ($17) {
            return optimiseCommonTimeBeaming(result.beams)(typesettingSpaces);
          }
          ;
          return concat(map(functorArray)(snd)(toUnfoldable3(unfoldableArray)(result.beams)));
        };
      };
    };
  };
  var calculateBeams = function(timeSignature) {
    return function(noteSpecs) {
      return function(beatMarkers) {
        return function(typesettingSpaces) {
          return map(functorArray)(function(r) {
            return [r.start, r.end];
          })(calculateStandardBeams(timeSignature)(noteSpecs)(beatMarkers)(typesettingSpaces));
        };
      };
    };
  };

  // output/VexFlow.Abc.ChordSymbol/index.js
  var attachChordSymbol = function(noteSpecs) {
    return function(chordSymbol2) {
      var v = modifyAt(chordSymbol2.noteIndex)(function(ns) {
        return {
          chordSymbol: chordSymbol2.name,
          accidentals: ns.accidentals,
          articulations: ns.articulations,
          dotCount: ns.dotCount,
          graceAccidentals: ns.graceAccidentals,
          graceKeys: ns.graceKeys,
          noteTicks: ns.noteTicks,
          ornaments: ns.ornaments,
          vexNote: ns.vexNote
        };
      })(noteSpecs);
      if (v instanceof Nothing) {
        return noteSpecs;
      }
      ;
      if (v instanceof Just) {
        return v.value0;
      }
      ;
      throw new Error("Failed pattern match at VexFlow.Abc.ChordSymbol (line 21, column 3 - line 23, column 30): " + [v.constructor.name]);
    };
  };
  var attachChordSymbols = function(v) {
    var newNoteSpecs = foldl2(attachChordSymbol)(v.noteSpecs)(v.chordSymbols);
    return {
      noteSpecs: newNoteSpecs,
      tuplets: v.tuplets,
      ties: v.ties,
      tickableContext: v.tickableContext,
      contextChanges: v.contextChanges,
      slurBrackets: v.slurBrackets,
      beatMarkers: v.beatMarkers,
      repetitions: v.repetitions,
      typesettingSpaces: v.typesettingSpaces,
      chordSymbols: v.chordSymbols
    };
  };

  // output/VexFlow.Abc.TranslateStateful/index.js
  var zipBars = function(bs) {
    var intArray = range(0)(length2(bs));
    var barArray = toUnfoldable2(unfoldableArray)(bs);
    return zip(intArray)(barArray);
  };
  var music2 = function(tickablePosition) {
    return function(noteIndex) {
      return function(phraseDuration) {
        return function(m) {
          return bind(bindExceptT(monadStateT(monadIdentity)))(get(monadStateExceptT(monadStateStateT(monadIdentity))))(function(abcContext) {
            var spec = music(abcContext)(tickablePosition)(noteIndex)(phraseDuration)(m);
            var newContext = applyContextChanges(abcContext)(spec);
            return bind(bindExceptT(monadStateT(monadIdentity)))(put(monadStateExceptT(monadStateStateT(monadIdentity)))(newContext))(function() {
              return either(throwError(monadThrowExceptT(monadStateT(monadIdentity))))(pure(applicativeExceptT(monadStateT(monadIdentity))))(spec);
            });
          });
        };
      };
    };
  };
  var modifiedStartLine = function(isPendingRepeatbegin) {
    return function(barLine) {
      if (isPendingRepeatbegin) {
        return {
          endRepeats: barLine.endRepeats,
          thickness: barLine.thickness,
          startRepeats: 1,
          iteration: barLine.iteration
        };
      }
      ;
      return barLine;
    };
  };
  var foldMusicsFunction = function(eacc) {
    return function(m) {
      var noteIndex = length(eacc.noteSpecs);
      return bind(bindExceptT(monadStateT(monadIdentity)))(music2(eacc.tickableContext.value0)(noteIndex)(eacc.tickableContext.value2)(m))(function(v) {
        return pure(applicativeExceptT(monadStateT(monadIdentity)))(append(semigroupRecord()(semigroupRecordCons({
          reflectSymbol: function() {
            return "beatMarkers";
          }
        })()(semigroupRecordCons({
          reflectSymbol: function() {
            return "chordSymbols";
          }
        })()(semigroupRecordCons({
          reflectSymbol: function() {
            return "contextChanges";
          }
        })()(semigroupRecordCons({
          reflectSymbol: function() {
            return "noteSpecs";
          }
        })()(semigroupRecordCons({
          reflectSymbol: function() {
            return "repetitions";
          }
        })()(semigroupRecordCons({
          reflectSymbol: function() {
            return "slurBrackets";
          }
        })()(semigroupRecordCons({
          reflectSymbol: function() {
            return "tickableContext";
          }
        })()(semigroupRecordCons({
          reflectSymbol: function() {
            return "ties";
          }
        })()(semigroupRecordCons({
          reflectSymbol: function() {
            return "tuplets";
          }
        })()(semigroupRecordCons({
          reflectSymbol: function() {
            return "typesettingSpaces";
          }
        })()(semigroupRecordNil)(semigroupArray))(semigroupArray))(semigroupArray))(tickableSemigroupCtx))(semigroupArray))(semigroupArray))(semigroupArray))(semigroupArray))(semigroupArray))(semigroupArray)))(eacc)(v));
      });
    };
  };
  var foldOverMusics = function(barDecorations) {
    var v = mempty(musicSpecMonoid);
    var repetitions = map(functorArray)(buildRepetition)(fromFoldable(foldableList)(barDecorations));
    var initialSpec = {
      repetitions,
      beatMarkers: v.beatMarkers,
      chordSymbols: v.chordSymbols,
      contextChanges: v.contextChanges,
      noteSpecs: v.noteSpecs,
      slurBrackets: v.slurBrackets,
      tickableContext: v.tickableContext,
      ties: v.ties,
      tuplets: v.tuplets,
      typesettingSpaces: v.typesettingSpaces
    };
    return foldM(foldableArray)(monadExceptT(monadStateT(monadIdentity)))(foldMusicsFunction)(initialSpec);
  };
  var addFinalBeatMarker = function(abcContext) {
    return function(v) {
      var barDuration = mul(semiringRatio(ordInt)(euclideanRingInt))(v.tickableContext.value2)(abcContext.unitNoteLength);
      var mBeatMarker = exactBeatNumber(barDuration)(abcContext.beatDuration)(v.tickableContext.value0);
      var $22 = length(v.beatMarkers) === 0 && isNothing(mBeatMarker);
      if ($22) {
        return {
          noteSpecs: v.noteSpecs,
          tuplets: v.tuplets,
          ties: v.ties,
          tickableContext: v.tickableContext,
          contextChanges: v.contextChanges,
          slurBrackets: v.slurBrackets,
          beatMarkers: [{
            beatNumber: 1,
            noteIndex: length(v.noteSpecs)
          }],
          repetitions: v.repetitions,
          typesettingSpaces: v.typesettingSpaces,
          chordSymbols: v.chordSymbols
        };
      }
      ;
      return {
        noteSpecs: v.noteSpecs,
        tuplets: v.tuplets,
        ties: v.ties,
        tickableContext: v.tickableContext,
        contextChanges: v.contextChanges,
        slurBrackets: v.slurBrackets,
        beatMarkers: append(semigroupArray)(v.beatMarkers)(fromMaybe2(unfoldableArray)(mBeatMarker)),
        repetitions: v.repetitions,
        typesettingSpaces: v.typesettingSpaces,
        chordSymbols: v.chordSymbols
      };
    };
  };
  var bar = function(barNumber) {
    return function(abcBar) {
      return bind(bindExceptT(monadStateT(monadIdentity)))(foldOverMusics(abcBar.decorations)(toUnfoldable2(unfoldableArray)(abcBar.music)))(function(musicSpec0) {
        return bind(bindExceptT(monadStateT(monadIdentity)))(get(monadStateExceptT(monadStateStateT(monadIdentity))))(function(abcContext) {
          var musicSpec1 = attachChordSymbols(musicSpec0);
          var musicSpec = addFinalBeatMarker(abcContext)(musicSpec1);
          var volta2 = function() {
            var $27 = barNumber === 0 && isEmptyMusicSpec(musicSpec);
            if ($27) {
              return Nothing.value;
            }
            ;
            return startVolta(abcBar.startLine)(abcContext.isMidVolta);
          }();
          var newIsMidVolta = isMidVolta(abcBar.startLine)(abcContext.isMidVolta);
          var displayedKeySig = function() {
            var $28 = barNumber === 0;
            if ($28) {
              return new Just(abcContext.keySignature);
            }
            ;
            return Nothing.value;
          }();
          var width = estimateBarWidth(barNumber === 0)(abcContext.isNewTimeSignature)(displayedKeySig)(abcBar);
          var barSpec = {
            barNumber,
            width,
            xOffset: abcContext.accumulatedStaveWidth,
            startLine: modifiedStartLine(abcContext.pendingRepeatBegin)(abcBar.startLine),
            endLineThickness: Single.value,
            endLineRepeat: false,
            volta: volta2,
            timeSignature: abcContext.timeSignature,
            beamSpecs: calculateBeams(abcContext.timeSignature)(musicSpec.noteSpecs)(musicSpec.beatMarkers)(musicSpec.typesettingSpaces),
            curves: vexCurves(musicSpec.slurBrackets),
            musicSpec
          };
          var newWidth = abcContext.accumulatedStaveWidth + barSpec.width | 0;
          var newAbcContext = {
            accumulatedStaveWidth: newWidth,
            isMidVolta: newIsMidVolta,
            isNewTimeSignature: false,
            pendingRepeatBegin: false,
            beatDuration: abcContext.beatDuration,
            clef: abcContext.clef,
            keySignature: abcContext.keySignature,
            mTempo: abcContext.mTempo,
            maxWidth: abcContext.maxWidth,
            showChordSymbols: abcContext.showChordSymbols,
            staveNo: abcContext.staveNo,
            timeSignature: abcContext.timeSignature,
            unitNoteLength: abcContext.unitNoteLength
          };
          return bind(bindExceptT(monadStateT(monadIdentity)))(put(monadStateExceptT(monadStateStateT(monadIdentity)))(newAbcContext))(function() {
            return withExceptT(functorStateT(functorIdentity))(function(err) {
              return err + (": bar " + show(showInt)(barNumber));
            })(pure(applicativeExceptT(monadStateT(monadIdentity)))(barSpec));
          });
        });
      });
    };
  };
  var bars = function(bs) {
    var tupleArray = zipBars(bs);
    return traverse(traversableArray)(applicativeExceptT(monadStateT(monadIdentity)))(function(v) {
      return bar(v.value0)(v.value1);
    })(tupleArray);
  };
  var bodyPart = function(bp) {
    if (bp instanceof Score) {
      var $33 = isEmptyStave(bp.value0);
      if ($33) {
        return pure(applicativeExceptT(monadStateT(monadIdentity)))(Nothing.value);
      }
      ;
      return bind(bindExceptT(monadStateT(monadIdentity)))(get(monadStateExceptT(monadStateStateT(monadIdentity))))(function(abcContext) {
        var mStaveNo = nextStaveNo(abcContext.staveNo);
        var staveNo = fromMaybe(0)(mStaveNo);
        return bind(bindExceptT(monadStateT(monadIdentity)))(put(monadStateExceptT(monadStateStateT(monadIdentity)))(function() {
          var $34 = {};
          for (var $35 in abcContext) {
            if ({}.hasOwnProperty.call(abcContext, $35)) {
              $34[$35] = abcContext[$35];
            }
            ;
          }
          ;
          $34.staveNo = mStaveNo;
          $34.accumulatedStaveWidth = staveIndentation;
          return $34;
        }()))(function() {
          return bind(bindExceptT(monadStateT(monadIdentity)))(bars(bp.value0))(function(staveBars) {
            return bind(bindExceptT(monadStateT(monadIdentity)))(get(monadStateExceptT(monadStateStateT(monadIdentity))))(function(abcContext$prime) {
              var pendingRepeatBegin = staveEndsWithRepeatBegin(staveBars);
              var normalisedStaveBars = repositionBarEndRepeats(staveBars);
              var filledStaveLine = fillStaveLine(abcContext.maxWidth)(normalisedStaveBars);
              var clefString = show(showClef)(abcContext$prime.clef);
              var accumulatedStaveWidth = staveWidth(normalisedStaveBars);
              return bind(bindExceptT(monadStateT(monadIdentity)))(put(monadStateExceptT(monadStateStateT(monadIdentity)))(function() {
                var $37 = {};
                for (var $38 in abcContext$prime) {
                  if ({}.hasOwnProperty.call(abcContext$prime, $38)) {
                    $37[$38] = abcContext$prime[$38];
                  }
                  ;
                }
                ;
                $37.pendingRepeatBegin = pendingRepeatBegin;
                return $37;
              }()))(function() {
                return pure(applicativeExceptT(monadStateT(monadIdentity)))(new Just({
                  staveNo,
                  staveWidth: accumulatedStaveWidth,
                  clefString,
                  keySignature: abcContext.keySignature,
                  isNewTimeSignature: abcContext.isNewTimeSignature,
                  mTempo: abcContext.mTempo,
                  barSpecs: filledStaveLine
                }));
              });
            });
          });
        });
      });
    }
    ;
    if (bp instanceof BodyInfo) {
      return bind(bindExceptT(monadStateT(monadIdentity)))(get(monadStateExceptT(monadStateStateT(monadIdentity))))(function(abcContext) {
        var contextChanges = headerChange(bp.value0);
        var newAbcContext = foldl(foldableArray)(updateAbcContext)(abcContext)(contextChanges);
        return bind(bindExceptT(monadStateT(monadIdentity)))(put(monadStateExceptT(monadStateStateT(monadIdentity)))(newAbcContext))(function() {
          return pure(applicativeExceptT(monadStateT(monadIdentity)))(Nothing.value);
        });
      });
    }
    ;
    throw new Error("Failed pattern match at VexFlow.Abc.TranslateStateful (line 80, column 3 - line 132, column 21): " + [bp.constructor.name]);
  };
  var tuneBody = function(bodyParts) {
    return bind(bindExceptT(monadStateT(monadIdentity)))(traverse(traversableArray)(applicativeExceptT(monadStateT(monadIdentity)))(bodyPart)(toUnfoldable2(unfoldableArray)(bodyParts)))(function(mStaveSpecs) {
      return pure(applicativeExceptT(monadStateT(monadIdentity)))(catMaybes(mStaveSpecs));
    });
  };
  var runTuneBody = function(abcContext) {
    return function(bps) {
      return unwrap()(evalStateT(functorIdentity)(runExceptT(tuneBody(bps)))(abcContext));
    };
  };

  // output/VexFlow.Score/index.js
  var createScore = function(config2) {
    return function(abcTune) {
      var v = initialAbcContext(abcTune)(config2);
      if (v instanceof Left) {
        return new Left(v.value0);
      }
      ;
      if (v instanceof Right) {
        return runTuneBody(v.value0)(abcTune.body);
      }
      ;
      throw new Error("Failed pattern match at VexFlow.Score (line 134, column 3 - line 138, column 42): " + [v.constructor.name]);
    };
  };

  // output/Abc.EnsembleScore.Renderer/index.js
  var renderPolyphonicTune = function(config2) {
    return function(renderer) {
      return function(tune) {
        var voices = partitionVoices(tune);
        var $0 = length(voices) <= 1;
        if ($0) {
          return pure(applicativeEffect)(new Just("There is only one voice in the tune"));
        }
        ;
        var eVoiceScores = sequenceDefault(traversableArray)(applicativeEither)(map(functorArray)(createScore(config2))(voices));
        if (eVoiceScores instanceof Right) {
          var ensembleScore = runBuildEnsembleScore(eVoiceScores.value0);
          return function __do() {
            init();
            return Nothing.value;
          };
        }
        ;
        if (eVoiceScores instanceof Left) {
          return pure(applicativeEffect)(new Just(eVoiceScores.value0));
        }
        ;
        throw new Error("Failed pattern match at Abc.EnsembleScore.Renderer (line 27, column 7 - line 35, column 24): " + [eVoiceScores.constructor.name]);
      };
    };
  };

  // output/Data.Char/index.js
  var toCharCode2 = /* @__PURE__ */ fromEnum(boundedEnumChar);
  var fromCharCode3 = /* @__PURE__ */ toEnum(boundedEnumChar);

  // output/StringParser.Parser/index.js
  var unParser = function(v) {
    return v;
  };
  var runParser = function(v) {
    return function(s) {
      return map(functorEither)(function(v1) {
        return v1.result;
      })(v({
        substring: s,
        position: 0
      }));
    };
  };
  var functorParser = {
    map: function(f) {
      return function(v) {
        var $55 = map(functorEither)(function(v1) {
          return {
            result: f(v1.result),
            suffix: v1.suffix
          };
        });
        return function($56) {
          return $55(v($56));
        };
      };
    }
  };
  var fail = function(error2) {
    return function(v) {
      return new Left({
        pos: v.position,
        error: error2
      });
    };
  };
  var applyParser = {
    apply: function(v) {
      return function(v1) {
        return function(s) {
          return bind(bindEither)(v(s))(function(v2) {
            return bind(bindEither)(v1(v2.suffix))(function(v3) {
              return pure(applicativeEither)({
                result: v2.result(v3.result),
                suffix: v3.suffix
              });
            });
          });
        };
      };
    },
    Functor0: function() {
      return functorParser;
    }
  };
  var bindParser = {
    bind: function(v) {
      return function(f) {
        return function(s) {
          return bind(bindEither)(v(s))(function(v1) {
            return unParser(f(v1.result))(v1.suffix);
          });
        };
      };
    },
    Apply0: function() {
      return applyParser;
    }
  };
  var applicativeParser = {
    pure: function(a) {
      return function(s) {
        return new Right({
          result: a,
          suffix: s
        });
      };
    },
    Apply0: function() {
      return applyParser;
    }
  };
  var monadParser = {
    Applicative0: function() {
      return applicativeParser;
    },
    Bind1: function() {
      return bindParser;
    }
  };
  var monadRecParser = {
    tailRecM: function(f) {
      return function(a) {
        var split3 = function(v) {
          if (v.result instanceof Loop) {
            return new Loop({
              state: v.result.value0,
              str: v.suffix
            });
          }
          ;
          if (v.result instanceof Done) {
            return new Done({
              result: v.result.value0,
              suffix: v.suffix
            });
          }
          ;
          throw new Error("Failed pattern match at StringParser.Parser (line 87, column 5 - line 87, column 68): " + [v.constructor.name]);
        };
        return function(str) {
          return tailRecM(monadRecEither)(function(st) {
            return map(functorEither)(split3)(unParser(f(st.state))(st.str));
          })({
            state: a,
            str
          });
        };
      };
    },
    Monad0: function() {
      return monadParser;
    }
  };
  var altParser = {
    alt: function(v) {
      return function(v1) {
        return function(s) {
          var v2 = v(s);
          if (v2 instanceof Left) {
            if (s.position === v2.value0.pos) {
              return v1(s);
            }
            ;
            if (otherwise) {
              return new Left({
                error: v2.value0.error,
                pos: v2.value0.pos
              });
            }
            ;
          }
          ;
          return v2;
        };
      };
    },
    Functor0: function() {
      return functorParser;
    }
  };
  var plusParser = {
    empty: /* @__PURE__ */ fail("No alternative"),
    Alt0: function() {
      return altParser;
    }
  };
  var alternativeParser = {
    Applicative0: function() {
      return applicativeParser;
    },
    Plus1: function() {
      return plusParser;
    }
  };

  // output/StringParser.Combinators/index.js
  var withError = function(p) {
    return function(msg) {
      return alt(altParser)(p)(fail(msg));
    };
  };
  var $$try = function(v) {
    return function(s) {
      var v1 = v(s);
      if (v1 instanceof Left) {
        return new Left({
          pos: s.position,
          error: v1.value0.error
        });
      }
      ;
      return v1;
    };
  };
  var optional = function(p) {
    return alt(altParser)(bind(bindParser)(p)(function(v) {
      return pure(applicativeParser)(unit);
    }))(pure(applicativeParser)(unit));
  };
  var option = function(a) {
    return function(p) {
      return alt(altParser)(p)(pure(applicativeParser)(a));
    };
  };
  var optionMaybe = function(p) {
    return option(Nothing.value)(map(functorParser)(Just.create)(p));
  };
  var cons$prime = function(h) {
    return function(t) {
      return new NonEmpty(h, t);
    };
  };
  var choice = function(dictFoldable) {
    return foldl(dictFoldable)(alt(altParser))(fail("Nothing to parse"));
  };
  var between = function(open) {
    return function(close) {
      return function(p) {
        return applyFirst(applyParser)(applySecond(applyParser)(open)(p))(close);
      };
    };
  };
  var assertConsume = function(v) {
    return function(s) {
      var v1 = v(s);
      if (v1 instanceof Right) {
        var $18 = s.position < v1.value0.suffix.position;
        if ($18) {
          return new Right(v1.value0);
        }
        ;
        return new Left({
          pos: s.position,
          error: "Consumed no input."
        });
      }
      ;
      return v1;
    };
  };
  var many = /* @__PURE__ */ function() {
    var $21 = manyRec(monadRecParser)(alternativeParser);
    return function($22) {
      return $21(assertConsume($22));
    };
  }();
  var many1 = function(p) {
    return apply(applyParser)(map(functorParser)(cons$prime)(p))(many(p));
  };
  var sepBy1 = function(p) {
    return function(sep) {
      return bind(bindParser)(p)(function(a) {
        return bind(bindParser)(many(applySecond(applyParser)(sep)(p)))(function(as) {
          return pure(applicativeParser)(cons$prime(a)(as));
        });
      });
    };
  };
  var sepBy = function(p) {
    return function(sep) {
      return alt(altParser)(map(functorParser)(toList)(sepBy1(p)(sep)))(pure(applicativeParser)(Nil.value));
    };
  };
  var many1Till = function(p) {
    return function(end) {
      var ending = function(acc) {
        return bind(bindParser)(end)(function() {
          return pure(applicativeParser)(new Done(reverse3(acc)));
        });
      };
      var $$continue = function(acc) {
        return bind(bindParser)(assertConsume(p))(function(c) {
          return pure(applicativeParser)(new Loop(cons4(c)(acc)));
        });
      };
      var inner = function(acc) {
        return alt(altParser)(ending(acc))($$continue(acc));
      };
      return bind(bindParser)(p)(function(x) {
        return tailRecM(monadRecParser)(inner)(pure(applicativeNonEmptyList)(x));
      });
    };
  };
  var manyTill = function(p) {
    return function(end) {
      return alt(altParser)(applySecond(applyParser)(end)(pure(applicativeParser)(Nil.value)))(map(functorParser)(toList)(many1Till(p)(end)));
    };
  };

  // output/StringParser.CodeUnits/index.js
  var anyChar = function(v) {
    var v1 = charAt2(0)(v.substring);
    if (v1 instanceof Just) {
      return new Right({
        result: v1.value0,
        suffix: {
          substring: drop3(1)(v.substring),
          position: v.position + 1 | 0
        }
      });
    }
    ;
    if (v1 instanceof Nothing) {
      return new Left({
        pos: v.position,
        error: "Unexpected EOF"
      });
    }
    ;
    throw new Error("Failed pattern match at StringParser.CodeUnits (line 50, column 3 - line 52, column 63): " + [v1.constructor.name]);
  };

  // output/StringParser.CodePoints/index.js
  var upperCaseChar = /* @__PURE__ */ $$try(/* @__PURE__ */ bind(bindParser)(anyChar)(function(c) {
    var $12 = elem(foldableArray)(eqInt)(toCharCode2(c))(range(65)(90));
    if ($12) {
      return pure(applicativeParser)(c);
    }
    ;
    return fail("Expected an upper case character but found " + show(showChar)(c));
  }));
  var string = function(pattern) {
    return function(v) {
      var length7 = length5(pattern);
      var v1 = splitAt2(length7)(v.substring);
      var $15 = v1.before === pattern;
      if ($15) {
        return new Right({
          result: pattern,
          suffix: {
            substring: v1.after,
            position: v.position + length7 | 0
          }
        });
      }
      ;
      return new Left({
        pos: v.position,
        error: "Expected '" + (pattern + "'.")
      });
    };
  };
  var regex2 = function(pat) {
    var pattern = "^(" + (pat + ")");
    var matchRegex = function(r) {
      return function(v2) {
        var v1 = map(functorMaybe)(head5)(match(r)(v2.substring));
        if (v1 instanceof Just && v1.value0 instanceof Just) {
          return new Right({
            result: v1.value0.value0,
            suffix: {
              substring: drop4(length5(v1.value0.value0))(v2.substring),
              position: v2.position + length5(v1.value0.value0) | 0
            }
          });
        }
        ;
        return new Left({
          pos: v2.position,
          error: "no match"
        });
      };
    };
    var v = regex(pattern)(noFlags);
    if (v instanceof Left) {
      return fail("StringParser.String.regex': illegal regex " + pat);
    }
    ;
    if (v instanceof Right) {
      return matchRegex(v.value0);
    }
    ;
    throw new Error("Failed pattern match at StringParser.CodePoints (line 158, column 3 - line 162, column 19): " + [v.constructor.name]);
  };
  var lowerCaseChar = /* @__PURE__ */ $$try(/* @__PURE__ */ bind(bindParser)(anyChar)(function(c) {
    var $29 = elem(foldableArray)(eqInt)(toCharCode2(c))(range(97)(122));
    if ($29) {
      return pure(applicativeParser)(c);
    }
    ;
    return fail("Expected a lower case character but found " + show(showChar)(c));
  }));
  var eof = function(s) {
    if (0 < length5(s.substring)) {
      return new Left({
        pos: s.position,
        error: "Expected EOF"
      });
    }
    ;
    return new Right({
      result: unit,
      suffix: s
    });
  };
  var anyLetter = /* @__PURE__ */ alt(altParser)(lowerCaseChar)(/* @__PURE__ */ withError(upperCaseChar)("Expected a letter"));
  var anyDigit = /* @__PURE__ */ $$try(/* @__PURE__ */ bind(bindParser)(anyChar)(function(c) {
    var $33 = c >= "0" && c <= "9";
    if ($33) {
      return pure(applicativeParser)(c);
    }
    ;
    return fail("Character " + (show(showChar)(c) + " is not a digit"));
  }));
  var anyCodePoint = function(v) {
    var v1 = uncons2(v.substring);
    if (v1 instanceof Nothing) {
      return new Left({
        pos: v.position,
        error: "Unexpected EOF"
      });
    }
    ;
    if (v1 instanceof Just) {
      return new Right({
        result: v1.value0.head,
        suffix: {
          substring: v1.value0.tail,
          position: v.position + 1 | 0
        }
      });
    }
    ;
    throw new Error("Failed pattern match at StringParser.CodePoints (line 72, column 3 - line 74, column 103): " + [v1.constructor.name]);
  };
  var anyChar2 = /* @__PURE__ */ function() {
    var notAChar = function(cc) {
      return fail("Code point " + (show(showInt)(cc) + " is not a character"));
    };
    return bind(bindParser)(mapFlipped(functorParser)(anyCodePoint)(fromEnum(boundedEnumCodePoint)))(function(cc) {
      var v = fromCharCode3(cc);
      if (v instanceof Just) {
        var $43 = cc > 65535;
        if ($43) {
          return notAChar(cc);
        }
        ;
        return pure(applicativeParser)(v.value0);
      }
      ;
      if (v instanceof Nothing) {
        return notAChar(cc);
      }
      ;
      throw new Error("Failed pattern match at StringParser.CodePoints (line 57, column 3 - line 65, column 27): " + [v.constructor.name]);
    });
  }();
  var satisfy = function(f) {
    return $$try(bind(bindParser)(anyChar2)(function(c) {
      var $45 = f(c);
      if ($45) {
        return pure(applicativeParser)(c);
      }
      ;
      return fail("Character " + (show(showChar)(c) + " did not satisfy predicate"));
    }));
  };
  var $$char = function(c) {
    return withError(satisfy(function(v) {
      return v === c;
    }))("Could not match character " + show(showChar)(c));
  };
  var alphaNum = /* @__PURE__ */ alt(altParser)(anyLetter)(/* @__PURE__ */ withError(anyDigit)("Expected a letter or a number"));

  // output/Data.Abc.Parser/index.js
  var TempoDesignation = /* @__PURE__ */ function() {
    function TempoDesignation2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    TempoDesignation2.create = function(value0) {
      return function(value1) {
        return new TempoDesignation2(value0, value1);
      };
    };
    return TempoDesignation2;
  }();
  var tupletLength = /* @__PURE__ */ regex2("[2-9]");
  var tup = /* @__PURE__ */ map(functorParser)(/* @__PURE__ */ join(bindMaybe))(/* @__PURE__ */ optionMaybe(/* @__PURE__ */ applySecond(applyParser)(/* @__PURE__ */ $$char(":"))(/* @__PURE__ */ optionMaybe(tupletLength))));
  var toTupletInt = function(s) {
    return fromMaybe(3)(fromString(s));
  };
  var strToEol = /* @__PURE__ */ regex2("[^\r\n%]*");
  var space = /* @__PURE__ */ $$char(" ");
  var shortDecoration = /* @__PURE__ */ withError(/* @__PURE__ */ regex2("[\\.~HLMOPSTuv]"))("short decoration");
  var sharpOrFlat = /* @__PURE__ */ map(functorParser)(function(x) {
    var $7 = x === "#";
    if ($7) {
      return Sharp.value;
    }
    ;
    return Flat.value;
  })(/* @__PURE__ */ alt(altParser)(/* @__PURE__ */ $$char("#"))(/* @__PURE__ */ $$char("b")));
  var scoreSpace = /* @__PURE__ */ alt(altParser)(/* @__PURE__ */ $$char("	"))(space);
  var spacer = /* @__PURE__ */ function() {
    return withError(map(functorParser)(Spacer.create)(map(functorParser)(length3)(many1(scoreSpace))))("space");
  }();
  var whiteSpace = /* @__PURE__ */ map(functorParser)(/* @__PURE__ */ foldMap(foldableList)(monoidString)(function($33) {
    return singleton8(codePointFromChar($33));
  }))(/* @__PURE__ */ many(scoreSpace));
  var unsupportedHeaderCode = /* @__PURE__ */ applyFirst(applyParser)(/* @__PURE__ */ regex2("[a-qt-vx-zEJ]:"))(whiteSpace);
  var unsupportedHeader = /* @__PURE__ */ function() {
    return withError(applyFirst(applyParser)(voidRight(functorParser)(UnsupportedHeader.value)(unsupportedHeaderCode))(strToEol))("unsupported header");
  }();
  var scientificPitchNotation = function(pc) {
    return function(oct) {
      var $8 = includes(pc)("ABCDEFG");
      if ($8) {
        return middlecOctave + oct | 0;
      }
      ;
      return (middlecOctave + 1 | 0) + oct | 0;
    };
  };
  var rightBracket = /* @__PURE__ */ $$char(")");
  var rightSlurBrackets = /* @__PURE__ */ withError(/* @__PURE__ */ map(functorParser)(length2)(/* @__PURE__ */ many(rightBracket)))("right slurs");
  var repeatMarkers = /* @__PURE__ */ map(functorParser)(length2)(/* @__PURE__ */ many(/* @__PURE__ */ $$char(":")));
  var pitch2 = /* @__PURE__ */ regex2("[A-Ga-g]");
  var phrygian = /* @__PURE__ */ function() {
    return applyFirst(applyParser)(voidRight(functorParser)(Phrygian.value)(whiteSpace))(regex2("[P|p][H|h][R|r][A-Za-z]*"));
  }();
  var octaveShift = function(s) {
    var up = length(filter(eq(eqChar)("'"))(toCharArray(s)));
    var down = length(filter(eq(eqChar)(","))(toCharArray(s)));
    return up - down | 0;
  };
  var nometer = /* @__PURE__ */ function() {
    return voidRight(functorParser)(Nothing.value)(string("none"));
  }();
  var newline = /* @__PURE__ */ withError(/* @__PURE__ */ satisfy(/* @__PURE__ */ eq(eqChar)("\n")))("expected newline");
  var moveOctave = /* @__PURE__ */ map(functorParser)(octaveShift)(/* @__PURE__ */ regex2("[',]*"));
  var mixolydian = /* @__PURE__ */ function() {
    return applyFirst(applyParser)(voidRight(functorParser)(Mixolydian.value)(whiteSpace))(regex2("[M|m][I|i][X|x][A-Za-z]*"));
  }();
  var minor = /* @__PURE__ */ function() {
    return applyFirst(applyParser)(voidRight(functorParser)(Minor.value)(whiteSpace))(regex2("[M|m][A-Za-z]*"));
  }();
  var maybeTie = /* @__PURE__ */ withError(/* @__PURE__ */ map(functorParser)(/* @__PURE__ */ map(functorMaybe)(function(v) {
    return "-";
  }))(/* @__PURE__ */ optionMaybe(/* @__PURE__ */ regex2(" *-"))))("tie");
  var major = /* @__PURE__ */ function() {
    return applyFirst(applyParser)(voidRight(functorParser)(Major.value)(whiteSpace))(regex2("[M|m][A|a][J|j][A-Za-z]*"));
  }();
  var lydian = /* @__PURE__ */ function() {
    return applyFirst(applyParser)(voidRight(functorParser)(Lydian.value)(whiteSpace))(regex2("[L|l][Y|y][D|d][A-Za-z]*"));
  }();
  var lookupPitch = function(p) {
    var v = toUpper(p);
    if (v === "A") {
      return A.value;
    }
    ;
    if (v === "B") {
      return B.value;
    }
    ;
    if (v === "C") {
      return C.value;
    }
    ;
    if (v === "D") {
      return D.value;
    }
    ;
    if (v === "E") {
      return E.value;
    }
    ;
    if (v === "F") {
      return F.value;
    }
    ;
    if (v === "G") {
      return G.value;
    }
    ;
    return C.value;
  };
  var longDecoration = /* @__PURE__ */ withError(/* @__PURE__ */ between(/* @__PURE__ */ $$char("!"))(/* @__PURE__ */ $$char("!"))(/* @__PURE__ */ regex2("[^\r\n!]+")))("long decoration");
  var locrian = /* @__PURE__ */ function() {
    return applyFirst(applyParser)(voidRight(functorParser)(Locrian.value)(whiteSpace))(regex2("[L|l][O|o][C|c][A-Za-z]*"));
  }();
  var literalQuotedString = function(retainQuotes) {
    var quotedString = withError(applyFirst(applyParser)(applySecond(applyParser)(string('"'))(regex2('(\\\\"|[^"\n])*')))(string('"')))("quoted string");
    if (retainQuotes) {
      return map(functorParser)(function(s) {
        return '"' + (s + '"');
      })(quotedString);
    }
    ;
    return quotedString;
  };
  var spacedQuotedString = /* @__PURE__ */ $$try(/* @__PURE__ */ applyFirst(applyParser)(/* @__PURE__ */ applySecond(applyParser)(whiteSpace)(/* @__PURE__ */ literalQuotedString(true)))(whiteSpace));
  var leftBracket = /* @__PURE__ */ $$char("(");
  var leftSlurBrackets = /* @__PURE__ */ withError(/* @__PURE__ */ map(functorParser)(length2)(/* @__PURE__ */ many(leftBracket)))("left slurs");
  var tupletBrackets = /* @__PURE__ */ withError(/* @__PURE__ */ map(functorParser)(length3)(/* @__PURE__ */ many1(leftBracket)))("tuplet + slurs");
  var keyName = /* @__PURE__ */ regex2("[A-G]");
  var ionian = /* @__PURE__ */ function() {
    return applyFirst(applyParser)(voidRight(functorParser)(Ionian.value)(whiteSpace))(regex2("[I|i][O|o][N|n][A-Za-z]*"));
  }();
  var invisibleBarType = /* @__PURE__ */ function() {
    return {
      endRepeats: 0,
      thickness: Invisible.value,
      startRepeats: 0,
      iteration: Nothing.value
    };
  }();
  var inlineInfo = function(isInline) {
    var pattern = function() {
      if (isInline) {
        return "[^\r\n\\[\\]]*";
      }
      ;
      return "[^\r\n]*";
    }();
    return regex2(pattern);
  };
  var ignore = /* @__PURE__ */ function() {
    return withError(voidRight(functorParser)(Ignore.value)(regex2("[#@;`\\*\\?]+")))("ignored character");
  }();
  var headerCode = function(c) {
    var pattern = fromCharArray([c, ":"]);
    return applyFirst(applyParser)(string(pattern))(whiteSpace);
  };
  var history = /* @__PURE__ */ function() {
    return withError(map(functorParser)(History.create)(applySecond(applyParser)(headerCode("H"))(strToEol)))("H header");
  }();
  var instruction = function(isInline) {
    return withError(map(functorParser)(Instruction.create)(applySecond(applyParser)(headerCode("I"))(inlineInfo(isInline))))("I header");
  };
  var macro = function(isInline) {
    return withError(map(functorParser)(Macro.create)(applySecond(applyParser)(headerCode("m"))(inlineInfo(isInline))))("m header");
  };
  var notes = function(isInline) {
    return withError(map(functorParser)(Notes.create)(applySecond(applyParser)(headerCode("N"))(inlineInfo(isInline))))("N header");
  };
  var origin = /* @__PURE__ */ function() {
    return withError(map(functorParser)(Origin.create)(applySecond(applyParser)(headerCode("O"))(strToEol)))("O header");
  }();
  var parts = function(isInline) {
    return withError(map(functorParser)(Parts.create)(applySecond(applyParser)(headerCode("P"))(inlineInfo(isInline))))("P header");
  };
  var remark = function(isInline) {
    return withError(map(functorParser)(Remark.create)(applySecond(applyParser)(headerCode("r"))(inlineInfo(isInline))))("r header");
  };
  var rhythm = function(isInline) {
    return withError(map(functorParser)(Rhythm.create)(applySecond(applyParser)(headerCode("R"))(inlineInfo(isInline))))("R header");
  };
  var source2 = /* @__PURE__ */ function() {
    return withError(map(functorParser)(Source.create)(applySecond(applyParser)(headerCode("S"))(strToEol)))("S header");
  }();
  var symbolLine = function(isInline) {
    return withError(map(functorParser)(SymbolLine.create)(applySecond(applyParser)(headerCode("s"))(inlineInfo(isInline))))("s header");
  };
  var title = function(isInline) {
    return withError(map(functorParser)(Title.create)(applySecond(applyParser)(headerCode("T"))(inlineInfo(isInline))))("T header");
  };
  var transcription = /* @__PURE__ */ function() {
    return withError(map(functorParser)(Transcription.create)(applySecond(applyParser)(headerCode("Z"))(strToEol)))("Z header");
  }();
  var userDefined = function(isInline) {
    return withError(map(functorParser)(UserDefined.create)(applySecond(applyParser)(headerCode("U"))(inlineInfo(isInline))))("U header");
  };
  var wordsAfter = function(isInline) {
    return withError(map(functorParser)(WordsAfter.create)(applySecond(applyParser)(headerCode("W"))(inlineInfo(isInline))))("W header");
  };
  var wordsAligned = function(isInline) {
    return withError(map(functorParser)(WordsAligned.create)(applySecond(applyParser)(headerCode("w"))(inlineInfo(isInline))))("w header");
  };
  var tuneBodyOnlyInfo = function(isInline) {
    return withError(choice(foldableArray)([symbolLine(isInline), wordsAligned(isInline)]))("tune body only info");
  };
  var group3 = /* @__PURE__ */ function() {
    return withError(map(functorParser)(Group.create)(applySecond(applyParser)(headerCode("G"))(strToEol)))("G header");
  }();
  var fileUrl = /* @__PURE__ */ function() {
    return withError(map(functorParser)(FileUrl.create)(applySecond(applyParser)(headerCode("F"))(strToEol)))("F header");
  }();
  var fieldContinuation = /* @__PURE__ */ function() {
    return withError(map(functorParser)(FieldContinuation.create)(applySecond(applyParser)(headerCode("+"))(strToEol)))("field continuation");
  }();
  var dorian = /* @__PURE__ */ function() {
    return applyFirst(applyParser)(voidRight(functorParser)(Dorian.value)(whiteSpace))(regex2("[D|d][O|o][R|r][A-Za-z]*"));
  }();
  var discography = /* @__PURE__ */ function() {
    return withError(map(functorParser)(Discography.create)(applySecond(applyParser)(headerCode("D"))(strToEol)))("D header");
  }();
  var decoration = /* @__PURE__ */ withError(/* @__PURE__ */ applyFirst(applyParser)(/* @__PURE__ */ alt(altParser)(shortDecoration)(longDecoration))(whiteSpace))("decoration");
  var decorations = /* @__PURE__ */ many(decoration);
  var decoratedSpace = /* @__PURE__ */ function() {
    return applyFirst(applyParser)(map(functorParser)(DecoratedSpace.create)(decorations))($$char("y"));
  }();
  var cutTime = /* @__PURE__ */ function() {
    return voidRight(functorParser)(new Just(new Tuple(2, 2)))(string("C|"));
  }();
  var crlf = /* @__PURE__ */ withError(/* @__PURE__ */ voidRight(functorParser)("\n")(/* @__PURE__ */ regex2("!?\r(\n)?")))("expected crlf");
  var counted = function(num) {
    return function(parser) {
      return replicate1A(applyParser)(unfoldable1NonEmptyList)(traversable1NonEmptyList)(num)(parser);
    };
  };
  var composer = /* @__PURE__ */ function() {
    return withError(map(functorParser)(Composer.create)(applySecond(applyParser)(headerCode("C"))(strToEol)))("C header");
  }();
  var commonTime2 = /* @__PURE__ */ function() {
    return voidRight(functorParser)(new Just(new Tuple(4, 4)))($$char("C"));
  }();
  var commentStrToEol = /* @__PURE__ */ regex2("[^\r\n]*");
  var comment = /* @__PURE__ */ applySecond(applyParser)(/* @__PURE__ */ $$char("%"))(commentStrToEol);
  var commentLine = /* @__PURE__ */ function() {
    return withError(map(functorParser)(Comment.create)(comment))("comment line");
  }();
  var eol = /* @__PURE__ */ alt(altParser)(/* @__PURE__ */ applySecond(applyParser)(/* @__PURE__ */ optional(comment))(crlf))(newline);
  var continuation = /* @__PURE__ */ function() {
    return withError(applyFirst(applyParser)(apply(applyParser)(voidRight(functorParser)(Continuation.create)($$char("\\")))(regex2("[^\r\n]*")))(eol))("continuation");
  }();
  var buildVoice = function(v) {
    return function(id) {
      return function(properties) {
        return new Voice({
          id,
          properties
        });
      };
    };
  };
  var buildTupletSignature = function(ps) {
    return function(mq) {
      return function(mr) {
        var p = toTupletInt(ps);
        var qdefault = function() {
          if (p === 2) {
            return 3;
          }
          ;
          if (p === 3) {
            return 2;
          }
          ;
          if (p === 4) {
            return 3;
          }
          ;
          if (p === 6) {
            return 2;
          }
          ;
          if (p === 8) {
            return 3;
          }
          ;
          return 2;
        }();
        var q = fromMaybe(qdefault)(map(functorMaybe)(toTupletInt)(mq));
        var r = fromMaybe(p)(map(functorMaybe)(toTupletInt)(mr));
        return {
          p,
          q,
          r
        };
      };
    };
  };
  var tupletSignature = /* @__PURE__ */ applyFirst(applyParser)(/* @__PURE__ */ apply(applyParser)(/* @__PURE__ */ apply(applyParser)(/* @__PURE__ */ map(functorParser)(buildTupletSignature)(tupletLength))(tup))(tup))(whiteSpace);
  var buildTempoSignature3 = function(bpm) {
    var noteLengths = singleton6(reduce(ordInt)(euclideanRingInt)(1)(4));
    return {
      noteLengths,
      bpm,
      marking: Nothing.value
    };
  };
  var buildTempoSignature = function(marking) {
    return function(td) {
      return {
        noteLengths: td.value0,
        bpm: td.value1,
        marking
      };
    };
  };
  var buildTempoSignature2 = function(marking) {
    return function(td) {
      return buildTempoSignature(new Just(marking))(td);
    };
  };
  var buildSymbol = function(name2) {
    return {
      name: name2,
      duration: Nothing.value
    };
  };
  var chordSymbol = /* @__PURE__ */ withError(/* @__PURE__ */ map(functorParser)(function($34) {
    return ChordSymbol.create(buildSymbol($34));
  })(/* @__PURE__ */ literalQuotedString(false)))("chord symbol");
  var buildRest = function(r) {
    return {
      duration: r
    };
  };
  var buildRationalFromSlashList = function(xs) {
    var f = function(i) {
      return reduce(ordInt)(euclideanRingInt)(1)(pow(2)(i));
    };
    return f(length3(xs));
  };
  var manySlashes = /* @__PURE__ */ map(functorParser)(buildRationalFromSlashList)(/* @__PURE__ */ apply(applyParser)(/* @__PURE__ */ map(functorParser)(cons4)(/* @__PURE__ */ $$char("/")))(/* @__PURE__ */ many1(/* @__PURE__ */ $$char("/"))));
  var buildPitch = function(a) {
    return function(pitchStr) {
      return new Pitch({
        pitchClass: lookupPitch(pitchStr),
        accidental: a
      });
    };
  };
  var buildNote = function(macc) {
    return function(pitchStr) {
      return function(octave) {
        return function(ml) {
          return function(mt) {
            var tied = function() {
              if (mt instanceof Just) {
                return true;
              }
              ;
              return false;
            }();
            var spn = scientificPitchNotation(pitchStr)(octave);
            var pc = lookupPitch(toUpper(pitchStr));
            var l = fromMaybe(reduce(ordInt)(euclideanRingInt)(1)(1))(ml);
            var acc = function() {
              if (macc instanceof Nothing) {
                return Implicit.value;
              }
              ;
              if (macc instanceof Just) {
                return macc.value0;
              }
              ;
              throw new Error("Failed pattern match at Data.Abc.Parser (line 1145, column 7 - line 1147, column 20): " + [macc.constructor.name]);
            }();
            return {
              pitchClass: pc,
              accidental: acc,
              octave: spn,
              duration: l,
              tied
            };
          };
        };
      };
    };
  };
  var buildKeySignature = function(pStr) {
    return function(ma) {
      return function(mm) {
        return {
          pitchClass: lookupPitch(pStr),
          accidental: ma,
          mode: fromMaybe(Major.value)(mm)
        };
      };
    };
  };
  var buildKey = function(v) {
    return function(ks) {
      return function(pitches) {
        return function(properties) {
          return new Key({
            keySignature: ks,
            modifications: pitches,
            properties
          });
        };
      };
    };
  };
  var buildGraceableNote = function(maybeGrace) {
    return function(leftSlurs) {
      return function(decs) {
        return function(n) {
          return function(rightSlurs) {
            return {
              maybeGrace,
              leftSlurs,
              decorations: decs,
              abcNote: n,
              rightSlurs
            };
          };
        };
      };
    };
  };
  var buildGrace = function(isAcciaccatura) {
    return function(ns) {
      return {
        isAcciaccatura,
        notes: ns
      };
    };
  };
  var buildChord = function(leftSlurs) {
    return function(decs) {
      return function(ns) {
        return function(ml) {
          return function(rightSlurs) {
            var l = fromMaybe(fromInt(1))(ml);
            return {
              leftSlurs,
              decorations: decs,
              notes: ns,
              duration: l,
              rightSlurs
            };
          };
        };
      };
    };
  };
  var buildBrokenOperator = function(s) {
    var $20 = startsWith("<")(s);
    if ($20) {
      return new LeftArrow(length5(s));
    }
    ;
    return new RightArrow(length5(s));
  };
  var buildBarLine = function(endRepeats) {
    return function(thickness) {
      return function(startRepeats) {
        return function(iteration) {
          return {
            endRepeats,
            thickness,
            startRepeats,
            iteration
          };
        };
      };
    };
  };
  var degenerateDoubleColon = /* @__PURE__ */ function() {
    return applyFirst(applyParser)(voidRight(functorParser)(buildBarLine(1)(Thin.value)(1)(Nothing.value))($$char(":")))($$char(":"));
  }();
  var buildBar = function(decs) {
    return function(bl) {
      return function(m) {
        return {
          decorations: decs,
          startLine: bl,
          music: m
        };
      };
    };
  };
  var buildAnnotation = function(s) {
    var firstChar = charAt2(0)(s);
    var placement = function() {
      if (firstChar instanceof Just && firstChar.value0 === "^") {
        return AboveNextSymbol.value;
      }
      ;
      if (firstChar instanceof Just && firstChar.value0 === "_") {
        return BelowNextSymbol.value;
      }
      ;
      if (firstChar instanceof Just && firstChar.value0 === "<") {
        return LeftOfNextSymbol.value;
      }
      ;
      if (firstChar instanceof Just && firstChar.value0 === ">") {
        return RightOfNextSymbol.value;
      }
      ;
      return Discretional.value;
    }();
    return new Annotation(placement, drop4(1)(s));
  };
  var buildAccidental = function(s) {
    if (s === "^^") {
      return DoubleSharp.value;
    }
    ;
    if (s === "__") {
      return DoubleFlat.value;
    }
    ;
    if (s === "^") {
      return Sharp.value;
    }
    ;
    if (s === "_") {
      return Flat.value;
    }
    ;
    return Natural.value;
  };
  var buildAbcTune = function(hs) {
    return function(b) {
      return {
        headers: hs,
        body: b
      };
    };
  };
  var brokenRhythmOperator = /* @__PURE__ */ regex2("(<+|>+)");
  var degenerateBrokenRhythmOperator = /* @__PURE__ */ applyFirst(applyParser)(/* @__PURE__ */ applySecond(applyParser)(/* @__PURE__ */ optional(leftBracket))(brokenRhythmOperator))(/* @__PURE__ */ optional(rightBracket));
  var brokenRhythmTie = /* @__PURE__ */ applyFirst(applyParser)(/* @__PURE__ */ map(functorParser)(buildBrokenOperator)(degenerateBrokenRhythmOperator))(whiteSpace);
  var book = /* @__PURE__ */ function() {
    return withError(map(functorParser)(Book.create)(applySecond(applyParser)(headerCode("B"))(strToEol)))("B Header");
  }();
  var barlineThickness2 = /* @__PURE__ */ function() {
    return choice(foldableArray)([voidRight(functorParser)(ThickThin.value)(string("[|")), voidRight(functorParser)(ThinThick.value)(string("|]")), voidRight(functorParser)(ThickThin.value)(string("]|")), voidRight(functorParser)(ThinThin.value)(string("||")), voidRight(functorParser)(Thin.value)(string("|"))]);
  }();
  var area = /* @__PURE__ */ function() {
    return withError(map(functorParser)(Area.create)(applySecond(applyParser)(headerCode("A"))(strToEol)))("A header");
  }();
  var anyInt = /* @__PURE__ */ regex2("(0|[1-9][0-9]*)");
  var $$int = /* @__PURE__ */ withError(/* @__PURE__ */ map(functorParser)(/* @__PURE__ */ map(functorFn)(/* @__PURE__ */ fromMaybe(1))(fromString))(anyInt))("expected a positive integer");
  var anyRat = /* @__PURE__ */ apply(applyParser)(/* @__PURE__ */ applyFirst(applyParser)(/* @__PURE__ */ map(functorParser)(/* @__PURE__ */ reduce(ordInt)(euclideanRingInt))(/* @__PURE__ */ option(1)($$int)))(/* @__PURE__ */ $$char("/")))(/* @__PURE__ */ option(2)($$int));
  var degenerateTempo = /* @__PURE__ */ map(functorParser)(buildTempoSignature3)($$int);
  var integralAsRational = /* @__PURE__ */ map(functorParser)(fromInt)($$int);
  var noteDur = /* @__PURE__ */ choice(foldableArray)([/* @__PURE__ */ $$try(manySlashes), /* @__PURE__ */ $$try(anyRat), integralAsRational]);
  var meterSignature = /* @__PURE__ */ function() {
    return map(functorParser)(Just.create)(applyFirst(applyParser)(apply(applyParser)(applyFirst(applyParser)(map(functorParser)(Tuple.create)($$int))($$char("/")))($$int))(whiteSpace));
  }();
  var meterDefinition = /* @__PURE__ */ choice(foldableArray)([cutTime, commonTime2, meterSignature, nometer]);
  var meter = /* @__PURE__ */ function() {
    return withError(map(functorParser)(Meter.create)(applySecond(applyParser)(headerCode("M"))(meterDefinition)))("M header");
  }();
  var rational = /* @__PURE__ */ apply(applyParser)(/* @__PURE__ */ applyFirst(applyParser)(/* @__PURE__ */ map(functorParser)(/* @__PURE__ */ reduce(ordInt)(euclideanRingInt))($$int))(/* @__PURE__ */ $$char("/")))($$int);
  var headerRational = /* @__PURE__ */ applyFirst(applyParser)(rational)(whiteSpace);
  var noteDuration = /* @__PURE__ */ applyFirst(applyParser)(rational)(whiteSpace);
  var unitNoteLength = /* @__PURE__ */ function() {
    return withError(map(functorParser)(UnitNoteLength.create)(applySecond(applyParser)(headerCode("L"))(noteDuration)))("L header");
  }();
  var referenceNumber = /* @__PURE__ */ function() {
    return withError(applyFirst(applyParser)(map(functorParser)(ReferenceNumber.create)(applySecond(applyParser)(headerCode("X"))(optionMaybe($$int))))(whiteSpace))("x header");
  }();
  var tuneInfo = /* @__PURE__ */ withError(/* @__PURE__ */ choice(foldableArray)([area, book, composer, discography, fileUrl, group3, history, origin, source2, referenceNumber, transcription, unsupportedHeader]))("tune info");
  var tempoDesignation = /* @__PURE__ */ function() {
    return apply(applyParser)(applyFirst(applyParser)(map(functorParser)(TempoDesignation.create)(many1(headerRational)))($$char("=")))($$int);
  }();
  var prefixedTempoDesignation = /* @__PURE__ */ apply(applyParser)(/* @__PURE__ */ map(functorParser)(buildTempoSignature2)(spacedQuotedString))(tempoDesignation);
  var suffixedTempoDesignation = /* @__PURE__ */ apply(applyParser)(/* @__PURE__ */ map(functorParser)(/* @__PURE__ */ flip(buildTempoSignature2))(tempoDesignation))(spacedQuotedString);
  var unlabelledTempoDesignation = /* @__PURE__ */ function() {
    return map(functorParser)(buildTempoSignature(Nothing.value))(tempoDesignation);
  }();
  var tempoSignature = /* @__PURE__ */ applyFirst(applyParser)(/* @__PURE__ */ choice(foldableArray)([/* @__PURE__ */ $$try(suffixedTempoDesignation), /* @__PURE__ */ $$try(unlabelledTempoDesignation), degenerateTempo, prefixedTempoDesignation]))(whiteSpace);
  var tempo = /* @__PURE__ */ function() {
    return withError(map(functorParser)(Tempo.create)(applySecond(applyParser)(headerCode("Q"))(tempoSignature)))("Q header");
  }();
  var anyDigit2 = /* @__PURE__ */ regex2("([0-9])");
  var digit = /* @__PURE__ */ withError(/* @__PURE__ */ map(functorParser)(/* @__PURE__ */ map(functorFn)(/* @__PURE__ */ fromMaybe(1))(fromString))(anyDigit2))("expected a digit");
  var simpleVolta = /* @__PURE__ */ function() {
    return withError(map(functorParser)(Volta.create)(digit))("simple volta");
  }();
  var voltaRange = /* @__PURE__ */ function() {
    return withError(apply(applyParser)(map(functorParser)(VoltaRange.create)(digit))(applySecond(applyParser)($$char("-"))(digit)))("volta range");
  }();
  var volta = /* @__PURE__ */ alt(altParser)(/* @__PURE__ */ $$try(voltaRange))(simpleVolta);
  var repeatSection = /* @__PURE__ */ sepBy1(volta)(/* @__PURE__ */ $$char(","));
  var degenerateBarVolta = /* @__PURE__ */ function() {
    return map(functorParser)(buildBarLine(0)(Thin.value)(0))(map(functorParser)(Just.create)(applySecond(applyParser)(applySecond(applyParser)(whiteSpace)($$char("[")))(repeatSection)));
  }();
  var normalBarline = /* @__PURE__ */ withError(/* @__PURE__ */ apply(applyParser)(/* @__PURE__ */ apply(applyParser)(/* @__PURE__ */ apply(applyParser)(/* @__PURE__ */ map(functorParser)(buildBarLine)(repeatMarkers))(barlineThickness2))(repeatMarkers))(/* @__PURE__ */ optionMaybe(repeatSection)))("bartype");
  var barline = /* @__PURE__ */ choice(foldableArray)([/* @__PURE__ */ $$try(normalBarline), degenerateDoubleColon, degenerateBarVolta]);
  var annotationString = /* @__PURE__ */ withError(/* @__PURE__ */ applyFirst(applyParser)(/* @__PURE__ */ applySecond(applyParser)(/* @__PURE__ */ string('"'))(/* @__PURE__ */ regex2('[\\^\\>\\<-@](\\\\"|[^"\n])*')))(/* @__PURE__ */ string('"')))("annotation");
  var annotation = /* @__PURE__ */ withError(/* @__PURE__ */ map(functorParser)(buildAnnotation)(annotationString))("annotation");
  var alphaNumPlusString = /* @__PURE__ */ map(functorParser)(/* @__PURE__ */ function() {
    var $35 = fromFoldable(foldableList);
    return function($36) {
      return fromCharArray($35(toList($36)));
    };
  }())(/* @__PURE__ */ applyFirst(applyParser)(/* @__PURE__ */ many1(/* @__PURE__ */ alt(altParser)(alphaNum)(/* @__PURE__ */ alt(altParser)(/* @__PURE__ */ $$char("-"))(/* @__PURE__ */ alt(altParser)(/* @__PURE__ */ $$char("+"))(/* @__PURE__ */ $$char("_"))))))(whiteSpace));
  var kvPair = /* @__PURE__ */ function() {
    return apply(applyParser)(map(functorParser)(Tuple.create)(alphaNumPlusString))(applySecond(applyParser)($$char("="))(alt(altParser)(spacedQuotedString)(alphaNumPlusString)));
  }();
  var amorphousProperties = /* @__PURE__ */ applyFirst(applyParser)(/* @__PURE__ */ map(functorParser)(/* @__PURE__ */ fromFoldable2(ordString)(foldableList))(/* @__PURE__ */ many(kvPair)))(whiteSpace);
  var voice = /* @__PURE__ */ withError(/* @__PURE__ */ apply(applyParser)(/* @__PURE__ */ apply(applyParser)(/* @__PURE__ */ map(functorParser)(buildVoice)(/* @__PURE__ */ headerCode("V")))(alphaNumPlusString))(amorphousProperties))("V header");
  var aeolian = /* @__PURE__ */ function() {
    return applyFirst(applyParser)(voidRight(functorParser)(Aeolian.value)(whiteSpace))(regex2("[A|a][E|e][O|o][A-Za-z]*"));
  }();
  var mode = /* @__PURE__ */ choice(foldableArray)([/* @__PURE__ */ $$try(major), ionian, dorian, phrygian, lydian, mixolydian, aeolian, locrian, minor]);
  var keySignature2 = /* @__PURE__ */ function() {
    return apply(applyParser)(applyFirst(applyParser)(apply(applyParser)(map(functorParser)(buildKeySignature)(keyName))(option(Natural.value)(sharpOrFlat)))(whiteSpace))(optionMaybe(mode));
  }();
  var accidental2 = /* @__PURE__ */ map(functorParser)(buildAccidental)(/* @__PURE__ */ choice(foldableArray)([/* @__PURE__ */ string("^^"), /* @__PURE__ */ string("__"), /* @__PURE__ */ string("^"), /* @__PURE__ */ string("_"), /* @__PURE__ */ string("=")]));
  var keyAccidental = /* @__PURE__ */ apply(applyParser)(/* @__PURE__ */ map(functorParser)(buildPitch)(accidental2))(pitch2);
  var keyAccidentals = /* @__PURE__ */ applySecond(applyParser)(whiteSpace)(/* @__PURE__ */ sepBy(keyAccidental)(space));
  var key = /* @__PURE__ */ withError(/* @__PURE__ */ apply(applyParser)(/* @__PURE__ */ apply(applyParser)(/* @__PURE__ */ apply(applyParser)(/* @__PURE__ */ map(functorParser)(buildKey)(/* @__PURE__ */ headerCode("K")))(keySignature2))(keyAccidentals))(amorphousProperties))("K header");
  var anywhereInfo = function(isInline) {
    return withError(choice(foldableArray)([instruction(isInline), key, unitNoteLength, meter, macro(isInline), notes(isInline), parts(isInline), tempo, rhythm(isInline), remark(isInline), title(isInline), userDefined(isInline), voice, wordsAfter(isInline), fieldContinuation, commentLine]))("anywhere info");
  };
  var informationField = function(isInline) {
    return withError(choice(foldableArray)([anywhereInfo(isInline), tuneInfo]))("header");
  };
  var header = /* @__PURE__ */ applyFirst(applyParser)(/* @__PURE__ */ informationField(false))(eol);
  var headers = /* @__PURE__ */ withError(/* @__PURE__ */ many(header))("headers");
  var tuneBodyInfo = function(isInline) {
    return withError(choice(foldableArray)([tuneBodyOnlyInfo(isInline), anywhereInfo(isInline)]))("tune body info");
  };
  var inline = /* @__PURE__ */ function() {
    return withError(map(functorParser)(Inline.create)(between($$char("["))($$char("]"))(tuneBodyInfo(true))))("inline header");
  }();
  var tuneBodyHeader = /* @__PURE__ */ function() {
    return withError(applyFirst(applyParser)(map(functorParser)(BodyInfo.create)(tuneBodyInfo(true)))(eol))("tune body header");
  }();
  var maybeAccidental = /* @__PURE__ */ optionMaybe(accidental2);
  var acciaccatura = /* @__PURE__ */ map(functorParser)(function(v) {
    return true;
  })(/* @__PURE__ */ optionMaybe(/* @__PURE__ */ $$char("/")));
  var abcRest = /* @__PURE__ */ withError(/* @__PURE__ */ map(functorParser)(buildRest)(/* @__PURE__ */ map(functorParser)(/* @__PURE__ */ fromMaybe(/* @__PURE__ */ fromInt(1)))(/* @__PURE__ */ applySecond(applyParser)(/* @__PURE__ */ regex2("[XxZz]"))(/* @__PURE__ */ optionMaybe(noteDur)))))("abcRest");
  var rest2 = /* @__PURE__ */ function() {
    return withError(map(functorParser)(Rest.create)(abcRest))("rest");
  }();
  var abcNote = /* @__PURE__ */ withError(/* @__PURE__ */ apply(applyParser)(/* @__PURE__ */ apply(applyParser)(/* @__PURE__ */ apply(applyParser)(/* @__PURE__ */ apply(applyParser)(/* @__PURE__ */ map(functorParser)(buildNote)(maybeAccidental))(pitch2))(moveOctave))(/* @__PURE__ */ optionMaybe(noteDur)))(maybeTie))("ABC note");
  var grace = /* @__PURE__ */ apply(applyParser)(/* @__PURE__ */ map(functorParser)(buildGrace)(acciaccatura))(/* @__PURE__ */ many1(abcNote));
  var graceBracket = /* @__PURE__ */ withError(/* @__PURE__ */ applyFirst(applyParser)(/* @__PURE__ */ between(/* @__PURE__ */ $$char("{"))(/* @__PURE__ */ $$char("}"))(grace))(whiteSpace))("grace bracket");
  var graceableNote2 = /* @__PURE__ */ withError(/* @__PURE__ */ apply(applyParser)(/* @__PURE__ */ apply(applyParser)(/* @__PURE__ */ apply(applyParser)(/* @__PURE__ */ apply(applyParser)(/* @__PURE__ */ map(functorParser)(buildGraceableNote)(/* @__PURE__ */ optionMaybe(graceBracket)))(leftSlurBrackets))(decorations))(abcNote))(rightSlurBrackets))("graceable note");
  var brokenRhythmPair = /* @__PURE__ */ function() {
    return withError(apply(applyParser)(apply(applyParser)(map(functorParser)(BrokenRhythmPair.create)(graceableNote2))(brokenRhythmTie))(graceableNote2))("broken rhythm pair");
  }();
  var note = /* @__PURE__ */ function() {
    return map(functorParser)(Note.create)(graceableNote2);
  }();
  var restOrNote2 = /* @__PURE__ */ function() {
    return alt(altParser)(map(functorParser)(Left.create)(abcRest))(applyFirst(applyParser)(map(functorParser)(Right.create)(graceableNote2))(whiteSpace));
  }();
  var tuplet2 = /* @__PURE__ */ bind(bindParser)(/* @__PURE__ */ optionMaybe(graceBracket))(function(maybeGrace) {
    return bind(bindParser)(tupletBrackets)(function(leftBracketCount) {
      var leftSlurs = max(ordInt)(0)(leftBracketCount - 1 | 0);
      return bind(bindParser)(tupletSignature)(function(signature) {
        return bind(bindParser)(counted(signature.r)(restOrNote2))(function(restsOrNotes) {
          return pure(applicativeParser)(new Tuplet({
            maybeGrace,
            leftSlurs,
            signature,
            restsOrNotes
          }));
        });
      });
    });
  });
  var abcChord = /* @__PURE__ */ withError(/* @__PURE__ */ apply(applyParser)(/* @__PURE__ */ apply(applyParser)(/* @__PURE__ */ apply(applyParser)(/* @__PURE__ */ apply(applyParser)(/* @__PURE__ */ map(functorParser)(buildChord)(leftSlurBrackets))(decorations))(/* @__PURE__ */ between(/* @__PURE__ */ $$char("["))(/* @__PURE__ */ $$char("]"))(/* @__PURE__ */ many1(/* @__PURE__ */ applyFirst(applyParser)(abcNote)(whiteSpace)))))(/* @__PURE__ */ optionMaybe(noteDur)))(rightSlurBrackets))("ABC chord");
  var chord2 = /* @__PURE__ */ function() {
    return withError(map(functorParser)(Chord.create)(abcChord))("chord");
  }();
  var scoreItem = /* @__PURE__ */ withError(/* @__PURE__ */ choice(foldableArray)([/* @__PURE__ */ $$try(chord2), /* @__PURE__ */ $$try(inline), continuation, /* @__PURE__ */ $$try(decoratedSpace), ignore, spacer, /* @__PURE__ */ $$try(annotation), chordSymbol, /* @__PURE__ */ $$try(tuplet2), rest2, /* @__PURE__ */ $$try(brokenRhythmPair), /* @__PURE__ */ $$try(note)]))("score item");
  var bar2 = /* @__PURE__ */ withError(/* @__PURE__ */ apply(applyParser)(/* @__PURE__ */ apply(applyParser)(/* @__PURE__ */ map(functorParser)(buildBar)(decorations))(barline))(/* @__PURE__ */ many(scoreItem)))("bar");
  var fullyBarredLine = /* @__PURE__ */ withError(/* @__PURE__ */ manyTill(bar2)(eol))("fully barred line");
  var introBar = /* @__PURE__ */ function() {
    return withError(map(functorParser)(buildBar(Nil.value)(invisibleBarType))(many(scoreItem)))("intro bar");
  }();
  var introLine = /* @__PURE__ */ function() {
    return withError(apply(applyParser)(map(functorParser)(Cons.create)(introBar))(manyTill(bar2)(eol)))("intro line");
  }();
  var score = /* @__PURE__ */ function() {
    return withError(map(functorParser)(Score.create)(alt(altParser)(introLine)(fullyBarredLine)))("score");
  }();
  var body = /* @__PURE__ */ function() {
    return apply(applyParser)(map(functorParser)(Cons.create)(score))(manyTill(alt(altParser)($$try(tuneBodyHeader))(score))(eof));
  }();
  var abc = /* @__PURE__ */ apply(applyParser)(/* @__PURE__ */ map(functorParser)(buildAbcTune)(headers))(body);
  var parse = function(s) {
    var v = runParser(abc)(s);
    if (v instanceof Right) {
      return new Right(v.value0);
    }
    ;
    if (v instanceof Left) {
      return new Left(v.value0);
    }
    ;
    throw new Error("Failed pattern match at Data.Abc.Parser (line 1461, column 3 - line 1466, column 13): " + [v.constructor.name]);
  };

  // output/Main/index.js
  var oneBar = /* @__PURE__ */ function() {
    return "X: 1\r\nT: one bar\r\nR: Polska\r\nM: 3/4\r\nL: 1/8\r\nK: Gdor\r\nV:1\r\nd2 d2 _B>c |\r\nV:2\r\nB2 B2 G>A |\r\n";
  }();
  var config = /* @__PURE__ */ function() {
    return {
      parentElementId: defaultConfig.parentElementId,
      width: 1200,
      height: defaultConfig.height,
      scale: defaultConfig.scale,
      isSVG: defaultConfig.isSVG,
      titled: defaultConfig.titled,
      showChordSymbols: defaultConfig.showChordSymbols
    };
  }();
  var main = /* @__PURE__ */ function() {
    var v = parse(oneBar);
    if (v instanceof Right) {
      return function __do() {
        var renderer = initialiseCanvas(config)();
        return renderPolyphonicTune(config)(renderer)(v.value0)();
      };
    }
    ;
    return pure(applicativeEffect)(new Just("ABC failed to parse"));
  }();

  // <stdin>
  main();
})();
