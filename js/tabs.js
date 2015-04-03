var $ = require( 'jquery' );
var app = require( './app' );
var bracket = require( './bracket' );

var $window;
var $wrapper;

var heights = {};
var fade_dur = 200;

module.exports = function ( tab_data ) {

  var tabs = tab_data.tabs;
  // var num_tags = tab_data.num_tags;
  var $tag_tabs = tab_data.$tag_tabs;
  var $item_navs = tab_data.$item_navs;
  var $tag_items = tab_data.$tag_items;

  $window = $( window );
  $wrapper = $( '#wrapper' );
  $window.resize( module.exports.update );

  $.each( tabs, function ( i, tab ) {

    tab.moveBracket = function ( animate ) {

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
    tab.update = function () {

      var margin_top = tab.$tag_tab.offset().top + parseInt( tab.$tag_tab.css( 'padding-top' ) ) * 2 + tab.$tag_tab.height() - tab.$item_nav.height();
      tab.$item_nav.css( {
        marginTop: Math.max( margin_top, 0 )
      } );
      for ( var j in tab.items )
        tab.items[ j ].update();

    };
    tab.transition = function () {

      tab.items[ tab.current_item ].goTo();
      tab.moveBracket( true );

      fadeOut( $item_navs );
      fadeOut( $tag_items );

      fadeIn( tab.$item_nav );
      fadeIn( tab.$tag_item );

    };
    // tab.nextItem = function() {
    //   tab.items[ ( tab.current_item + 1 ) % tab.num_items ].switchTo();
    // };

    $.each( tab.items, function ( j, item ) {

      item.moveBracket = function ( animate ) {

        var item_top = item.$item.offset().top;

        bracket.moveTo(
          2,
          item.$item_tab.offset().top + item.$item_tab.height() * ( 5 / 9 ) + parseInt( item.$item_tab.css( 'padding-top' ) ),
          item_top,
          item_top + item.$item.height(),
          animate
        );

      };
      item.update = function () {
        var margin_top = item.$item_tab.offset().top + parseInt( item.$item_tab.css( 'padding-top' ) ) +
          item.$item_tab.height() - item.$item.height() + parseInt( item.$item.find( 'p' ).css( 'margin-bottom' ) );
        item.$item.css( {
          marginTop: Math.max( margin_top, 30 )
        } );
      };
      item.transition = function () {

        item.moveBracket( true );

        fadeOut( tab.$items );
        fadeIn( item.$item );

      };
      item.switchTo = function () {

        tab.current_item = j;

        tab.$item_tabs.removeClass( 'current' );
        item.$item_tab.addClass( 'current' );

        tab.$items.css( {
          opacity: 0
        } );
        item.$item.css( {
          opacity: 1
        } );

      };

    } );

  } );

  return {
    update: function () {

      for ( var i in tabs )
        tabs[ i ].update();

      var tag = tabs[ app.current_tag ];
      var $nav = tag.$item_nav;
      var item = tag.items[ tag.current_item ];
      var $item = item.$item;
      heights = {
        doc: $window.innerHeight(),
        nav: $nav.offset().top + $nav.height(),
        item: $item.offset().top + $item.height()
      };
      $wrapper.css( {
        height: Math.max( heights.doc, heights.nav, heights.item )
      } );

      tag.moveBracket();
      item.moveBracket();

    },
    headerLoaded: function () {
      tabs[ app.current_tag ].goTo();
      bracket.fadeIn( fade_dur );
    }
  };

};

// module.exports.next = function() {
//   var next = current_tag + 1;
//   if ( next == num_tags ) {
//     for ( var i in tabs )
//       tabs[ i ].nextItem();
//     next = 0;
//   }
//   tabs[ next ].goTo();
// };

function fadeOut( $obj ) {
  $obj.animate( {
    opacity: 0,
    zIndex: 0
  }, fade_dur );
}

function fadeIn( $obj ) {
  $obj.animate( {
    opacity: 1,
    zIndex: 100
  }, fade_dur );
}
