{include file='header.tpl'}

		{include file='widgets.tpl'}
                
		<div id="main" class="colmiddle">
		
		{static_block}
		{static}
			<div id="{$id}" class="entry page-{$id}">
				<h3>{$subject}</h3>
				<p class="date">Published by {$author} on {$date|date_format_daily}</p>
				
				{$content|tag:the_content}
			</div>
		{/static}

		{/static_block}
		
				
		</div>
                <div style="clear: both;"></div>
		
	
{include file='footer.tpl'}
