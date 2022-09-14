<template>
  <!--导航条 -->
  <div class="nav">
    <el-tabs v-model="activeName" class="navWrapper">
      <el-tab-pane label="创建的歌单" name="first">
        <CreateList :createListInfo="createListInfo"/>
      </el-tab-pane>
      <el-tab-pane label="收藏的歌单" name="second">收藏的歌单</el-tab-pane>
      <el-tab-pane label="创建的音乐专栏" name="third">创建的音乐专栏</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CreateList from './CreateList.vue'
import {createListInfo} from '../../../api/Person/index'
export default {
  data() {
    return {
      activeName: "second",
      createListInfo:""
    };
  },
  methods: {
    
  async getCreateListInfo(){
    const {data} = await createListInfo(this.$route.params.id);
    console.log(data);
    if(data.code != 200){
      this.$message("error", "获取创建歌单信息有误")
      
    }
    this.createListInfo = this.weekData;

  }
  
   
  },
   components:{
     CreateList
   }
   ,
   mounted(){
     this.getCreateListInfo();
   }
};
</script>

<style scoped lang="scss">
.navWrapper{
  border: none;

}
</style>
