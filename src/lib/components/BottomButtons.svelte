<script>
    import { messaging } from "../firebase";

    let notificationState = null;
    if (messaging !== null) {
        notificationState = Notification.permission;
    }

    const toggleNotifications = async () => {
        if (notificationState === null) return;
        if (notificationState === "denied") return;
        await messaging
            .getToken({
                vapidKey:
                    "BMHHhXb5GBbGncoNwWtkcRw_EPe2wQh9zB1SL13AEH7zVKlyd2xIqtUwN1RfU_g7yQBXEwdmArexFGG01Swhepc",
            })
            .then((token) => {
                console.log(token);
                fetch("https://bransan.vercel.app/api/subscribe", {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ token: token }),
                })
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                notificationState = Notification.permission;
            })
            .catch((error) => {
                console.log(error);
                notificationState = Notification.permission;
            });
    };
</script>

<div class="button-container">
    {#if messaging === null}
        <button class="button fixed"> Notifications unsupported </button>
    {:else}
        <button
            class="button"
            class:fixed={notificationState !== "default"}
            on:click={toggleNotifications}
        >
            {notificationState === "default"
                ? "Enable notifications"
                : notificationState === "granted"
                ? "Notifications enabled"
                : "Notifications blocked"}
        </button>
    {/if}

    <div class="dot" />
    <a
        class="button"
        href="https://github.com/shajidhasan/bransan"
        rel="noopener"
        target="_blank">GitHub</a
    >
</div>

<style lang="scss">
    .button-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 0.3rem;
    }
    .dot {
        height: 5px;
        width: 5px;
        background-color: rgba($fg-color, 0.5);
        border-radius: 50%;
    }
    .button {
        text-decoration: none;
        border: none;
        font-size: 0.8rem;
        cursor: pointer;
        color: lighten($primary-color, 15%);
        background-color: transparent;
        font-family: "Krub", sans-serif;
    }
    .fixed {
        color: rgba($fg-color, 0.5);
    }
</style>
