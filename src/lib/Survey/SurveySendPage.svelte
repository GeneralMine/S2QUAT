<script>
	export let testperson;
	export let place;
	export let feedback;

	function check() {
		testperson.signature = !testperson.signature;
	}
</script>

<div class="sendPageContainer">
	<h3>Fast geschafft!</h3>
	<p>Um die Evaluation abzuschließen müssen deine Daten noch abgesendet werden.</p>
	<p>
		Du kannst Angaben zu deiner Person machen, um bei der Analyse und Verbesserung des Smart
		Services vollends mitzuwirken
	</p>
	<div class="testPersonForm">
		<div class="testPersonFormName">
			<label>
				Name:
				<input type="text" bind:value={testperson.name} placeholder="Max Mustermann" label="Name" />
			</label>
		</div>
		<div class="testPersonFormRow">
			<div class="testPersonFormAge">
				<label>
					Alter:
					<input type="number" bind:value={testperson.age} placeholder="23" label="Alter" />
				</label>
			</div>
			<div class="testPersonFormGender">
				<label>
					Geschlecht:
					<select bind:value={testperson.gender}>
						<option>MALE</option>
						<option>FEMALE</option>
						<option>NON_BINARY</option>
					</select>
				</label>
			</div>
		</div>
		<div class="testPersonFormName">
			<label>
				Ort oder Situation:
				<textarea
					cols="2"
					type="text"
					bind:value={place}
					placeholder="Wo oder in welcher Situation befinden sie sich aktuell?"
				/>
			</label>
		</div>
		<div class="testPersonFormName">
			<label>
				Feedback zum Fragebogen:
				<textarea
					cols="2"
					type="text"
					bind:value={feedback}
					placeholder="Haben Sie noch zusätzliches Feedback?"
				/>
			</label>
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
