<div class="card">
	<?php if ( ( is_archive() || is_search() ) && has_excerpt() ) {
		the_excerpt();
	} else {
		the_content( 'Read more' );
	} ?>
</div>