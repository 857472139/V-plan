<template>
	<view class="subtitle" :class="inx==1?'bg':''">
		<span class="commcolor text">{{title}}</span>
	</view>
</template>

<script>
	export default {
		props:{
			title:{
				type:String,
			},
			inx:{
				type:String,
				default:'0'
			}
		},
	}
</script>

<style scoped lang="scss">
	.subtitle{
		font-size: 36rpx;
		font-weight: bold;
		
		background: url(../static/titlebg.png) no-repeat;
		background-size: 100%;
		width: 291rpx;
		height: 56rpx;
		line-height: 56rpx;
		text-align: center;
		text-indent: -50rpx;
		.text{
			position: relative;
			top: -3rpx;
		}
	}
	.bg{
		background: url(../static/im.png) no-repeat;
		background-size: 100%;
		width: 356rpx;
		height: 56rpx;		
	}
</style>
