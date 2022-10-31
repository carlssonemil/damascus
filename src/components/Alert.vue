<template>
	<div :class="['alert', type]">
		<eva-icon :name="icon || typeIcon" fill="white"></eva-icon>
		<div class="content">
			<slot />
		</div>
	</div>
</template>

<script>
export default {
	props: {
		type: {
			type: String,
			required: false,
			default: 'info',
		},

		icon: {
			type: String,
			required: false,
		},
	},

	computed: {
		typeIcon() {
			switch (this.type) {
				case 'info':
					return 'info-outline'
				case 'success':
					return 'checkmark-circle-2-outline'
				case 'warning':
					return 'alert-circle-outline'
				case 'error':
					return 'alert-triangle-outline'
				default:
					return null
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.alert {
	align-items: flex-start;
	background: $elevation-2-color;
	border: 2px solid $elevation-4-color;
	border-radius: $border-radius;
	display: flex;
	padding: 15px;
	text-align: left;

	&.info {
		background: rgba($blue, 0.15);
		border-color: rgba($blue, 0.3);

		i ::v-deep svg {
			fill: $blue;
		}
	}

	i {
		margin-right: 10px;
	}

	.content {
		line-height: 1.6;
	}
}
</style>
