<template>
    <el-date-picker 
        :format="props.format"
        :value-format="props.valueFormat" 
        v-model= "valueDate" 
        type="datetimerange" 
        range-separator="To" 
        start-placeholder="Start date"
        end-placeholder="End date"
        :disabled-date="disabledDate"
        @change="datepickerChange" 
    />
</template>
<script setup>
//  <!-- v-model= "valueDate"  -->
import filterDate from "../../utils/utils/time.js";
    const props = defineProps({
        format:{
            default:"YYYY-MM-DD HH:mm:ss",
            type:String
        },
        valueFormat:{
            default:"YYYY-MM-DD HH:mm:ss",
            type:String
        },
        dateValue:{
            type:Array,
            default:[]
        }
    })

    const emit = defineEmits(['update:dateValue'])

    const valueDate = ref([filterDate((Date.now() - 2592000000),'YYYY-MM-DD hh:mm:ss'), filterDate(Date.now(),'YYYY-MM-DD hh:mm:ss')]);

    const disabledDate = ref((time)=>{
        return time.getTime() > Date.now();
    })

    const datepickerChange = (e)=>{
        emit('update:dateValue',e);
    }

    onBeforeMount(()=>{
        emit('update:dateValue',valueDate);
    })
</script>