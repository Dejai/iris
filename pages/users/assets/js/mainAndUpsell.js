var app = angular.module("myApp", []);

app.controller("myCtrl", function($scope){

	$scope.choicesSetupButton = "Save Choices";
	$scope.mainOrders = $scope.upsellOrders = $scope.mainRevenue = $scope.upsellRevenue = $scope.comboOrders = $scope.comboRevenue = 0;
	$scope.shown = false;

	$scope.choices = [];

	$scope.startCustomerExperience = function(){
		$scope.customerExperience = true;
	}

	$scope.showInstructions = function(){
		if ($scope.shown){
			document.getElementById("instructions").style.opacity = "0";
		} else {
			document.getElementById("instructions").style.opacity = "1";
		}
		$scope.shown = !$scope.shown;		
	}


	$scope.addChoice = function(){
		var obj = {};
		obj["choiceCode"] = $scope.newChoiceCode;
		obj["choicePrice"] = $scope.newChoicePrice;
		obj["choiceType"] = $scope.newChoiceType;
		obj["purchases"] = 0;
		$scope.newChoiceCode = "";
		$scope.newChoicePrice = "";
		$scope.newChoiceType = "";
		$scope.choices.push(obj);
	}

	$scope.validateMain = function(){
		var selectedMain = document.querySelectorAll("input[name='mainChoice']:checked");
		if (selectedMain.length > 0){
			$scope.mainBought = true;
			$scope.mainError = false;
		} else {
			$scope.mainError = true;
		}
		
	}

	$scope.validateUpsells = function(){
		var selectedUpsell = document.querySelectorAll("input[name='upsellChoice']:checked");
		if (selectedUpsell.length > 0){
			$scope.completeOrder();
			$scope.upsellError = false;
		} else {
			$scope.upsellError = true;
		}
	}

	$scope.resetMains = function(){
		var inputs = document.getElementsByName("mainChoice");
		for (var x = 0; x < inputs.length; x++){
			inputs[x].checked = false;
		}
	}

	$scope.resetUpsells = function(){
		var inputs = document.getElementsByName("upsellChoice");
			for (var x = 0; x < inputs.length; x++){
			inputs[x].checked = false;
		}
	}

	$scope.noUpsells = function(){
		$scope.upsellError = false;
		$scope.resetUpsells();
		$scope.completeOrder();
	}

	$scope.getChoiceIndex = function(choiceCode){
		var index = -1;
		for (var x = 0; x < $scope.choices.length; x++){
			if ($scope.choices[x].choiceCode == choiceCode){
				return x;
			}
		}
	}

	$scope.completeOrder = function(){
		var index;
		var selectedMain = document.querySelectorAll("input[name='mainChoice']:checked");
		var selectedUpsell = document.querySelectorAll("input[name='upsellChoice']:checked");

		if (selectedUpsell.length > 0){
			index = $scope.getChoiceIndex(selectedUpsell[0].value);
		} else {
			index = $scope.getChoiceIndex(selectedMain[0].value);
		}

		$scope.choices[index].purchases++;
		var type = $scope.choices[index].choiceType;
		var price = $scope.choices[index].choicePrice;
		if (type == "Main"){
			$scope.mainOrders++;
			$scope.mainRevenue += price;
		} else {
			$scope.upsellOrders++;
			$scope.upsellRevenue += price;
		}
		$scope.comboOrders = $scope.mainOrders + $scope.upsellOrders;
		$scope.comboRevenue = $scope.mainRevenue + $scope.upsellRevenue;
		$scope.funnelComplete = true;
	}
	
	$scope.newOrder = function(){
		$scope.funnelComplete = false;
		$scope.mainBought = false;
		$scope.resetMains();
		$scope.resetUpsells();			
	}
});