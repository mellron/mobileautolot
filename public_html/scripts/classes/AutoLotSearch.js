 
 AutoLotSearch = function()
 {            
     this.m_iMaxRows = 12;
     
     this.m_iEndPrice;
     this.m_sMakes;
     this.m_sModels;
     this.m_sSites;
     this.m_sMakesText;
     this.m_sModelsText;
     this.m_sSitesText;
     
     AutoLotSearch.prototype.m_othis = this;
          
 };
    
 AutoLotSearch.prototype = {
     
     InitPage:function()
     {        
         
         showwaitgraphic();
     
         disablepage();
     
         this.InitDefaultPricing();
     
         this.InitLocationDropDown(function() { 
                              hidewaitgraphic();
                              enablepage();
         },function() {});   
     },
 
    get_EndPrice:function()
    {
        
        this.m_iEndPrice =  $('#AutoLot_MaxPrice :selected').attr('value').toString();
             
        return this.m_iEndPrice;
        
    },
    get_Makes:function()
    {
        this.m_sMakes = $('#AutoLot_Makes :selected').attr('value').toString();
        this.m_sMakesText = $('#AutoLot_Makes :selected').text();
        
        if(this.m_sMakesText.substr(0,3) === "All") this.m_sMakesText = "";
        
        return this.m_sMakes;
    },
    get_Models:function()
    {
        this.m_sModels = $('#AutoLot_Models :selected').attr('value').toString();
        this.m_sModelsText = $('#AutoLot_Models :selected').text();
        
        if(this.m_sModelsText.substr(0,3) === "All") this.m_sModelsText = "";
        
        return this.m_sModels;
    },
    get_Sites:function()
    {
        this.m_sSites = $('#AutoLot_Locations :selected').attr('value').toString();
        this.m_sSitesText = $('#AutoLot_Locations :selected').text();
        
        if(this.m_sSitesText.substr(0,3) === "All") this.m_sSitesText = "";
         
        return this.m_sSites;
    },
  
    InitDefaultPricing:function()
    {
      var _sHTML = '<option value="0" selected>No Max Price</option>\n'; 

      for(_iLoop=1000;_iLoop < 100001;_iLoop+=1000)
      {                   
          _sHTML += '<option value="' + _iLoop.toString() + '">$' + addCommasToNumber(_iLoop.toString()); + '</option>\n'; 
      }
      
      $('#AutoLot_MaxPrice').html(_sHTML).trigger('create');
    },
  
   /***
    * 
    * @param {type} function_success
    * @param {type} function_error
    * @returns {undefined}
    */
   InitLocationDropDown:function(function_success,function_error)
   {
      this.InitMakeDropDown();
            
       var _search = new DBSearch;

       _search.getValidLocations(function(records) {

                         var _oRecords      = $.parseJSON(records.d);
                         var _sHTML = '<option value="-1" selected>All Locations</option>\n';                     
                          
                         $.each(_oRecords.Records, function (index, record) {
                            _sHTML += '<option value="' + record.LocationID + '">' + record.LocationDESC + '</option>\n';	          	                     
                         });  
                                                                             
                          $('#AutoLot_Locations').html(_sHTML).selectmenu('refresh',true);
                          
                          AutoLotSearch.prototype.m_othis.PopulateMakeDropDown('-1',function() {},function() {});
                          
                          AutoLotSearch.prototype.m_othis.InitDropDownEvents();
                          
                          function_success();
                                                                                                                                                                                   
                         },function() {
                            
                            function_error();
                            
                         });        
      
  },
  /***
   * 
   * @returns {undefined}
   */
  InitDropDownEvents:function()
  {
     
    $('#AutoLot_Makes').bind("change",function(){
        
        AutoLotSearch.prototype.m_othis.PopulateModelDropDown(AutoLotSearch.prototype.m_othis.get_Sites(),
                              $('#AutoLot_Makes :selected').attr('value').toString(),function(){
                                  
                              },function(){
                                  
                              }); 
    });
    
    $('#AutoLot_Models').bind("change",function(){
        
    });
    
    $('#AutoLot_Locations').bind("change",function(){
        
           AutoLotSearch.prototype.m_othis.PopulateMakeDropDown(AutoLotSearch.prototype.m_othis.get_Sites(),function()
           {
               
           },
           function() {});

          
    });
    
    // you have to unbind buttons or it just keeps on getting added to the stack.
    $('#AutolotSearchCmd').unbind('click');
    
    $('#AutolotSearchCmd').click(function() {
         
         AutoLotSearch.prototype.m_othis.get_EndPrice();
         AutoLotSearch.prototype.m_othis.get_Makes();
         AutoLotSearch.prototype.m_othis.get_Models();
         AutoLotSearch.prototype.m_othis.get_Sites();
                              
        $(':mobile-pagecontainer').pagecontainer('change', '#AutoLotSearchResults', {             
            showLoadMsg: true
        });
        
        
    });
       
  },
  
  /***
   * 
   * @returns {undefined}
   */
  InitMakeDropDown:function()
  {
     var _sHTML = '<option value="-1" selected>All Makes</option>\n'; 
 
     $('#AutoLot_Makes').html(_sHTML).selectmenu('refresh',true);
      
     this.InitModelDropDown();
      
  },
  /***
   * 
   * @returns {undefined}
   */
  InitModelDropDown:function()
  {
       var _sHTML = '<option value="-1" selected>All Models</option>\n';  
       
       $('#AutoLot_Models').html(_sHTML).selectmenu('refresh',true);
      
  },
  
  
/***
 * 
 * @param {type} iLocationID
 * @param {type} function_Success
 * @param {type} function_Error
 * @returns {undefined}
 */
  PopulateMakeDropDown:function(iLocationID,function_Success,function_Error)
  {
       this.InitModelDropDown();
       
       if(iLocationID < 1)
       {          
           
           this.InitMakeDropDown();
           
           iLocationID = '-1';
                  
       }
       
       var _search = new DBSearch;

      _search.getMakes(iLocationID,function(records) {

                         var _oRecords      = $.parseJSON(records.d);
                         var _sHTML = '<option value="-1" selected>All Makes</option>\n';                     
                          
                         $.each(_oRecords.Records, function (index, record) {
                            _sHTML += '<option value="' + record.MakeID + '">' + record.Make + '</option>\n';	          	                     
                         });  
                         
                         // $('#AutoLot_Makes').html(_sHTML).trigger('create');
                          $('#AutoLot_Makes').html(_sHTML).selectmenu('refresh',true);
                          function_Success();
                          
                         },function() {
                          
                             function_Error();
                             
                         });                    
  },
  
/***
 * 
 * @param {type} iLocationID
 * @param {type} iMakeID
 * @param {type} function_Success
 * @param {type} function_Error
 * @returns {undefined}
 */
  PopulateModelDropDown:function(iLocationID,iMakeID,function_Success,function_Error)
  {            
      
       if(iMakeID < 1)
       {
           function_Success();
                     
           this.InitModelDropDown();
           
           return;           
       }
                        
       if(iLocationID < 1)
           iLocationID = '-1';
       
       var _search = new DBSearch;

      _search.getModels(iLocationID,iMakeID,function(records) {

                         var _oRecords      = $.parseJSON(records.d);
                         var _sHTML = '<option value="-1" selected>All Models</option>\n';                     
                          
                         $.each(_oRecords.Records, function (index, record) {
                            _sHTML += '<option value="' + record.ModelID + '">' + record.Model + '</option>\n';	          	                     
                         });  
                         
                       //   $('#AutoLot_Models').html(_sHTML).trigger('create');
                          $('#AutoLot_Models').html(_sHTML).selectmenu('refresh',true);
                          function_Success();
                                                                                                                                                         
                         },function() {
                            function_Error();
                         });  
  },
  
  SearchForAutos:function(iEndPrice,sMakes,sModels,sSites,function_Success,function_Error)
  {
      m_oAutoLotSearchResults = new AutoLotSearchResults(iEndPrice,sMakes,sModels,sSites,function_Success,function_Error);
      
      m_oAutoLotSearchResults.ShowRecords(function_Success,function_Error);
                   
  }
  
 /* BuildAutoList:function(records)
  {
       var _oRecords  = $.parseJSON(records.d);
       
                         var _sHTML = '<option value="-1" selected>All Models</option>\n';                     
                          
                         $.each(_oRecords.Records, function (index, record) {
                            _sHTML += '<option value="' + record.ModelID + '">' + record.Model + '</option>\n';	          	                     
                         }); 
      
  }*/
     

 };