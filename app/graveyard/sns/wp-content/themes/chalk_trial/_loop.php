<?php
	while ( have_posts() ) : the_post();
		$format = 'default';
		get_template_part( '_format', $format );
	endwhile;
?>