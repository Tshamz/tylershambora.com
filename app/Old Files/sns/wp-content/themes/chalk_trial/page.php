<?php get_header(); ?>
<?php the_post(); ?>
<div id="page-<?php the_ID(); ?>" class="wrapper">
	<?php get_template_part( '_page-header' ); ?>
	<section class="main-content">
		<?php the_content(); ?>
		<div class="clear">
			<?php edit_post_link( __( 'Edit page', 'chalk' ), '<p>', '</p>' ); ?>
		</div>
	</section>
	<?php comments_template( '', true ); ?>
</div>
<?php get_sidebar(); ?>
<?php get_footer(); ?>