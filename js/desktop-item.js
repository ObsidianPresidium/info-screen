let desktopItem = {
    settings: {
        toggleAnimationTime: Number(getComputedStyle(document.querySelector(".desktop-item")).getPropertyValue("--toggle-animation-time").replace("ms", ""))
    },
    desktopItems: []
}

desktopItem = Object.assign(desktopItem, {
    desktopItem: class {
        constructor(el, managers=[], defaultState=false) {
            this.el = document.querySelector(el);
            this.on = defaultState;
            this.hideInterval = -1;

            if (managers.length > 0) {
                this.managers = [];
                for (let i=0; i<managers.length; i++) {
                    this.managers.push(document.querySelector(managers[i]));
                }
            } else {
                this.managers = null;
            }
            this.toggleManagers();
            desktopItem.desktopItems.push(this);
        }

        toggleManagers() {
            if (this.on) {
                if (this.managers != null) {
                    for (let i=0; i<this.managers.length; i++) {
                        this.managers[i].classList.add(button.getType(this.managers[i]) + "--pressed");
                    }
                }
            } else {
                if (this.managers != null) {
                    for (let i=0; i<this.managers.length; i++) {
                        this.managers[i].classList.remove(button.getType(this.managers[i]) + "--pressed");
                    }
                }
            }
        }

        toggle() {
            this.on = !this.on;
            this.toggleManagers();
            if (this.on) {
                clearTimeout(this.hideInterval);
                this.el.classList.remove("desktop-item--off");
                this.el.classList.remove("desktop-item--hidden");
                this.el.classList.add("desktop-item--on");
            } else {
                this.el.classList.remove("desktop-item--on");
                this.el.classList.add("desktop-item--off");
                this.hideInterval = setTimeout(function() {
                    this.el.classList.add("desktop-item--hidden");
                }.bind(this), desktopItem.settings.toggleAnimationTime);
            }
        }
    }
});

const weatherDesktopItem = new desktopItem.desktopItem(".weather", ["#button__weather"], true);
const countdownDesktopItem = new desktopItem.desktopItem(".countdown", ["#button__countdown"]);
const spotifyDesktopItem = new desktopItem.desktopItem(".spotify", ["#button__spotify"]);