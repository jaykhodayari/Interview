phoneApp.directive('phoneField', ['$filter', function ($filter) {
    var phoneFilter, phoneReverse;
    phoneFilter = $filter('phoneFilter');
    phoneReverse = $filter('phoneReverse');
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            var formatter, mask, parser;
            mask = attrs.phoneFieldMask;
            formatter = function (value) {
                return phoneFilter(value);
            };
            parser = function (value) {
                var formatted;
                //formatted = phoneReverse(value);
                //element.val(phoneFilter(formatted));
                //return formatted;
                if (/[a-zA-Z]/.test(value)) {
                    value = "";
                }

                var el = element[0];
                var formatted = phoneReverse(value);

                var len = value.length;


                var offset = 0;
                var start;
                var end;
                var position;
                if (el.selectionEnd >= len) {

                    if (len <= 3) {
                        offset = 0;
                    } else if (3 < len && len <= 6) {

                        offset = 1;

                    } else if (len > 6) {

                        offset = 2;

                    }

                    start = el.selectionStart;
                    end = el.selectionEnd + phoneFilter(formatted).length + offset - value.length;
                    position = end;
                }
                else {

                    if (el.selectionStart < 3) {
                        offset = 0;
                    } else if (el.selectionStart == 3) {

                        offset = 1;

                    } else if (el.selectionStart == 7) {

                        offset = 1;

                    }
                    position = el.selectionStart + offset;



                }


                var myText = phoneFilter(formatted);

                element.val(myText);
                el.setSelectionRange(position, position);



                //var view_value = modelCtrl.$viewValue //The actual value from the control's view
                //var model_value = modelCtrl.$modelValue //The value in the model that the control is bound to

                //console.log(view_value);
                //console.log(model_value);


                // modelCtrl.$viewValue = myText;
                result = null;
                if (myText.length == 12) {
                    modelCtrl.$viewValue = myText;
                    modelCtrl.$commitViewValue();
                    modelCtrl.$render();
                    el.setSelectionRange(position, position);
                    return myText;
                }
                else {

                     return null;
                }




            };

            modelCtrl.$formatters.push(formatter);
            return modelCtrl.$parsers.unshift(parser);
        }
    };
}]).filter('phoneFilter', function () {
    return function (value, mask) {
        var len, val;
        if (mask == null) {
            mask = false;
        }
        if (value) {
            val = value.toString().replace(/\D/g, '');
            len = val.length;
            if (len < 4) {
                return val;
            } else if (3 < len && len < 7) {
                return val.substr(0, 3) + '-' + val.substr(3);
            } else if (len > 6) {

                return val.substr(0, 3) + '-' + val.substr(3, 3) + '-' + val.substr(6, 4);
            }
        }
        return value;
    };
}).filter('phoneReverse', function () {
    return function (value) {
        if (!!value) {
            return value.replace(/\D/g, '').substr(0, 10);
        }
        return value;
    };
})
