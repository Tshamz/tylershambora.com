<?php get_header(); ?>
<div class="wrapper">
	<h3><?php printf( __( "Search results for <em>&#8220;%s&#8221;</em>", "chalk" ), get_search_query() ); ?></h3>
	<?php if ( have_posts() ) : ?>
		<?php get_template_part( '_loop' ); ?>
	<?php else : ?>
		<div>
			<p><?php printf( __( 'Sorry, your search for <em>&#8220;%s&#8221;</em> did not turn up any results. Please try again.', 'chalk' ), get_search_query() );?></p>
			<?php get_search_form(); ?>
		</div>
	<?php endif; ?>
	<?php get_template_part( '_index-footer' ); ?>
</div>
<?php get_sidebar(); ?>
<?php get_footer(); ?>