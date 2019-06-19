		
		
		<div id="footer">
			{action hook=wp_footer}
			
			<!--
			
				Even though your not required to do this, we'd appreciate
				a lot if you didn't remove the notice above.
				
				This way we'll get a better ranking on search engines
				and you'll spread the FlatPress word all around the world :)
				
				If you really want to remove it, you may want to
				consider doing at least a small donation.  
			
			-->
			
			<p>
                            This blog is proudly powered by <a href="https://www.flatpress.org/">FlatPress</a>.
                            The theme &quot;<a href="https://github.com/axelhahn/flatpress-theme-touch-of-glass">A Touch Of Glass</a>&quot; 
                            was made by <a href="https://www.axel-hahn.de/">Axel Hahn</a>.
			</p>
		</div> <!-- end of #footer -->

        
                <script>
                    pageInit();
                    
                    {if $flatpress.params.entry}
                        highlightItem("{$flatpress.params.entry}");
                    {else}
                        {if $flatpress.params.y}
                            activateArchiveLink(
                                'widget-archives', 
                                '{$flatpress.params.y}',
                                '{if $flatpress.params.m}{$flatpress.params.m}{/if}'
                            );
                        {/if}
                    {/if}

                </script>
	</div>
</body>
</html>
