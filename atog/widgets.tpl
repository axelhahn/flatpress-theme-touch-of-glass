		
                <div class="column colleft">
                    <input type="checkbox" id="colleft-menu" class="menu-input noprint" />
                    <label for="colleft-menu" id="colleft-label">
                        <div>
                            {widgets pos=left}
                            <div class="wrapper">
                                <div id="{$id}">
                                    <h4>{$subject}</h4>
                                    {$content}
                                </div>
                            </div>
                            {/widgets}
                        </div>
                    </label>
                </div>

                <div class="column colright">
                    <input type="checkbox" id="colright-menu" class="menu-input noprint" />
                    <label for="colright-menu" id="colright-label">
                        <div>
                            {widgets pos=right}
                            <div class="wrapper">
                                <div id="{$id}">
                                    <h4>{$subject}</h4>
                                    {$content}
                                </div>
                            </div>
                            {/widgets}
                        </div>
                    </label>
		
		        </div>
