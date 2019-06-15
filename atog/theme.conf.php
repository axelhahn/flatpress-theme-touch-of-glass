<?php
/*
 * ___________________________________________________________________________
 * 
 *        Axels theme
 *        _______      _______                    __       
 *       |   _   |    |_     _|.-----.--.--.----.|  |--.   
 *       |       |      |   |  |  _  |  |  |  __||     |   
 *       |___|___|      |___|  |_____|_____|____||__|__|   
 *        _______   ___      _______ __                    
 *       |       |.'  _|    |     __|  |.---.-.-----.-----.
 *       |   -   ||   _|    |    |  |  ||  _  |__ --|__ --|
 *       |_______||__|      |_______|__||___._|_____|_____|
 * ___________________________________________________________________________
 * 
 * Theme Name: Axels theme A Touch Of Glass
 * Theme URI: https://github.com/axelhahn/flatpress-theme-touch-of-glass
 * Description: Based on Leggero's theme code.<br>You get 1, 2 or 3 colums in a single theme. What *I* ever missed: it marks archive or category filters.<br>Select your favourite <a href="admin.php?p=themes&action=style">style</a> :-)
 * Version: 0.876
 * Author: Axel Hahn
 * Author URI: https://www.axel-hahn.de/
 * 
 */
$theme ['name'] = 'atog';
$theme ['author'] = 'Axel Hahn';
$theme ['www'] = 'https://www.axel-hahn.de/';
$theme ['description'] = 'Axels theme Touch Of Glass';

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
