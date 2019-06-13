<?php
/*
 * ___________________________________________________________________________
 *    _______               __ __                             
 *   |   _   |.--.--.-----.|  |  |.-----.                     
 *   |       ||_   _|  -__||  ||_||__ --|                     
 *   |___|___||__.__|_____||__|   |_____|                     
 *                                                          
 *    _______                    __         _______   ___     
 *   |_     _|.-----.--.--.----.|  |--.    |       |.'  _|    
 *     |   |  |  _  |  |  |  __||     |    |   -   ||   _|    
 *     |___|  |_____|_____|____||__|__|    |_______||__|      
 *                                                          
 *    _______ __                                              
 *   |     __|  |.---.-.-----.-----.                          
 *   |    |  |  ||  _  |__ --|__ --|                          
 *   |_______|__||___._|_____|_____|                          
 * ___________________________________________________________________________
 * 
 * Theme Name: Axels Touch Of Glass
 * Theme URI: https://www.axel-hahn.de/
 * Description: Axels theme Touch Of Glass.<br>Based on Leggero's theme code.<br>1, 2 or 3 colums in one theme.<br><br>Check its <a href="admin.php?p=themes&action=style">styles</a> too :-)
 * Version: 0.876
 * Author: Axel Hahn
 * Author URI: https://www.axel-hahn.de/
 * 
 */
$theme ['name'] = 'afpdefault';
$theme ['author'] = 'Axel Hahn';
$theme ['www'] = 'https://www.axel-hahn.de/';
$theme ['description'] = 'Axels Touch Of Glass';

$theme ['version'] = 0.705;

$theme ['style_def'] = 'style.css';
$theme ['style_admin'] = 'admin.css';

$theme ['default_style'] = 'blue';

// Other theme settings

// overrides default tabmenu
// and panel layout
remove_filter('admin_head', 'admin_head_action');

// register widgetsets
register_widgetset('right');
register_widgetset('left');
// register_widgetset('menubar');
