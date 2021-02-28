;(function($, win, doc, undefined) {

	'use strict';
	
	$plugins.common = {
		init: function(){
			$plugins.uiAjax({ 
				id: $('.base-header'), 
				url:'../../html/inc/header.html',
				page:true, 
				callback:$plugins.common.header 
			});
			$plugins.uiAjax({ 
				id:$('.base-footer'), 
				url:'../../html/inc/footer.html',
				page:true,
				callback:$plugins.common.footer 
			});
			
			//scrolltop 
			var timer;
			$(win).off('scroll.win').on('scroll.win', function(){
				$plugins.common.sTop = $(this).scrollTop();
				var $key = $('.goldkey');

				$key.removeClass('active');
				clearTimeout(timer);
				timer = setTimeout(function(){
					$key.addClass('active');
				},100);

				
				
		
				
			});

			

		},
		
		header: function(){			
			
		},
		
		footer: function(){

		}
		
	};

})(jQuery, window, document);
