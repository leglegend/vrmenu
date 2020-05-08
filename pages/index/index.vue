<template>
	<view class="index-page">
		<swiper class="index-swiper" indicator-dots="true" autoplay="true" indicator-active-color="#ffffff">
			<swiper-item class="swiper-item"><image src="https://media.st.dl.eccdnx.com/steam/apps/546560/header.jpg"></image></swiper-item>
			<swiper-item class="swiper-item"><image src="https://media.st.dl.pinyuncloud.com/steam/apps/342180/header.jpg"></image></swiper-item>
		</swiper>
		<scroll-view class="scroll-type" scroll-x="true">
			<view class="type-items">
				<view v-for="(item, index) in types" :key="index" :class="currentType == item ? 'item-select' : ''" @click="chooseType(item)">{{ item }}</view>
			</view>
		</scroll-view>
		<view class="games game-bg">
			<view class="game-item" v-for="(item, index) in items" :key="index" @click="jumpToDetail(item)">
				<view class="game-left"><image :src="item.src"></image></view>
				<view class="game-right">
					<view class="right-title">{{ item.title }}</view>
					<view class="right-context">{{ item.context }}</view>
				</view>
				<view class="want-play" :class="item.isWant ? 'no-want' : ''" @click.stop="wantPlay(item)">{{ item.isWant == 1 ? '不想玩' : item.isWant == 2 ? '已玩' : '想玩' }}</view>
			</view>
		</view>
		<view style="height: 1vw;background: #1d2b3c;position: relative;top: 1vw;"></view>
	</view>
</template>

<script>
import { games } from '@/utils/data.js';
 
export default {
	data() {
		return {
			types: ['新手推荐', '射击游戏', '动作游戏', '刺激游戏'],
			currentType: '新手推荐',
			changeData: 0,
			items: []
		};
	},
	methods: {
		jumpToDetail(item) {
			uni.navigateTo({
				url: './detail?id=' + item.id + '&title=' + item.title
			});
		},
		chooseType(type) {
			this.currentType = type;
			let items = [];
			for (let game of games) {
				if (game.type === type) {
					items.push(game);
				}
			}
			this.items = items;
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
		}
	},
	onShow() {
		let wantIds = wx.getStorageSync('want') || [];
		let haveIds = wx.getStorageSync('have') || [];
		for (let game of games) {
			if (wantIds.indexOf(game.id) >= 0) {
				game.isWant = 1;
			}
			if (haveIds.indexOf(game.id) >= 0) {
				game.isWant = 2;
			}
		}
		this.chooseType('新手推荐');
	}
};
</script>

<style lang="scss">
.index-page {
	width: 100vw;
	background: #1d2b3c;
	.index-swiper {
		width: 100vw;
		height: 50vw;
		.swiper-item {
			width: 100vw;
			height: 50vw;
			image {
				width: 100vw;
				height: 50vw;
			}
		}
	}
	.scroll-type {
		height: 8vw;
		line-height: 8vw;
		width: 100vw;
		background: #1d2b3c;
		position: sticky;
		top: 0;
		.type-items {
			view {
				width: 20vw;
				text-align: center;
				display: inline-block;
				color: #2a475e;
				border-top-left-radius: 1vw;
				border-top-right-radius: 1vw;
				font-size: 4vw;
			}
			.item-select {
				background: #2a475e;
				color: #ffffff;
			}
		}
	}
}
</style>
