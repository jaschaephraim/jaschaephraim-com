var $ = require( 'jquery' );
var bracket = require( './bracket' );

var $window;
var $wrapper;

var tabs = [];
var heights = {};
var num_tags = 0;
var fade_dur = 200;
var current_tag = 0;

module.exports.update = function() {

  for ( var i in tabs )
    tabs[ i ].update();

  var tag = tabs[ current_tag ];
  var $nav = tag.$item_nav;
  var item = tag.items[ tag.current_item ];
  var $item = item.$item;
  heights = {
    doc: $window.innerHeight(),
    nav: $nav.offset().top + $nav.height(),
    item: $item.offset().top + $item.height()
  };
  $wrapper.css( { height: Math.max( heights.doc, heights.nav, heights.item ) } );

  tag.moveBracket();
  item.moveBracket();

};

module.exports.headerLoaded = function() {
  tabs[ current_tag ].goTo();
  bracket.fadeIn( fade_dur );
};

module.exports.next = function() {
  var next = current_tag + 1;
  if ( next == num_tags ) {
    for ( var i in tabs )
      tabs[ i ].nextItem();
    next = 0;
  }
  tabs[ next ].goTo();
};

$( function() {

  $window = $( window );
  $wrapper = $( '#wrapper' );
  $window.resize( module.exports.update );

  var $tag_tabs = $( '#tag-nav a' );
  var $item_navs = $( '.item-nav' );
  var $tag_items = $( '.tag-items' );

  $tag_tabs.each( function( i, tag_tab ) {

    tabs[ i ] = {

      $tag_tab: $( tag_tab ),
      $item_nav: $item_navs.eq( i ),
      $tag_item: $tag_items.eq( i ),
      items: [],
      num_items: 0,
      current_item: 0

    };
    
    var tab = tabs[ i ];
    num_tags++;
    tab.$item_tabs = tab.$item_nav.find( 'a' );
    tab.$items = tab.$tag_item.find( '.item' );

    tab.moveBracket = function( animate ) {

      var main_header_top = $( '#main-header' ).offset().top;
      var item_nav_top = tab.$item_nav.offset().top;

      bracket.moveTo(
        1,
        tab.$tag_tab.position().top + tab.$tag_tab.height() * ( 5 / 9 ) + parseInt( tab.$tag_tab.css( 'padding-top' ) ),
        item_nav_top - main_header_top,
        item_nav_top + tab.$item_nav.height() - main_header_top,
        animate
      );

    };
    tab.update = function() {

      var margin_top = tab.$tag_tab.offset().top + parseInt( tab.$tag_tab.css( 'padding-top' ) ) * 2 + tab.$tag_tab.height() - tab.$item_nav.height();
      tab.$item_nav.css( { marginTop: Math.max( margin_top, 0 ) } );
      for ( var j in tab.items )
        tab.items[ j ].update();

    };
    tab.goTo = function() {

      current_tag = i;
      tab.items[ tab.current_item ].goTo();
      tab.moveBracket( true );

      $tag_tabs.removeClass( 'current' );
      tab.$tag_tab.addClass( 'current' );
      
      fadeOut( $item_navs );
      fadeOut( $tag_items );

      fadeIn( tab.$item_nav );
      fadeIn( tab.$tag_item );

    };
    tab.nextItem = function() {
      tab.items[ ( tab.current_item + 1 ) % tab.num_items ].switchTo();
    };

    tab.$tag_tab.click( function() {
      tab.goTo();
      if ( typeof slideshow !== 'undefined' ) slideshow.stop();
    } );

    tab.$item_tabs.each( function( j, item_tab ) {

      tab.items[ j ] = {

        $item_tab: $( item_tab ),
        $item: tab.$items.eq( j )

      };

      var item = tab.items[ j ];
      tab.num_items++;
      item.moveBracket = function( animate ) {

        var item_top = item.$item.offset().top;

        bracket.moveTo(
          2,
          item.$item_tab.offset().top + item.$item_tab.height() * ( 5 / 9 ) + parseInt( item.$item_tab.css( 'padding-top' ) ),
          item_top,
          item_top + item.$item.height(),
          animate
        );

      };
      item.update = function() {
        var margin_top = item.$item_tab.offset().top + parseInt( item.$item_tab.css( 'padding-top' ) ) +
          item.$item_tab.height() - item.$item.height() + parseInt( item.$item.find( 'p' ).css( 'margin-bottom' ) );
        item.$item.css( { marginTop: Math.max( margin_top, 30 ) } );
      };
      item.goTo = function() {

        tab.current_item = j;
        item.moveBracket( true );

        tab.$item_tabs.removeClass( 'current' );
        item.$item_tab.addClass( 'current' );

        fadeOut( tab.$items );
        fadeIn( item.$item );

      };
      item.switchTo = function() {

        tab.current_item = j;

        tab.$item_tabs.removeClass( 'current' );
        item.$item_tab.addClass( 'current' );

        tab.$items.css( { opacity: 0 } );
        item.$item.css( { opacity: 1 } );

      };

      item.$item_tab.click( function() {
        if ( typeof slideshow !== 'undefined' ) slideshow.stop();
        item.goTo();
      } );

    } );

  } );

  var hash = window.location.hash;
  if ( hash ) {
    var parsed_hash = hash.split( '/' );
    current_tag = $tag_tabs.index( $tag_tabs.filter( '[href="' + parsed_hash[ 0 ] + '"]' ) );
    if ( parsed_hash.length > 1 ) {
      var tab = tabs[ current_tag ];
      var $item_tabs = tab.$item_tabs;
      tab.current_item = $item_tabs.index( $item_tabs.filter( '[href="' + hash + '"]' ) );
    }
  }

} );

function fadeOut( $obj ) {
  $obj.animate( { opacity: 0, zIndex: 0 }, fade_dur );
}
function fadeIn( $obj ) {
  $obj.animate( { opacity: 1, zIndex: 100 }, fade_dur );
}
