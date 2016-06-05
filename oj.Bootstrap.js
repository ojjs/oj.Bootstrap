// oj.Bootstrap

;(function(root, factory){
  // Export to Node, Require.JS, or globally
  if (typeof module === 'object' && module.exports) module.exports = factory(root)
  else if (typeof define === 'function' && define.amd) define(function(){return factory(root)})
  else factory(root, root.oj)
}(this, function(root, oj){

  // Create plugin

  var _slice = Array.prototype.slice,
  _pass = function(v){return v},
  plugin = function(oj, settings){

    if (typeof settings !== 'object') settings = {};

    var _extend = oj.$.extend,
      bsGridSizes = ['lg', 'md', 'sm', 'xs'],
      bsGridClassMap = {lg:'col-lg', md:'col-md', sm:'col-sm', xs:'col-xs',
        lgOffset:'col-lg-offset', mdOffset:'col-md-offset',
        smOffset:'col-sm-offset', xsOffset:'col-xs-offset'},
      BS = {};

    function bsJumbotron(){return _callWithClasses(this, oj.div, ['jumbotron'], arguments)}

    function bsContainer(){return _callWithClasses(this, oj.div, ['container'], arguments)}

    function bsLead(){return _callWithClasses(this, oj.div, ['lead'], arguments)}

    function bsRow(){return _callWithClasses(this, oj.div, ['row'], arguments)}
    function bsCol(){return _callWithClasses(this, oj.div, [], arguments)}

    // <div class="clearfix visible-xs"></div>
    // clearfix({visible:'xs'})
    function bsClearfix(){return _callWithClasses(this, oj.div, ['clearfix'], arguments)}

    // <span glyphicon glyphicon-name></span>
    function bsGlyph(name){
      var rest = _slice.call(arguments, 1);
      return _callWithClasses(this, oj.span, ['glyphicon', 'glyphicon-' + name], rest)}

    // <span fa fa-name fa-size fa-rotation fa-spin></span>
    // {spin:true, fixed:true, stacked:true, list:true, border:true, rotate:90, flip:'horizontal'}
    function faIcon(name){
      var u = oj.unionArguments(_slice.call(arguments, 1)),
        args = u.args,
        options = u.options,
        classes = ['fa', 'fa-' + name],
        inverse = oj.argumentShift(options, 'inverse'),
        spin = oj.argumentShift(options, 'spin'),
        size = oj.argumentShift(options, 'size'),
        rotate = oj.argumentShift(options, 'rotate'),
        flip = oj.argumentShift(options, 'flip')

        if(inverse) classes.push('fa-inverse')
        if(spin) classes.push('fa-spin')
        if(size) classes.push('fa-' + size)
        if(rotate) classes.push('fa-rotate-' + rotate)
        if(flip) classes.push('fa-flip-' + flip)

      return _callWithClasses(this, oj.i, classes, [options].concat(args))
    }

    // <span class="badge badge-default">...</span>
    // Note: Bootstrap 3 badges don't support emphasis but I'm supporting the classes anyway
    function bsBadge(){return _callWithEmphasis(this, oj.span, 'badge', 'default', arguments)}

    // <div class="label label-default">...</div>
    function bsLabel(){return _callWithEmphasis(this, oj.div, 'label', 'default', arguments)}

    // <a href="#" class="alert-link">...</a>
    function bsAlertLink(){return _callWithClasses(this, oj.a, ['alert_link'], arguments)}

    // <div class="alert alert-info"><button></button></div>
    // Note: Bootstrap 3 alerts do not support "default" or "primary"
    function bsAlert(){return _callWithEmphasis(this, oj.div, 'alert', 'info', arguments)}

    // <div class="panel panel-danger">
    //  <div class="panel-body"> Panel content </div>
    //  <div class="panel-footer">Panel footer</div>
    // </div>
    // panel('body content', {title:'hi', header:_panelTitle('hi'), footer:function(){}})
    function bsPanel(){return _callWithEmphasis(this, oj.div, 'panel', 'default', arguments)}
    function bsPanelHeader(){}
    function bsPanelBody(){}
    function bsPanelFooter(){}

    // <div class="page-header"><h1>Header <small>Subtext</small></h1></div>
    function bsPageHeader(){var _t = this, args = arguments; return oj.div({c:'page-header'}, function(){oj.h1.apply(_t, args)})}

    // <div class="btn-group">...</div>
    function bsButtonGroup(){return _callWithClasses(this, oj.div, ['btn-group'], arguments)}

    // <form role="form">...</form>
    var formTag = oj.form
    function bsForm(){return _callWith(this, formTag, arguments, {role:'form'}, [])}

  // <form role="form" class="form-inline">...</form>
    function bsFormInline(){return _callWith(this, formTag, arguments, {role:'form'}, ['form-inline'])}

    // <form role="form" class="form-horizontal">...</form>
    function bsFormHorizontal(){return _callWith(this, formTag, arguments, {role:'form'}, ['form-horizontal'])}

    // <div class="form-group">...</div>
    function bsFormGroup(){return _callWithClasses(this, oj.div, ['form-group'], arguments)}

    // <p class="help-block">...</p>
    function bsFormHelp(){return _callWithClasses(this, oj.p, ['help-block'], arguments)}

    // <div class="btn-toolbar" role="toolbar">...</div>
    function bsButtonToolbar(){return _callWith(this, oj.div, arguments, {role:'toolbar'}, ['btn-toolbar'])}

    // <button btn btn-default btn-lg></button>
    var buttonTag = oj.button;
    function bsButton(){
      var u = oj.unionArguments(arguments), args = u.args, options = u.options,
        glyph = oj.argumentShift(options, 'glyph'),
        icon = oj.argumentShift(options, 'icon'),
        iconSize = oj.argumentShift(options, 'iconSize'),
        iconSpin = oj.argumentShift(options, 'iconSpin'),
        iconFlip = oj.argumentShift(options, 'iconFlip'),
        iconInverse = oj.argumentShift(options, 'iconInverse'),
        size = oj.argumentShift(options, 'size'),
        emphasis = oj.argumentShift(options, 'emphasis'),
        block = oj.argumentShift(options, 'block'),
        classes = ['btn']
        if (emphasis) classes.push('btn-' + emphasis)
        if (size) classes.push('btn-' + size)
        if (block) classes.push('btn-' + block)
      // Add glyph if option was set

      insertGlyph = (!glyph ? [_pass] : [function(){bsGlyph(glyph)}, ' ']);
      insertIcon = (!icon ? [_pass] : [function(){faIcon(icon, {size:iconSize, spin:iconSpin, flip:iconFlip, inverse:iconInverse})}, ' ']);
      insert = insertGlyph
      if(icon)
        insert = insertIcon
      return _callWith(this, buttonTag, args.concat(insert), options, classes)
    }
    bsButton.tag = buttonTag

    // Get an elements classes as an Array
    function _getClasses($el){
      var cls = $el.attr('class')
      if (cls)
        return cls.split(/\s+/)
      return []
    }

    // Find the first class with a prefix and return the name minus the prefix
    function _findClassPrefix($el, prefix){
      var classes = _getClasses($el), ix = 0, cls;
      for (;ix < classes.length; ix++) {
        cls = classes[ix];
        if(cls.indexOf(prefix) == 0)
          return cls.slice(prefix.length)
      }
      return null;
    }

    // Remove all classes with the prefix
    function _removeClassPrefix($el, prefix){
      var classes = _getClasses($el), ix = 0, cls;
      for (;ix < classes.length; ix++) {
        cls = classes[ix];
        if(cls.indexOf(prefix) == 0)
          $el.removeClass(cls)
      }
    }

    // Remove all classes in arr
    function _removeClasses($el, arr){
      for (var ix = 0; ix < arr.length; ix++)
        $el.removeClass(arr[ix])
    }

    var Button = oj.createType('Button', {
      base: oj.Button,
      constructor: function(){
        var u = oj.unionArguments(arguments), args = u.args, options = u.options,
          emphasis = oj.argumentShift(options, 'emphasis'),
          glyph = oj.argumentShift(options, 'glyph'),
          size = oj.argumentShift(options, 'size'),
          block = oj.argumentShift(options, 'block')

        this.icon = oj.argumentShift(options, 'icon')
        this.iconSize = oj.argumentShift(options, 'iconSize')
        this.iconRotate = oj.argumentShift(options, 'iconRotate')
        this.iconSpin = oj.argumentShift(options, 'iconSpin')
        this.iconFlip = oj.argumentShift(options, 'iconFlip')
        this.iconInverse = oj.argumentShift(options, 'iconInverse')

        if (emphasis) _addClassOption(options, 'btn-' + emphasis)
        if (size) _addClassOption(options, 'btn-' + size)
        if (block) _addClassOption(options, 'btn-' + block)

        Button.base.constructor.apply(this, [options].concat(args));

        this.addClass('btn')
        this.emphasis = emphasis || 'default';
        this.glyph = glyph;
        this.size = size;

        this._remakeIcon();
      },
      properties: {
        emphasis: {
          get: function(){return this._emphasis || (this._emphasis = _findClassPrefix(this.$el, 'btn-'));},
          set: function(v){
            this._emphasis = v
            _removeClasses(this.$el, ['btn-default', 'btn-primary', 'btn-success', 'btn-info', 'btn-warning', 'btn-danger'])
            if (v)
              this.addClass('btn-' + v)
          }
        },
        size: {
          get: function(){return this._size || 'md'},
          set: function(v){
            this._size = v
            _removeClasses(this.$el, ['btn-lg', 'btn-sm', 'btn-md', 'btn-xs'])
            if(v)
              this.$el.addClass('btn-' + v)
          }
        },
        glyph: {
          get: function(){
            if (this._glyph)
              return this._glyph
            var $glyph = this.$glyph
            if (!$glyph)
              return null
            return _findClassPrefix($glyph, 'glyphicon-')
          },
          set: function(v){
            this._glyph = v;
            var $glyph = this.$glyph
            if (v == null && $glyph) {
              this.$('> .glyphspace').remove()
              return $glyph.remove()
            } else if ($glyph.length > 0) {
              _removeClassPrefix($glyph, 'glyphicon-')
              $glyph.addClass('glyphicon-' + v)
            } else {
              this.$el.ojPrepend(function(){bsGlyph(v); span({c:'glyphspace'}, ' ')})
            }
          }
        },
        icon: {
          get: function(){return this._icon || null},
          set: function(v){this._icon = v; this._remakeIcon()}
        },
        iconSize: {
          get: function(){return this._iconSize || null},
          set: function(v){this._iconSize = v; this._remakeIcon()}
        },
        iconRotate: {
          get: function(){return this._iconRotate || null},
          set: function(v){this._iconRotate = v; this._remakeIcon()}
        },
        iconSpin: {
          get: function(){return this._iconSpin || null},
          set: function(v){this._iconSpin = v; this._remakeIcon()}
        },
        iconInvert: {
          get: function(){return this._iconInvert || null},
          set: function(v){this._iconInvert = v; this._remakeIcon()}
        },
        iconFlip: {
          get: function(){return this._iconFlip || null},
          set: function(v){this._iconFlip = v; this._remakeIcon()}
        },

        $glyph: {get:function(){return this.$('> .glyphicon')}}
      },
      methods:{
        _remakeIcon: function(){
          if(!this.isConstructed || !this.icon)
            return;
          // Remove original icon
          var _t = this;
          _t.$('> .fa').remove()
          _t.$('> .fa-space').remove()
          _t.$el.ojPrepend(function(){
            faIcon(_t.icon, {size:_t.iconSize, rotate:_t.iconRotate, spin:_t.iconSpin, invert:_t.iconInvert, flip:_t.iconFlip})
            span(' ', {c:'fa-space'})
          })
        }
      }

    })
    Button.Type = oj.Button

    var NavGroup = oj.createType('NavGroup', {
      base: oj.BulletList,
      constructor: function(){
        var u = oj.unionArguments(arguments), args = u.args, options = u.options,
          right = oj.argumentShift(options, 'right')
        NavGroup.base.constructor.apply(this, [options].concat(args))
        this.addClass('nav')
        this.navType = options.navType || 'navbar'
        this.right = right
      },
      properties:{
        navType: {
          get:function(){return this._navType},
          set:function(v){
            var classes = ['nav-tabs', 'nav-pills', 'navbar-nav'],
              c = 'navbar-nav'
            for(var ix = 0; ix < classes.length; ix++)
              this.removeClass(classes[ix])
            if(v == 'tabs')
              c = 'nav-tabs'
            else if (v == 'pills')
              c = 'nav-pills'
            this.addClass(c)
          }
        },
        right: {
          get:function(){return this._right != null ? this._right : false},
          set:function(v){this._right = v; var r = 'navbar-right'; if(v) this.$el.addClass(r); else this.$el.removeClass(r) }
        }
      },
      methods:{
      }
    })

    var Nav = oj.createType('Nav', {
      base: oj.View,
      constructor: function(){
        var u = oj.unionArguments(arguments), args = u.args, options = u.options,
          label = args.length > 0 ? args.shift() : '',
          href = oj.argumentShift(options, 'href') || ('#' + _dasherize(label)),
          content = oj.argumentShift(options, 'content') || '',
          active = oj.argumentShift(options, 'active') || false
        this.el = oj(function(){
          oj.li(function(){
            oj.a(label, {href:href, 'data-toggle':'tab'})
          })
        })
        Nav.base.constructor.apply(this, [options].concat(args))
        this._label = label
        this._href = href
        this.active = active
        this.content = content
      },
      properties:{
        // Indicate this is a list item that replaces the <li> element
        isListItem: true,
        label:{
          get:function(){return this.$a.ojValue()},
          set:function(v){this._label = v; this.make()}
        },
        href:{
          get:function(){return this._href == null ? '' : this._href},
          set:function(v){this._href = v; this.make()}
        },
        active:{
          get:function(){this.hasClass('active')},
          set:function(v){if(v) this.addClass('active'); else this.removeClass('active')}
        },
        content:{
          get:function(){return this._content},
          set:function(v){this._content = v}
        },
        $a:{
          get:function(){return this.$('> a')}
        }
      },
      methods:{
        make:function(){
          var _t = this
          this.$a.ojReplaceWith(function(){oj.a(_t.label, {href:_t.href})})
        }
      }
    })

    var TabGroup = oj.createType('TabGroup', {
      base: NavGroup,
      constructor: function(){
        var args = [{navType:'tabs'}].concat(_slice.call(arguments))
        return TabGroup.base.constructor.apply(this, args)
      }
    })

    var PillGroup = oj.createType('PillGroup', {
      base: NavGroup,
      constructor: function(){
        var args = [{navType:'pills'}].concat(_slice.call(arguments))
        return PillGroup.base.constructor.apply(this, args)
      }
    })

    var Tab = oj.createType('Tab', {base: Nav, constructor: function(){Tab.base.constructor.apply(this, arguments)}})

    var Pill = oj.createType('Pill', {base: Nav, constructor: function(){Pill.base.constructor.apply(this, arguments)}})

    function bsTabContent(){return _callWithClasses(this, oj.div, ['tab-content'], arguments)}
    function bsTabPane(){
        var u = oj.unionArguments(arguments), args = u.args, options = u.options,
          active = oj.argumentShift(options, 'active'),
          classes = ['tab-pane']
          if (active)
            classes.push('active')
      return _callWithClasses(this, oj.div, classes, arguments)
    }

    var TabPane = oj.createType('TabPane', {
      base: oj.View,
      constructor: function(){
        var u = oj.unionArguments(arguments), args = u.args, options = u.options,
          active = oj.argumentShift(options, 'active') || false,
          fade = oj.argumentShift(options, 'fade') || false

        this.el = oj(function(){
          oj.div.apply(this, args)
        })

        TabPane.base.constructor.apply(this, [options])

        this.addClass('tab-pane')
        this.active = active
        this.fade = fade
      },
      properties:{
        fade: {
          get:function(){return this._fade},
          set:function(v){
            this._fade = v;
            if(v) {
              if(this.active)
                this.addClass('in')

              this.addClass('fade');
            } else
              this.removeClass('fade')
          }
        },
        active: {
          get:function(){return this._active},
          set:function(v){this._active = v; if(v) this.addClass('active'); else this.removeClass('active')}
        },
        isListItem: true
      }
    })

    var TabContent = oj.createType('TabContent', {
      base: oj.List,
      constructor: function(){
        var u = oj.unionArguments(arguments), args = u.args, options = u.options,
          tabGroup = oj.argumentShift(options, 'tabGroup'),
          fade = oj.argumentShift(options, 'fade'),
          ix = 0
        // Wrap args in TabPane
        for(;ix < args.length; ix++)
          if(!oj.isOJInstance(args[ix]))
            args[ix] = _TabPane(args[ix])

        TabContent.base.constructor.apply(this, [options].concat(args))

        this.addClass('tab-content')
        this.tabGroup = tabGroup
        this.fade = fade
      },
      properties: {
        tabGroup: {
          get:function(){return this._tabGroup},
          set:function(v){this._tabGroup = v; this._linkTabs(); this._updateFade()}
        },
        fade: {
          get:function(){return this._fade || false},
          set:function(v){this._fade = v; this._updateFade()}
        }
      },
      methods: {
        // Ensure Tab hrefs match to TabPane ids
        _linkTabs: function(){
          // Do nothing if tabs weren't bound yet
          if (!oj.isOJInstance(this.tabGroup))
            return

          // Link tab href to content id
          var tabs = this.tabGroup.items
          var panes = this.items
          var firstTab = null
          var firstPane = null
          var activeFound = false
          for(var ix = 0; ix < Math.min(panes.length, tabs.length); ix++) {
            var tab = tabs[ix]
            var pane = panes[ix]
            var href = tab.href
            firstTab = firstTab || tab
            firstPane = firstPane || pane
            activeFound = activeFound || tab.active
            // The panes id is the href without the #
            if (oj.isString(href) && href.length > 0 && href[0] == '#')
              pane.id = href.slice(1)
          }
          if(!activeFound) {
            if (firstTab) firstTab.active = true
            if (firstPane) firstPane.active = true
          }
        },
        _updateFade: function(){
          // Link tab href to content id
          var panes = this.items
          for(var ix = 0; ix < panes.length; ix++)
            panes[ix].fade = this.fade
        }
      }
    })

    var Menu = oj.createType('Menu', {
      base: oj.BulletList,
      constructor: function(){

        var u = oj.unionArguments(arguments),
        args = u.args,
        options = u.options,
        id = oj.argumentShift(options, 'id'),
        _t = this

        options.role = 'menu'

        Menu.base.constructor.apply(_t, [options].concat(args))

        _t.addClass('dropdown-menu')
        _t.id = id || _t.id
      },
      properties:{
        // id is set in the 'aria-labelledby' attribute
        id: {
          get:function(){return this._id || (this._id = _guid())},
          set:function(v){this._id = v; this.$el.attr('aria-labelledby', v)}
        }
      },
      methods:{
      }
    })

    var MenuLink = oj.createType('MenuLink', {
      base: oj.View,
      constructor: function(){
        var u = oj.unionArguments(arguments), args = u.args, options = u.options,
          href = oj.argumentShift(options, 'href') || '#',
          disable = oj.argumentShift(options, 'disable') || false
        this.el = oj(function(){
          oj.li({role:'presentation'}, function(){
            oj.a.apply(null, [{role:'menuitem', tabindex:'-1'}].concat(args))
          })
        });
        MenuLink.base.constructor.apply(this, arguments)
        this.addClass()
        this.disable = disable
        this.href = href
      },
      properties:{
        href: {
          get:function(){return this._href == null ? '' : this._href},
          set:function(v){this._href = v; this.$a.attr('href', v)}
        },
        $a:{
          get:function(){return this.$('> a')}
        },
        // disable: {
        //   get:function(){},
        //   set:function(v){}
        // },
        isListItem:true
      }
    })

    var MenuDivider = oj.createType('MenuDivider', {
      base: oj.View,
      constructor: function(){
        this.el = oj(function(){
          oj.li({role:'presentation'})
        })
        MenuDivider.base.constructor.apply(this, arguments)
        this.addClass('divider')
      },
      properties:{
        isListItem:true
        // ,disable: {
        //   get:function(){},
        //   set:function(v){}
        // }
      }
    })

    var MenuHeader = oj.createType('MenuHeader', {
      base: oj.View,
      constructor: function(){
        var u = oj.unionArguments(arguments), args = u.args, options = u.options, _t = this
        _addClassOption(options, 'dropdown-header')
        this.el = oj(function(){
          oj.li.apply(_t, args)
        })
        MenuHeader.base.constructor.apply(this, [options])
      },
      properties:{
        isListItem:true
      }
    })


    var Dropdown = oj.createType('Dropdown', {
      base: oj.View,
      constructor: function(){

        var u = oj.unionArguments(arguments),
        args = u.args,
        options = u.options,
        rest = args.slice(1),
        kind = oj.argumentShift(options, 'kind') || 'button',
        // Default label to property or first argument
        label = oj.argumentShift(options, 'label') || (oj.isString(args[0]) ? args[0] : ''),
        // Default menu to property or second argument
        menu = oj.argumentShift(options, 'menu') || (oj.isOJInstance(args[1]) ? args[1] : _Menu()),
        href = oj.argumentShift(options, 'href') || '#'
        _t = this

        if(kind == 'button')
          _t._tagName = 'div'
        else
          _t._tagName = 'li'

        _t.el = oj(function(){
          // <div class="dropdown">
          oj[_t.tagName](function(){
            // <button class="btn dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown">
            //   <span class="caret"></span>
            bsButton()
            // <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
            //   <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Action</a></li>
            menu.emit()
          })
        })

        Dropdown.base.constructor.apply(_t)

        _t.menu = menu
        _t.label = label
        _t.href = href

        // Finishing setting <button>
        _t.kind = kind
        _t.addClass('dropdown')
        _t.addClass('btn-group')
      },
      properties:{
        guid: null,
        menu: null,
        tagName: {
          get:function(){return this._tagName},
        },
        kind: {
          get:function(){return this._type},
          set:function(v){this._type = v; this._updateLabel()}
        },
        label: {
          get:function(){return this._label},
          set:function(v){this._label = v.trim(); this._updateLabel()}
        },
        href: {
          get:function(){return this._href},
          set:function(v){this._href = v; this.$label.attr('href', v)}
        },
        $label: {
          get: function(){
            // The label is either <button> or <a>
            return this.$('> button, > a')
          }
        },
        isListItem: false
      },
      methods:{
        _updateLabel:function(){
          var _t = this,
          innerTag = oj.a,
          typeButton = {}
          classes = []
          if (_t.kind == 'button') {
            innerTag = bsButton
            typeButton = {type:'button'}
            classes = ['btn btn-default']
          }

          this.$label.remove()
          this.$el.ojPrepend(function(){
            innerTag(' ' + _t.label + ' ', typeButton, {c:classes.concat(['dropdown-toggle']), href:_t.href, 'data-toggle':'dropdown', id:_t.guid}, function(){
              oj.span({c:'caret'})
            })
          })
        }
      }
    })

    var DropdownButton = oj.createType('DropdownButton', {
      base: Dropdown,
      constructor: function(){
        return _callWith(this, DropdownButton.base.constructor, arguments, {kind:'button'}, [])
      }
    });

    var NavBar = oj.createType('NavBar', {
      base: oj.View,
      constructor: function(){
        var u = oj.unionArguments(arguments),
        args = u.args,
        options = u.options,
        brand = oj.argumentShift(options, 'brand'),
        href = oj.argumentShift(options, 'href'),
        _t = this

        // First argument can be brand
        if(!oj.isOJInstance()) {
          brand = brand || args[0]
          args.shift()
        }

        this.el = oj(function(){
          nav({c:['navbar', 'navbar-default'], role:'navigation'},
            _div({c:['navbar-header']}, function(){
              button({type:'button', c:'navbar-toggle', 'data-toggle':'collapse', 'data-target':'#' + _t.this}, function(){
                span({c:'sr-only'}, 'Toggle navigation')
                span({c:'icon-bar'})
                span({c:'icon-bar'})
                span({c:'icon-bar'})
              })
              a({c:'navbar-brand', href:href}, oj(brand))
            }),
            _callWith(this, _div, args, {id:_t.id}, ['collapse', 'navbar-collapse'])
          )
        })
        NavBar.base.constructor.apply(this, arguments)

        _t._href = href
      },
      properties:{
        id: {
          get:function(){return this._id || (this._id = _guid())},
          set:function(v){this._id = v; this.$('> .collapse').attr('id', v); this.$('> .navbar-toggle').attr('data-target', '#' + v)}
        },
        href: {
          get:function(){return this._href || '#'},
          set:function(v){this._href = v; this.$('.navbar-brand').attr('href', v)}
        },
        brand: {
          get:function(){return this._brand},
          set:function(v){this._brand = v; this.$('.navbar-brand').attr('href', v)}
        }
      }
    })

    var NavDropdown = oj.createType('NavDropdown', {
      base: Dropdown,
      constructor: function(){
        return _callWith(this, NavDropdown.base.constructor, arguments, {kind:'nav'}, [])
      }
    });

    var TabDropdown = oj.createType('TabDropdown', {
      base: Dropdown,
      constructor: function(){
        return _callWith(this, TabDropdown.base.constructor, arguments, {kind:'tab', isListItem: true, tagName: 'li'}, [])
      }
    });

    var TextBox = oj.createType('TextBox', {
      base: oj.TextBox,
      constructor: function(){
        return _callWith(this, TextBox.base.constructor, arguments, {}, ['form-control'])
      }
    });
    TextBox.Type = oj.TextBox

    var TextArea = oj.createType('TextArea', {
      base: oj.TextArea,
      constructor: function(){
        return _callWith(this, TextArea.base.constructor, arguments, {}, ['form-control'])
      }
    });
    TextArea.Type = oj.TextArea

    var ListBox = oj.createType('ListBox', {
      base: oj.ListBox,
      constructor: function(){
        return _callWith(this, ListBox.base.constructor, arguments, {}, ['form-control'])
      }
    });
    ListBox.Type = oj.ListBox


    var TypeaheadBox = oj.createType('TypeaheadBox', {
      base: oj.TextBox,
      constructor: function(){
        return _callWith(this, TypeaheadBox.base.constructor, arguments, {'data-provide':'typeahead'}, [])
      },
      properties: {


      },
      methods: {

      }
    });

    // Enhance oj.tag with a few different concepts:
    // pull:'left', emphasis:'danger', clear:true, align:'left'
    var tagOld = oj.tag
    function bsTag(name){
      var rest = 2 <= arguments.length ? _slice.call(arguments, 1) : [],
        u = oj.unionArguments(rest),
        args = u.args,
        options = u.options,
        pull = oj.argumentShift(options, 'pull'),
        emphasis = oj.argumentShift(options, 'emphasis'),
        align = oj.argumentShift(options, 'align')
        clear = oj.argumentShift(options, 'clear')
        if(pull) _addClassOption(options, 'pull-' + pull)
        if(emphasis) _addClassOption(options, 'text-' + emphasis)
        if(align) _addClassOption(options, 'text-' + align)
        if(clear) _addClassOption(options, 'clearfix')
        // Replace column properties with column attributes
        for(var option in options) {
          // Convert options prefixed with keys in bsGridSizes
          if(bsGridClassMap[option]) {
            cls = bsGridClassMap[option] + '-' + options[option]
            _addClassOption(options, cls)
            delete options[option]
          }
        }
      return tagOld.apply(this, [name, options].concat(args))
    }

    bsTag.isClosed = tagOld.isClosed

    // Button.Type = oj.Button

    _extend(BS, {
      row: bsRow,
      col: bsCol,
      tag: bsTag,
      jumbotron: bsJumbotron,
      container: bsContainer,
      icon: faIcon,
      glyph: bsGlyph,
      badge: bsBadge,
      panel: bsPanel,
      labelText: bsLabel,
      alertText: bsAlert,
      alertLink: bsAlertLink,
      button: bsButton,
      buttonToolbar: bsButtonToolbar,
      buttonGroup: bsButtonGroup,
      pageHeader: bsPageHeader,
      Button: Button,
      NavBar: NavBar,
      NavGroup: NavGroup,
      Nav: Nav,
      NavDropdown: NavDropdown,
      TabGroup: TabGroup,
      Tab: Tab,
      TabDropdown: TabDropdown,
      TabContent:TabContent,
      TabPane:TabPane,

      form:bsForm,
      formInline: bsFormInline,
      formHorizontal: bsFormHorizontal,
      formGroup:bsFormGroup,
      formHelp:bsFormHelp,
      TextBox:TextBox,
      TextArea:TextArea,
      ListBox:ListBox,

      TypeaheadBox: TypeaheadBox,
      Dropdown:Dropdown,
      DropdownButton:DropdownButton,
      Menu:Menu,
      MenuLink:MenuLink,
      MenuDivider:MenuDivider,
      MenuHeader:MenuHeader,
      PillGroup: PillGroup,
      Pill: Pill
      // buttonToolbar: bsButtonToolbar

    });

    // BSTable
    // <div class="alert alert-success">...</div>
    BS.BSTable = oj.createType('BSTable', {
      base: oj.Table,
      constructor: function(){
        return _callWith(this, BS.BSTable.base.constructor, arguments, {}, ['table']);
      }
    });

    oj.settings.defaultThemes = ['bootstrap3']

    return BS;

    // Call fn but add a class to its arguments
    function _callWithClasses(This, fn, classes, args) {
      return _callWith(This, fn, args, {}, classes)
    }

    // Call fn but add a class to its arguments
    function _callWith(This, fn, args, props, classes) {
      var u = oj.unionArguments(args), argList = u.args, options = u.options
      _addClassesOption(options, classes)
      _extend(options, props)
      return fn.apply(This, [options].concat(argList))
    }

    function _callWithEmphasis(This, fn, emphasisName, emphasisDefault, args) {
      var u = oj.unionArguments(args), argsList = u.args, options = u.options,
        classes = [emphasisName],
        emphasis = oj.argumentShift(options, 'emphasis');
      // Default emphasis
      if (!emphasis)
        emphasis = emphasisDefault
      // Add class: name-emphasis (e.g. alert-danger)
      classes.push(emphasisName + '-' + emphasis)
      return _callWithClasses(this, fn, classes, [options].concat(argsList));
    }

    // Add a class to the options object
    // This is tricky because of the complexity of c vs classes properties
    function _addClassOption(options, cls) {
      // Add if missing
      if(options.c == null)
        options.c = [cls];
      // Split if "string separated"
      else if(oj.isString(options.c))
        options.c = options.c.split(' ').concat([cls])
      // Concat otherwise
      else if (oj.isArray(options.c))
        options.c = options.c.concat([cls])
    }

    // Add a class to the options object
    // This is tricky because of the complexity of c vs classes properties
    function _addClassesOption(options, classes) {classes.forEach(function(cls){_addClassOption(options, cls)})}

    // _decamelize: Convert from camal case to underscore case
    function _decamelize(str){return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase()}

    // _dasherize: Convert from camal case or space seperated to dashes
    function _dasherize(str){return _decamelize(str).replace(/[ _]/g, '-')}

    // _guid
    function _guid(){return 'oj-' + ("00000" + (Math.random()*Math.pow(36,5) << 0).toString(36)).substr(-5)}
  }

  // Export to OJ
  if (typeof oj != 'undefined') oj.use(plugin);
  return plugin;
}));
