<?php if ( post_password_required() ) : ?>
	<p class="no-comments"><?php _e( '<em>This post is password protected. Enter the password to view comments.</em>', 'chalk' ); ?></p>
	<?php return; ?>
<?php endif; ?>
<div id="comments-wrapper" class="clear<?php if ( is_page() ) { echo " comment-page"; } ?>">
	<div id="comments">
	<?php if ( have_comments() ) : ?>
		<hgroup class="comment-number clear">
			<h3>
				<?php printf( _n( 'One Response to &ldquo;%2$s&rdquo;', '%1$s Responses to &ldquo;%2$s&rdquo;', get_comments_number(), 'chalk' ), number_format_i18n( get_comments_number() ), get_the_title() ); ?>
			</h3>
			<?php if ( comments_open() ) : ?>
				<a id="leavecomment" href="#commentform" title="<?php esc_attr_e( 'Post a comment', 'chalk' ); ?>"> <?php _e( 'Post a comment', 'chalk' ); ?></a>
			<?php endif; ?>
		</hgroup>

		<ol class="commentlist">
			<?php wp_list_comments( 'type=comment&avatar_size=48' ); ?>
		</ol>

		<nav class="pagination-single clear">
			<p>
				<span class="next-comment-link">
					<?php next_comments_link( __( 'Older Comments', 'chalk' ) ); ?>
				</span>
				<span class="prev-comment-link">
					<?php previous_comments_link( __( 'Newer Comments', 'chalk' ) ); ?>
				</span>
			</p>
		</nav>

		<?php $comments_by_type = &separate_comments($comments); ?>
		<?php if ( ! empty( $comments_by_type['pings'] ) ) : ?>
			<h3 class="pinghead"><?php _e( 'Trackbacks &amp; Pingbacks', 'chalk' ); ?></h3>
			<ol class="pinglist">
				<?php wp_list_comments( 'type=pings&callback=chalk_list_pings' ); ?>
			</ol>

			<nav class="pagination-single clear">
				<p>
					<?php next_comments_link( __( '&laquo; Older Pingbacks', 'chalk' ) ); ?>
					<?php previous_comments_link( __( 'Newer Pingbacks &raquo;', 'chalk' ) ); ?>
				</p>
			</nav>

		<?php endif; ?>
		<?php if ( ! comments_open() ) : ?>
			<p class="note"><?php _e( '<em>Comments are closed.</em>', 'chalk' ); ?></p>
		<?php endif; ?>
	<?php elseif ( comments_open() ) : ?>
		<div class="comment-number">
			<span><?php _e( 'No comments yet&hellip;', 'chalk' ); ?></span>
		</div>
	<?php endif; ?>
	</div>
</div>

<?php

$req = get_option( 'require_name_email' );
$field = '<p><label for="%1$s" class="comment-field">%2$s</label><input class="text-input" type="text" name="%1$s" id="%1$s" value="%3$s" size="22" tabindex="%4$d" /></p>';
comment_form( array(
	'comment_field' => '<fieldset><label for="comment" class="comment-field">' . _x( 'Comment:', 'noun', 'chalk' ) . '</label><textarea id="comment" name="comment" rows="10" aria-required="true" tabindex="4"></textarea></fieldset>',
	'comment_notes_before' => '',
	'comment_notes_after' => sprintf(
		'<p class="guidelines">%3$s</p>' . "\n" . '<p class="comments-rss"><a href="%1$s">%2$s</a></p>',
		esc_attr( get_post_comments_feed_link() ),
		__( 'Subscribe to this comment feed via <abbr title="Really Simple Syndication">RSS<abbr>', 'chalk' ),
		__( 'Basic <abbr title="Hypertext Markup Language">HTML</abbr> is allowed. Your email address will not be published.', 'chalk' )
	),
	'fields' => array(
		'author' => sprintf(
			$field,
			'author',
			(
				$req ?
				__( 'Name: <span class="required">*</span>', 'chalk' ) :
				__( 'Name:', 'chalk' )
			),
			esc_attr( $comment_author ),
			1
		),
		'email' => sprintf(
			$field,
			'email',
			(
				$req ?
				__( 'Email: <span class="required">*</span>', 'chalk' ) :
				__( 'Email:', 'chalk' )
			),
			esc_attr( $comment_author_email ),
			2
		),
		'url' => sprintf(
			$field,
			'url',
			__( 'Website:', 'chalk' ),
			esc_attr( $comment_author_url ),
			3
		),
	),
	'label_submit' => __( 'Submit Comment', 'chalk' ),
	'logged_in_as' => '<p class="com-logged-in">' . sprintf( __( 'Logged in as <a href="%1$s">%2$s</a>. <a href="%3$s" title="Log out of this account">Log out &raquo;</a>', 'chalk' ), admin_url( 'profile.php' ), $user_identity, wp_logout_url( apply_filters( 'the_permalink', get_permalink() ) ) ) . '</p>',
	'title_reply' => __( 'Leave a Reply', 'chalk' ),
	'title_reply_to' => __( 'Leave a comment to %s', 'chalk' ),
) );