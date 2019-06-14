/* 
 * AXELS FLATPRESS DEFAULT
 * javascript funktions
 */


var aDivs={
    'cat':'widget-categories',
    'archive':'widget-archives'
};



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
    
    var aLinks=document.querySelectorAll('#'+aDivs['cat']+' a[href*="'+selector+'"]');
    return aLinks[0];
}


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

/**
 * highlight category and archive of a displayed single item
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
                var aLinksCat=document.querySelectorAll('#widget-categories a[href="'+aLinks[i].href+'"]');
                for(var j=0; j<aLinksCat.length; j++){
                        aLinksCat[j].className=markClass;
                }
        }
    }

    // ---------- date / archive
    var y=entry.substr(5,2); // cut year from entry190521-083200
    var m=entry.substr(7,2);

    var sQueryT1='#widget-archives a[href*="y:'+y+';m:'+m+'"]'; // ?x=y:19;m:05
    var sQueryT2='#widget-archives a[href*="/20'+y+'/'+m+'/"]';

    var aLinksTime=document.querySelectorAll(sQueryT1);
    for(var j=0; j<aLinksTime.length; j++){
            aLinksTime[j].className=markClass;
    }

    var aLinksTime=document.querySelectorAll(sQueryT2);
    for(var j=0; j<aLinksTime.length; j++){
            aLinksTime[j].className=markClass;
    }
    
}


function highlightMenubar(){
    var aLinksMenu=document.querySelectorAll('#menubar a');
    for(var k=0; k<aLinksMenu.length; k++){

        if(aLinksMenu[k].href==location.href){
            aLinksMenu[k].className='active';
            setHeaderLabel(aLinksMenu[k].innerHTML);
        }
    }
}


// -----

function pageInit(){
    var oLinkCat=getCategoryLink();
    if(oLinkCat){
        oLinkCat.className='active';
        setHeaderLabel(oLinkCat.innerHTML);
    }
    highlightMenubar();
}