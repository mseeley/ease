/*!
Copyright (c) 2010, Matthew Seeley
BSD Licensed: http://github.com/mseeley/Timer/tree/master/LICENSE
      Source: git://github.com/mseeley/Timer.git
*/
(function(g){function l(a){for(var b=f[a],c=b.fns,d=c.length,e;d--;){e=c[d];e[0].apply(e[1],e[2])}if(j==n)b.id=h(a)}function m(a,b,c){var d=f[b],e;b=-1;if(d){e=d.fns;for(d=e.length;d--;)if(e[d][0]==a&&e[d][1]==c){b=d;break}}return b}function h(a){var b=g["set"+j];h=g.execScript?function(c){return b(function(){l(c)},c)}:function(c){return b(l,c,c)};return h(a)}function k(a){a=f[a];g["clear"+j](a.id);a.id=null;a.fns=[]}var n="Timeout",j="Interval",o=[].slice,f={};g.timer={set:function(a,b,c){var d=
o.call(arguments,3),e=false,i;if(a&&b>=0&&m(a,b,c)<0){f[b]||(f[b]={id:null,fns:[]});i=f[b];if(i.id===null)i.id=h(b);i.fns.push([a,c,d]);e=!e}return e},clear:function(a,b,c){a=m(a,b,c);c=false;var d;if(a>-1){d=f[b];d.fns.splice(a,1);d.fns.length||k(b);c=!c}return c},clearAll:function(a){if(a>=0)k(a);else{var b;for(b in f)k(b)}}}})(this);
