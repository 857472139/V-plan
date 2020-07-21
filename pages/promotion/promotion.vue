<template>
	<view class="contain">
		<topheader :title="$t('index.fxtg')" inx="1"></topheader>
		<view class="link">
			<subtitle :title="$t('pro.yqlj')"></subtitle>
			<view class="content">
				<view class="text">{{$t('pro.rule')}}</view>
				<view class="url">
					<view class="left commcolor">{{$t('pro.wdyqlj')}}</view>
					<view class="right" v-if="!url">{{$t('pro.zw')}}</view>
					<view class="right1" v-else>{{url}}</view>
				</view>
				<button v-if="url" v-clipboard:copy="url" v-clipboard:success="copy" >
					{{$t('pro.fzlj')}}
				</button>
				<button v-else @click="back">{{$t('pro.ljsg')}}</button>
			</view>
		</view>
		<view class="team" v-if="show">
			<subtitle :title="$t('pro.wdtd')"></subtitle>
			<view class="list">
				<view class="item">
					<view class="num commcolor">{{teamcount}}</view>
					<view class="text">{{$t('pro.zthy')}}</view>
				</view>
<!-- 				<view class="item">
					<view class="num commcolor">0</view>
					<view class="text">{{$t('pro.ejhy')}}</view>
				</view>
				<view class="item">
					<view class="num commcolor">0</view>
					<view class="text">{{$t('pro.sjhy')}}</view>
				</view> -->
				<view class="item">
					<view class="num commcolor">{{formnum(totalInvitedE0)}}</view>
					<view class="text">{{$t('pro.tdtb')}}</view>
				</view>
				<view class="item">
					<view class="num commcolor">V{{level}}</view>
					<view class="text">{{$t('pro.tddj')}}</view>
				</view>
				<view class="item"></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			url: '',
			accounts:[],
			totalInvitedE0:0,
			level:0,
			teamcount:0,
			show:false
		};
	},
	onLoad() {
		uni.showLoading({
			mask:true
		})
		this.startApp()
	},
	methods: {
		formnum(data) {
			let a=data?data.toString():'0'
			let num = this.web3.utils.fromWei(a, 'ether');
			return num != 0 ? Number(num).toFixed(4) : 0;
		},
		startApp() {
			this.web3.eth.getAccounts((err, accounts) => {
				console.log('getAccounts accounts: ' + accounts);
				this.accounts=accounts
				this.getUserinfo(accounts)
			});
		},
		getUserinfo(accounts){
			this.Contract.methods.addressToUser(accounts[0]).call().then(res=>{
				console.log(res)
				this.level=parseInt(res.level) 
				this.totalInvitedE0=res.totalInvitedE0
				this.teamcount=res.teamCount
				console.log('团队等级:'+res.level)
				console.log('团队投币:'+res.totalInvitedE0)
				console.log('团队好友:'+res.teamCount)
				if(res.referCode!=0){
				this.url=sessionStorage.getItem('url')+'?code='+res.referCode
				}
				this.show=true
				uni.hideLoading()
			})
		},
		copy(){
			uni.showToast({
				title:this.$t('warn.fzcg')
			})
		},
		back(){
			history.back()
		}
	}
};
</script>

<style scoped lang="scss">
.contain {
	line-height: 1;
	.link {
		padding: 30rpx;
		.content {
			position: relative;
			top: -1rpx;
			width: 630rpx;
			padding: 30rpx;
			background: rgba(45, 51, 53, 1);
			border-radius: 0 20rpx 20rpx;
			.text {
				color: #8e989c;
				font-size: 26rpx;
				line-height: 3;
			}
			.url {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin: 50rpx 0;
				.left {
					font-size: 30rpx;
					font-weight: bold;
				}
				.right {
					font-size: 30rpx;
					color: #7a8387;
				}
				.right1 {
					flex: 1;
					margin-left: 40rpx;
					text-align: right;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					font-size: 30rpx;
					color: #ffedd3;
				}
			}
			button {
				width: 510rpx;
				height: 88rpx;
				line-height: 88rpx;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: rgba(3, 29, 40, 1);
				margin-bottom: 20rpx;
			}
		}
	}
	.team {
		padding: 30rpx;
		.list {
			position: relative;
			top: -1rpx;
			width: 690rpx;
			background: rgba(45, 51, 53, 1);
			border-radius: 0 20rpx 20rpx;
			display: flex;
			flex-wrap: wrap;
			padding-top: 60rpx;
			padding-bottom: 60rpx;
			.item {
				width: 33.3%;
				display: flex;
				flex-direction: column;
				align-items: center;
				// margin-bottom: 80rpx;
				.text {
					font-size: 22rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: rgba(255, 255, 255, 1);
					text-align: center;
				}
				.num {
					font-size: 46rpx;
					font-weight: bold;
					margin-bottom: 40rpx;
				}
			}
		}
	}
}
</style>
