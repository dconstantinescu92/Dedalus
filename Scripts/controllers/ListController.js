shoppingApp.controller('ListController', ['$scope', function($scope) {

//filtru de cautare
    $scope.startsWith = function (actual, expected) {
        var lowerStr = (actual + "").toLowerCase();
        return lowerStr.indexOf(expected.toLowerCase()) === 0;
    }

    var strikedProd= []; //lista produse bifate
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

    $scope.varShow=false;//pentru expandare +
    $scope.show = function() {
         $scope.varShow=!$scope.varShow;

    };

    $scope.varShowEdit=false; //editare produs
    $scope.showEdit = function(shop) {
        shop.edit=false;


    };


    $scope.adauga = function (prod) {//adaugare produs
        shoppingList.push({
            name: prod.name,
            quantity: prod.quantity,
            check: 0,
            edit: true
        });
    };

    $scope.salveaza = function (prod, name, quantity) {//salveaza editare

        for(var i=0;i<shoppingList.length;i++)
        {
            if(shoppingList[i].name==prod.name)
            {
                shoppingList[i].name=name;
                shoppingList[i].quantity=quantity;
            }
        }
};

    $scope.sterge= function () {//stergere produse bifate
        for(i=0; i<shoppingList.length;i++){
            for (j=0; j<strikedProd.length;j++){
                if(shoppingList[i].name==strikedProd[j].name) shoppingList.splice(i,1);
            }

        }

    };

    $scope.checkProd = function (Prod) {
        if (Prod.check == 0) {
            Prod.check = "strikeout";
            strikedProd.push(Prod);//adaugare la lista de produse bifate
        }
        else if (Prod.check == "strikeout") {
            Prod.check = 0, strikedProd.pop(Prod);
        }
        console.log(strikedProd);
    }



}]);

shoppingApp.directive("ListaInregistrari", [
    function(){
    return{
        restrict: "E",
        templateUrl: "/Templates/listadecumparaturi.html",
        scope: {shoppingList: '= shoppingList'
        },

        link: function (scope) {
            scope.name=shop.name;

            console.log("HERE")

        }
    }
}]);

