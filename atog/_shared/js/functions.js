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
 * javascript functions
 * ___________________________________________________________________________
 */

// ----------------------------------------------------------------------
// config
// ----------------------------------------------------------------------

var aConfig = {
    'archive': 'widget-archives',  // string: id of archive widget
    'cat': 'widget-categories',    // string: id of category widget
    
    'catInput': 'eCatFilter',      // string: id if input field for category filter
    'catMin4Filter': 10,           // integer: count of categories before showing filter field
    'archiveShowYears': 1,         // integer: count of years to show with monthes before closing year
    
    'classActive': 'active',       // string: classname for active widget link
    'classMark': 'mark',           // string: classname for active widget link
};

// ----------------------------------------------------------------------
// helper / private functions
// ----------------------------------------------------------------------

/**
 * helper function: get ID of open close link 
 * @param {integer} iYear  Year
 * @returns {String}
 */
function _getOpenCloseId(iYear) {
    return 'btnYear' + iYear;
}
/*
 **************************************
 * String.highlight v1.0              *
 * Autor: Carlos R. L. Rodrigues      *
 **************************************
 */
// http://jsfromhell.com/string/highlight
String.prototype.highlight = function (f, c, i) {
    var r = this, t = /([(){}|*+?.,^$\[\]\\])/g, i = !i ? "i" : "", rf = function (t, i) {
        return r.lastIndexOf("<", i) > r.lastIndexOf(">", i) ? t : c(t, p);
    };
    for (var p = -1, l = (f = f instanceof Array ? f : [f]).length; ++p < l; )
        r = r.replace(new RegExp(f[p].replace(t, "\\\$1"), "gm" + i), rf);
    return r;
}
function c(s, i) {
    return '<span class="bg' + i + '">' + s + '</span>';
}

// ----------------------------------------------------------------------
// public functions
// ----------------------------------------------------------------------

/**
 * set class active to current archiove link in archive widget
 * called in footer.tpl
 */
function activateArchiveLink(sDivId, sYear, sMonth) {
    var sParam = 'x=y:' + sYear + (sMonth ? ';m:' + sMonth : '');
    var sParamPretty = '20' + sYear + (sMonth ? '/' + sMonth : '');

    var aLinks = document.querySelectorAll('#' + sDivId + ' a');

    var regex1a = new RegExp(sParam + "$");
    var regex1b = new RegExp(sParam + "&");
    var regex2 = new RegExp('/' + sParamPretty + "/$", "i");

    for (var i = 0; i < aLinks.length; i++) {
        if ((regex1a.test(aLinks[i].href))
                || (regex1b.test(aLinks[i].href))
                || (regex2.test(aLinks[i].href))
                ) {
            aLinks[i].className = aConfig['classActive'];
            setHeaderLabel(aLinks[i].innerHTML);
            aLinks[i].parentNode.parentNode.style = '';
            aLinks[i].style = '';
            toggleArchive(_getOpenCloseId('20' + sYear),false);
        }
    }
    toggleArchive(_getOpenCloseId('20' + sYear),false);
    }
/**
 * set class active to current category link in category widget
 * called in pageInit()
 */
function activateCategoryLink() {
    var oLinkCat = getCategoryLink();
    if (oLinkCat) {
        oLinkCat.className = aConfig['classActive'];
        setHeaderLabel(oLinkCat.innerHTML);
    }
}

/**
 * add category filter field; called in pageInit()
 * @returns {Boolean}
 */
function addCategoryFilter() {
    var aLinksCat = document.querySelectorAll('#' + aConfig['cat'] + ' a');
    if (aLinksCat.length < aConfig['catMin4Filter']) {
        return false;
    }
    var oCatWidget = document.getElementById(aConfig['cat']);
    var sUpdFunction = 'filterCategories(); return false;';
    var sLastFilter = localStorage.getItem(aConfig['catInput']) ? localStorage.getItem(aConfig['catInput']) : '';
    var sInput = '\n\
        <input type="text" id="' + aConfig['catInput'] + '" style="width:90%;"\n\
            onchange="' + sUpdFunction + '" \n\
            onkeyup="' + sUpdFunction + '"\n\
            value="' + sLastFilter + '"\n\
            ><br><br>';
    oCatWidget.innerHTML = oCatWidget.innerHTML.replace('</h4>', '</h4>' + sInput);
    filterCategories();
    return true;
}

/**
 * add category filter field; called in pageInit()
 * @returns {Boolean}
 */
function addTimeFolds() {
    var aLinksA = document.querySelectorAll('#' + aConfig['archive'] + '>ul>li>a');
    var sId = false;
    if (aLinksA.length < 1) {
        return false;
    }
    for (var j = 0; j < aLinksA.length; j++) {
        sId = _getOpenCloseId(aLinksA[j].innerText);
        aLinksA[j].innerHTML += '<a id="' + sId + '" class="openclose openclose-open" onclick="toggleArchive(\'' + sId + '\'); return false;" style="float: right;"><i class="fas fa-plus"></i></a>';
        if (j >= aConfig['archiveShowYears']) {
            toggleArchive(sId);
        }
        toggleArchive(sId, true);
    }

    return true;
}

/**
 * callback function for change events in category input filter field
 * @returns {undefined}
 */
function filterCategories() {
    var sTerm = document.getElementById(aConfig['catInput']).value;
    var re = new RegExp(sTerm, 'i');
    var aKw = new Array();
    aKw = sTerm.split(" ");
    console.log(aKw);
    var aLinksCat = document.querySelectorAll('#' + aConfig['cat'] + ' a');
    var bVisible = false;
    for (var j = 0; j < aLinksCat.length; j++) {
        bVisible = !sTerm || aLinksCat[j].innerText.indexOf(sTerm) >= 0 || re.test(aLinksCat[j].innerText);
        aLinksCat[j].style = bVisible ? 'display: block' : 'display: none';
        aLinksCat[j].innerHTML = aLinksCat[j].innerText.replace('&gt;', '');
        aLinksCat[j].innerHTML = aLinksCat[j].innerHTML.highlight(aKw, c);
    }
    localStorage.setItem(aConfig['catInput'], sTerm);
}

/**
 * get link object in the category widget that contains the currently
 * filtered category (and if there is one)
 * @returns {NodeList|getCategoryLink.aLinks|Boolean}
 */
function getCategoryLink() {
    var selector = '';

    // pretty print style
    var aCat = location.href.match(/\/category\/([a-z0-9\-]*)/i);
    if (aCat) {
        selector += '/category/' + aCat[1] + '/';
    } else {
        // disabled pretty print
        aCat = location.href.match(/x=cat:([0-9]*)/);
        if (aCat) {
            selector += '?x=cat:' + aCat[1];
        }
    }
    if (!selector) {
        return false;
    }

    var aLinks = document.querySelectorAll('#' + aConfig['cat'] + ' a[href*="' + selector + '"]');
    return aLinks[0];
}


/**
 * highlight category and archive of a displayed single item in the widget
 * boxes; on its link objects the css class "mark" will be added.
 * @param  {string}  entry; i.e. "entry190521-083200"
 */
function highlightItem(entry) {

    // ---------- categories
    var aLinks = document.querySelectorAll('#main a');
    var regexCatA = new RegExp("x=cat:(.*)");
    var regexCatB = new RegExp("/category/(.*)$");
    for (var i = 0; i < aLinks.length; i++) {

        // --- test category
        if (regexCatA.test(aLinks[i].href)
                || regexCatB.test(aLinks[i].href)
                ) {
            var aLinksCat = document.querySelectorAll('#' + aConfig['cat'] + ' a[href="' + aLinks[i].href + '"]');
            for (var j = 0; j < aLinksCat.length; j++) {
                aLinksCat[j].className = aConfig['classMark'];
            }
        }
    }

    // ---------- date / archive
    var y = entry.substr(5, 2); // cut year from entry190521-083200
    var m = entry.substr(7, 2);

    var sQueryT1 = '#' + aConfig['archive'] + ' a[href*="y:' + y + ';m:' + m + '"]'; // ?x=y:19;m:05
    var sQueryT2 = '#' + aConfig['archive'] + ' a[href*="/20' + y + '/' + m + '/"]';

    var aLinksTime = document.querySelectorAll(sQueryT1);
    for (var j = 0; j < aLinksTime.length; j++) {
        aLinksTime[j].className = aConfig['classMark'];
        aLinksTime[j].parentNode.parentNode.style = '';
    }

    var aLinksTime = document.querySelectorAll(sQueryT2);
    for (var j = 0; j < aLinksTime.length; j++) {
        aLinksTime[j].className = aConfig['classMark'];
        aLinksTime[j].parentNode.parentNode.style = '';
    }
    toggleArchive(_getOpenCloseId('20' + y), true);
}

/**
 * highlight the "menu bar" (static page) - it finds a link that is equal
 * the current url (location.href) and adds the css class "active"
 * @returns {undefined}
 */
function activateMenubar() {
    var aLinksMenu = document.querySelectorAll('#menubar a');
    for (var k = 0; k < aLinksMenu.length; k++) {

        if (aLinksMenu[k].href == location.href) {
            aLinksMenu[k].className = aConfig['classActive'];
            setHeaderLabel(aLinksMenu[k].innerHTML);
        }
    }
}

/**
 * put a text into a dom object named headerfilter (which is in the top header
 * of the theme - see header.tpl)
 * @param {type} sLabel
 * @returns {Boolean}
 */
function setHeaderLabel(sLabel) {
    var o = document.getElementById('headerfilter');
    if (o && sLabel) {
        o.innerHTML = sLabel;
        return true;
    }
    return false;
}



/**
 * toggle visibility of monthes below a year in the archives widget
 * @param {string}   idYearBtn   id of the + button next to year link in archive widget
 * @param {boolean}  bDrawOnly   default: false (=toggle); true = do not toggle, just update icon
 * @returns {Boolean}
 */
function toggleArchive(idYearBtn, bDrawOnly = false) {
    var oButton = document.getElementById(idYearBtn);
    if (!oButton) {
        // console.log(idYearBtn + " does not exist (yet)");
        return false;
    }
    var oLI = oButton.parentNode.parentNode;
    var aUL = oLI.querySelectorAll('ul');
    if (!bDrawOnly) {
        aUL[0].style.display = aUL[0].style.display ? '' : 'none';
    }
    oButton.className = 'openclose ' + (aUL[0].style.display ? 'openclose-open' : 'openclose-close');
}

/**
 * hide hamburger menu if it has no div.wrapper in this column
 * @param {string} sSide define column; one of left|right
 * @returns {Boolean}
 */
function checkHamburger(sSide){
    if(!document.querySelector('div.col'+sSide+' .wrapper')){
        document.getElementById('col'+sSide+'-label').style.display='none';
        return false;
    }
    return true;
}

// ----------------------------------------------------------------------
// 
// ----------------------------------------------------------------------

/**
 * init function on page load
 * @returns {undefined}
 */
function pageInit() {
    activateCategoryLink();
    activateMenubar();
    addCategoryFilter();
    addTimeFolds();
    checkHamburger('left');
    checkHamburger('right');
}

// ----------------------------------------------------------------------
