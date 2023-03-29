	<div itemscope itemtype="http://schema.org/BlogPosting" id="{$id}" class="entry {$date|date_format:"y-%Y m-%m d-%d"}">
				{* 	using the following way to print the date, if more 	*} 
				{*	than one entry have been written the same day,		*} 
				{*	 the date will be printed only once 				*}
				
                                <!--
                                {$date|date_format_daily:"<h2 class=\"date\"><i class=\"far fa-calendar-alt\"></i> `$fp_config.locale.dateformat`</h2>"}
                                -->
		
				<h3 itemprop="name">
				<a href="{$id|link:post_link}">
				{$subject|tag:the_title}
				</a>
				</h3>
				{include file='shared:entryadminctrls.tpl'}
                                <div class="date">
                                {$date|date_format_daily:"<i class=\"far fa-calendar-alt\"></i> `$fp_config.locale.dateformat`"}
                                </div>
				
				<span itemprop="articleBody">
				{$content|tag:the_content}
				</span>
				
				<ul class="entry-footer">
			
				<li class="entry-info">
                                    <!--
                                    Posted by <i class="fas fa-user"></i> <span itemprop="author">{$author}</span> at
                                    {$date|date_format}
                                    -->
                                
                                    <span itemprop="articleSection">
                                    {if ($categories)}
                                        <i class="fas fa-tags"></i> {$categories|@filed}
                                        
                                    {/if}
                                    </span>
				</li> 
				
				{if !(in_array('commslock', $categories) && !$comments)}
				<li class="link-comments">
                                    <i class="far fa-comment"></i> 
                                    <a href="{$id|link:comments_link}#comments">
                                        {$comments|tag:comments_number} 
					{if isset($views)}(<strong>{$views}</strong> views){/if}
                                    </a>
				</li>
				{/if}
				
				</ul>
			
				
	</div>
                {if $flatpress.params.entry}
                    {comment_block}
                        <ol id="comments">
                        {comment}
                            <li id="{$id}" {$loggedin|notempty:"class=\"comment-admin\""}>

                                <strong class='comment-name'>
                                {* 
                                        using this tag combo, the name is displayed as a link only
                                        if user entered a URL.

                                        Syntax is quite intuitive:
                                        "if $url is not empty, show $name between a tags, 
                                        else default fallback on displaying plain $name"

                                *}
                                {$url|notempty:"<a href=\"$url\" rel=\"nofollow\" title=\"Visit $url\">$name</a>"|default:$name}
                                </strong>

                                {include file='shared:commentadminctrls.tpl'} {* this shows edit/delete links*}

                                <p class="date">
                                <a href="{$entryid|link:comments_link}#{$id}" title="Permalink to {$name}'s comment">{$date|date_format:"%A, %B %e, %Y - %H:%M:%S"}</a>
                                </p>

                                {$content|tag:comment_text}

                            </li>
                        {/comment}
                        </ol>
                    {/comment_block}
                {/if}