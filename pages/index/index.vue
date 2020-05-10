<template>
	<view class="index-page">
		<view :class="type == 'game' ? 'hide-page' : ''">
			<view class="page-bg"></view>
			<view class="page-context">
				<swiper class="index-swiper" indicator-dots="true" autoplay="true" indicator-active-color="#ffffff">
					<swiper-item class="swiper-item"><image src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-jiuyuevr/b19d91a0-9264-11ea-8bd0-2998ac5bbf7e.png"></image></swiper-item>
					<swiper-item class="swiper-item"><image src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-jiuyuevr/b19e06d0-9264-11ea-9e8b-05a3242b26f2.jpg"></image></swiper-item>
				</swiper>
				<view class="index-title">
					精 选 套 餐
					<view class="title-bg"></view>
				</view>
				<view class="index-items">
					<view class="item-out" v-for="item in meals" :index="item._id">
						<view class="item-context" @click="jumpToMeal(item)" :style="{ 'background-image': `url(${item.src})` }">
							<view class="item-title">{{ item.title || '' }}</view>
							<view class="item-infos">
								<view class="view-demo"></view>
								<view class="view-context" v-if="item.infos">
									<view v-for="text in item.infos" :key="text">● {{ text || '' }}</view>
								</view>
							</view>
							<view class="item-price">{{ item.price ? '￥' + item.price : '' }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="game-page" v-if="type == 'game'">
			<swiper class="index-swiper" indicator-dots="true" autoplay="true" indicator-active-color="#ffffff">
				<swiper-item class="swiper-item"><image src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-jiuyuevr/b19d91a0-9264-11ea-8bd0-2998ac5bbf7e.png"></image></swiper-item>
				<swiper-item class="swiper-item"><image src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-jiuyuevr/b19e06d0-9264-11ea-9e8b-05a3242b26f2.jpg"></image></swiper-item>
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
	</view>
</template>

<script>
export default {
	data() {
		return {
			// #ifdef MP-WEIXIN
			type: getApp().globalData.type,
			// #endif
			// #ifdef H5
			type: 'game',
			// #endif
			types: ['新手推荐', '射击游戏', '动作游戏', '刺激游戏'],
			currentType: '新手推荐',
			changeData: 0,
			items: [],
			games: [],
			meals: [{}]
		};
	},
	methods: {
		jumpToMeal(item) {
			uni.navigateTo({
				url: './meal?id=' + item._id + '&title=' + item.title
			});
		},
		jumpToDetail(item) {
			uni.navigateTo({
				url: './detail?id=' + item._id + '&title=' + item.title
			});
		},
		chooseType(type) {
			this.currentType = type;
			let items = [];
			for (let game of this.games) {
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
	onLoad(option) {
		this.type = option.type;
		this.$cloud('meals', { type: 'search' }, true).then(res => {
			this.meals = res;
		});
	},
	onShow() {
		let wantIds = wx.getStorageSync('want') || [];
		let haveIds = wx.getStorageSync('have') || [];
		this.$cloud('games', { type: 'search' }, true).then(res => {
			this.games = res;
			for (let game of res) {
				if (wantIds.indexOf(game.id) >= 0) {
					game.isWant = 1;
				}
				if (haveIds.indexOf(game.id) >= 0) {
					game.isWant = 2;
				}
			}
			this.chooseType('新手推荐');
		});
	}
};
</script>

<style lang="scss">
.index-page {
	width: 100vw;
	.hide-page {
		height: 0;
		overflow: hidden;
	}
	.page-bg {
		width: 100vw;
		height: 100vh;
		position: fixed;
		z-index: 0;
		left: 0;
		top: 0;
		background-image: linear-gradient(#1d2b3c, #2a475e);
	}
	.page-context {
		position: relative;
		z-index: 1;
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
		.index-title {
			text-align: center;
			color: #5a9aca;
			padding-top: 3vw;
			line-height: 5.5vw;
			font-size: 5.5vw;
			font-weight: 600;
			padding-bottom: 3vw;
			position: relative;
			.title-bg {
				height: 0.5vw;
				position: absolute;
				width: 70vw;
				left: 15vw;
				bottom: 0;
				background-image: linear-gradient(to right, #2a475e, #1d2b3c, #2a475e);
			}
		}
		.index-items {
			padding-top: 1vw;
			padding-bottom: 5vw;
		}
	}
	.game-page {
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
			z-index: 10;
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
}
</style>
