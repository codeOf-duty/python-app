


	$(document).ready(function() {

		//Modern Gallery
function modernGallery() {
	alert(hi);
	if($.fn.imagesLoaded) {
		var $container = $('#gallery-modern')


		$container.imagesLoaded( function() {
			$container.masonry({
				itemSelector    : '.images-box',
				columnWidth     : '.grid-sizer',
				percentPosition : true
			});
		});
	}
}




	//Gallery
	if ($.fn.fancybox){
		$('.gallery-images, .lightbox').fancybox({
			nextEffect  : 'fade',
			prevEffect  : 'fade',
			openEffect  : 'fade',
			closeEffect : 'fade',
			helpers     : {
				overlay : {
					locked : false
				}
			},
			tpl         : {
			closeBtn : '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;">Ã—</a>',
			next : '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;">\n\
						<span><svg x="0" y="0" width="9px" height="16px" viewBox="0 0 9 16" enable-background="new 0 0 9 16" xml:space="preserve"><polygon fill-rule="evenodd" clip-rule="evenodd" fill="#fcfcfc" points="1,0.001 0,1.001 7,8 0,14.999 1,15.999 9,8 "/></svg></span>\n\
					</a>',
			prev : '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;">\n\
						<span><svg x="0" y="0" width="9px" height="16px" viewBox="0 0 9 16" enable-background="new 0 0 9 16" xml:space="preserve"><polygon fill-rule="evenodd" clip-rule="evenodd" fill="#fcfcfc" points="8,15.999 9,14.999 2,8 9,1.001 8,0.001 0,8 "/></svg></span>\n\
					</a>'
			}
		});
	}

 
});
