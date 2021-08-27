<?php
/**
 * @package Hello_Dolly
 * @version 1.7.2
 */
/*
Plugin Name: Defiant Interview - Post Score Plugin
Plugin URI: N/A
Description: Adds a reddit-like upvote/downvote counter to posts
Author: John Shroff
Version: 1.0.0
Author URI: https://www.linkedin.com/in/john-shroff/
*/

require __DIR__ . '/vendor/autoload.php';

use Defiant\Client;
use Defiant\Server;

register_activation_hook( __FILE__, array('Defiant\PostLike', 'install'));

Client::register();
Server::register();
