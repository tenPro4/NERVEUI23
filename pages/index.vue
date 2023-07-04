<style scoped>
.icon:hover {
  cursor: pointer;
}

.muted {
  color: gray;
  font-size: 80%;
}

.vtl .vtl-drag-disabled {
  background-color: #d0cfcf;
}

.vtl .vtl-drag-disabled:hover {
  background-color: #d0cfcf;
}

.vtl .vtl-disabled {
  background-color: #d0cfcf;
}

.scrollable-column {
  height: 100vh;
  /* Set the height as per your requirement */
  overflow-y: auto;
}
</style>

<template>
  <div class="card border">
    <div class="card-body">
      <div class="row">
        <div class="col-4 p-2 border border-4">
          <div class="scrollable-column">
            <div>
              <button @click="addNode" class="btn btn-outline-primary mb-1">Add Node</button>
              <vue-tree-list @click="onClick" @change-name="onChangeName" @end-edit="onEndEdit" @delete-node="onDel"
                @add-node="onAddNode" @drop="drop" @drop-before="dropBefore" @drop-after="dropAfter" :model="data"
                @toggle="onToggle"
                default-tree-node-name="new node" default-leaf-node-name="new leaf" v-bind:default-expanded="false">
                <template v-slot:leafNameDisplay="slotProps">
                  <span>
                    {{ slotProps.model.name }} <span class="muted">#{{ slotProps.model.id }}</span>
                  </span>
                </template>
                <span class="icon" slot="addTreeNodeIcon">📂</span>
                <span class="icon" slot="addLeafNodeIcon"></span>
                <span class="icon" slot="editNodeIcon">📃</span>
                <span class="icon" slot="delNodeIcon">✂️</span>
                <span class="icon" slot="treeNodeIcon">🌲</span>
              </vue-tree-list>
              <button @click="getNewTree">Get new tree</button>
              <pre>
                {{ newTree }}
              </pre>
            </div>
          </div>
        </div>
        <div class="col-8 p-2 border border-4">
          <div class="scrollable-column">
            <vue-tabs @tab-change="handleTabChange" type="pills">
              <v-tab title="General">
                <div v-if="currentSelectedNode !== null">
                  <label>Name</label>
                  <input type="text" v-model="currentSelectedNode.name" />
                  <div class="justify-content-end">
                    <button @click="saveNodeName()" class="btn btn-primary">Save</button>
                  </div>
                </div>
              </v-tab>

              <v-tab title="Attributes">
                <!-- <vue-tree-list @click="onClick" @change-name="onChangeName" @end-edit="onEndEdit" @delete-node="onDel"
                  @add-node="onAddNode" @drop="drop" @drop-before="dropBefore" @drop-after="dropAfter"
                  @toggle="onToggle"
                  :model="attributeTree" default-tree-node-name="new node" default-leaf-node-name="new leaf"
                  v-bind:default-expanded="false">
                  <span class="icon" slot="addTreeNodeIcon">📂</span>
                <span class="icon" slot="editNodeIcon">📃</span>
                <span class="icon" slot="delNodeIcon">✂️</span>
                <span class="icon" slot="treeNodeIcon">🌲</span>
                </vue-tree-list> -->
              </v-tab>
            </vue-tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueTreeList, Tree, TreeNode } from 'vue-tree-list'
import 'vue-nav-tabs/themes/vue-tabs.css'
import { VueTabs, VTab } from 'vue-nav-tabs'
import { breadcrumbMethods } from '~/store/helpers'

export default {
  components: {
    VueTreeList,
    VueTabs,
    VTab
  },
  data() {
    return {
      newTree: {},
      currentSelectedNode: null,
      attributeTree: new Tree([{
        name: 'Node 1',
        id: 1,
        pid: 0,
        ownId: 0,
        hasChild:false,
      }]),
      arrayData: [
        {
          name: 'Node 1',
          id: 1,
          pid: 0,
          ownId: 0,
          dragDisabled: true,
          hidden:true,
          hasChild:true,
          // children: [
          //   {
          //     name: 'Node 1-2',
          //     id: 2,
          //     ownId: 1,
          //     pid: 1,
          //     hasChild:false,
          //     children: [
          //       {
          //         name: 'Node 2-2',
          //         id: 6,
          //         ownId: 1,
          //         pid: 1,
          //       }
          //     ]
          //   }
          // ]
        },
        {
          name: 'Node 2',
          id: 3,
          pid: 0,
          ownId: 3,
          hasChild:false,
        },
        {
          name: 'Node 3',
          id: 4,
          pid: 0,
          hasChild:false,
        }
      ],
      data: null
    }
  },
  head() {
    return {
      title: 'Nodes',
    }
  },
  fetch() {
    this.data = new Tree(this.arrayData)
    console.log('l167',this.data)
  },
  mounted() {
    this.setTitle(this.$metaInfo.title)
    this.setItems([
      {
        text: 'Nodes',
        active: true,
      },
    ])
  },
  methods: {
    ...breadcrumbMethods,
    handleTabChange(tabIndex, newTab, oldTab) {
      console.log(tabIndex)
    },
    onDel(node) {
      // eslint-disable-next-line no-console
      alert('are you sure?')
      console.log('onDel', node)
      if(node.parent.id !== 0 && (node.parent.children.length === 1 || node.parent.children === null)){
        const nodeToUpdate = this.findNodeById(this.data, node.parent.id)
        if (nodeToUpdate) {
            nodeToUpdate.hasChild = false;
          }
      }
      node.remove()
    },
    onEndEdit(params) {
      console.log('onEndEdit', params)
    },
    onChangeName(params) {
      // eslint-disable-next-line no-console
      console.log('onChangeName', params)
    },
    onAddNode(params) {
      // eslint-disable-next-line no-console
      console.log('onAddNode', params)
      console.log('onAddNode parent', params.parent.id)
      const nodeToUpdate = this.findNodeById(this.data, params.parent.id)
      if (nodeToUpdate) {
        console.log('nodeToUpdate',nodeToUpdate)
          nodeToUpdate.hasChild = true;
        }
    },
    onClick(params) {
      this.currentSelectedNode = params
      console.log('onClick', params)
    },
    onToggle(param){
      console.log('onToggle', param)
      const node = new TreeNode({ name: 'c1', isLeaf: false })
      param.addChildren(node)

      console.log('aa219',this.data)
    },
    drop(node, src, target) {
      console.log('drop', node, src, target)
    },
    dropBefore(node, src, target) {
      // eslint-disable-next-line no-console
      console.log('drop-before', node, src, target)
    },
    dropAfter(node, src, target) {
      // eslint-disable-next-line no-console
      console.log('drop-after', node, src, target)
    },
    addNode() {
      const node = new TreeNode({ name: 'new node', isLeaf: false })
      if (!this.data.children) this.data.children = []
      this.data.addChildren(node)
    },
    saveNodeName() {
      if (this.currentSelectedNode) {
        this.currentSelectedNode.name = this.currentSelectedNode.name.trim(); // Trim any leading/trailing whitespace

        const nodeToUpdate = this.findNodeById(this.data, this.currentSelectedNode.id)
        if (nodeToUpdate) {
          nodeToUpdate.name = this.currentSelectedNode.name;
        }
      }
    },
    findNodeById(node, id) {
      if (node.id === id) {
        return node;
      }
      if (node.children) {
        for (const child of node.children) {
          const foundNode = this.findNodeById(child, id);
          if (foundNode) {
            return foundNode;
          }
        }
      }
      return null;
    },
    getNewTree() {
      const vm = this
      function _dfs(oldNode) {
        const newNode = {}
        for (const k in oldNode) {
          if (k !== 'children' && k !== 'parent') {
            newNode[k] = oldNode[k]
          }
        }
        if (oldNode.children && oldNode.children.length > 0) {
          newNode.children = []
          for (let i = 0, len = oldNode.children.length; i < len; i++) {
            newNode.children.push(_dfs(oldNode.children[i]))
          }
        }
        return newNode
      }
      vm.newTree = _dfs(vm.data)
    },
  },
}
</script>