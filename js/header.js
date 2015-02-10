var $ = require( 'jquery' );
var tabs = require( './tabs' );

var space = 20;
var fixed = true;
var $header;
var footer;
var $window;
var footer_top;
var window_bottom;

module.exports.refresh = function() {
  footer_top = footer.offsetTop;
  window_bottom = window.pageYOffset + window.innerHeight;
  if ( fixed && window_bottom > footer_top )
    unfix();
  else if ( !fixed && window_bottom <= footer_top )
    fix();
  tabs.update();
};

$( function() {

  $header = $( '#main-header' );
  footer = document.getElementById( 'main-footer' );

  $window = $( window );
  $window.load( function() {
    module.exports.refresh();
    tabs.headerLoaded();
  } );
  $window.scroll( module.exports.refresh );

} );

function unfix() {
  $header.css( { position: 'absolute', bottom: -( footer_top - window.innerHeight ) + space } );
  fixed = false;
}

function fix() {
  $header.css( { position: 'fixed', bottom: space } );
  fixed = true;
}
