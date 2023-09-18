import {
  useSlots as W,
  reactive as F,
  toRefs as P,
  onMounted as _,
  openBlock as g,
  createElementBlock as m,
  Fragment as K,
  renderList as J,
  unref as v,
  createBlock as Y,
  resolveDynamicComponent as E,
  createElementVNode as b,
  normalizeClass as B,
  normalizeStyle as O,
  renderSlot as p,
  watch as C,
  ref as y,
  watchEffect as G,
  nextTick as N,
  onUnmounted as $,
  getCurrentInstance as Q,
  onBeforeUnmount as X,
  shallowRef as z,
  createCommentVNode as Z,
  useCssVars as tt,
  isRef as et,
  withDirectives as I,
  createTextVNode as it,
  vShow as A,
} from "vue";
const H = (s, t) => {
    let e = "";
    t == "error" ? (e = "#ff362b") : (e = "#1c8eff"),
      console.log(
        "%c" + s,
        `padding:4px 15px;background-color: ${e};color:#fff;border-radius: 10px;`
      );
  },
  Ft = () => {
    const s = [
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
    for (let e of s)
      if (e.test(t))
        return {
          phone: !0,
          message: e,
        };
    return {
      phone: !1,
    };
  };
const D = (s, t) => {
    const e = s.__vccOpts || s;
    for (const [i, o] of t) e[i] = o;
    return e;
  },
  st = { class: "yik-tabs" },
  ot = {
    name: "YikTabs",
  },
  nt = /* @__PURE__ */ Object.assign(ot, {
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
    setup(s, { emit: t }) {
      const e = W(),
        i = F({
          comps: [],
          activeItem: {},
        }),
        { comps: o, activeItem: n } = P(i),
        r = (l) => {
          t("onclick", l), t("update:active", l.index);
        },
        f = (l) => {
          t("onchange", l), (i.activeItem = l);
        };
      return (
        _(() => {
          let l = [];
          e.default().forEach((a) => {
            var c;
            switch ((c = a.type) == null ? void 0 : c.name) {
              case "YikTab":
                (a.uuid = Math.random().toString(16).slice(2, 8)), l.push(a);
                break;
            }
          }),
            (i.comps = l);
        }),
        (l, a) => (
          g(),
          m("div", st, [
            (g(!0),
            m(
              K,
              null,
              J(
                v(o),
                (c, h) => (
                  g(),
                  Y(
                    E(c),
                    {
                      key: c.uuid,
                      index: h,
                      active: s.active,
                      onOnclick: r,
                      onOnchange: f,
                    },
                    null,
                    40,
                    ["index", "active"]
                  )
                )
              ),
              128
            )),
            b(
              "div",
              {
                class: B(["yik-tabs-active", s.classNameActive]),
                style: O({
                  transform: `translateX(${v(n).x}px)`,
                  height: `${v(n).height}px`,
                  width: `${v(n).width}px`,
                  transition: `transform ${s.duration / 1e4}s`,
                }),
              },
              [
                p(
                  l.$slots,
                  "active",
                  { row: v(n) },
                  () => [
                    (g(),
                    Y(
                      E(v(o)[v(n).index]),
                      {
                        class: B([s.classNameActive]),
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
  at = /* @__PURE__ */ D(nt, [["__scopeId", "data-v-380fa830"]]);
const lt = {
    name: "YikTab",
    setup: (s, { attrs: t, emit: e, slots: i }) => {
      _(() => {
        C(
          () => t.active,
          (n, r) => {
            n == t.index &&
              o(
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
      const o = (n, r) => {
        const { height: f, width: l } = n.target.getBoundingClientRect(),
          a = n.target.offsetLeft;
        e(r, {
          index: t.index,
          x: a,
          height: f,
          width: l,
        });
      };
      return { handleYikTab: o, index: t.index };
    },
  },
  rt = ["id"];
function ct(s, t, e, i, o, n) {
  return (
    g(),
    m(
      "div",
      {
        class: "yik-tab",
        onClick:
          t[0] ||
          (t[0] = (r) => {
            s.handleYikTab(r, "onclick");
          }),
        id: "yikTabRef" + s.index,
      },
      [p(s.$slots, "default", {}, void 0, !0)],
      8,
      rt
    )
  );
}
const ht = /* @__PURE__ */ D(lt, [
  ["render", ct],
  ["__scopeId", "data-v-f63418c4"],
]);
class ft {
  constructor({
    el: t,
    // canvas dom
    lineWidth: e = 3,
    // 线条宽度
    color: i = "#0088ff",
    //线条颜色
    bg: o,
    // 背景颜色或者背景图片
    watch: n,
  }) {
    (this.canvas = t),
      (this.ctx = this.canvas.getContext("2d")),
      (this._watch = n),
      (this.isDraw = !1),
      (this.lineWidth = e),
      (this.color = i),
      (this.bg = o),
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
        const o = i.pageX - t,
          n = i.pageY - e;
        this._array[this._array.length - 1].push({
          x: o,
          y: n,
        }),
          this.ctx.lineTo(o, n),
          (this.ctx.lineJoin = "round"),
          (this.ctx.lineCap = "round"),
          (this.ctx.lineWidth = this.lineWidth),
          (this.ctx.strokeStyle = this.color),
          this.ctx.stroke();
      }
    }),
      (this.canvas.ontouchmove = (i) => {
        if (this.isDraw) {
          const o = i.touches[0].pageX - this.canvas.offsetLeft,
            n = i.touches[0].pageY - this.canvas.offsetTop;
          this._array[this._array.length - 1].push({
            x: o,
            y: n,
          }),
            this.ctx.lineTo(o, n),
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
const dt = ["width", "height"],
  ut = {
    name: "YikSign",
  },
  gt = /* @__PURE__ */ Object.assign(ut, {
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
    setup(s, { expose: t }) {
      const e = s,
        i = y(null);
      let o = [],
        n = null,
        r = null;
      _(() => {
        r = G(() => {
          e.lineWidth &&
            e.color &&
            e.bg &&
            N(() => {
              f();
            });
        });
      });
      const f = () => {
        n && ((o = []), (n = null)),
          (n = new ft({
            el: i.value,
            color: e.color,
            lineWidth: e.lineWidth,
            bg: e.bg,
            watch: (l) => {
              o = [...l];
            },
          })),
          e.value && ((o = [...e.value]), n.setEchoArr(e.value));
      };
      return (
        $(() => {
          r(), n && (n = null);
        }),
        t({
          save: () => n.save(),
          clear: () => {
            (o = []), n.clear();
          },
          getLine: () => o,
        }),
        (l, a) => (
          g(),
          m(
            "canvas",
            {
              width: s.width,
              height: s.height,
              ref_key: "yikSignRef",
              ref: i,
            },
            null,
            8,
            dt
          )
        )
      );
    },
  }),
  pt = {
    name: "YikMaxView",
  },
  mt = /* @__PURE__ */ Object.assign(pt, {
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
    setup(s) {
      const t = s,
        e = y(null);
      let i = null;
      const o = Q(),
        n = () => {
          const r = o.refs.maxView.parentNode;
          let f = e.value,
            l = parseInt(f.style.width),
            a = parseInt(f.style.height);
          if (t.isCover) {
            (r.style.width = window.innerWidth + "px"),
              (r.style.height = window.innerHeight + "px"),
              (r.style.display = "flex"),
              (r.style.justifyContent = "center");
            const c =
              window.innerWidth / window.innerHeight < l / a
                ? window.innerWidth / l
                : window.innerHeight / a;
            f.style.transform = `scale(${c})`;
          } else {
            let c = window.innerWidth / l,
              h = window.innerHeight / a;
            f.style.transform = `scale(${c},${h})`;
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
        X(() => {
          window.onresize = null;
        }),
        (r, f) => (
          g(),
          m(
            "div",
            {
              ref_key: "maxView",
              ref: e,
              class: "yik-ui-max-view",
              style: O({
                width: s.width,
                height: s.height,
                transformOrigin: (s.isCover ? "center" : "left") + " top",
              }),
            },
            [p(r.$slots, "default")],
            4
          )
        )
      );
    },
  }),
  _t = {
    name: "YikMarquee",
  },
  vt = /* @__PURE__ */ Object.assign(_t, {
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
    setup(s) {
      const t = s,
        e = y(null),
        i = z(0),
        o = z(!1);
      let n = 0,
        r = 0;
      _(() => {
        N(() => {
          const a = e.value;
          if (
            ((e.value.style.overflow = "hidden"),
            t.direction == "Y" && ((n = a.children[0].clientHeight), l()),
            t.direction == "X")
          ) {
            a.style.display = "flex";
            for (let c = 0; c < a.children.length; c++) {
              const h = a.children[c];
              h.style["white-space"] = "nowrap";
            }
            (r = a.children[0].scrollWidth), f();
          }
        });
      });
      const f = (a) => {
          (e.value.children[0].style.transform = `translateX(-${i.value}px)`),
            (e.value.children[1].style.transform = `translateX(-${i.value}px)`),
            r <= a ? (i.value = 0) : (i.value += t.speed),
            o.value ||
              window.requestAnimationFrame(() => {
                f(i.value);
              });
        },
        l = (a) => {
          (e.value.children[0].style.transform = `translateY(-${i.value}px)`),
            (e.value.children[1].style.transform = `translateY(-${i.value}px)`),
            n <= a ? (i.value = 0) : (i.value += t.speed),
            o.value ||
              window.requestAnimationFrame(() => {
                l(i.value);
              });
        };
      return (a, c) => (
        g(),
        m(
          "div",
          {
            class: "yik-marquee",
            ref_key: "yikMarqueeRef",
            ref: e,
            onMouseenter: c[0] || (c[0] = (h) => (o.value = !0)),
            onMouseleave:
              c[1] ||
              (c[1] = () => {
                (o.value = !1),
                  s.direction == "Y" && l(),
                  s.direction == "X" && f();
              }),
          },
          [p(a.$slots, "default"), p(a.$slots, "default")],
          544
        )
      );
    },
  }),
  yt = {
    name: "YikIsKeyboard",
  },
  wt = /* @__PURE__ */ Object.assign(yt, {
    props: {
      isHideSlot: {
        type: Boolean,
        default: !0,
      },
    },
    emits: ["onOpen", "onClose"],
    setup(s, { emit: t }) {
      const e = s,
        i = z(!0),
        o = W(),
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
          for (let c of l)
            if (c.test(a))
              return {
                phone: !0,
                message: c,
              };
          return {
            phone: !1,
          };
        },
        r = (l) => {
          o.default && e.isHideSlot && (i.value = l);
        },
        f = () => {
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
          f();
        }),
        (l, a) => (i.value ? p(l.$slots, "default", { key: 0 }) : Z("", !0))
      );
    },
  });
const xt = { class: "yik-horizontal-screen" },
  bt = {
    name: "YikHorizontalScroll",
  },
  kt = /* @__PURE__ */ Object.assign(bt, {
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
    setup(s) {
      const t = s;
      tt((i) => ({
        "377eea16": s.width,
        ebfc4c50: s.height,
      }));
      const e = y(null);
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
        (i, o) => (
          g(),
          m("div", xt, [
            b(
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
class Tt {
  /**
   * @description:
   * @param {*} el  dom 元素
   * @param {*} watchTop 置顶时，回调
   * @param {*} watchBottom 最低时， 回调
   * @param {*} watch  滚动时，回调 top,height,direction,el
   * @return {*}
   */
  constructor({ el: t, watchTop: e, watchBottom: i, watch: o }) {
    (this._el = t),
      (this._watchTop = e),
      (this._watchBottom = i),
      (this._watch = o),
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
      let o = this._el.scrollHeight - this._el.clientHeight;
      this._watch &&
        this._watch({
          top: this._el.scrollTop,
          height: o,
          direction: this._direction,
          el: this._el,
        }),
        this._el.scrollTop <= 0 && this._watchTop && this._watchTop(),
        this._el.scrollTop >= o && this._watchBottom && this._watchBottom();
    });
  }
  // 设置滚动条值
  setTop(t) {
    if (typeof t == "number") this._el.scrollTop = t;
    else throw new Error("setTop 形参必须是Number类型");
  }
}
const St = (s, t, e = {}) => {
    let i = new MutationObserver((o, n) => {
      s && s(i, { mutationList: o, observer: n });
    });
    i.observe(t, e),
      $(() => {
        i.disconnect(), (i = null);
      });
  },
  $t = (s, t, e = {}) => {
    let i = new IntersectionObserver((o, n) => {
      s && s(i, { entries: o, observer: n });
    }, e);
    i.observe(t),
      $(() => {
        i.disconnect(), (i = null);
      });
  },
  Kt = (s, t) => {
    switch (state[s]) {
      case void 0:
        state[s] = "";
        break;
    }
    const e = P(state);
    return (
      t &&
        C(
          () => state[s],
          (i, o) => {
            t(i, o);
          },
          {
            deep: !0,
          }
        ),
      e[s]
    );
  },
  Jt = ({
    el: s,
    gap: t = 20,
    onChange: e = null,
    onStart: i = null,
    onEnd: o = null,
  }) => {
    let n = !1,
      r = !1,
      f = null;
    const l = s.style;
    function a(h, d) {
      h && (l.width = h + "px"), d && (l.height = d + "px");
    }
    function c(h) {
      const {
          left: d,
          top: u,
          width: w,
          height: x,
        } = s.getBoundingClientRect(),
        j = h.pageX - d,
        q = h.pageY - u;
      return { x: j, y: q, width: w, height: x };
    }
    s.addEventListener("mousedown", (h) => {
      (r = !0), i && n && r && i({ ...c(h), event: h });
    }),
      document.addEventListener("mouseup", (h) => {
        o && n && r && f != null && o({ ...c(h), event: h }),
          (r = !1),
          (n = !1),
          (f = null);
      }),
      s.addEventListener("mousemove", (h) => {
        const { x: d, y: u, width: w, height: x } = c(h);
        f == null &&
          (w - t < d && x - t < u
            ? ((l.cursor = "nw-resize"), (n = !0), r && (f = 0))
            : w - t < d
            ? ((l.cursor = "w-resize"), (n = !0), r && (f = 1))
            : x - t < u
            ? ((l.cursor = "ns-resize"), (n = !0), r && (f = 2))
            : (l.cursor = "default"));
      }),
      document.addEventListener("mousemove", (h) => {
        const { x: d, y: u, width: w, height: x } = c(h);
        if (n && r)
          switch ((e && e({ x: d, y: u, width: w, height: x, event: h }), f)) {
            case 0:
              a(d, u);
              break;
            case 1:
              a(d);
              break;
            case 2:
              a(null, u);
              break;
          }
      });
  },
  Gt = (s, t) => {
    let e;
    return function (...i) {
      clearTimeout(e),
        (e = setTimeout(() => {
          s.apply(this, i);
        }, t));
    };
  },
  Qt = (s, t) => {
    let e;
    return function (...i) {
      e ||
        (e = setTimeout(() => {
          (e = null), s.apply(this, i);
        }, t));
    };
  };
let k = {
    auth: {
      type: Array,
      message: "一维数组Array",
    },
  },
  V = {};
const Zt = (s) => {
    if (s instanceof Object)
      Object.keys(s).forEach((t) => {
        var e;
        if (k[t] && s[t] instanceof k[t].type) V = s;
        else
          throw (e = k[t]) != null && e.message
            ? new Error("global:" + t + "类型错误,应该是" + k[t].message)
            : new Error("无效的：" + t);
      });
    else throw new Error("global 需要传入一个对象 {}", "error");
  },
  T = (s) => {
    if (s.nodeType) s.remove();
    else throw new Error("不是dom节点，无法操作");
  },
  R = (s, t, e) => {
    var i, o;
    if (t instanceof Array) {
      let n = 0;
      t.forEach((r) => {
        s.includes(r) && n++;
      }),
        n == 0 &&
          ((i = e.value) != null && i.$el ? T(e.value.$el) : T(e.value));
    } else
      s.includes(t) ||
        ((o = e.value) != null && o.$el ? T(e.value.$el) : T(e.value));
  };
function te(s, t) {
  const e = V.auth;
  if (et(s))
    s.value instanceof Array
      ? s.value.forEach((i) => {
          const o = i[t.ref],
            n = i[t.power];
          o && n && R(e, n, y(o));
        })
      : R(e, t, s);
  else throw new Error("您传入的不是一个ref响应式");
}
const Mt = { class: "loading" },
  Lt = /* @__PURE__ */ b("span", { class: "spin" }, null, -1),
  zt = { class: "loading" },
  Ct = {
    name: "YikScroll",
  },
  Nt = /* @__PURE__ */ Object.assign(Ct, {
    props: {
      loading: {
        type: Boolean,
        default: !0,
      },
    },
    emits: ["onBottom", "onTop", "onWatch", "autoLoadScrollEnd"],
    setup(s, { expose: t, emit: e }) {
      let i = null,
        o = 0;
      const n = y(null),
        r = y(null);
      return (
        _(() => {
          const a = n.value;
          (a.style["overflow-y"] = "auto"),
            (i = new Tt({
              el: a,
              watchTop: () => {
                e("onTop");
              },
              watch: (c) => {
                e("onWatch", c);
              },
            })),
            $t(
              (c, { entries: h }) => {
                h[0].isIntersecting && e("onBottom");
              },
              r.value,
              {
                root: a,
              }
            );
        }),
        t({
          setScroll: (a, c = !1) => {
            if ((o++, o == 1)) {
              let h = n.value.scrollHeight;
              h > a
                ? (i.setTop(a), (o = 0))
                : c &&
                  (e("onBottom"),
                  St(
                    (d) => {
                      (h = n.value.scrollHeight),
                        h <= a
                          ? e("onBottom")
                          : (d.disconnect(),
                            (d = null),
                            e("autoLoadScrollEnd"),
                            (o = 0),
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
        $(() => {
          i && (i = null);
        }),
        (a, c) => (
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
              b(
                "div",
                {
                  ref_key: "loadingRef",
                  ref: r,
                },
                [
                  p(a.$slots, "loading", {}, () => [
                    I(b("p", Mt, [Lt, it("加载中... ")], 512), [
                      [A, s.loading],
                    ]),
                  ]),
                ],
                512
              ),
              p(a.$slots, "finished", {}, () => [
                I(b("p", zt, "没有更多了", 512), [[A, !s.loading]]),
              ]),
            ],
            512
          )
        )
      );
    },
  });
function U(s) {
  const t = document.defaultView.getComputedStyle(s);
  return t["overflow-y"] == "auto" || t.overflow == "auto"
    ? s
    : U(s.parentNode);
}
const Yt = {
  mounted(s, t, e) {
    const i = U(s.parentNode),
      { arg: o, value: n, modifiers: r } = t,
      { height: f } = s.parentNode.getBoundingClientRect();
    i.addEventListener("scroll", function () {
      const { top: l } = s.getBoundingClientRect();
      r.comp ? f > l && (e.ctx.props[o] = n) : f > l && (s[o || "src"] = n);
    });
  },
  name: "YikLazy",
};
class Et {
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
    boundWatch: o = () => {},
    isBound: n = !0,
  }) {
    (this._el = t),
      (this._watch = i),
      (this._boundWatch = o),
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
    const i = (o) => {
      o.stopPropagation();
      const n = this.recursionParentNode(this._el.parentNode);
      let r = 0,
        f = 0;
      if (n.tagName == "BODY")
        (r = window.innerWidth), (f = window.innerHeight);
      else {
        const { width: d, height: u } = n.getBoundingClientRect();
        (r = d), (f = u);
      }
      const l = o.pageX - t,
        a = o.pageY - e,
        c = f - this._el.getBoundingClientRect().height,
        h = r - this._el.getBoundingClientRect().width;
      l >= 0 &&
        a >= 0 &&
        a <= c &&
        l <= h &&
        this._watch({
          x: l,
          y: a,
          yMax: c,
          xMax: h,
        }),
        l <= 0
          ? ((this._el.style.left = "0px"),
            a >= 0 && a <= c && (this._el.style.top = a + "px"),
            this._boundWatch("left"))
          : a <= 0
          ? ((this._el.style.top = "0px"),
            l >= 0 && l <= h && (this._el.style.left = l + "px"),
            this._boundWatch("top"))
          : l <= h
          ? ((this._el.style.top = c + "px"),
            l >= 0 && l <= h && (this._el.style.left = l + "px"),
            this._boundWatch("bottom"))
          : a <= c &&
            ((this._el.style.left = h + "px"),
            a >= 0 && a <= c && (this._el.style.top = a + "px"),
            this._boundWatch("right")),
        this._isBound
          ? l >= 0 &&
            a >= 0 &&
            a <= c &&
            l <= h &&
            ((this._el.style.left = l + "px"), (this._el.style.top = a + "px"))
          : ((this._el.style.left = l + "px"), (this._el.style.top = a + "px"));
    };
    this._el.addEventListener("mousedown", (o) => {
      o.preventDefault(),
        o.stopPropagation(),
        (t = o.pageX - this._el.offsetLeft),
        (e = o.pageY - this._el.offsetTop),
        document.addEventListener("mousemove", i);
    }),
      this._el.addEventListener("mouseup", (o) => {
        o.stopPropagation(), document.removeEventListener("mousemove", i);
      });
  }
  // 一直向上父元素查找，一直知道position ：relative style
  recursionParentNode(t) {
    return getComputedStyle(t) && getComputedStyle(t).position != "relative"
      ? this.recursionParentNode(t.parentNode)
      : t;
  }
}
const Bt =
    '<svg t="1680920604134" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3391" width="32" height="32"><path d="M570 510.8l254.9-255.1c16.4-16.5 16.4-43 0-59.5s-43-16.5-59.5 0L510.5 451.3 255.8 196.2c-16.4-16.5-43-16.5-59.5 0-16.4 16.5-16.4 43 0 59.5l254.9 255.1-254.9 255c-16.4 16.5-16.4 43 0 59.5 8.1 8.2 18.9 12.4 29.7 12.4s21.5-4.1 29.7-12.4l254.7-255 254.8 255c8.1 8.2 19 12.4 29.7 12.4 10.8 0 21.5-4.1 29.6-12.4 16.4-16.5 16.4-43 0-59.5L570 510.8z m0 0" p-id="3392" fill="#ffffff"></path></svg>',
  It =
    '<svg t="1680879453428" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3782" width="32" height="32"><path d="M358.997333 512l396.544-396.458667a42.666667 42.666667 0 1 0-60.416-60.416l-426.666666 426.666667a42.666667 42.666667 0 0 0 0 60.416l426.666666 426.666667a42.666667 42.666667 0 1 0 60.416-60.416L358.997333 512z" fill="#ffffff" p-id="3783"></path></svg>',
  At =
    '<svg t="1680879474772" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="970" width="32" height="32"><path d="M665.002667 512L268.458667 115.541333a42.666667 42.666667 0 1 1 60.416-60.416l426.666666 426.666667a42.666667 42.666667 0 0 1 0 60.416l-426.666666 426.666667a42.666667 42.666667 0 1 1-60.416-60.416L665.002667 512z" fill="#ffffff" p-id="971"></path></svg>',
  Ht =
    '<svg t="1680969261988" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2989" width="27" height="27"><path d="M316 672h60c4.4 0 8-3.6 8-8V360c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v304c0 4.4 3.6 8 8 8zM512 622c22.1 0 40-17.9 40-39 0-23.1-17.9-41-40-41s-40 17.9-40 41c0 21.1 17.9 39 40 39zM512 482c22.1 0 40-17.9 40-39 0-23.1-17.9-41-40-41s-40 17.9-40 41c0 21.1 17.9 39 40 39z" p-id="2990" fill="#ffffff"></path><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32z m-40 728H184V184h656v656z" p-id="2991" fill="#ffffff"></path><path d="M648 672h60c4.4 0 8-3.6 8-8V360c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v304c0 4.4 3.6 8 8 8z" p-id="2992" fill="#ffffff"></path></svg>',
  Rt =
    '<svg t="1681008988742" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8577" width="25" height="25"><path d="M909.1 209.3l-56.4 44.1C775.8 155.1 656.2 92 521.9 92 290 92 102.3 279.5 102 511.5 101.7 743.7 289.8 932 521.9 932c181.3 0 335.8-115 394.6-276.1 1.5-4.2-0.7-8.9-4.9-10.3l-56.7-19.5c-4.1-1.4-8.6 0.7-10.1 4.8-1.8 5-3.8 10-5.9 14.9-17.3 41-42.1 77.8-73.7 109.4-31.6 31.6-68.4 56.4-109.3 73.8-42.3 17.9-87.4 27-133.8 27-46.5 0-91.5-9.1-133.8-27-40.9-17.3-77.7-42.1-109.3-73.8-31.6-31.6-56.4-68.4-73.7-109.4-17.9-42.4-27-87.4-27-133.9s9.1-91.5 27-133.9c17.3-41 42.1-77.8 73.7-109.4 31.6-31.6 68.4-56.4 109.3-73.8 42.3-17.9 87.4-27 133.8-27 46.5 0 91.5 9.1 133.8 27 40.9 17.3 77.7 42.1 109.3 73.8 9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47c-5.3 4.1-3.5 12.5 3 14.1l175.6 43c5 1.2 9.9-2.6 9.9-7.7l0.8-180.9c-0.1-6.6-7.8-10.3-13-6.2z" p-id="8578" fill="#ffffff"></path></svg>',
  Wt =
    '<svg t="1681024383164" class="icon" viewBox="0 0 1275 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2647" width="26" height="26"><path d="M434.01678069 96.35177165a94.289884 94.289884 0 0 0-133.25765214 0L123.48607034 273.6248307A40.38110706 40.38110706 0 0 0 180.5243836 331.26886006l146.48246438-146.98722794v683.24832532a40.38110706 40.38110706 0 0 0 80.76221328 0V184.28163212L554.25152647 331.26886006c0.60571692 0.70666946 1.31238556 1.31238556 2.01905503 2.01905585a40.38110706 40.38110706 0 0 0 55.01925824-59.15832165zM1151.48809462 650.58246162a40.38110706 40.38110706 0 0 0-57.03831326-2.01905503 19.08007305 19.08007305 0 0 0-2.01905503 2.01905503l-146.28055929 146.38151184V113.71564814a40.38110706 40.38110706 0 0 0-80.76221329 0v683.24832532l-146.38151184-146.38151184a40.38110706 40.38110706 0 0 0-59.15832166 55.01925824l2.01905502 2.01905503 177.37401161 177.27305822a93.98702554 93.98702554 0 0 0 133.15669958 0l177.27305823-177.27305822a40.38110706 40.38110706 0 0 0 1.81714993-57.03831327z" p-id="2648" fill="#ffffff"></path></svg>',
  Pt =
    '<svg t="1681024308661" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2241" width="22" height="22"><path d="M356.67458 1012.46055a39.345183 39.345183 0 0 1-55.673434 0L127.783977 839.636832a91.77264 91.77264 0 0 1 0-129.740741l172.725354-172.725354a39.345183 39.345183 0 0 1 57.640694 53.607812c-0.688541 0.688541-1.278718 1.377081-1.96726 1.967259L213.458113 735.47046h665.7205a39.345183 39.345183 0 0 1 0 78.690366H213.458113L356.67458 956.787115a39.345183 39.345183 0 0 1 0 55.673435zM105.357223 250.147625a39.345183 39.345183 0 0 0 39.345183 39.345184h665.720499l-142.626289 142.724652a39.345183 39.345183 0 1 0 53.607812 57.54233l1.96726-1.967259L896.097042 314.772089a91.575914 91.575914 0 0 0 0-129.740742L723.371688 12.502719a39.345183 39.345183 0 1 0-57.542331 53.706175l1.967259 1.967259 142.626289 142.626289H144.702406a39.345183 39.345183 0 0 0-39.345183 39.345183z" p-id="2242" fill="#ffffff"></path></svg>',
  M = "#ffffff",
  S = ({ tagName: s, parentTag: t, style: e = {} }) => {
    const i = document.createElement(s);
    return (
      Object.keys(e).forEach((o) => {
        i.style[o] = e[o];
      }),
      t.appendChild(i),
      i
    );
  },
  L = ({ zoom_reverse_scale: s = 1, zoom_scale: t = 1 }) => `
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
        transform: scale(${s});
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
class Ot {
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
    (this._optionTag = S({
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
      ((this._totalTag = S({
        tagName: "span",
        parentTag: this.viewImage._el,
      })),
      (this._totalTag.className = "view-image-options-total")),
      (this._totalTag.innerText =
        this.viewImage._index + 1 + " / " + this.viewImage._imgs.length);
  }
  // 还原图片大小
  setRestore() {
    this.createTagCommon("_restoreTag", Ht, "还原图片原有尺寸", () => {
      this.viewImage._scale = 1;
    });
  }
  // 旋转功能
  setRotate() {
    this.createTagCommon("_rotateTag", Rt, "图片旋转", () => {
      this._rotate += 90;
    });
  }
  // 上下对调
  setUpAndDown() {
    this.createTagCommon("_upAndDown", Wt, "上下对调", () => {
      this._scaleY == -1 ? (this._scaleY = 1) : (this._scaleY = -1);
    });
  }
  // 左右对调
  setLeftAndRight() {
    this.createTagCommon("_leftAndRight", Pt, "左右对调", () => {
      this._scaleX == -1 ? (this._scaleX = 1) : (this._scaleX = -1);
    });
  }
  createTagCommon(t, e, i, o) {
    this[t] ||
      ((this[t] = S({
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
          o && o(),
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
class Xt {
  constructor(t) {
    const {
      isClickMask: e,
      isAutoSize: i,
      pct: o,
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
      (this._pct = o),
      (this._watchClose = n),
      (this.createTag = S),
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
      (this._style.innerHTML = L({})),
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
    (t.innerHTML = Bt),
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
      (this._left.innerHTML = It),
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
      (this._right.innerHTML = At),
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
      (this._drag = new Et({
        el: this._img,
        isBound: !1,
      })),
      (this._options = new Ot(this));
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
            const o = e / window.innerWidth;
            (this._scale = o / 8),
              (this._img.style.transform = `scale(${this._scale})`);
          } else if (window.innerHeight < i) {
            const o = i / window.innerHeight;
            (this._scale = o / 8),
              (this._img.style.transform = `scale(${this._scale})`);
          }
        } else this._img.style.transform = `scale(${this._scale})`;
        (this._style.innerHTML = L({
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
    (this._style.innerHTML = L({
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
            "border-top": "2px solid" + M,
            "border-left": "2px solid" + M,
            "border-bottom": "2px solid" + M,
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
const Dt = {
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
  setup(s, { emit: t }) {
    const e = s;
    let i = null;
    return (
      C(
        () => e.show,
        (o) => {
          o &&
            N(() => {
              (i = new Xt({
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
      X(() => {
        i = null;
      }),
      () => {}
    );
  },
};
let Vt = [at, ht, gt, mt, vt, wt, kt, Nt, Dt],
  Ut = [Yt];
const jt = (s) => {
  try {
    Vt.forEach((t) => {
      s.component(t.name, t);
    }),
      Ut.forEach((t) => {
        s.directive(t.name, t);
      }),
      H("YikUi 指令和组件，已全局注册.");
  } catch {
    H("YikUi 指令和组件，全局注册失败.", "error");
  }
};
let ee = { install: jt };
export {
  kt as YikHorizontalScreen,
  wt as YikIsKeyboard,
  vt as YikMarquee,
  mt as YikMaxView,
  Nt as YikScroll,
  gt as YikSign,
  ht as YikTab,
  at as YikTabs,
  ee as YikUi,
  Dt as YikViewImage,
  Zt as global,
  te as useAuth,
  Gt as useDebounce,
  Kt as useMitt,
  Jt as useResize,
  Qt as useThrottle,
  St as useWatchDom,
  $t as useWatchViewArea,
  Ft as yikIsPhone,
};
