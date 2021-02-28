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
			var stopAni = false;
			$(win).off('scroll.win').on('scroll.win', function(){
				$plugins.common.sTop = $(this).scrollTop();
						
				if (!stopAni) {
					goldkeyAct();
				}
			});

			function goldkeyAct(){
				var $key = $('.goldkey');		

				$key.addClass('active');
				stopAni = true;
				setTimeout(function(){
					$key.removeClass('active');
					stopAni = false;
					console.log(stopAni);
				},900);
			}

		},
		
		header: function(){			
			
		},
		
		footer: function(){

		}
		
	};

})(jQuery, window, document);
