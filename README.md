# Brandon Sanderson Progress Tracker

My favorite writer Brandon Sanderson has some progress bars on his website so that his fans can keep a tab on what he's working on. Unfortunately, the progress bars don't show up on mobile devices so I created a website where you can take a quick look at them. Link: https://bransan.vercel.app

I've written the front end with Svelte. There's a cron job(GitHub Actions) that calls a [Vercel](https://vercel.com) serverless function to update the progress data in every 60 minutes. The data is then stored in Firestore.

Contributions are very very welcome. You can help with a domain name also.


Contact: <shajid6063@gmail.com>
