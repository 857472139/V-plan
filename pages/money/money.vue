<template>
	<view class="contain">
		<topheader :title="$t('index.zcmx')"></topheader>
		<view class="top">
			<view class="item" @click="getmoney">
				<view class="button">
					<span>{{ LiveStaticProfit }}</span>
					<span>{{ $t('wallet.klq') }}</span>
				</view>
				<view class="text">{{ $t('wallet.jtsy') }}</view>
			</view>
			<view class="item" @click="getmoney1">
				<view class="button">
					<span>{{add(LiveDynamicProfit , stashedDynamic,0)  }}</span>
					<span>{{ $t('wallet.klq') }}</span>
				</view>
				<view class="text">{{ $t('wallet.tgjl') }}</view>
			</view>
			<view class="item" @click="getmoney2">
				<view class="button">
					<span>{{ add(LiveTeamProfit , stashedTeamReward,0)}}</span>
					<span>{{ $t('wallet.klq') }}</span>
				</view>
				<view class="text">{{ $t('wallet.fxjl') }}</view>
			</view>
		</view>
		<view class="team" v-if="show">
			<view class="list">
				<view class="item">
					<view class="num commcolor" :key="StaticProfit">{{ StaticProfit }}</view>
					<view class="text">{{ $t('wallet.jtzh') }}</view>
				</view>
				<view class="item">
					<view class="num commcolor" :key="DynamicProfit ">{{ DynamicProfit }}</view>
					<view class="text">{{ $t('wallet.tgzh') }}</view>
				</view>
				<view class="item">
					<view class="num commcolor" :key="TeamProfit">{{ TeamProfit }}</view>
					<view class="text">{{ $t('wallet.fxzh') }}</view>
				</view>
<!-- 				<view class="item" :key="add1(StaticProfit, DynamicProfit,TeamProfit)">
					<view class="num commcolor">{{ (add1(StaticProfit, DynamicProfit,TeamProfit)/10).toFixed(7) }}</view>
					<view class="text">{{ $t('wallet.bxcsy') }}</view>
				</view> -->
				<view class="item">
					<view class="num commcolor" :key="add(StaticProfit , DynamicProfit , TeamProfit)">{{ add(StaticProfit , DynamicProfit , TeamProfit) }}</view>
					<view class="text">{{ $t('wallet.ljsy') }}</view>
				</view>
				<!-- <view class="item"></view> -->
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			accounts: [],
			stashedDynamic: 0,
			stashedTeamReward: 0,
			StaticProfit: 0, //静态综合
			DynamicProfit: 0,
			TeamProfit: 0,
			StaticProfit1: 0, //静态综合
			DynamicProfit1: 0,
			TeamProfit1: 0,
			LiveStaticProfit: 0,
			LiveDynamicProfit: 0,
			LiveTeamProfit: 0,
			show:true,
			outnum:0
		};
	},
	onLoad() {
		uni.showLoading({
			mask: true
		});
		this.startApp();
	},
	computed: {},
	methods: {
		add(arg1, arg2, arg3) {
			var digits1, digits2, digits3, maxDigits;
			try {
				digits1 = arg1.toString().split('.')[1].length;
			} catch (e) {
				digits1 = 0;
			}
			try {
				digits2 = arg2.toString().split('.')[1].length;
			} catch (e) {
				digits2 = 0;
			}
			try {
				digits3 = arg3.toString().split('.')[1].length;
			} catch (e) {
				digits3 = 0;
			}
			maxDigits = Math.pow(10, Math.max(digits1, digits2, digits3));
			return (arg1 * maxDigits + arg2 * maxDigits + arg3 * maxDigits) / maxDigits;
		},
		add1(arg1, arg2, arg3) {
			var digits1, digits2, digits3, maxDigits;
			try {
				digits1 = arg1.toString().split('.')[1].length;
			} catch (e) {
				digits1 = 0;
			}
			try {
				digits2 = arg2.toString().split('.')[1].length;
			} catch (e) {
				digits2 = 0;
			}
			try {
				digits3 = arg3.toString().split('.')[1].length;
			} catch (e) {
				digits3 = 0;
			}
			maxDigits = Math.pow(10, Math.max(digits1, digits2, digits3));
			return (((arg1 * maxDigits + arg2 * maxDigits + arg3 * maxDigits) / maxDigits));
		},
		formnum(data) {
			let b=Number(data)
			let a = b.toString();
			let num = this.web3.utils.fromWei(a, 'ether');
			return num != 0 ? parseFloat(num).toFixed(8) : 0;
		},
		startApp() {
			this.web3.eth.getAccounts((err, accounts) => {
				console.log('getAccounts accounts: ' + accounts);
				this.accounts = accounts;
				this.getall(accounts)
				setTimeout(() => {
					uni.hideLoading();
				}, 2000);
			});
		},
		getall(accounts){
			this.getUserinfo(accounts);
			this.gottenStaticProfit(accounts);
			this.gottenDynamicProfit(accounts);
			this.gottenTeamProfit(accounts);
			this.getLiveDynamicProfit(accounts);
			this.getLiveStaticProfit(accounts);
			this.getLiveTeamProfit(accounts);
		},
		getifout(num) {
			this.Contract.methods
				.getOutgame(num)
				.call()
				.then(res => {
					console.log(res);
					// this.allmoney = res
					this.outnum=res
					console.log('出局：'+res)
					
				});
		},
		getUserinfo(accounts) {
			this.Contract.methods
				.addressToUser(accounts[0])
				.call()
				.then(res => {
					console.log(res)
					// console.log('已存储的团队奖励'+this.web3.utils.fromWei(res.stashedTeamReward ));
					// console.log('已存储的动态奖励'+this.web3.utils.fromWei(res.stashedDynamic))
					// console.log(res.investAmount)
					// this.stashedTeamReward = Number(this.formnum(res.stashedTeamReward));
					this.stashedDynamic = Number(this.formnum(res.stashedDynamic));
					this.investAmount = Number(this.formnum(res.investAmount));
					this.getifout(res.investAmount)
				});
		},
		//静态总和
		gottenStaticProfit(accounts) {
			this.Contract.methods
				.gottenStaticProfit(accounts[0])
				.call()
				.then(res => {
					console.log('静态综合：' + this.web3.utils.fromWei(res));
					this.StaticProfit = Number(this.formnum(res));
					this.StaticProfit1 =Number(res);
				});
		},
		//动态总和
		gottenDynamicProfit(accounts) {
			this.Contract.methods
				.gottenDynamicProfit(accounts[0])
				.call()
				.then(res => {
					console.log('动态总和:' + this.web3.utils.fromWei(res));
					this.DynamicProfit = Number(this.formnum(res));
					this.DynamicProfit1 =Number(res);
				});
		},
		//分享总和
		gottenTeamProfit(accounts) {
			this.Contract.methods
				.gottenTeamProfit(accounts[0])
				.call()
				.then(res => {
					console.log('分享综合:' + this.web3.utils.fromWei(res));
					this.TeamProfit = Number(this.formnum(res));
					this.TeamProfit1 =Number(res);
				});
		},
		//可领取静态收益
		getLiveStaticProfit(accounts) {
			this.Contract.methods
				.getLiveStaticProfit(accounts[0])
				.call()
				.then(res => {
					console.log('可领取静态收益' + this.web3.utils.fromWei(res));
					this.LiveStaticProfit = Number(this.formnum(res));
				});
		},
		getLiveDynamicProfit(accounts) {
			this.Contract.methods
				.getLiveDynamicProfit(accounts[0])
				.call()
				.then(res => {
					console.log('可领取的动态收益：' + this.web3.utils.fromWei(res));
					this.LiveDynamicProfit = Number(this.formnum(res));
				});
		},
		getLiveTeamProfit(accounts) {
			this.Contract.methods
				.getLiveTeamProfit(accounts[0])
				.call()
				.then(res => {
					console.log('可领取的团队收益:' + this.web3.utils.fromWei(res));
					this.LiveTeamProfit = Number(this.formnum(res));
				});
		},
		getmoney() {
			const that = this;
			
			if (that.LiveStaticProfit == 0) {
				uni.showToast({
					title: that.$t('warn.nojt'),
					icon: 'none'
				});
				return;
			}
			console.log(that.StaticProfit1+that.DynamicProfit1+that.TeamProfit1)
			if(that.StaticProfit1+that.DynamicProfit1+that.TeamProfit1>=that.outnum){
				uni.showToast({
					title:this.$t('warn.nycjqft'),
					icon:'none'
				})
				return
			}
			uni.showLoading({
				title: that.$t('warn.qrz'),
				mask: true
			});

			let SELF_ADDR = that.accounts[0];
			that.Contract.methods
				.happy()
				.send({ from: SELF_ADDR })
				.on('receipt', function(receipt) {
					console.log(receipt);
					uni.showToast({
						title: that.$t('warn.lqcg')
					});

					that.startApp(that.accounts);
				})
				.on('error', function(error) {
					console.log('领取失败');
					uni.showToast({
						title: that.$t('warn.lqsb'),
						icon: 'none'
					});
				});
		},
		getmoney1() {
			const that = this;
			
			if (that.LiveDynamicProfit + that.stashedDynamic == 0) {
				uni.showToast({
					title: that.$t('warn.notg'),
					icon: 'none'
				});
				return;
			}
			if(that.StaticProfit1+that.DynamicProfit1+that.TeamProfit1>=that.outnum){
				uni.showToast({
					title:this.$t('warn.nycjqft'),
					icon:'none'
				})
				return
			}
			uni.showLoading({
				title: that.$t('warn.qrz'),
				mask: true
			});
			let SELF_ADDR = that.accounts[0];
			that.Contract.methods
				.haveFun()
				.send({ from: SELF_ADDR })
				.on('receipt', function(receipt) {
					console.log(receipt);
					uni.showToast({
						title: that.$t('warn.lqcg')
					});
					that.startApp(that.accounts);
				})
				.on('error', function(error) {
					console.log('领取失败');
					uni.showToast({
						title:  that.$t('warn.lqsb'),
						icon: 'none'
					});
				});
		},
		getmoney2() {
			const that = this;
			if (that.LiveTeamProfit + that.stashedTeamReward == 0) {
				uni.showToast({
					title: that.$t('warn.nofx'),
					icon: 'none'
				});
				return;
			}
			if(that.StaticProfit1+that.DynamicProfit1+that.TeamProfit1>=that.outnum){
				uni.showToast({
					title:this.$t('warn.nycjqft'),
					icon:'none'
				})
				return
			}
			uni.showLoading({
				title:  that.$t('warn.qrz'),
				mask: true
			});
			let SELF_ADDR = that.accounts[0];
			that.Contract.methods
				.getTeamReward()
				.send({ from: SELF_ADDR })
				.on('receipt', function(receipt) {
					console.log(receipt);
					uni.showToast({
						title:  that.$t('warn.lqcg')
					});
					that.startApp(that.accounts);
				})
				.on('error', function(error) {
					console.log('领取失败');
					uni.showToast({
						title:  that.$t('warn.lqsb'),
						icon: 'none'
					});
				});
		}
	}
};
</script>

<style scoped lang="scss">
.contain {
	line-height: 1;
	.top {
		width: 650rpx;
		padding: 46rpx 20rpx 57rpx;
		background: rgba(45, 51, 53, 1);
		border-radius: 20rpx;
		display: flex;
		margin: 40rpx auto;
		justify-content: space-between;
		.item {
			display: flex;
			flex-direction: column;
			align-items: center;
			.button {
				width: 200rpx;
				// height: 60rpx;
				// line-height: 60rpx;
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: rgba(45, 51, 53, 1);
				text-align: center;
				border-radius: 10rpx;
				display: flex;
				flex-direction: column;
				padding: 20rpx 0;
				span {
					&:last-child {
						font-size: 22rpx;
						margin-top: 10rpx;
					}
				}
			}
			.text {
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: rgba(142, 152, 156, 1);
				margin-top: 30rpx;
				text-align: center;
			}
		}
	}
	.team {
		padding: 0 30rpx;
		.list {
			width: 690rpx;
			background: rgba(45, 51, 53, 1);
			border-radius: 20rpx;
			display: flex;
			flex-wrap: wrap;
			// padding-top: 60rpx;
			.item {
				width: 90%;
				padding: 40rpx 5%;
				display: flex;
				// flex-direction: column;
				flex-direction: row-reverse;
				justify-content: space-between;
				align-items: center;
				// margin-bottom: 80rpx;
				border-bottom: 2rpx solid rgba(255, 255, 255, 0.1);
				&:last-child {
					border: none;
				}
				.text {
					font-size: 22rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: rgba(255, 255, 255, 1);
					text-align: center;
				}
				.num {
					font-size: 36rpx;
					font-weight: bold;
					// margin-bottom: 40rpx;
				}
			}
		}
	}
}
</style>
