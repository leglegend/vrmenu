<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
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
				width: 40vw;
				color: #888888;
				word-break: break-all;
			}
		}
	}
}
</style>
