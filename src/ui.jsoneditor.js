/**
 * angular-jsoneditor - v0.1.0 - 2014-09-24
 * https://github.com/shaunxu/angular-jsoneditor
 * Copyright (c) 2014 Shaun Xu; Licensed MIT
 */
angular.module('ui.jsoneditor', [])
    .directive('uiJsonEditor', ['jsoneditorOptions', function (jsoneditorOptions) {
        'use strict';
        return {
            restrict: 'A',
            scope: {
                json: '=ngModel',
                editor: '=editor',
                options: '=options'
            },
            link: function (scope, elem) {
                var opts = angular.extend({}, jsoneditorOptions, scope.options);
                opts.change = opts.change || function () {
                        if (scope.editor) {
                            scope.$apply(function () {
                                scope.json = scope.editor.get();
                            });
                        }
                    };
                scope.editor = new JSONEditor(elem[0], opts, scope.json || {});
            }
        };
    }])
    .provider('jsoneditorOptions', function () {
        'use strict';
        this.options = {};

        this.$get = function () {
            var opts = this.options;
            return opts;
        };

        this.setOptions = function (value) {
            this.options = value;
        };
    });