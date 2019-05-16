/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting causes an instance of this class to be created and
 * added to the Viewport container.
 *
 * TODO - Replace the content of this view to suit the needs of your application.
 */
Ext.define('Query.view.main.Main', {
    extend: 'Ext.Container',
    xtype: 'app-main',
    requires: [
         'Ext.MessageBox',
    ],

    controller: 'main',
    viewModel: 'main',
    cls:'formPrincipal',
    fullscreen: true,
    items: [{
      docked: 'top',
      xtype: 'toolbar',
      //style:'background-color:#936713',
      height:125,
      items: [{

        xtype:'button'
        ,iconCls: 'x-fa fa-bars'
        ,style:"background-color:"+localStorage.getItem('colorPrincipal')+"; border: none;color: #FFF;padding-left: 5px;"
        ,hidden: true

  },{
        xtype:'label'
        ,itemId:'labelHeader'
        ,style:'color:#FFF;font-size:15px;padding:40px;'
        ,html: '<img  width="100%" height="100%" src="data:image/png;base64,'+localStorage.getItem('logo')+'" alt="Jorge Sampaoli" />'
        //<a style="line-height: 40px;font-weight:bold;color:#FFF;font-size:20px"> Complejo JS</a>'
        ,padding: 1

   }]
    },
     {
       xtype:'formpanel',
       itemId:'formini',
       submitOnAction :true,
       width:'100%',
       height:'100%',
       cls:'formPrincipal',
       bodyPadding: 10
       ,layout:'card'

  },{
    docked: 'bottom',
    xtype: 'toolbar',
    style:'background-color:'+localStorage.getItem('colorPrincipal'),
    items: [{
      xtype:'button'
      ,text: 'Anterior'
      ,itemId:'btnAnt'
      ,hidden:true
      //,iconCls: 'x-fa fa-bars'
      ,style:"background-color:"+localStorage.getItem('colorPrincipal')+" border: none;color: #FFF;padding-left: 5px;"
      ,handler: function(btn,e){
         var cardActive = Ext.ComponentQuery.query('#formini')[0]._activeItem._itemId
         console.log('cardActive',cardActive);
         Ext.ComponentQuery.query('#btnGua')[0].hide();
         var num = cardActive.substr(-1);
         if(num == 9 ){
           num = Ext.getStore('Paneles').count() -2;
           var numNext = parseInt(num) -1;
           Ext.ComponentQuery.query('#formini')[0].setActiveItem('#card'+numNext);
           Ext.ComponentQuery.query('#btnSig')[0].show();
         }else{
           if(num == 1){
              Ext.ComponentQuery.query('#btnAnt')[0].hide();
              Ext.ComponentQuery.query('#btnGua')[0].hide();
              Ext.ComponentQuery.query('#btnSig')[0].show();
           }else{
             var numNext = parseInt(num) -1;
             Ext.ComponentQuery.query('#formini')[0].setActiveItem('#card'+numNext);
             Ext.ComponentQuery.query('#btnSig')[0].show();
           }
        }
      }
    },{
      xtype:'spacer'
    },{
      xtype:'button'
      ,text: 'Siguiente'
      ,itemId:'btnSig'
      ,style:"background-color:"+localStorage.getItem('colorPrincipal')+ "border: none;color: #FFF;padding-left: 5px;"
      ,handler: function(btn,e) {
         var cardActive = Ext.ComponentQuery.query('#formini')[0]._activeItem._itemId
           console.log('cardActive',cardActive);
           var num = cardActive.substr(-1);
           if(num ==0){
             var numNext = parseInt(num) +1;
             Ext.ComponentQuery.query('#formini')[0].setActiveItem('#card'+numNext);
           }else if(num>0) {
             model =Ext.create('Model',Ext.ComponentQuery.query('#'+cardActive)[0].getValues());
             errors = model.getValidation();
             console.log('veeeeeeeeeeeeeeeeeerrr');
             // if(errors.isValid()){
                 Ext.ComponentQuery.query('#btnAnt')[0].show();
                  if(num == 9){
                    btn.hide();
                    Ext.ComponentQuery.query('#btnAnt')[0].hide();
                    Ext.ComponentQuery.query('#btnGua')[0].show();
                  }else{
                    var numNext = parseInt(num) +1;
                    if(Ext.isDefined(Ext.ComponentQuery.query('#card'+numNext)[0])){
                      Ext.ComponentQuery.query('#formini')[0].setActiveItem('#card'+numNext);
                    }else{
                       Ext.ComponentQuery.query('#formini')[0].setActiveItem('#card9999');
                       btn.hide();
                       Ext.ComponentQuery.query('#btnGua')[0].show();
                    }
                 }
             //  }else{
             //    Ext.Msg.alert('Atención', 'Debe completar todos los campos de la encuesta.', Ext.emptyFn);
             //
             // }
          }
           console.log('num',num);
         }
    },{
      xtype:'button',
      text: 'Guardar',
      itemId:'btnGua',
      hidden:true,
      style:"background-color:"+ localStorage.getItem('colorPrincipal') + "border: none;color: #FFF;padding-left: 5px;",
      handler: function(btn,e){
        //alert('submit del formulario');
        //Ext.ComponentQuery.query('#formini')[0].submit({
          Ext.Ajax.request({
          url: 'http://grupobinario.sytes.net:8080/resultados',
          method: 'POST',
          jsonData: Ext.ComponentQuery.query('#formini')[0].getValues(),
           success: function() {
             Ext.Msg.alert("Gracias!!!","Tus respuestas ya fueron registradas");
             Ext.ComponentQuery.query('#formini')[0].setActiveItem('#card0');
             Ext.ComponentQuery.query('#btnGua')[0].hide();
             Ext.ComponentQuery.query('#btnAnt')[0].hide();
             Ext.ComponentQuery.query('#btnSig')[0].show();
             Ext.ComponentQuery.query('#formini')[0].reset();
            },
            failure: function() {
               Ext.Msg.alert("Atención","Se produjo un error al guardar las respuestas");
            }
        });
      }

    }]
  }
]
,listeners:{
  painted: function(c){
    console.log('hola');
    Ext.Ajax.request({
    url: 'http://grupobinario.sytes.net:8080/empresas',
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
    Ext.defer(function() {
    Ext.getStore('Paneles').each(
      function(rec,e){
        console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',rec.data.idpanel);
          Ext.ComponentQuery.query('#formini')[0].add({
            xtype:'formpanel'
            ,html:'<h1 style= "color:black;background-color:#fafafa;text-align:center; font-size:18px">'+rec.data.texto+'<h1>'
            //html:'<h1 style= "background-color:#1b1d1f;">'+rec.data.texto+'</h1>'
            ,itemId:'card'+rec.data.idpanel
            ,defaults:{
                    style:'background:transparent',
                  //margin:'50 0',
                    labelAlign: 'top',
                    defaultPhonePickerConfig : {
                    doneButton : 'Aceptar',
                    cancelButton : 'Cancelar',
                    style:'background:'+localStorage.getItem('colorPrincipal')

                  }
                }
                ,style: 'background:#f5f5f5'
                ,bodyStyle:'background:#f5f5f5'
             ,items:[]
          });
          Ext.getStore('Preguntas').each(
              function(rec2,e){
                console.log('los dos',rec2.data.idpanel, rec.data.idpanel);
                if(rec2.data.idpanel == rec.data.idpanel){
                  console.log('#card'+rec.data.idpanel)
                  switch (rec2.data.tipo) {
                    case 'selectfield':
                      Ext.ComponentQuery.query('#card'+rec.data.idpanel)[0].add({
                            xtype:rec2.data.tipo
                          ,emptyText: 'Elige una opción'
                          ,autoSelect : false
                          ,label:rec2.data.texto
                          ,store:'store'+rec2.data.idpreguntas
                          ,displayField:'display'+rec2.data.idpreguntas
                          ,valueField:'value'+rec2.data.idpreguntas
                          ,alowBlank :false
                          ,itemId: 'value'+rec2.data.idpreguntas
                          ,name: 'value'+rec2.data.idpreguntas
                          ,validators: {
                              type: 'presence',
                              message: 'Invalid salary'
                          }
                      });
                      break;
                      case 'textfield':
                        Ext.ComponentQuery.query('#card'+rec.data.idpanel)[0].add({
                          xtype:rec2.data.tipo
                          ,label:rec2.data.texto
                          ,alowBlank :false
                          ,name: 'value'+rec2.data.idpregunta
                          ,itemId: 'value'+rec2.data.idpregunta
                        });

                        break;
                    default:
                      //Ext.ComponentQuery.query('#card'+rec.data.idpanel)[0].add({xtype:rec2.data.tipo, label:rec2.data.texto});
                      break;
                  }
                }
          });
        // }
      });
      console.log('llega');
    },1000);
  }
  ,initialize:function(bn,e){
      console.log('entro');
      console.log(Ext.getStore('Paneles').getData());

       Ext.Viewport.add({
              xtype: 'formpanel',
              itemId:'portada',
              width:'100%',
              height:'100%',
              bodyPadding: 10,
              style:'background-color:#1b1d1f!important',
              defaults:{

                margin:'50 0'
              }
              , items: [
              {
                html:'<img width=120px;height:100px; src="http://todalagringa.com.ar/Torneo/logo.png" alt="GRUPO BINARIO">'
                ,padding:'0 0 0 0'
                ,margin:'200 0 200 '+window.innerWidth/3
                ,style: 'background-color:transparent;'
                ,height:120
              }]
      });
      Ext.defer(function() {
// console.log('llegoooooooooooooooooooooooooooooooooooooo')
         Ext.Viewport.remove(Ext.ComponentQuery.query('#portada')[0],true);
       }, 1500) ;

    }
  }

});
