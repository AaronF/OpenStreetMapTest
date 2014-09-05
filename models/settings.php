<?php
	$dbtype = "mysql"; 
	$db_host = "localhost";
	$db_user = "web_stats";
	$db_pass = "testpassword";
	$db_name = "web_stats";
	$db_port = "";
	$db_table_prefix = "Member_";

	$langauge = "en";
	
	date_default_timezone_set("Europe/London");
	
	$websiteName = "Tracking";
	$websiteUrl = "http://" . $_SERVER['HTTP_HOST'] ."/";

	$emailActivation = false;

	$resend_activation_threshold = 1;
	
	$emailAddress = "aaron@farelert.com";
	
	$emailDate = date("l");
	
	$mail_templates_dir = "models/mail-templates/";
	
	$default_hooks = array("#WEBSITENAME#","#WEBSITEURL#","#DATE#");
	$default_replace = array($websiteName,$websiteUrl,$emailDate);
	
	$debug_mode = false;

	$remember_me_length = "2wk";
	
	
	
?>