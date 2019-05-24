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
height:700,
  layout: 'hbox',
defaults: {
    flex: 1
},
items:[{
   title:'<p>Panel</p>'
  //,region: 'west'
  ,header:{
    style: "background-color:"+localStorage.getItem('colorPrincipal')

  }
  ,tools:[{
    text:'cargar'
    ,handler: function(){
      Ext.create('WindowPanel').show();
      Ext.ComponentQuery.query('#updatePanel')[0].setValue(false);
      Ext.ComponentQuery.query('#btnPanel')[0].setText('Cargar');
      //if(Ext.ComponentQuery.query('#gridPregunta')[0].getConfig().idpanel){
      Ext.ComponentQuery.query('#txtPanel')[0].setValue(Ext.ComponentQuery.query('#gridPregunta')[0].getConfig().idpanel);
    }
  }]
  ,xtype:'gridpanel'
  ,height: 600
  //,collapsible:true
  //,collapsed: true
  //,region: 'center'
  ,store:'Paneles'
  ,scrollable: true
  ,style:'font-size:12px;color:black'
  ,columns: [
              { text: 'Eliminar',  xtype: 'actioncolumn',width:'15%',align:'center' },
              { text: 'Editar',  xtype: 'actioncolumn',width:'15%',align:'center',
                handler: function (grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    Ext.create('WindowPanel').show();
                    Ext.create('WindowPanel').setTitle('Actualizar');
                    Ext.ComponentQuery.query('#updatePanel')[0].setValue(true);
                    Ext.ComponentQuery.query('#txtPanel')[0].setValue(Ext.ComponentQuery.query('#gridPregunta')[0].getConfig().idpanel);
                    Ext.ComponentQuery.query('#txtPregunta')[0].setValue(rec.get('texto'));
                    Ext.ComponentQuery.query('#btnPanel')[0].setText('Actualizar');
                }
              },
              { text: 'Título',  dataIndex: 'texto',width:'70%',align:'left'
                ,renderer:function(a,b){
                  return '<p style="font-size:10px!default;color:black!important">'+a+'</p>';
                //  console.log('lLllLlL',a,b);
                }
              }
            ],
  listeners: {
      select: function(a,b){
        console.log('que onda',a,b);
        Ext.ComponentQuery.query('#gridPregunta')[0].setTitle(b.data.texto);
        Ext.ComponentQuery.query('#gridPregunta')[0].setConfig('idpanel',b.data.idpanel);
        Ext.getStore('Preguntas').load({params:{idpanel:b.data.idpanel}});
      }

  }

},{
  xtype:'gridpanel',
  itemId:'gridPregunta',
  title: '<p>Preguntas</p>',
  region: 'center',
  idpanel:''
  ,header:{
    style: "background-color:"+localStorage.getItem('colorPrincipal')
  }
  //,collapsible:true
  ,height:700
  ,viewConfig:{
    emptyText: 'Seleccione un panel'
  }
  ,tools:[{
     text:'cargar'
    ,handler: function(){
        Ext.create('WindowPregunta').show();
        Ext.create('WindowPregunta').show();
        Ext.create('WindowPregunta').setTitle('Cargar');
        Ext.ComponentQuery.query('#updatePregunta')[0].setValue(false);
        // Ext.ComponentQuery.query('#txtPregunta')[0].setValue(rec.get('texto'));
        Ext.ComponentQuery.query('#btnPregunta')[0].setText('Cargar');
    }
  }]
  ,store:'Preguntas'
  ,columns: [  { text: 'Título',  dataIndex: 'texto',width:'70%',align:'center' },
               { text: 'Eliminar',  xtype: 'actioncolumn',width:'15%',align:'center' },
               { text: 'Editar',  xtype: 'actioncolumn',width:'15%',align:'center'
               ,handler: function (grid, rowIndex, colIndex) {
                   var rec = grid.getStore().getAt(rowIndex);
                   Ext.create('WindowPregunta').show();
                   Ext.create('WindowPregunta').setTitle('Actualizar');
                   Ext.ComponentQuery.query('#updatePregunta')[0].setValue(true);
                   Ext.ComponentQuery.query('#txtPregunta')[0].setValue(rec.get('texto'));
                   Ext.ComponentQuery.query('#btnPregunta')[0].setText('Actualizar');
               }
             },
            ]
  ,listeners: {
      select: function(a,b){
        console.log('que onda',a,b);
        Ext.ComponentQuery.query('#gridOpciones')[0].setTitle(b.data.texto);
        Ext.getStore('Opciones').load({
          params:{idpregunta:b.data.idpregunta}
          ,success: function(){

          }
          ,failure:function(){

          }

        });
      }

  }

  },{
     xtype:'gridpanel'
    ,title: '<p>Opciones</p>'
    ,itemId:'gridOpciones'
    //,hidden: true
    //,store:'StoreO'
    ,height:700
    ,header:{
      style: "background-color:"+localStorage.getItem('colorPrincipal')
    }
    ,columns: [  { text: 'valor',  dataIndex: 'texto',width:'70%',align:'center' },
                  { text: 'Eliminar',  xtype: 'actioncolumn',width:'15%',align:'center' },
                    { text: 'Editar',  xtype: 'actioncolumn',width:'15%',align:'center' },
              ]
}]



});
Ext.define('KitchenSink.store.MobileOS', {
    extend: 'Ext.data.Store',
    alias: 'store.mobile-os',
    fields: ['os', 'data1' ],
});

Ext.define('WindowPanel', {
      //  height: '50%',
      extend:'Ext.window.Window',
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
                  url: 'http://grupobinario.sytes.net/paneles'
                  ,jsonSubmit:true
                  ,success: function(){
                    btn.up('form').up('window').close()
                    Ext.getStore('Paneles').reload();

                  }
                  ,failure: function(){

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

          },{
            fieldLabel:'Titulo del panel',
            xtype: 'textarea',
            itemId: 'txtPanel',
            name: 'texto',
            width:  400,

          }]

        }]
     });
     Ext.define('WindowPregunta', {
           //  height: '50%',
           extend: 'Ext.window.Window',
             width:  500,
             title: 'Cargar',
             modal: true,
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
                       url: 'http://grupobinario.sytes.net/preguntas'
                       ,jsonSubmit:true
                       ,success: function(){
                         btn.up('form').up('window').close()
                         Ext.getStore('Preguntas').reload();

                       }
                       ,failure: function(){

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
                 //value: this.config.idpanel

               },{
                 fieldLabel:'update',
                 xtype: 'textfield',
                 itemId: 'updatePregunta',
                 name: 'update',
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
          });
