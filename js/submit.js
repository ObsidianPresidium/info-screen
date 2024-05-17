const submit = {
    el: {
        action: document.querySelector("#form__action"),
        form: document.querySelector("#form")
    },

    setAction: function(actionToSet) {
        submit.el.action.value = actionToSet;
    },

    post: function() {
        submit.el.form.submit();
    },

    gitPull: function() {
        submit.setAction("git-pull");
        submit.post();
    },

    reboot: function() {
        submit.setAction("reboot");
        submit.post();
    }
}