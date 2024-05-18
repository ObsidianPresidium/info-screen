let modal = {
    el: {
        confirmPoweroff: document.querySelector(".modal__confirm-poweroff"),
        rebootRequired: document.querySelector(".modal__reboot-required")
    },

    settings: {
        modalAnimationTime: Number(getComputedStyle(document.querySelector(".modal")).getPropertyValue("--modal-animation-time").replace("ms", ""))
    }
}

modal = Object.assign(modal, {
    show: function(el) {
        const contentNode = el.children[0];
        el.classList.remove("modal--hidden");
        el.classList.add("modal--in");
        contentNode.classList.add("modal__content--in");

        setTimeout(function() {
            el.classList.remove("modal--in");
            contentNode.classList.remove("modal__content--in");
        }, modal.settings.modalAnimationTime);
    },

    hide: function(el) {
        const contentNode = el.children[0];
        el.classList.add("modal--out");
        contentNode.classList.add("modal__content--out");

        setTimeout(function() {
            el.classList.remove("modal--out");
            contentNode.classList.remove("modal__content--out");
            el.classList.add("modal--hidden");
        }, modal.settings.modalAnimationTime);
    }
})