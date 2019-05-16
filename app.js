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
Ext.Loader.loadScript({
			 url: 'http://grupobinario.sytes.net:8080/opciones'
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
Ext.define('Model', {
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

});
