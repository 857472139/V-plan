<template>
	<view class="topheader">
		<view class="top" :class="inx==1?'bgcolor':''">
			<view class="left" @click="back"><image src="/static/back.png" mode=""></image></view>
			<view class="title">{{ title }}</view>
			<view class="right"></view>
		</view>
		<view class="line"></view>
	</view>
</template>

<script>
export default {
	props: {
		title: {
			type: String
		},
		inx:{
			type:String,
			default:'0'
		}
	},
	data() {
		return {};
	},
	methods: {
		back() {
			history.back();
		}
	}
};
</script>

<style scoped lang="scss">
.topheader {
	.top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 35rpx;
		height: 50px;
		position: fixed;
		top: 0;
		width: 680rpx;
		z-index: 22;
	  
		.left {
			width: 20%;
			image {
				width: 21rpx;
				height: 40rpx;
				display: block;
			}
		}
		.title {
			font-size: 36rpx;
			width: 60%;
			text-align: center;
			font-family: PingFang SC;
			font-weight: bold;
			color: rgba(243, 243, 243, 1);
		}
		.right {
			font-size: 36rpx;
			width: 20%;
			text-align: center;
			font-family: PingFang SC;
			font-weight: bold;
			color: rgba(243, 243, 243, 1);
		}
	}
	.bgcolor{
		 background: linear-gradient(to left,#113234,#123537,#103032,#0E292B,#113133);
	}
	.line {
		height: 50px;
	}
}
</style>
