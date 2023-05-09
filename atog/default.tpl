{include file='header.tpl'}
	
		{include file='widgets.tpl'}
                
		<div id="main" class="colmiddle">
				

			<div class="entry">
				<h3 class="title">{$subject}</h3>
				<div class="body">
				
				{if isset($rawcontent) and $rawcontent} {$content}
				{else}	{include file=$content}{/if}
				
				</div>
			</div>
			
                </div>

			
{include file='footer.tpl'}



