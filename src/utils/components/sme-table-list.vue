<template>
    <div class="sme-tab-list">
        <el-table 
            :data="tableDataList" 
            :border="border" 
            :stripe="stripe"
            max-height="250"
            @select = 'props.select'
            @select-all = 'props.select'
        >
            <el-table-column 
                :align='item.align || "left"' 
                :width="item.width" 
                :fixed="item.fixed" 
                :label="item.title"
                :type="item.type" 
                :props="item.key"
                v-for="item in props.tabTitleList" 
                :id="item.id"
            >
                <template #default="scope" v-if="item.type !== 'selection'">
                    <slot :row="scope.row || {}" :item="item || ''" :value="scope.row[item.key]"></slot>
                </template>
            </el-table-column>
        </el-table>
        <el-row justify="end" class="sme-ekyc-el-pagination" v-if="showPagination">
            <el-pagination v-model:currentPage="paramsData.currentPage" v-model:page-size="paramsData.pageSize"
                :page-sizes="[100, 200, 300, 400]" background layout="total, sizes, prev, pager, next, jumper"
                :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </el-row>
    </div>
</template>

<script setup>
const { appContext } = getCurrentInstance();
const props = defineProps({
    border: Boolean, //table 是否显示 border
    stripe: Boolean, //斑马纹
    tabTitleList: { // 表格title 配置 
        type: Array,
        default: []
    },
    showPagination: { //是否展示分页
        type: Boolean,
        default: false
    },
    searchData: { //搜索框搜索条件
        type: Object,
        default: {}
    },
    searchFunction: { //需要搜索的 API方法
        type: Function,
        default: null
    },
    select:{
        type: Function,
        default: ()=>{}
    }
})
const border = props.border;
const stripe = props.stripe;
let tableDataList = ref([]);
const paramsData = reactive({
    currentPage: 1,
    pageSize: 20
})
let total = ref(0);

const handleSizeChange = (e) => {
    paramsData.pageSize = e;
    getTable();
}
const handleCurrentChange = (e) => {
    paramsData.currentPage = e;
    getTable();
}

const getTable = async (data = {}) => {
    const result = await props.searchFunction({
        ...props.searchData,
        ...paramsData,
        ...data
    });
    const { resultData, resultCode } = result;
    if (resultCode == 1) {
        total.value = +resultData.total;
        tableDataList.value = resultData.data;
    }
}

onBeforeMount(async () => {
    if (!props.searchFunction) return;
    //监听 search 搜索方法
    appContext.config.globalProperties.$mitt.on('search', (res) => {
        paramsData.currentPage = 1;
        paramsData.pageSize = 20;
        getTable(res);
    })
    //监听清空页面方法
    appContext.config.globalProperties.$mitt.on('reset', (res) => {
        paramsData.currentPage = 1;
        paramsData.pageSize = 20;
        getTable(res);
    })
});

</script>
<style scoped>
.sme-tab-list {
    margin: 30px 0;
}

.sme-ekyc-el-pagination {
    margin-top: 30px;
}
</style>