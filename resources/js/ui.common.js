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
			$plugins.uiAjax({ 
				id:$('.base-goldkey'), 
				url:'../../html/inc/goldkey.html',
				page:true,
				callback:$plugins.common.goldkey 
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
			$('.goldkey .key').off('click.goldkey').on('click.goldkey', function(){
				console.log(22);
				$plugins.uiModalOpen({ 
					id:'goldkeyModal', 
					type: 'normal',
					wrap: $('body'),
					moblieFull: false,
					ps: 'center',
					src: false,
					remove: false,
					modalWidth: false,
					modalHeight: false,
					innerScroll: false,
					mg: 10,
					callback:function() { console.log('open callback'); },
					closeCallback:function() { console.log('close callback'); },
					endfocus:false 
				});
			});
		},
		
		footer: function(){

		},

		goldkey: function(){

		}
		
	};

})(jQuery, window, document);
