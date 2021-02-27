;(function($, win, doc, undefined) {

	'use strict';
	
	$plugins.common = {
		init: function(){
			$plugins.uiAjax({ 
				id: $('.base-header'), 
				url:'/html/inc/header.html', 
				page:true, 
				callback:$plugins.common.header 
			});
			$plugins.uiAjax({ 
				id:$('.base-footer'), 
				url:'/html/inc/footer.html', 
				page:true,
				callback:$plugins.common.footer 
			});
			
			$plugins.common.labelInner();

			//scrolltop 
			$(win).off('scroll.win').on('scroll.win', function(){
				$plugins.common.sTop = $(this).scrollTop();
				$plugins.common.headerChange($plugins.common.sTop);
			});

			var timer;
			$(win).on('resize', function(){
				clearTimeout(timer);
				timer = setTimeout(function(){
					$plugins.common.header ();
				},100);
				
			});

		},
		labelInner: function(){
			var $label = $(doc).find('label');
			var $inp = $(doc).find('.inp-base');

			if ($plugins.breakpoint) {
				$plugins.uiSelect();
				$label.off('click.lb');
				$inp.off('blur.lb');
				$inp.off('focus.lb');
			} else {
				labelUp();
			}

			labelUp('label-placeholder');

			function labelUp(v){
				var $label = $(doc).find('label');
				var $inp = $(doc).find('.inp-base');

				if (!!v) {
					$label = $(doc).find('.'+ v +' label');
					$inp = $(doc).find('.'+ v +' .inp-base');
				}

				$inp.each(function(){
					var $this = $(this);

					if ($this.val() !== ''){ 
						$('[for="' + $this.attr('id') + '"]').addClass('blind')
					}
				});
				$label.off('click.lb').on('click.lb', function(){
					var $this = $(this);

					
					console.log($this.attr('for'))
					$('#' + $this.attr('for')).focus();
					$this.addClass('blind');
					
				});
				$inp.off('blur.lb').on('blur.lb', function(){
					var $this = $(this);

					if ($this.val() === ''){ 
						$('[for="' + $this.attr('id') + '"]').removeClass('blind')
					}
				});
				$inp.off('focus.lb').on('focus.lb', function(){
					var $this = $(this);

					if ($this.val() === ''){ 
						$('[for="' + $this.attr('id') + '"]').addClass('blind')
					}
				});
			}
		},
		header: function(){			
			var $dep1 = $('.dep1');
			var $dep1Btn = $dep1.find('.dep1-btn');
			var $dep2Btn = $('.dep1 a');
			var timer;

			function timerOpen(){
				clearTimeout(timer);
				$plugins.common.lnbAct(true);
			}
			function timerClose(){
				timer = setTimeout(function(){
					$plugins.common.lnbAct(false);
				},200);
			}

			if (!$plugins.breakpoint) {
				$dep1.off('mouseover.lnb');
				$dep1.off('mouseout.lnb');
				$dep2Btn.off('focus.lnb');
				$dep1Btn.off('focus.lnb');
				$dep1Btn.off('blur.lnb');
				$dep2Btn.off('blur.lnb');

				$('.ui-menu').off('click.mlnb').on('click.mlnb', function(){
					$plugins.common.mLnbAct(true);
				});
				$('.lnb .ui-close').off('click.mlnb').on('click.mlnb', function(){
					$plugins.common.mLnbAct(false);
				});
				$dep1Btn.off('click.mlnb').on('click.mlnb', function(e){
					e.preventDefault();
					$('.dep1-item').removeClass('selected');
					$(this).closest('.dep1-item').addClass('selected');
				});
			} else {
				$('.lnb').css('display','block');
				$dep1.off('mouseover.lnb').on('mouseover.lnb', timerOpen);
				$dep1.off('mouseout.lnb').on('mouseout.lnb', timerClose);
				$dep2Btn.off('focus.lnb').on('focus.lnb', timerOpen);
				$dep1Btn.off('focus.lnb').on('focus.lnb', timerOpen);
				$dep1Btn.off('blur.lnb').on('blur.lnb', timerClose);
				$dep2Btn.off('blur.lnb').on('blur.lnb', timerClose);
				
			}

			
			
		},
		mLnbAct: function(v){
			var open = v;
			
			if(open) {
				$('.lnb').css('display','block');
				$('.lnb .btn-base-m').focus();
				setTimeout(function(){
					$('body').addClass('menu-on');
				},0);
			} else {
				$('body').removeClass('menu-on');
				$('.ui-menu').focus();
				setTimeout(function(){
					$('.lnb').css('display','none');
				},300);
			}	
			
		},
		headerChange: function(v){
			var $body = $('body');

			(v > 5 ) ?  $body.addClass('on') : $body.removeClass('on') ;
		},
		lnbAct: function(v){
			var open = v;
			var $baseWrap = $('.base-wrap');

			(open) ?
				$baseWrap.removeClass('lnb-close').addClass('lnb-open'):
				$baseWrap.removeClass('lnb-open').addClass('lnb-close');

		},
		footer: function(){

		},
		programSlide: function(v){
			var data = v;
			var len = data.length
			var item = '';
			var $for = $('.slider-for');
			var $nav = $('.slider-nav');
			
			for (var i = 0; i < len; i++) {
				item += '<div class="ui-carousel-item">';
				item += '<div class="img-cover" style="background-image:url('+ data[i].src + ');">';
				item += '<span class="blind">'+ data[i].alt +'</span>';
				item += '</div>';
				item += '</div>';
			}

			$for.append(item);
			$nav.append(item);

			$for.slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				fade: false,
				adaptiveHeight: true,
				infinite: true,
				useTransform: true,
				speed: 400,
				cssEase: 'cubic-bezier(0.77, 0, 0.18, 1)',
			});

			$nav.off('init.slick').on('init.slick', function(event, slick) {
				$nav.find('.slick-slide.slick-current').addClass('is-active');
			}).slick({
				slidesToShow: 6,
				slidesToScroll: 1,
				dots: false,
				asNavFor: '.slider-for',
				focusOnSelect: true,
				infinite: false,
				responsive: [{
					breakpoint: 1024,
					settings: {
						slidesToShow: 5
					}	
				}, {
					breakpoint: 640,
					settings: {
						slidesToShow: 4
					}
				}]
			});

			$for.off('afterChange.slick').on('afterChange.slick', function(event, slick, currentSlide) {
				$nav.slick('slickGoTo', currentSlide);
				var currrentNavSlideElem = '.slider-nav .slick-slide[data-slick-index="' + currentSlide + '"]';

				$nav.find('.slick-slide.is-active').removeClass('is-active');
				$(currrentNavSlideElem).addClass('is-active');
			});

			$nav.off('click.slick').on('click.slick', '.slick-slide', function(event) {
				event.preventDefault();
				var goToSingleSlide = $(this).data('slick-index');

				$for.slick('slickGoTo', goToSingleSlide);
			});
		},
		pickMySchedule : function(){
			var isLogin = false; // 로그인 상태일 시 true, 비로그인 상태일 시 false

			if (!!confirm('해당 공연을 나만의시간표에 추가하시겠습니까?')){
				if (!isLogin) {
					alert('먼저 로그인을 해주세요.');

					$plugins.uiModalOpen({
						id:'modalMyscheduleNonLogin', // 비로그인 상태일 시 modal
						src:'/html/modal/modal_my.html',
					});
				} else {
					alert('나만의 스케쥴 담기');
				}
			} 
		}
	};

})(jQuery, window, document);
