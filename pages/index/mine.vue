<template>
	<view class="mine-page">
		<view class="page-bg"></view>
		<view class="page-context">
			<view class="persion-info">
				<view class="mine-logo">
					<view>
						<!-- #ifdef H5 -->
						<image src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-jiuyuevr/2af600a0-929c-11ea-b997-9918a5dda011.png" />
						<!-- #endif -->
						<!-- #ifdef MP-WEIXIN -->
						<open-data type="userAvatarUrl"></open-data>
						<!-- #endif -->
					</view>
				</view>
				<view class="mine-name">
					<view class="name">
						<!-- #ifdef H5 -->
						九月吧VR体验店
						<!-- #endif -->
						<!-- #ifdef MP-WEIXIN -->
						<open-data type="userNickName"></open-data>
						<!-- #endif -->
					</view>
					<view class="info" v-if="type == 'game'">想玩{{ wantCount }}款游戏，已玩{{ haveCount }}款游戏</view>
					<view class="info" v-if="type != 'game'">欢迎光临本店</view>
				</view>
			</view>
			<view v-if="type == 'game'">
				<view class="change-type">
					<view class="change-view">
						<view class="current-view" :class="current ? 'current-have' : 'current-want'"></view>
						<view @click="current = 0">想玩</view>
						<view @click="current = 1">已玩</view>
					</view>
				</view>
				<view class="games" v-if="current == 0">
					<view class="game-item" v-for="(item, index) in wantGames" :key="index" @click="jumpToDetail(item)">
						<view class="game-left"><image :src="item.src"></image></view>
						<view class="game-right">
							<view class="right-title">{{ item.title }}</view>
							<view class="right-context">{{ item.context }}</view>
						</view>
						<view class="want-play have-play" :class="item.isWant ? 'no-want' : ''" @click.stop="havePlay(item)">玩过</view>
						<view class="want-play" :class="item.isWant ? 'no-want' : ''" @click.stop="wantPlay(item)">{{ item.isWant ? '不想玩' : '想玩' }}</view>
					</view>
				</view>
				<view class="games" v-if="current == 1">
					<view class="game-item" v-for="(item, index) in haveGames" :key="index" @click="jumpToDetail(item)">
						<view class="game-left"><image :src="item.src"></image></view>
						<view class="game-right">
							<view class="right-title">{{ item.title }}</view>
							<view class="right-context">{{ item.context }}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="store-page" v-if="type != 'game'">
				<view>门店地址：石家庄裕华万达1号公寓1612室</view>
				<view>联系电话：16630127426</view>
				<view class="store-img"><image src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-jiuyuevr/00b071c0-9294-11ea-b94e-47f67ecf8268.jpg"></image></view>
			</view>
		</view>
	</view>
</template>

<script>
import { games } from '@/utils/data.js';

export default {
	data() {
		return {
			// #ifdef MP-WEIXIN
			type: getApp().globalData.type,
			// #endif
			// #ifdef H5
			type: 'game',
			// #endif
			current: 0,
			wantGames: [],
			haveGames: [],
			wantCount: 0,
			haveCount: 0
		};
	},
	methods: {
		jumpToDetail(item) {
			uni.navigateTo({
				url: './detail?id=' + item.id + '&title=' + item.title
			});
		},
		havePlay(item) {
			item.isWant == 2;
			let ids = wx.getStorageSync('have') || [];
			ids.push(item.id);
			wx.setStorageSync('have', ids);

			ids = wx.getStorageSync('want');
			let newIds = [];
			for (let id of ids) {
				if (id != item.id) {
					newIds.push(id);
				}
			}
			wx.setStorageSync('want', newIds);
			this.refresh();
		},
		wantPlay(item) {
			if (item.isWant === 2) {
				return;
			}
			item.isWant == 1 ? (item.isWant = 0) : (item.isWant = 1);
			this.changeData += 1;
			if (item.isWant === 1) {
				let ids = wx.getStorageSync('want') || [];
				ids.push(item.id);
				wx.setStorageSync('want', ids);
			} else {
				let ids = wx.getStorageSync('want');
				let newIds = [];
				for (let id of ids) {
					if (id != item.id) {
						newIds.push(id);
					}
				}
				wx.setStorageSync('want', newIds);
			}
			this.refresh();
		},
		refresh() {
			let wantIds = wx.getStorageSync('want') || [];
			let haveIds = wx.getStorageSync('have') || [];
			let wantGames = [];
			let haveGames = [];
			uniCloud
				.callFunction({
					name: 'games'
				})
				.then(res => {
					console.log(res.result.data);
					for (let game of res.result.data) {
						if (wantIds.indexOf(game.id) >= 0) {
							game.isWant = 1;
							wantGames.push(game);
						}
						if (haveIds.indexOf(game.id) >= 0) {
							game.isWant = 2;
							haveGames.push(game);
						}
					}
					this.wantGames = wantGames;
					this.haveGames = haveGames;
					this.wantCount = wantGames.length;
					this.haveCount = haveGames.length;
				});
		}
	},
	onShow() {
		// #ifndef H5
		// #endif
		this.refresh();
	}
};
</script>

<style lang="scss">
.mine-page {
	width: 100vw;
	.page-bg {
		width: 100vw;
		height: 100vh;
		position: fixed;
		z-index: 0;
		left: 0;
		top: 0;
		background-image: linear-gradient(#2a475e, #1d2b3c);
	}
	.page-context {
		position: relative;
		z-index: 1;
		.persion-info {
			padding: 4vw;
			.mine-logo {
				width: 20vw;
				height: 20vw;
				display: inline-block;
				box-sizing: border-box;
				border: 1vw solid #498ba5;
				border-radius: 0.5vw;
				view {
					width: 18vw;
					height: 18vw;
					image {
						width: 18vw;
						height: 18vw;
					}
				}
			}
			.mine-name {
				display: inline-block;
				color: #ffffff;
				vertical-align: top;
				padding-left: 2vw;
				.name {
					line-height: 5vw;
					font-size: 5vw;
					padding-top: 3vw;
				}
				.info {
					color: #808080;
					font-size: 3.5vw;
					padding-top: 5vw;
				}
			}
		}
		.change-type {
			width: 70vw;
			margin: 0 auto;
			padding-top: 3vw;
			padding-bottom: 2vw;
			.change-view {
				width: 100%;
				border-radius: 2vw;
				height: 8vw;
				line-height: 8vw;
				background: #3f536e;
				position: relative;
				.current-view {
					position: absolute;
					left: 0;
					top: 0;
					width: 50%;
					height: 8vw;
					background: #577398;
					border-radius: 2vw;
					z-index: 1;
				}
				.current-want {
					animation: want 0.6s forwards;
				}
				.current-have {
					animation: have 0.6s forwards;
				}
				@keyframes want {
					from {
						left: 35vw;
					}
					to {
						left: 0;
					}
				}
				@keyframes have {
					to {
						left: 35vw;
					}
				}
				view {
					display: inline-block;
					text-align: center;
					width: 50%;
					color: #ffffff;
					font-size: 4vw;
					position: relative;
					z-index: 2;
				}
			}
		}
	}
	.store-page {
		padding-top: 5vw;
		padding-left: 5vw;
		line-height: 7vw;
		font-size: 4.5vw;
		color: #ffffff;
		.store-img {
			width: 90vw;
			padding-top: 3vw;
			image {
				width: 90vw;
				height: 65vw;
				border-radius: 2vw;
			}
		}
	}
}
</style>
