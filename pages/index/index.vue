<template>
	<view class="contain" v-if="show">
		<view class="top">
			<view class="left"><image src="../../static/logo.png" mode=""></image></view>
			<view class="right" @click="open">
				<view class="rls">
				<image v-if="inx==0" src="../../static/gq/1.png" mode="widthFix"></image>
				<image v-if="inx==1" src="../../static/gq/2.png" mode="widthFix"></image>
				<image v-if="inx==2" src="../../static/gq/3.png" mode="widthFix"></image>
				<image v-if="inx==3" src="../../static/gq/4.png" mode="widthFix"></image>
				<image v-if="inx==4" src="../../static/gq/5.png" mode="widthFix"></image>
				<span class="commcolor">{{ $t('lang.langlist')[inx] }}</span>	
				</view>
				
				<span class="border"></span>
			</view>
		</view>
		<view class="datanum">
			<view class="numitem">
				<view class="num commcolor">{{ formnum(allmoney) }}</view>
				<view class="text">{{ $t('index.hyvc') }}</view>
			</view>
			<view class="numitem">
				<view class="num commcolor">{{ formnum(investAmount) }}</view>
				<view class="text">{{ $t('index.wdjh') }}</view>
			</view>
			<view class="numitem">
				<view class="num commcolor">{{ formnum(outGameAmount) }}</view>
				<view class="text">{{ $t('index.vjj') }}</view>
			</view>
		</view>
		<view class="icon">
			<view class="iconitem" @click="touch(0)">
				<view class="img"><image src="../../static/1.png" mode=""></image></view>
				<view class="text">{{ $t('index.hyjj') }}</view>
			</view>
			<view class="iconitem" @click="touch(1)">
				<view class="img"><image src="../../static/2.png" mode=""></image></view>
				<view class="text">{{ $t('index.zcmx') }}</view>
			</view>
			<view class="iconitem" @click="touch(2)">
				<view class="img"><image src="../../static/3.png" mode=""></image></view>
				<view class="text">{{ $t('index.fxtg') }}</view>
			</view>
			<view class="iconitem" @click="touch(3)">
				<view class="img"><image src="../../static/4.png" mode=""></image></view>
				<view class="text">{{ $t('index.qbjc') }}</view>
			</view>
		</view>
		<view class="join">
			<subtitle :title="$t('index.cyjh')"></subtitle>
			<view class="joingame">
				<view class="top">
					<view class="text commcolor">{{ $t('index.jhsl') }}</view>
					<view class="box">
						<view class="boxleft">
							<view class="reduce commcolor" @click="reduce">-</view>
							<view class="input commcolor"><input @blur="input" class="commcolor" v-model="num" type="number" value="" /></view>
							<view class="add commcolor" @click="add">+</view>
						</view>

						<view class="boxright commcolor">ETH</view>
					</view>
				</view>
				<button class="start" @click="join">{{ $t('index.cy') }}</button>
			</view>
		</view>
		<view class="pool">
			<subtitle :title="$t('index.jcfp')"></subtitle>
			<view class="showpool">
				<view class="showpoolitem">
					<view class="poolborder">
						<vus-sphere-progress :width="176" :anim="true" :percent="percent" :color="['#0E292A', '#3D4F49', '#273C39']"></vus-sphere-progress>
						<view class="num">
							<view class="allnum commcolor" style="font-size: 30rpx;font-weight: bold;">{{ formnum(racePool) }}</view>
							<view  style="font-size: 22rpx;color:#ffe7c5" :key="inx">{{ $t('index.vjc') }}</view>
						</view>
					</view>
					<view class="text commcolor" :key="time">
						<span class="t commcolor">{{ time }}</span>
						<span class="commcolor">{{ $t('index.djs') }}</span>
					</view>
				</view>
				<view class="showpoolitem">
					<view class="poolborder">
						<vus-sphere-progress :anim="true" :width="176" :percent="formnum(fusePool) / 50" :color="['#0E292A', '#3D4F49', '#273C39']"></vus-sphere-progress>
						<view class="num">
							<view class="allnum commcolor" style="font-size: 30rpx;font-weight: bold;">{{ formnum(fusePool) }}</view>
							<view  style="font-size: 22rpx;color:#ffe7c5" :key="inx">{{ $t('index.bxc') }}</view>
						</view>
					</view>
					<view class="text commcolor" :key="inx">
						<span class="t commcolor">1-490{{ $t('index.m') }}</span>
						<span class="commcolor">{{ $t('index.jhds') }}</span>
					</view>
				</view>
			</view>
			<!-- 		<view class="hjbg">
				<view class="">{{ $t('index.hjdz') }}</view>
				<view class="item">
					<span v-for="(item, index) in list" :key="index">{{ item }}</span>
				</view>
			</view> -->
		</view>
		<view class="wraporder">
		<!-- 	<subtitle title="获奖列表"></subtitle> -->
			<view class="clude">
				<view class="item">
					<span>{{$t('index.cydz')}}</span>
					<span>{{$t('index.yq')}}</span>
					<span>{{$t('index.jl')}}</span>
					<span>{{$t('index.pm')}}</span>
				</view>
				<swiper :indicator-dots="false" :autoplay="true" :interval="3000" @change="change" :current="changeinx" circular="true" vertical="true" :duration="1000">
					<swiper-item v-for="(item, index) in list" :key="index">
						<view class="item">
							<span>{{ item.userAddress }}</span>
							<span>{{ formnum(item.invitedAmount) }}</span>
							<span v-if="changeinx==0">{{formnum(racePool/5/2)}}</span>
							<span v-if="changeinx==1">{{formnum(racePool/5/5)}}</span>
							<span v-if="changeinx==2">{{formnum(racePool/5/10)}}</span>
							<span v-if="changeinx>2">{{formnum((racePool/5-racePool/5/10-racePool/5/5-racePool/5/2)/7)}}</span>
							<span>{{ index + 1 }}</span>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="bottom commcolor">VPlan-DAPP.com.All Rights Teserved</view>
		<uni-popup ref="popup" type="bottom" style="z-index:99999">
			<view class="wrap">
				<view class="item commcolor" @click="select(index)" v-for="(item, index) in $t('lang.langlist')" :key="index">
				<view class="img">
					
				
				<image v-if="index==0" src="../../static/gq/1.png" mode="widthFix" ></image>
				<image v-if="index==1" src="../../static/gq/2.png" mode="widthFix" ></image>
				<image v-if="index==2" src="../../static/gq/3.png" mode="widthFix" ></image>
				<image v-if="index==3" src="../../static/gq/4.png" mode="widthFix" ></image>
				<image v-if="index==4" src="../../static/gq/5.png" mode="widthFix"></image>
					</view>
				<span>{{ item }}</span>
			
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import vusSphereProgress from '@/components/vus-sphere-progress/vus-sphere-progress.vue';
export default {
	components: {
		uniPopup,
		vusSphereProgress
	},
	data() {
		return {
			num: 1,
			inx: 0,
			percent: 50,
			percent1: 40,
			accounts: '',
			investAmount: 0,
			outGameAmount: 0,
			inviter: '',
			referCode: '',
			stashedDynamic: 0,
			stashedTeamReward: 0,
			allmoney: 0,
			racePool: 0,
			fusePool: 0,
			invitecode: '',
			list: [],
			time: 0,
			show: false,
			changeinx:0,
			StaticProfit:0,
			DynamicProfit:0,
			TeamProfit:0,
			outnum:0
		};
	},
	onLoad(o) {
		uni.showLoading({
			mask: true
		});
		sessionStorage.setItem('url', window.location.href.split('?')[0]);
		if (o.code) {
			// alert(o.code)
			this.invitecode = o.code;
		}
		if (this.request('code')) {
			this.invitecode = this.request('code');
		}
		this.inx = localStorage.getItem('inx') || 0;
		this.startApp();

		let i = 0;
		this.gettopuser(i);
		this.cutdown();
		setTimeout(() => {
			uni.hideLoading();
		}, 2000);
	},
	methods: {
		change(e){
			this.changeinx=e.detail.current
		},
		request(attribute) {
			var reg = new RegExp('(^|&)' + attribute + '=([^&]*)(&|$)');
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return decodeURI(r[2].toString());
			return null;
		},
		cutdown() {
			let time = new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
			this.time = time;
			this.percent = ((new Date().getHours() * 60 * 60 + new Date().getMinutes() * 60 + new Date().getSeconds()) / (24 * 60 * 60)) * 100;
			setTimeout(() => {
				this.cutdown();
			}, 1000);
		},
		join() {
			if(this.StaticProfit+this.DynamicProfit+this.TeamProfit<this.outnum){
				uni.showToast({
					title:this.$t('warn.nycy'),
					icon:'none'
				})
				return
			}
			if (this.investAmount >this.num*1000000000000000000) {
				uni.showToast({
					title: this.$t('warn.bdxyslcys'),
					icon: 'none'
				});
				return;
			}
			if (this.num > 100) {
				uni.showToast({
					title: this.$t('warn.zdjhsl'),
					icon: 'none'
				});
				return;
			}
			if (!this.invitecode) {
				uni.showToast({
					title: this.$t('warn.zwyqm'),
					icon: 'none'
				});
				return;
			}
			uni.showLoading({
				title: this.$t('warn.qrz'),
				mask: true
			});
			let value = this.web3.utils.toWei(this.num.toString());
			let code = this.invitecode;
			let accounts = this.accounts[0];
			console.log(value, code, accounts);
			// alert(111)
			// alert(accounts)
			const that = this;
			that.Contract.methods
				.invest(code)
				.send({ from: accounts, value: value })
				.on('receipt', function(receipt) {
					console.log(receipt);
					uni.showToast({
						title:that.$t('warn.cycg')
					});
					that.startApp();
				})
				.on('error', function(error) {
					// let a = JSON.stringify(error);
					// alert(a);
					uni.showToast({
						title: that.$t('warn.cysb'),
						icon: 'none'
					});
				});
		},
		gettopuser(i) {
			this.Contract.methods
				.topUsers(i)
				.call()
				.then(res => {
					console.log('第' + i + '个:' + res);
					if (res != '0x0000000000000000000000000000000000000000') {
						this.gettopuserinfo(res);
						i++;
						if (i < 10) {
							this.gettopuser(i);
						}
					}
				});
		},
		formnum(data) {
			// console.log(data,typeof data)
			// let a =typeof(data)=='String'?data:data.toString();
			let a = data ? data.toString() : '0';
			let num = this.web3.utils.fromWei(a, 'ether');
			return num != 0 ? Number(num).toFixed(4) : 0;
		},
		startApp() {
			this.web3.eth.getAccounts((err, accounts) => {
				// console.log(accounts);
				this.accounts = accounts;
				this.getuserinfo(accounts);
				this.totalInvestAmount();
				this.gottenStaticProfit(accounts)
				this.gottenDynamicProfit(accounts)
				this.gottenTeamProfit(accounts)
			});
			this.web3.eth.getBalance('0xc5256853BbaD8Cf0A533e09fb1EEf8592C5c65Fe').then(res => {
				console.log('合约地址余额:' + res);
				this.allmoney = res;
				this.getracePool();
				this.getfusePool();
			});
		},
		getifout(num) {
			this.Contract.methods
				.getOutgame(num)
				.call()
				.then(res => {
					// console.log(res);
					// this.allmoney = res
					this.outnum=res
					console.log('出局：'+res)
					
				});
		},
		//静态总和
		gottenStaticProfit(accounts) {
			this.Contract.methods
				.gottenStaticProfit(accounts[0])
				.call()
				.then(res => {
					console.log('静态综合：' + this.web3.utils.fromWei(res));
					this.StaticProfit = Number(res);
				});
		},
		//动态总和
		gottenDynamicProfit(accounts) {
			this.Contract.methods
				.gottenDynamicProfit(accounts[0])
				.call()
				.then(res => {
					console.log('动态总和:' + this.web3.utils.fromWei(res));
					this.DynamicProfit = Number(res);
				});
		},
		//分享总和
		gottenTeamProfit(accounts) {
			this.Contract.methods
				.gottenTeamProfit(accounts[0])
				.call()
				.then(res => {
					console.log('分享综合:' + this.web3.utils.fromWei(res));
					this.TeamProfit= Number(res);
				});
		},
		totalInvestAmount() {
			this.Contract.methods
				.totalInvestAmount()
				.call()
				.then(res => {
					// console.log(res);
					// this.allmoney = res
					console.log('合约vchi:' + res);
				});
		},
		getuserinfo(accounts) {
			this.Contract.methods
				.addressToUser(accounts[0])
				.call()
				.then(res => {
					console.log(res);
					console.log('认购的数量:' + this.web3.utils.fromWei(res.investAmount));
					this.investAmount = res.investAmount;
					this.getifout(res.investAmount)
					this.getOutgame(res.investAmount);
				});
		},
		gettopuserinfo(accounts) {
			console.log(accounts);
			this.Contract.methods
				.addressToUser(accounts)
				.call()
				.then(res => {
					console.log(res);
					this.list.push(res);
					console.log('308:' + res);
				});
		},
		getracePool() {
			this.Contract.methods
				.racePool()
				.call()
				.then(res => {
					console.log('奖金池:' + this.web3.utils.fromWei(res));
					this.racePool = res;
				});
		},
		getOutgame(data) {
			this.Contract.methods
				.getOutgame(data)
				.call()
				.then(res => {
					console.log('V基金:' + this.web3.utils.fromWei(res));
					this.outGameAmount = res;
				});
		},
		getfusePool() {
			this.Contract.methods
				.fusePool()
				.call()
				.then(res => {
					console.log('保险池' + this.web3.utils.fromWei(res));
					this.fusePool = res;
					this.show = true;
				});
		},
		touch(inx) {
			let url = '';
			switch (inx) {
				case 0:
					url = '/pages/contact/contact';
					break;
				case 1:
					url = '/pages/money/money';
					break;
				case 2:
					url = '/pages/promotion/promotion';
					break;
				case 3:
					url = '/pages/introduction/introduction';
					break;
				default:
					break;
			}
			uni.navigateTo({
				url
			});
		},
		reduce() {
			if (this.num - 1 > 0) {
				this.num = this.num - 1;
			}
		},
		add() {
			if (this.num - 100 < 0) {
				this.num = this.num - 0 + 1;
			} else {
				uni.showToast({
					title: this.$t('warn.zdjhsl'),
					icon: 'none'
				});
				this.num = 100;
			}
		},
		input(e) {
			console.log(typeof e.detail.value);
			if (e.detail.value.includes('.')) {
				uni.showToast({
					title: this.$t('warn.ffsr'),
					icon: 'none'
				});
				this.num = parseInt(e.detail.value);
				return;
			}
			if (e.detail.value == 0) {
				uni.showToast({
					title: this.$t('warn.zxjhsl'),
					icon: 'none'
				});
				this.num = 1;
				return;
			}
			if (e.detail.value - 100 > 0) {
				uni.showToast({
					title: this.$t('warn.zdjhsl'),
					icon: 'none'
				});
				this.num = 100;
				return;
			}
		},
		open() {
			this.$refs.popup.open();
		},
		select(inx) {
			this.inx = inx;
			let lang = 'english';
			localStorage.setItem('inx', inx);
			switch (inx) {
				case 1:
					lang = 'zh';
					break;
				case 2:
					lang = 'fan';
					break;
				case 3:
					lang = 'Japanese';
					break;
				case 4:
					lang = 'Korean';
					break;
				case 0:
					lang = 'english';
					break;
				default:
					break;
			}
			this.$i18n.locale = lang;
			localStorage.setItem('lang', lang);
			this.$refs.popup.close();
		}
	}
};
</script>

<style scoped lang="scss">
.contain {
	line-height: 1;
	padding: 0 30rpx;
	.top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx 0;
		.left {
			width: 72rpx;
			height: 52rpx;
			image {
				width: 100%;
				height: 100%;
				display: block;
			}
		}
		.right {
			display: flex;
			align-items: center;
			font-size: 28rpx;
			.rls{
				display: flex;
				align-items: center;
				image{
					width:60rpx;
					height: auto;
					display: block;
					margin-right: 10rpx;
				}
			}
			.border {
				width: 14rpx;
				height: 14rpx;
				border-right: 4rpx solid #ffecd2;
				border-bottom: 4rpx solid #ffecd2;
				transform: rotate(45deg);
				margin-left: 10rpx;
				position: relative;
				top: -6rpx;
			}
		}
	}
	.datanum {
		margin-top: 30rpx;
		width: 630rpx;
		padding: 60rpx 30rpx;
		background: rgba(45, 51, 53, 1);
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.numitem {
			display: flex;
			flex-direction: column;
			align-items: center;
			.num {
				font-size: 46rpx;
				font-weight: bold;
			}
			.text {
				font-size: 22rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: rgba(255, 255, 255, 1);
				margin-top: 40rpx;
			}
		}
	}
	.icon {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 68rpx;
		.iconitem {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.img {
				width: 100rpx;
				height: 100rpx;
				margin-bottom: 14rpx;
				image {
					width: 100%;
					height: 100%;
					display: block;
				}
			}
			.text {
				font-size: 22rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: rgba(255, 255, 255, 1);
				text-align: center;
			}
		}
	}
	.join {
		margin-top: 65rpx;
		.joingame {
			position: relative;
			top: -1rpx;
			width: 630rpx;
			padding: 30rpx;
			background: rgba(45, 51, 53, 1);
			border-radius: 0px 20rpx 20rpx 20rpx;
			.top {
				display: flex;
				.text {
					font-size: 30rpx;
				}
				.box {
					margin: 75rpx 0 55rpx;
					width: 400rpx;
					height: 80rpx;
					background: rgba(1, 28, 35, 1);
					border: 2rpx solid #ffe3bd;
					border-radius: 12rpx;
					display: flex;
					align-items: center;
					padding-right: 20rpx;
					.boxleft {
						display: flex;
						align-items: center;
						font-size: 36rpx;
						font-weight: bold;

						height: 100%;
						.reduce {
							text-align: center;
							height: 100%;
							width: 80rpx;
							line-height: 80rpx;
						}
						.input {
							flex: 1;

							input {
								color: #ffddad;
								height: 80rpx;
								text-align: center;
							}
						}
						.add {
							text-align: center;
							height: 100%;
							width: 80rpx;
							line-height: 80rpx;
						}
					}
					.boxright {
						font-size: 30rpx;
						border-left: 2rpx solid #ffddad;
						padding: 10rpx 0 10rpx 20rpx;
					}
				}
			}
			.start {
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: rgba(3, 29, 40, 1);
				width: 510rpx;
				height: 88rpx;
				line-height: 88rpx;
				border-radius: 20rpx;
				margin-bottom: 35rpx;
			}
		}
	}
	.pool {
		margin-top: 54rpx;
		.showpool {
			width: 600rpx;
			padding: 50rpx 45rpx;
			background: rgba(45, 51, 53, 1);
			border-radius: 0px 20rpx 0rpx 0px;
			display: flex;
			position: relative;
			top: -1rpx;
			justify-content: space-between;
			.showpoolitem {
				.poolborder {
					width: 176rpx;
					height: 176rpx;
					border-radius: 50%;
					border: 16rpx solid #ffe7c5;
					position: relative;
					.num {
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
						display: flex;
						flex-direction: column;
						align-items: center;
						text-align: center;
					}
				}
				.text {
					margin-top: 20rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					font-size: 22rpx;
					.t {
						margin-bottom: 10rpx;
					}
				}
			}
		}
		.hjbg {
			position: relative;
			top: -2rpx;
			color: #c5c5c5;
			font-size: 24rpx;
			width: 668rpx;
			padding-left: 21rpx;
			height: 104rpx;
			background: url(../../static/hqbg.png) no-repeat;
			background-size: 100%;
			display: flex;
			align-items: center;
			.item {
				flex: 1;
				display: flex;
				flex-wrap: wrap;
				margin-left: 30rpx;
				span {
					margin-right: 30rpx;
					margin-bottom: 10rpx;
					display: block;
				}
			}
		}
	}
	.bottom {
		font-size: 22rpx;
		text-align: center;
		margin: 60rpx 0;
	}
	.wrap {
		background: #000000;
		.item {
			text-align: center;
			font-size: 36rpx;
			font-weight: bold;
			padding: 30rpx 0;
			border-bottom: 2rpx solid #123436;
			display: flex;
			align-items: center;
			justify-content: center;
			.img{
				width: 100rpx;
				image{
					width: 60rpx;
					height: auto;
					text-align: center;
					display: block;
				}
			}
			span{
				width: 120rpx;
			}
	
		}
	}
	.wraporder {
		// margin-top: 54rpx;
		.clude {
			width: 650rpx;
			padding: 50rpx 20rpx 0;
			background: rgba(45, 51, 53, 1);
			border-radius: 0px 0 20rpx 20rpx;
			// display: flex;
			position: relative;
			top: -1rpx;
			// justify-content: space-between;
			.item {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				span {
					width: 25%;
					text-align: center;
					font-size: 20rpx;
					color: #ffffff;
				}
			}
			swiper {
				height: 100rpx;
				width: 100%;
				swiper-item {
				
					.item {
						display: flex;
						align-items: center;
						justify-content: space-between;
						height: inherit;
						span {
							width: 25%;
							text-align: center;
							font-size: 20rpx;
							color: #ffffff;
							&:first-child {
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
							}
						}
					}
				}
			}
		}
	}
}
</style>
