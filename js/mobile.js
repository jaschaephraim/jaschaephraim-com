var $ = require( 'jquery' );

var scroll_dur = 1000;

module.exports = function ( tab_data ) {

  var htmlbody = $( 'html, body' );
  var $items = $( '.item' );
  var $item_tabs = $( '.item-nav a' );

  function scrollTo( $el ) {
    htmlbody.animate( {
      scrollTop: $el.offset().top
    }, scroll_dur );
  }

  $.each( tab_data.tabs, function ( i, tab ) {
    tab.transition = function () {
      tab_data.$item_navs.hide();
      $items.hide();
      $item_tabs.removeClass( 'current' );
      tab.$item_nav.show();
      scrollTo( tab.$item_nav );
    };

    $.each( tab.items, function ( j, item ) {
      item.transition = function () {
        $items.hide();
        item.$item.show();
        scrollTo( item.$item );
      };
    } );
  } );

  if ( tab_data.parsed_hash ) {
    var tab = tab_data.tabs[ tab_data.current_tag ];
    tab.goTo();
    if ( tab_data.parsed_hash.length > 1 )
      tab.items[ tab.current_item ].goTo();
  }
};
