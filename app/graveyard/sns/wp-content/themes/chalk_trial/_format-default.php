<?php get_template_part( '_post-feature' ); ?>
<article <?php post_class( 'text' ); ?>>
	<?php get_template_part( '_post-header' ); ?>
	<section class="main-content">
		<?php get_template_part( '_post-content' ); ?>
		<?php if ( has_post_format( 'aside' ) && ! ( is_archive() || is_search() ) ) : ?>
			<a href="<?php the_permalink(); ?>" rel="bookmark">
				<div class="permalink"><?php _e( 'Permalink', 'chalk' ); ?></div>
			</a>
		<?php endif; ?>
		<?php get_template_part( '_post-footer' ); ?>
	</section>
</article>