<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'wrd_4addnjeo31');

/** MySQL database username */
define('DB_USER', 'wrd2yQDZVfT');

/** MySQL database password */
define('DB_PASSWORD', '2uvgfDc5uE');

/** MySQL hostname */
define('DB_HOST', 'lolerskates.fatcowmysql.com');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'RhgXFd4BBKsTGyVqNcNcvTtqxPPQpjl0Cys91LloXrlwkcqwPS3nVn97nWpOdNc1');
define('SECURE_AUTH_KEY',  'tuUBRRWlXpxig9AFCj9pRHkQsrJjvgEn2iEMWkiHvUIeRA4BZiTown9jaWuMtun2');
define('LOGGED_IN_KEY',    'IqfFmUuaGniQGKl0wMz4g8HaEImCSxj4xpDyWR99jYGwyrw2Z4swv6Oz40QTrB0B');
define('NONCE_KEY',        'dyat5AHfywBTiiCOQyQull568pM0GZNi5cO0D8qsHICquJYTMdNtQkH1xUyrESsn');
define('AUTH_SALT',        'z5aj01KLtoYpBXHsV3GbaOaaJZfsobxCKps7n8zqPa7T9FB7ZdyyWtn4DhrZroWF');
define('SECURE_AUTH_SALT', 'vRImlYhXqukTIdV6JGX0fN0PTCy3hW7qZLgbcSEd3uzq77OuB2tn20wRhJgydAav');
define('LOGGED_IN_SALT',   'jmj56tKkoESyymIXZfCPtgc4kFJNHLjCOqTvLvDG9gNdU6NKfvUfSoWO2sjRMKz6');
define('NONCE_SALT',       'fyqA2vYHopzsFDdvKLKkHbHbysUfECC0QViYcH8hVBw7j4MK00Kx4wUtcfB5cHun');


/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
