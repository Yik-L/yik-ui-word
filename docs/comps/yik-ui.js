import {
  useSlots as R,
  reactive as V,
  toRefs as W,
  onMounted as _,
  openBlock as g,
  createElementBlock as m,
  Fragment as j,
  renderList as U,
  unref as y,
  createBlock as C,
  resolveDynamicComponent as N,
  createElementVNode as x,
  normalizeClass as Y,
  normalizeStyle as A,
  renderSlot as p,
  watch as z,
  ref as b,
  watchEffect as q,
  nextTick as $,
  onUnmounted as T,
  getCurrentInstance as F,
  onBeforeUnmount as E,
  shallowRef as L,
  createCommentVNode as K,
  useCssVars as J,
  withDirectives as B,
  createTextVNode as G,
  vShow as I,
} from "vue";
const H = (o, t) => {
    let e = "";
    t == "error" ? (e = "#ff362b") : (e = "#1c8eff"),
      console.log(
        "%c" + o,
        `padding:4px 15px;background-color: ${e};color:#fff;border-radius: 10px;`
      );
  },
  Dt = () => {
    const o = [
        /AppleWebKit.*Mobile.*/,
        // 移动终端
        /\(i[^;]+;( U;)? CPU.+Mac OS X/,
        // ios终端
        /Android/,
        // 安卓终端
        /iPhone/,
        // iPhone
        /iPad/,
        // iPad
      ],
      t = navigator.userAgent;
    for (let e of o)
      if (e.test(t))
        return {
          phone: !0,
          message: e,
        };
    return {
      phone: !1,
    };
  };
const O = (o, t) => {
    const e = o.__vccOpts || o;
    for (const [i, s] of t) e[i] = s;
    return e;
  },
  Q = { class: "yik-tabs" },
  Z = {
    name: "YikTabs",
  },
  tt = /* @__PURE__ */ Object.assign(Z, {
    props: {
      // 动画时间
      duration: {
        type: Number,
        default: 3e3,
      },
      // 激活项
      active: {
        type: Number,
        default: 0,
      },
      //激活样式
      classNameActive: {
        type: String,
      },
    },
    emits: ["update:active", "onchange"],
    setup(o, { emit: t }) {
      const e = R(),
        i = V({
          comps: [],
          activeItem: {},
        }),
        { comps: s, activeItem: n } = W(i),
        r = (l) => {
          t("onclick", l), t("update:active", l.index);
        },
        d = (l) => {
          t("onchange", l), (i.activeItem = l);
        };
      return (
        _(() => {
          let l = [];
          e.default().forEach((a) => {
            var h;
            switch ((h = a.type) == null ? void 0 : h.name) {
              case "YikTab":
                (a.uuid = Math.random().toString(16).slice(2, 8)), l.push(a);
                break;
            }
          }),
            (i.comps = l);
        }),
        (l, a) => (
          g(),
          m("div", Q, [
            (g(!0),
            m(
              j,
              null,
              U(
                y(s),
                (h, c) => (
                  g(),
                  C(
                    N(h),
                    {
                      key: h.uuid,
                      index: c,
                      active: o.active,
                      onOnclick: r,
                      onOnchange: d,
                    },
                    null,
                    40,
                    ["index", "active"]
                  )
                )
              ),
              128
            )),
            x(
              "div",
              {
                class: Y(["yik-tabs-active", o.classNameActive]),
                style: A({
                  transform: `translateX(${y(n).x}px)`,
                  height: `${y(n).height}px`,
                  width: `${y(n).width}px`,
                  transition: `transform ${o.duration / 1e4}s`,
                }),
              },
              [
                p(
                  l.$slots,
                  "active",
                  { row: y(n) },
                  () => [
                    (g(),
                    C(
                      N(y(s)[y(n).index]),
                      {
                        class: Y([o.classNameActive]),
                      },
                      null,
                      8,
                      ["class"]
                    )),
                  ],
                  !0
                ),
              ],
              6
            ),
          ])
        )
      );
    },
  }),
  et = /* @__PURE__ */ O(tt, [["__scopeId", "data-v-ac812947"]]);
const it = {
    name: "YikTab",
    setup: (o, { attrs: t, emit: e, slots: i }) => {
      _(() => {
        z(
          () => t.active,
          (n, r) => {
            n == t.index &&
              s(
                {
                  target: document.getElementById("yikTabRef" + t.index),
                },
                "onchange"
              );
          },
          {
            immediate: !0,
          }
        );
      });
      const s = (n, r) => {
        const { height: d, width: l } = n.target.getBoundingClientRect(),
          a = n.target.offsetLeft;
        e(r, {
          index: t.index,
          x: a,
          height: d,
          width: l,
        });
      };
      return { handleYikTab: s, index: t.index };
    },
  },
  st = ["id"];
function ot(o, t, e, i, s, n) {
  return (
    g(),
    m(
      "div",
      {
        class: "yik-tab",
        onClick:
          t[0] ||
          (t[0] = (r) => {
            o.handleYikTab(r, "onclick");
          }),
        id: "yikTabRef" + o.index,
      },
      [p(o.$slots, "default", {}, void 0, !0)],
      8,
      st
    )
  );
}
const nt = /* @__PURE__ */ O(it, [
  ["render", ot],
  ["__scopeId", "data-v-24476e6d"],
]);
class at {
  constructor({
    el: t,
    // canvas dom
    lineWidth: e = 3,
    // 线条宽度
    color: i = "#0088ff",
    //线条颜色
    bg: s,
    // 背景颜色或者背景图片
    watch: n,
  }) {
    (this.canvas = t),
      (this.ctx = this.canvas.getContext("2d")),
      (this._watch = n),
      (this.isDraw = !1),
      (this.lineWidth = e),
      (this.color = i),
      (this.bg = s),
      (this._array = []),
      this.onInit(),
      this.drawing(),
      this.initBg();
  }
  // 回显
  setEchoArr(t) {
    t && Array.isArray(t)
      ? (this._array.push(...t),
        t.forEach((e) => {
          e.length &&
            e.forEach((i) => {
              i instanceof Object &&
                (this.ctx.lineTo(i.x, i.y),
                (this.ctx.lineJoin = "round"),
                (this.ctx.lineCap = "round"),
                (this.ctx.lineWidth = this.lineWidth),
                (this.ctx.strokeStyle = this.color),
                this.ctx.stroke());
            });
        }))
      : console.error("不是集合！");
  }
  //保存
  save() {
    return this.canvas.toDataURL("image/png");
  }
  //清楚绘制
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height),
      this.initBg();
  }
  //设置背景色
  initBg() {
    if (this.bg)
      if (this.bg.indexOf("http") != -1) {
        const t = new Image();
        t.setAttribute("crossOrigin", "Anonymous"),
          (t.src = this.bg),
          (t.onload = () => {
            this.ctx.drawImage(
              t,
              0,
              0,
              this.ctx.canvas.width,
              this.ctx.canvas.height
            );
          });
      } else
        (this.ctx.fillStyle = this.bg),
          this.ctx.fillRect(
            0,
            0,
            this.ctx.canvas.width,
            this.ctx.canvas.height
          );
  }
  //开始绘制
  drawing() {
    const t = this.recurveOffset(this.canvas, "offsetLeft", 0),
      e = this.recurveOffset(this.canvas, "offsetTop", 0);
    (this.canvas.onmousemove = (i) => {
      if (this.isDraw) {
        const s = i.pageX - t,
          n = i.pageY - e;
        this._array[this._array.length - 1].push({
          x: s,
          y: n,
        }),
          this.ctx.lineTo(s, n),
          (this.ctx.lineJoin = "round"),
          (this.ctx.lineCap = "round"),
          (this.ctx.lineWidth = this.lineWidth),
          (this.ctx.strokeStyle = this.color),
          this.ctx.stroke();
      }
    }),
      (this.canvas.ontouchmove = (i) => {
        if (this.isDraw) {
          const s = i.touches[0].pageX - this.canvas.offsetLeft,
            n = i.touches[0].pageY - this.canvas.offsetTop;
          this._array[this._array.length - 1].push({
            x: s,
            y: n,
          }),
            this.ctx.lineTo(s, n),
            (this.ctx.lineJoin = "round"),
            (this.ctx.lineCap = "round"),
            (this.ctx.lineWidth = this.lineWidth),
            (this.ctx.strokeStyle = this.color),
            this.ctx.stroke();
        }
      });
  }
  recurveOffset(t, e, i) {
    return (
      t[e] && (i += t[e]),
      t.offsetParent &&
        t.tagName != "BODY" &&
        (i = this.recurveOffset(t.offsetParent, e, i)),
      i
    );
  }
  // 初始化
  onInit() {
    (this.canvas.ontouchstart = () => {
      this._array.push([]), (this.isDraw = !0), this.ctx.beginPath();
    }),
      (this.canvas.ontouchend = () => {
        (this.isDraw = !1),
          this.ctx.closePath(),
          this._watch && this._watch(this._array);
      }),
      (this.canvas.onmousedown = () => {
        this._array.push([]), (this.isDraw = !0), this.ctx.beginPath();
      }),
      (window.onmouseup = () => {
        (this.isDraw = !1), this.ctx.closePath();
      }),
      (this.canvas.onmouseup = () => {
        (this.isDraw = !1),
          this.ctx.closePath(),
          this._watch && this._watch(this._array);
      });
  }
}
const lt = ["width", "height"],
  rt = {
    name: "YikSign",
  },
  ht = /* @__PURE__ */ Object.assign(rt, {
    props: {
      width: {
        type: Number,
        default: 500,
      },
      height: {
        type: Number,
        default: 300,
      },
      color: {
        type: String,
        default: "#000",
      },
      lineWidth: {
        type: Number,
        default: 3,
      },
      bg: {
        default: "#fff",
      },
      value: {
        type: Array,
        default: () => [],
      },
    },
    setup(o, { expose: t }) {
      const e = o,
        i = b(null);
      let s = [],
        n = null,
        r = null;
      _(() => {
        r = q(() => {
          e.lineWidth &&
            e.color &&
            e.bg &&
            $(() => {
              d();
            });
        });
      });
      const d = () => {
        n && ((s = []), (n = null)),
          (n = new at({
            el: i.value,
            color: e.color,
            lineWidth: e.lineWidth,
            bg: e.bg,
            watch: (l) => {
              s = [...l];
            },
          })),
          e.value && ((s = [...e.value]), n.setEchoArr(e.value));
      };
      return (
        T(() => {
          r(), n && (n = null);
        }),
        t({
          save: () => n.save(),
          clear: () => {
            (s = []), n.clear();
          },
          getLine: () => s,
        }),
        (l, a) => (
          g(),
          m(
            "canvas",
            {
              width: o.width,
              height: o.height,
              ref_key: "yikSignRef",
              ref: i,
            },
            null,
            8,
            lt
          )
        )
      );
    },
  }),
  ct = {
    name: "YikMaxView",
  },
  dt = /* @__PURE__ */ Object.assign(ct, {
    props: {
      width: {
        type: String,
        default: "1920px",
      },
      height: {
        type: String,
        default: "1080px",
      },
      isCover: {
        type: Boolean,
        default: !1,
      },
    },
    setup(o) {
      const t = o,
        e = b(null);
      let i = null;
      const s = F(),
        n = () => {
          const r = s.refs.maxView.parentNode;
          let d = e.value,
            l = parseInt(d.style.width),
            a = parseInt(d.style.height);
          if (t.isCover) {
            (r.style.width = window.innerWidth + "px"),
              (r.style.height = window.innerHeight + "px"),
              (r.style.display = "flex"),
              (r.style.justifyContent = "center");
            const h =
              window.innerWidth / window.innerHeight < l / a
                ? window.innerWidth / l
                : window.innerHeight / a;
            d.style.transform = `scale(${h})`;
          } else {
            let h = window.innerWidth / l,
              c = window.innerHeight / a;
            d.style.transform = `scale(${h},${c})`;
          }
        };
      return (
        _(() => {
          (document.body.style.overflow = "hidden"),
            (document.body.style.margin = "0"),
            (e.value.style.transition = "transform 0.5s"),
            (e.value.style["box-sizing"] = "border-box"),
            n(),
            (window.onresize = () => {
              i && clearTimeout(i),
                (i = setTimeout(() => {
                  n();
                }, 500));
            });
        }),
        E(() => {
          window.onresize = null;
        }),
        (r, d) => (
          g(),
          m(
            "div",
            {
              ref_key: "maxView",
              ref: e,
              class: "yik-ui-max-view",
              style: A({
                width: o.width,
                height: o.height,
                transformOrigin: (o.isCover ? "center" : "left") + " top",
              }),
            },
            [p(r.$slots, "default")],
            4
          )
        )
      );
    },
  }),
  ft = {
    name: "YikMarquee",
  },
  ut = /* @__PURE__ */ Object.assign(ft, {
    props: {
      speed: {
        type: Number,
        default: 1,
      },
      direction: {
        type: String,
        default: "Y",
      },
    },
    setup(o) {
      const t = o,
        e = b(null),
        i = L(0),
        s = L(!1);
      let n = 0,
        r = 0;
      _(() => {
        $(() => {
          const a = e.value;
          if (
            ((e.value.style.overflow = "hidden"),
            t.direction == "Y" && ((n = a.children[0].clientHeight), l()),
            t.direction == "X")
          ) {
            a.style.display = "flex";
            for (let h = 0; h < a.children.length; h++) {
              const c = a.children[h];
              c.style["white-space"] = "nowrap";
            }
            (r = a.children[0].scrollWidth), d();
          }
        });
      });
      const d = (a) => {
          (e.value.children[0].style.transform = `translateX(-${i.value}px)`),
            (e.value.children[1].style.transform = `translateX(-${i.value}px)`),
            r <= a ? (i.value = 0) : (i.value += t.speed),
            s.value ||
              window.requestAnimationFrame(() => {
                d(i.value);
              });
        },
        l = (a) => {
          (e.value.children[0].style.transform = `translateY(-${i.value}px)`),
            (e.value.children[1].style.transform = `translateY(-${i.value}px)`),
            n <= a ? (i.value = 0) : (i.value += t.speed),
            s.value ||
              window.requestAnimationFrame(() => {
                l(i.value);
              });
        };
      return (a, h) => (
        g(),
        m(
          "div",
          {
            class: "yik-marquee",
            ref_key: "yikMarqueeRef",
            ref: e,
            onMouseenter: h[0] || (h[0] = (c) => (s.value = !0)),
            onMouseleave:
              h[1] ||
              (h[1] = () => {
                (s.value = !1),
                  o.direction == "Y" && l(),
                  o.direction == "X" && d();
              }),
          },
          [p(a.$slots, "default"), p(a.$slots, "default")],
          544
        )
      );
    },
  }),
  gt = {
    name: "YikIsKeyboard",
  },
  pt = /* @__PURE__ */ Object.assign(gt, {
    props: {
      isHideSlot: {
        type: Boolean,
        default: !0,
      },
    },
    emits: ["onOpen", "onClose"],
    setup(o, { emit: t }) {
      const e = o,
        i = L(!0),
        s = R(),
        n = () => {
          const l = [
              /AppleWebKit.*Mobile.*/,
              // 移动终端
              /\(i[^;]+;( U;)? CPU.+Mac OS X/,
              // ios终端
              /Android/,
              // 安卓终端
              /iPhone/,
              // iPhone
              /iPad/,
              // iPad
            ],
            a = navigator.userAgent;
          for (let h of l)
            if (h.test(a))
              return {
                phone: !0,
                message: h,
              };
          return {
            phone: !1,
          };
        },
        r = (l) => {
          s.default && e.isHideSlot && (i.value = l);
        },
        d = () => {
          const l = window.innerHeight;
          n().message == "/iPhone/"
            ? (window.addEventListener("focusin", () => {
                t("open"), r(!1);
              }),
              window.addEventListener("focusout", () => {
                t("close"), r(!0);
              }))
            : window.addEventListener("resize", () => {
                const a = window.innerHeight;
                l > a ? (t("open"), r(!1)) : (t("close"), r(!0));
              });
        };
      return (
        _(() => {
          d();
        }),
        (l, a) => (i.value ? p(l.$slots, "default", { key: 0 }) : K("", !0))
      );
    },
  });
const mt = { class: "yik-horizontal-screen" },
  _t = {
    name: "YikHorizontalScroll",
  },
  yt = /* @__PURE__ */ Object.assign(_t, {
    props: {
      direction: {
        type: String,
        default: "right",
      },
      width: {
        type: String,
        default: "100vw",
      },
      height: {
        type: String,
        default: "100vh",
      },
    },
    setup(o) {
      const t = o;
      J((i) => ({
        "0d4cbb88": o.width,
        "180bab71": o.height,
      }));
      const e = b(null);
      return (
        _(() => {
          const i = e.value;
          switch (t.direction) {
            case "right":
              i.style.transform = "rotate(90deg)";
              break;
            case "left":
              i.style.transform = "rotate(-90deg)";
              break;
          }
        }),
        (i, s) => (
          g(),
          m("div", mt, [
            x(
              "div",
              {
                class: "yik-horizontal-screen-rotate",
                ref_key: "yikRotateRef",
                ref: e,
              },
              [p(i.$slots, "default")],
              512
            ),
          ])
        )
      );
    },
  });
class vt {
  /**
   * @description:
   * @param {*} el  dom 元素
   * @param {*} watchTop 置顶时，回调
   * @param {*} watchBottom 最低时， 回调
   * @param {*} watch  滚动时，回调 top,height,direction,el
   * @return {*}
   */
  constructor({ el: t, watchTop: e, watchBottom: i, watch: s }) {
    (this._el = t),
      (this._watchTop = e),
      (this._watchBottom = i),
      (this._watch = s),
      (this._direction = ""),
      this.listening();
  }
  listening() {
    this._el.style["scroll-behavior"] = "smooth";
    let t = this._el.scrollTop;
    this._el.addEventListener("scroll", (e) => {
      this._el.scrollTop - t >= 0
        ? (this._direction = "down")
        : (this._direction = "up"),
        (t = this._el.scrollTop);
      let s = this._el.scrollHeight - this._el.clientHeight;
      this._watch &&
        this._watch({
          top: this._el.scrollTop,
          height: s,
          direction: this._direction,
          el: this._el,
        }),
        this._el.scrollTop <= 0 && this._watchTop && this._watchTop(),
        this._el.scrollTop >= s && this._watchBottom && this._watchBottom();
    });
  }
  // 设置滚动条值
  setTop(t) {
    if (typeof t == "number") this._el.scrollTop = t;
    else throw new Error("setTop 形参必须是Number类型");
  }
}
const wt = (o, t, e = {}) => {
    let i = new MutationObserver((s, n) => {
      o && o(i, { mutationList: s, observer: n });
    });
    i.observe(t, e),
      T(() => {
        i.disconnect(), (i = null);
      });
  },
  xt = (o, t, e = {}) => {
    let i = new IntersectionObserver((s, n) => {
      o && o(i, { entries: s, observer: n });
    }, e);
    i.observe(t),
      T(() => {
        i.disconnect(), (i = null);
      });
  },
  Vt = (o, t) => {
    switch (state[o]) {
      case void 0:
        state[o] = "";
        break;
    }
    const e = W(state);
    return (
      t &&
        z(
          () => state[o],
          (i, s) => {
            t(i, s);
          },
          {
            deep: !0,
          }
        ),
      e[o]
    );
  },
  jt = ({
    el: o,
    gap: t = 20,
    onChange: e = null,
    onStart: i = null,
    onEnd: s = null,
  }) => {
    let n = !1,
      r = !1,
      d = null;
    const l = o.style;
    function a(c, f) {
      c && (l.width = c + "px"), f && (l.height = f + "px");
    }
    function h(c) {
      const {
          left: f,
          top: u,
          width: v,
          height: w,
        } = o.getBoundingClientRect(),
        X = c.pageX - f,
        D = c.pageY - u;
      return { x: X, y: D, width: v, height: w };
    }
    o.addEventListener("mousedown", (c) => {
      (r = !0), i && n && r && i({ ...h(c), event: c });
    }),
      document.addEventListener("mouseup", (c) => {
        s && n && r && d != null && s({ ...h(c), event: c }),
          (r = !1),
          (n = !1),
          (d = null);
      }),
      o.addEventListener("mousemove", (c) => {
        const { x: f, y: u, width: v, height: w } = h(c);
        d == null &&
          (v - t < f && w - t < u
            ? ((l.cursor = "nw-resize"), (n = !0), r && (d = 0))
            : v - t < f
            ? ((l.cursor = "w-resize"), (n = !0), r && (d = 1))
            : w - t < u
            ? ((l.cursor = "ns-resize"), (n = !0), r && (d = 2))
            : (l.cursor = "default"));
      }),
      document.addEventListener("mousemove", (c) => {
        const { x: f, y: u, width: v, height: w } = h(c);
        if (n && r)
          switch ((e && e({ x: f, y: u, width: v, height: w, event: c }), d)) {
            case 0:
              a(f, u);
              break;
            case 1:
              a(f);
              break;
            case 2:
              a(null, u);
              break;
          }
      });
  },
  Ut = (o, t) => {
    let e;
    return function (...i) {
      clearTimeout(e),
        (e = setTimeout(() => {
          o.apply(this, i);
        }, t));
    };
  },
  qt = (o, t) => {
    let e;
    return function (...i) {
      e ||
        (e = setTimeout(() => {
          (e = null), o.apply(this, i);
        }, t));
    };
  };
const bt = { class: "loading" },
  kt = /* @__PURE__ */ x("span", { class: "spin" }, null, -1),
  Tt = { class: "loading" },
  St = {
    name: "YikScroll",
  },
  Mt = /* @__PURE__ */ Object.assign(St, {
    props: {
      loading: {
        type: Boolean,
        default: !0,
      },
    },
    emits: ["onBottom", "onTop", "onWatch", "autoLoadScrollEnd"],
    setup(o, { expose: t, emit: e }) {
      let i = null,
        s = 0;
      const n = b(null),
        r = b(null);
      return (
        _(() => {
          const a = n.value;
          (a.style["overflow-y"] = "auto"),
            (i = new vt({
              el: a,
              watchTop: () => {
                e("onTop");
              },
              watch: (h) => {
                e("onWatch", h);
              },
            })),
            xt(
              (h, { entries: c }) => {
                c[0].isIntersecting && e("onBottom");
              },
              r.value,
              {
                root: a,
              }
            );
        }),
        t({
          setScroll: (a, h = !1) => {
            if ((s++, s == 1)) {
              let c = n.value.scrollHeight;
              c > a
                ? (i.setTop(a), (s = 0))
                : h &&
                  (e("onBottom"),
                  wt(
                    (f) => {
                      (c = n.value.scrollHeight),
                        c <= a
                          ? e("onBottom")
                          : (f.disconnect(),
                            (f = null),
                            e("autoLoadScrollEnd"),
                            (s = 0),
                            i.setTop(a));
                    },
                    n.value,
                    {
                      childList: !0,
                      // 观察目标子节点的变化，是否有添加或者删除
                    }
                  ));
            }
          },
          getScroll: () => n.value.scrollTop,
        }),
        T(() => {
          i && (i = null);
        }),
        (a, h) => (
          g(),
          m(
            "div",
            {
              class: "yik-ui-page",
              ref_key: "yikUiPageRef",
              ref: n,
            },
            [
              p(a.$slots, "default"),
              x(
                "div",
                {
                  ref_key: "loadingRef",
                  ref: r,
                },
                [
                  p(a.$slots, "loading", {}, () => [
                    B(x("p", bt, [kt, G("加载中... ")], 512), [[I, o.loading]]),
                  ]),
                ],
                512
              ),
              p(a.$slots, "finished", {}, () => [
                B(x("p", Tt, "没有更多了", 512), [[I, !o.loading]]),
              ]),
            ],
            512
          )
        )
      );
    },
  });
function P(o) {
  const t = document.defaultView.getComputedStyle(o);
  return t["overflow-y"] == "auto" || t.overflow == "auto"
    ? o
    : P(o.parentNode);
}
const Lt = {
  mounted(o, t, e) {
    const i = P(o.parentNode),
      { arg: s, value: n, modifiers: r } = t,
      { height: d } = o.parentNode.getBoundingClientRect();
    i.addEventListener("scroll", function () {
      const { top: l } = o.getBoundingClientRect();
      r.comp ? d > l && (e.ctx.props[s] = n) : d > l && (o[s || "src"] = n);
    });
  },
  name: "YikLazy",
};
class zt {
  /**
   * @description:
   * @param {*} isBody 是否挂在在body标签下
   * @param {*} watch 监听当前元素定位 回调 x,y,xMax,yMax
   * @param {*} boundWatch 监听当天元素是否碰到父元素边界
   * @return {*}
   */
  constructor({
    el: t,
    isBody: e = !1,
    watch: i = () => {},
    boundWatch: s = () => {},
    isBound: n = !0,
  }) {
    (this._el = t),
      (this._watch = i),
      (this._boundWatch = s),
      (this._isBody = e),
      (this._isBound = n),
      this.initStyle(),
      this.onEvent();
  }
  initStyle() {
    if (!this._boundWatch && typeof this._boundWatch != "function")
      throw new Error("boundWatch形参,必须是回调函数");
    if (!this._watch && typeof this._watch != "function")
      throw new Error("watch形参,必须是回调函数");
    this._isBody && document.body.appendChild(this._el),
      (document.body.style.position = "relative"),
      (this._el.style.position = "absolute"),
      (this._el.style.cursor = "move"),
      (this._el.style["user-select"] = "none");
  }
  onEvent() {
    let t = 0,
      e = 0;
    const i = (s) => {
      s.stopPropagation();
      const n = this.recursionParentNode(this._el.parentNode);
      let r = 0,
        d = 0;
      if (n.tagName == "BODY")
        (r = window.innerWidth), (d = window.innerHeight);
      else {
        const { width: f, height: u } = n.getBoundingClientRect();
        (r = f), (d = u);
      }
      const l = s.pageX - t,
        a = s.pageY - e,
        h = d - this._el.getBoundingClientRect().height,
        c = r - this._el.getBoundingClientRect().width;
      l >= 0 &&
        a >= 0 &&
        a <= h &&
        l <= c &&
        this._watch({
          x: l,
          y: a,
          yMax: h,
          xMax: c,
        }),
        l <= 0
          ? ((this._el.style.left = "0px"),
            a >= 0 && a <= h && (this._el.style.top = a + "px"),
            this._boundWatch("left"))
          : a <= 0
          ? ((this._el.style.top = "0px"),
            l >= 0 && l <= c && (this._el.style.left = l + "px"),
            this._boundWatch("top"))
          : l <= c
          ? ((this._el.style.top = h + "px"),
            l >= 0 && l <= c && (this._el.style.left = l + "px"),
            this._boundWatch("bottom"))
          : a <= h &&
            ((this._el.style.left = c + "px"),
            a >= 0 && a <= h && (this._el.style.top = a + "px"),
            this._boundWatch("right")),
        this._isBound
          ? l >= 0 &&
            a >= 0 &&
            a <= h &&
            l <= c &&
            ((this._el.style.left = l + "px"), (this._el.style.top = a + "px"))
          : ((this._el.style.left = l + "px"), (this._el.style.top = a + "px"));
    };
    this._el.addEventListener("mousedown", (s) => {
      s.preventDefault(),
        s.stopPropagation(),
        (t = s.pageX - this._el.offsetLeft),
        (e = s.pageY - this._el.offsetTop),
        document.addEventListener("mousemove", i);
    }),
      this._el.addEventListener("mouseup", (s) => {
        s.stopPropagation(), document.removeEventListener("mousemove", i);
      });
  }
  // 一直向上父元素查找，一直知道position ：relative style
  recursionParentNode(t) {
    return getComputedStyle(t) && getComputedStyle(t).position != "relative"
      ? this.recursionParentNode(t.parentNode)
      : t;
  }
}
const $t =
    '<svg t="1680920604134" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3391" width="32" height="32"><path d="M570 510.8l254.9-255.1c16.4-16.5 16.4-43 0-59.5s-43-16.5-59.5 0L510.5 451.3 255.8 196.2c-16.4-16.5-43-16.5-59.5 0-16.4 16.5-16.4 43 0 59.5l254.9 255.1-254.9 255c-16.4 16.5-16.4 43 0 59.5 8.1 8.2 18.9 12.4 29.7 12.4s21.5-4.1 29.7-12.4l254.7-255 254.8 255c8.1 8.2 19 12.4 29.7 12.4 10.8 0 21.5-4.1 29.6-12.4 16.4-16.5 16.4-43 0-59.5L570 510.8z m0 0" p-id="3392" fill="#ffffff"></path></svg>',
  Ct =
    '<svg t="1680879453428" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3782" width="32" height="32"><path d="M358.997333 512l396.544-396.458667a42.666667 42.666667 0 1 0-60.416-60.416l-426.666666 426.666667a42.666667 42.666667 0 0 0 0 60.416l426.666666 426.666667a42.666667 42.666667 0 1 0 60.416-60.416L358.997333 512z" fill="#ffffff" p-id="3783"></path></svg>',
  Nt =
    '<svg t="1680879474772" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="970" width="32" height="32"><path d="M665.002667 512L268.458667 115.541333a42.666667 42.666667 0 1 1 60.416-60.416l426.666666 426.666667a42.666667 42.666667 0 0 1 0 60.416l-426.666666 426.666667a42.666667 42.666667 0 1 1-60.416-60.416L665.002667 512z" fill="#ffffff" p-id="971"></path></svg>',
  Yt =
    '<svg t="1680969261988" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2989" width="27" height="27"><path d="M316 672h60c4.4 0 8-3.6 8-8V360c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v304c0 4.4 3.6 8 8 8zM512 622c22.1 0 40-17.9 40-39 0-23.1-17.9-41-40-41s-40 17.9-40 41c0 21.1 17.9 39 40 39zM512 482c22.1 0 40-17.9 40-39 0-23.1-17.9-41-40-41s-40 17.9-40 41c0 21.1 17.9 39 40 39z" p-id="2990" fill="#ffffff"></path><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32z m-40 728H184V184h656v656z" p-id="2991" fill="#ffffff"></path><path d="M648 672h60c4.4 0 8-3.6 8-8V360c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v304c0 4.4 3.6 8 8 8z" p-id="2992" fill="#ffffff"></path></svg>',
  Bt =
    '<svg t="1681008988742" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8577" width="25" height="25"><path d="M909.1 209.3l-56.4 44.1C775.8 155.1 656.2 92 521.9 92 290 92 102.3 279.5 102 511.5 101.7 743.7 289.8 932 521.9 932c181.3 0 335.8-115 394.6-276.1 1.5-4.2-0.7-8.9-4.9-10.3l-56.7-19.5c-4.1-1.4-8.6 0.7-10.1 4.8-1.8 5-3.8 10-5.9 14.9-17.3 41-42.1 77.8-73.7 109.4-31.6 31.6-68.4 56.4-109.3 73.8-42.3 17.9-87.4 27-133.8 27-46.5 0-91.5-9.1-133.8-27-40.9-17.3-77.7-42.1-109.3-73.8-31.6-31.6-56.4-68.4-73.7-109.4-17.9-42.4-27-87.4-27-133.9s9.1-91.5 27-133.9c17.3-41 42.1-77.8 73.7-109.4 31.6-31.6 68.4-56.4 109.3-73.8 42.3-17.9 87.4-27 133.8-27 46.5 0 91.5 9.1 133.8 27 40.9 17.3 77.7 42.1 109.3 73.8 9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47c-5.3 4.1-3.5 12.5 3 14.1l175.6 43c5 1.2 9.9-2.6 9.9-7.7l0.8-180.9c-0.1-6.6-7.8-10.3-13-6.2z" p-id="8578" fill="#ffffff"></path></svg>',
  It =
    '<svg t="1681024383164" class="icon" viewBox="0 0 1275 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2647" width="26" height="26"><path d="M434.01678069 96.35177165a94.289884 94.289884 0 0 0-133.25765214 0L123.48607034 273.6248307A40.38110706 40.38110706 0 0 0 180.5243836 331.26886006l146.48246438-146.98722794v683.24832532a40.38110706 40.38110706 0 0 0 80.76221328 0V184.28163212L554.25152647 331.26886006c0.60571692 0.70666946 1.31238556 1.31238556 2.01905503 2.01905585a40.38110706 40.38110706 0 0 0 55.01925824-59.15832165zM1151.48809462 650.58246162a40.38110706 40.38110706 0 0 0-57.03831326-2.01905503 19.08007305 19.08007305 0 0 0-2.01905503 2.01905503l-146.28055929 146.38151184V113.71564814a40.38110706 40.38110706 0 0 0-80.76221329 0v683.24832532l-146.38151184-146.38151184a40.38110706 40.38110706 0 0 0-59.15832166 55.01925824l2.01905502 2.01905503 177.37401161 177.27305822a93.98702554 93.98702554 0 0 0 133.15669958 0l177.27305823-177.27305822a40.38110706 40.38110706 0 0 0 1.81714993-57.03831327z" p-id="2648" fill="#ffffff"></path></svg>',
  Ht =
    '<svg t="1681024308661" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2241" width="22" height="22"><path d="M356.67458 1012.46055a39.345183 39.345183 0 0 1-55.673434 0L127.783977 839.636832a91.77264 91.77264 0 0 1 0-129.740741l172.725354-172.725354a39.345183 39.345183 0 0 1 57.640694 53.607812c-0.688541 0.688541-1.278718 1.377081-1.96726 1.967259L213.458113 735.47046h665.7205a39.345183 39.345183 0 0 1 0 78.690366H213.458113L356.67458 956.787115a39.345183 39.345183 0 0 1 0 55.673435zM105.357223 250.147625a39.345183 39.345183 0 0 0 39.345183 39.345184h665.720499l-142.626289 142.724652a39.345183 39.345183 0 1 0 53.607812 57.54233l1.96726-1.967259L896.097042 314.772089a91.575914 91.575914 0 0 0 0-129.740742L723.371688 12.502719a39.345183 39.345183 0 1 0-57.542331 53.706175l1.967259 1.967259 142.626289 142.626289H144.702406a39.345183 39.345183 0 0 0-39.345183 39.345183z" p-id="2242" fill="#ffffff"></path></svg>',
  S = "#ffffff",
  k = ({ tagName: o, parentTag: t, style: e = {} }) => {
    const i = document.createElement(o);
    return (
      Object.keys(e).forEach((s) => {
        i.style[s] = e[s];
      }),
      t.appendChild(i),
      i
    );
  },
  M = ({ zoom_reverse_scale: o = 1, zoom_scale: t = 1 }) => `
  @keyframes zoom {
      0% {
        transform: scale(0);
      }
      100% {
        transform: scale(${t});
      }
    }
    @keyframes zoom_reverse {
      0% {
        transform: scale(${o});
      }
      100% {
        transform: scale(0);
      }
    }
    @keyframes opacity {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
    @keyframes opacity_reverse {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
    @keyframes rotate {
      0% {
        transform: rotate(0);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    @keyframes move {
        0% {
          transform: translateX(-100%);
        }
        100% {
          transform: translateX(0%)
        }
      }
    @keyframes move_reverse {
        0% {
          transform: translateX(100%);
        }
        100% {
          transform: translateX(0%)
        }
      }
    @keyframes shake {
        0% {
          left: calc(50% + 1px);
        }
        25% {
          left: calc(50% + 2px);
        }
        50% {
          left: calc(50% + 3px);
        }
        75% {
          left: calc(50% - 3px);
        }
        100% {
          left: calc(50% - 2px);
        }
    }
    .yik-view-image{
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.2);
      cursor: pointer;
      justify-content: center;
      align-items: center;
      z-index:9999;
    }
    .yik-view-image_close{
      position: absolute;
      right: 20px;
      top: 20px;
      z-index: 10000;
      cursor: pointer;
      transition: transform .5s;
    }
    .yik-view-image_close:hover{
        transform: rotate(90deg);
    }
    .yik-view-image_left{
      position: absolute;
      left: 0;
      top: 0;
      z-index: 9999;
      cursor: pointer;
      height: 100vh;
      width: 10%;
      align-items: center;
      justify-content: center;
      transition: transform .5s;
      background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%);
    }
    .yik-view-image_left:hover{
        transform: translate(-10%);
    }
    .yik-view-image_right{
      position: absolute;
      right: 0;
      top: 0;
      z-index: 9999;
      cursor: pointer;
      height: 100vh;
      width: 10%;
      transition: transform .5s;
      align-items: center;
      justify-content: center;
      background-image: linear-gradient(270deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%);

    }
    .yik-view-image_right:hover{
        transform: translate(10%);
    }
    .yik-view-image_img{
      background: rgba(0, 0, 0, 0.3);
    }
    .yik-view-image_msg{
      position: absolute;
      left: 50%;
      top: 5%;
      transform: translateX(-50%);
      padding:5px 15px;
      background: rgba(0,0,0,0.5);
      color:#ffffff;
      border-radius: 5px;
      font-size: 15px;
      z-index: 9999;
    }
    .view-image-options-total {
      position: absolute;
      right: 2%;
      bottom: 5%;
      color:#ffffff;
      font-size: 20px;
      z-index: 9999;
      font-weight: bold;
    }
    .view-image-options-extend {
      position: absolute;
      left: 50%;
      bottom: 5%;
      transform: translateX(-50%);
      padding:5px 20px 5px 30px;
      background: rgba(0,0,0,0.5);
      color:#ffffff;
      border-radius: 25px;
      font-size: 15px;
      z-index: 9999;
      display:flex;
      align-items: center;
      justify-content: center;
    }
`;
class Rt {
  constructor(t) {
    (this.viewImage = t), (this._imgStyle = t._img.style), this.initOptions();
  }
  updateViewImage(t) {
    (this.viewImage = t),
      (this._rotate = 0),
      (this._scaleY = 1),
      (this._scaleX = 1),
      this.setTotal(),
      this.setRestore(),
      this.setRotate(),
      this.setUpAndDown(),
      this.setLeftAndRight();
  }
  initOptions() {
    (this._optionTag = k({
      tagName: "div",
      parentTag: this.viewImage._el,
    })),
      (this._optionTag.onclick = (t) => {
        t.stopPropagation();
      }),
      (this._optionTag.className = "view-image-options-extend");
  }
  // 统计
  setTotal() {
    this._totalTag ||
      ((this._totalTag = k({
        tagName: "span",
        parentTag: this.viewImage._el,
      })),
      (this._totalTag.className = "view-image-options-total")),
      (this._totalTag.innerText =
        this.viewImage._index + 1 + " / " + this.viewImage._imgs.length);
  }
  // 还原图片大小
  setRestore() {
    this.createTagCommon("_restoreTag", Yt, "还原图片原有尺寸", () => {
      this.viewImage._scale = 1;
    });
  }
  // 旋转功能
  setRotate() {
    this.createTagCommon("_rotateTag", Bt, "图片旋转", () => {
      this._rotate += 90;
    });
  }
  // 上下对调
  setUpAndDown() {
    this.createTagCommon("_upAndDown", It, "上下对调", () => {
      this._scaleY == -1 ? (this._scaleY = 1) : (this._scaleY = -1);
    });
  }
  // 左右对调
  setLeftAndRight() {
    this.createTagCommon("_leftAndRight", Ht, "左右对调", () => {
      this._scaleX == -1 ? (this._scaleX = 1) : (this._scaleX = -1);
    });
  }
  createTagCommon(t, e, i, s) {
    this[t] ||
      ((this[t] = k({
        tagName: "span",
        style: {
          display: "flex",
          marginRight: "10px",
        },
        parentTag: this._optionTag,
      })),
      (this[t].innerHTML = e),
      (this[t].title = i),
      (this[t].onclick = (n) => {
        n.stopPropagation(),
          (this._imgStyle.transition = "transform .3s"),
          s && s(),
          this.setTransform();
      }));
  }
  // 图片改变
  setTransform() {
    this._imgStyle.transform = `rotate(${this._rotate}deg) scale(${
      this.viewImage._scale || 1
    }) scaleY(${this._scaleY}) scaleX(${this._scaleX})`;
  }
}
class Wt {
  constructor(t) {
    const {
      isClickMask: e,
      isAutoSize: i,
      pct: s,
      watchClose: n,
    } = t || {
      isClickMask: !0,
      //是否开启点击蒙层关闭
      isAutoSize: !0,
      //是否开启自动计算图片宽高
      pct: 1,
      watchClose: () => {},
    };
    (this._isClickMask = e),
      (this._isAutoSize = i),
      (this._pct = s),
      (this._watchClose = n),
      (this.createTag = k),
      this.init();
  }
  init() {
    (window.document.onmouseover = () => {
      this.onmouseover();
    }),
      (this._style = this.createTag({
        tagName: "style",
        parentTag: document.head,
      })),
      (this._style.innerHTML = M({})),
      (this._el = this.createTag({
        tagName: "div",
        parentTag: document.body,
        style: {
          display: "none",
        },
      })),
      (this._el.className = "yik-view-image"),
      (this._el.onclick = (e) => {
        e.stopPropagation(),
          this._isClickMask ? this.close() : this.onmouseover();
      }),
      (this._msg = this.createTag({
        tagName: "span",
        parentTag: this._el,
        style: {
          display: "none",
        },
      })),
      (this._msg.className = "yik-view-image_msg");
    const t = this.createTag({
      tagName: "span",
      parentTag: this._el,
      style: {
        display: "inline-block",
      },
    });
    (t.innerHTML = $t),
      (t.className = "yik-view-image_close"),
      (t.onclick = () => {
        this.close();
      }),
      (this._left = this.createTag({
        tagName: "span",
        parentTag: this._el,
        style: {
          display: "none",
        },
      })),
      (this._left.className = "yik-view-image_left"),
      (this._left.innerHTML = Ct),
      (this._left.onclick = (e) => {
        e.stopPropagation(),
          this._index - 1 >= 0
            ? (this._index--, this.setSrc())
            : ((this._index = this._imgs.length - 1), this.setSrc());
      }),
      (this._right = this.createTag({
        tagName: "span",
        parentTag: this._el,
        style: {
          display: "none",
        },
      })),
      (this._right.className = "yik-view-image_right"),
      (this._right.innerHTML = Nt),
      (this._right.onclick = (e) => {
        e.stopPropagation(),
          this._index + 1 < this._imgs.length
            ? (this._index++, this.setSrc())
            : ((this._index = 0), this.setSrc());
      }),
      (this._img = this.createTag({
        tagName: "img",
        parentTag: this._el,
      })),
      (this._img.onclick = (e) => {
        e.stopPropagation();
      }),
      (this._img.onmousewheel = (e) => {
        e.preventDefault(),
          this._scale || (this._scale = 1),
          (this._img.style.transition = ""),
          e.deltaY > 0 && this._scale > 0.1 && (this._scale -= 8e-3),
          e.deltaY < 0 && (this._scale += 8e-3),
          this.showMsg((this._scale * 100).toFixed(0) + "%", !1),
          this._options.setTransform();
      }),
      (this._img.className = "yik-view-image_img"),
      (this._drag = new zt({
        el: this._img,
        isBound: !1,
      })),
      (this._options = new Rt(this));
  }
  //消息提示
  showMsg(t, e = !0) {
    this._timeout && clearTimeout(this._timeout),
      (this._msg.style.display = "inline-block"),
      e &&
        ((this._msg.style.animation = "shake 0.1s linear 5"),
        setTimeout(() => {
          this._msg.style.animation = "";
        }, 500)),
      (this._msg.innerText = t),
      (this._timeout = setTimeout(() => {
        this._msg.style.display = "none";
      }, 3e3));
  }
  // 设置图片，数组
  setImg(t, e = 0) {
    (this._index = e),
      t instanceof Array
        ? (this._imgs = t)
        : t instanceof String && (this._imgs = [t]),
      (this._el.style.display = "flex"),
      (this._el.style.animation = "opacity 0.5s linear"),
      this.setSrc();
  }
  // 把url给img标签
  setSrc() {
    (this._scale = this._pct),
      (this._options._scaleY = 1),
      (this._options._scaleX = 1),
      (this._options._rotate = 0),
      this._options.setTransform(),
      this._timeoutMove && clearTimeout(this._timeoutMove),
      this._image && (this._image = null),
      (this._image = new Image()),
      (this._image.src = this._imgs[this._index]),
      (this._img.style.opacity = "0"),
      this.showLoading(),
      (this._image.onload = (t) => {
        this.hideLoading();
        var e = this._image.width,
          i = this._image.height;
        if (
          ((this._img.style.left = ""),
          (this._img.style.top = ""),
          (this._img.src = this._imgs[this._index]),
          (this._img.style.width = e + "px"),
          (this._img.style.height = i + "px"),
          this._isAutoSize)
        ) {
          if (window.innerWidth < e) {
            const s = e / window.innerWidth;
            (this._scale = s / 8),
              (this._img.style.transform = `scale(${this._scale})`);
          } else if (window.innerHeight < i) {
            const s = i / window.innerHeight;
            (this._scale = s / 8),
              (this._img.style.transform = `scale(${this._scale})`);
          }
        } else this._img.style.transform = `scale(${this._scale})`;
        (this._style.innerHTML = M({
          zoom_scale: this._scale,
        })),
          (this._img.style.animation = "zoom 0.5s"),
          (this._img.style.opacity = "1"),
          setTimeout(() => {
            this._img.style.animation = "";
          }, 400),
          this._options.updateViewImage(this);
      }),
      (this._image.onerror = (t) => {
        this.hideLoading(), this.showMsg("加载失败！");
      });
  }
  // 关闭
  close() {
    (this._style.innerHTML = M({
      zoom_reverse_scale: this._scale,
    })),
      (this._msg.style.display = "none"),
      (this._img.style.animation = "zoom_reverse 0.5s"),
      (this._el.style.animation = "opacity_reverse 0.5s linear"),
      setTimeout(() => {
        (this._el.style.display = "none"),
          (this._img.style.animation = ""),
          this._watchClose();
      }, 400);
  }
  // 显示加载动效
  showLoading() {
    this._loading
      ? (this._loading.style.display = "inline-block")
      : (this._loading = this.createTag({
          tagName: "span",
          parentTag: this._el,
          style: {
            display: "inline-block",
            position: "fixed",
            top: "50%",
            left: "50%",
            width: "50px",
            height: "50px",
            "border-top": "2px solid" + S,
            "border-left": "2px solid" + S,
            "border-bottom": "2px solid" + S,
            "border-right": "2px solid rgba(0,0,0,0)",
            "border-radius": "50%",
            animation: "rotate 0.5s linear infinite",
            transform: " translate(-50%,-50%)",
          },
        }));
  }
  // 隐藏加载动效
  hideLoading() {
    this._loading.style.display = "none";
  }
  // 悬浮形式左右切换按钮
  onmouseover() {
    this._timeoutMove && clearTimeout(this._timeoutMove),
      (this._left.style.display = "flex"),
      (this._right.style.display = "flex"),
      (this._left.style.animation = "move 0.5s"),
      (this._right.style.animation = "move_reverse 0.5s"),
      (this._timeoutMove = setTimeout(() => {
        (this._left.style.animation = "opacity_reverse 0.5s"),
          (this._right.style.animation = "opacity_reverse 0.5s"),
          (this._timeoutMove = setTimeout(() => {
            (this._left.style.display = "none"),
              (this._right.style.display = "none");
          }, 400));
      }, 3e3));
  }
}
const At = {
  __name: "index",
  props: {
    show: {
      type: Boolean,
      default: !1,
    },
    isClickMask: {
      type: Boolean,
      default: !0,
    },
    isAutoSize: {
      type: Boolean,
      default: !0,
    },
    pct: {
      type: Number,
      default: 100,
    },
    imgs: {
      type: Array,
      default: () => [],
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  emits: ["update:show", "closed"],
  setup(o, { emit: t }) {
    const e = o;
    let i = null;
    return (
      z(
        () => e.show,
        (s) => {
          s &&
            $(() => {
              (i = new Wt({
                isClickMask: e.isClickMask,
                isAutoSize: e.isAutoSize,
                pct: e.pct / 100,
                watchClose: () => {
                  t("update:show"),
                    t("closed"),
                    i._el && i._el.remove(),
                    (i = null);
                },
              })),
                i.setImg(e.imgs, e.index);
            });
        },
        {
          immediate: !0,
        }
      ),
      E(() => {
        i = null;
      }),
      () => {}
    );
  },
};
let Et = [et, nt, ht, dt, ut, pt, yt, Mt, At],
  Ot = [Lt];
const Pt = (o) => {
  try {
    Et.forEach((t) => {
      o.component(t.name, t);
    }),
      Ot.forEach((t) => {
        o.directive(t.name, t);
      }),
      H("YikUi 指令和组件，已全局注册.");
  } catch {
    H("YikUi 指令和组件，全局注册失败.", "error");
  }
};
let Ft = { install: Pt };
export {
  yt as YikHorizontalScreen,
  pt as YikIsKeyboard,
  ut as YikMarquee,
  dt as YikMaxView,
  Mt as YikScroll,
  ht as YikSign,
  nt as YikTab,
  et as YikTabs,
  Ft as YikUi,
  At as YikViewImage,
  Ut as useDebounce,
  Vt as useMitt,
  jt as useResize,
  qt as useThrottle,
  wt as useWatchDom,
  xt as useWatchViewArea,
  Dt as yikIsPhone,
};
