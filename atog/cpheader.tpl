<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>{$flatpress.title}{$pagetitle}</title>
	<meta http-equiv="Content-Type" content="text/html; charset={$flatpress.charset}" />

        <!--
        <link media="screen" href="{$flatpress.themeurl}/../../_shared/vendor/font-awesome/5.8.2/css/all.min.css" type="text/css" rel="stylesheet" />
        -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css" />

        <link media="screen" href="{$flatpress.themeurl}/../../_shared/res/common.css" type="text/css" rel="stylesheet" />
        <link media="screen" href="{$flatpress.themeurl}/../../_shared/res/globals.css" type="text/css" rel="stylesheet" />

        <script type="text/javascript" src="{$flatpress.themeurl}/../../_shared/js/functions.js"></script>
	{action hook=wp_head}
	{action hook=admin_head}
</head>

<body class="{"admin-$panel-$action"|tag:admin_body_class}">
	<div id="body-container">
	<div id="outer-container">
	
