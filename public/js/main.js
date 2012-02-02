mbe = {

	animationSpeed: 'fast',
	searchPlaceHolder: 'Search in table',
	generalSearchUrl: 'dashboard_example.json',

	pbInterval: 0,
	showActions: false,
	showActionObject: false,
	showActionsTimeOut: 0,

	ready: function() {

		//init the layout
		mbe.init.header();
		mbe.init.middle();
		mbe.init.footer();

		//init all the form elements
		mbe.init.form.all();

		//init the message boxes
		mbe.init.message.small();
		mbe.init.message.big();

		//init the login
		mbe.login.ready();

		//init the blocks
		mbe.init.block();

		//init the tabs
		mbe.init.tab.horizontal();
		mbe.init.tab.vertical();

		//init the accordion
		mbe.init.accordion();

		//init the regular table
		mbe.init.table();

		//init the dataTable
		mbe.init.dataTable.ready();

		//init the filter
		mbe.init.imageList();

		//init the shortcuts
		mbe.init.shortcuts();

		//init the calendar
		var _events = mbe.presentation.getEvents(); //the presentation events
		mbe.init.calendar(_events);

		//init the fancybox
		mbe.init.fancybox();

		//init the graph
		mbe.init.graph.ready();

		//--- SHOULD BE DELETED
		mbe.presentation.ready();
		//--- END SHOULD BE DELETED

		//detect ipad
		if (mbe.agent.ipad() && !$('div.page').hasClass('login')) {
			mbe.mobile.ipad.ready();

			//restrict running in an iframe/frame
			if (window != top) {
				top.location.href = location.href;
			}
		}

		//detect iphone / ipod
		if (mbe.agent.iphone()) {
			if ($('div.page').hasClass('login')) {
				mbe.mobile.iphone.loginReady();
			} else {
				mbe.mobile.iphone.ready();
			}


			//restrict running in an iframe/frame
			if (window != top) {
				top.location.href = location.href;
			}
		}
	},

	agent: {
		ipad: function () {
			return navigator.userAgent.indexOf('iPad')>=0;
		},
		iphone: function () {
			return jQuery.browser.mobile;
		},
		nameAgent: function() {
			if (mbe.agent.iphone()) {
				return 'iphone';
			} else {
				return 'ipad';
			}
		},
		nameCss: function() {
			if (mbe.agent.iphone()) {
				return '.top-side';
			} else {
				return '.sidebar';
			}
		}
	},

	init: {
		form: {
			all: function() {
				mbe.init.form.input();
				mbe.init.form.button();
				mbe.init.form.select();
				mbe.init.form.checkbox();
				mbe.init.form.radio();
				mbe.init.form.file();
				mbe.init.form.fieldset();
				mbe.init.form.wysiwyg();
				mbe.init.form.date();
			},
			validation: function(id) {
				if (id == undefined) {
					id = 'form';
				}
				$(id).validate({
					errorElement: 'small'
				});
			},
			input: function() {
				$('input[type="text"],input[type="password"]').uniform();
			},
			button: function() {
				$('input[type="button"],input[type="submit"]').each(function(){
					$(this).uniform({
						buttonClass: 'button '+$(this).attr('class')
					});
				});
			},
			select: function(selector) {
				if (selector == undefined) {
					selector = 'select';
				}
				$(selector).uniform();
			},
			checkbox: function() {
				$('input[type="checkbox"]').uniform();
			},
			radio: function() {
				$('input[type="radio"]').uniform();
			},
			file: function() {
				$('input[type="file"]').uniform({
					fileBtnClass: 'button'
				});
				$('.uploader .button').wrapInner('<span />');
				$('.uploader').hover(function(){
					$(this).find('.button').addClass('hover');
				},function(){
					$(this).find('.button').removeClass('hover');
				});
			},
			fieldset: function() {
				$('.page .block .content fieldset p:last').addClass('last');
			},
			wysiwyg: function() {
				if(!mbe.agent.ipad() && !mbe.agent.iphone()){
					$('textarea.wysiwyg').wysiwyg();
				}

			},
			date: function() {
				$('input.date').jdPicker();
			}
		},
		message: {
			small: function() {

				if (mbe.agent.iphone()) {
					$('.message ').bind('tapOrClick',function(e){
						e.preventDefault();

						$(this).closest('.message').fadeTo(mbe.animationSpeed, 0).slideUp(mbe.animationSpeed, function(){
							if (mbe.mobile.scroll) {
								mbe.mobile.scroll.refresh();
							}
						});

					});
				}

				//init small message close
				$('.message span.close').remove();
				$('.message').each(function(){
					var _this = $(this);
					if (!_this.hasClass('no-close')) {
						_this.append('<span class="close" title="Close">&nbsp;</span>');
					}

					//autoclose
					var autocloseTime = parseFloat(_this.attr('autoclose'));
					if (autocloseTime) {
						var x = setTimeout(function(){
							_this.slideUp(mbe.animationSpeed);
						}, autocloseTime * 1000);
					}

				});

				$('.message span.close ').unbind('click touchstart');
				$('.message span.close ').bind('click touchstart',function(e){
					e.preventDefault();
					var _this = $(this);

					_this.closest('.message').fadeTo(mbe.animationSpeed, 0).slideUp(mbe.animationSpeed, function(){
						if (mbe.mobile.scroll) {
							mbe.mobile.scroll.refresh();
						}
					});

				});

			},
			big: function() {
				//init small message close

				if (mbe.agent.iphone()) {
					$('.big-message ').bind('tapOrClick',function(e){
						e.preventDefault();

						$(this).closest('.big-message').fadeTo(mbe.animationSpeed, 0).slideUp(mbe.animationSpeed, function(){
							if (mbe.mobile.scroll) {
								mbe.mobile.scroll.refresh();
							}
						});

					});
				}


				$('.big-message span.close').remove();
				$('.big-message span.bg').remove();
				$('.big-message').each(function(){
					if (!$(this).hasClass('no-close')) {
						$(this).append('<span class="close" title="Close">&nbsp;</span>');
					}
				});
				$('.big-message').append('<span class="bg">&nbsp;</span>');


				$('.big-message span.close').unbind('click touchstart');
				$('.big-message span.close').bind('click touchstart',function(e){
					e.preventDefault();

					$(this).closest('.big-message').fadeTo(mbe.animationSpeed, 0).slideUp(mbe.animationSpeed, function(){
						if (mbe.mobile.scroll) {
							mbe.mobile.scroll.refresh();
						}
					});

				});
			}
		},
		header: function() {
			$('.page .header ul li').hover(
				function(){
					$(this).children('ul').show();
					$(this).addClass('iehover');
				},function(){
					$(this).children('ul').hide();
					$(this).removeClass('iehover');
				});

			//to keeph the html clean and simple we add some html and classes from javascript
			$('.page .header .secondary-menu .user-menu').prepend('<div class="pointer">&nbsp;</div>');
			$('.page .header .secondary-menu .search-menu').prepend('<div class="pointer">&nbsp;</div>');
			$('.page .header .secondary-menu .user-menu ul.menu li:first').addClass('first');
			$('.page .header .secondary-menu .user-menu ul.menu li:last').addClass('last');
			$('.page .header .secondary-menu .user-menu ul.menu').prepend('<li class="separator">&nbsp;</li>');

			$('.page .header .secondary-menu a.user-menu-link').click(function(e){
				e.preventDefault();
				mbe.header.user.toggle();
			});

			$('.page .header .secondary-menu a.search-menu-link').click(function(e){
				e.preventDefault();
				mbe.header.search.toggle();
			});

			//bind shortcut
			var combination = 'ctrl+space';
			if ($.client.browser == 'Firefox' && $.client.os == 'Mac') {
				combination = 'alt+space';
			}
			$(document).bind('keydown', combination, function(e) {
				e.preventDefault();
				mbe.header.search.toggle();
			});
			if ($('#header-search-input').size()>0) {
				$('#header-search-input').bind('keydown',function(e){
					if (e.keyCode == 27) { //escape
						mbe.header.search.hide();
					}
				});
				$('#header-search-input').bind('focus',function(){
					$(this).select();
				});

				$('#header-search-input').val('');

				if (mbe.header.links.length <= 0) {
					mbe.header.links = [];
					$('.page .header ul.main-menu li a').each(function(){
						mbe.header.links.push({
							'label': $(this).text(),
							'value': $(this).attr('href'),
							'category': 'Admin Pages'
						});
					});
					$('.page .header ul.secondary-menu li .user-menu ul.menu li a').each(function(){
						mbe.header.links.push({
							'label': $(this).text(),
							'value': $(this).attr('href'),
							'category': 'User Pages'
						});
					});

					if (mbe.generalSearchUrl) {

						$.ajax({
							url: mbe.generalSearchUrl,
							dataType: 'json',
							data: null,
							success: function( elements ) {
								for (x in elements) {
									mbe.header.links.push(elements[x]);
								}
								$('#header-search-input').autocomplete('option', 'source', mbe.header.links);
							}
						});
					}
				}
				//autocomplete for search
				$('#header-search-input').autocomplete({
					source: mbe.header.links,
					delay: 0,
					select: function( event, ui ) {

						mbe.header.search.hide();
						window.location = ui.item.value;
						return false;
					},
					focus: function( event, ui ) {
						return false;

					},
					appendTo: $('.page.'+mbe.agent.nameAgent()).size()>0
						? '.page.'+mbe.agent.nameAgent()+' '+mbe.agent.nameCss()+' ul.secondary-menu li .search-menu'
						: '.page .header ul.secondary-menu li .search-menu',
					autoFocus: true
				});
				$('#header-search-input').data('autocomplete')._renderMenu = function( ul, items ) {
					var self = this;

					var category = '';

					$.each( items, function( index, item ) {
						if (item.category == category) {
							item.writeCategory = '';
						} else {
							category = item.category;
							item.writeCategory = item.category;
						}
						self._renderItem( ul, item );
					});
				}
				$('#header-search-input').data('autocomplete')._renderItem = function( ul, item ) {

					return $( '<li></li>' )
						.data( 'item.autocomplete', item )
						.attr('role','menuitem')
						.append( '<a><span class="category">'+item.writeCategory+'</span><span class="label">'+item.label+'</span></a>' )
						.appendTo( ul );
				};

			}
		},
		footer: function() {
		},
		middle: function() {
			//init the middle content

		},
		block: function() {

			$('.page .block .top ul li:first-child').addClass('first');
			$('.page .block .top ul li:last-child').addClass('last');

			$('.page .block.small .top').bind('tapOrClick',function(e){
				e.preventDefault();
				var block = $(this).closest('.block');

				block.toggleClass('closed');
				block.find('.content').slideToggle(mbe.animationSpeed,function(){
					if (mbe.mobile.scroll) {
						mbe.mobile.scroll.refresh();
					}
				});
			});
			$('.page .block.small.closed .content').hide();

			$('.page .block .top').each(function(){
				var block = $(this).closest('.block');

				if (!block.hasClass('small') && !block.is('.page.login .block')) {
					$(this).prepend('<div class="sl">&nbsp;</div><div class="sr">&nbsp;</div>');
				}

				if ($(this).find('input.search').size()>0) {
					$(this).addClass('with-search');
				}
			});
			$('.page .block .top input.search').focus(function(){
				if ($(this).val()==mbe.searchPlaceHolder) {
					$(this).val('');
				}
			});
			$('.page .block .top input.search').blur(function(){
				if ($(this).val()=='') {
					$(this).val(mbe.searchPlaceHolder);
				}
			});
		},
		tab: {
			horizontal: function() {

				$('.page .block .content ul.tab-header li a').each(function(){
					$(this).html('<span class="l">&nbsp;</span><span class="c">'+$(this).html()+'</span><span class="r">&nbsp;</span>');
				});
				$('.page .block .content .tab').hide();
				$('#'+$('.page .block .content ul.tab-header li a.active').attr('href')).show();

				$('.page .block .content ul.tab-header li a').touched(function(e){
					e.preventDefault();

					var tabs = $(e.currentTarget).closest('ul.tab-header');

					tabs.find('li a').removeClass('active');

					$(e.currentTarget).addClass('active');

					$('.page .block .content .tab').hide();
					$('#'+$(e.currentTarget).attr('href')).show();

					if (mbe.mobile.scroll) {
						mbe.mobile.scroll.refresh();
					}

					return false;
				});
			},
			vertical: function() {

				//init vertical tabs
				$('#'+$('.page .block .content .vertical-tabs .tab-list ul li.active a').attr('href')).show();
				$('.page .block .content .vertical-tabs .tab-list ul li.active').append('<span class="arrow">&nbsp;</span>');

				$('.page .block .content .vertical-tabs .tab-list ul li a').touched(function(e) {
					e.preventDefault();

					var tabs = $(e.currentTarget).closest('.vertical-tabs');

					tabs.find('.tab-list ul li.active').removeClass('active');
					tabs.find('.tab-list ul li.active span.arrow').remove();

					$(e.currentTarget).closest('li').addClass('active');
					$(e.currentTarget).closest('li').append('<span class="arrow">&nbsp;</span>');

					tabs.find('.right-tab').hide();
					$('#'+$(e.currentTarget).attr('href')).show();

					tabs.find('.tab-list').css('minHeight',0);
					tabs.find('.right-tab:visible').css('minHeight',0);

					var maxHeight = tabs.find('.tab-list').height()>tabs.find('.right-tab:visible').height()
						?tabs.find('.tab-list').height()
						:tabs.find('.right-tab:visible').height();

					tabs.find('.right-tab:visible').css('minHeight',maxHeight);
					tabs.find('.tab-list').css('minHeight',maxHeight + 10);

					if (mbe.mobile.scroll) {
						mbe.mobile.scroll.refresh();
					}

					return false;
				});

				$('.page .block .content .vertical-tabs').each(function(){
					var tabs = $(this);

					tabs.find('.tab-list').css('minHeight',0);
					tabs.find('.right-tab:visible').css('minHeight',0);

					var maxHeight = tabs.find('.tab-list').height()>tabs.find('.right-tab:visible').height()
						?tabs.find('.tab-list').height()
						:tabs.find('.right-tab:visible').height();

					tabs.find('.right-tab:visible').css('minHeight',maxHeight);
					tabs.find('.tab-list').css('minHeight',maxHeight + 10);
				});
			}
		},
		accordion: function() {
			$('.page .block .content .accordion').accordion({
				header: '.title'
			});

			/*if (mbe.mobile.scroll) {
				mbe.mobile.scroll.refresh();
			}*/
		},
		shortcuts: function() {
			$('.page .block ul.shortcuts li a').hover(function(){
				$(this).addClass('hover');
			},function(){
				$(this).removeClass('hover');
			});
			$('.page .block ul.shortcuts li a').bind('mousedown touchstart',function(e){
				$(this).addClass('active');

				e.preventDefault();
			});
			$('.page .block ul.shortcuts li a').bind('mouseup touchend',function(){
				$(this).removeClass('active');
			});
			$(window).mouseup(function(){
				$('.page .block ul.shortcuts li a').removeClass('active');
			});
		},
		calendar: function(_events) {
			$('.full-calendar').fullCalendar({
				header: {
					left: 'prev,next today',
					center: 'title',
					right: 'month,agendaWeek,agendaDay'
				},
				editable: true,
				events: _events
			});
		},
		table: function() {

			$('.page .block .content a.delete').unbind('tapOrClick');
			$('.page .block .content a.delete').bind('tapOrClick',function(e){
				if (!confirm('Are you sure you want to delete this item ?')) {
					e.preventDefault();
				}
			});
			$('.page .block .content input.table-actions').unbind('tapOrClick');
			$('.page .block .content input.table-actions').bind('tapOrClick',function(e){
				if (!confirm('Are you sure you want to apply these actions ?')) {
					e.preventDefault();
				}
			});

			//init filter show/hide
			$('.page .block .content .filters .high').unbind('tapOrClick');
			$('.page .block .content .filters .high').bind('tapOrClick',function(e){

				e.preventDefault();
				if ($.browser.msie) {
					$(this).closest('.filters').find('.low').toggle();
				} else {
					$(this).closest('.filters').find('.low').slideToggle(mbe.animationSpeed);
				}
			});

			//check all for the input
			$('input.check_all').unbind('change');
			$('input.check_all').bind('change',function() {
				var _this = $(this);
				var table = _this.closest('table');
				if (_this.is(':checked')) {
					table.find('input.checker').attr('checked','checked');
					table.find('input.checker').parent().addClass('checked');
				} else {
					table.find('input.checker').removeAttr('checked');
					table.find('input.checker').parent().removeClass('checked');
				}
			});

			//same height for filters
			$('.page .block .content .filters .low .filter').height($('.page .block .content .filters .low').height()-20);

		},
		dataTable: {
			vars: [],
			editUrl: 'edit_object.go?id=$ID$',
			expressionEdit: 'Edit',
			expressionActions: 'Actions',
			ready: function() {
				$('table.data-table').each (function() {
					var options = {
						sPaginationType: 'full_numbers',
						sDom: '<"table-top"lf<"clear">>rt<"table-bottom"ip<"clear">>',
				        bLengthChange: true,
				        iDisplayLength: 10,
				        aLengthMenu: [10, 25, 100]
					};

					//--------------- No edit beyond this point unless you know what you're doing ---------------

					var _this = $(this);
					var
						columnNo = _this.find('th').size(),
						addActions = _this.attr('add_actions'),
						useCheckbox = _this.attr('use_checkbox'),
						url = _this.attr('url'),
						orderColumn = parseInt(_this.attr('order_column')),
						orderColumnOrder = _this.attr('order_column_order');

					_this.find('th').closest('tr').addClass('trth');

					//form the columns
					var
						columns = [],
						diff = 0;

					//add the checkboxes (if needed)
					if (useCheckbox) {

						//add the th and the extra column (if needed)
						_this.find('.trth').prepend('<th><input type="checkbox" class="check_all" /></th>');
						if (!url) {
							_this.find('tr:not(.trth)').prepend('<td></td>');
						}

						//add the checkbox
						columns.push({
							sName: 'chk',
							bSearchable: false,
							bSortable: false,
							fnRender: function(obj) {
								return '<input type="checkbox" name="ids[]" value="' + obj.aData[1] + '" />';
							}
						});

						//remove the id
						columns.push({
							bVisible: false
						});

						//increment the difference
						diff ++;

						//make the div's selectable
						$(this).find('tr.odd input[type="checkbox"],tr.even input[type="checkbox"]').live('change',function(){
							var tr = $(this).closest('tr');

							tr.removeClass('selected');
							if ($(this).is(':checked')) {
								tr.addClass('selected');
							}
						});
						$(this).find('tr.odd,tr.even').live('click',function(e){
							if (!$(e.target).is('input[type="checkbox"]') && !$(e.target).is('a')) {
								var
									input = $(this).find('input[type="checkbox"]'),
									tr = $(this);

								tr.removeClass('selected');
								input.parent().removeClass('checked');

								if (input.is(':checked')) {
									input.removeAttr('checked');
								} else {
									input.attr('checked','checked');
									input.parent().addClass('checked');
									tr.addClass('selected');
								}
							}
						});
						$(this).find('input[class="check_all"]').live('change',function() {
							var
								inputs = $(this).closest('table').find('tr.odd input[type="checkbox"],tr.even input[type="checkbox"]'),
								trs = $(this).closest('table').find('tr.odd,tr.even');

							trs.removeClass('selected');
							inputs.parent().removeClass('checked');

							if (!$(this).is(':checked')) {
								inputs.removeAttr('checked');
							} else {
								inputs.attr('checked','checked');
								inputs.parent().addClass('checked');
								trs.addClass('selected');
							}
						});

						//add the callback for the options
						options.fnDrawCallback = function() {
							mbe.init.form.checkbox();
				        };
					}

					//add the columns
					for (i=0;i<columnNo-diff;i++) {
						columns.push(null);
					}

					//add the actions (if needed)
					if (addActions) {
						//add the th and the extra column (if needed)
						_this.find('.trth').append('<th style="text-align: center">'+mbe.init.dataTable.expressionActions+'</th>');
						if (!url) {
							_this.find('tr:not(.trth)').append('<td></td>');
						}

						//add the actions column
						columns.push({
							sName: 'edit',
							bSearchable: false,
							bSortable: false,
							fnRender: function(obj) {
								var _url = mbe.init.dataTable.editUrl.replace('$ID$',obj.aData[1]);
								return '<a href="' + _url + '" class="edit">' + mbe.init.dataTable.expressionEdit + '</a>';
							}
						});
					}

					if (columns) {
						options.aoColumns = columns;
					}
					if (url) {
						options.bProcessing = true;
				        options.bServerSide = true;
						options.sAjaxSource = url;
					}
					if (orderColumn) {
						options.aaSorting = [[orderColumn+1, orderColumnOrder?orderColumnOrder:'desc']];
					}

					//rewrite the server data
					options.fnServerData = function ( url, data, callback, settings ) {
						if (typeof data == 'object') {
							data.push({
								name: 'useCheckbox',
								value: useCheckbox?1:0
							});
							data.push({
								name: 'addActions',
								value: addActions?1:0
							});
						}
						settings.jqXHR = $.ajax( {
							"url": url,
							"data": data,
							"success": function (json) {
								if (json.aaData) {
									if (useCheckbox || addActions) {
										for (x in json.aaData) {
											if (useCheckbox) {
												json.aaData[x].unshift('');
											}
											if (addActions) {
												json.aaData[x].push('');
											}
										}
									}
								}
								$(settings.oInstance).trigger('xhr', settings);
								callback( json );
							},
							"dataType": "json",
							"cache": false,
							"error": function (xhr, error, thrown) {
								if ( error == "parsererror" ) {
									alert( "DataTables warning: JSON data from server could not be parsed. "+
										"This is caused by a JSON formatting error." );
								}
							}
						} );
					}

					//init the table
					mbe.init.dataTable.vars[$(this).index()] = $(this).dataTable(options);
				});

				mbe.init.form.select('.page .block .content .dataTables_wrapper .table-top select');
			}
		},
		fancybox: function() {
			$('a.fancybox').fancybox({
				centerOnScroll: true,
				onStart:function(items,index,opts) {
					var obj = $(items[index]).parent();
					if (obj.hasClass('drag_sort')) {
						obj.removeClass('drag_sort');
						return false;
					}
				}
			});
		},
		imageList: function() {
			//image hover
			$('.page .block .content ul.image-list li').mouseenter(function(){
				mbe.showActions = true;
				var _this = this;
				mbe.showActionObject = $(this).index('.page .block .content ul.image-list li');
				clearTimeout(mbe.showActionsTimeOut);
				mbe.showActionsTimeOut = setTimeout(function(){
					if(mbe.showActions){
						$('.page .block .content ul.image-list li:eq('+mbe.showActionObject+')')
							.children('ul').slideDown(mbe.animationSpeed);
					}
				}, 500)

				$(this).children('span.move').show();
			});
			$('.page .block .content ul.image-list li').mouseleave(function(){
				mbe.showActions =  false;
				$(this).children('span.move').hide();
				$(this).children('ul').slideUp(mbe.animationSpeed);
			});

			//image sortable
			$('.page .block .content ul.image-list').sortable({
				start: function(event, ui) {
					ui.item.addClass('drag_sort');
				},
				stop: function(event, ui) {
					$('.page .block .content ul.image-list li span.move').hide();
					$('.page .block .content ul.image-list li ul').hide();
					$('#'+$(this).attr('rel')).val($(this).sortable('toArray'));
					mbe.showActions =  true;
				},
				sort: function(event, ui) {
					 mbe.showActions =  false;
				},
				placeholder: 'ui-state-highlight'
			});
			$('.page .block .content ul.image-list').disableSelection();
		},
		graph: {
			themes: {
				'soft-green': ['#648E25', '#EE931A', '#e7c42d', '#e94d45'],
				'crimson-orange': ['#E95914', '#FECF4C', '#9A9A9A', '#648E25'],
				'soft-blue': ['#3D99B5', '#dcdcdc', '#e7c42d', '#e94d45'],
				'soft-red': ['#A72121', '#dcdcdc', '#9A9A9A', '#648E25'],
				'soft-purple': ['#7c2f7a', '#dcdcdc', '#9A9A9A', '#648E25'],
				'soft-yellow': ['#a87700', '#fac500', '#9A9A9A', '#648E25'],
				'blue-gray': ['#66858E', '#dcdcdc', '#e7c42d', '#e94d45']
			},
			ready: function() {
				var currentTheme = mbe.getCurrentTheme();

				$('.visualize').remove();
				$('table.stats').css('width','100%');

				$('table.stats').each(function() {

					var index = $(this).index();

					$(this).siblings('.chart-'+index).remove();

					$(this).show();

					var dim=50;
					if(mbe.agent.ipad()){
						dim=125;
					}
					var width = $(this).width()-dim;

					$(this).hide();

					var statsType = '';

					if ($(this).attr('rel')) {
						statsType = $(this).attr('rel');
					} else {
						statsType = 'area';
					}

					if(statsType == 'line' || statsType == 'pie') {
						$(this).hide().visualize({
							type: statsType,	// 'bar', 'area', 'pie', 'line'
							width: width,
							height: '240px',
							colors: mbe.init.graph.themes[currentTheme],
							lineWeight: 3,
							lineDots: 'double',
							interaction: true,
							multiHover: 5,
							tooltip: true,
							chartClass: 'chart-'+index,
							tooltiphtml: function(data) {
								var html ='';
								for(var i=0; i<data.point.length; i++){
									html += '<p class="chart_tooltip"><strong>'+data.point[i].value+'</strong> '+data.point[i].yLabels[0]+'</p>';
								}
								return html;
							}
						});
					} else {
						$(this).hide().visualize({
							type: statsType,	// 'bar', 'area', 'pie', 'line'
							width: width,
							height: '240px',
							lineWeight: 3,
							lineDots: 'double',
							colors: mbe.init.graph.themes[currentTheme]
						});
					}
				});
			}
		}
	},
	header: {
		links: [],
		search: {
			show: function() {
				if(mbe.agent.iphone()) {
					$('.page .header ul.secondary-menu li .search-menu,.page.iphone .top-side ul.secondary-menu li .search-menu').fadeIn(mbe.animationSpeed);
				} else {
					$('.page .header ul.secondary-menu li .search-menu,.page.ipad .sidebar ul.secondary-menu li .search-menu').fadeIn(mbe.animationSpeed);
				}
				$('#header-search-input').select();
			},
			hide: function() {
				if(mbe.agent.iphone()) {
					$('.page .header ul.secondary-menu li .search-menu,.page.iphone .top-side ul.secondary-menu li .search-menu').fadeOut(mbe.animationSpeed);
				} else {
					$('.page .header ul.secondary-menu li .search-menu,.page.ipad .sidebar ul.secondary-menu li .search-menu').fadeOut(mbe.animationSpeed);
				}
			},
			toggle: function() {
				if(mbe.agent.iphone()) {
					var element = $('.page .header ul.secondary-menu li .search-menu,.page.iphone .top-side ul.secondary-menu li .search-menu');
				} else {
					var element = $('.page .header ul.secondary-menu li .search-menu,.page.ipad .sidebar ul.secondary-menu li .search-menu');
				}

				if (element.is(':visible')) {
					mbe.header.search.hide();
				} else {
					mbe.header.search.show();
				}
			}
		},
		user: {
			show: function() {
				if(mbe.agent.iphone()) {
					$('.page .header ul.secondary-menu li .user-menu,.page.iphone .top-side ul.secondary-menu li .user-menu').fadeIn(mbe.animationSpeed);
				} else {
					$('.page .header ul.secondary-menu li .user-menu,.page.ipad .sidebar ul.secondary-menu li .user-menu').fadeIn(mbe.animationSpeed);
				}
			},
			hide: function() {
				if(mbe.agent.iphone()) {
					$('.page .header ul.secondary-menu li .user-menu,.page.iphone .top-side ul.secondary-menu li .user-menu').fadeOut(mbe.animationSpeed);
				} else {
					$('.page .header ul.secondary-menu li .user-menu,.page.ipad .sidebar ul.secondary-menu li .user-menu').fadeOut(mbe.animationSpeed);
				}
			},
			toggle: function() {
				if(mbe.agent.iphone()) {
					var element = $('.page .header ul.secondary-menu li .user-menu,.page.iphone .top-side ul.secondary-menu li .user-menu');
				} else {
					var element = $('.page .header ul.secondary-menu li .user-menu,.page.ipad .sidebar ul.secondary-menu li .user-menu');
				}

				if (element.is(':visible')) {
					mbe.header.user.hide();
				} else {
					mbe.header.user.show();
				}
			}
		},

		showMenu: {
			show: function() {
				mbe.mobile.scrollMenu = new iScroll('iPhoneMenu',{
					hScroll: false,
					bounce: false,
					useTransition: true
				});
				$('.page.iphone .top-side #iPhoneMenu').animate({marginTop:'-20px', height:$(window).height()-50}, mbe.animationSpeed,
					function(){
						mbe.mobile.scrollMenu.refresh();
					}

				);
			},
			hide: function() {
				mbe.mobile.scrollMenu.destroy();
				$('.page.iphone .top-side #iPhoneMenu').animate({marginTop:'-800px', height:'0px'}, mbe.animationSpeed);
			},
			toggle: function() {
				var element = $('.page.iphone .top-side #iPhoneMenu');

				if (element.css('marginTop')=='-20px') {
					mbe.header.showMenu.hide();
				} else {
					mbe.header.showMenu.show();
				}
			}
		}

	},
	login: {
		ready: function() {

			//bind event to the forgot my password link
			$('.forgot-link').bind('tapOrClick',function(e){
				e.preventDefault();

				$('.block').rotate3Di(180, 300,{
					sideChange: function() {
						$('#login-form').hide();
						$('#forgot-form').show();
					}
				});

			});

			//bind event to the back to the login link
			$('.login-link').bind('tapOrClick',function(e){
				e.preventDefault();

				$('.block').rotate3Di(0, 300,{
					sideChange: function() {
						$('#login-form').show();
						$('#forgot-form').hide();
					}
				});

			});

			$('.page.login .block .content p:last-child').addClass('last-child'); /*IE FIX*/
		},
		shake: function() {
			var loginWindow = $('.login .block');

			var left = loginWindow.position().left>parseInt(loginWindow.css('margin-left'))
					? loginWindow.position().left
					: loginWindow.css('margin-left');
				loginWindow
					.css('margin-left',left)
					.effect('shake', null, 100);
		}

	},
	click: function(e) {
		if (!$(e.target).is('.page .header ul.secondary-menu li .user-menu')
			&& !$(e.target).is('.page .header ul.secondary-menu li .user-menu *')
			&& !$(e.target).is('.page.ipad .sidebar ul.secondary-menu li .user-menu')
			&& !$(e.target).is('.page.ipad .sidebar ul.secondary-menu li .user-menu *')
			&& !$(e.target).is('.page.iphone .top-side ul.secondary-menu li .user-menu')
			&& !$(e.target).is('.page.iphone .top-side ul.secondary-menu li .user-menu *')
			&& !$(e.target).is('a.user-menu-link')
			&& !$(e.target).is('a.user-menu-link *')) {
			mbe.header.user.hide();
		}
		if (!$(e.target).is('.page .header ul.secondary-menu li .search-menu')
			&& !$(e.target).is('.page .header ul.secondary-menu li .search-menu *')
			&& !$(e.target).is('.page.ipad .sidebar ul.secondary-menu li .search-menu')
			&& !$(e.target).is('.page.ipad .sidebar ul.secondary-menu li .search-menu *')

			&& !$(e.target).is('.page.iphone .top-side ul.secondary-menu li .search-menu')
			&& !$(e.target).is('.page.iphone .top-side ul.secondary-menu li .search-menu *')

			&& !$(e.target).is('a.search-menu-link')
			&& !$(e.target).is('a.search-menu-link *')) {

			mbe.header.search.hide();
		}
	},
	getCurrentTheme: function () {
		var
			classAttr = $('.page').attr('class'),
			classList = classAttr.split(/\s+/),
			currentTheme = '';
		for (var x in classList) {
			if (classList[x]!= 'page' && classList[x]!='fixed' && classList[x]!='liquid' && classList[x]!= '' && classList[x]!= 'ipad' && classList[x]!= 'iphone') {
				currentTheme = classList[x];
			}
		}
		if (currentTheme == '') {
			currentTheme = 'soft-green';
		}
		return currentTheme;
	},
	mobile: {
		scroll: 0,
		scrollMenu: 0,
		scrollTab: [],
		scrollTable: [],
		sidebarScroll: 0,
		ipad: {
			ready: function() {

				//add the ipad class
				$('div.page').addClass('ipad');

				//add the ipad css
				$('head')
					.append('<link rel="stylesheet" type="text/css" href="css/ipad.css" />')
					.append('<script type="text/javascript" src="js/iscroll/iscroll.js"></script>')
					.append('<meta name="viewport" content="user-scalable=no, width=device-width initial-scale=1.0, maximum-scale=1.0"/>')
					.append('<meta name="apple-mobile-web-app-capable" content="yes" />')
					.append('<meta name="apple-mobile-web-app-status-bar-style" content="black" />');

				//save the header html
				var
					html_footer = $('.page .footer').html(),
					html_header = $('.page .header .inner').html(),
					html_logo = '<h2>'+$('.page .header h2').html()+'</h2>',
					html_menu = '<ul class="main-menu">'+$('.page .header ul.main-menu').html()+'</ul>',
					html_secondary_menu = '<ul class="secondary-menu">'+$('.page .header ul.secondary-menu').html()+'</ul>';

				//remove the header
				$('.page .header').remove();
				$('.page .footer').remove();

				//make the html
				$('div.page').prepend('<div class="sidebar" id="iPadMenu">'+html_logo+html_secondary_menu+html_menu+'</div>');
				$('.page .sidebar').wrapInner('<div class="inner-wrapper"></div>');
				$('div.page').wrapInner('<div class="ipad-horizontal"></div>');
				$('.page .middle').wrapInner('<div class="inner" id="iPadMiddle"></div>');
				$('.page .middle #iPadMiddle .wrapper').append('<div class="footer">'+html_footer+'</div>');

				$('.page.ipad .sidebar ul').children('li').each(function(){
					if ($(this).is(':first-child')) {
						$(this).addClass('first');
						$(this).children('a').addClass('first');
					} else if ($(this).is(':last-child')) {
						$(this).addClass('last');
						$(this).children('a').addClass('last');
					} else {
						$(this).addClass('regular');
					}
				});

				//on resize (flexible box model)
				mbe.mobile.ipad.resize();
				$(window).resize(mbe.mobile.ipad.resize);

				//add the iscroll to the content
				mbe.mobile.scroll = new iScroll('iPadMiddle',{
					hScroll: false,
					bounce: false,
					useTransition: true,
					ignore: 'select,.page .block .content .accordion .title,.page .block .content .accordion .title *'
				});

				//add the iscroll to the sidebar
				mbe.mobile.scrollMenu = new iScroll('iPadMenu',{
					hScroll: false,
					bounce: false,
					useTransition: true
				});


				//refresh the iscroll when everything loads
				$(window).bind('load',function() {
					mbe.mobile.scroll.refresh();
					mbe.mobile.scrollMenu.refresh();
					//alert('ds');

				});

				//add touch actions to the sidebar
				$('.page.ipad .sidebar .secondary-menu a.user-menu-link').bind('click',function(e){
					e.preventDefault();
				});

				$('.page.ipad .sidebar .secondary-menu a.user-menu-link').bind('tapOrClick', function(e){
					e.preventDefault();
					mbe.header.user.toggle();
				});

				$('.page.ipad .sidebar .secondary-menu a.search-menu-link').bind('click',function(e){
					e.preventDefault();
				});

				$('.page.ipad .sidebar .secondary-menu a.search-menu-link').bind('tapOrClick', function(e){
					e.preventDefault();
					mbe.header.search.toggle();
				});

				$('.page.ipad .sidebar ul.main-menu li a').bind('click',function(e){
					e.preventDefault();
				});

				$('.page.ipad .sidebar ul.main-menu li a').bind('tapOrClick',function(e){

					if($(e.currentTarget).siblings('ul').size()>0){

						$(e.currentTarget).siblings('ul').slideToggle(mbe.animationSpeed, function(){
							mbe.mobile.scrollMenu.refresh();
						});

					} else {
						var url = $(e.currentTarget).attr('href');
						window.location = url;
					}
				});



				$('.page.ipad .sidebar ul.main-menu li a').bind('touchstart mousedown',function(e) {
					$(this).addClass('touched');
				});
				$('.page.ipad .sidebar ul.main-menu li a').bind('touchmove mousemove touchend mouseup mouseout',function(e) {
					$(this).removeClass('touched');
				});


				$('.page.ipad .sidebar ul.secondary-menu li .search-menu ul.ui-autocomplete').remove();

				//reinit the header so the autcomplete would work and everything
				mbe.init.header();
			},
			resize: function() {
				var
					window_height = $(window).height(),
					footer_height = 0,
					window_width = $(window).width(),
					sidebar_width = 250;
				var
					middle_height = window_height - footer_height,
					middle_width = window_width - sidebar_width;

				//$('.page .middle .inner').width(middle_width);

				$('.page .sidebar').height(middle_height);
				$('.page .middle #iPadMiddle').height(middle_height);
			}
		},

		iphone: {
			loginReady: function() {
				$('head').append('<meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=0.75, maximum-scale=0.75" />');
				$('.page.login h1').css('margin-top','10px');
			},
			ready: function() {

				//add the ipad class
				$('div.page').addClass('iphone');

				//add the ipad css
				$('head')
					.append('<link rel="stylesheet" type="text/css" href="css/iphone.css" />')
					.append('<script type="text/javascript" src="js/iscroll/iscroll.js"></script>')
					.append('<script type="text/javascript" src="js/jquery.truncate.min.js"></script>')
					.append('<meta name="viewport" content="user-scalable=no, width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" id="viewport-head" />')
					.append('<meta name="apple-mobile-web-app-capable" content="yes" />')
					.append('<meta name="apple-mobile-web-app-status-bar-style" content="black" />');


				var wh = $(window).height();
				//remove the bars
				wh = wh-64;

				$('#viewport-head').attr('content','user-scalable=no, width=device-width, height='+wh+', initial-scale=1.0, maximum-scale=1.0');
				$(window).scrollTop(0);

				//save the header html
				var
					html_footer = $('.page .footer').html(),
					html_header = $('.page .header .inner').html(),
					html_logo = '<h2>'+$('.page .header h2').html()+'</h2>',
					html_menu = '<ul class="main-menu">'+$('.page .header ul.main-menu').html()+'</ul>',
					html_secondary_menu = '<ul class="secondary-menu">'+$('.page .header ul.secondary-menu').html()+'<li><a href="" class="show-menu-link"><img src="img/header-show-menu.png" alt=""></a></li></ul>';

					//remove the header
					$('.page .header').remove();
					$('.page .footer').remove();

					//make the html
					$('div.page').prepend('<div class="top-side">'+html_logo+html_secondary_menu+'<div class="inner" id="iPhoneMenu">'+html_menu+'</div></div>');
					$('.page .top-side').wrapInner('<div class="inner-wrapper"></div>');
					$('div.page').wrapInner('<div class="iphone-vertical"></div>');
					$('.page .middle').wrapInner('<div class="inner" id="iPhoneMiddle"></div>');

					$('.page .block .content table.listing').each(function(index) {
    					$(this).wrap('<div class="inner iphone-table" id="iPhoneTable-'+index+'"></div>');
  					});

					//$('.page .block .content ul.tab-header').wrap('<div class="inner" id="iPhoneTab"></div>');

					$('.page .block .content ul.tab-header').each(function(index) {
    					$(this).wrap('<div class="inner iphone-tab" id="iPhoneTab-'+index+'"></div>');
  					});


					$('.page .middle .wrapper').append('<div class="footer">'+html_footer+'</div>');

				$('.page.iphone .top-side ul').children('li').each(function(){
					if ($(this).is(':first-child')) {
						$(this).addClass('first');
						$(this).children('a').addClass('first');
					} else if ($(this).is(':last-child')) {
						$(this).addClass('last');
						$(this).children('a').addClass('last');
					} else {
						$(this).addClass('regular');
					}
				});

				//on resize (flexible box model)
				mbe.mobile.iphone.resize();
				$(window).resize(mbe.mobile.iphone.resize);

				//add the iscroll to the content
				mbe.mobile.scroll = new iScroll('iPhoneMiddle',{
					hScroll: false,
					bounce: false,
					useTransition: true,
					ignore: 'select,.page .block .content .accordion .title,.page .block .content .accordion .title *'
				});

				if ( $('.iphone-table').size()>0){
					$('.iphone-table').each(function(index) {
						var temp = new iScroll('iPhoneTable-'+index,{
							vScroll: false,
							hScroll: true,
							bounce: false,
							useTransition: true
						});
						mbe.mobile.scrollTable.push(temp);
  					});
				}


				if ( $('.iphone-tab').size()>0){
					$('.iphone-tab').each(function(index) {

						//get tab ul width
						$(this).find('ul').each(function(){
							var t = $(this),
							        tW = 0;
							var das = 0;
							$('li',t).each(function(i){
							    tW += $(this).outerWidth(true);
							    das = i;
							});
							das=das*3;
							t.css('width',tW+das);
						});

						//add tab scroll
						var tabTemp = new iScroll('iPhoneTab-'+index,{
							vScroll: false,
							hScroll: true,
							bounce: false,
							useTransition: true
						});
						mbe.mobile.scrollTab.push(tabTemp);
					});
				}

				//refresh the iscroll when everything loads
				$(window).bind('load',function() {

					if($('.page .block .content .filters .low.active').size()>0){
						$('.page .block .content .filters .low.active').hide();
					}

					setTimeout(function(){
						mbe.mobile.scroll.refresh();
						for (index in mbe.mobile.scrollTable) {
							mbe.mobile.scrollTable[index].refresh();
						};

						for (index in mbe.mobile.scrollTab) {
							mbe.mobile.scrollTab[index].refresh();
						};

					},100);

				});



				//add touch actions to the sidebar -->show user
				$('.page.iphone .top-side .secondary-menu a.user-menu-link').bind('click',function(e){
					e.preventDefault();
				});

				$('.page.iphone .top-side .secondary-menu a.user-menu-link').bind('tapOrClick', function(e){
					e.preventDefault();
					mbe.header.user.toggle();
				});

				//-->show search
				$('.page.iphone .top-side .secondary-menu a.search-menu-link').bind('click',function(e){
					e.preventDefault();
				});

				$('.page.iphone .top-side .secondary-menu a.search-menu-link').bind('tapOrClick', function(e){
					e.preventDefault();
					mbe.header.search.toggle();
				});

				//-->show menu
				$('.page.iphone .top-side .secondary-menu a.show-menu-link').bind('click',function(e){
					e.preventDefault();
				});

				$('.page.iphone .top-side .secondary-menu a.show-menu-link').bind('tapOrClick', function(e){
					e.preventDefault();
					mbe.header.showMenu.toggle();
				});


				$('.page.iphone .top-side #iPhoneMenu ul.main-menu li a').bind('click',function(e){
					e.preventDefault();
				});

				$('.page.iphone .top-side #iPhoneMenu ul.main-menu li a').bind('tapOrClick',function(e){

					if($(e.currentTarget).siblings('ul').size()>0){
						$(e.currentTarget).siblings('ul').slideToggle(mbe.animationSpeed, function(){
							mbe.mobile.scrollMenu.refresh();
						});

					} else {
						var url = $(e.currentTarget).attr('href');
						window.location = url;
					}
				});

				$('.page.iphone .top-side #iPhoneMenu').css({marginTop:'-800px'});



				//truncate vertical tabs
				if($('.page.iphone .block .content .vertical-tabs .tab-list ul li a').size()>0){
					$('.page.iphone .block .content .vertical-tabs .tab-list ul li a').truncate({
					    width: '80',
					    after: '&amp;hellip;'
					});
				}

				//image list
				if($('.page.iphone .block .content ul.image-list').size()>0){
					$("ul.image-list li:nth-child(even)" ).css("margin-right", "0");
				}

				$('.page.iphone .top-side #iPhoneMenu ul.main-menu li a').bind('touchstart mousedown',function(e) {
					$(this).addClass('touched');
				});
				$('.page.iphone .top-side #iPhoneMenu ul.main-menu li a').bind('touchmove mousemove touchend mouseup mouseout',function(e) {
					$(this).removeClass('touched');
				});

				$('.page.iphone .top-side ul.secondary-menu li .search-menu ul.ui-autocomplete').remove();

				//reinit the header so the autcomplete would work and everything
				mbe.init.header();

				$(window).scroll(mbe.mobile.iphone.scroll);
			},
			resize: function() {
				var
					window_height = $(window).height(),
					footer_height = 0,
					window_width = $(window).width(),
					sidebar_width = 250;
				var
					middle_height = window_height - footer_height,
					middle_width = window_width - sidebar_width;

				//init the graph
				mbe.init.graph.ready();

				//$('.page .middle .inner').width(450);

				//alert(window_width);

				$('.page .top-side').height(50);
				$('.page .middle #iPhoneMiddle').height(window_height-50);

				//alert($('.page.iphone .block .top ul').width());

				if($('.page.iphone .block .top ul').width()>140) {
					$('.page.iphone .block .top ul').remove();
				}
			}
		}
	},
	presentation: {
		ready: function() {
			mbe.init.form.validation('form#test-validate-form');

			//login form should not submit unless something is entered
			$('form#login-form').submit(function(e){
				var vars = $(this).serializeArray();
				var shouldContinue = true;
				for (x in vars) {
					if (vars[x].value=='') {
						shouldContinue = false
					}
				}
				if (!shouldContinue) {
					e.preventDefault();

					if (mbe.agent.iphone()) {
						$(this).find('.message').hide();
					} else {
						$(this).find('.message').remove();
					}
					$(this).prepend('<div class="message error">Do not leave the fields empty</div>');

					mbe.init.message.small();
					mbe.login.shake();
				}
			});

			//progress bar init
			$('.page .content .progress-bar .progress').progressbar({
				value:23
			});
			$('.page .content .progress-bar .percentage').html('23%');
		},
		getEvents: function() {
			//calendar
			var date = new Date();
			var d = date.getDate();
			var m = date.getMonth();
			var y = date.getFullYear();

			return [
				{
					title: 'All Day Event',
					start: new Date(y, m, 1)
				},
				{
					title: 'Long Event',
					start: new Date(y, m, d-5),
					end: new Date(y, m, d-2)
				},
				{
					id: 999,
					title: 'Repeating Event',
					start: new Date(y, m, d-3, 16, 0),
					allDay: false
				},
				{
					id: 999,
					title: 'Repeating Event',
					start: new Date(y, m, d+4, 16, 0),
					allDay: false
				},
				{
					title: 'Meeting',
					start: new Date(y, m, d, 10, 30),
					allDay: false
				},
				{
					title: 'Lunch',
					start: new Date(y, m, d, 12, 0),
					end: new Date(y, m, d, 14, 0),
					allDay: false
				},
				{
					title: 'Birthday Party',
					start: new Date(y, m, d+1, 19, 0),
					end: new Date(y, m, d+1, 22, 30),
					allDay: false
				},
				{
					title: 'Click for Google',
					start: new Date(y, m, 28),
					end: new Date(y, m, 29),
					url: 'http://google.com/'
				}
			];
		},
		progressBarSimulate:function(){
			$('.page .content .progress-bar .progress').progressbar({value:23});
			$('.page .content .progress-bar .percentage').html('23%');

			mbe.pbInterval = setInterval(function(){
				var element = $( '.page .content .progress-bar' );
				var value = element.find('.progress').progressbar('option','value');
				if (value < 100) {
					value++;
					element.find('.progress').progressbar('option','value',value);
					element.find('.percentage').html(value+'%');
				} else {
					clearInterval(mbe.pbInterval);
				}
			},30);
		}
	}
}
$(mbe.ready);
$(document).bind('click touchstart',mbe.click);