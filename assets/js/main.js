/*
	Ethereal by HTML5 UP — vertical layout version
*/
function openLink(link) {
	window.open(link, "_blank");
}

(function($) {

	var $window = $(window),
		$body = $('body'),
		$bodyHtml = $('body,html'),
		$wrapper = $('#wrapper');

	// Breakpoints.
	breakpoints({
		xlarge:  ['1281px', '1680px'],
		large:   ['981px',  '1280px'],
		medium:  ['737px',  '980px'],
		small:   ['481px',  '736px'],
		xsmall:  ['361px',  '480px'],
		xxsmall: [null,     '360px']
	});

	// Remove preload class after page loads.
	$window.on('load', function() {
		window.setTimeout(function() {
			$body.removeClass('is-preload');
		}, 90);
	});

	// Polyfill: Object fit.
	if (!browser.canUse('object-fit')) {
		$('.image[data-position]').each(function() {
			var $this = $(this),
				$img = $this.children('img');

			$this
				.css('background-image', 'url("' + $img.attr('src') + '")')
				.css('background-position', $this.data('position'))
				.css('background-size', 'cover')
				.css('background-repeat', 'no-repeat');

			$img.css('opacity', '0');
		});
	}

	// Link scroll (vertical).
	$wrapper
		.on('click', 'a[href^="#"]', function(event) {
			var $this = $(this),
				href = $this.attr('href'),
				$target;

			if (href == '#' || ($target = $(href)).length == 0)
				return;

			event.preventDefault();

			var top = $target.offset().top - (Math.max(0, $window.height() - $target.outerHeight()) / 2);

			$bodyHtml.stop().animate({ scrollTop: top }, 1000, 'swing');
		});

	// Gallery.
	$('.gallery')
		.on('click', 'a', function(event) {
			var $a = $(this),
				$gallery = $a.parents('.gallery'),
				$modal = $gallery.children('.modal'),
				$modalImg = $modal.find('img'),
				href = $a.attr('href');

			if (!href.match(/\.(jpg|gif|png|mp4)$/))
				return;

			event.preventDefault();
			event.stopPropagation();

			if ($modal[0]._locked)
				return;

			$modal[0]._locked = true;
			$modalImg.attr('src', href);
			$modal.addClass('visible');
			$modal.focus();

			setTimeout(function() {
				$modal[0]._locked = false;
			}, 600);
		})
		.on('click', '.modal', function(event) {
			var $modal = $(this),
				$modalImg = $modal.find('img');

			if ($modal[0]._locked || !$modal.hasClass('visible'))
				return;

			event.stopPropagation();
			$modal[0]._locked = true;

			$modal.removeClass('loaded');

			setTimeout(function() {
				$modal.removeClass('visible');

				setTimeout(function() {
					$modalImg.attr('src', '');
					$modal[0]._locked = false;
					$body.focus();
				}, 475);
			}, 125);
		})
		.on('keypress', '.modal', function(event) {
			if (event.keyCode == 27)
				$(this).trigger('click');
		})
		.on('mouseup mousedown mousemove', '.modal', function(event) {
			event.stopPropagation();
		})
		.prepend('<div class="modal" tabIndex="-1"><div class="inner"><img src="" /></div></div>')
			.find('img')
				.on('load', function(event) {
					var $modalImg = $(this),
						$modal = $modalImg.parents('.modal');

					setTimeout(function() {
						if (!$modal.hasClass('visible'))
							return;
						$modal.addClass('loaded');
					}, 275);
				});

})(jQuery);
