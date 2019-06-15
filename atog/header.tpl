<!DOCTYPE html>
<html>
<head>
    
	<title>{$flatpress.title|tag:wp_title:'&laquo;'}</title>
	<meta http-equiv="Content-Type" content="text/html; charset={$flatpress.charset}" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	
	{if $flatpress.params.entry}
	<meta name="Robots" content="index, follow">
	{else}
	<meta name="Robots" content="noindex, follow">
	{/if}
        
        <!--
        <link media="screen" href="{$flatpress.themeurl}/../../_shared/vendor/font-awesome/5.8.2/css/all.min.css" type="text/css" rel="stylesheet" />
        -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css" />
        
        <link media="screen" href="{$flatpress.themeurl}/../../_shared/res/common.css" type="text/css" rel="stylesheet" />
        <link media="screen" href="{$flatpress.themeurl}/../../_shared/res/globals.css" type="text/css" rel="stylesheet" />
        <link media="screen" href="{$flatpress.themeurl}/../../_shared/res/column.css" type="text/css" rel="stylesheet" />

        <script type="text/javascript" src="{$flatpress.themeurl}/../../_shared/js/functions.js"></script>
        
	{action hook=wp_head}
        
</head>
<body>
	<div id="body-container">
		<div id="head">
                        
                        <div style="float: right; text-align: right;" class="noprint">
                            <a href="{$smarty.const.BLOG_BASEURL}?x=feed:rss2"><i class="fa fa-rss"></i> RSS</a> | 
                            <a href="{$smarty.const.BLOG_BASEURL}?x=feed:atom"></i> Atom</a><br>
                            <form method="get" style="display: inline;" action="{$smarty.const.BLOG_BASEURL}/search.php">
                                <input type="hidden" name="stype" value="full">
                                <input type="text" name="q">
                                <button><i class="fas fa-search"></i></button>
                                  
                            </form>
                        </div>
                        
                        
			<h1>
                            <a href="{$smarty.const.BLOG_BASEURL}">{$flatpress.title}</a>
                            
                            {if $flatpress.params.entry}
                                {if $flatpress.params.entry}
                                    :: <i class="far fa-clipboard"></i>
                                {/if}
                            {else}
                                {if $flatpress.params.cat}
                                    :: <i class="fas fa-tag"></i> <span id="headerfilter">{$flatpress.params._category}</span>
                                {/if}
                                {if $flatpress.params.y}
                                    :: <i class="far fa-calendar-alt"></i> 
                                    {if $flatpress.params.m}
                                        <span id="headerfilter">{$flatpress.params.m}</span>
                                    {/if}
                                    20{$flatpress.params.y}
                                {/if}
                            {/if}
                        </h1>
                        
			<p class="subtitle">{$flatpress.subtitle}</p>
                        
                        {widgets pos=top}
                            <div id="menubar">
                                {$content}
                            </div>
                        {/widgets}
                        
		</div> <!-- end of #head -->
	
	<div id="outer-container">
		
		
		</div>
