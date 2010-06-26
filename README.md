Ease
====

Ease is a base level class encapsulating the core animation functionality of mutating a numeric value over time. An optionally scoped callback function may be invoked at each step in the transition. Any of the classic [Robert Penner easing equations](http://www.robertpenner.com/easing/) can be used. All Ease instances use a single interval loop, provided by [Timer](http://github.com/mseeley/Timer).

Ease values control, reusability, minimal overhead, and low file size -- less than 1 KB compressed and gzipped.

-   [Source](http://github.com/mseeley/ease)
-   [Unit tests](http://github.com/mseeley/ease/blob/master/src-test/)
-   [BSD Licensed](http://github.com/mseeley/ease/raw/master/LICENSE)

Interface
=========

    factory ease

      Ease  ease (Number from, Number to, Number time, Function onstep)
      Ease  ease (Object settings)

    class Ease

      Boolean   busy
      Number    id

      void      start(Object settings)
      void      finish()
      void      cancel()

    object settings

      Number    delta     Optional, required if 'to' is omitted
      Function  ease
      Number    elapsed   Optional, resumes transition in time
      Number    from
      Function  onstep
      Object    scope     Optional
      Number    time
      Number    to        Optional, required if 'delta' is omitted

Usage
=====

Ease instances accept a callback function which is executed on each step of the transition. This callback function is invoked with two arguments; the first is the step value and the second is a reference to the associated Ease instance.

Simple transition tasks may be performed using disposable Ease instances provided by the `ease()` factory method.

    // Fade out #myPanel over 400ms
    hideButton.addEventListener("click", function () {
      var panel = document.getElementById("myPanel");

      ease(100, 0, 400, function (v, e) {
        panel.style.opacity = v / 100;
      });
    }, false);

Transitions sometimes need to be abruptly concluded or immediately cancelled; Ease supports both use cases.  Invoking the `finish()` method concludes the transition and executes the callback methods. While calling `cancel()` stops the transition but does not execute callback methods.

In addition to the cancellation displayed below, note the callback scope manipulation and usage of a `delta` argument instead of a `to` value.

    var widget = {
      ease: new Ease,
      element: document.getElementById("myWidget"),
      show: function () {
        this.ease.start({
          from: 0, delta: 100, time: 400, scope: this,
          onstep: function (v, e) {
            this.element.style.opacity = v / 100;

            if (v === 0) {
              // first step
            } else if (v === 100) {
              // last step
            }
          }
        })
      },
      destroy: function () {
        // cease any pending transition before destroying the instance
        this.e.cancel();
      }
    };

---

[BSD Licensed](http://github.com/mseeley/ease/raw/master/LICENSE)

&copy; Matthew Seeley 2010
