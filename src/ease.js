/**
 * Ease
 * git://github.com/mseeley/ease.git
 * http://github.com/mseeley/ease/raw/master/LICENSE
 */
(function (global) {

  var NULL = null,
      t = timer,
      context = {
        delta: NULL,
        ease: NULL,
        from: NULL,
        onstep: NULL,
        scope: global,
        time: NULL,
        to: NULL,
        elapsed: 0,
        // Assigned only by Ease
        start: NULL
      },
      contexts = {},
      id = 0,
      interval = 20;  // 50fps, 17 is ~60fps

  /**
   * Simple compressor friendly literal type checker.
   * @private
   */
  function not (obj, type) {
    return typeof obj != type;
  }

  /**
   * Copies values or sets references to src properties on dest object.
   * @private
   */
  function mix (src, dest) {
    var each;
    for (each in src) {
      dest[each] = src[each];
    }
    return dest;
  }

  /**
   * Provides in between value to onstep and oncomplete callback functions.
   * @private
   */
  function step (ctx) {
    var elapsed = ctx.elapsed,
        time = ctx.time,
        onstep = ctx.onstep,
        to = ctx.to,
        v = elapsed < time
            ? ctx.ease(elapsed, ctx.from, ctx.delta, time)
            : to;

    // Adjust elapsed after value is calculated, prevents value jump on first
    // frame. Also ensures on first frame value === from.

    ctx.elapsed = +new Date - ctx.start;

    if (v == to) {
      this.finish();
    } else if (onstep) {
      onstep.call(ctx.scope, v, this);
    }
  }

  /**
   * Bespoke class for transitioning a numeric value over time. Use this class
   * alone or to build higher-level animation classes.
   * @class Ease
   * @constructor
   */
  function Ease () {
    this.id = ++id;
  }

  Ease.prototype = {
    /**
     * @property id
     * @type Number
     */
    id: NULL,

    /**
     * @property busy
     * @type Boolean
     */
    busy: false,

    /**
     * Commences an ease. Accepts a settings object which is merged
     * with defaults to form the ease context object. The settings object is
     * not validated for conforming values nor types.
     * @method start
     */
    start: function (settings) {
      var ctx = mix(settings, mix(context, {})),
          num = "number";

      // If both values are supplied then ignore the delta setting

      if (ctx.to === NULL) {
        ctx.to = ctx.from + ctx.delta;
      } else {
        ctx.delta = ctx.to - ctx.from;
      }

      // Animation may resume from a non zero time offset

      ctx.start = +new Date - ctx.elapsed;

      this.busy &&
        this.cancel();

      // Cache the ease context data for the length of the transition. Inverse
      // actions performed in cancel();

      this.busy = true;
      contexts[this.id] = ctx;
      t.set(step, interval, this, ctx);
    },

    /**
     * Destroys the current ease context. Does not invoke oncomplete callback.
     * @method stop
     */
    cancel: function () {
      if (this.busy) {
        this.busy = false;
        delete contexts[this.id];
        t.clear(step, interval, this);
      }
    },

    /**
     * Cancels the current ease context and calls oncomplete callback.
     * @method finish
     */
    finish: function () {
      if (this.busy) {
        var id = this.id,
            ctx = contexts[id],
            onstep = ctx.onstep;

        this.cancel();

        onstep &&
          onstep.call(ctx.scope, ctx.to, this);
      }
    }
  };

// Expose public interface -----------------------------------------------------

  global.Ease = Ease;

  /**
   * Factory method for creating disposable Ease instances.
   *
   * @param {Number} from
   * @param {Number} to
   * @param {Number} time
   * @param {Function} onstep
   *
   * Or,
   *
   * @param {Object} settings
   *
   * @static
   * @method ease
   * @return {Ease}
   */
  global.ease = function (from, to, time, onstep) {
    var args = arguments,
        e = new Ease();

    e.start(args.length == 1 ? args[0] : {
      from: from,
      to: to,
      time: time,
      onstep: onstep,
      // cubic easing in/out - acceleration until halfway, then deceleration
      // (c) 2003 Robert Penner, all rights reserved.
      ease: function (t, b, c, d) {
        return (t/=d/2 < 1 ? c/2*t*t*t : c/2*((t-=2)*t*t + 2)) + b;
      }
    });

    return e;
  };

})(this);
