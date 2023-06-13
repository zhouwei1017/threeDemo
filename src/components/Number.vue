<template>
  <div>
    <div>{{ num }}</div>
    <button @click="click()">add</button>
  </div>
</template>

<script>
export default ({
  name: 'Count',
  props: {
    num: Number
  },
  inject: ['getGraph', 'getNode'],
  mounted(){
	this.graph = this.getGraph();
	this.node = this.getNode();
  },
  methods: {
    click() {
      this.$emit('add')
      // this.getNode().attr('body/strokeWidth', this.num + 1)
      // this.getNode().store.data.Number = this.num + 1
      this.getNode().store.data.size.width += 100
      const cell = this.graph.getCellById(this.node.id)
      cell.setData({
        a:this.num
      })
      console.log(cell.getData(),'getData');
      console.log(cell,'cell');
    }
  }
});
</script>