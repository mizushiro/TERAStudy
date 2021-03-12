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

			if ($('.base-payment').length) {
				$plugins.uiAjax({ 
					id:$('.base-payment'), 
					url:'../../html/inc/payment.html',
					page:true,
					callback:function(){
						$plugins.uiModalOpen({ 
							id:'paymentModal', 
							type: 'normal',
							wrap: $('body'),
							ps: 'center',
							mg: 10,
							callback:function() { console.log('open callback'); },
							closeCallback:function() { console.log('close callback'); },
							endfocus:false 
						});
					}
				});
			}

			if ($('.ajax-mypage-top').length) {
				$plugins.uiAjax({ 
					id:$('.ajax-mypage-top'), 
					url:'../../html/inc/mypageTop.html',
					page:true,
					callback:function(){
						
						var n = $('.ajax-mypage-top').data('n');

						$('.tab-link option').eq(n - 1).prop('selected', true);	
						$('.tab-link a').eq(n - 1).addClass('selected');

						$('.tab-link select').on('change', function(){
							location.href = $(this).val();
						})
						
					}
				});
			}
			if ($('.ajax-mypage-top-l').length) {
				$plugins.uiAjax({
					id:$('.ajax-mypage-top-l'),
					url:'../../html/inc/mypageTopL.html',
					page:true,
					callback:function(){
						var n = $('.ajax-mypage-top-l').data('n');

						$('.tab-link option').eq(n - 1).prop('selected', true);
						$('.tab-link a').eq(n - 1).addClass('selected');

						$('.tab-link select').on('change', function(){
							location.href = $(this).val();
						})

					}
				});
			}
			if ($('.ajax-customer-top').length) {
				$plugins.uiAjax({
					id:$('.ajax-customer-top'),
					url:'../../html/inc/customerTop.html',
					page:true,
					callback:function(){
						var n = $('.ajax-customer-top').data('n');

						$('.tab-link option').eq(n - 1).prop('selected', true);
						$('.tab-link a').eq(n - 1).addClass('selected');

						$('.tab-link select').on('change', function(){
							location.href = $(this).val();
						})

					}
				});
			}
			if ($('.ajax-service-top').length) {
				$plugins.uiAjax({
					id:$('.ajax-service-top'),
					url:'../../html/inc/serviceTop.html',
					page:true,
					callback:function(){
						$plugins.uiAjax({ 
							id: $('.base-consulting'), 
							url:'../../html/inc/consulting.html',
							page:true,
						});


						var n = $('.ajax-service-top').data('n');

						$('.tab-link option').eq(n - 1).prop('selected', true);
						$('.tab-link a').eq(n - 1).addClass('selected');

						$('.tab-link select').on('change', function(){
							var n = $(this).val();
							if (n === 'consultingGo') {
								$plugins.common.consutingPop();
							} else {
								location.href = n;
							}	
							
						});

						$('.tab-link a').on('click', function(e){
							var _href = $(this).attr('href');
							console.log(_href);
							if (_href === 'consultingGo') {
								e.preventDefault();
								
								$plugins.common.consutingPop();

							}
							
						});

						function consultingPop(){
							
						}

					}
				});
			}
			

			$plugins.uiAjax({ 
				id:$('.ajax-banner'), 
				url:'../../html/inc/banner.html',
				page:true,
				callback:function(){
					$('.banner-swiper').slick({
						infinite: true,
						slidesToShow: 1,
						slidesToScroll: 1
					});
				}
			});
			$plugins.uiAjax({
				id:$('.terms-a'),
				url:'../../html/inc/terms-a.html',
				page:true
			});
			$plugins.uiAjax({
				id:$('.terms-b'),
				url:'../../html/inc/terms-b.html',
				page:true
			});
			$plugins.uiAjax({
				id:$('.terms-c'),
				url:'../../html/inc/terms-c.html',
				page:true
			});
			
			//scrolltop 
			var stopAni = false;
			$(win).off('scroll.win').on('scroll.win', function(){
				$plugins.common.sTop = $(this).scrollTop();
				headerSticky();
				leaderGo();

				if (!stopAni) {
					goldkeyAct();
				}
			});
			function headerSticky() {
				if ($plugins.common.sTop > 0) {
					$('body').addClass('sticky');
				} else {
					$('body').removeClass('sticky');
				}
			}
		
			function leaderGo() {
				var $btn = $('.leader-info .btn-area');

				if (!$btn.length) {
					return false;
				}

				var add = $('.base-header').outerHeight();
				var btnTop = $btn.offset().top;

				if ($plugins.common.sTop > btnTop - add) {
					$('body').addClass('leader-btn-fix');
					$btn.find('.btn-gold').css('top', add + 'px');
				} else {
					$('body').removeClass('leader-btn-fix');
					$btn.find('.btn-gold').css('top', 0);
				}
			}
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

			var loopTimer;
			function loopGoldKey(){
				clearTimeout(loopTimer);
				loopTimer = setTimeout(function(){
					goldkeyAct();
					loopGoldKey();
				},3000);
			}
			loopGoldKey();
			

			
		},
		consutingPop: function(){
			$plugins.uiModalOpen({ 
				id:'consultingModal', 
				type: 'normal',
				wrap: $('body'),
				ps: 'center',
				mg: 10,
				callback:function() { console.log('open callback'); },
				closeCallback:function() { console.log('close callback'); },
				endfocus:false 
			});
		},
		header: function(){			
			$('.goldkey .key').off('click.goldkey').on('click.goldkey', function(){
				$plugins.uiModalOpen({ 
					id:'goldkeyModal', 
					type: 'normal',
					wrap: $('body'),
					ps: 'center',
					mg: 10,
					callback:function() { console.log('open callback'); },
					closeCallback:function() { console.log('close callback'); },
					endfocus:false 
				});
			});
		},
		
		footer: function(){
			$('.btn-top').on('touchstart, click', function(){
				$('html').animate({scrollTop : 0},300);
			});
		},

		setThumbnail: function(){
			var $wrap = $('.file-upload');
			var $browseBtn = $wrap.find('.btn-file');
			var $realInput = $wrap.find('.inp-imgfile');
			var $img = $wrap.find('.file-img');

			$browseBtn.off('click.fu').on('click.fu', function(){
				$wrap = $(this).closest('.file-upload');
				$realInput = $wrap.find('.inp-imgfile');
				$img = $wrap.find('.file-img');

				$realInput.click();
			});

			$realInput.off('change.fu').on('change.fu', function(event){
				readInputFile(event);
			});

			function readInputFile(event){
				var reader = new FileReader(); 
				reader.onload = function(event) { 
					var img = document.createElement("img"); 
					img.setAttribute("src", event.target.result); 
					$img.find('img').remove();
					$wrap.find('.del').remove();
					$img.append(img);
					$img.append('<button type="button" class="del"><span class="blind">삭제</span></button>');
					
					$('.file-img .del').on('click', function(){
						$(this).closest('.file-upload').find('img').remove();
						$(this).closest('.file-upload').find('input').val('');
						$(this).remove();
					});
				}; 
				reader.readAsDataURL(event.target.files[0]);

				
			}
			
		},
		goldkey: function(){

		}
		
	};

})(jQuery, window, document);
