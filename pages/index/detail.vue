<template>
	<view class="detail-page">
		<swiper class="index-swiper" indicator-dots="true" autoplay="true" indicator-active-color="#ffffff">
			<swiper-item class="swiper-item">
				<video :src="gameInfo.microtrailer_mp4" :poster="gameInfo.main_capsule"/>
				</swiper-item>
			<swiper-item v-for="(item, index) in gameInfo.screenshot_list" :key="index" class="swiper-item"><image :src="item"></image></swiper-item>
		</swiper>
		<view class="game-name">{{ title }}</view>
		<view class="game-context">
			<view class="context-line">游戏简介</view>
			<view class="context-ctx">
				<text>{{ gameInfo.short_desc }}</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: '',
			video: '',
			gameInfo: {}
		};
	},
	methods: {},
	onLoad(option) {
		this.title = option.title;
		uni.setNavigationBarTitle({
			title: option.title
		});
		this.$get(option.id, true).then(res => {
			this.gameInfo = res;
		});
	}
};
</script>

<style lang="scss">
.detail-page {
	width: 100vw;
	height: 100vh;
	background-image: linear-gradient(#2a475e, #1d2b3c);
	color: #ffffff;
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
			video {
				width: 100vw;
				height: 50vw;
			}
		}
	}
	.game-name {
		padding-left: 4vw;
		font-size: 5vw;
		line-height: 11vw;
		font-weight: 600;
	}
	.game-context {
		padding: 0 4vw;
		.context-line {
			border-top: 0.1vw solid #f0f0f0;
			line-height: 10vw;
			font-size: 5vw;
		}
		.context-ctx {
			font-size: 3.5vw;
			line-height: 5vw;
			padding-bottom: 10vw;
		}
	}
}
</style>
