var $ = require( 'jquery' );

var space = 20;
var fixed = true;
var $header;
var footer;
var $window;
var footer_top;
var window_bottom;

module.exports = function ( tab_data ) {
  var tabs = require( './tabs' )( tab_data );

  $header = $( '#main-header' );
  footer = document.getElementById( 'main-footer' );

  $window = $( window );
  $window.load( function () {
    refresh();
    tabs.headerLoaded();
  } );
  $window.scroll( refresh );

  function refresh() {
    footer_top = footer.offsetTop;
    window_bottom = window.pageYOffset + window.innerHeight;
    if ( fixed && window_bottom > footer_top )
      unfix();
    else if ( !fixed && window_bottom <= footer_top )
      fix();
    tabs.update();
  }
};

function unfix() {
  $header.css( {
    position: 'absolute',
    bottom: -( footer_top - window.innerHeight ) + space
  } );
  fixed = false;
}

function fix() {
  $header.css( {
    position: 'fixed',
    bottom: space
  } );
  fixed = true;
}
