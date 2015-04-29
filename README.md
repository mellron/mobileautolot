# mobileautolot

USE [DougTemp]
GO
 
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

    Declare @iLoop           INT
    Declare @sVinID          varchar(50)
    Declare @sOldVinID       varchar(50)
    Declare @iVehicleImageID INT
          
    DECLARE db_cursor CURSOR FOR  
    Select VinID,
           VehicleImageID
    From VehicleImages
   
    OPEN db_cursor   
    FETCH NEXT FROM db_cursor INTO @sVinID,@iVehicleImageID   
    
    SELECT @iLoop = 0,@sOldVinID = @sVinID
            
    WHILE @@FETCH_STATUS = 0   
    BEGIN   
        
      SELECT @iLoop = @iLoop + 1
      
      UPDATE dbo.VehicleImages Set dbo.VehicleImages.ImageNumber = @iLoop
      WHERE dbo.VehicleImages.VinID = @sVinID AND
            dbo.VehicleImages.VehicleImageID = @iVehicleImageID   


      FETCH NEXT FROM db_cursor INTO @sVinID,@iVehicleImageID   
      
      if(@sOldVinID != @sVinID)
      BEGIN
         SELECT @iLoop = 0,@sOldVinID = @sVinID
      END
      
   END   

CLOSE db_cursor   
DEALLOCATE db_cursor
GO

Select * from dbo.VehicleImages
