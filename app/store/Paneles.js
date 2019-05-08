Ext.define('Query.store.Paneles', {
    extend: 'Ext.data.Store',

    alias: 'store.paneles',
    storeId:'Paneles',
    fields: [
        { name: 'idpanel', type: 'int' },
        { name: 'texto', type: 'string' },
        { name: 'empresa', type: 'string' },
        { name: 'encuesta', type: 'string' }
    ],
autoLoad:true,

    proxy: {
      type: 'ajax'
      // ,url: 'https://api.myjson.com/bins/17pc0w'
      //,url: 'https://api.myjson.com/bins/17vyj0'
      ,url: 'http://grupobinario.sytes.net:8080/paneles'

      ,method: 'GET'
        ,reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});
