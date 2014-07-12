<?php

add_action( 'admin_init', 'chalk_redirect_on_setup' );

function chalk_redirect_on_setup() {
	global $pagenow;
	if ( is_admin() && isset( $_GET['activated'] ) && $pagenow == "themes.php" ) {
		wp_redirect( admin_url( 'themes.php?page=chalk' ) );
		exit;
	}
}

/* Theme setup
 * ------------------------------------------------------------------ */

add_action( 'after_setup_theme', 'chalk_setup' );

if ( ! function_exists( 'chalk_setup' ) ) :

	function chalk_setup() {
		load_theme_textdomain( 'chalk', get_template_directory() . '/languages' );

		chalk_options_init();

		// Theme support

		add_theme_support( 'automatic-feed-links' );
		add_theme_support( 'post-thumbnails' );
		add_image_size( 'chalk_featured', 760, 300, true );
		add_editor_style( 'includes/stylesheets/editor-style.css' );
		add_custom_background();

		// Register elements

		register_nav_menu( 'primary', __( 'Primary Menu', 'chalk' ) );
		register_sidebar( array(
			'name'=> __( 'Sidebar', 'chalk' ),
			'id' => 'primary_sidebar',
			'before_widget' => '<div id="%1$s" class="widget %2$s">',
			'after_widget' => '</div>',
			'before_title' => '<h3 class="widgettitle">',
			'after_title' => '</h3>'
		) );

		// Register filters

		add_filter( 'next_posts_link_attributes', 'chalk_link_rel_next' );
		add_filter( 'previous_posts_link_attributes', 'chalk_link_rel_prev' );
		add_filter( 'wp_title', 'chalk_page_title' );
		add_filter( 'the_content', 'chalk_filter_ptags_on_images' );
		add_filter( 'excerpt_more', 'chalk_excerpt_more' );
		add_filter( 'posts_where', 'chalk_remove_password_posts' );
		add_filter( 'comment_text', 'chalk_wrap_comment_text', 1000 );
		add_filter( 'body_class', 'chalk_body_class' );

		// Add actions, standard stuff

		add_action( 'wp_enqueue_scripts', 'chalk_enqueue_scripts' );
		add_action( 'admin_enqueue_scripts', 'chalk_enqueue_admin_scripts' );
		add_action( 'wp_head', 'chalk_print_header_items', 9 );
	}

endif; // chalk_setup

if ( ! function_exists( 'chalk_body_class' ) ) :
	/**
	 * Adds some custom classes to the body, based on the browser
	 */
	function chalk_body_class( $classes = '' ) {
		if ( stristr( $_SERVER['HTTP_USER_AGENT'], "msie 7" ) ) {
			$classes[] = 'IE7';
		} else if ( stristr( $_SERVER['HTTP_USER_AGENT'], "msie 8" ) ) {
			$classes[] = 'IE8';
		}

		return $classes;
	}

endif; // chalk_body_class

if ( ! function_exists( 'chalk_print_header_items' ) ) :

	function chalk_print_header_items() {
		$styles = '';

		// Reset the body background if the user has a color or image set
		if ( get_theme_mod( 'background_color' ) || get_theme_mod( 'background_image' ) ) {
			$styles .= 'body.body-class { background: none; }';
		}

		if ( ! empty( $styles ) ) {
			echo "<style type='text/css'>$styles</style>";
		}

		// Prints a settings change necessary for soundmanager and some variables for the menu slider
		chalk_misc_javascript();
		// Fallback JavaScript for old browsers
		chalk_mediaqueries_javascript();
	}

endif; // chalk_print_header_items

if ( ! function_exists( 'chalk_misc_javascript' ) ) :

	function chalk_misc_javascript() { ?>
		<script type="text/javascript">
			var show_text = '<?php echo esc_js( __( 'Show menu', 'chalk' ) ); ?>';
			var hide_text = '<?php echo esc_js( __( 'Hide menu', 'chalk' ) ); ?>';
		</script>
	<?php
	}

endif; // chalk_misc_javascript

if ( ! function_exists( 'chalk_mediaqueries_javascript' ) ) :

	function chalk_mediaqueries_javascript() { ?>
		<!--[if lte IE 8]>
			<script type="text/javascript" src="<?php echo get_template_directory_uri() . '/includes/javascripts/modernizr.js'; ?>"></script>
			<script type="text/javascript" src="<?php echo get_template_directory_uri() . '/includes/javascripts/respond.js'; ?>"></script>
		<![endif]-->
	<?php
	}

endif; // chalk_mediaqueries_javascript

if ( ! function_exists( 'chalk_link_rel_next' ) ) :
	/**
	 * Adds 'rel' attribute to link attributes
	 */
	function chalk_link_rel_next( $attr ) {
	    return implode( ' ', array( $attr, 'rel="next"' ) );
	}

endif; //chalk_link_rel_next

if ( ! function_exists( 'chalk_link_rel_prev' ) ) :
/**
 * Adds 'rel' attribute to link attributes
 */
	function chalk_link_rel_prev( $attr ) {
	    return implode( ' ', array( $attr, 'rel="prev"' ) );
	}

endif; //chalk_link_rel_prev

if ( ! function_exists( 'chalk_list_pings' ) ) :
	/**
	 * Template for pingbacks/trackbacks
	 */
	function chalk_list_pings( $comment, $args, $depth ) {
		$GLOBALS['comment'] = $comment;
		?>
		<li id="comment-<?php comment_ID(); ?>"><?php comment_author_link(); ?>
		<?php
	}

endif; // chalk_list_pings

if ( ! function_exists( 'chalk_filter_ptags_on_images' ) ) :
	/**
	 * Removes paragraphs from standard WordPress-inserted images
	 */
	function chalk_filter_ptags_on_images( $content ) {
		return preg_replace( '/<p>\s*(<a .*>)?\s*(<img .* \/>)\s*(<\/a>)?\s*<\/p>/iU', '\1\2\3', $content );
	}

endif; // chalk_filter_ptags_on_images

if ( ! function_exists( 'chalk_wrap_comment_text' ) ) :
	/**
	 * Wrap & apply class to comment text
	 */
	function chalk_wrap_comment_text( $content ) {
	    return "<div class=\"comment-text\">" . $content . "</div>";
	}

endif; //chalk_wrap_comment_text

if ( ! function_exists( 'chalk_post_thumbnail_caption' ) ) :
	/**
	 * Featured image caption
	 */
	function chalk_post_thumbnail_caption() {
		global $post;

		$thumbnail_id    = get_post_thumbnail_id( $post->ID );
		$thumbnail_image = get_posts( array( 'p' => $thumbnail_id, 'post_type' => 'attachment' ) );

		if ( $thumbnail_image && isset( $thumbnail_image[0] ) ) {
			echo '<figcaption>' . $thumbnail_image[0]->post_excerpt . '</figcaption>';
		}
	}

endif; // chalk_post_thumbnail_caption

if ( ! function_exists( 'chalk_page_title' ) ) :
	/**
	 * Filter for wp_title, <title> element
	 */
	function chalk_page_title( $title ) {
		if ( is_front_page() ) {
			return get_bloginfo( 'name' );
		} elseif ( is_404() ) {
			return __( 'Page not found | ', 'chalk' ) . get_bloginfo( 'name' );
		} elseif ( is_search() ) {
			return __( 'Search results | ', 'chalk' ) . get_bloginfo( 'name' );
		} else {
			return trim( $title ) . ' | ' . get_bloginfo( 'name' );
		}
	}

endif; //chalk_page_title

if ( ! function_exists( 'chalk_archive_title' ) ) :
	/**
	 * Convenience function for outputting the title on an archive page
	 */
	function chalk_archive_title() {
		if ( is_category() ) {
			printf( __( 'Posts from the &#8220;<em>%s</em>&#8221; Category', 'chalk' ), single_cat_title( '', false ) );
		} elseif ( is_tag() ) {
			printf( __( 'Posts tagged &#8220;<em>%s</em>&#8221;', 'chalk' ), single_tag_title( '', false ) );
		} elseif ( is_day() ) {
			printf( __( 'Archive for <em>%s</em>', 'chalk' ), get_the_time( 'F jS, Y' ) );
		} elseif ( is_month() ) {
			printf( __( 'Archive for <em>%s</em>', 'chalk' ), get_the_time( 'F, Y' ) );
		} elseif ( is_year() ) {
			printf( __( 'Archive for <em>%s</em>', 'chalk' ), get_the_time( 'Y' ) );
		} elseif ( is_author() ) {
			printf( __( 'Posts by <em>%s</em>', 'chalk' ), get_the_author() );
		} else {
			_e( 'Site archives', 'chalk' );
		}
	}

endif; // chalk_archive_title

if ( ! function_exists( 'chalk_remove_password_posts' ) ) :
	/**
	 * Remove password-protected posts from the normal loop
	 */
	function chalk_remove_password_posts( $where = '' ) {
		if ( ! is_admin() && ! is_single() ) {
			// exclude password protected
			$where .= " AND post_password = ''";
		}

		return $where;
	}

endif; // chalk_remove_password_posts

if ( ! function_exists( 'chalk_excerpt_more' ) ) :
	/**
	 * Custom excerpt more
	 */
	function chalk_excerpt_more() {
		return '&hellip;';
	}

endif; // chalk_excerpt_more

if ( ! function_exists( 'chalk_enqueue_scripts' ) ) :
	/**
	 * Enqueue any scripts to be served on the frontend
	 */
	function chalk_enqueue_scripts() {
		// Stylesheets first

		// Primary style.css file
		wp_enqueue_style(
			'chalk_style',
			get_bloginfo( 'stylesheet_url' ),
			array(),
			null
		);

		// JavaScripts next
		wp_enqueue_script( 'jquery' );

		// Primary theme JavaScript
		wp_enqueue_script(
			'chalk_javascript',
			get_template_directory_uri() . '/javascripts/theme.js',
			array( 'jquery' ),
			null
		);

		// Lastly, enqueue the comment reply script if required

		if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
			wp_enqueue_script( 'comment-reply' );
		}
	}

endif; // chalk_enqueue_admin_scripts

if ( ! function_exists( 'chalk_enqueue_admin_scripts' ) ) :
	/**
	 * Enqueue any admin scripts to be served on the backend
	 */
	function chalk_enqueue_admin_scripts() {
		wp_enqueue_script(
			'chalk_admin_javascript',
			get_template_directory_uri() . '/javascripts/admin.js',
			array( 'jquery' ),
			null
		);
	}

endif; // chalk_enqueue_scripts

/* -------------------------------------------------------------------------
  Theme options
---------------------------------------------------------------------------- */

if ( ! function_exists( 'chalk_options_init' ) ) :
	/**
	 * Create and initialize the theme options.
	 * Uses the Struts options framework.
	 * https://github.com/jestro/struts/
	 */
	function chalk_options_init() {
		require( dirname( __FILE__ ) . '/includes/struts/classes/struts.php' );

		Struts::load_config( array(
			'struts_root_uri' => get_template_directory_uri() . '/includes/struts', // required, set this to the URI of the root Struts directory
			'use_struts_skin' => true, // optional, overrides the Settings API html output
		) );

		global $chalk_options;

		$chalk_options = new Struts_Options( 'chalk', 'theme_chalk_options' );

		$chalk_options->initialize();
	}

endif; // chalk_options_init

if ( ! function_exists( 'chalk_option' ) ) :

	// Gets the value for a requested option.

	function chalk_option( $option_name ) {
		global $chalk_options;

		return $chalk_options->get_value( $option_name );
	}

endif; // chalk_option