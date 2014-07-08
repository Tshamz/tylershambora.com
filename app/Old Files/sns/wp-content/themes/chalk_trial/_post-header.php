<div class="post-header">
	<?php get_template_part( '_post-meta' ); ?>
	<?php if ( ! in_array( get_post_format(), array( 'link', 'quote', 'status' ) ) ) : ?>
		<h2 class="post-title clear">
			<?php if ( is_single() ) : ?>
				<?php the_title(); ?>
			<?php else : ?>
				<a href="<?php the_permalink(); ?>" rel="bookmark">
					<?php the_title(); ?>
				</a>
			<?php endif; ?>
		</h2>
		<?php if ( is_sticky() ) : ?>
			<?php if ( ( $sticky_text = 'Featured post' ) && is_sticky() && $paged <= 1 ) : ;?>
				<a href="<?php the_permalink(); ?>" rel="bookmark">
					<p class="featured"><?php echo $sticky_text; ?></p>
				</a>
			<?php endif; ?>
		<?php endif; ?>
		<p class="post-author"><?php the_author_posts_link(); ?></p>
	<?php endif; ?>
	<?php if ( is_single() && ! in_array( get_post_format(), array( 'link', 'audio', 'video', 'gallery' ) ) ) : ?>
		<p class="print-this clear"><a href="javascript:window.print()"><?php _e( 'Print this post ', 'chalk' ); ?></a></p>
	<?php endif; ?>
</div>