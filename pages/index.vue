<style>
.icon:hover {
  cursor: pointer;
}

.vtl-node-main .vtl-operation {
  margin-left: 1rem !important;
}

.vtl-operation {
  display: unset !important;
  visibility: hidden;
}

.vtl-node:hover .vtl-operation {
  visibility: visible !important;
}

.muted {
  color: gray;
  font-size: 80%;
}
.scrollable-column {
  height: 100vh;
  overflow-x: auto;
  white-space: nowrap;
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
            <button
              @click="addNode('', '/', null)"
              class="btn btn-outline-primary mb-1"
            >
              Add Node
            </button>
            <div v-if="data != null && !treeLoading">
              <vue-tree-list
                @click="onClick"
                @change-name="onChangeName"
                @end-edit="onEndEdit"
                @delete-node="onDel"
                @add-node="onAddNode"
                @drop="drop"
                @drop-before="dropBefore"
                @drop-after="dropAfter"
                :model="data"
                @toggle="onToggle"
                default-tree-node-name="new node"
                default-leaf-node-name="new leaf"
                v-bind:default-expanded="false"
              >
                <!-- <template v-slot:leafNameDisplay="slotProps">
                  <span>
                    {{ slotProps.model.name }} <span class="muted">#{{ slotProps.model.id }}</span>
                  </span>
                </template> -->
                <span class="icon" slot="addTreeNodeIcon">📂</span>
                <span class="icon" slot="addLeafNodeIcon"></span>
                <span class="icon" slot="editNodeIcon"></span>
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
                <div v-if="generalInfo !== null">
                  <label>Name</label>
                  <input type="text" v-model="generalInfo.name" />
                  <div class="justify-content-end">
                    <button @click="saveNodeName()" class="btn btn-primary">
                      Save
                    </button>
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
import { v4 } from 'uuid'
import { VueTabs, VTab } from 'vue-nav-tabs'
import { getTopNodes, getChildNodes } from '../schemas/queries'
import {
  UPDATE_NODE_MUTATION,
  ADD_CHILD_NODE_MUTATION,
  DELETE_NODE_MUTATION
} from '../schemas/mutations'
import 'vue-nav-tabs/themes/vue-tabs.css'
import { breadcrumbMethods } from '~/store/helpers'

export default {
  components: {
    VueTreeList,
    VueTabs,
    VTab,
  },
  data() {
    return {
      newTree: {},
      session: null,
      currentSelectedNode: null,
      generalInfo: null,
      data: null,
      treeLoading: false,
    }
  },
  head() {
    return {
      title: 'Nodes',
    }
  },
  async fetch() {
    // this.data = new Tree(this.arrayData)
    const res = await this.$apollo.query({
      query: getTopNodes,
    })
    let treeArray = []
    if (res.data.topLevelNode.length > 0) {
      treeArray = res.data.topLevelNode.map((x) => {
        return {
          name: x.name,
          id: v4(),
          path: x.path,
          hasChild: x.hasChildren,
        }
      })
    }

    console.log('cttt178', treeArray)
    this.data = new Tree(treeArray)
    console.log('cdata114', this.data)
  },
  mounted() {
    this.setTitle(this.$metaInfo.title)
    this.setItems([
      {
        text: 'Nodes',
        active: true,
      },
    ])

    // this.$ory.toSession().then(({ data }) => {
    //   this.session = data
    //   console.log('session194',data)
    //   // this.$ory.createBrowserLogoutFlow().then(async ({ data }) => {
    //   //   console.log('logout data_197',data)
    //   //   await this.$ory.updateLogoutFlow({
    //   //     token: data.logout_token,
    //   //   })
    //   // })
    // })
  },
  methods: {
    ...breadcrumbMethods,
    handleTabChange(tabIndex, newTab, oldTab) {
      console.log(tabIndex)
    },
    async onDel(node) {
      console.log('onDel', node)

      if (confirm("Are you want to remove this node? Please note your action can't undo after confirm.")) 
      {
        try{
          const input = {
            path:node.path,
            name:node.name
          }

          await this.$apollo.mutate({
            mutation: DELETE_NODE_MUTATION,
            variables: {
              input,
            },
          })

          if (node.parent.id !== 0 && 
          (node.parent.children.length === 1 || node.parent.children === null)) 
          {
            const nodeToUpdate = this.findNodeById(this.data, node.parent.id)
            if (nodeToUpdate) {
              nodeToUpdate.hasChild = false
            }
          }
          node.remove()

        }
        catch(err){
          console.log('delete node error',err)
        }
      }
    },
    extractErrorMessage(error) {
      if (error instanceof Error) {
        const errorMessage = error.message
        const regex = /([A-Z]\d{4}): (.+)/
        const matches = errorMessage.match(regex)

        if (matches && matches.length === 3) {
          const errorCode = matches[1]
          const description = matches[2]
          return `${errorCode}: ${description}`
        } else {
          return 'Error message format not recognized.'
        }
      } else {
        return 'Invalid error object.'
      }
    },
    onEndEdit(params) {
      console.log('onEndEdit', params)
    },
    onChangeName(params) {
      // eslint-disable-next-line no-console
      console.log('onChangeName', params)
    },
    async onAddNode(param) {
      // eslint-disable-next-line no-console
      console.log('onAddNode', param)
      await this.addNode(param.path, param.name, param)
      const nodeToUpdate = this.findNodeById(this.data, param.id)
      if (nodeToUpdate) {
        console.log('nodeToUpdate', nodeToUpdate)
        nodeToUpdate.hasChild = true
      }
    },
    onClick(params) {
      this.currentSelectedNode = {
        name: params.name,
        id: params.id,
        path: params.path,
      }
      this.generalInfo = {
        name: params.name,
        id: params.id,
        path: params.path,
      }
      console.log('onClick', this.currentSelectedNode)
    },
    async onToggle(param) {
      console.log('onToggle', param)
      param.children = null
      if (!param.expanded) {
        const res = await this.$apollo.query({
          query: getChildNodes,
          variables: {
            path: param.path,
            name: param.name,
          },
          // fetchPolicy: "network-only",
        })

        console.log('toggggg', res.data.nodeChildren)

        res.data.nodeChildren.forEach((element) => {
          const node = new TreeNode({
            name: element.name,
            isLeaf: false,
            path: element.path,
            hasChild: element.hasChildren,
            id: v4(),
          })
          param.addChildren(node)
        })
      }
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
    async addNode(path, nodeName, parentNode) {
      try {
        const input = {
          path,
          nodeName,
          childNodeName: 'new node',
          childNodeIcon: '',
        }
        const res = await this.$apollo.mutate({
          mutation: ADD_CHILD_NODE_MUTATION,
          variables: {
            input,
          },
        })

        console.log('addnode res', res)

        const node = new TreeNode({
          name: 'new node',
          isLeaf: false,
          id: v4(),
          path: res.data.addChildNode.node.path,
          hasChild: false,
        })
        if (parentNode === null) {
          if (!this.data.children) this.data.children = []
          this.data.addChildren(node)
        } else {
          parentNode.addChildren(node)
        }
      } catch (err) {
        console.log('err', err)
        this.$notify.error(this.extractErrorMessage(err))
      }
    },
    async saveNodeName() {
      if (this.generalInfo) {
        this.generalInfo.name = this.generalInfo.name.trim() // Trim any leading/trailing whitespace

        const nodeToUpdate = this.findNodeById(this.data, this.generalInfo.id)
        if (nodeToUpdate) {
          try {
            const input = {
              path: this.generalInfo.path,
              name: this.currentSelectedNode.name,
              updatedName: this.generalInfo.name,
              updatedIcon: '',
            }
            console.log('input', input)
            const res = await this.$apollo.mutate({
              mutation: UPDATE_NODE_MUTATION,
              variables: {
                input,
              },
            })
            console.log('res299', res)
            nodeToUpdate.name = res.data.updateNode.node.name
          } catch (err) {
            console.log('err', err)
          }
        }
      }
    },
    findNodeById(node, id) {
      if (node.id === id) {
        return node
      }
      if (node.children) {
        for (const child of node.children) {
          const foundNode = this.findNodeById(child, id)
          if (foundNode) {
            return foundNode
          }
        }
      }
      return null
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
