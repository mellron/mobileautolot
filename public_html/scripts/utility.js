var m_sLastAutocompleteInputValue;

function SetdivHeightWithWindow(sDivID,iExtraSpace,iminHeight) { 

    var  divHeight; 
        
    divHeight = jQuery(window).height() + iExtraSpace;

    if(divHeight > iminHeight)
       jQuery(sDivID).css({"height":divHeight}); 
    else
       jQuery(sDivID).css({"height":iminHeight});  

}

function SetMinHeight(sDivID,iminHieght)
 {
      if($(sDivID).height() < iminHieght)
          $(sDivID).height(iminHieght);
      
 }
 
 
 function validate_form(sDialogDivID, sXMLFile,success_function,error_function)
 {
        var _oValidation = new XMLFile_Validation(sDialogDivID);
                      
        _oValidation.ValidateForm(sXMLFile,function(){
            
                  $(sDialogDivID).empty();
                  
                  _oValidation.DisplayErrors();
                 
                  if(_oValidation.getNumberofErrors() > 0)
                      error_function(_oValidation.GetErrorIDs ());
                  else
                      success_function();                                    
        },function() { });
        

      
  }
  
    
  function validation_error_display(sDialogDivID,oArrayofErrorFormIDs)
  {
 
      
      for(var iloop=0;iloop<=oArrayofErrorFormIDs.length;iloop++)
          {
           
            $("[id*='" + oArrayofErrorFormIDs[iloop] + "']").css({'color' : 'red'});
            
          }
          
      $(sDialogDivID).dialog('open');
      
  }
  
  function validation_clear_errorfields(sDiv)
  {
       $("#" + sDiv + " input[type=text]").each(function() {

          $("#" + this.id).css({'color' : 'black'});

       });
   
  }
  
  function parseRecordsIntoArray(sJSON,iMax)
  {
          var _oRecords = $.parseJSON(sJSON);
	      
	      var sArray = new Array();
        
		      var iCount = 0;
				
              $.each(_oRecords.Records, function (index, record) 
              {
			  			     
			     var obj = {empid: record.empid,label: record.label};
				 				   
                 sArray.push(obj); 

                 if(++iCount > iMax) 
                     return false;
				 				 
              });
			  
			  return sArray;
  
  }
  
  function disable_autocomplete(sDivID)
  {
      $(sDivID).autocomplete("destroy");
  }
  
  function setup_autocomplete(sDivID,iDropNumber,oReturnFunction,oClosedFunction) 
  {      
     $(sDivID).autocomplete({
                   
				
                  source: function(request, response) {
				  
		                  var sData = '{strNameValue:' + '"'  + request.term + '"' + '}';
						  
						  $.ajax({
						  						 
								  type: "POST",
								  url:"Searches.aspx/getQuickSeachData",			  
								  data: sData,
								  contentType: "application/json; charset=utf-8",
								  dataType: "json",
								  
								  success: function(results) {
								  
								      var hold = parseRecordsIntoArray(results.d,iDropNumber);
									  									 
									  response(parseRecordsIntoArray(results.d,iDropNumber));
								  },
								  error: function(serr)
								  {
								    var shold = serr;
								  }
								  
			  
		                 });
                                              
                   }, 
	  
                   select: function(event,ui)
                   {
                       oReturnFunction(sDivID,ui.item);                                          
                   },
                   close: function(event,ui)
                   {
                      oClosedFunction();
                   },
		   focus: function(event,ui)
		   {
		       
		      var shold = ui.item;
		       
		   }, 
		   response: function(event, ui)
		              {
				  
				  m_sLastAutocompleteInputValue = $('#' + event.target.id).val();
				 
			      }
		       
		   
                                      
               });
  }
   

function isNumber(n) {
    
  return !isNaN(parseFloat(n)) && isFinite(n);
  
}    
 /********************************************
  *  Check if a number is odd or even
  * 
  * 
  * 
  **********************************************/    
 function isEven(value){
	if (value%2 === 0)
		return true;
	else
		return false;
}
 /********************************************
  *  add commas to a number string
  * 
  * 
  * @param {type} nStr
  * @returns {String|x2|x|x1}
  **********************************************/ 

function addCommasToNumber(nStr)
{
     nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function RoundFloats2Dec(sValue)
{
    var _fHold = 0.0;
    
    try
    {
       _fHold = parseFloat(sValue);
               
       return  _fHold.toFixed(2).toString();;
    }
    catch(serr)
    {
        return sValue;
    }
    
}
 
function disablepage()
{
    $("body").find("*").attr("disabled", "disabled");
    $("body").find("a").click(function (e) { e.preventDefault(); });
}

function enablepage()
{
    $("body").find("*").removeAttr("disabled");
    $("body").find("a").unbind("click");
}
/********************************************
*  Get the application path.
* 
* 
* 
**********************************************/
function getAppPath() {
    var pathArray = location.pathname.split('/');
    var appPath = "/";
    for (var i = 1; i < pathArray.length - 1; i++) {
        appPath += pathArray[i] + "/";
    }
    return appPath;
}

/********************************************
*  Get query string paramter.
* 
* 
* 
**********************************************/
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results === null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}

/********************************************
*  
* 
* 
* 
**********************************************/

function getEmpIDFromHash(sHash)
{
   var sEmpID = sHash.substr(sHash.indexOf("00",1)+2,sHash.length);
   
   var iEmpID = sHash.indexOf("00",1)+2;
    
    if(iEmpID > 1)  
    {
      iEmpID = parseInt(sEmpID,16);    
      return iEmpID.toString();
    }
    else return '';
    
}
 

function getHash(sHash)
{
    
    var shold = sHash.substring(0,sHash.indexOf('00',1));
    
    if(shold.length < 2)
	return sHash ;
    else 
        return shold;
            
    
}

function putEmpIDInHash(sHash,sEmpID)
{
      
    //sHash += '#' + parseInt(sEmpID,10).toString(16);
    
    sHash += '00' + parseInt(sEmpID,10).toString(16);
    
    return sHash;
    
}

function putPageNumInHash(sHash,sPage)
{
            
    sHash += 'XX' + parseInt(sPage,10).toString(16);
    
    return sHash;
    
}


function getPageNumFromHash(sHash)
{
   var sPageNum = sHash.substr(sHash.indexOf("XX",1)+2,sHash.length);
   
   var iPageNum = sHash.indexOf("XX",1)+2;
    
    if(iPageNum > 1)  
    {
      iPageNum = parseInt(sPageNum,16);    
      return iPageNum.toString();
    }
    else return '';    
}

function getIDbyClass(sClass)
{
    return $('.' + sClass).attr('id');
}

function setServerName(sDiv)
{
    Get_MachineName(function(ReturnVal)
            {
		
		 $('#' + sDiv).html('Server ID: ' + ReturnVal);
		
	    },
	    function() {
		
		 $('#' + sDiv).html('Server ID: ');
		
	    });
   $('#' + sDiv).html('Server ID: ' + window.location.hostname);
}

function setVersion(sDiv)
{    			   
    $('#' + sDiv).html("");
      
    GetWebConfigValue('attribute','Version',function(ReturnVal)
                                            {
	                                          $('#' + sDiv).html("Build Version: " + ReturnVal);	      	    	 	 	 	 
     },function() {$('#' + sDiv).html("");});
    
}

function getEnvironment(success_function,error_function)
{    			   
    
      
    GetWebConfigValue('attribute','Environment',function(ReturnVal)
                                               {
                                                   if(ReturnVal.length > 0)
	                                               success_function(ReturnVal);	      	    	 	 	 	 
                                                   else
                                                       error_function();
     },error_function);    
}
function getCurrentDNS(success_function,error_function)
{    			   
    
      
    GetWebConfigValue('attribute','CurrentDNS',function(ReturnVal)
                                               {
                                                   if(ReturnVal.length > 0)
	                                               success_function(ReturnVal);	      	    	 	 	 	 
                                                   else
                                                       error_function();
     },error_function);    
}


function Get_MachineName(success_function,error_function)
{
     var sData = '{}';

        $.ajax({
            type: "POST",
            url: "Searches.aspx/GET_MachineName",
            data: sData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(ReturnVal) {		
		
		     var _oConfigs = $.parseJSON(ReturnVal.d.replace("\\\\r\\\\n", ""));	 
		     
	             try
	             {
	               $.each(_oConfigs.configurations, function (index, Attrib) 
		       {          
			  success_function(Attrib.value);		         	      		       
	               }); 
	             }
	             catch(err) {
	    
	                   success_function("");     
	             }				
	    },
            error: error_function
        });
}

function GetWebConfigValue(sTagname,sAttribute,success_function,error_function)
{
        var sData = '{' + sTagname + ':"' + sAttribute + '"' + '}';

        $.ajax({
            type: "POST",
            url: "Searches.aspx/GET_WebConfigValue",
            data: sData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(ReturnVal) {		
		
		     var _oConfigs = $.parseJSON(ReturnVal.d.replace("\\\\r\\\\n", ""));	 
		     
	             try
	             {
	               $.each(_oConfigs.configurations, function (index, Attrib) 
		       {          
			  success_function(Attrib.value);		         	      		       
	               }); 
	             }
	             catch(err) {
	    
	                   success_function("");	     
	             };				
	    },
            error: error_function
        });
    }


/********************************************
*  Check if element is scrolling.
* 
* 
* 
**********************************************/
function IsAuthenticated(sUserid, sPassword,success_function,error_function) {
  
         var sData = '{sUserid:' + '"' + sUserid + '"' + ',sPassword:"' + sPassword + '"}';

         $.ajax({
             type: "POST",
             url: "Searches.aspx/IsUserAuthenticated",
             data: sData,
             contentType: "application/json; charset=utf-8",
             dataType: "json",
             success: function (ReturnVal) {

                 var _oConfigs = $.parseJSON(ReturnVal.d.replace("\\\\r\\\\n", ""));

                 try {
                     $.each(_oConfigs.configurations, function (index, Attrib) {
                         if (Attrib.value.toLowerCase() === "true")
                             success_function();
                         else
                             error_function();
                     });
                 }
                 catch (err) {
                     error_function();
                 }
             },
             error: error_function
         });

}

/********************************************
*  Check if element is scrolling.
* 
* 
* 
**********************************************/
function DoesWindowScrollBarExists() {
  /*var docHeight = $(document).height();
  var scroll    = $(window).height() + $(window).scrollTop();
  return (docHeight != scroll); */
    
  return $('body').outerHeight() > $(window).height();
}


/******************************************************
Name: setCookie
Parameters: c_name:String - This is the name of the actual cookie.
value:String - Value to store.
expiredays:Int - number of days for cookie to expire.

Returns: Null.

Description:  This function will save a cookie on disk with a set 
expiration date.

*******************************************************/
function setCookieWithDate(c_name, value, expiredays) {

    var exdate = new Date();

    try {

        exdate.setDate(exdate.getDate() + expiredays);

        document.cookie = c_name + "=" + escape(value) +
                             ((expiredays === null) ? "" : ";expires=" + exdate.toUTCString());

    }
    catch (err) {

        return;
    }


}

/******************************************************
Name:SetCookie
Paramters: c_name:String - This is the name of the actual cookie.
value:String - Value to store.

Returns: Null.

Description:  This function will save a cookie on session which
will expire after session has closed.
*******************************************************/

function setCookie(c_name, value) {

    var exdate = new Date();

    try {

        document.cookie = c_name + "=" + escape(value);

    }
    catch (err) {

        return;
    }

}

/******************************************************
Name: getCookie
Paramters: c_name:String - Name of cookie to look for.


Returns: String.  Value of cookie.

Description:  This function will retreive a cookie from session
or on disk. Will return "" if cookie not found.

*******************************************************/
function getCookie(c_name) {

    if (document.cookie.length > 0) {

        var c_start = document.cookie.indexOf(c_name + "=");

        if (c_start !== -1) {

            c_start = c_start + c_name.length + 1;

            var c_end = document.cookie.indexOf(";", c_start);

            if (c_end === -1) c_end = document.cookie.length;

            return unescape(document.cookie.substring(c_start, c_end));

        }
    }

    return "";
}

function IsBrowserIE()
{
    
    return (navigator.appName === 'Microsoft Internet Explorer');
    
}

 
function CheckLenJumpNext(x,y,sForm)
{
if (y.length===x.maxLength)
  {     
    var next=x.tabIndex;

    if (next<document.getElementById(sForm).length)
	{
	    for(iloop=0;iloop<document.getElementById(sForm).length;iloop++)
	    {
		if(document.getElementById(sForm).elements[iloop].tabIndex === next+1) 
		{
		    document.getElementById(sForm).elements[iloop].focus();
		    break;
		}

	    }
	}
    }
}

function linkify(inputText) {
    var replacedText, replacePattern1, replacePattern2, replacePattern3;

    //URLs starting with http://, https://, or ftp://
    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

    //Change email addresses to mailto:: links.
    replacePattern3 = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim;
    replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

    return replacedText;
}

function EscapeSingleQuotes(sValue)
{
   var shold = sValue.replace("'","\\'");
   
   return shold.replace('"','\\"');

}

function DisplayInfoPageifIncompatibleBrowser(sURL)
{
    if(isIE8CompatMode())
	window.location.href = sURL;
    
}
function isIE8CompatMode () {

    var oHold = IEVersion();

    return (oHold.Version < 8 || oHold.BrowserMode === "Compat Mode")

}

function IEVersion() {

    var _n = navigator, _w = window, _d = document;
    var version = "NA";
    var na = _n.userAgent;
    var ieDocMode = "NA";
    var ie8BrowserMode = "NA";
    // Look for msie and make sure its not opera in disguise
    if (/msie/i.test(na) && (!_w.opera)) {
        // also check for spoofers by checking known IE objects
        if (_w.attachEvent && _w.ActiveXObject) {
            // Get version displayed in UA although if its IE 8 running in 7 or compat mode it will appear as 7
            version = (na.match(/.+ie\s([\d.]+)/i) || [])[1];
            // Its IE 8 pretending to be IE 7 or in compat mode		
            if (parseInt(version) == 7) {
                // documentMode is only supported in IE 8 so we know if its here its really IE 8
                if (_d.documentMode) {
                    version = 8; //reset? change if you need to
                    // IE in Compat mode will mention Trident in the useragent
                    if (/trident\/\d/i.test(na)) {
                        ie8BrowserMode = "Compat Mode";
                        // if it doesn't then its running in IE 7 mode
                    } else {
                        ie8BrowserMode = "IE 7 Mode";
                    }
                }
            } else if (parseInt(version) == 8) {
                // IE 8 will always have documentMode available
                if (_d.documentMode) { ie8BrowserMode = "IE 8 Mode"; }
            }
            // If we are in IE 8 (any mode) or previous versions of IE we check for the documentMode or compatMode for pre 8 versions			
            ieDocMode = (_d.documentMode) ? _d.documentMode : (_d.compatMode && _d.compatMode == "CSS1Compat") ? 7 : 5; //default to quirks mode IE5				   			
        }
    }

    return {
        "UserAgent": na,
        "Version": version,
        "BrowserMode": ie8BrowserMode,
        "DocMode": ieDocMode
    };

}

function PadStringWithChar(sVal,sChar,iHowMany)
{
    var sNewString = sVal.replace(' ',sChar);
    
    for(iLoop=0;iLoop<iHowMany;iLoop++)
        {
            sNewString += sChar;
        }
        
    return sNewString;    
    
}

jQuery.browser={};(function(){jQuery.browser.msie=false;
jQuery.browser.version=0;if(navigator.userAgent.match(/MSIE ([0-9]+)\./)){
jQuery.browser.msie=true;jQuery.browser.version=RegExp.$1;}})();

(function($) {
    $.fn.customFadeIn = function(speed, callback) {
       $(this).fadeIn(speed,callback);
        $(this).fadeIn(speed, function() {
            if(jQuery.browser.msie)
                $(this).get(0).style.removeAttribute('filter');
            if(callback !== undefined)
                callback();
        }); 
    };
    $.fn.customFadeOut = function(speed, callback) {
        $(this).fadeOut(speed,callback);
        $(this).fadeOut(speed, function() {
            if(jQuery.browser.msie)
                $(this).get(0).style.removeAttribute('filter');
            if(callback !== undefined)
                callback();
        }); 
    };
})(jQuery);