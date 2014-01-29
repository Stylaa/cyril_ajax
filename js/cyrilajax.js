/**
 * Cyril Ajax for ZF2
 * by Stylaa
 *
 * I have created this to easily change contents a website using zf2
 */

function str_replace (search, replace, subject, count) {
  // http://kevin.vanzonneveld.net
  var i = 0,
    j = 0,
    temp = '',
    repl = '',
    sl = 0,
    fl = 0,
    f = [].concat(search),
    r = [].concat(replace),
    s = subject,
    ra = Object.prototype.toString.call(r) === '[object Array]',
    sa = Object.prototype.toString.call(s) === '[object Array]';
  s = [].concat(s);
  if (count) {
    this.window[count] = 0;
  }

  for (i = 0, sl = s.length; i < sl; i++) {
    if (s[i] === '') {
      continue;
    }
    for (j = 0, fl = f.length; j < fl; j++) {
      temp = s[i] + '';
      repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
      s[i] = (temp).split(f[j]).join(repl);
      if (count && s[i] !== temp) {
        this.window[count] += (temp.length - s[i].length) / f[j].length;
      }
    }
  }
  return sa ? s : s[0];
}

(function($){
 	$.fn.extend({ 
	
 		CyrilAjax: function(options) {
 			
			var defaults = {
			    url: '',
			    data: {},
			    
			    load_hide: {},
			    load_show: {},
			    
			    loop: false,
			    timeout: 1000,
			};
			
			var options = $.extend(defaults, options);
			
			// Load Show/Hide
			jQuery.each(options.load_hide, function(index, item) {
				jQuery(item).addClass( 'hide' );
			});
			jQuery.each(options.load_show, function(index, item) {
				jQuery(item).removeClass( 'hide' );
			});
			
			jQuery.post(
				options.url,
				options.data,
				function(json) {
					/* -- Process JSON Commands -- */
					
					if( json.ajax_command !== undefined )
					{
						// glob
						jQuery.each(json.ajax_command, function(index, item) {
							
							// html
							if( item.action == "html") {
								jQuery(item.selector).html(item.data);
							}
							// empty
							if( item.action == "empty") {
								jQuery(item.selector).empty();
							}
							
							// width
							if( item.action == "width") {
								jQuery(item.selector).width(item.data);
							}
							// height
							if( item.action == "height") {
								jQuery(item.selector).height(item.data);
							}
							
							// show
							if( item.action == "show") {
								jQuery(item).removeClass( 'hide' );
							}
							// hide
							if( item.action == "hide") {
								jQuery(item).addClass( 'hide' );
							}
							
							
							// addClass
							if( item.action == "addclass") {
								jQuery(item.selector).addClass( item.data );
							}
							// removeClass
							if( item.action == "removeclass") {
								jQuery(item.selector).removeClass( item.data );
							}
							
							
							// enable
							if( item.action == "enable") {
								jQuery(item.selector)
									.prop("disabled", false)
									.removeClass("disabled")
								;
							}
							// disable
							if( item.action == "disable") {
								jQuery(item.selector)
									.prop("disabled", true)
									.addClass("disabled")
								;
							}
							
							// clone
							if( item.action == "clone") {
								var temp = jQuery(item.selector).html();
								
								// glob
								jQuery.each(item.replace, function(subindex, subitem) {
									temp = str_replace (subitem.search, subitem.replace, temp);
								});
								
								jQuery(item.target).append(temp);
							}
							
						});
					}
					
					/* --- after everyhing is processed --- */
					
					// Load Show/Hide | Reverse to Reset
					jQuery.each(options.load_hide, function(index, item) {
						jQuery(item).removeClass( 'hide' );
					});
					jQuery.each(options.load_show, function(index, item) {
						jQuery(item).addClass( 'hide' );
					});
					
					// Loop
					if( options.loop == true ) {
						setTimeout( function(){ jQuery().CyrilAjax(options); }, options.timeout );
					}
					
				}
			, 'json');
			
			
    	}
	});
})(jQuery);
