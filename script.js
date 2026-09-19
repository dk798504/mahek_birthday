(function () {
        var reduceMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;

        /* ---------- stars ---------- */
        function paintStars(el, count) {
          if (!el) return;
          var html = "";
          for (var i = 0; i < count; i++) {
            var top = Math.random() * 100,
              left = Math.random() * 100,
              delay = (Math.random() * 3.4).toFixed(2),
              size = (Math.random() * 1.6 + 1).toFixed(1);
            html +=
              '<span class="star" style="top:' +
              top +
              "%;left:" +
              left +
              "%;animation-delay:" +
              delay +
              "s;width:" +
              size +
              "px;height:" +
              size +
              'px;"></span>';
          }
          el.innerHTML = html;
        }
        paintStars(document.getElementById("heroStars"), 70);
        paintStars(document.getElementById("moonStars"), 40);
        paintStars(document.getElementById("cakeStars"), 40);

        /* ---------- drifting hearts / petals ---------- */
        var driftField = document.getElementById("driftField");
        var driftSymbols = ["❤", "🌹", "✿"];
        var driftColors = ["#C4436B", "#E3B23C", "#F3C6D3"];
        function spawnDrift() {
          if (reduceMotion) return;
          var el = document.createElement("span");
          var sym =
            driftSymbols[Math.floor(Math.random() * driftSymbols.length)];
          var left = Math.random() * 100;
          var size = (Math.random() * 14 + 12).toFixed(0);
          var dur = (Math.random() * 7 + 9).toFixed(1);
          var dx = (Math.random() * 140 - 70).toFixed(0) + "px";
          var rot = (Math.random() * 260 + 120).toFixed(0) + "deg";
          var color =
            driftColors[Math.floor(Math.random() * driftColors.length)];
          el.className = "drift";
          el.textContent = sym;
          el.style.left = left + "%";
          el.style.fontSize = size + "px";
          el.style.color = color;
          el.style.opacity = (Math.random() * 0.4 + 0.4).toFixed(2);
          el.style.setProperty("--dx", dx);
          el.style.setProperty("--rot", rot);
          el.style.animationDuration = dur + "s";
          driftField.appendChild(el);
          setTimeout(
            function () {
              el.remove();
            },
            dur * 1000 + 400,
          );
        }
        if (!reduceMotion) {
          for (var i = 0; i < 5; i++) {
            setTimeout(spawnDrift, i * 900);
          }
          setInterval(spawnDrift, 1400);
        }

        /* ---------- hero intro sequencing ---------- */
        var heroLines = document.querySelectorAll("#heroLines p");
        var heroName = document.getElementById("heroName");
        var openBtn = document.getElementById("openBtn");
        var scrollCue = document.getElementById("scrollCue");
        heroLines.forEach(function (p, i) {
          setTimeout(
            function () {
              p.classList.add("show");
            },
            500 + i * 750,
          );
        });
        setTimeout(
          function () {
            heroName.classList.add("show");
          },
          500 + heroLines.length * 750 + 300,
        );
        setTimeout(
          function () {
            openBtn.classList.add("show");
            scrollCue.classList.add("show");
          },
          500 + heroLines.length * 750 + 900,
        );

        var story = document.getElementById("story");
        openBtn.addEventListener("click", function () {
          story.style.display = "block";
          scrollCue.classList.remove("show");
          setTimeout(function () {
            story.scrollIntoView({
              behavior: reduceMotion ? "auto" : "smooth",
              block: "start",
            });
          }, 60);
        });

        /* ---------- generic reveal on scroll ---------- */
        var io = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                entry.target.classList.add("show");
                io.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.35 },
        );

        function stagger(nodeList, base) {
          nodeList.forEach(function (node, i) {
            node.style.transitionDelay = i * (base || 140) + "ms";
            io.observe(node);
          });
        }

        document
          .querySelectorAll(
            ".reveal-group .msg-hi, .reveal-group .hi, .reveal-group p",
          )
          .forEach(function (el) {
            el.classList.add("lines");
          });
        // message lines
        document.querySelectorAll(".msg-body p").forEach(function (el) {
          el.classList.add("lines-item");
        });

        // shayari text reveal as whole block via wrap fade (reuse .lines style on the block)
        document.querySelectorAll(".shayari-block").forEach(function (block) {
          var els = block.querySelectorAll(
            ".shayari-num, .shayari-text, .shayari-tag",
          );
          els.forEach(function (el, i) {
            el.classList.add("lines");
            el.style.transitionDelay = i * 260 + "ms";
            io.observe(el);
          });
        });

        stagger(document.querySelectorAll(".special-item"), 160);
        stagger(document.querySelectorAll(".tag"), 90);
        document.querySelectorAll(".tags-final").forEach(function (el) {
          el.classList.add("lines");
          io.observe(el);
        });

        var moonEl = document.getElementById("moonEl");
        io.observe(moonEl);
        stagger(document.querySelectorAll("#poemBlock .stanza"), 500);

        stagger(document.querySelectorAll(".polaroid"), 160);

        stagger(document.querySelectorAll(".qa"), 260);

        stagger(document.querySelectorAll(".wish-list li"), 130);

        // msg-hi / msg-body lines fade
        document
          .querySelectorAll(".msg-hi, .msg-body p")
          .forEach(function (el, i) {
            el.classList.add("lines");
            el.style.transitionDelay = i * 220 + "ms";
            io.observe(el);
          });

        document
          .querySelectorAll(".final-shayari, .final-shayari-tag")
          .forEach(function (el, i) {
            el.classList.add("lines");
            el.style.transitionDelay = i * 300 + "ms";
            io.observe(el);
          });

        /* ---------- gallery video ---------- */
        var vid = document.getElementById("memVideo");
        var videoTile = document.getElementById("videoTile");
        videoTile.addEventListener("click", function () {
          if (vid.paused) {
            vid.muted = false;
            vid.play();
            videoTile.classList.add("playing");
          } else {
            vid.pause();
            videoTile.classList.remove("playing");
          }
        });

        /* ---------- cake ---------- */
        var cakeSvg = document.getElementById("cakeSvg");
        var flameGroup = document.getElementById("flameGroup");
        var cakeMsg = document.getElementById("cakeMsg");
        var cakeResult = document.getElementById("cakeResult");
        var blown = false;
        var confettiField = document.getElementById("confettiField");
        var confettiColors = [
          "#C4436B",
          "#E3B23C",
          "#F3C6D3",
          "#FBF1E7",
          "#8E2C50",
        ];

        function burstConfetti() {
          var n = reduceMotion ? 0 : 60;
          for (var i = 0; i < n; i++) {
            (function (i) {
              setTimeout(function () {
                var el = document.createElement("span");
                var left = Math.random() * 100;
                var w = (Math.random() * 6 + 6).toFixed(0);
                var h = (w * 1.6).toFixed(0);
                var dur = (Math.random() * 1.8 + 2.2).toFixed(1);
                var dx = (Math.random() * 160 - 80).toFixed(0) + "px";
                var rot = (Math.random() * 500 + 200).toFixed(0) + "deg";
                var color =
                  confettiColors[
                    Math.floor(Math.random() * confettiColors.length)
                  ];
                el.className = "confetto";
                el.style.left = left + "%";
                el.style.width = w + "px";
                el.style.height = h + "px";
                el.style.background = color;
                el.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
                el.style.setProperty("--dx", dx);
                el.style.setProperty("--rot", rot);
                el.style.animationDuration = dur + "s";
                confettiField.appendChild(el);
                setTimeout(
                  function () {
                    el.remove();
                  },
                  dur * 1000 + 300,
                );
              }, i * 22);
            })(i);
          }
        }

        function blowCandle() {
          if (blown) return;
          blown = true;
          flameGroup.classList.add("out");
          cakeMsg.style.opacity = "0";
          burstConfetti();
          setTimeout(function () {
            cakeResult.classList.add("show");
            var extra = setInterval(function () {
              if (!blown) {
                clearInterval(extra);
                return;
              }
            }, 1000);
          }, 350);
          for (var i = 0; i < 4; i++) {
            setTimeout(spawnDrift, i * 300);
          }
        }
        cakeSvg.addEventListener("click", blowCandle);
        cakeSvg.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            blowCandle();
          }
        });
      })();
