Ext.define('Query.store.Opciones', {
    extend: 'Ext.data.Store',

    alias: 'store.Opciones',
    storeId:'Opciones',
    fields: [
        { name: 'idopcion', type: 'int' },
        { name: 'idpregunta', type: 'int' },
        { name: 'valorOpcion', type: 'string' },
        { name: 'empresa', type: 'string' },
        { name: 'encuesta', type: 'string' }
    ],
   autoLoad:true,

    proxy: {
      type: 'ajax'
      // ,url: 'https://api.myjson.com/bins/17pc0w'
      //,url: 'https://api.myjson.com/bins/13t7ac'
      ,url: 'http://grupobinario.sytes.net/apiQM/opciones'

      ,method: 'GET'
        ,reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});
