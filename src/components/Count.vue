<template>
  <div class="container">
	  <div class="title">
		<span @click="clickTitle" >{{ name || '我是标题' }}</span> 
		<i class="el-icon-circle-close" @click="removeNode"></i>
	  </div>
	  <!-- 汽油配方 -->
		<ul class="fields">
			<li v-for="item in datasource"  :key="item.id">{{item.value}}</li>
		</ul>
  </div>
</template>

<script>
export default {
  name: "Count",
  props: {
    size: Number,
	datasource:Array,
    name: String
  },
  inject: ['getGraph', 'getNode'],
  data(){
	  return{
		  node:{},
		  graph:{},
	  }
  },
  mounted(){
	this.graph = this.getGraph();
	this.node = this.getNode();
  },
  methods:{
	  removeNode(){
		this.graph.removeNode(this.node.id)
	  },
      clickTitle(){
        // this.$emit("viewdata", {
        //     visible: true,
        // });
      },
  }
};
</script>
<style>
.container {
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}
.title{
	width: 100%;
	height: 30px;
	border-radius: 10px 10px 0 0;
	background-color: #31d0c6;
	position: fixed;
	top: -30px;
	text-align: center;
	line-height: 30px;
	color: aliceblue;
	cursor: pointer;
}
.el-icon-circle-close{
	float: right;
}
.fields {
	list-style: none;
	width: 100%;
	padding: 0;
	border-top: 1px solid #31d0c6;
	background-color: #001521;
	color: aliceblue;
}

.fields li {
	padding: 6px 0;
	text-align: center;
	border: 1px solid #31d0c6;
	border-top: none;
}


</style>
