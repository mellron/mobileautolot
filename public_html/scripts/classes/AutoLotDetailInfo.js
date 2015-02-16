  
 
 AutoLotDetailInfo = function(sVin,function_Success,function_Error)
 {            
 
     this.m_ofunction_Success = function_Success;
     this.m_ofunction_Error   = function_Error;
     this.m_sVin              = sVin;
     this.m_bReturnToResults  = false;
                    
     AutoLotDetailInfo.prototype.m_othis = this;
          
     AutoLotDetailInfo.prototype.m_othis.InitEvents();
          
 };
    
 AutoLotDetailInfo.prototype = {
     
     InitPage:function()
     {
      //  $(':mobile-pagecontainer').pagecontainer('change', '#AutoLotDetailInfoPage', {             
       //     showLoadMsg: true
       // });
                    
     },
     
     /***
      * InitEvents
      * @returns {undefined}
      */
     InitEvents:function()
     {
                  
         // alert(this.m_sVin);
          
          this.InitPage();
          this.QueryVin();
         
     },     
     set_ReturnToResults:function(bValue)
     {
         AutoLotDetailInfo.prototype.m_othis.m_bReturnToResults = bValue;
     },
     get_ReturnToResults:function()
     {
         return AutoLotDetailInfo.prototype.m_othis.m_bReturnToResults;
     },
     get_Vin:function()
     {
         return AutoLotDetailInfo.prototype.m_othis.m_sVin;
     },
     
     QueryVin:function()
     {
          var _search = new DBSearch;
          
          _search.getAutoByVinID(AutoLotDetailInfo.prototype.get_Vin(),function(records) {
              
              AutoLotDetailInfo.prototype.DisplayRecord(records);
              
          },
          function()
          {
              //error no record exists;
              
          });
          
     },
     DisplayRecord:function(records)
     {
        try
        {
          var _oRecords  = $.parseJSON(records.d);
                               
          if(_oRecords.Records.length < 1) return;
                                                                                                                          
          $.each(_oRecords.Records, function (index, record) {              
              AutoLotDetailInfo.prototype.DisplayAutoHeaderInfo(record) ;    
              AutoLotDetailInfo.prototype.DisplayAutoImage();
              AutoLotDetailInfo.prototype.SetupButtonEvents();
          });
        } catch(err)
        {
            return;
        }
      
                                  
     },
     DisplayAutoHeaderInfo:function(record)
     {               
         try
         {
          $("#AutoLotDetail_Year").text(record.YearNBR);
          $("#AutoLotDetail_Make").text(record.MakeNM);
          $("#AutoLotDetail_Model").text(record.ModelNM);
          
      
          
          $("#AutoLotDetail_Mileage_Header").text(" | " + addCommasToNumber(record.MileageNBR) + "mi");
          $("#AutoLotDetail_Price_Header").text(addCommasToNumber("$" + RoundFloats2Dec(record.PriceAMT)));
     
          
         }
         catch(err)
         {
             return;
         }      
    
     },
     DisplayAutoImage:function()
     {
      //   $("#AutoLotDetail_Image").html('<img class="AutoLotDetail_Image" alt="" src="' + m_sAutoLotMobileWebImageService +'?VinID='+ AutoLotDetailInfo.prototype.get_Vin() +'&ImgNum=1">');
       $('.AutoLotDetail_Image').attr('src',m_sAutoLotMobileWebImageService +'?VinID='+ AutoLotDetailInfo.prototype.get_Vin() +'&ImgNum=1');
     },
     
     SetupButtonEvents:function()
     {
         
        $('#AutoLotDetail_BackToResults').unbind('click');
        $('#AutoLotDetail_BackToResults').click(function()
        {
           AutoLotDetailInfo.prototype.set_ReturnToResults(true);
           
           $(':mobile-pagecontainer').pagecontainer('change','#AutoLotSearchResults', {             
                showLoadMsg: true
           });   
           
        });
        
        //Go back to first page
        $('#AutoLotDetail_NewSearchCmd').unbind('click');
        $('#AutoLotDetail_NewSearchCmd').click(function(){
                    
             $(':mobile-pagecontainer').pagecontainer('change','#page1', {             
                showLoadMsg: true
            });  
                
                 
         });
         
         $('#AutoLotDetail_PaymentCalc').unbind('click');
         $('#AutoLotDetail_PaymentCalc').click(function(){
                    
            // go to payment calculator page
                
                 
         });
         
        
     }
     
 };


