(function($) {
    $.fn.extend({
        formValidator: function(options) {
            var self = this;

            this.defaults = {
                formElements: {
                    name: {
                        rules: {
                            errorText: 'Hibás mező!',
                            uppercase: true,
                            emptyValue: '',
                            passing: false
                        },
                        checkFunction: function(value, rules, elId) {

                            if (value === rules.emptyValue) {
                                rules.passing = false;
                            } else {
                                rules.passing = true;
                            }

                            if (rules.passing === false) {
                                self.showErrorNotify(elId, rules.errorText);
                            }
                        }
                    },
                    mail: {
                        rules: {
                            errorText: 'Hibás e-mail!',
                            emptyValue: '',
                            passing: false
                        },
                        checkFunction: function(value, rules, elId) {

                            if (value === rules.emptyValue) {
                                rules.passing = false;
                            } else {
                                rules.passing = true;
                            }

                            if (rules.passing === false) {
                                self.showErrorNotify(elId, rules.errorText);
                            }
                        }
                    }
                }
            };

            this.init = function(opt) {
                self.element = $(this);

                self.elements = opt.formElements;
                self.errorTextEl = undefined;

                self.formElements = new Array();

                for (var i in opt.formElements) {
                    self.formElements.push($('#' + i));
                }

                self.addEvents();
            };

            this.showErrorNotify = function(elements, errorText) {
                if (typeof(elements) === 'object') {
                    for (var i = 0; i <= elements.length - 1; i++) {
                        var el = elements[i].el,
                                text = elements[i].errorText;

                        self.setErrorTextHtml(el, text);
                    }
                } else {
                    var el = $('#' + elements);
                    
                    self.setErrorTextHtml(el, errorText);
                }
            };

            this.setErrorTextHtml = function(el, text) {
                el.after('<span class="error-text">' + text + '</span>');
                self.errorTextEl = $('.error-text');

                self.errorTextEl.animate({
                    opacity: 1
                });
            };

            this.formEvents = function() {
                self.element.on({
                    'submit': function(e) {

                        if ($(this).find('.error-text').size() > 0) {
                            return false;
                        }

                        var isShowSendError = false,
                                errorElements = new Array();

                        try {
                            for (var i in self.elements) {
                                if (self.elements[i].rules.passing === false) {
                                    isShowSendError = true;
                                    errorElements.push({
                                        el: $("#" + i),
                                        errorText: self.elements[i].rules.errorText
                                    });
                                }
                            }
                        } catch (error) {
                            console.info(error);
                        }

                        if (isShowSendError) {
                            self.showErrorNotify(errorElements);
                            return false;
                        }

                    },
                    'checking': function(el, dataObj) {
                        var elObj = self.elements[dataObj.id];

                        try {
                            elObj.checkFunction(dataObj.value, elObj.rules, dataObj.id);
                        } catch (error) {
                            console.info(error.message);
                        }
                        ;

                    }
                });
            };

            this.formElementsEvent = function() {
                for (var i = 0; i <= self.formElements.length - 1; i++) {
                    self.formElements[i].on({
                        focus: function() {
                            var textContainer = $(this).next()[0];

                            if (textContainer !== undefined) {
                                $(textContainer).animate({
                                    opacity: 0,
                                    marginLeft: '100px'
                                }, function() {
                                    $(this).remove();
                                });
                            }
                        },
                        blur: function() {
                            var value = $(this).val(),
                                    id = $(this).attr('id');

                            var dataObj = {
                                value: value,
                                id: id
                            };

                            self.element.trigger('checking', dataObj);
                        }
                    });
                }
            };

            this.addEvents = function() {
                self.formEvents();
                self.formElementsEvent();
            };

            this.removeEvents = function() {

            };

            constructor = function() {
                self.options = $.extend(self.defaults, options);
                self.init(self.options);
            }();

        }
    });
})(jQuery);


