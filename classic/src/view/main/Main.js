/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Query.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',

        'Query.view.main.MainController',
        'Query.view.main.MainModel',
        'Query.view.main.List',
        'Query.view.main.Carga'
    ],

    controller: 'main',
    viewModel: 'main',

    ui: 'navigation',

    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,

    header: {
        layout: {
            align: 'stretchmax'
        },
        title: {
            bind: {
                //text: '{name}'
                text: ' <img src="/logo_sampaoli.png" border="0" width="200" height="80">'
            },
            flex: 0
        },
        //iconCls: 'fa-th-list'
        style: "background-color: transparent"

    },

    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },

    responsiveConfig: {
        tall: {
            headerPosition: 'top'
        },
        wide: {
            headerPosition: 'left'
        }
    },

    defaults: {
        bodyPadding: 20,
        tabConfig: {
            plugins: 'responsive',
            responsiveConfig: {
                wide: {
                    iconAlign: 'left',
                    textAlign: 'left'
                },
                tall: {
                    iconAlign: 'top',
                    textAlign: 'center',
                    width: 120
                }
            }
        }
    },

    items: [{
      title: 'Carga de preguntas'
      ,iconCls: 'fa-question'
      ,header:{
        style: "background-color:"+localStorage.getItem('colorPrincipal')
      },
      // The following grid shares a store with the classic version's grid as well!
      items: [{
          xtype: 'maincarga'
      }]

    },{
        title: 'Resultados',
        // iconCls: 'fa-chart-area',
        iconCls: 'fa-question',
        header:{
          style: "background-color:"+localStorage.getItem('colorPrincipal')
        },
        // The following grid shares a store with the classic version's grid as well!
        items: [{
            xtype: 'mainlist'
        }]
    }, {
        title: 'Users',
        iconCls: 'fa-user',
        hidden:true,
        bind: {
            html: '{loremIpsum}'
        }
    }, {
        title: 'Groups',
        iconCls: 'fa-users',
        hidden:true,
        bind: {
            html: '{loremIpsum}'
        }
    }, {
        title: 'Settings',
        iconCls: 'fa-cog',
        hidden:true,
        bind: {
            html: '{loremIpsum}'
        }
    }]
    ,listeners:{
      afterRender:'afterRender'
    }
});
