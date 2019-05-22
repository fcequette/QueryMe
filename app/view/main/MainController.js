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
        url: 'http://grupobinario.sytes.net:8080/resultados/'+ rec.get('idpreguntas'),
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
            if(result.type == 'abierta'){
              Ext.ComponentQuery.query('#panelAbierto')[0].show();
              Ext.ComponentQuery.query('#panelCerrado')[0].hide();
              Ext.ComponentQuery.query('#panelAbierto')[0].setTitle(rec.get('texto'));
              Ext.ComponentQuery.query('#panelAbierto')[0].getStore().loadData(result.data);
            }else{
              Ext.ComponentQuery.query('#grafico')[0].setTitle(rec.get('texto'));
              Ext.ComponentQuery.query('#grafico')[0].getStore().loadData(result.data);
              Ext.ComponentQuery.query('#panelAbierto')[0].hide();
              Ext.ComponentQuery.query('#panelCerrado')[0].show();
            }

        }
        ,failure: function(){
          console.log('salio por failure');
        }
      });

    },
    onPreview: function () {
       if (Ext.isIE8) {
           Ext.Msg.alert('Unsupported Operation', 'This operation requires a newer version of Internet Explorer.');
           return;
       }
       var chart = this.lookup('chart');
       chart.preview();
   },

   onDataRender: function (v) {
       return v + '%';
   },

   onSeriesTooltipRender: function (tooltip, record, item) {
       tooltip.setHtml(record.get('os') + ': ' + record.get('data1') + '%');
   }

    ,onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    }
    ,afterRender: function(panel, e){
      Ext.create('Ext.window.Window', {
             height: '100%',
             width:  '100%',
             onEsc: Ext.emptyFn(),
             closable: false,
             bodyStyle: 'border-color:black;background:url("/fondo_sampaoli.jpg") no-repeat;padding:10px;background-color: black;background-size:100%;background-position: center; ',
             resizable:false
             ,xtype: 'form'
             ,itemId:'winLogin'
             ,header:{
                 style: 'background-color:black;border-color:black;padding:10px'
                 ,title: '<img src="/logo_sampaoli.png" border="0" width="200" height="80">'
             }
              ,layout: 'border'
              ,items:[{
                    xtype:'container'
                   ,flex:1
                   ,region: 'west'
               },{
                 xtype: 'form'
                 ,itemId:'formLog'
                 ,bodyStyle:'background-color:transparent!important;'
                   ,defaultType: 'textfield'
                   ,region: 'center'
                   ,flex:1
                   ,padding:'200 0 0 100'
                   ,items:[{
                        emptyText: 'Usuario'
                        ,itemId:'txtUsu'
                        ,name:'username'
                        ,enableKeyEvents: true
                        ,fieldLabel: '<strong style= "padding:5px;background:black;font-size:20px;color: white">USUARIO</strong>'
                        ,listeners:{
                          keypress: function(key,e){
                            if (e.keyCode==13){
                                Ext.ComponentQuery.query('#btnIngresar')[0].fireEvent('click', Ext.ComponentQuery.query('#btnIngresar')[0])
                            }
                          }
                        }
                      },{
          							 name: 'password'
          							,inputType: 'password'
                        ,fieldLabel: '<strong style= "padding:18px;background:black;font-weight:bold;font-size:20px;color:white">CLAVE</strong>'
                        //,hidden:true
          							,emptyText: 'Contraseña'
                        //,padding:'20 20  20 20'
                        ,enableKeyEvents: true
          							,allowBlank: false
                        ,listeners:{
                          keypress: function(key,e){
                            if (e.keyCode==13){
                                Ext.ComponentQuery.query('#btnIngresar')[0].fireEvent('click', Ext.ComponentQuery.query('#btnIngresar')[0])
                            }
                          }
                        }
                      },{
          							 xtype: 'hiddenfield'
          							,name: 'grant_type'
          							,value: 'password'
          						},{
          							 xtype: 'hiddenfield'
          							,name: 'client_id'
          							,value: 'testclient'
          						},{
          							 xtype: 'hiddenfield'
          							,name: 'client_secret'
          							,value: 'frutill4s'
          						}
                    ]
                 },{
                   xtype:'container'
                   ,flex: 1
                   ,region: 'east'
                 },{
                   xtype:'container'
                   ,region: 'south'
                   ,xtype:'toolbar'
                  // ,style:'background-color:transparent;'
                   ,dock:'bottom'
                   ,style: 'background-color:black;border-color:black'
                   ,height:90
                   ,items:[{
                     html:'<img src="http://todalagringa.com.ar/Torneo/logo.png" border="0" width="60" height="60">'
                     ,style:'background-size:100%'
                   },'->',{
                      xtype:'button'
                     ,text:'<p style="font-size:15px;background-color: #936713<  ">INGRESAR>></p>'
                     ,ui:'action'
                     ,itemId: 'btnIngresar'
                     ,style: 'background-color: #936713'
                     ,listeners:{
                       click:function(btn,e){
                         var form = Ext.ComponentQuery.query('#formLog')[0];
                         jsonData = form.getValues();
                         jsonData.username = jsonData.username.toLowerCase();
                         var myJson = jsonData;
                          Ext.Ajax.request({
                             url: 'http://grupobinario.sytes.net:8080/oauth'
                            ,method: 'POST'
                            ,headers: {
                              'Content-Type' : 'application/json'
                            }
                            ,jsonData: myJson
                            ,callback: function( opt, success, response ) {
                              var json = Ext.decode(response.responseText);
                              if ( json.status == 401 ) {
                                Ext.Msg.alert('ERROR', 'Combinación de usuario y clave inválido', function() {
                                  //me.view.down('#loginCard textfield[inputType="password"]').focus(true, 100);
                                });
                                return false;
                              }
                              if ( response.status == 200 ) {
                                //guardo acces token y refresh token
                                localStorage.setItem('EPW-AccessToken', json.access_token);
                                localStorage.setItem('EPW-RefreshTOKEN', json.refresh_token);
                                localStorage.setItem('EPW-ExpireOAUTH', json.expires_in);
                                var today= new Date();//fecha actual
                                var expiration = json.expires_in-600; // tomo el token y le resto lo que deseo restar de tiempo
                                var dateExpiration = Ext.Date.add( today, Ext.Date.SECOND, expiration);//fecha actual mas expiracion
                                localStorage.setItem('EPW-DateExpiration',dateExpiration); // guardo en localStorage
                                // busco los datos del usuario
                                //Cierro la ventana de login
                                Ext.ComponentQuery.query('#winLogin')[0].close();
                              } else {
                                Ext.Msg.alert('ERROR', 'Usuario o Contraseña incorrectos', function() {
                                  //me.view.down('#loginCard textfield[inputType="password"]').focus(true, 100);
                                });
                               // me.view.down('#loginCard').setActiveItem(0);
                              }
                            }
                            ,failure: function( form, action ) {
                              Ext.Msg.alert('ERROR', 'Problemas de conexión', function() {
                              //  me.view.down('#loginCard textfield[inputType="password"]').focus(false, 100);
                              });
                            }
                          });
                          }
                     }
                   }]
                 }]
                 ,listeners:{
                   show: function(win,e){
                     Ext.ComponentQuery.query('#txtUsu')[0].focus(false,100);
                   }
                 }
          }).show();
    }
});
