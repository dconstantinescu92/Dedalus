shoppingApp.controller('ListController', ['$scope', function($scope) {

var strikedProd= [];
var shoppingList = [
    {
        name: 'Sky',
        quantity: 2,
        check: 0,
        edit: true
    },
    {
        name: 'Cagula',
        quantity: 3,
        check: 0,
        edit: true
    },
    {
        name: 'Casca Sky',
        quantity: 1,
        check: 0,
        edit: true
    },
    {
        name: 'Clapari',
        quantity: 2,
        check: 0,
        edit: true
    },
    {
        name: 'Placa',
        quantity: 1,
        check: 0,
        edit: true
    },
    {
        name: 'Geaca',
        quantity: 3,
        check: 0,
        edit: true
    }
    ,
    {
        name: 'Manusi',
        quantity: 4,
        check: 0,
        edit: true
    }

];
    $scope.shoppingList=shoppingList;

    $scope.Prod={
        name: '',
        quantity: ''
    };

    $scope.varShow=false;
    $scope.show = function() {
         $scope.varShow=!$scope.varShow;

    };

    $scope.varShowEdit=false;
    $scope.showEdit = function(shop) {
        shop.edit=false;


    };


    $scope.adauga = function (prod) {
        shoppingList.push({
            name: prod.name,
            quantity: prod.quantity
        });
    };

    $scope.salveaza = function (prod, name, quantity) {

        for(var i=0;i<shoppingList.length;i++)
        {
            if(shoppingList[i].name==prod.name)
            {
                shoppingList[i].name=name;
                shoppingList[i].quantity=quantity;
            }
        }
};

    $scope.sterge= function () {
        for(i=0; i<shoppingList.length;i++){
            for (j=0; j<strikedProd.length;j++){
                if(shoppingList[i].name==strikedProd[j].name) shoppingList.splice(i,1);
            }

        }

    };

    $scope.checkProd = function (Prod) {
        if (Prod.check == 0) {
            Prod.check = "strikeout";
            strikedProd.push(Prod);
        }
        else if (Prod.check == "strikeout") {
            Prod.check = 0, strikedProd.pop(Prod);
        }
        console.log(strikedProd);
    }



}]);