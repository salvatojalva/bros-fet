var myApp = angular.module('Jfet',[]);

myApp.controller('DirectaController', ['$scope', function($scope) {
    $scope.circuito = {
        V: {
            vp: null,
            vgs: null,
            vrs: null,
            vrd: null,
            vjfet: null,
            vdd: null
        },
        R: {
            rd: null
        },
        P: {
            prd: null,
            pjfet: null,
            vdd:null
        }, 
        I: {
            idss: null,
            id: null
        }
    };

    $scope.calcular = function() {
        $scope.temporal_V = ( (- $scope.circuito.V.vgs) / (- $scope.circuito.V.vp) );

        $scope.circuito.I.id = $scope.circuito.I.idss * ( 1 - (2 * (1 * $scope.temporal_V) ) + ($scope.temporal_V * $scope.temporal_V) );

        $scope.circuito.V.vrd = $scope.circuito.R.rd * $scope.circuito.I.id;
        $scope.circuito.P.prd = $scope.circuito.V.vrd * $scope.circuito.I.id;

        $scope.circuito.V.vjfet = $scope.circuito.V.vdd - $scope.circuito.V.vrd;
        $scope.circuito.P.pjfet = $scope.circuito.V.vjfet * $scope.circuito.I.id;

        $scope.circuito.P.vdd = $scope.circuito.V.vdd * $scope.circuito.I.id;
    }

    

}]);

myApp.controller('AutopolarizacionController', ['$scope', function($scope) {

    $scope.circuito = {
        V: {
            vp: null,
            vgs: null,
            vrs: null,
            vrd: null,
            vjfet: null,
            vdd: null
        },
        R: {
            rd: null,
            rs: null
        },
        P: {
            prd: null,
            prs: null,
            pjfet: null,
            vdd:null
        }, 
        I: {
            idss: null,
            id: null,
            id_1: null,
            id_2: null

        }
    };

    $scope.calcular = function() {


        $scope.temporal_V = ( (- $scope.circuito.R.rs ) / (- $scope.circuito.V.vp) );


        $scope.a = ($scope.temporal_V * $scope.temporal_V)* $scope.circuito.I.idss ;
        $scope.b = (- (2 * (1 * $scope.temporal_V))* $scope.circuito.I.idss)-1;
        $scope.c = 1 * $scope.circuito.I.idss;

        $scope.circuito.I.id_1 = ( - $scope.b + Math.sqrt(($scope.b*$scope.b)- (4*$scope.a*$scope.c) )) / (2*$scope.a);
        $scope.circuito.I.id_2 = ( - $scope.b - Math.sqrt(($scope.b*$scope.b)- (4*$scope.a*$scope.c) )) / (2*$scope.a);
        
        $scope.circuito.I.id = $scope.circuito.I.id_2;
        
        if($scope.circuito.I.id_1 < $scope.circuito.I.id_2){
            $scope.circuito.I.id = $scope.circuito.I.id_1;
        }

        $scope.circuito.V.vds = $scope.circuito.V.vdd - ($scope.circuito.I.id  * ($scope.circuito.R.rd + $scope.circuito.R.rs));
        
        $scope.circuito.V.vrd = $scope.circuito.R.rd * $scope.circuito.I.id;
        $scope.circuito.P.prd = $scope.circuito.V.vrd * $scope.circuito.I.id;

        $scope.circuito.V.vrs = $scope.circuito.R.rs * $scope.circuito.I.id;
        $scope.circuito.P.prs = $scope.circuito.V.vrs * $scope.circuito.I.id;

        $scope.circuito.V.vjfet = $scope.circuito.V.vdd - $scope.circuito.V.vrd - $scope.circuito.V.vrs;
        $scope.circuito.P.pjfet = $scope.circuito.V.vjfet * $scope.circuito.I.id;

        $scope.circuito.P.vdd = $scope.circuito.V.vdd * $scope.circuito.I.id;
    }
}]);

myApp.controller('DivisionController', ['$scope', function($scope) {

    $scope.circuito = {
        V: {
            vp: null,
            vgs: null,
            vrs: null,
            vrd: null,
            vjfet: null,
            vdd: null,
            r1: null,
            r2: null
        },
        R: {
            rd: null,
            rs: null,
            r1: null,
            r2: null
        },
        P: {
            prd: null,
            prs: null,
            pjfet: null,
            vdd:null,
            r1: null,
            r2: null
        }, 
        I: {
            idss: null,
            id: null,
            id_1: null,
            id_2: null,
            idR: null
        }
    };
    console.log("pinshis vida");
    $scope.calcular = function(){
        $scope.temporal_V = ( (- $scope.circuito.R.rs ) / (- $scope.circuito.V.vp) );
        console.log($scope.temporal_V);
        $scope.resistencia_total =  $scope.circuito.R.r2 / ($scope.circuito.R.r1 + $scope.circuito.R.r2);

        $scope.temporal_V1 = $scope.resistencia_total * $scope.circuito.V.vdd;

        $scope.temporal_V2 = 1 - ($scope.temporal_V1 /  - $scope.circuito.V.vp) ;

        $scope.a = ($scope.temporal_V * $scope.temporal_V) * $scope.circuito.I.idss ;
        $scope.b = ( - (2 * ($scope.temporal_V2  * $scope.temporal_V)) * $scope.circuito.I.idss) - 1;
        $scope.c = ($scope.temporal_V2 * $scope.temporal_V2) * $scope.circuito.I.idss;

        $scope.circuito.I.id_1 = ( - $scope.b + Math.sqrt(($scope.b*$scope.b)- (4*$scope.a*$scope.c) )) / (2*$scope.a);
        $scope.circuito.I.id_2 = ( - $scope.b - Math.sqrt(($scope.b*$scope.b)- (4*$scope.a*$scope.c) )) / (2*$scope.a);
        
        $scope.circuito.I.id = $scope.circuito.I.id_2;
        
        if($scope.circuito.I.id_1 < $scope.circuito.I.id_2){
            $scope.circuito.I.id = $scope.circuito.I.id_1;
        }

        $scope.circuito.V.vds = $scope.circuito.V.vdd - ($scope.circuito.I.id  * ($scope.circuito.R.rd + $scope.circuito.R.rs));
        

        $scope.circuito.I.idR = $scope.circuito.V.vdd / ($scope.circuito.R.r1 + $scope.circuito.R.r2);
        $scope.circuito.V.r1 = $scope.circuito.R.r1 * $scope.circuito.I.idR;
        $scope.circuito.P.r1 = $scope.circuito.V.r1 * $scope.circuito.I.idR;

        $scope.circuito.V.r2 = $scope.circuito.R.r2 * $scope.circuito.I.idR;
        $scope.circuito.P.r2 = $scope.circuito.V.r2 * $scope.circuito.I.idR;

        $scope.circuito.V.vrd = $scope.circuito.R.rd * $scope.circuito.I.id;
        $scope.circuito.P.prd = $scope.circuito.V.vrd * $scope.circuito.I.id;

        $scope.circuito.V.vrs = $scope.circuito.R.rs * $scope.circuito.I.id;
        $scope.circuito.P.prs = $scope.circuito.V.vrs * $scope.circuito.I.id;

        $scope.circuito.V.vjfet = $scope.circuito.V.vdd - $scope.circuito.V.vrd - $scope.circuito.V.vrs;
        $scope.circuito.P.pjfet = $scope.circuito.V.vjfet * $scope.circuito.I.id;

        $scope.circuito.P.vdd = $scope.circuito.V.vdd * $scope.circuito.I.id;
    }

}]);