<!DOCTYPE html>
<html <?php language_attributes( 'html' ) ?>>
<head>

	<title><?php wp_title( $sep = '' ); ?></title>

	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />

	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />

	<?php wp_head(); ?>
</head>
<body <?php body_class( 'body-class' ); ?>>
<div id="container">
	<?php get_template_part( '_site-menu' ); ?>