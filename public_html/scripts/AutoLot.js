 
$(document).ready(onReadyEvents);

var m_oAutoLotSearch = null;
var m_oAutoLotSearchResults = null;
/******************************************************
     Name: onReadyEvents
     Paramters: 
     Returns: N/A

     Description:  Will fire all on ready events when page is complete
                   Loaded.

    *******************************************************/
  function onReadyEvents()
  {
      //Note found that some browsers call this 
      //if any part of the DOM is refreshed.                 
            
      InitEvents();
                  
      return true;
  }
  
 /******************************************************
     Name: InitEvents
     Paramters: 
     Returns: N/A

     Description:  Used to Initialize varables and functinos

  *******************************************************/
  function InitEvents()
  {     
     
     if (window.location.href.indexOf('#')>=0) {         
        
         window.location.href =  window.location.href.substring(0, window.location.href.indexOf('#'));
     } 
     
     InitPageChangeEvents();
     
     showwaitgraphic();
     
     disablepage();
     
     AutoLotSearchPage();
     
    
  }
  
  function InitPageChangeEvents()
  {
      $(document).on("pagebeforeshow","#page1",function(){  
              AutoLotSearchPage();
             
      });
      
      $(document).on("pagebeforeshow","#AutoLotSearchResults",function(){ // When entering pagetwo 
               AutoLotSearchResultsPage();
                
      });      
      $(document).on("pagebeforeshow","#AutoLotDetailInfoPage",function(){ // When entering pageThree
               
               AutoLotDetailInfoPage();
                
      }); 
      
  }
  
  function showwaitgraphic()
  {
      $('#AutoLotWaitGraphic').show();
  }
  
  function hidewaitgraphic()
  {
      $('#AutoLotWaitGraphic').fadeOut('1000');
  }
  
  function AutoLotSearchPage()
  {
     m_oAutoLotSearch = new AutoLotSearch();
     
     m_oAutoLotSearch.InitDefaultPricing();
           
     m_oAutoLotSearch.InitLocationDropDown(function() { 
                         hidewaitgraphic();
                         enablepage();
     },function() {});  
     
  }
  
  function AutoLotSearchResultsPage()
  {
      // The user is returning from the detail page so no reason to recreate the object.
      if(m_oAutoLotSearchResults !== null && m_oAutoLotSearchResults !== undefined)
          if(m_oAutoLotSearchResults.m_oAutoLotDetailInfo.get_ReturnToResults())
              return;
          
      m_oAutoLotSearchResults = new AutoLotSearchResults(m_oAutoLotSearch.m_iEndPrice,m_oAutoLotSearch.m_sMakesText,m_oAutoLotSearch.m_sModelsText,m_oAutoLotSearch.m_sSitesText,function() {},function() {});
      
      m_oAutoLotSearchResults.ShowRecords(function() {},function() {});
      
  }
  
  function AutoLotDetailInfoPage()
  {
       m_oAutoLotSearchResults.m_oAutoLotDetailInfo = new AutoLotDetailInfo(m_oAutoLotSearchResults.get_VinIDSelected(),function(){},function(){});
  }
  
   
  
 
   
