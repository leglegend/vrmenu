<template>
	<view class="meal-page">
		<scroll-view class="page-scroll" scroll-y="" :style="{ height: `calc(100vh - ${tabbarHeight + 'px'})` }">
			<view class="item-out">
				<view class="item-context" :style="{ 'background-image': `url(${mealInfo.src})` }">
					<view class="item-title">{{ mealInfo.title || '' }}</view>
					<view class="item-infos">
						<view class="view-demo"></view>
						<view class="view-context" v-if="mealInfo.infos">
							<view v-for="text in mealInfo.infos" :key="text">● {{ text || '' }}</view>
						</view>
					</view>
					<view class="item-price"></view>
				</view>
			</view>
			<view class="meal-context" v-html="mealInfo.context"></view>
		</scroll-view>
		<view class="bottom-bar" :style="{ height: tabbarHeight + 'px' }"><button class="bar-buttom vr-button" @click="makeCall">电话预约</button></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: '',
			mealInfo: {},
			tabbarHeight: getApp().globalData.tabbarHeight
		};
	},
	methods: {
		makeCall() {
			wx.makePhoneCall({
				phoneNumber: '16630127426'
			});
		}
	},
	onLoad(option) {
		this.title = option.title;
		this.id = option.id;
		uni.setNavigationBarTitle({
			title: option.title
		});
		this.$cloud('meals', { type: 'get', id: option.id }, true).then(res => {
			this.mealInfo = res;
		});
	},
	onShareAppMessage() {
		return {
			title: this.title,
			imageUrl: this.mealInfo.src,
			path: '/pages/index/meal?title=' + this.title + '&id=' + this.id
		};
	}
};
</script>

<style lang="scss">
.meal-page {
	width: 100vw;
	height: 100vh;
	background: $bg-top;
	.page-scroll {
		background-image: linear-gradient($bg-top, $bg-bottom);
		.page-context {
		}
		.meal-context {
			width: 100vw;
			box-sizing: border-box;
			padding: 3vw 2vw;
			overflow: hidden;
		}
	}
	.bottom-bar {
		width: 100vw;
		background: #1b2128;
		position: fixed;
		left: 0;
		bottom: 0;
		.bar-buttom {
			position: absolute;
			right: 4vw;
			top: 2vw;
			width: 30vw;
			height: 9vw;
			line-height: 9vw;
		}
	}
}
</style>
