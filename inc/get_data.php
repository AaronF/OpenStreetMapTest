<?php
include_once("../models/config.php");
$store_name = $_GET["store_name"];
if($store_name){
	$Data = new Data;
	$get = $Data->getData("Store_Locations", "*", array("Name"=>"Nationwide", "Name"=>"Iceland"), null, "OR");
	if($get){
		$get = json_encode($get);
		echo $get;
	}
} else {

}

?>