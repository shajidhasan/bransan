import Home from './routes/Home.svelte';
import Progress from './routes/Progress.svelte';
import HighImperial from './routes/HighImperial.svelte';
import Debug from './routes/Debug.svelte';

const routes = {
    '/': Home,
    '/progress': Progress,
    '/high-imperial': HighImperial,
    '/progress/:title': Progress,
    '/progress/*': Progress,
    '/debug': Debug,
}

export default routes;
