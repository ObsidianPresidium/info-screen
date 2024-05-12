let panel = {
    settings: {
        toggleAnimationTime: Number(getComputedStyle(document.querySelector(".panel")).getPropertyValue("--toggle-animation-time").replace("ms", ""))
    },

    panels: {
        main: {
            on: true,
            el: document.querySelector(".panel"),
            items: document.querySelectorAll(".panel > * > *")
        },
        settings: {
            on: false,
            el: document.querySelector(".panel__settings")
        }
    }
};

panel = Object.assign(panel, {
    toggle: function(panelToToggle, callingElement) {
        callingElement = document.querySelector(callingElement);
        panelToToggle.on = !panelToToggle.on;
        if (panelToToggle.on) {
            clearTimeout(panelToToggle.hideInterval);
            panelToToggle.el.classList.remove("panel__secondary--off");
            panelToToggle.el.classList.remove("panel--hidden");
            panelToToggle.el.classList.add("panel__secondary--on");
            if (callingElement != null) callingElement.classList.add(button.getType(callingElement) + "--pressed");
        } else {
            panelToToggle.el.classList.remove("panel__secondary--on");
            panelToToggle.el.classList.add("panel__secondary--off");
            panelToToggle.hideInterval = setTimeout(function() {
                panelToToggle.el.classList.add("panel--hidden");
            }, panel.settings.toggleAnimationTime);
            if (callingElement != null) callingElement.classList.remove(button.getType(callingElement) + "--pressed");
        }
        
    }
});