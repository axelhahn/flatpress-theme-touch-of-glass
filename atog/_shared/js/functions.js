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


var aDomNames={
    'cat':'widget-categories',
    'catInput':'eCatFilter',
    'archive':'widget-archives'
};

	/*
	**************************************
	* String.highlight v1.0              *
	* Autor: Carlos R. L. Rodrigues      *
	**************************************
	*/
	// http://jsfromhell.com/string/highlight
	String.prototype.highlight = function(f, c, i){
	    var r = this, t = /([(){}|*+?.,^$\[\]\\])/g, i = !i ? "i" : "", rf = function(t, i){
	        return r.lastIndexOf("<", i) > r.lastIndexOf(">", i) ? t : c(t, p);
	    };
	    for(var p = -1, l = (f = f instanceof Array ? f : [f]).length; ++p < l;)
	        r = r.replace(new RegExp(f[p].replace(t, "\\\$1"), "gm" + i), rf);
	    return r;
	}
	function c(s, i){
		return '<span class="bg' + i + '">' + s + '</span>';
	}

/**
 * add category filter field; called in pageInit()
 * @returns {Boolean}
 */
function addCategoryFilter(){
    var aLinksCat=document.querySelectorAll('#'+aDomNames['cat']+' a');
    if(aLinksCat.length<10){
        return false;
    }
    var oCatWidget=document.getElementById(aDomNames['cat']);
    var sUpdFunction='filterCategories(); return false;';
    var sLastFilter=localStorage.getItem(aDomNames['catInput']) ? localStorage.getItem(aDomNames['catInput']) : '';
    var sInput='\n\
        <input type="text" id="'+aDomNames['catInput']+'" style="width:90%;"\n\
            onchange="'+sUpdFunction+'" \n\
            onkeyup="'+sUpdFunction+'"\n\
            value="'+sLastFilter+'"\n\
            ><br><br>';
    oCatWidget.innerHTML=oCatWidget.innerHTML.replace('</h4>', '</h4>'+sInput);
    filterCategories();
    return true;
}

/**
 * callback function for change events in category input filter field
 * @returns {undefined}
 */
function filterCategories(){
    var sTerm=document.getElementById(aDomNames['catInput']).value;
    var re = new RegExp(sTerm, 'i');
    var aKw=new Array();
    aKw=sTerm.split(" ");
    console.log(aKw);
    var aLinksCat=document.querySelectorAll('#'+aDomNames['cat']+' a');
    var bVisible=false;
    for(var j=0; j<aLinksCat.length; j++){
        bVisible=!sTerm || aLinksCat[j].innerText.indexOf(sTerm)>=0 || re.test(aLinksCat[j].innerText);
        aLinksCat[j].style=bVisible ? 'display: block' : 'display: none';
        aLinksCat[j].innerHTML=aLinksCat[j].innerText.replace('&gt;', '');
        aLinksCat[j].innerHTML=aLinksCat[j].innerHTML.highlight(aKw, c);
    }
    localStorage.setItem(aDomNames['catInput'], sTerm);
}

/**
 * get link object in the category widget that contains the currently
 * filtered category (and if there is one)
 * @returns {NodeList|getCategoryLink.aLinks|Boolean}
 */
function getCategoryLink(){
    var selector='';
    
    // pretty print style
    var aCat=location.href.match(/\/category\/([a-z0-9]*)/i);
    if(aCat){
        selector+='/category/'+aCat[1]+'/';
    } else {
       // disabled pretty print
       aCat=location.href.match(/x=cat:([0-9]*)/); 
       if(aCat){
           selector+='?x=cat:'+aCat[1];
       }
    }
    if(!selector){
        return false;
    }
    
    var aLinks=document.querySelectorAll('#'+aDomNames['cat']+' a[href*="'+selector+'"]');
    return aLinks[0];
}


/**
 * highlight category and archive of a displayed single item in the widget
 * boxes; on its link objects the css class "mark" will be added.
 * @param  {string}  entry; i.e. "entry190521-083200"
 */
function highlightItem(entry){
    var markClass="mark";
	
    // ---------- categories
    var aLinks=document.querySelectorAll('#main a');
    var regexCatA = new RegExp("x=cat:(.*)");
    var regexCatB = new RegExp("/category/(.*)$");
    for(var i=0; i<aLinks.length; i++){
		
        // --- test category
        if(regexCatA.test(aLinks[i].href)
                ||regexCatB.test(aLinks[i].href)
        ){
                var aLinksCat=document.querySelectorAll('#'+aDomNames['cat']+' a[href="'+aLinks[i].href+'"]');
                for(var j=0; j<aLinksCat.length; j++){
                        aLinksCat[j].className=markClass;
                }
        }
    }

    // ---------- date / archive
    var y=entry.substr(5,2); // cut year from entry190521-083200
    var m=entry.substr(7,2);

    var sQueryT1='#'+aDomNames['archive']+' a[href*="y:'+y+';m:'+m+'"]'; // ?x=y:19;m:05
    var sQueryT2='#'+aDomNames['archive']+' a[href*="/20'+y+'/'+m+'/"]';

    var aLinksTime=document.querySelectorAll(sQueryT1);
    for(var j=0; j<aLinksTime.length; j++){
            aLinksTime[j].className=markClass;
    }

    var aLinksTime=document.querySelectorAll(sQueryT2);
    for(var j=0; j<aLinksTime.length; j++){
            aLinksTime[j].className=markClass;
    }
    
}

/**
 * highlight the "menu bar" (static page) - it finds a link that is equal
 * the current url (location.href) and adds the css class "active"
 * @returns {undefined}
 */
function highlightMenubar(){
    var aLinksMenu=document.querySelectorAll('#menubar a');
    for(var k=0; k<aLinksMenu.length; k++){

        if(aLinksMenu[k].href==location.href){
            aLinksMenu[k].className='active';
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
function setHeaderLabel(sLabel){
    var o=document.getElementById('headerfilter');
    if(o && sLabel){
        o.innerHTML=sLabel;
        return true;
    }
    return false;
}

/**
 * 
 */
function setActive(sDivId, sParam, sParamPretty){
    var aLinks=document.querySelectorAll('#'+sDivId+' a');

    var regex1a = new RegExp(sParam+"$");
    var regex1b = new RegExp(sParam+"&");
    var regex2 = new RegExp('/'+sParamPretty+"/$", "i");

    for(var i=0; i<aLinks.length; i++){
        if((regex1a.test(aLinks[i].href))
            || (regex1b.test(aLinks[i].href))
            || (regex2.test(aLinks[i].href))
        ) {
            aLinks[i].className='active';
            setHeaderLabel(aLinks[i].innerHTML);
        }
    }
}


// -----

/**
 * init function on page load
 * @returns {undefined}
 */
function pageInit(){
    var oLinkCat=getCategoryLink();
    if(oLinkCat){
        oLinkCat.className='active';
        setHeaderLabel(oLinkCat.innerHTML);
    }
    addCategoryFilter();
    highlightMenubar();
}