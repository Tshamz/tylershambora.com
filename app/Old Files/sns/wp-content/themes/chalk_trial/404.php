<?php get_header(); ?>
<div class="wrapper">
	<h3><?php _e( '404: Page Not Found', 'chalk' ); ?></h3>
	<p><?php _e( 'We are terribly sorry, but the URL you typed no longer exists. It might have been moved or deleted. Try searching the site:', 'chalk' ); ?></p>
	<?php get_search_form(); ?>
</div>
<?php get_sidebar(); ?>
<?php get_footer(); ?>