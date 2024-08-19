<script lang="ts">
	let username = '';
	let password = '';

	interface Resp {
		message: string;
	}

	let resp: Resp = {
		message: ''
	};

	function syntaxHighlight(json: any) {
		if (typeof json != 'string') {
			json = JSON.stringify(json, undefined, 2);
		}
		json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
		return json.replace(
			/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
			function (match: any) {
				var cls = 'number';
				if (/^"/.test(match)) {
					if (/:$/.test(match)) {
						cls = 'key';
					} else {
						cls = 'string';
					}
				} else if (/true|false/.test(match)) {
					cls = 'boolean';
				} else if (/null/.test(match)) {
					cls = 'null';
				}
				return '<span class="' + cls + '">' + match + '</span>';
			}
		);
	}
</script>

<h1>EduGate Tester</h1>
<p>
	this web app will call the university server, and show you the login response we get. good luck :D
</p>

<div>
	<div>
		<label for="username">Username:</label>
		<input type="text" id="username" bind:value={username} />
	</div>

	<div>
		<label for="password">Password:</label>
		<input type="password" id="password" bind:value={password} />
	</div>

	<div>
		<button
			type="button"
			on:click={async () => {
				const response = await fetch('/login', {
					method: 'POST',
					body: JSON.stringify({ username, password }),
					headers: {
						'Content-Type': 'application/json'
					}
				});

				const res = await response.json();
				console.log(res);

				resp = res;
			}}>give me login response</button
		>
	</div>

	<hr />

	<h3>here is your response:</h3>
	<pre>{@html syntaxHighlight(JSON.stringify(resp.message, null, 2))}</pre>
</div>

<style>
	pre {
		outline: 1px solid #ccc;
		padding: 5px;
		margin: 5px;
	}
	:global(.string) {
		color: green;
	}
	:global(.number) {
		color: darkorange;
	}
	:global(.boolean) {
		color: blue;
	}
	:global(.null) {
		color: magenta;
	}
	:global(.key) {
		color: red;
	}
</style>
