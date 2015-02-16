/* 
 * Class:      DBAccess
 * Description:
 * 
 * 
 * 
 * 
 */
function DBAccess()
{
    
    /***
     * Method : ExecuteResultSet
     * 
     * 
     */
    this.ExecuteResultSet = function(sSQL,function_Success,function_Error)
    {
        
       
        
          $.ajax({
                type: "POST",
                url: "DBAccess.aspx/ExecuteResultSet",
                data: '{sSQL:' + '"' + sSQL + '"' + '}',                
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function_Success,                           
                error: function_Error
                                                   
               });
                    
        
                    
        
        
    };
    
    /***
     * Method : ExecuteNonQuery
     * 
     * 
     */
    this.ExecuteNonQuery = function(sSQL,function_Success,function_Error)
    {
                
                  
        $.ajax({
                type: "POST",
                url: "DBAccess.aspx/ExecuteNonQuery",
                data: '{sSQL:' + '"' + sSQL + '"' + '}',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function_Success,                           
                error: function_Error
                                                   
               });                 
        
    }
    
    
}


