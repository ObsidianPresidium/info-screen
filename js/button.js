let button = {
    getType: function(el) {
        const exceptList = [
            "--icon",
            "--pressed"
        ];

        const classes = el.classList;
        let index = -1;
        let typeFound = false;
        while (!typeFound) {
            index ++;
            let modifierIndex;
            try {
                modifierIndex = classes[index].lastIndexOf("--");  // needs to be lastIndexOf so we cover modifier's modifier
            } catch {
                index = -1;
                typeFound = true;  // doesnt mean anything, just exit, also avoid checking class against exceptList again.
            }
            if (modifierIndex != -1 && !typeFound) {
                if (!exceptList.includes(classes[index].slice(modifierIndex))) {
                    typeFound = true;
                }
            }
        }
        return (index === -1) ? null : classes[index];  // return null if button has no color modifier class / "type"
    }
}