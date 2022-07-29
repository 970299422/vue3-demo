import SMETableList from './sme-table-list.vue';
import SMETableButton from './sme-table-button.vue';
import SMEDatePicker from "./sme-date-picker.vue";
export default function(app){
    return app.component("sme-table-list",SMETableList).component('sme-table-button',SMETableButton).component('sme-date-picker',SMEDatePicker);
}