<a href="<?php the_permalink(); ?>" rel="bookmark">
	<div class="post-icon">
		<div class="icon-field"></div>
	</div>
</a>
<div class="post-meta">
	<span class="post-time"><?php the_time( get_option( 'date_format' ) ); ?></span>
	<?php $has_comments = ( get_comments_number() > 0 || comments_open() ); ?>
	<?php if ( $has_comments ) : ?>
		<span class="post-comment"><a href="<?php comments_link(); ?>"><?php comments_number( __( 'No comments', 'chalk' ), __( '1 Comment', 'chalk' ), __( '% Comments', 'chalk' ) ); ?></a></span>
	<?php endif; ?>
</div>