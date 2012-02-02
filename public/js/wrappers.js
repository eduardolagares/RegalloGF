
$('.page .header').wrapInner('<div class="wrapper"><div class="inner" /></div>');

if ($('.page .middle .wrapper').size()<=0) {
	$('.page .middle').wrapInner('<div class="wrapper" />');
	if (!$('.page .middle').hasClass('grid')) {
		$('.page .middle .wrapper').wrapInner('<div class="inner" />');
	}
}

$('.page .footer').wrapInner('<div class="wrapper"><div class="inner" /></div>');