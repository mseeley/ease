/*!
  Easing Equations v1.5
  May 1, 2003
  (c) 2003 Robert Penner, all rights reserved.
  This work is subject to the terms in http://www.robertpenner.com/easing_terms_of_use.html.
*/
(function (global) {

  var math = global.Math,
      cos = math.cos,
      pi = math.PI,
      pow = math.pow,
      sqrt = math.sqrt;

  // bounce easing in
  // t: current time, b: beginning value, c: change in position, d: duration
  function bounceIn (t, b, c, d) {
    return c - bounceOut (d-t, 0, c, d) + b;
  }

  // bounce easing out
  function bounceOut (t, b, c, d) {
    var i = 7.5625, j = 2.75;
    if ((t/=d) < (1/j)) {
      return c*(i*t*t) + b;
    } else if (t < (2/j)) {
      return c*(i*(t-=(1.5/j))*t + .75) + b;
    } else if (t < (2.5/j)) {
      return c*(i*(t-=(2.25/j))*t + .9375) + b;
    } else {
      return c*(i*(t-=(2.625/j))*t + .984375) + b;
    }
  }

// Expose public interface -----------------------------------------------------

  global.easing = {

    // simple linear tweening - no easing
    // t: current time, b: beginning value, c: change in value, d: duration
    linear: function (t, b, c, d) {
      return c*t/d + b;
    },

    // quadratic easing in - accelerating from zero velocity
    // t: current time, b: beginning value, c: change in value, d: duration
    // t and d can be in frames or seconds/milliseconds
    quadIn: function (t, b, c, d) {
      return c*(t/=d)*t + b;
    },

    // quadratic easing out - decelerating to zero velocity
    quadOut: function (t, b, c, d) {
      return -c *(t/=d)*(t-2) + b;
    },

    // quadratic easing in/out - acceleration until halfway, then deceleration
    quadInOut: function (t, b, c, d) {
      if ((t/=d/2) < 1) return c/2*t*t + b;
      return -c/2 * ((--t)*(t-2) - 1) + b;
    },

    // cubic easing in - accelerating from zero velocity
    // t: current time, b: beginning value, c: change in value, d: duration
    // t and d can be frames or seconds/milliseconds
    cubicIn: function (t, b, c, d) {
      return c*(t/=d)*t*t + b;
    },

    // cubic easing out - decelerating to zero velocity
    cubicOut: function (t, b, c, d) {
      return c*((t=t/d-1)*t*t + 1) + b;
    },

    // cubic easing in/out - acceleration until halfway, then deceleration
    cubicInOut: function (t, b, c, d) {
      if ((t/=d/2) < 1) return c/2*t*t*t + b;
      return c/2*((t-=2)*t*t + 2) + b;
    },

    // quartic easing in - accelerating from zero velocity
    // t: current time, b: beginning value, c: change in value, d: duration
    // t and d can be frames or seconds/milliseconds
    quartIn: function (t, b, c, d) {
      return c*(t/=d)*t*t*t + b;
    },

    // quartic easing out - decelerating to zero velocity
    quartOut: function (t, b, c, d) {
      return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },

    // quartic easing in/out - acceleration until halfway, then deceleration
    quartInOut: function (t, b, c, d) {
      if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
      return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },

    // quintic easing in - accelerating from zero velocity
    // t: current time, b: beginning value, c: change in value, d: duration
    // t and d can be frames or seconds/milliseconds
    quintIn: function (t, b, c, d) {
      return c*(t/=d)*t*t*t*t + b;
    },

    // quintic easing out - decelerating to zero velocity
    quintOut: function (t, b, c, d) {
      return c*((t=t/d-1)*t*t*t*t + 1) + b;
    },

    // quintic easing in/out - acceleration until halfway, then deceleration
    quintInOut: function (t, b, c, d) {
      if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
      return c/2*((t-=2)*t*t*t*t + 2) + b;
    },

    // sinusoidal easing in - accelerating from zero velocity
    // t: current time, b: beginning value, c: change in position, d: duration
    sineIn: function (t, b, c, d) {
      return -c * cos(t/d * (pi/2)) + c + b;
    },

    // sinusoidal easing out - decelerating to zero velocity
    sineOut: function (t, b, c, d) {
      return c * math.sin(t/d * (pi/2)) + b;
    },

    // sinusoidal easing in/out - accelerating until halfway, then decelerating
    sineInOut: function (t, b, c, d) {
      return -c/2 * (cos(pi*t/d) - 1) + b;
    },

    // exponential easing in - accelerating from zero velocity
    // t: current time, b: beginning value, c: change in position, d: duration
    expoIn: function (t, b, c, d) {
      return (t==0) ? b : c * pow(2, 10 * (t/d - 1)) + b;
    },

    // exponential easing out - decelerating to zero velocity
    expoOut: function (t, b, c, d) {
      return (t==d) ? b+c : c * (-pow(2, -10 * t/d) + 1) + b;
    },

    // exponential easing in/out - accelerating until halfway, then decelerating
    expoInOut: function (t, b, c, d) {
      if (t==0) return b;
      if (t==d) return b+c;
      if ((t/=d/2) < 1) return c/2 * pow(2, 10 * (t - 1)) + b;
      return c/2 * (-pow(2, -10 * --t) + 2) + b;
    },

    // circular easing in - accelerating from zero velocity
    // t: current time, b: beginning value, c: change in position, d: duration
    circIn: function (t, b, c, d) {
      return -c * (sqrt(1 - (t/=d)*t) - 1) + b;
    },

    // circular easing out - decelerating to zero velocity
    circOut: function (t, b, c, d) {
      return c * sqrt(1 - (t=t/d-1)*t) + b;
    },

    // circular easing in/out - acceleration until halfway, then deceleration
    circInOut: function (t, b, c, d) {
      if ((t/=d/2) < 1) return -c/2 * (sqrt(1 - t*t) - 1) + b;
      return c/2 * (sqrt(1 - (t-=2)*t) + 1) + b;
    },

    // bounce easing in
    // t: current time, b: beginning value, c: change in position, d: duration
    bounceIn: bounceIn,

    // bounce easing out
    bounceOut: bounceOut,

    // bounce easing in/out
    bounceInOut: function (t, b, c, d) {
      return (t < d / 2) ?
        bounceIn (t*2, 0, c, d) * .5 + b :
        bounceOut (t*2-d, 0, c, d) * .5 + c*.5 + b;

      //if (t < d/2) return bounceIn (t*2, 0, c, d) * .5 + b;
      //return bounceOut (t*2-d, 0, c, d) * .5 + c*.5 + b;
    }
  };

})(this);
