Ext.define('Query.store.Personnel', {
    extend: 'Ext.data.Store',

    alias: 'store.personnel',

    extend: 'Ext.data.Store',

    // alias: 'store.preguntas',
    storeId:'Preguntas',
    fields: [
        { name: 'idpanel', type: 'int' },
        { name: 'idpregunta', type: 'int' },
        { name: 'tipo', type: 'string' },
        { name: 'texto', type: 'string' },
        { name: 'empresa', type: 'string' },
        { name: 'encuesta', type: 'string' }
    ],
    autoLoad:true,

    proxy: {
      type: 'ajax'
      //,url: 'https://api.myjson.com/bins/154xmw'
      // ,url:'https://api.myjson.com/bins/d67fg'
      // ,url:'https://api.myjson.com/bins/1d1bre'
      ,url:'http://grupobinario.sytes.net:8080/preguntas'
      ,method: 'GET'
        ,reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});
