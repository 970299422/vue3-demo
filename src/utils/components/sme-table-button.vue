<template>
    <el-button
      type="primary"
      @click="handleClick(1)"
      link
      v-if="props.showEdit"
      >编辑</el-button>
    <el-button
      type="primary"
      @click="handleClick(2)"
      link
      v-if="props.showDetail"
      >详情</el-button>
</template>
<script setup>
const props = defineProps({
    row:{
        type:Object,
        default:{}
    },
    showDetail:{
        type:Boolean,
        default:true,
    },
    showEdit:{
        type:Boolean,
        default:true,
    }
});
const handleClick = (id)=>{
    let url = '';
    if(!props.url){
        switch (id) {
            //1:编辑 2:详情 3:xxx   
            case 1:
                url = "/sme/application_company_base.html";
                break;
            case 2:
                url = "/sme/application_company_base.html";
                break;
            default:
                break;
        }
    }else{
        url = props.url;
    }
    
    const value = `?applicationId=${encodeURIComponent(props.row.applicationId)}&companyType=${encodeURIComponent(props.row.companyType)}&customerId=${encodeURIComponent(props.row.customerId)}`
    console.log(value);
    window.location.href = url + value;
}
</script>