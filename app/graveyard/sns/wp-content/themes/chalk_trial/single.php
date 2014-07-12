<?php get_header(); ?>
<div class="wrapper">
	<nav id="pagination">
		<?php if ( get_adjacent_post( false, '', true ) || get_adjacent_post( false, '', false ) ) : ?>
			<p><?php next_post_link( '%link' ); ?><?php previous_post_link( '%link' ) ?></p>
		<?php endif; ?>
	</nav>
	<?php get_template_part( '_loop' ); ?>
	<?php comments_template(); ?>
</div>
<?php get_sidebar(); ?>
<?php get_footer(); ?>