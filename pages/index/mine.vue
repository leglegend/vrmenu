<template>
	<view class="mine-page">
		<view class="persion-info">
			<view class="mine-logo">
				<view><open-data type="userAvatarUrl"></open-data></view>
			</view>
			<view class="mine-name">
				<view class="name"><open-data type="userNickName"></open-data></view>
				<view class="info">想玩{{ wantCount }}款游戏，已玩{{ haveCount }}款游戏</view>
			</view>
		</view>
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
		<view style="height: 5vw;background: #1d2b3c;"></view>
	</view>
</template>

<script>
import { games } from '@/utils/data.js';

export default {
	data() {
		return {
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
			for (let game of games) {
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
		}
	},
	onShow() {
		this.refresh();
	}
};
</script>

<style lang="scss">
.mine-page {
	width: 100vw;
	min-height: 100vh;
	background-color: #1d2b3c;
	background-image: linear-gradient(#2a475e, #1d2b3c);
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
</style>
