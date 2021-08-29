(function() {
    const addInterval = 36;
    const active = [];
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    function Emoji(type) {
        this.x = Math.floor(Math.random() * window.innerWidth) - 30;
        this.y = 0;
        this.emoji = type;
        this.acceleration = 0.5;
        this.currentTick = 0;
        this.height = 0;

        this.fall = function() {
            const velocity = this.acceleration * this.currentTick;
            this.y = velocity * velocity;
            ctx.fillText(this.emoji, this.x, this.y);
            this.currentTick++;
            return this.y <= canvas.height;
        }

    }

    function run() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.font = '80px Arial';
        ctx.fillStyle = 'white';
        active = active.filter(e => e.fall());
    }

    function bg() {
        canvas.style.backgroundColor = 'rgb('+[
            Math.floor(Math.random()*256),
            Math.floor(Math.random()*256),
            Math.floor(Math.random()*256)
        ].join(',')+')';
    }

    function add() {
        active.push(new Emoji(ALL_EMOJIS[Math.floor(Math.random() * ALL_EMOJIS.length)]));
        setTimeout(add, addInterval);
    }
    
    add();
    setInterval(run, 18);
    bg();
})();
