/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 */
Ext.application({
    name: 'Query',

    extend: 'Query.Application',

    requires: [
        'Query.view.main.Main'
    ],

    // The name of the initial view to create. With the classic toolkit this class
    // will gain a "viewport" plugin if it does not extend Ext.Viewport. With the
    // modern toolkit, the main view will be added to the Viewport.
    //
    mainView: 'Query.view.main.Main'

    //-------------------------------------------------------------------------
    // Most customizations should be made to Query.Application. If you need to
    // customize this file, doing so below this section reduces the likelihood
    // of merge conflicts when upgrading to new versions of Sencha Cmd.
    //-------------------------------------------------------------------------
});
Ext.Ajax._defaultHeaders = {
  'Access-Control-Allow-Credentials' : true,
    'Access-Control-Allow-Origin':'*',
    'Content-Type':'application/json',
    'empresa': localStorage.getItem('empresa'),
    'encuesta': localStorage.getItem('encuesta'),

};
Ext.override(Ext, {
  cq1: function(selector) {
    return Ext.ComponentQuery.query(selector)[0];
  }
});

Ext.define('Torneo.overrides.grid.column.Action', {
	override: 'Ext.grid.column.Action',

	// overridden to implement
	defaultRenderer: function(v, cellValues, record, rowIdx, colIdx, store, view) {
		var me = this,
			prefix = Ext.baseCSSPrefix,
			scope = me.origScope || me,
			items = me.items,
			len = items.length,
			i = 0,
			item, ret, disabled, tooltip,glyph, glyphParts, glyphFontFamily;

		// Allow a configured renderer to create initial value (And set the other values in the "metadata" argument!)
		// Assign a new variable here, since if we modify "v" it will also modify the arguments collection, meaning
		// we will pass an incorrect value to getClass/getTip
		ret = Ext.isFunction(me.origRenderer) ? me.origRenderer.apply(scope, arguments) || '' : '';

		cellValues.tdCls += ' ' + Ext.baseCSSPrefix + 'action-col-cell';
		for (; i < len; i++) {
			item = items[i];

			disabled = item.disabled || (item.isDisabled ? item.isDisabled.call(item.scope || scope, view, rowIdx, colIdx, item, record) : false);
			tooltip = disabled ? null : (item.tooltip || (item.getTip ? item.getTip.apply(item.scope || scope, arguments) : null));
			if(Ext.isFunction(item.getGlyph)){
				glyph = item.getGlyph.apply(item.scope || scope, arguments);
			}else{
				glyph = item.glyph;
			}

			// Only process the item action setup once.
			if (!item.hasActionConfiguration) {
				// Apply our documented default to all items
				item.stopSelection = me.stopSelection;
				item.disable = Ext.Function.bind(me.disableAction, me, [i], 0);
				item.enable = Ext.Function.bind(me.enableAction, me, [i], 0);
				item.hasActionConfiguration = true;
			}
			if (glyph ) {

				if (typeof glyph === 'string') {
					glyphParts = glyph.split('@');
					glyph = glyphParts[0];
					glyphFontFamily = glyphParts[1];
				} else {
					glyphFontFamily = Ext._glyphFontFamily;
				}

				ret += '<span role="button" title="' + (item.altText || me.altText) + '" class="' + prefix + 'action-col-icon ' + prefix + 'action-col-glyph ' + prefix + 'action-col-' + String(i) + ' ' + (disabled ? prefix + 'item-disabled' : ' ') +
					' ' + (Ext.isFunction(item.getClass) ? item.getClass.apply(item.scope || scope, arguments) : (item.iconCls || me.iconCls || '')) + '"' +
					' style="font-family:' + glyphFontFamily + '"' +
					(tooltip ? ' data-qtip="' + tooltip + '"' : '') + '>&#' +  glyph + ';</span>';
			} else {
				ret += '<img role="button" alt="' + (item.altText || me.altText) + '" src="' + (item.icon || Ext.BLANK_IMAGE_URL) +
					'" class="' + me.actionIconCls + ' ' + prefix + 'action-col-' + String(i) + ' ' + (disabled ? prefix + 'item-disabled' : ' ') +
					(Ext.isFunction(item.getClass) ? item.getClass.apply(item.scope || scope, arguments) : (item.iconCls || me.iconCls || '')) + '"' +
					(tooltip ? ' data-qtip="' + tooltip + '"' : '') + ' />';
			}
		}
		return ret;
	}
});

Ext.Loader.loadScript({
			 url: 'http://grupobinario.sytes.net/apiQM/opciones'
			,onLoad: function(){
				console.info('Opciones agregadas correctamentes!');
			}
			,onError: function() {
				console.error('Error al agregar opciones');
			}
		});

  /*  Ext.define('Model', {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'id',  type: 'string'},
            {name: 'value',   type: 'int', convert: null}
        ],


    });*/
/*Ext.define('Query.store.store0', {
  extend: 'Ext.data.Store',
  alias: 'store.store0',
  storeId:'store0',
  fields: [ 'value0', 'display0' ],
   autoLoad:false,
   data: { items: [ { value0: 0, display0: 'SI'}]}
   ,proxy: { type: 'memory', reader: { type: 'json', rootProperty: 'items' }
 }
});


Ext.create('Query.store.store0');
Ext.define('Query.store.store1', {
    extend: 'Ext.data.Store',

    alias: 'store.store1',
    storeId:'store1',
    fields: [
        'value1', 'display1'
    ],
    autoLoad:false,

    data: { items: [
        { value1: 'Spining', display1: 'Spining'},
        { value1: 'Ritmos', display1: 'Ritmos'},
        { value1: 'Funcional', display1: 'Funcional'},
        { value1: 'Funcional Mixto', display1: 'Funcional Mixto'},
        { value1: 'Bunguie', display1: 'Bungie'}
    ]},

    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});
Ext.create('Query.store.store1');
Ext.define('Query.store.store2', {
    extend: 'Ext.data.Store',

    alias: 'store.store2',
    storeId:'store2',
    fields: [
        'value2', 'display2'
    ],
    autoLoad:false,

    data: { items: [
        { value2: 'Sabri', display2: 'Sabri'},
        { value2: 'Caro', display2: 'Caro'},
        { value2: 'Yami', display2: 'Yami'},
        { value2: 'Lari', display2: 'Lari'}
    ]},

    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});
Ext.create('Query.store.store2');*/
/*Ext.define('Model', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'value0',  type: 'string'},
        {name: 'value1',   type: 'int' },
        {name: 'value2', type: 'string'},
        {name: 'value3', type: 'int'},
        {name: 'value4', type: 'int'}
    ]
      ,validators: [
          {type: 'presence', field: 'value0', message: 'Something wrong'},

      ]

});*/
Ext.define('Model', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'value0',  type: 'string' ,  defaultValue: 0},
        {name: 'value1',   type: 'string', defaultValue: 0 },
        {name: 'value2', type: 'string', defaultValue: 0},
        {name: 'value3', type: 'string', defaultValue: 0},
        {name: 'value4', type: 'string', defaultValue: 0}
    ]
      ,validators: {
          value0:     'presence',
		  value1:     'presence',
		  value2:	  'presence',
		  value3:	  'presence',
		  value4:	  'presence',
		  value5:	  'presence'
      }

});
