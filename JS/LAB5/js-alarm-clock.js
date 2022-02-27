var ac = {
  chr : null, cmin : null, csec : null,

  thr : null, thm : null, ths : null,
  tset : null, treset : null,

  alarm : null, sound : null,

  init : () => {
    ac.chr = document.getElementById("chr");
    ac.cmin = document.getElementById("cmin");
    ac.csec = document.getElementById("csec");

    ac.thr = ac.createSel(23);
    ac.thm = ac.createSel(59);
    ac.ths = ac.createSel(59);
    document.getElementById("tpick-h").appendChild(ac.thr);
    document.getElementById("tpick-m").appendChild(ac.thm);
    document.getElementById("tpick-s").appendChild(ac.ths);

    ac.tset = document.getElementById("tset");
    ac.treset = document.getElementById("treset");
    ac.tset.onclick = ac.set;
    ac.treset.onclick = ac.reset;

    ac.sound = new Audio("wake-up-sound.mp3");

    ac.alarm = null;
    setInterval(ac.tick, 1000);
  },

  createSel : (max) => {
    let selector = document.createElement("select"), opt;
    for (let i=0; i<=max; i++) {
      opt = document.createElement("option");
      i = ac.padzero(i);
      opt.value = i;
      opt.innerHTML = i;
      selector.appendChild(opt);
    }
    return selector;
  },

  padzero : (num) => {
    if (num < 10) { num = "0" + num; }
    else { num = num.toString(); }
    return num;
  },

  tick : () => {
    let now = new Date(),
        hr = ac.padzero(now.getHours()),
        min = ac.padzero(now.getMinutes()),
        sec = ac.padzero(now.getSeconds());

        
    ac.chr.innerHTML = hr;
    ac.cmin.innerHTML = min;
    ac.csec.innerHTML = sec;

    if (ac.alarm != null) {
      now = hr + min + sec;
      if (now == ac.alarm && ac.sound.paused) { ac.sound.play(); alert("Alarm Time! Wake up!")}
    }
  },

  set : () => {
    ac.alarm = ac.thr.value + ac.thm.value + ac.ths.value;
    ac.thr.disabled = true;
    ac.thm.disabled = true;
    ac.ths.disabled = true;
    ac.tset.disabled = true;
    ac.treset.disabled = false;
  },

  reset : () => {
    if (!ac.sound.paused) { ac.sound.pause(); }
    ac.alarm = null;
    ac.thr.disabled = false;
    ac.thm.disabled = false;
    ac.ths.disabled = false;
    ac.tset.disabled = false;
    ac.treset.disabled = true;
  }
};

window.addEventListener("load", ac.init);
