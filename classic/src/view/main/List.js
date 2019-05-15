/**
 * This view is an example list of people.
 */
Ext.define('Query.view.main.List', {
    extend: 'Ext.Container',
    xtype: 'mainlist',

    requires: [
        'Query.store.Personnel'
    ],
    fullscreen: true,

  layout: 'hbox',
defaults: {
    flex: 1
},
items:[{
   title:'Preguntas'
  ,header:{
    style: "background-color:"+localStorage.getItem('colorPrincipal')
  }
  ,xtype:'gridpanel'
  ,height: 1500
  //,region: 'center'
  ,store: {
      type: 'personnel'
  },

  columns: [  { text: 'Pregunta',  dataIndex: 'texto',width:'100%',align:'center' }],

  listeners: {
      select: 'onItemSelected'

  }

},{
  xtype:'panel'
  ,items:[{
  xtype:'panel'
  ,itemId:'panelCerrado'
  ,items:[{
    xtype: 'polar',
  //hidden:true,
  title: 'Seleccionar una pregunta ...',
  header:{
    style: "background-color:"+localStorage.getItem('colorPrincipal')
  },
  reference: 'chart',
  itemId:'grafico',
  captions: {
      title: 'Pie Charts - Basic',
      credits: {
          text: 'Data: IDC Predictions - 2017\n' +
              'Source: Internet',
          align: 'left'
      }
  },
  //theme: 'default-gradients',
  width: '100%',
  height: 500,
  insetPadding: 40,
  innerPadding: 20,
  store: {
      type: 'mobile-os'
  },
  legend: {
      docked: 'bottom'
  },
  interactions: ['rotate'],
  series: [{
      type: 'pie',
      angleField: 'data1',
      label: {
          field: 'os',
          calloutLine: {
              length: 60,
              width: 3
              // specifying 'color' is also possible here
          }
      },
      highlight: true,
      tooltip: {
          trackMouse: true,
          renderer: 'onSeriesTooltipRender'
          }
  }]
      }]
  },{
     xtype:'gridpanel'
    ,itemId:'panelAbierto'
    ,header:{
      style: "background-color:"+localStorage.getItem('colorPrincipal')
    }
    ,hidden:true
    ,height: 1500
    ,columns:[{
      text: 'respuestas'
      ,dataIndex:'data1'
      ,width: '100%'
    }]
    ,store: {
        type: 'mobile-os'
    }
  }]
}
]



});
Ext.define('KitchenSink.store.MobileOS', {
    extend: 'Ext.data.Store',
    alias: 'store.mobile-os',
    fields: ['os', 'data1' ],
});
