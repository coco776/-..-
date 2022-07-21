<template>
    <div class="mainBody">
        <div class="setImg">
            <img src="../../../assets/img/qr_guide.png" alt="">
             
        </div>
       <!--二维码部分 -->
            <QRcode/>
    </div>
</template>

<script scoped>
    import QRcode from '../../../components/login/QRcode.vue'
    export default {
       name:'QRcodeLogin',
       components:{
           QRcode
       }
    }

</script>

<style>
    .mainBody{
        display: flex;
    }
    .setImg{
        width: 30%;
        margin-top: 10px;
    }
    img{
        width: 100%;
    }
</style>

