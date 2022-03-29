export const Pages = new Object();

export class App {
	constructor(obj) {
		const { name, data, methods, init, loaded } = obj;
		this.appName = name;
		for (let key in data) {
			this.data[key] = data[key];
		}
		for (let key in methods) {
			if (typeof methods[key] === 'function') {
				this.methods[key] = methods[key].bind(this);
			}
		}
        if (typeof init === 'function') { this.init = init.bind(this); }
        if (typeof loaded === 'function') { this.loaded = loaded.bind(this); }
	}
	data = {};
	methods = {
		echo: (msg) => { console.log(msg, this); }
	};
    create = () => {
		console.log(`Page: ${this.appName.charAt(0).toUpperCase() + this.appName.slice(1)} 已建立`);
        if (typeof this.init === 'function') this.init();
    }
	init = null;
	loaded = null;
}
