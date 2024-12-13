export class Check {
    constructor(parent, client) {
        this.parent = parent;
        this.client = client;
        this.states = [];
        this.loadInitialState();
    }

    async loadInitialState() {
        try {
            const items = await fetch('http://localhost:3000/api/items').then(r => r.json());
            for (const item of items) {
                const input = this.parent.querySelector(`input[name="${item.name}"]`);
                if (input) {
                    this.states.push({ name: item.name, state: item.state });
                    input.checked = item.state;
                    this.updateLabel(item.name, item.state);
                }
            }
        } catch (error) {
            console.error('Error cargando estados:', error);
        }
    }

    updateLabel(name, value) {
        const label = this.parent.querySelector(`label:has(input[name="${name}"])`);
        const span = label?.querySelector('span');
        if (span) span.textContent = value ? 'ON' : 'OFF';
    }

    changeValue(name, value) {
        const item = this.states.find(item => item.name === name);
        item.state = value;
        this.client.send(item);
        this.updateLabel(name, value);
    }

    addCheck(name) {
        this.states.push({ name, state: false });

        const check = document.createElement("label");
        check.className = "form-switch";
        
        const input = document.createElement("input");
        input.type = 'checkbox';
        input.name = name;
        
        const icon = document.createElement("i");
        const span = document.createElement('span');
        span.textContent = 'OFF';

        check.append(input, icon, span);
        this.parent.appendChild(check);

        input.onchange = (e) => this.changeValue(name, e.target.checked);
    }
}