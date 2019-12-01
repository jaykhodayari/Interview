
phoneApp.controller("phoneCtrl",  ['$scope', '$http', function($scope,$http) {

	
	$scope.phoneNumber="301-555-4534";
   $scope.limitOptions = [5, 10];

    


   
    $scope.getPhoneInfo=function(){
    	$scope.reset();
    	if ($scope.phoneNumber){
	    	
	    	$scope.getData();
    	}
    
    		

    	
    }
    
    //reset data
    $scope.reset=function(){
    	
    	$scope.phoneCombinations=[];	
        $scope.totalcount = 0;
        $scope.previousPage=0;
    	$scope.showPagination=true;
    	$scope.memoryOrServer="";
    	
        $scope.options = {
          rowSelection: true,
          multiSelect: true,
          autoSelect: true,
          decapitate: false,
          largeEditDialog: false,
          boundaryLinks: false,
          limitSelect: true,
          pageSelect: true
        };
        
        $scope.query = {
      	      order: 'name',
      	      limit: 10,
      	      page: 1
      	    };
        
    }
    
    
    //get data from server
	$scope.getData = function () {
	 
	     $http({
	        method: 'GET',
	        url: 'api/phones/'+$scope.phoneNumber.replace(/-/g,'')+ "/" + $scope.query.page + "/" +  $scope.query.limit 
	    }).then(function (response) {
	    	var phoneInfo={};
	    	phoneInfo = response.data;
	    	
	        $scope.phoneCombinations.push.apply($scope.phoneCombinations,phoneInfo.alphaNumCombs); 
	        $scope.totalcount =phoneInfo.total ;
	        
	        var p= "abcd";
	    }).catch(function (response) {
	
	        var msg = "";
	  
	    });
	}
	
	//process pagination
	$scope.processPagination = function (page, limit) {
			// only pull if there is not enough data in memory
			if ($scope.phoneCombinations.length< $scope.query.page * $scope.query.limit && $scope.phoneCombinations.length <$scope.totalcount){
				$scope.memoryOrServer="Pulling from server";
				$scope.showPagination=false;
				$scope.getData();
				$scope.previousPage++;
				$scope.showPagination=true;
			}
			else if (page==$scope.previousPage)
				{
					$scope.memoryOrServer="Using local data";
					$scope.previousPage--;
				}
			else
			{
				$scope.memoryOrServer="Using local data";
				$scope.previousPage++;
			}
		   // console.log('page: ', page);
		   // console.log('previousPage: ', $scope.previousPage);
		    
		    
		  }
	
	

	
	//reset
	 $scope.reset();
	
	// load data
    $scope.getData();
    
 
	
    	
    	
}]);
