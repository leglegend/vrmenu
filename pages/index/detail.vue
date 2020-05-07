<template>
	<view class="detail-page">
		<swiper class="index-swiper" indicator-dots="true" autoplay="true">
			<swiper-item class="swiper-item"><video src="https://media.st.dl.pinyuncloud.com/steam/apps/256675893/movie480.webm?_=1" /></swiper-item>
			<swiper-item class="swiper-item">
				<image src="https://media.st.dl.pinyuncloud.com/steam/apps/342180/ss_e7aa3e0181f151230597b9628873460041f76494.600x338.jpg?t=1588767301"></image>
			</swiper-item>
			<swiper-item class="swiper-item">
				<image src="https://media.st.dl.pinyuncloud.com/steam/apps/342180/ss_9bb22b961071237e54817c6bab29cc82cfb321de.600x338.jpg?t=1588767301"></image>
			</swiper-item>
			<swiper-item class="swiper-item">
				<image src="https://media.st.dl.pinyuncloud.com/steam/apps/342180/ss_6148caed4c7463a0db38017a78f151dd416c8389.600x338.jpg?t=1588767301"></image>
			</swiper-item>
		</swiper>
		<view class="game-name">亚利桑那阳光</view>
		<view class="game-context">
			<view class="context-line">游戏简介</view>
			<view class="context-ctx">
				<text>虚拟现实遇上僵尸横行的末日世界！亚利桑那阳光（Arizona Sunshine）是专为虚拟现实（VR）打造的第一人称射击类游戏，可带你沉浸于末日之后美国西南部地区僵尸横行的世界。
当你听到收音机中传来人声时，你的心中将涌起无限希望——在末日之后骄阳似火的大峡谷州，还有其他幸存者！你必须凭着仅有的几件动作控制类武器以及沿途搜寻到的稀缺武器和补给，突破一波又一波为吃你脑子而来的僵尸群的重重围困，找寻其他幸存者。
亚利桑那阳光（Arizona Sunshine）是一款专为虚拟现实（VR）打造的游戏，将让你置身于僵尸横行的末日世界。在VR中，你可以通过现实中的动作操控武器，自由探索末日之后的世界，接受生存技能考验——击杀不死僵尸的刺激程度前所未有！
通过现实动作操控武器：使用VR动作控制器可以通过现实动作操控超过25种武器。玩家能够预计攻击、管理武器以及用准镜瞄准，将不死敌人炸成碎片。
情节完整的战役：战役内置于多个小的VR块中，这些VR块连在一起将构成一段完整的故事。在战役中，你可以跳到某个短小的战斗情景，也可以按顺序完成所有战斗。
自由探索：移动不受任何约束，可以探索美国西南部一系列宏大的场景，包括危机四伏的峡谷和深不见底的黑暗矿场。
身临其境的僵尸生存大战：在你死我活的生存战斗中，搜寻有用的东西，从不死敌人手中夺取物资并管理武器和补给——VR技术带来前所未有的真实感。
多人联合作战：在联合作战模式下与朋友并肩作战，或在僵尸暴动多人模式下与最多四名玩家协同战斗。但请注意，玩家越多，饥肠辘辘的不死敌人数目也会越多。
前所未有的VR真实感：亚利桑那阳光（Arizona Sunshine）依靠Intel® Core™ i7处理器或同等处理器的强大功能，带给VR游戏前所未有的真实感，营造出僵尸骨肉横飞、物品应声而碎的逼真效果，为玩家带去整体影院式沉浸体验。
专为VR打造：亚利桑那阳光（Arizona Sunshine）是一款专为VR打造的射击类游戏。步入僵尸横行的末日世界，如同真的身处其中，迎击不死敌人，体验前所未有的刺激感觉。</text>
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
.detail-page {
	width: 100vw;
	height: 100vh;
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
