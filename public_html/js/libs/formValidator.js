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
								checkFunction : function(value, rules) {

									if (value === rules.emptyValue) {
										rules.passing = false;
									} else {
										rules.passing = true;
									}

									if (rules.passing === false) {
										return rules.passing;
									}
								}
							},
							mail : {
								rules : {
									errorText : 'Hibás e-mail!',
									emptyValue : '',
									passing : false
								},
								checkFunction : function(value, rules) {

									if (value === rules.emptyValue) {
										rules.passing = false;
									} else {
										rules.passing = true;
									}

									if (rules.passing === false) {
										return rules.passing;
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
						
						/* Init function. initialize the plugin */
						initialize : function() {
							this.el = arguments[0];
							this.options = arguments[1];

							this.elements = this.options.formElements;

							for ( var i in this.elements) {
								this.formElements.push($('#' + i));
							}

							this.addEvents();
						},
						/**
						 *	Show the error notification
						 *	@param elements object or string   object or DOM id	
						 *  @param errorText   string    Notify text
						 *  
						 *  @return void; 
						 */
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
						/**
						 *	Set the error text
						 *	@param el 		object    HTML Dom element	
						 *  @param text 	string    Errot notify text
						 *  
						 *  @return void; 
						 */
						setErrorTextHtml : function(el, text) {
							el.after('<span class="error-text">' + text
									+ '</span>');
							this.errorTextEl = $('.error-text');

							this.errorTextEl.animate({
								opacity : 1
							});
						},
						/**
						 *	Set the form events
						 *  
						 *  @return void; 
						 */
						formEvents : function() {
							this.el.on({
								'submit' : this.formSubmit,
								'checking' : this.formChecking
							}, {
								self : this
							});
						},
						/**
						 *	Form submit event function
						 *  
						 *  @return false or empty; 
						 */
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
						/**
						 *	Custom form checking event function
						 *
						 *  @param dataObj   object    Data object
						 *  
						 *  @return void; 
						 */
						formChecking : function(e, dataObj) {
							var elements = e.data.self.elements, elObj = elements[dataObj.id];

							try {
								var check = elObj.checkFunction(dataObj.value, elObj.rules);
								
								if (check === false) {
									e.data.self.showErrorNotify(dataObj.id, elObj.rules.errorText)
								}
								
							} catch (error) {
								console.info(error.message);
							}
							;
						},
						/**
						 *	Form elements event function
						 *  
						 *  @return void; 
						 */
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
						/**
						 *	Focus event function
						 *  
						 *  @return void; 
						 */
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
						/**
						 *	Blur event function
						 *  
						 *  @return void; 
						 */
						blurEvent : function(e) {
							var value = $(this).val(), id = $(this).attr('id'), el = e.data.self.el;

							var dataObj = {
								value : value,
								id : id
							};

							el.trigger('checking', dataObj);
						},
						/**
						 *	Add plugin events
						 *  
						 *  @return void; 
						 */
						addEvents : function() {
							this.formEvents();
							this.formElementsEvent();
						},
					};
					
					/**
					 * Init the plugin object 
					 */
					this.init = function(opt) {
						$.proxy(this.plugin.initialize(this, opt), this.plugin);
					};
					
					/**
					 * Merge the plugin options and run the init function
					 */
					constructor = function(plugin) {
						plugin.options = $.extend(plugin.defaults, options);
						plugin.init(plugin.options);
					}(this);

				}
			});
})(jQuery);
