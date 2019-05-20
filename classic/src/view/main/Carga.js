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
      alert('hola');
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
              { text: 'Título',  dataIndex: 'texto',width:'80%',align:'left'
                ,renderer:function(a,b){
                  return '<p style="font-size:10px!default;color:black!important">'+a+'</p>';
                //  console.log('lLllLlL',a,b);
              }
             },

            ],

  listeners: {
      select: function(a,b){
        console.log('que onda',a,b);
        Ext.ComponentQuery.query('#gridPregunta')[0].setTitle(b.data.texto);
        Ext.getStore('Preguntas').load({params:{idpanel:b.data.idpanel}});
      }

  }

},{
  xtype:'gridpanel',
  itemId:'gridPregunta',
  title: '<p>Preguntas</p>',
  region: 'center'
  ,header:{
    style: "background-color:"+localStorage.getItem('colorPrincipal')
  }
  //,collapsible:true
  ,height:700
  ,viewConfig:{
    emptyText: 'Seleccione un panel'
  }
  ,store:'Preguntas'
  ,columns: [  { text: 'Título',  dataIndex: 'texto',width:'80%',align:'center' },
                { text: 'Eliminar',  xtype: 'actioncolumn',width:'80%',align:'center' }
            ],

  },{
     xtype:'gridpanel'
    ,title: '<p>Opciones</p>'
    //,hidden: true
    //,store:'StoreO'
    ,height:700
    ,header:{
      style: "background-color:"+localStorage.getItem('colorPrincipal')
    }
}
]



});
Ext.define('KitchenSink.store.MobileOS', {
    extend: 'Ext.data.Store',
    alias: 'store.mobile-os',
    fields: ['os', 'data1' ],
});
