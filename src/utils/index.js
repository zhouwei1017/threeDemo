import { Graph, Addon, Shape } from '@antv/x6';

export function createGraph(options) {
    const defaultOptions = {
        container: document.getElementById('graph-x6'),
        //网格
        grid: true,   
        snapline: true,
        // 配置全局的连线规则
        connecting:{
            snap: true,  //  连线时距离节点或者连接桩 50px 时会触发自动吸附 默认50
            // snap:{
            //     radius: 100,  //  该写法该默认配置
            // },
            allowBlank: false, //是否允许连接到画布空白位置的点，默认为 true。
            allowNode: false, //是否允许边链接到节点（非节点上的链接桩），默认为 true。
            allowEdge: false, // 是否允许边链接到另一个边，默认为 true。
            highlight: true, //拖动边时，是否高亮显示所有可用的连接桩或节点，默认值为 false。
            allowMulti: false, // 禁止多条
            allowLoop: false, //起始结束为同一点 循环连线
            connector: 'smooth', // 边 曲线
            createEdge() {     // 创建边的属性
                return new Shape.Edge({
                    attrs: {
                        line: {
                            stroke: '#31d0c6',
                            strokeDasharray: 5,
                        },
                    },
                    tools: {
                        name: 'button-remove',
                        args: { distance: -40 },
                    },
                });
            },
        },
        //平移模式  
        // panning: true,  
        //滚动模式  搭配小地图
        scroller: true, 
        // 小地图
        minimap: {        
            enabled: true,
            container: document.getElementById('minimap-x6'),
        },
    };

    Object.assign(defaultOptions, options);

    const graph = new Graph(defaultOptions);

    return graph;
}

export function createDnd(graph, options) {
    const defaultOptions = {
        target: graph,
        scaled: false,
        animation: true,
    };

    Object.assign(defaultOptions, options);

    const { Dnd } = Addon;

    return new Dnd(defaultOptions);
}

export function createNode(graph, options) {

    const defaultOptions = {
        width: 100,
        height: 40,
        attrs: {
            label: {
                text: 'rect',
                fill: '#6a6c8a',
            },
            body: {
                stroke: '#31d0c6',
                strokeWidth: 2,
            },
        },
    };
    Object.assign(defaultOptions, options);
    const node = graph.createNode(defaultOptions);

    return node;
}