<?php get_header(); ?>
<?php the_post(); ?>
<div class="wrapper">
	<h3><?php the_title(); ?></h3>
	<a href="<?php echo esc_url( wp_get_attachment_url( $post->ID ) ); ?>" title="<?php the_title_attribute(); ?>" rel="attachment">
		<?php
			if ( wp_attachment_is_image ( $post->ID ) ) {
				$img_src = wp_get_attachment_image_src( $post->ID, 'large' );
				$alt_text = get_post_meta( $post->ID, '_wp_attachment_image_alt', true );
		?>
			<figure>
				<img src="<?php echo esc_url( $img_src[0] ); ?>" alt="<?php esc_attr_e( $alt_text ); ?>">
			</figure>
		<?php
			} else {
				echo basename( $post->guid );
			}
		?>
	</a>
	<?php if ( has_excerpt() ) : ?>
		<figcaption>
			<?php the_excerpt(); ?>
		</figcaption>
	<?php endif; ?>
	<nav class="attach-nav clear">
		<p class="prev alignleft"><?php previous_image_link( 0, __( 'Previous image', 'chalk' ) ); ?></p>
		<p class="next alignright"><?php next_image_link( 0, __( 'Next image', 'chalk' ) ); ?></p>
	</nav>
	<a class="return" href="<?php echo esc_url( get_permalink( $post->post_parent ) ); ?>"><?php _e( 'Return to gallery', 'chalk' ); ?></a>
</div>
<?php get_sidebar(); ?>
<?php get_footer(); ?>