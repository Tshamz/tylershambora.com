<?php if ( has_post_thumbnail() && ! ( is_archive() || is_search() ) && ! in_array( get_post_format(), array( 'video', 'gallery' ) ) ) : ?>
	<?php if ( ! is_single() ) : ?>
		<a href="<?php the_permalink(); ?>" rel="bookmark">
	<?php endif; ?>

	<figure class="post-feature">
		<?php the_post_thumbnail( 'chalk_featured' ); ?>
		<?php chalk_post_thumbnail_caption(); ?>
	</figure>

	<?php if ( ! is_single() ) : ?>
		</a>
	<?php endif; ?>
<?php endif; ?>