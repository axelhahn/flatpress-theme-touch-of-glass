{include file=header.tpl}

		{include file=widgets.tpl}
                
		<div id="main" class="colmiddle">
                    {entry_block}
                        {entry}

                            {include file=entry-default.tpl}

                        {/entry}


                    {/entry_block}

                    {include file="shared:comment-form.tpl"}
                    
                    <div class="navigation">
                            {nextpage}{prevpage}
                    </div>
	
		</div>
	<hr />
	
{include file=footer.tpl}
