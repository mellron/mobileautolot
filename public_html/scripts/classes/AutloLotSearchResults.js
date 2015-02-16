 
 
 AutoLotSearchResults = function(iEndPrice,sMakes,sModels,sSites,function_Success,function_Error)
 {            
     this.m_iMaxRows = 12;
     this.m_iCurrentPage = 1;   
     this.m_iSortFeild = 4;     // matchinges column.
     this.m_iSortDirection = 0; // 0 -Acending 1- Descending
     this.m_iEndPrice = iEndPrice;
     this.m_sMakes = sMakes;
     this.m_sModels = sModels;
     this.m_sSites = sSites;
     this.m_iMaxNumberOfPages = 0;
     this.m_iTotalNumberOfRecords = 0;
     this.m_ofunction_Success = function_Success;
     this.m_ofunction_Error = function_Error;
     this.m_IDSelected = '';
                    
     this.m_oAutoLotDetailInfo = null;
     
     AutoLotSearchResults.prototype.m_othis = this;
          
     AutoLotSearchResults.prototype.m_othis.InitEvents();
                    
 };
    
 AutoLotSearchResults.prototype = {
     
     InitPage:function()
     {
                        
     },
     
     /***
      * InitEvents
      * @returns {undefined}
      */
     InitEvents:function()
     {
                  
         $('#AutoLot_SortOptions').change(AutoLotSearchResults.prototype.m_othis.SortSelectChange);
         
     },
     
     SortSelectChange:function()
     {
         _sValue = $('#AutoLot_SortOptions :selected').attr('value').toString();
         _sValues = _sValue.split('_');
         
         AutoLotSearchResults.prototype.m_othis.m_iSortFeild = parseInt(_sValues[0]);
         AutoLotSearchResults.prototype.m_othis.m_iSortDirection = parseInt(_sValues[1]);
         AutoLotSearchResults.prototype.m_othis.m_iCurrentPage = 1;
         AutoLotSearchResults.prototype.m_othis.ShowRecords(function() {},function() {});
         
     },
     CalculateMaxPages:function(iValue)
     {
         var _iPageSize = this.get_DisplayPageSize();
                   
         //this.set_TotalNumberOfRecords(iValue);

         var _iRatio = Math.round((iValue / _iPageSize) * 1000) / 1000;

         var _iFloor = Math.floor(_iRatio);
         

         if(_iRatio > _iFloor)
             this.set_MaxNumberOfPages(_iFloor + 1);
         else
             this.set_MaxNumberOfPages(_iFloor);
         
     },
     get_Make:function()
     {
         return AutoLotSearchResults.prototype.m_othis.m_sMakes;
     },
     get_Model:function()
     {
         return AutoLotSearchResults.prototype.m_othis.m_sModels;
     },
     get_Site:function()
     {
         return AutoLotSearchResults.prototype.m_othis.m_sSites;
     },
     get_EndPrice:function()
     {
         return parseInt(AutoLotSearchResults.prototype.m_othis.m_iEndPrice);
     },
     set_TotalNumberOfRecords:function(iValue)
     {
        AutoLotSearchResults.prototype.m_othis.m_iTotalNumberOfRecords  = iValue;
        this.CalculateMaxPages(iValue);
     },
     
     get_TotalNumberOfRecords:function()
     {
        return AutoLotSearchResults.prototype.m_othis.m_iTotalNumberOfRecords;
     }, 
     
     set_DisplayPageSize:function(iValue)
     {
         AutoLotSearchResults.prototype.m_othis.m_iMaxRows = iValue;
     },
     get_DisplayPageSize:function()
     {
         return AutoLotSearchResults.prototype.m_othis.m_iMaxRows;   
     },
     set_MaxRows:function(iValue)
     {
          AutoLotSearchResults.prototype.m_othis.m_iMaxRows = iValue;
     },
     get_MaxRows:function()
     {
         return AutoLotSearchResults.prototype.m_othis.m_iMaxRows;
     },
     PrevPage:function()
     {                  
       AutoLotSearchResults.prototype.set_CurrentPage(AutoLotSearchResults.prototype.m_othis.m_iCurrentPage - 1);        
     },
     NextPage:function()
     {
        AutoLotSearchResults.prototype.set_CurrentPage(AutoLotSearchResults.prototype.m_othis.m_iCurrentPage + 1);
     },
     set_CurrentPage:function(iPage)
     {
         if(iPage < 1) iPage = 1;
         
         AutoLotSearchResults.prototype.m_othis.m_iCurrentPage = iPage;
         
     },
     get_CurrentPage:function()
     {
        return AutoLotSearchResults.prototype.m_othis.m_iCurrentPage;
     },
     set_MaxNumberOfPages:function(iValue)
     {
         AutoLotSearchResults.prototype.m_othis.m_iMaxNumberOfPages =iValue;
     },
     get_MaxNumberOfPages:function()
     {
         return AutoLotSearchResults.prototype.m_othis.m_iMaxNumberOfPages;
     },
     set_VinIDSelected:function(iValue)
     {
         AutoLotSearchResults.prototype.m_othis.m_IDSelected = iValue;
     },
     get_VinIDSelected:function()
     {
         return AutoLotSearchResults.prototype.m_othis.m_IDSelected;
     },
     ShowRecords:function(function_Success,function_Error)
     {
        var _search = new DBSearch;
        
        showwaitgraphic();
        
        disablepage();             
        
        _search.BasicSearch(AutoLotSearchResults.prototype.get_CurrentPage(),
                            AutoLotSearchResults.prototype.get_MaxRows(),0,
                            AutoLotSearchResults.prototype.get_EndPrice(),
                            AutoLotSearchResults.prototype.get_Make(),
                            AutoLotSearchResults.prototype.get_Model(),
                            AutoLotSearchResults.prototype.get_Site(),
                            1880,2999,9999999,
                            AutoLotSearchResults.prototype.m_othis.m_iSortFeild,
                            AutoLotSearchResults.prototype.m_othis.m_iSortDirection,
        function(records)
        {
             AutoLotSearchResults.prototype.m_othis.BuildListToDisplay(records);
             
             hidewaitgraphic();    
                                      
             enablepage();
             
            // function_Success();
        }, 
        function() {
            
             hidewaitgraphic();
             enablepage();
            // function_Error();
        });
        
     },
     /***
      * 
      * @param {json object} records
      * @returns {null}
      */
     BuildListToDisplay:function(records)
     { 
         
            var _oRecords  = $.parseJSON(records.d);
       
                         var _sHTML = '\n';     
                         
                         if(_oRecords.Records.length > 0)
                             this.set_TotalNumberOfRecords(parseInt(_oRecords.Records[0]["@TotalRecords"]));
                                                                         
                         $.each(_oRecords.Records, function (index, record) {
                             
                            var _sDollarAmt =  "$" +  addCommasToNumber(record.Price) + " |";
                             
                            var _sMiles = " " + addCommasToNumber(record.Mileage) + " Miles ";
                             
                            _sHTML += '<li id="' + record.VinID +'" class="AutlotSearchResult_Record">\n<a href="#">\n';
                            _sHTML += '<img class="AutoLotListImage" alt="" src="' + m_sAutoLotMobileWebImageService +'?VinID='+ record.VinID +'&ImgNum=1">\n';
                            _sHTML += '<div class="AutoLotListItem"><span class="AutoLotListLabel">' + record.Year + ' ' + record.Make + ' ' + record.Model + '</span></div>\n';
                            _sHTML += '<div class="AutoLotListItem"><span class="AutoLotListLabel"></span><span class="AutoLotListText">' + _sDollarAmt + '</span><span class="AutoLotListText">' + _sMiles + '</span></div>';
                            _sHTML += '<div class="AutoLotListItem"><span class="AutoLotListLabel">Color: </span><span class="AutoLotListText">' + record.ExtColor + '</span></div>\n';
                            _sHTML += '<div class="AutoLotListItem"><span class="AutoLotListLabel">Status: </span><span class="AutoLotListText">' + record.Status + '</span></div>\n';
                            _sHTML += '<div class="AutoLotListItem"><span class="AutoLotListText">' + record.Location + '</span></div>\n';
                            
                            _sHTML += '</a>\n</li>\n';
                                                        
                         });
                                  
                        
                         $('#AutoLot_ResultList').html(_sHTML).listview("refresh");
                         
                         if(this.get_CurrentPage() > 1)
                         {
                                 //make prev button visable
                                 $('#AutolotPrevCmd').show();
                         }
                         else $('#AutolotPrevCmd').hide();
                         
                         if(this.get_CurrentPage() < this.get_MaxNumberOfPages())
                         {
                             //make next button visable
                             $('#AutolotNextCmd').show();                                     
                         }
                         else
                         {
                             $('#AutolotNextCmd').hide();                            
                         }
                         
                         //lets activate the cliek events for selecting records.
                         
                         this.Activate_Events();
                       
                         
     },
     /***
      * function:Activate_Events
      * 
      * This will activate the click event when users selects a record
      * 
      * @returns {undefined}
      */
     Activate_Events:function()
     {
         $("li").unbind('click');
                
         $("li").click(function()
         {
             
             AutoLotSearchResults.prototype.set_VinIDSelected($(this).attr("id"));
             
             $(':mobile-pagecontainer').pagecontainer('change','#AutoLotDetailInfoPage', {             
                showLoadMsg: true
             });  
                    
         });
         
         $('#AutolotNextCmd').unbind('click');    
         $('#AutolotNextCmd').click(function()
         {
             AutoLotSearchResults.prototype.NextPage();
             AutoLotSearchResults.prototype.ShowRecords();
             
         });
         
         $('#AutolotPrevCmd').unbind('click');    
         $('#AutolotPrevCmd').click(function()
         {
             AutoLotSearchResults.prototype.PrevPage();
             AutoLotSearchResults.prototype.ShowRecords();
         });
         
         
         $('#AutolotNewSearchCmd').unbind('click');    
         $('#AutolotNewSearchCmd').click(function()
         {
             $(':mobile-pagecontainer').pagecontainer('change','#page1', {             
                showLoadMsg: true
             });  
             
         });
         
         
     }
     
 
     
 };