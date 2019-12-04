/**
 *
 */
class Motor {
  constructor(timeStep, update, render) {
    this.inicioJuego = new Date();
    this.finJuego = new Date();
    this.fin = 1000 * 60 * 1;
    this.accumulatedTime = 0;
    this.animationFrameRequest = undefined;
    this.time = undefined;
    this.timeStep = timeStep;

    this.updated = false;

    this.update = update;
    this.render = render;

    this.run = function(timeStamp) {
      if (
        partidaModulo.getSalaViva() &&
        this.finJuego.getTime() - this.inicioJuego.getTime() < this.fin
      ) {
        this.finJuego = new Date();
        this.accumulatedTime += timeStamp - this.time;
        this.time = timeStamp;

        //-----------not ideal, find better solutions for slower cpus--------
        if (this.accumulatedTime >= this.timeStep * 3)
          this.accumulatedTime = this.timeStep;

        while (this.accumulatedTime >= this.timeStep) {
          this.accumulatedTime -= this.timeStep;
          this.update(timeStamp);
          this.updated = true;
        }

        if (this.updated) {
          this.updated = false;
          this.render(timeStamp);
        }

        this.animationFrameRequest = window.requestAnimationFrame(
          this.handleRun
        );
      } else {
          main.terminarJuego();
      }
    };

    this.handleRun = timeStep => {
      this.run(timeStep);
    };
  }

  start() {
    this.accumulatedTime = this.timeStep;
    this.time = window.performance.now();
    this.animationFrameRequest = window.requestAnimationFrame(this.handleRun);
  }


  stop() {
    window.cancelAnimationFrame(this.animationFrameRequest);
  }
}
