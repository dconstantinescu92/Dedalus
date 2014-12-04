shoppingApp.controller('ListController', ['$scope','$http','$location', function($scope,$http,$location) {

//filtru de cautare
    $scope.startsWith = function (actual, expected) {
        var lowerStr = (actual + "").toLowerCase();
        return lowerStr.indexOf(expected.toLowerCase()) === 0;
    }


    $http({url: 'http://localhost:8080/api/produse', method: 'GET'})
        .success(function (data) {
            $scope.shoppingList = data;

        });


    $scope.adauga = function (Prod) {
        $scope.varShow = false;
        $http({url: 'http://localhost:8080/api/produse', method: 'POST', data: Prod}).
            success(function () {

                $http({url: 'http://localhost:8080/api/produse', method: 'GET'})
                    .success(function (data) {
                        $scope.shoppingList = data;

                    });


            });
        $scope.Prod={};
    };


    $scope.sterge = function () {
        for (var i = 0; i < $scope.shoppingList.length; i++) {
            if ($scope.shoppingList[i].check == "strikeout") {
                console.log($scope.shoppingList[i]._id);
                $http({url: 'http://localhost:8080/api/produse/' + $scope.shoppingList[i]._id, method: 'DELETE'})
                    .success(function () {
                        $http({url: 'http://localhost:8080/api/produse', method: 'GET'})
                            .success(function (data) {
                                $scope.shoppingList = data;
                            });
                    });
            }
        }
    };


    $scope.salveaza = function (prod, name, quantity) {//salveaza editare
            console.log(name);

        for (var i = 0; i < $scope.shoppingList.length; i++) {
            if ($scope.shoppingList[i].name == prod.name) {
                $http({url: 'http://localhost:8080/api/produse/'+$scope.shoppingList[i]._id, method: 'PUT', data:{name: name, quantity:quantity}})
                    .success(function () {
                        $http({url: 'http://localhost:8080/api/produse', method: 'GET'})
                            .success(function (data) {
                                $scope.shoppingList = data;
                            });
                    });
            }
        }
    };


    var strikedProd = []; //lista produse bifate
//    var shoppingList = [
//    {
//        name: 'Sky',
//        quantity: 3,
//        check: 0,
//        edit: true
//    },
//    {
//        name: 'Cagula',
//        quantity: 3,
//        check: 0,
//        edit: true
//    },
//    {
//        name: 'Casca Sky',
//        quantity: 1,
//        check: 0,
//        edit: true
//    },
//    {
//        name: 'Clapari',
//        quantity: 2,
//        check: 0,
//        edit: true
//    },
//    {
//        name: 'Placa',
//        quantity: 1,
//        check: 0,
//        edit: true
//    },
//    {
//        name: 'Geaca',
//        quantity: 3,
//        check: 0,
//        edit: true
//    }
//    ,
//    {
//        name: 'Manusi',
//        quantity: 4,
//        check: 0,
//        edit: true
//    }
//
//];
    //  $scope.shoppingList=shoppingList;

    $scope.Prod = {
        name: '',
        quantity: ''
    };
    $scope.formVisibilty = false;

    $scope.varShow = false;//pentru expandare +
    $scope.show = function () {
        $scope.varShow = !$scope.varShow;

    };


    $scope.showEdit = function (shop) {
        console.log(shop)
        shop.edit = false;


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
    };

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

