$(document).ready(function() {
	$('#navbar').scrollspy()
	$('.nav a, h3 a').bind('click', function(e) {
		e.preventDefault();
		target = this.hash;
		console.log(target);
        $.scrollTo(target, 1000, {offset:-100});
	});
	
	
	$('.carousel').carousel({
		interval:5000
	});
	
	
	
});
