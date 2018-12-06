<template>
    <div>
        <top></top>
        <div class="content-wrapper">
            <tabs></tabs>
            <div class="content">
                <router-view/>
            </div>
        </div>
    </div>    
</template>

<script>
import top from './common/top'
import tabs from './common/tabs'
export default {
    name: 'home',
    data() {
        return{

        }
    },
    components: { // 声明子组件
        top,tabs
    },
    methods: {

    }
  
}
</script>

<style lang='sass' scoped>
.content-wrapper
    display: flex   
    .content
        padding: 0 30px
        flex: 1
</style>
