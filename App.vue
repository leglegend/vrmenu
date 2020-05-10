<script>
export default {
	onLaunch: function(e) {
		// #ifdef MP-WEIXIN
		this.$scope.globalData.type = e.query.type;
		let system = wx.getSystemInfoSync();
		this.$scope.globalData.tabbarHeight = system.screenHeight - system.windowHeight - system.statusBarHeight - 44;
		// #endif
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
.game-bg {
	background-color: #1d2b3c;
	background-image: linear-gradient(#2a475e, #1d2b3c);
	min-height: calc(100vh - 59vw);
	padding-bottom: 10vw;
	box-sizing: border-box;
}
.vr-button {
	background-image: linear-gradient(#63b9ec, #4480a3);
	color: #ffffff;
	text-align: center;
}
.games {
	.game-item {
		width: 100vw;
		padding: 4vw 2vw 0vw 2vw;
		box-sizing: border-box;
		position: relative;
		.want-play {
			position: absolute;
			text-align: center;
			right: 2.5vw;
			bottom: 0.5vw;
			background-image: linear-gradient(#63b9ec, #4480a3);
			width: 12vw;
			height: 5.5vw;
			line-height: 5.5vw;
			border-radius: 1.2vw;
			font-size: 3.2vw;
			color: #ffffff;
		}
		.have-play {
			bottom: 6.5vw;
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
				height: 12vw;
				overflow: hidden;
				width: 40vw;
				color: #888888;
				word-break: break-all;
			}
		}
	}
}
.item-out {
	padding: 2vw 0;
	.item-context {
		width: 94vw;
		margin: 0 auto;
		height: 55vw;
		border-radius: 3vw;
		background-color: #182432;
		box-shadow: 0 0.4vw 0.8vw 0 rgba(0, 0, 0, 0.2), 0 0.6vw 2vw 0 rgba(0, 0, 0, 0.19), 0 0 2vw 1vw #182432 inset;
		position: relative;
		background-image: url(https://vkceyugu.cdn.bspapp.com/VKCEYUGU-jiuyuevr/31e396a0-9271-11ea-8a36-ebb87efcf8c0.jpg);
		background-size: cover;
		.item-title {
			text-align: center;
			font-size: 10vw;
			padding-top: 5vw;
			line-height: 10vw;
			color: #ffffff;
			text-shadow: 1vw 1vw 1vw #000000;
		}
		.item-infos {
			width: 70vw;
			color: #ffffff;
			height: 40vw;
			font-size: 4vw;
			box-sizing: border-box;
			padding-left: 7vw;
			.view-context {
				width: 63vw;
				display: inline-block;
				vertical-align: middle;
				view {
					display: inline-block;
					width: 63vw;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					vertical-align: middle;
					line-height: 5vw;
					height: 5vw;
					text-shadow: 1px 1px 0vw #182432;
				}
			}

			.view-demo {
				height: 40vw;
				width: 0;
				display: inline-block;
				vertical-align: middle;
			}
		}
		.item-price {
			position: absolute;
			right: 4vw;
			bottom: 4vw;
			color: #ffffff;
			font-size: 8vw;
			height: 8vw;
			font-weight: 500;
			display: table-cell;
			vertical-align: bottom;
			text-shadow: 1vw 0 1vw #000000;
			&:first-letter {
				font-size: 5vw;
			}
		}
	}
	.item-context:active {
		top: 0.5vw;
		left: 0.5vw;
		background-color: #1a2838;
		box-shadow: 0 0.4vw 0.8vw 0 rgba(50, 50, 50, 0.2), 0 0.6vw 2vw 0 rgba(50, 50, 50, 0.2), 0 0 2vw 1vw #1a2838 inset;
	}
}
</style>
