(function () {

  // This file contains the following test groups
  var testClass,
      testFactory;

  // rpenner linear equation
  function linear (t, b, c, d) {
    return c * t / d + b;
  }

  testClass = {

    "id prop set on instantiation": function () {
      return typeof new Ease().id !== undefined;
    },

    "busy prop set when easing": function (del) {
      var e = new Ease(),
          before = e.busy,
          during,
          done,
          after,
          delegate = del(function () {
            after = e.busy;
            return before === false &&
                   during === true &&
                   done === false &&
                   after === false;
          });

      e.start({
        from: 0, to: 1, time: 50, ease: linear,
        onstep: function (v, eas) {
          if (v == 0) {
            during = e.busy;
          } else if (v == 1) {
            done = e.busy;
            setTimeout(delegate, 10);
          }
        }
      });
    },

    "start() ascends with from-to": function (del) {
      var e = new Ease(),
          from = 0,
          to = 1,
          start,
          end,
          delegate = del(function(result) {
            return result;
          });

      e.start({
        from: from,
        to: to,
        time: 50,
        ease: linear,
        onstep: function (v) {
          if (v === from) {
            start = true;
          } else if (v === to) {
            end = true;
            delegate(start && end);
          }
        }
      });
    },

    "start() descends with from-to": function (del) {
      var e = new Ease(),
          from = 1,
          to = 0,
          start,
          end,
          delegate = del(function(result) {
            return result;
          });

      e.start({
        from: from,
        to: to,
        time: 50,
        ease: linear,
        onstep: function (v) {
          if (v === from) {
            start = true;
          } else if (v === to) {
            end = true;
            delegate(start && end);
          }
        }
      });
    },

    "start() ascends with from-delta": function (del) {
      var e = new Ease(),
          from = 0,
          delta = 1,
          start,
          end,
          delegate = del(function(result) {
            return result;
          });

      e.start({
        from: from,
        delta: delta,
        time: 50,
        ease: linear,
        onstep: function (v) {
          if (v === from) {
            start = true;
          } else if (v === from + delta) {
            end = true;
            delegate(start && end);
          }
        }
      });
    },

    "start() descends with from-delta": function (del) {
      var e = new Ease(),
          from = 0,
          delta = -1,
          start,
          end,
          delegate = del(function(result) {
            return result;
          });

      e.start({
        from: from,
        delta: delta,
        time: 50,
        ease: linear,
        onstep: function (v) {
          if (v === from) {
            start = true;
          } else if (v === from + delta) {
            end = true;
            delegate(start && end);
          }
        }
      });
    },

    "start() with elapsed": function (del) {
      var e = new Ease(),
          delegate = del(function(result) {
            return result;
          });

      e.start({
        from: 0,
        to: 1,
        time: 50,
        elapsed: 25,
        ease: linear,
        onstep: function (v) {
          if (v === 0) {
            delegate(false);
          } else if (v === 1) {
            delegate(true);
          }
        }
      });
    },

    "start() start anew at v == 1": function (del) {
      var e = new Ease(),
          startCount = 0,
          completeCount = 0,
          restart = true,
          from = 0
          to = 1,
          delegate = del(function (result) {
            return result;
          }),
          settings = {
            from: from,
            to: to,
            time: 50,
            ease: linear,
            onstep: function (v, e) {
              if (v == from) {
                startCount++;
              } else if (v == to) {
                completeCount++

                if (restart) {
                  restart = false;
                  e.start(settings);
                } else {
                  delegate(true);
                }
              }
            }
          };

      e.start(settings);
    },

    "onstep() scoped": function (del) {
      var e = new Ease(),
          delegate = del(function(result) {
            return result;
          }),
          o = {
            onstep: function (v, e) {
              delegate(this === o);
              e.cancel();
            }
          };

      e.start({
        from: 0,
        to: 1,
        time: 50,
        ease: linear,
        onstep: o.onstep,
        scope: o
      });
    },

    "onstep() callback receives value and ease args": function (del) {
      var e = new Ease(),
          delegate = del(function(result) {
            return result;
          });

      e.start({
        from: 0,
        to: 1,
        time: 50,
        ease: linear,
        onstep: function (v, e) {
          delegate (typeof v === "number" && e instanceof Ease);
        }
      });
    },

    "finish() callback receives value and ease args": function (del) {
      var e = new Ease(),
          count = 0,
          value = 0,
          delegate = del(function(result) {
            return result;
          });

      e.start({
        from: 0,
        to: 1,
        time: 50,
        ease: linear,
        onstep: function (v, e) {
          delegate(typeof v == "number" && e instanceof Ease);
        }
      });

      e.finish();
    },

    "finish() stops immediately": function (del) {
      var e = new Ease(),
          count = 0,
          value = 0,
          delegate = del(function(result) {
            return result;
          });

      e.start({
        from: 0,
        to: 1,
        time: 50,
        ease: linear,
        onstep: function (v, e) {
          value = v;
          count++;
        }
      });

      e.finish();

      // onstep must have executed only once and the value should be 1
      setTimeout(function () {
        delegate(count === 1 && value === 1);
      }, 50);
    },

    "cancel() stops immediately": function (del) {
      var e = new Ease(),
          count = 0,
          delegate = del(function(result) {
            return result;
          });

      e.start({
        from: 0,
        to: 1,
        time: 50,
        ease: linear,
        onstep: function (v, e) {
          count++;
        }
      });

      e.cancel();

      // onstep must have NOT executed
      setTimeout(function () {
        delegate(count === 0);
      }, 50);
    }
  };

  testFactory = {

    "returns instance when invoked with one arg": function (del) {
      var result = ease({
        from: 0,
        to: 1,
        time: 50,
        ease: linear,
        onstep: function(){}
      });

      return result instanceof Ease;
    },

    "returns instance when invoked with many args": function (del) {
      return ease(0, 1, 50, function(){}) instanceof Ease;
    },

    "ease starts automatically": function (del) {
      ease(0, 1, 50, del(function(){
        return true;
      }));
    }
  };

  kaze.tests(testClass, testFactory);

})();
