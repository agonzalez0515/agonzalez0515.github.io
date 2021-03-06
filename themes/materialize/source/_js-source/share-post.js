'use strict';

define(['jquery'], function ($) {

  $('body')
    .on('click', removeOverlay)
    .on('click', '.article-share-link', share)
    .on('click', '.article-share-box', stopPropagation)
    .on('click', '.article-share-box-input', selectContent)
    .on('click', '.article-share-box-link', openShareWindow);


  ///////////////////

  function removeOverlay() {
    $('.article-share-box.on').removeClass('on');
  }

  function share(e) {
    e.stopPropagation();

    var $this = $(this);
    var id = 'article-share-box-' + $this.attr('data-id');
    var box = $('#' + id);

    if (box.hasClass('on') ) {
      box.removeClass('on');
      return;
    }

    if ( ! box.length ) {
      box = _createShareBox(id, $this.attr('data-url') );
    }

    $('.article-share-box.on').hide();

    var offset = $this.offset();
    box.css({
      top: offset.top + 25,
      left: offset.left
    })
    .addClass('on');
  }

  function _createShareBox(id, url) {
    var encodedUrl = encodeURIComponent(url);

    var html = [
      '<div id="' + id + '" class="article-share-box">',
        '<input class="article-share-box-input" value="' + url + '">',
        '<div class="article-share-links">',
          '<a href="https://twitter.com/intent/tweet?url=' + encodedUrl + '" class="article-share-twitter" target="_blank" title="Twitter"></a>',
          '<a href="https://www.facebook.com/sharer.php?u=' + encodedUrl + '" class="article-share-facebook" target="_blank" title="Facebook"></a>',
          '<a href="http://pinterest.com/pin/create/button/?url=' + encodedUrl + '" class="article-share-pinterest" target="_blank" title="Pinterest"></a>',
          '<a href="https://plus.google.com/share?url=' + encodedUrl + '" class="article-share-google" target="_blank" title="Google+"></a>',
        '</div>',
      '</div>'
    ].join('');

    var box = $(html);

    $('body').append(box);
    return box;
  }


  function stopPropagation(e) {
    e.stopPropagation();
  }


  function selectContent() {
    $(this).select();
  }

  function openShareWindow(e) {
    e.preventDefault();
    e.stopPropagation();

    window.open(this.href, 'article-share-box-window-' + Date.now(), 'width=500,height=450');
  }
});
