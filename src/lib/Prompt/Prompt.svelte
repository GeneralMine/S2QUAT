<script>
	import { createEventDispatcher, onDestroy } from 'svelte';

	export let open = false;

	let self;
	const dispatch = createEventDispatcher();

	function close_modal() {
		open = false;
		dispatch('close');
	}

	function handle_keydown(e) {
		if (!open) return;

		if (e.key === 'Escape') {
			close();
			return;
		}

		if (e.key === 'Tab') {
			// trap focus
			const nodes = self.querySelectorAll('*');
			const tabbable = Array.from(nodes).filter((n) => n.tabIndex >= 0);

			let index = tabbable.indexOf(document.activeElement);
			if (index === -1 && e.shiftKey) index = 0;

			index += tabbable.length + (e.shiftKey ? -1 : 1);
			index %= tabbable.length;

			tabbable[index].focus();
			e.preventDefault();
		}
	}

	const previously_focused = typeof document !== 'undefined' && document.activeElement;

	if (previously_focused) {
		onDestroy(() => {
			previously_focused.focus();
		});
	}
</script>

<svelte:window on:keydown={handle_keydown} />

{#if open}
	<div class="modal-background" on:click={close_modal} />

	<div class="modal" role="dialog" aria-modal="true" bind:this={self}>
		<slot name="header" />
		<hr />
		<slot />
		<hr />
		<slot name="footer" />
	</div>
{/if}

<style>
	.modal-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.3);
		z-index: 998;
	}

	.modal {
		position: absolute;
		left: 50%;
		top: 50%;
		width: calc(100vw - 4em);
		max-width: 32em;
		max-height: calc(100vh - 4em);
		overflow: auto;
		transform: translate(-50%, -50%);
		padding: 1em;
		border-radius: 0.2em;
		background: white;
		z-index: 999;
	}
</style>
