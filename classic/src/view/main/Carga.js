/**
 * This view is an example carga of people.
 */
Ext.define('Query.view.main.Carga', {
    extend: 'Ext.Container',
    xtype: 'maincarga',

    requires: [
        'Query.store.Personnel'
    ],
    //fullscreen: true,
height:window.innerHeight-10
,layout: 'hbox',
defaults: {
    flex: 1
    ,padding: '0 10 0 10'
},
items:[{
   title:'Panel'
  ,header:{
    style: "background-color:"+localStorage.getItem('colorPrincipal')
  }
  ,tools:[{
    type: 'plus'
    ,style: "background-color:"+localStorage.getItem('colorPrincipal')
    ,handler: function(){
            Ext.create('Ext.window.Window', {
                    width:  500,
                    title: 'Cargar un nuevo Panel',
                    header:{
                      style: 'background-color:'+localStorage.getItem('colorPrincipal')
                    },
                    modal: true,
                    items:[{
                      xtype: 'form',
                      itemId:'formPanel',
                      bodyPadding:20,

                      dockedItems:[{
                        dock:'bottom',
                        xtype:'toolbar',
                        items:['->',{
                          text: 'Guardar'
                          ,itemId:'btnPanel'
                          ,listeners:{
                            click: function(btn,e) {
                              btn.up('form').submit({
                              url: 'http://grupobinario.sytes.net/apiQM/paneles'
                              ,jsonSubmit:true
                              ,success: function(){
                                btn.up('form').up('window').close()
                                Ext.getStore('Paneles').reload();

                              }
                              ,failure: function(){
                                Ext.Msg.alert('Atención', 'No se puede cargar el panel')
                              }
                            });
                            }
                          }
                        }]
                      }]
                      ,items:[{
                        xtype: 'textfield',
                        itemId: 'updatePanel',
                        name: 'update',
                        hidden: true,
                        width:  400,
                        value: false

                      },{
                        fieldLabel:'Titulo del panel',
                        xtype: 'textarea',
                        itemId: 'txtPanel',
                        name: 'texto',
                        width:  400,

                      }]

                    }]
                 }).show();

    }
  }]
  ,xtype:'gridpanel'
  ,height: window.innerHeight-10
  ,store:'Paneles'
  ,scrollable: true
  ,style:'font-size:12px;color:black'
  ,columns: [
          { text: 'Título',  dataIndex: 'texto',width:'70%',align:'left'
            ,renderer:function(a,b){
              return '<p style="font-size:10px!default;color:black!important">'+a+'</p>';
            }
          },{
            //text: 'Eliminar',
            //glyph:'xe811@Linearicons' ,
            xtype: 'actioncolumn',
            width:50,
            items: [{
                iconCls: 'x-fa fa-cog',
                //width:'15%',
                //align:'center',
            }]

            ,  handler: function (grid, rowIndex, colIndex) {
                var rec = grid.getStore().getAt(rowIndex);
                Ext.Msg.show({
                     title:'¿Eliminar el panel?',
                     style: "background-color:"+localStorage.getItem('colorPrincipal'),
                     message: 'Si elimina el panel se eliminaran todas las preguntas y opciones dentro del mismo',
                     buttons: Ext.Msg.YESNO,
                     icon: Ext.Msg.QUESTION,
                     fn: function(btn) {
                         if (btn === 'yes') {
                           Ext.Ajax.request({
                             url: 'http://grupobinario.sytes.net/apiQM/paneles',
                             jsonSubmit:true,
                             jsonData:{
                               idpanel: rec.get('idpanel'),
                               delete: true
                             }

                             ,success: function(){
                               Ext.getStore('Paneles').reload();
                               Ext.ComponentQuery.query('#gridOpciones')[0].setTitle('');
                               Ext.ComponentQuery.query('#gridPregunta')[0].setTitle('');
                               Ext.getStore('Preguntasxpanel').removeAll();
                               Ext.getStore('Opcionesxpregunta').removeAll();
                             }
                             ,failure: function(){
                               Ext.Msg.alert('Atención', 'No se pudo eliminar el panel');

                             }
                           });

                         } else if (btn === 'no') {
                             console.log('No pressed');
                         } else {
                             console.log('Cancel pressed');
                         }
                     }
                 });
              }

            },{
              //text: 'Editar',
              xtype: 'actioncolumn',
              width:'15%',
              align:'center',
              glyph:'xe811@Linearicons',
              handler: function (grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    Ext.create('Ext.window.Window', {
                            width:  500,
                            title: 'Editar el panel',
                            header:{
                              style: "background-color:"+localStorage.getItem('colorPrincipal')
                            },
                            modal: true,
                            items:[{
                              xtype: 'form',
                              itemId:'formPanel',
                              bodyPadding:20,
                              dockedItems:[{
                                dock:'bottom',
                                xtype:'toolbar',
                                items:['->',{
                                  text: 'Guardar'
                                  ,itemId:'btnPanel'
                                  ,listeners:{
                                    click: function(btn,e) {
                                      btn.up('form').submit({
                                      url: 'http://grupobinario.sytes.net/apiQM/paneles'
                                      ,jsonSubmit:true
                                      ,success: function(){
                                        btn.up('form').up('window').close()
                                        Ext.getStore('Paneles').reload();
                                      }
                                      ,failure: function(){
                                        Ext.Msg.alert('Atención', 'No se pudo modificar el Panel')
                                      }
                                    });
                                    }
                                  }
                                }]
                              }]
                              ,items:[{
                                xtype: 'textfield',
                                itemId: 'updatePanel',
                                name: 'update',
                                hidden: true,
                                width:  400
                                ,value: true

                              },{
                                fieldLabel:'panel',
                                xtype: 'textarea',
                                itemId: 'idPanel',
                                name: 'idpanel',
                                width:  400,
                                //hidden:true,
                                value: rec.get('idpanel')

                              },{
                                fieldLabel:'Titulo del panel',
                                xtype: 'textarea',
                                itemId: 'txtPanel',
                                name: 'texto',
                                width:  400,
                                value: rec.get('texto')

                              }]

                            }]
                         }).show();

                }
              }
            ],
            listeners: {
                select: function(a,b) {
                  Ext.ComponentQuery.query('#gridPregunta')[0].setTitle(b.data.texto);
                  Ext.ComponentQuery.query('#gridPregunta')[0].setConfig('idpanel',b.data.idpanel);
                  Ext.ComponentQuery.query('#gridOpciones')[0].setTitle('');
                  Ext.getStore('Opcionesxpregunta').removeAll();
                  Ext.getStore('Preguntasxpanel').load({params:{idpanel:b.data.idpanel}});
                }
            }
},{
  xtype:'gridpanel',
  itemId:'gridPregunta',
  title: 'Preguntas',
  region: 'center',
  idpanel:'aaa'
  ,header:{
    style: "background-color:"+localStorage.getItem('colorPrincipal')
  }
  //,collapsible:true
  ,height:window.innerHeight-10
  ,viewConfig:{
    emptyText: 'Seleccione un panel'
  }
  ,tools:[{
    type: 'plus'
    ,text:'cargar'
    ,handler: function(){

      Ext.create('Ext.window.Window', {
              width:  500,
              title: 'Cargar una Pregunta'
              ,header:{
                style: "background-color:"+localStorage.getItem('colorPrincipal')
              }
              ,modal: true,
              items:[{
                xtype: 'form',
                itemId: 'formPregunta',
                bodyPadding:20,
         dockedItems:[{
                  dock:'bottom',
                  xtype:'toolbar',
                  items:['->',{
                    text: 'Guardar'
                    ,itemId:'btnPregunta'
                    ,listeners:{
                      click: function(btn,e) {
                        btn.up('form').submit({
                        url: 'http://grupobinario.sytes.net/apiQM/preguntas'
                        ,jsonSubmit:true
                        ,success: function(){
                          btn.up('form').up('window').close()
                          Ext.getStore('Preguntasxpanel').reload();

                        }
                        ,failure: function(){
                            Ext.Msg.alert('Atención', 'Error al guardar la pregunta')
                        }
                      });
                      }
                    }
                  }]
                }]
                ,items:[{
                  fieldLabel:'idpanel',
                  xtype: 'textfield',
                  itemId: 'txtPanel',
                  name: 'idpanel',
                  width:  400,


                },{
                  fieldLabel:'update',
                  xtype: 'textfield',
                  itemId: 'updatePregunta',
                  name: 'update',
                  value: false,
                  width:  400,

                },{
                  fieldLabel:'Pregunta',
                  xtype: 'textarea',
                  itemId: 'txtPregunta',
                  name: 'texto',
                  width:  400,

                },{
                  fieldLabel:'Tipo',
                  xtype: 'combobox',
                  itemId: 'tipoPreg',
                  name: 'tipo',
                  width:  400,
                  displayField:'tipo',
                  store:[ {
                    'tipo':'selectfield',

                  },{
                    'tipo':'textfield',

                  }]

                }]

              }]
              ,listeners:{
                afterRender: function(form,e){
                  var grid = Ext.ComponentQuery.query('#gridPregunta')[0];
                  Ext.ComponentQuery.query('#txtPanel')[0].setValue(grid.config.idpanel);
                }
              }
           }).show();
         }
  }]
  ,store:'Preguntasxpanel'
  ,columns: [  { text: 'Título',  dataIndex: 'texto',width:'70%',align:'center' },
               {
                 //text: 'Eliminar',
                xtype: 'actioncolumn',
                width:'15%',
                align:'center',
                glyph:'xe811@Linearicons'
               ,handler: function(grid, rowIndex, colIndex){
                 var rec = grid.getStore().getAt(rowIndex);
                 Ext.Msg.show({
                      title:'¿Eliminar la pregunta?',
                      message: 'Si elimina la pregunta se eliminaran todas las opciones de la misma',
                      buttons: Ext.Msg.YESNO,
                      icon: Ext.Msg.QUESTION,
                      fn: function(btn) {
                          if (btn === 'yes') {
                            Ext.Ajax.request({
                              url: 'http://grupobinario.sytes.net/apiQM/preguntas',
                              jsonSubmit:true,
                              jsonData:{
                                idpanel: rec.get('idpregunta'),
                                delete: true
                              }
                              ,success: function(){
                                Ext.getStore('Preguntas').reload();
                              }
                              ,failure: function(){
                                Ext.Msg.alert('Atención', 'La pregunta no fue eliminada');

                              }
                            });

                          } else if (btn === 'no') {
                              console.log('No pressed');
                          } else {
                              console.log('Cancel pressed');
                          }
                      }
                  });
               }
              },
               {
              //text: 'Editar',
               xtype: 'actioncolumn',
               width:'15%',
               align:'center',
               glyph:'xe811@Linearicons'
               ,handler: function (grid, rowIndex, colIndex) {
                   var rec = grid.getStore().getAt(rowIndex);
                   Ext.create('Ext.window.Window', {
                         extend: 'Ext.window.Window',
                           width:  500,
                           title: 'Editar la opción',
                           modal: true,
                           header:{
                             style: "background-color:"+localStorage.getItem('colorPrincipal')
                           },
                           items:[{
                             xtype: 'form',
                             itemId: 'formPregunta',
                             bodyPadding:20,
                      dockedItems:[{
                               dock:'bottom',
                               xtype:'toolbar',
                               items:['->',{
                                 text: 'Guardar'
                                 ,itemId:'btnPregunta'
                                 ,listeners:{
                                   click: function(btn,e) {
                                     btn.up('form').submit({
                                     url: 'http://grupobinario.sytes.net/apiQM/preguntas'
                                     ,jsonSubmit:true
                                     ,success: function(){
                                       btn.up('form').up('window').close()
                                       Ext.getStore('Preguntasxpanel').reload();

                                     }
                                     ,failure: function(){

                                     }
                                   });
                                   }
                                 }
                               }]
                             }]
                             ,items:[
                             {
                               fieldLabel:'idpanel',
                               xtype: 'textfield',
                               itemId: 'txtPanel',
                               name: 'idpanel',
                               width:  400,
                               value: grid.grid.config.idpanel

                             },
                             {
                               fieldLabel:'update',
                               xtype: 'textfield',
                               itemId: 'updatePregunta',
                               name: 'update',
                               width:  400,
                               value: true

                             },{
                               fieldLabel:'Pregunta',
                               xtype: 'textarea',
                               itemId: 'idPregunta',
                               name: 'idpanel',
                               width:  400,
                               value: rec.get('idpreguntas')

                             },{
                               fieldLabel:'Pregunta',
                               xtype: 'textarea',
                               itemId: 'txtPregunta',
                               name: 'texto',
                               width:  400,
                               value: rec.get('texto')

                             },{
                               fieldLabel:'Tipo',
                               xtype: 'combobox',
                               itemId: 'tipoPreg',
                               value: rec.get('tipo')
                               ,name: 'tipo',
                               width:  400,
                               displayField:'tipo',
                               store:[ {
                                 'tipo':'selectfield',

                               },{
                                 'tipo':'textfield',

                               }]

                             }]

                           }]
                        }).show();
               }
             },
            ]
  ,listeners: {
      select: function(a,b){
        console.log('que onda',a,b);
        Ext.ComponentQuery.query('#gridOpciones')[0].setTitle(b.data.texto);
        Ext.getStore('Opcionesxpregunta').load({
          params:{idpregunta:b.data.idpreguntas}
          ,success: function(){
            console.log('se deberian cargar las preguntas')
          }
          ,failure:function(){
            Ext.Msg.alert('Atención', 'No se pueden cargar las preguntas del panel')
          }

        });
      }

  }

  },{
     xtype:'gridpanel'
    ,title: 'Opciones'
    ,itemId:'gridOpciones'
    ,height: window.innerHeight-10
    ,store: 'Opcionesxpregunta'
    ,viewConfig:{
      emptyText: 'Seleccione una pregunta'
    }
    ,header:{
      style: "background-color:"+localStorage.getItem('colorPrincipal')
    }
    ,tools:[{
      type: 'plus'
      ,text:'cargar'
      ,handler: function(){

        Ext.create('Ext.window.Window', {
          width:  500,
          title: 'Cargar una opción',
          modal: true,
          header:{
            style: "background-color:"+localStorage.getItem('colorPrincipal')
          },
          items:[{
            xtype: 'form',
            itemId:'formPanel',
            bodyPadding:20,

            dockedItems:[{
              dock:'bottom',
              xtype:'toolbar',
              items:['->',{
                text: 'Guardar'
                ,itemId:'btnPanel'
                ,listeners:{
                  click: function(btn,e) {
                    btn.up('form').submit({
                    url: 'http://grupobinario.sytes.net/apiQM/opciones'
                    ,jsonSubmit:true
                    ,success: function(){
                      btn.up('form').up('window').close()
                      Ext.getStore('Opcionesxpregunta').reload();

                    }
                    ,failure: function(){
                      Ext.Msg.alert('Atención','No se pudo cargar la opción' );

                    }
                  });
                  }
                }
              }]
            }]
            ,items:[{
              xtype: 'textfield',
              itemId: 'updateOpciones',
              name: 'update',
              hidden: true,
              width:  400,
              value: false

            },{
              fieldLabel:'Descripcion opcion',
              xtype: 'textarea',
              itemId: 'txtOpcion',
              name: 'texto',
              width:  400,

            }]

          }]
       }).show();

      }
    }]
    ,columns: [  { text: 'valor',  dataIndex: 'texto',width:'70%',align:'center' },
                  {
                //  text: 'Eliminar',
                  xtype: 'actioncolumn',
                  width:'15%',
                  align:'center',
                  glyph:'xe811@Linearicons'
                  ,handler: function (grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    Ext.Msg.show({
                         title:'¿Eliminar la opción?',
                         message: 'Se eliminará la opcion seleccionada.',
                         buttons: Ext.Msg.YESNOCANCEL,
                         icon: Ext.Msg.QUESTION,
                         fn: function(btn) {
                             if (btn === 'yes') {
                               Ext.Ajax.request({
                                 url: 'http://grupobinario.sytes.net/apiQM/opciones',
                                 jsonSubmit:true,
                                 jsonData:{
                                   idopcion: rec.get('idopcion'),
                                   delete: true
                                 }

                                 ,success: function(){
                                   Ext.getStore('Opcionesxpregunta').reload();
                                 }
                                 ,failure: function(){
                                   Ext.Msg.alert('Atención', 'No se puede eliminar la opcion')
                                 }
                               });

                             } else if (btn === 'no') {
                                 console.log('No pressed');
                             } else {
                                 console.log('Cancel pressed');
                             }
                         }
                     });
                  }
                 },{
                    //text: 'Editar',
                    xtype: 'actioncolumn',
                    width:'15%',
                    align:'center',
                    glyph:'xe811@Linearicons' ,
                    handler: function (grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        Ext.create('Ext.window.Window', {
                                width:  500,
                                title: 'Cargar',
                                modal: true,
                                items:[{
                                  xtype: 'form',
                                  itemId:'formPanel',
                                  bodyPadding:20,
                                  dockedItems:[{
                                    dock:'bottom',
                                    xtype:'toolbar',
                                    items:['->',{
                                      text: 'Guardar'
                                      ,itemId:'btnPanel'
                                      ,listeners:{
                                        click: function(btn,e) {
                                          btn.up('form').submit({
                                              url: 'http://grupobinario.sytes.net/apiQM/opciones'
                                              ,jsonSubmit:true
                                              ,success: function(){
                                                btn.up('form').up('window').close()
                                                Ext.getStore('Opcionesxpregunta').reload();

                                              }
                                              ,failure: function(){
                                                Ext.Msg.alert('Atención', 'No se puede editar la opción')
                                              }
                                          });
                                        }
                                      }
                                    }]
                                  }]
                                  ,items:[{
                                    xtype: 'textfield',
                                    itemId: 'updatePanel',
                                    name: 'update',
                                    hidden: true,
                                    width:  400
                                    ,value: false

                                  },{
                                    fieldLabel:'Descripcion de opcion',
                                    xtype: 'textarea',
                                    itemId: 'txtOpcion',
                                    name: 'texto',
                                    width:  400,
                                    value: rec.get('texto')

                                  }]

                                }]
                             }).show();
                        }
                   },
              ]
}]
});
Ext.define('KitchenSink.store.MobileOS', {
    extend: 'Ext.data.Store',
    alias: 'store.mobile-os',
    fields: ['os', 'data1' ],
});
