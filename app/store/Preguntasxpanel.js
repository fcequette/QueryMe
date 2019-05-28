

Ext.define('Query.store.Preguntasxpanel', {
    extend: 'Ext.data.Store',

    alias: 'store.preguntas',
    storeId:'Preguntasxpanel',
    fields: [
        { name: 'idpanel', type: 'int' },
        { name: 'idpregunta', type: 'int' },
        { name: 'tipo', type: 'string' },
        { name: 'texto', type: 'string' },
        { name: 'empresa', type: 'string' },
        { name: 'encuesta', type: 'string' }
    ],
//autoLoad:true,

    proxy: {
      type: 'ajax'
      //,url: 'https://api.myjson.com/bins/154xmw'
      // ,url:'https://api.myjson.com/bins/d67fg'
      // ,url:'https://api.myjson.com/bins/1d1bre'
      ,url:'http://grupobinario.sytes.net/apiQM/preguntas'
      ,method: 'GET'
        ,reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});
