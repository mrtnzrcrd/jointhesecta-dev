angular.module('jts.system').controller('HeaderController', ['$scope', 'Global', 'socket', 'Mensajes', function ($scope, Global, socket, Mensajes) {
    $scope.global = Global;

        $scope.menu = [
            {
                "title": "Modulos",
                "link": "modules"
            },
            {
                "title": "Filosofía",
                "link": "phylosofy"
            },
            {
                "title": "Hosting",
                "link": "hosting"
            },
            {
                "title": "Quiénes somos",
                "link": "whoweare"
            },
            {
                "title": "Contactanos",
                "link": "contact"
            }
        ];

        if ($scope.global.user != null) {

            $scope.countMesssage = function () {
                Mensajes.get({
                    mensajeId: $routeParams.mensajeId
                }, function(mensaje) {
                    $scope.mensaje = mensaje;
                });
            }

            /*socket.emit('userMessage', {id: $scope.global.user._id});*/

            socket.on('countMessage', function (data) {
                $scope.countMessage = data.mensaje;
                console.log('header');
            });

        }

        $scope.isCollapsed = false;
    }]);