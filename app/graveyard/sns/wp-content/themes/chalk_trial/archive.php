<?php get_header(); ?>
<div class="wrapper">
	<?php if ( have_posts() ) : the_post(); ?>
		<h3><?php chalk_archive_title(); ?></h3>
		<?php rewind_posts(); ?>
		<?php get_template_part( '_loop' ); ?>
	<?php else : ?>
		<p><?php _e( 'No posts found.', 'chalk' ); ?></p>
	<?php endif; ?>
	<?php get_template_part( '_index-footer' ); ?>
</div>
<?php get_sidebar(); ?>
<?php get_footer(); ?>