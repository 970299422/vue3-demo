<template>
    <el-form label-position="right" label-width="120px" :model="searchFormLabelAlign" :inline="true">
        <el-form-item label="申请单号:">
            <el-input v-model="searchFormLabelAlign.applicationId" size="default" style="width:195px"/>
        </el-form-item>
        <el-form-item label="客户ID:">
            <el-input v-model="searchFormLabelAlign.customerId" size="default" style="width:195px"/>
        </el-form-item>
        <el-form-item label="申请人电话号码:">
            <el-input v-model="searchFormLabelAlign.customerPhoneNumber" size="default" style="width:195px"/>
        </el-form-item>
        <el-form-item label="公司名称(英文):">
            <el-input v-model="searchFormLabelAlign.companyEname" size="default" style="width:195px"/>
        </el-form-item>
        <el-form-item label="公司名称(中文):">
            <el-input v-model="searchFormLabelAlign.companyCname" size="default" style="width:195px"/>
        </el-form-item>
        <el-form-item label="被邀请人状态:">
            <el-select v-model="searchFormLabelAlign.inviteeStatus" class="m-2" placeholder="请选择">
                <el-option v-for="item in inviteesStatus" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </el-form-item>
        <el-form-item label="缴费状态:">
            <el-select v-model="searchFormLabelAlign.paymentStatus" class="m-2" placeholder="请选择">
                <el-option v-for="item in payStatus" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </el-form-item>
        <el-form-item label="申请单状态:">
            <el-select v-model="searchFormLabelAlign.applicationStatus" class="m-2" placeholder="请选择">
                <el-option v-for="item in applicationStatus" :key="item.value" :label="item.label"
                    :value="item.value" />
            </el-select>
        </el-form-item>
        <el-form-item label="申请单环节:">
            <el-select v-model="searchFormLabelAlign.currentStep" class="m-2" placeholder="请选择">
                <el-option v-for="item in applicationLink" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </el-form-item>
        <el-col :span="12">
            <el-form-item label="申请时间:">
                <sme-date-picker v-model:date-value="searchFormLabelAlign.date"/>
            </el-form-item>
         </el-col>
    </el-form>
    <el-row justify="end">
        <el-button type="primary" @click="search">查询</el-button>
        <el-button @click="reset">重置</el-button>
        <el-button>延期</el-button>
    </el-row>
    <sme-table-list
        border
        :searchData = "searchFormLabelAlign" 
        :tabTitleList="tabTitleList" 
        showPagination
        :select="smeSelect"
        :searchFunction = "getTabList">
        <template #default="value">
            <span v-if="value.item.key === 'currentStep' && value.item.id == 8">
                {{
                    currentStepFunc(value.value)
                }}
            </span>
             <span v-else-if="value.item.key === 'currentStep' && value.item.id == 10">
                {{
                    filterPaymentstatus(value.value)
                }}
            </span>
            <span v-else-if="value.item.key === 'companyType'">
                {{
                    companyTypeFunc(value.value)
                }}
            </span>
            <span v-else-if="value.item.key === 'applicationStatus'">
                {{
                    applicationStatusFunc(value.value)
                }}
            </span>
            <span v-else-if="value.item.key === 'inviteeStatusList'">
                <el-tag :type="filterType(item.relatedStatus)" v-for="item in value.value">
                    {{
                        item.surname + ' ' + item.givenName
                    }}
                </el-tag>
            </span>
            <span v-else-if="value.item.key === 'operation'">
                <sme-table-button :row="value.row"></sme-table-button>
            </span>
            <span v-else>{{value.value}}</span>
        </template>
    </sme-table-list>
</template>
<script setup>
    import { getTabList } from "../../axios/home.js";
    const { appContext } = getCurrentInstance();
    const searchFormLabelAlign = reactive({
        date:[]
    });
    var applicationLink = [
        //申请单环节
        {
            label: "公司信息填写",
            value: "COMPANY_INFO_EDIT",
        },
        {
            label: "有关人士确认分享",
            value: "RELATED_PERSON_SHARE",
        },
        {
            label: "详细信息填写",
            value: "BUSINESS_DETAIL_EDIT",
        },
        {
            label: "财务信息填写",
            value: "FINANCIAL_DETAIL_EDIT",
        },
        {
            label: "确认申请提交",
            value: "CONFIRM_SUBMIT",
        },
        {
            label: "等待缴费结果",
            value: "WAIT_PAY_RESULT",
        },
        {
            label: "核心客户信息创建与开户",
            value: "SME_CIF_CALL",
        },
        {
            label: "D&B查册发起",
            value: "DNB_SEARCH_CALL",
        },
        {
            label: "等待D&B查询结果",
            value: "DNB_SEARCH_RESULT",
        },
        {
            label: "调用反洗钱",
            value: "FIRCO_CALL",
        },
        {
            label: "反洗钱审核",
            value: "FIRCO_REVIEW",
        },
        {
            label: "合理性检查",
            value: "PCSM_CALL",
        },
        {
            label: "检查是否需要触发审核",
            value: "CHECK_OPEN_AUDIT",
        },
        {
            label: "等待后管查册审核",
            value: "SEARCH_LEDGER_REVIEW",
        },
        {
            label: "等待客户确认",
            value: "WAIT_CUSTOMER_CONFIRM",
        },
        {
            label: "客户不同意审核",
            value: "NOT_CONFIRM_REVIEW",
        },
        {
            label: "开户激活",
            value: "OPEN_ACCOUNT_ACTIVATION",
        },
        // {
        //     label:'开户复核',
        //     value:'POST_CHECK_REVIEW'
        // },
        // {
        //     label:'开户额度提额',
        //     value:'SME_QUOTA_INCREASE'
        // },
        {
            label: "结束",
            value: "END",
        },
    ];
    var inviteesStatus = [
        //被邀请人状态
        {
            label: "成功",
            value: "RELATED_ACCEPT",
        },
        {
            label: "失败",
            value: "RELATED_REJECT",
        },
        {
            label: "进行中",
            value: "RELATED_EMPTY",
        },
    ];
    var applicationStatus = [
        //申请单状态
        {
            label: "正在处理",
            value: "PROCESSING",
        },
        {
            label: "申请成功",
            value: "SUCCESS",
        },
        {
            label: "申请失败",
            value: "FAIL",
        },
        //{
        //    label:"已关闭",
        //    value:"CLOSED"
        //},
        {
            label: "未申请",
            value: "NO_APPLICATION",
        },
        {
            label: "取消",
            value: "WITHDRAWAL",
        },
    ];
    var companyTypeEnum = [
        //公司类型

        {
            label: "合伙",
            value: "PARTNER",
        },
        {
            label: "个体户",
            value: "SOLE",
        },
        {
            label: "有限公司",
            value: "LIMITED",
        },
        {
            label: "其他",
            value: "OTHER",
        },
    ];
    var payStatus = [
        //缴费状态
        {
            label: "是",
            value: 1,
        },
        {
            label: "否",
            value: 0,
        },
    ];

    const tabTitleList = [
    {
        type:'selection',
        width:50,
    },
    {
        title:"申请单号",
        fixed:true,
        width:200,
        key:"applicationId",
        id:1,
    },{
        title:"客户ID",
        key:"customerId",
        width:200,
        id:2
    },{
        title:"申请人电话号码",
        key:"phoneNumber",
        width:150,
        id:3
    },{
        title:"申请人英文姓名",
        key:"customerEname",
        width:150,
        id:4
    },{
        title:"公司类别",
        key:"companyType",
        width:100,
        id:5
    },{
        title:"公司名称(英文)",
        key:"companyEname",
        width:150,
        id:6,
    },{
        title:"公司名称(中文)",
        key:"companyCname",
        width:150,
        id:7
    },{
        title:"申请单环节",
        key:"currentStep",
        width:150,
        id:8
    },{
        title:"申请单状态",
        key:"applicationStatus",
        width:100,
        id:9
    },{
        title:"缴费状态",
        key:"currentStep",
        width:100,
        id:10
    },{
        title:"被邀人状态",
        key:"inviteeStatusList",
        width:150,
        id:11
    },{
        title:"申请时间",
        key:"createdDate",
        width:200,
        id:12
    },{
        title:"延期日期",
        key:"delayDate",
        id:13,
        width:200,
    },{
        title:'操作',
        key:'operation',
        width:200,
        fixed:'right',
        id:14
    }];

    function filterPaymentstatus(value){
        if(value == '') {
            return ;
        }
        var currentIndex = 0;
        applicationLink.map((v,i)=>{
            if(v.value == value){
                currentIndex = i;
            }
        });
        return currentIndex > 5 ? '是' : '否';
    }
    function filterType(value){
        if(value == 'RELATED_ACCEPT'){
        return 'success'
        }else if(value == 'RELATED_REJECT'){
            return 'warn';
        }else{
            return null;
        }
    }

    function applicationStatusFunc(value){
        return applicationStatus.find(v=>v.value == value)?.label;
    }
    function companyTypeFunc(value){
        return companyTypeEnum.find(v=>v.value == value)?.label;
    }
    function inviteesStatusFunc(value){
        return inviteesStatus.find(v=>v.value == value)?.label;
    }
    function currentStepFunc(value){
        return applicationLink.find(v=>v.value == value)?.label;
    }

    //选中事件 当第二个参数未 undefined 时 是全选 否 为 单个勾选某一个事件
    const smeSelect = (value,row)=>{
        console.log(value);
        console.log(row);
    }
    //搜索
    const search = ()=>{
        appContext.config.globalProperties.$mitt.emit('search',searchFormLabelAlign)
    }
    //清空输入框
    const reset = ()=>{
        Object.keys(searchFormLabelAlign).map(key=>{
            delete searchFormLabelAlign[key];
        })
        //mitt  === event bus 不适用 ref 调用子组件方法
        appContext.config.globalProperties.$mitt.emit('reset',{});
    }
    //初始化生命周期
    onMounted(()=>{
        search();
    })

</script>
<style>
</style>