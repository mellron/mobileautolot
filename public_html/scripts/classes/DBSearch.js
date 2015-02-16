/* 
 * Class:      DBSearch
 * Description:
 * 
 * BasicSearch(int iPage,int iPageSize,int iStartPrice,int iEndPrice,string sMakes,string sModels,string sSites,int iStartYear,int iEndYear,int iMaxMileage,int iSortField,int iSortDirection)
 * getMakes(int iLocationID)
 * getModels(int iLocationID,int iMakeID)
 * getValidLocations()
 * 
 */
var m_sAutoLotMobileWebImageService = 'http://localhost/mobileautolot/AutoLotMobileImage.ashx';
var m_sAutoLotMobileWebService = 'http://localhost/mobileautolot/autolotsearch.asmx';

function DBSearch()
{ 
    
    
    /***
     * Method : BasicSearch
     * 
     * @param {type} iPage
     * @param {type} iPageSize
     * @param {type} iStartPrice
     * @param {type} iEndPrice
     * @param {type} sMakes
     * @param {type} sModels
     * @param {type} sSites
     * @param {type} iStartYear
     * @param {type} iEndYear
     * @param {type} iMaxMileage
     * @param {type} iSortField
     * @param {type} iSortDirection
     * @param {type} function_Success
     * @param {type} function_Error
     * @returns {undefined}
     */
    
    this.BasicSearch = function(iPage,iPageSize,iStartPrice,iEndPrice,sMakes,sModels,sSites,iStartYear,iEndYear,iMaxMileage,iSortField,iSortDirection,function_Success, function_Error)
    {
           
        var sData = '{iPage:' + '"' + iPage + '"' + ',';
        sData += 'iPageSize:' + '"' + iPageSize + '"' + ',';
        sData += 'iStartPrice:' + '"' + iStartPrice + '"' + ',';
        sData += 'iEndPrice:' + '"' + iEndPrice + '"' + ',';
        sData += 'sMakes:' + '"' + sMakes + '"' + ',';
        sData += 'sModels:' + '"' + sModels + '"' + ',';
        sData += 'sSites:' + '"' + sSites + '"' + ',';
        sData += 'iStartYear:' + '"' + iStartYear + '"' + ',';
        sData += 'iEndYear:' + '"' + iEndYear + '"' + ',';
        sData += 'iMaxMileage:' + '"' + iMaxMileage + '"' + ',';
        sData += 'iSortField:' + '"' + iSortField + '",';
        sData += 'iSortDirection:' + '"' + iSortDirection + '"}';

        $.ajax({

            type: "POST",
            url: m_sAutoLotMobileWebService + "/BasicSearch",
            data: sData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function_Success,
            error: function_Error

        });
    };
 
    /***
     * Method : getMakes
     * 
     * @param {type} iLocationID
     * @param {type} function_Success
     * @param {type} function_Error
     * @returns {undefined}
     */
    
    this.getMakes = function(iLocationID,function_Success,function_Error)
    {
     
        var sData = '{iLocationID:' + '"'  + iLocationID + '"' + '}';
                          
        $.ajax({
                type: "POST",      
                url: m_sAutoLotMobileWebService + "/getMakes",
                data: sData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function_Success,                           
                error: function_Error
                                                   
               });                
        
    };  
    
    this.getModels = function(iLocationID,iMakeID,function_Success,function_Error)
    {
        var sData = '{iLocationID:' + '"' + iLocationID + '"' + ',';
            sData += 'iMakeID:' + '"'  + iMakeID + '"' + '}';
                          
        $.ajax({
                type: "POST",      
                url: m_sAutoLotMobileWebService + "/getModels",
                data: sData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function_Success,                           
                error: function_Error
                                                   
               });                
        
    };  
    
    
    this.getValidLocations = function(function_Success,function_Error)
    {
        
        var sData = '{}';
                          
        $.ajax({
                type: "POST",      
                url: m_sAutoLotMobileWebService + "/getValidLocations ",
                data: sData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function_Success,                           
                error: function_Error
                                                   
               });                
        
    };  
    
    this.getAutoByVinID = function(sVinID,function_Success,function_Error)
    {
        
        var sData = '{sVinID:' + '"'  + sVinID + '"' + '}';
                          
        $.ajax({
                type: "POST",      
                url: m_sAutoLotMobileWebService + "/getAutoByVinID ",
                data: sData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function_Success,                           
                error: function_Error
                                                   
               });                
        
    };  
	 
	    
	
}
    
 

