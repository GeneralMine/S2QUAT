<script>
	// TODO: store person's details
	// import { mapStringToLocalStorage } from "../utils/localStorageMapper";
	export let testperson;
	/**
	 * 0 => survey not send
	 * 1 => survey send
	 */
	export let isSend;

	function check() {
		testperson.signature = !testperson.signature;
	}
</script>

<div class="sendPageContainer">
	{#if isSend}
		<h3>Geschafft! Abgesendet :)</h3>
		<p>Du kannst dir dein Ergebnis hier anschauen:</p>
	{:else}
		<h3>Fast geschafft!</h3>
		<p>Um die Evaluation abzuschließen müssen deine Daten noch abgesendet werden.</p>
		<p>
			Du kannst Angaben zu deiner Person machen, um bei der Analyse und Verbesserung des Smart
			Services vollends mitzuwirken
		</p>
		<div class="testPersonForm">
			<div class="testPersonFormName">
				<input type="text" bind:value={testperson.name} placeholder="Max Mustermann" label="Name" />
			</div>
			<div class="testPersonFormRow">
				<div class="testPersonFormAge">
					<input type="text" bind:value={testperson.age} placeholder="23" label="Alter" />
				</div>
				<div class="testPersonFormGender">
					<select bind:value={testperson.gender}>
						<option>MALE</option>
						<option>FEMALE</option>
						<option>NON_BINARY</option>
					</select>
				</div>
			</div>
			<div class="testPersonFormPrivacy">
				<div class="testPersonFormSignature">
					<input type="checkbox" on:change={check} />
				</div>
				<p class="privacyNotice">
					Mit einem Klick auf die Checkbox und auf Senden werden deine Informationen entsprechend
					unserer <a href="/privacy"> Datenschutzvereinbarung </a> verarbeitet und gespeichert. Du kannst
					der Speicherung jederzeit widersprechen.
				</p>
			</div>
		</div>
	{/if}
</div>

<style>
	.sendPageContainer {
		padding: 2em;
	}
	.testPersonForm {
		display: flex;
		flex-direction: column;
		align-content: center;
	}
	.testPersonFormName {
		width: 33%;
	}
	.testPersonFormRow {
		width: 33%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.testPersonFormAge {
		height: 100%;
		width: 40%;
	}
	.testPersonFormGender {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 40%;
	}
	.testPersonFormPrivacy {
		width: 83%;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.testPersonFormSignature {
		height: 100%;
	}
	.privacyNotice {
		height: 100%;
		font-size: 0.7em;
		padding-left: 1rem;
	}
</style>
