<template>
	<view class="mine-page">
		<view class="persion-info">
			<view class="mine-logo">
				<view><open-data type="userAvatarUrl"></open-data></view>
			</view>
			<view class="mine-name">
				<view class="name"><open-data type="userNickName"></open-data></view>
				<view class="info">想玩3款游戏，已玩5款游戏</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: 'Hello'
		};
	},
	onLoad() {},
	methods: {}
};
</script>

<style lang="scss">
.mine-page {
	width: 100vw;
	height: 100vh;
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
}
</style>
