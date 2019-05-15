/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Query.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    onItemSelected: function (sender, rec) {
      console.log('llegaaaa',rec.get('idpregunta'));
      Ext.Ajax.request({
        url: 'http://grupobinario.sytes.net:8080/resultados?idpregunta='+ rec.get('idpreguntas'),
        method:'GET',
        success: function(response){

          console.log(response.responseText);
          /*Ext.ComponentQuery.query('#grafico')[0].getStore().loadData(        [{ os: 'Android', data1: 68.3 },
            { os: 'BlackBerry', data1: 1.7 },
            { os: 'iOS', data1: 17.9 },
            { os: 'Windows Phone', data1: 10.2 },
            { os: 'Others', data1: 1.9 }])*/
             var result =JSON.parse(response.responseText);
             console.log(result.data);
            Ext.ComponentQuery.query('#grafico')[0].setTitle('Respuestas: '+rec.get('texto'));
            Ext.ComponentQuery.query('#grafico')[0].getStore().loadData(result.data);

        }
        ,failure: function(){
          console.log('salio por failure');
        }
      });

    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    }
});
