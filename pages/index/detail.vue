<template>
	<view class="detail-page">
		<view class="page-bg"></view>
		<swiper class="index-swiper" indicator-dots="true" :autoplay="autoPlay" indicator-active-color="#ffffff" @change="swiperChange">
			<swiper-item class="swiper-item" v-for="(item, index) in gameInfo.videos" :key="index">
				<video :id="'video' + index" @play="autoPlay = false" @pause="autoPlay = true" :src="item.url" :poster="item.poster" />
			</swiper-item>
			<swiper-item v-for="(item, index) in gameInfo.imgs" :key="index" class="swiper-item"><image :src="item"></image></swiper-item>
		</swiper>
		<view class="game-context">
			<view class="context-ctx"><view v-html="gameInfo.html"></view></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			autoPlay: true,
			gameInfo: {},
			videos: []
		};
	},
	methods: {
		swiperChange() {
			for (let video of this.videos) {
				video.pause();
			}
		},
		createVideoContexts(videos) {
			setTimeout(
				function() {
					let items = [];
					for (let i = 0; i < videos.length; i++) {
						items.push(wx.createVideoContext('video' + i, this));
					}
					this.videos = items;
				}.bind(this),
				500
			);
		}
	},
	onLoad(option) {
		this.id = option.id;
		if (option.title) {
			wx.setNavigationBarTitle({
				title: option.title
			});
		}
		this.autoPlay = true;
		this.videos = [];
		this.$cloud('games', { type: 'get', id: option.id }, true).then(res => {
			this.gameInfo = res;
			wx.setNavigationBarTitle({
				title: res.title
			});
			if (res.videos && res.videos.length > 0) {
				this.createVideoContexts(res.videos);
			}
		});
	},
	onShareAppMessage() {
		let img = this.gameInfo.src;
		if (this.gameInfo.imgs && this.gameInfo.imgs.length > 0) {
			img = this.gameInfo.imgs[0];
		}
		return {
			title: this.gameInfo.title,
			path: '/pages/index/detail?title=' + this.gameInfo.title + '&id=' + this.id,
			imageUrl: img
		};
	}
};
</script>

<style lang="scss">
.detail-page {
	width: 100vw;
	color: #ffffff;
	.page-bg {
		width: 100vw;
		height: 100vh;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 0;
		background-image: linear-gradient(#2a475e, #1d2b3c);
	}
	.index-swiper {
		width: 100vw;
		height: 63vw;
		position: relative;
		z-index: 1;
		.swiper-item {
			width: 100vw;
			height: 56.1vw;
			image {
				width: 100vw;
				height: 56.1vw;
			}
			video {
				width: 100vw;
				height: 56.1vw;
			}
		}
	}
	.game-context {
		padding: 2vw 3vw 2vw 3vw;
		position: relative;
		z-index: 1;
		.context-ctx {
			width: 94vw;
			overflow: hidden;
			padding-bottom: 10vw;
			img {
				width: 80vw;
			}
		}
	}
}
</style>
