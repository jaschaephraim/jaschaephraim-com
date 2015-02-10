var $ = require( 'jquery' );
var tabs = require( './tabs' );

var pause_dur = 4000;
var deg_per_tick = 5;
var timer;
var ticks = 0;
var playing = false;
var current_pie = 'a';
var current_half = 'r';

var $pie = $( '<a id="pie" href="#" />' );
var $icon = $( '<div id="pie-icon" />' );
var $left_a = $( '<img id="pie-left-a" class="pie-left" src="img/circle/left-a.svg" />' );
var $right_a = $( '<img id="pie-right-a" class="pie-right" src="img/circle/right-a.svg" />' );
var $left_b = $( '<img id="pie-left-b" class="pie-left" src="img/circle/left-b.svg" />' );
var $right_b = $( '<img id="pie-right-b" class="pie-right" src="img/circle/right-b.svg" />' );

$pie.click( function() {

  if ( playing )
    module.exports.stop();
  else {
    tabs.next();
    start();
  }

} );

$pie.append( $icon, $left_b, $right_b, $left_a, $right_a );
var $all = $left_a.add( $right_a ).add( $left_b ).add( $right_b );
var $current_piece = $right_a;

function start() {
  playing = true;
  timer = setInterval( tick, pause_dur / ( 360 / deg_per_tick ) );
  $icon.text( '' );
}
module.exports.stop = function() {
  playing = false;
  clearInterval( timer );
  ticks = 0;
  current_pie = 'a';
  current_half = 'r';
  set_positions();
  $icon.text( '' );
};
function tick() {
  switch ( ticks ) {
    case 360:
      ticks = 0;
      full_pie();
      tabs.next();
      break;
    case 180:
      half_pie();
    default:
      ticks += deg_per_tick;
  }
  tick_pie();
}
function set_positions() {
  if ( current_pie == 'a' ) {
    if ( current_half == 'r' ) {
      rotate( $left_a, 0 );
      rotate( $right_a, 0 );
      rotate( $left_b, 180 );
      rotate( $right_b, 0 );
      set_current( $right_a );
    } else {
      set_current( $left_b );
    }
  } else {
    if ( current_half == 'r' ) {
      rotate( $left_a, 180 );
      rotate( $right_a, 0 );
      rotate( $left_b, 0 );
      rotate( $right_b, 0 );
      set_current( $right_b );
    } else {
      set_current( $left_a );
    }
  }
}
function tick_pie() {
  $current_piece.css( { transform: 'rotate(' + ticks + 'deg)' } );
}
function half_pie() {
  current_half = current_half == 'l' ? 'r' : 'l';
  set_positions();
}
function full_pie() {
  current_pie = current_pie == 'a' ? 'b' : 'a';
  half_pie();
}

function set_current( $obj ) {
  $all.not( $obj ).css( { zIndex: 0 } );
  $obj.css( { zIndex: 100 } );
  $current_piece = $obj;
}
function rotate( $obj, deg ) {
  $obj.css( { transform: 'rotate(' + deg + 'deg)' } );
}

$( function() {

  $( '#image-wrapper' ).append( $pie );
  start();

} );
