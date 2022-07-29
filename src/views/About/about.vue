<template>
    <el-tabs type="border-card" stretch>
        <el-tab-pane label="公司信息">
            <el-button  @click="setPop">
            借宿
            </el-button>
           <audio controls>
                <source :src="urls" type="audio/mp3">
                <source :src="urls" type="audio/ogg">
                <p>你的浏览器不支持 HTML5 音频，可点击<a href="viper.mp3">此链接</a>收听。</p>
            </audio>
        </el-tab-pane>
        <el-tab-pane label="邀请人信息">邀请人信息</el-tab-pane>
        <el-tab-pane label="查册信息">查册信息</el-tab-pane>
        <el-tab-pane label="业务详情">业务详情</el-tab-pane>
        <el-tab-pane label="财务状况">财务状况</el-tab-pane>
        <el-tab-pane label="最终提交页">最终提交页</el-tab-pane>
    </el-tabs>
</template>
<script setup>
// 预先设置一个变量来存MediaRecorder实例
let mediaRecorder  = null;
let urls = ref('');
const  setPop = ()=>{
    // 录音结束事件，在需要结束录音时调用，录音结束后的操作请在 mediaRecorder.onstop 里面写
    mediaRecorder && mediaRecorder.stop()
}
onMounted(()=>{
// 首先打开麦克风
navigator.mediaDevices.getUserMedia({audio: true}).then(stream=>{
	let chunks = [];
	mediaRecorder = new MediaRecorder(stream);
	mediaRecorder.start();
	
	// 录音开始事件监听（即调用 mediaRecorder.start()时会触发该事件）
	mediaRecorder.onstart = () =>{
        console.log("record start")
    }

	// 录音可用事件监听，发生于mediaRecorder.stop()调用后，mediaRecorder.onstop 前
    mediaRecorder.ondataavailable = (e) =>{
    	console.log("dataavailable")
    	console.log(e)
        chunks.push(e.data)
    }
    
    // 录音结束事件监听，发生在mediaRecorder.stop()和 mediaRecorder.ondataavailable 调用后
    mediaRecorder.onstop = () =>{
    	console.log("record end")
    	// 获取到录音的blob
		let blob = new Blob(chunks,{type:"audio/webm;codecs=opus"}); 

		//  将blob转换为file对象，名字可以自己改，一般用于需要将文件上传到后台的情况
		let file = new window.File([blob],"record.webm");
				urls.value = file;
		// 将blob转换为地址，一般用于页面上面的回显，这个url可以直接被 audio 标签使用
		let url = (window.URL || webkitURL).createObjectURL(blob);
        console.log(url);
	}
})
     
})
</script>
<style>
</style>