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
  ,xtype:'gridpanel'
  ,height: 1500
  //,region: 'center'
  ,store: {
      type: 'personnel'
  },

  columns: [
      { text: 'Pregunta',  dataIndex: 'texto',width:'90%' },
      { xtype:'actioncolumn', width:'10%',
            items: [{
              iconCls: 'x-fa fa-cog',
              //text: 'Resultados',
              tooltip: 'Ver ',
              handler: function(grid, rowIndex, colIndex) {
                  var rec = grid.getStore().getAt(rowIndex);
                  //alert("Edit " + rec.get('firstname'));
                  console.log('llegaaaa',rec.get('idpregunta'));
                  Ext.Ajax.request({
                    url: 'http://grupobinario.sytes.net:8080/resultados?idpregunta='+ rec.get('idpregunta'),
                    method:'GET',
                    success: function(response){

                      console.log(response.responseText);
                      /*Ext.ComponentQuery.query('#flo')[0].getStore().loadData(        [{ os: 'Android', data1: 68.3 },
                        { os: 'BlackBerry', data1: 1.7 },
                        { os: 'iOS', data1: 17.9 },
                        { os: 'Windows Phone', data1: 10.2 },
                        { os: 'Others', data1: 1.9 }])*/
                         var result =response.responseText;
                        Ext.ComponentQuery.query('#flo')[0].getStore().loadData(result);

                    }
                    ,failure: function(){
                      console.log('salio por failure');
                    }
                  });

              }
        }]
      }
  ],

  listeners: {
      select: 'onItemSelected'

  }

},{
xtype: 'polar',
title: 'Resultados',
reference: 'chart',
itemId:'flo',
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



});
Ext.define('KitchenSink.store.MobileOS', {
    extend: 'Ext.data.Store',
    alias: 'store.mobile-os',
    itemId:'storeFlo',

    fields: ['os', 'data1' ],

});
