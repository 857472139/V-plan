<template>
	<view class="contain">
		<topheader :title="$t('index.hyjj')"></topheader>
		<view class="con">
			<subtitle :title="$t('index.hyjj')" inx='1'></subtitle>
			<view class="text">
				<view v-for="(item,index) in $t('intro.contact')" :key="index">{{item}}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	onLoad() {},
	methods: {}
};
</script>

<style scoped lang="scss">
.contain {
	display: flex;
	flex-direction: column;
	height: 100vh;
	.con{
		flex: 1;
		padding:30rpx 30rpx 0;
		display: flex;
		flex-direction: column;
		margin-bottom: 40rpx;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
		.text{
			flex: 1;
			position: relative;
			top: -1rpx;
			padding: 30rpx;
			width:630rpx;
			background:rgba(45,51,53,1);
			border-radius:0px 20rpx 20rpx 20rpx;
			color: #8E989C;
			font-size: 28rpx;
			white-space: pre-line;
			line-height: 1.8;
			overflow-y: scroll;
			view{
				text-align: justify;
			}
		}
	}
}
</style>
