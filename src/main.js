import App from './App.svelte';
import AppProt from './AppProt.svelte';
const app = new App({
	target: document.getElementById('demographics')
});


const appProt = new AppProt({
	target: document.getElementById('protests')
});

export default { app, appProt };
