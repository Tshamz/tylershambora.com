<aside role="complementary">
	<header role="banner">
		<h2><a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php bloginfo( 'name' ); ?></a></h2>
		<?php if ( get_bloginfo( 'description' ) ) : ?>
			<h5 class="desc"><?php bloginfo( 'description' ); ?> </h5>
		<?php endif; ?>
		<a href="#" id="menu-expand"><?php _e( 'Show menu', 'chalk' ); ?></a>
		<nav role="navigation" class="menu-hide">
			<?php
				wp_nav_menu(
					array(
						'theme_location'  => 'primary',
						'container_class' => 'clear',
						'menu_class'      => 'nav',
						'depth'           => '2'
						)
					);
			?>
		</nav>
	</header>
</aside>
