window.angular.module('jts.directives', [])
    .directive('validPasswordC', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function (viewValue, $scope) {
                    var noMatch = viewValue != scope.contact.password.$viewValue
                    ctrl.$setValidity('noMatch', !noMatch)
                })
            }
        };
    })
    .directive('uniqueEmail', ['Usuario', function (Users) {
        return {
            require:'ngModel',
            restrict:'A',
            link:function (scope, el, attrs, ctrl) {

                //TODO: We need to check that the value is different to the original

                //using push() here to run it as the last parser, after we are sure that other validators were run
                ctrl.$parsers.push(function (viewValue) {

                    if (viewValue) {
                        Users.query({email:viewValue}, function (users) {

                            if (users.email == null) {
                                ctrl.$setValidity('uniqueEmail', true);
                            } else {
                                ctrl.$setValidity('uniqueEmail', false);
                            }
                        });
                        return viewValue;
                    }
                });
            }
        };
    }])
    .directive('receptorEmail', ['Receptor', function (Users) {
        return {
            require:'ngModel',
            restrict:'A',
            link:function (scope, el, attrs, ctrl) {

                //TODO: We need to check that the value is different to the original

                //using push() here to run it as the last parser, after we are sure that other validators were run
                ctrl.$parsers.push(function (viewValue) {

                    if (viewValue) {
                        Users.query({email:viewValue}, function (users) {

                            scope.usuarios = users;
                        });
                        return viewValue;
                    }
                });
            }
        };
    }])

