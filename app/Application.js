/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('Query.Application', {
    extend: 'Ext.app.Application',

    name: 'Query',

    quickTips: false,
    platformConfig: {
        desktop: {
            quickTips: true
        }
    },

    stores: [
      'Query.store.Paneles',
      'Query.store.Preguntas',
      'Query.store.Preguntasxpanel',
      'Query.store.Opciones',
      'Query.store.Opcionesxpregunta',



        // TODO: add global / shared stores here
    ],

    launch: function () {
        // TODO - Launch the application
		Ext.Ajax.request({
			url: 'http://grupobinario.sytes.net/apiQM/empresas',
			//Guardo las configuraciones de la empresa en el localStorage.
			success: function(response, opts) {
				var obj = Ext.decode(response.responseText);
				console.dir(obj);
				localStorage.setItem('logo', obj.empresas.logo);
				localStorage.setItem('empresa', obj.empresas.empresa);
				localStorage.setItem('encuesta', 1);
				localStorage.setItem('colorPrincipal', obj.empresas.colorPrincipal);
				localStorage.setItem('colorSecundario', obj.empresas.colorSecundario);
			},

			failure: function(response, opts) {
				console.log('server-side failure with status code ' + response.status);
			}
		});
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
