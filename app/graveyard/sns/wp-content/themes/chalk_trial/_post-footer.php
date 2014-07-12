<footer class="clear">
	<?php edit_post_link( __( 'Edit post', 'chalk' ), '<p>', '</p>' ); ?>
	<?php if  ( is_single() ) : ?>
		<?php wp_link_pages( 'before=<div class="page-links">Page:&after=</div>' ); ?>
	<?php endif; ?>
	<?php if  ( has_category() ) : ?>
		<div class="cat-links">
			<?php _e( 'Categories: ', 'chalk' ); ?>
			<?php the_category( ', ' ); ?>
		</div>
	<?php endif; ?>
	<?php if  ( has_tag() ) : ?>
		<div class="tag-links">
			<?php the_tags( 'Tagged: ' ); ?>
		</div>
	<?php endif; ?>
</footer>