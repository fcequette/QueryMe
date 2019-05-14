/**
 * This view is an example list of people.
 */
Ext.define('Query.view.main.List', {
    extend: 'Ext.grid.Panel',
    xtype: 'mainlist',

    requires: [
        'Query.store.Personnel'
    ],

    title: 'Preguntas',

    store: {
        type: 'personnel'
    },

    columns: [
        { text: 'Pregunta',  dataIndex: 'texto' },
        { xtype:'actioncolumn', width:50,
              items: [{
                iconCls: 'x-fa fa-cog',
                tooltip: 'Ver',
                handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    alert("Edit " + rec.get('firstname'));
                }
          }]
        }
    ],

    listeners: {
        select: 'onItemSelected'

    }
});
