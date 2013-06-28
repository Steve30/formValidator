(function($) {
	$.fn
			.extend({
				formValidator : function(options) {

					this.defaults = {
						formElements : {
							name : {
								rules : {
									errorText : 'Hibás mező!',
									uppercase : true,
									emptyValue : '',
									passing : false
								},
								checkFunction : function(value, rules, elId,
										self) {

									if (value === rules.emptyValue) {
										rules.passing = false;
									} else {
										rules.passing = true;
									}

									if (rules.passing === false) {
										self.showErrorNotify(elId,
												rules.errorText);
									}
								}
							},
							mail : {
								rules : {
									errorText : 'Hibás e-mail!',
									emptyValue : '',
									passing : false
								},
								checkFunction : function(value, rules, elId,
										self) {

									if (value === rules.emptyValue) {
										rules.passing = false;
									} else {
										rules.passing = true;
									}

									if (rules.passing === false) {
										self.showErrorNotify(elId,
												rules.errorText);
									}
								}
							}
						}
					};

					this.plugin = {
						el : undefined,
						options : undefined,
						elements : undefined,
						errorTextEl : undefined,
						formElements : new Array(),

						initialize : function() {
							this.el = arguments[0];
							this.options = arguments[1];

							this.elements = this.options.formElements;

							for ( var i in this.elements) {
								this.formElements.push($('#' + i));
							}

							this.addEvents();
						},

						showErrorNotify : function(elements, errorText) {
							if (typeof (elements) === 'object') {
								for ( var i = 0; i <= elements.length - 1; i++) {
									var el = elements[i].el, text = elements[i].errorText;

									this.setErrorTextHtml(el, text);
								}
							} else {
								var el = $('#' + elements);

								this.setErrorTextHtml(el, errorText);
							}
						},

						setErrorTextHtml : function(el, text) {
							el.after('<span class="error-text">' + text
									+ '</span>');
							this.errorTextEl = $('.error-text');

							this.errorTextEl.animate({
								opacity : 1
							});
						},

						formEvents : function() {
							this.el.on({
								'submit' : this.formSubmit,
								'checking' : this.formChecking
							}, {
								self : this
							});
						},

						formSubmit : function(e) {
							if ($(this).find('.error-text').size() > 0) {
								return false;
							}

							var isShowSendError = false, errorElements = new Array(), elements = e.data.self.elements;

							try {
								for ( var i in elements) {
									if (elements[i].rules.passing === false) {
										isShowSendError = true;
										errorElements
												.push({
													el : $("#" + i),
													errorText : elements[i].rules.errorText
												});
									}
								}
							} catch (error) {
								console.info(error);
							}

							if (isShowSendError) {
								e.data.self.showErrorNotify(errorElements);
								return false;
							}
						},

						formChecking : function(e, dataObj) {
							var elements = e.data.self.elements, elObj = elements[dataObj.id];

							try {
								elObj.checkFunction(dataObj.value, elObj.rules,
										dataObj.id, e.data.self);
							} catch (error) {
								console.info(error.message);
							}
							;
						},

						formElementsEvent : function() {
							for ( var i = 0; i <= this.formElements.length - 1; i++) {
								this.formElements[i].on({
									focus : this.focusEvent,
									blur : this.blurEvent
								}, {
									self : this
								});
							}
						},

						focusEvent : function(e) {
							var textContainer = $(this).next()[0];

							if (textContainer !== undefined) {
								$(textContainer).animate({
									opacity : 0,
									marginLeft : '100px'
								}, function() {
									$(this).remove();
								});
							}
						},

						blurEvent : function(e) {
							var value = $(this).val(), id = $(this).attr('id'), el = e.data.self.el;

							var dataObj = {
								value : value,
								id : id
							};

							el.trigger('checking', dataObj);
						},

						addEvents : function() {
							this.formEvents();
							this.formElementsEvent();
						},

						removeEvents : function() {

						}
					};

					this.init = function(opt) {
						$.proxy(this.plugin.initialize(this, opt), this.plugin);
					};

					constructor = function(plugin) {
						plugin.options = $.extend(plugin.defaults, options);
						plugin.init(plugin.options);
					}(this);

				}
			});
})(jQuery);
