Ext.define('Query.store.Preguntas', {
    extend: 'Ext.data.Store',

    alias: 'store.preguntas',
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
      ,url: 'https://api.myjson.com/bins/154xmw'
      ,method: 'GET'
        ,reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});
