<template>
	<view class="index-page">
		<swiper class="index-swiper" indicator-dots="true" autoplay="true">
			<swiper-item class="swiper-item"><image src="https://media.st.dl.eccdnx.com/steam/apps/546560/header.jpg"></image></swiper-item>
			<swiper-item class="swiper-item"><image src="https://media.st.dl.pinyuncloud.com/steam/apps/342180/header.jpg"></image></swiper-item>
		</swiper>
		<scroll-view class="scroll-type" scroll-x="true">
			<view class="type-items">
				<view v-for="(item, index) in types" :key="index" :class="currentType == item ? 'item-select' : ''" @click="chooseType(item)">{{ item }}</view>
			</view>
		</scroll-view>
		<view class="games">
			<view class="game-item" v-for="(item, index) in items" :key="index" @click="jumpToDetail(item)">
				<view class="game-left"><image :src="item.src"></image></view>
				<view class="game-right">
					<view class="right-title">{{ item.title }}</view>
					<view class="right-context">{{ item.context }}</view>
				</view>
				<view class="want-play" :class="item.isWant ? 'no-want' : ''" @click.stop="wantPlay(item)">{{ item.isWant ? '不想玩' : '想玩' }}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: 'Hello',
			types: ['新手推荐', '射击游戏', '动作游戏'],
			currentType: '新手推荐',
			changeData: 0,
			items: [{ src: 'https://media.st.dl.pinyuncloud.com/steam/apps/716400/header.jpg', title: '赤壁之战', context: '扮演三国武将，过五关斩六将', isWant: false }]
		};
	},
	methods: {
		jumpToDetail() {
			uni.navigateTo({
				url: './detail'
			});
		},
		chooseType(item) {
			this.currentType = item;
			if (item === '新手推荐') {
				this.items = [{ src: 'https://media.st.dl.pinyuncloud.com/steam/apps/716400/header.jpg', title: '赤壁之战', context: '扮演三国武将，过五关斩六将', isWant: false }];
			} else if (item === '射击游戏') {
				this.items = [
					{
						src: 'https://media.st.dl.pinyuncloud.com/steam/apps/342180/header.jpg',
						title: '亚利桑那阳光',
						context: '亚利桑那阳光(Arizona Sunshine)是一款专为虚拟现实（VR）打造的游戏，将让你置身于僵尸横行的末日世界。',
						isWant: false
					}
				];
			} else {
				this.items = [];
			}
		},
		wantPlay(item) {
			item.isWant = !item.isWant;
			this.changeData += 1;
		}
	},
	onLoad() {}
};
</script>

<style lang="scss">
.index-page {
	width: 100vw;
	height: 100vh;
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
	.games {
		background-image: linear-gradient(#2a475e, #1d2b3c);
		min-height: 100vw;
		.game-item {
			width: 100vw;
			padding: 4vw 2vw;
			box-sizing: border-box;
			position: relative;
			.want-play {
				position: absolute;
				text-align: center;
				right: 2vw;
				bottom: 4vw;
				background: red;
				width: 14vw;
				height: 6vw;
				line-height: 6vw;
				border-radius: 3vw;
				font-size: 3.5vw;
				color: #ffffff;
			}
			.no-want {
				background: #999999;
			}
			.game-left {
				width: 40vw;
				height: 20vw;
				display: inline-block;
				vertical-align: top;
				image {
					width: 40vw;
					height: 20vw;
				}
			}
			.game-right {
				display: inline-block;
				background: #1d2b3c;
				width: 53vw;
				height: 20vw;
				padding-left: 3vw;
				vertical-align: top;
				.right-title {
					line-height: 7vw;
					font-size: 4vw;
					font-weight: 600;
					color: #ffffff;
				}
				.right-context {
					font-size: 3vw;
					line-height: 4vw;
					width: 40vw;
					color: #555555;
				}
			}
		}
	}
}
</style>
