import {
  reactive,
  onUnmounted,
  toRefs,
  watch,
  ref,
  onMounted,
  openBlock,
  createElementBlock,
  renderSlot,
  createElementVNode,
  withDirectives,
  createTextVNode,
  vShow,
  getCurrentInstance,
  onBeforeUnmount,
  normalizeStyle,
  watchEffect,
  nextTick,
  shallowRef,
  useSlots,
  createCommentVNode,
  useCssVars,
  Fragment,
  renderList,
  unref,
  createBlock,
  resolveDynamicComponent,
  normalizeClass,
} from "vue";
const YikPower = {
  mounted(s, e) {
    const t = e.modifiers,
      { values: i, value: o, callback: n } = e.value;
    let l = 0;
    i.forEach((h) => {
      h == o && l++;
    }),
      l == 0 &&
        (t["v-show"] ? (s.style.display = "none") : (t["v-if"], s.remove())),
      n && n(l);
  },
};
function parentNode(s) {
  const e = document.defaultView.getComputedStyle(s);
  return e["overflow-y"] == "auto" || e.overflow == "auto"
    ? s
    : parentNode(s.parentNode);
}
const YikLazy = {
  mounted(s, e, t) {
    const i = parentNode(s.parentNode),
      { arg: o, value: n, modifiers: l } = e,
      { height: h } = s.parentNode.getBoundingClientRect();
    i.addEventListener("scroll", function () {
      const { top: a } = s.getBoundingClientRect();
      l.comp ? h > a && (t.ctx.props[o] = n) : h > a && (s[o || "src"] = n);
    });
  },
};
class Scroll {
  /**
   * @description:
   * @param {*} el  dom 元素
   * @param {*} watchTop 置顶时，回调
   * @param {*} watchBottom 最低时， 回调
   * @param {*} watch  滚动时，回调 top,height,direction,el
   * @return {*}
   */
  constructor({ el: e, watchTop: t, watchBottom: i, watch: o }) {
    (this._el = e),
      (this._watchTop = t),
      (this._watchBottom = i),
      (this._watch = o),
      (this._direction = ""),
      this.listening();
  }
  listening() {
    this._el.style["scroll-behavior"] = "smooth";
    let e = this._el.scrollTop;
    this._el.addEventListener("scroll", (t) => {
      this._el.scrollTop - e >= 0
        ? (this._direction = "down")
        : (this._direction = "up"),
        (e = this._el.scrollTop);
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
  setTop(e) {
    if (typeof e == "number") this._el.scrollTop = e;
    else throw new Error("setTop 形参必须是Number类型");
  }
}
const useWatchDom = (s, e, t = {}) => {
    let i = new MutationObserver((o, n) => {
      s && s(i, { mutationList: o, observer: n });
    });
    i.observe(e, t),
      onUnmounted(() => {
        i.disconnect(), (i = null);
      });
  },
  useWatchViewArea = (s, e, t = {}) => {
    let i = new IntersectionObserver((o, n) => {
      s && s(i, { entries: o, observer: n });
    }, t);
    i.observe(e),
      onUnmounted(() => {
        i.disconnect(), (i = null);
      });
  },
  state = reactive({}),
  useMitt = (s, e) => {
    switch (state[s]) {
      case void 0:
        state[s] = "";
        break;
    }
    const t = toRefs(state);
    return (
      e &&
        watch(
          () => state[s],
          (i, o) => {
            e(i, o);
          },
          {
            deep: !0,
          }
        ),
      t[s]
    );
  },
  useResize = ({
    el: s,
    gap: e = 20,
    onChange: t = null,
    onStart: i = null,
    onEnd: o = null,
  }) => {
    let n = !1,
      l = !1,
      h = null;
    const a = s.style;
    function r(f, d) {
      f && (a.width = f + "px"), d && (a.height = d + "px");
    }
    function c(f) {
      const {
          left: d,
          top: u,
          width: p,
          height: g,
        } = s.getBoundingClientRect(),
        m = f.pageX - d,
        _ = f.pageY - u;
      return { x: m, y: _, width: p, height: g };
    }
    s.addEventListener("mousedown", (f) => {
      (l = !0), i && n && l && i({ ...c(f), event: f });
    }),
      document.addEventListener("mouseup", (f) => {
        o && n && l && h != null && o({ ...c(f), event: f }),
          (l = !1),
          (n = !1),
          (h = null);
      }),
      s.addEventListener("mousemove", (f) => {
        const { x: d, y: u, width: p, height: g } = c(f);
        h == null &&
          (p - e < d && g - e < u
            ? ((a.cursor = "nw-resize"), (n = !0), l && (h = 0))
            : p - e < d
            ? ((a.cursor = "w-resize"), (n = !0), l && (h = 1))
            : g - e < u
            ? ((a.cursor = "ns-resize"), (n = !0), l && (h = 2))
            : (a.cursor = "default"));
      }),
      document.addEventListener("mousemove", (f) => {
        const { x: d, y: u, width: p, height: g } = c(f);
        if (n && l)
          switch ((t && t({ x: d, y: u, width: p, height: g, event: f }), h)) {
            case 0:
              r(d, u);
              break;
            case 1:
              r(d);
              break;
            case 2:
              r(null, u);
              break;
          }
      });
  },
  useDebounce = (s, e) => {
    let t;
    return function (...i) {
      clearTimeout(t),
        (t = setTimeout(() => {
          s.apply(this, i);
        }, e));
    };
  },
  useThrottle = (s, e) => {
    let t;
    return function (...i) {
      t ||
        (t = setTimeout(() => {
          (t = null), s.apply(this, i);
        }, e));
    };
  },
  index_vue_vue_type_style_index_0_scope_true_lang$1 = "",
  _hoisted_1$4 = { class: "loading" },
  _hoisted_2 = /* @__PURE__ */ createElementVNode(
    "span",
    { class: "spin" },
    null,
    -1
  ),
  _hoisted_3 = { class: "loading" },
  _sfc_main$9 = {
    __name: "index",
    props: {
      loading: {
        type: Boolean,
        default: !0,
      },
    },
    emits: ["onBottom", "onTop", "onWatch", "autoLoadScrollEnd"],
    setup(s, { expose: e, emit: t }) {
      let i = null,
        o = 0;
      const n = ref(null),
        l = ref(null);
      return (
        onMounted(() => {
          const r = n.value;
          (r.style["overflow-y"] = "auto"),
            (i = new Scroll({
              el: r,
              watchTop: () => {
                t("onTop");
              },
              watch: (c) => {
                t("onWatch", c);
              },
            })),
            useWatchViewArea(
              (c, { entries: f }) => {
                f[0].isIntersecting && t("onBottom");
              },
              l.value,
              {
                root: r,
              }
            );
        }),
        e({
          setScroll: (r, c = !1) => {
            if ((o++, o == 1)) {
              let f = n.value.scrollHeight;
              f > r
                ? (i.setTop(r), (o = 0))
                : c &&
                  (t("onBottom"),
                  useWatchDom(
                    (d) => {
                      (f = n.value.scrollHeight),
                        f <= r
                          ? t("onBottom")
                          : (d.disconnect(),
                            (d = null),
                            t("autoLoadScrollEnd"),
                            (o = 0),
                            i.setTop(r));
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
        onUnmounted(() => {
          i && (i = null);
        }),
        (r, c) => (
          openBlock(),
          createElementBlock(
            "div",
            {
              class: "yik-ui-page",
              ref_key: "yikUiPageRef",
              ref: n,
            },
            [
              renderSlot(r.$slots, "default"),
              createElementVNode(
                "div",
                {
                  ref_key: "loadingRef",
                  ref: l,
                },
                [
                  renderSlot(r.$slots, "loading", {}, () => [
                    withDirectives(
                      createElementVNode(
                        "p",
                        _hoisted_1$4,
                        [_hoisted_2, createTextVNode("加载中... ")],
                        512
                      ),
                      [[vShow, s.loading]]
                    ),
                  ]),
                ],
                512
              ),
              renderSlot(r.$slots, "finished", {}, () => [
                withDirectives(
                  createElementVNode("p", _hoisted_3, "没有更多了", 512),
                  [[vShow, !s.loading]]
                ),
              ]),
            ],
            512
          )
        )
      );
    },
  },
  _sfc_main$8 = {
    __name: "index",
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
      const e = s,
        t = ref(null);
      let i = null;
      const o = getCurrentInstance(),
        n = () => {
          const l = o.refs.maxView.parentNode;
          let h = t.value,
            a = parseInt(h.style.width),
            r = parseInt(h.style.height);
          if (e.isCover) {
            (l.style.width = window.innerWidth + "px"),
              (l.style.height = window.innerHeight + "px"),
              (l.style.display = "flex"),
              (l.style.justifyContent = "center");
            const c =
              window.innerWidth / window.innerHeight < a / r
                ? window.innerWidth / a
                : window.innerHeight / r;
            h.style.transform = `scale(${c})`;
          } else {
            let c = window.innerWidth / a,
              f = window.innerHeight / r;
            h.style.transform = `scale(${c},${f})`;
          }
        };
      return (
        onMounted(() => {
          (document.body.style.overflow = "hidden"),
            (document.body.style.margin = "0"),
            (t.value.style.transition = "transform 0.5s"),
            (t.value.style["box-sizing"] = "border-box"),
            n(),
            (window.onresize = () => {
              i && clearTimeout(i),
                (i = setTimeout(() => {
                  n();
                }, 500));
            });
        }),
        onBeforeUnmount(() => {
          window.onresize = null;
        }),
        (l, h) => (
          openBlock(),
          createElementBlock(
            "div",
            {
              ref_key: "maxView",
              ref: t,
              class: "yik-ui-max-view",
              style: normalizeStyle({
                width: s.width,
                height: s.height,
                transformOrigin: (s.isCover ? "center" : "left") + " top",
              }),
            },
            [renderSlot(l.$slots, "default")],
            4
          )
        )
      );
    },
  };
class Sign {
  constructor({
    el: e,
    // canvas dom
    lineWidth: t = 3,
    // 线条宽度
    color: i = "#0088ff",
    //线条颜色
    bg: o,
    // 背景颜色或者背景图片
    watch: n,
  }) {
    (this.canvas = e),
      (this.ctx = this.canvas.getContext("2d")),
      (this._watch = n),
      (this.isDraw = !1),
      (this.lineWidth = t),
      (this.color = i),
      (this.bg = o),
      (this._array = []),
      this.onInit(),
      this.drawing(),
      this.initBg();
  }
  // 回显
  setEchoArr(e) {
    e && Array.isArray(e)
      ? (this._array.push(...e),
        e.forEach((t) => {
          t.length &&
            t.forEach((i) => {
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
        const e = new Image();
        e.setAttribute("crossOrigin", "Anonymous"),
          (e.src = this.bg),
          (e.onload = () => {
            this.ctx.drawImage(
              e,
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
    const e = this.recurveOffset(this.canvas, "offsetLeft", 0),
      t = this.recurveOffset(this.canvas, "offsetTop", 0);
    (this.canvas.onmousemove = (i) => {
      if (this.isDraw) {
        const o = i.pageX - e,
          n = i.pageY - t;
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
  recurveOffset(e, t, i) {
    return (
      e[t] && (i += e[t]),
      e.offsetParent &&
        e.tagName != "BODY" &&
        (i = this.recurveOffset(e.offsetParent, t, i)),
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
const _hoisted_1$3 = ["width", "height"],
  _sfc_main$7 = {
    __name: "index",
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
    setup(s, { expose: e }) {
      const t = s,
        i = ref(null);
      let o = [],
        n = null,
        l = null;
      onMounted(() => {
        l = watchEffect(() => {
          t.lineWidth &&
            t.color &&
            t.bg &&
            nextTick(() => {
              h();
            });
        });
      });
      const h = () => {
        n && ((o = []), (n = null)),
          (n = new Sign({
            el: i.value,
            color: t.color,
            lineWidth: t.lineWidth,
            bg: t.bg,
            watch: (a) => {
              o = [...a];
            },
          })),
          t.value && ((o = [...t.value]), n.setEchoArr(t.value));
      };
      return (
        onUnmounted(() => {
          l(), n && (n = null);
        }),
        e({
          save: () => n.save(),
          clear: () => {
            (o = []), n.clear();
          },
          getLine: () => o,
        }),
        (a, r) => (
          openBlock(),
          createElementBlock(
            "canvas",
            {
              width: s.width,
              height: s.height,
              ref_key: "yikSignRef",
              ref: i,
            },
            null,
            8,
            _hoisted_1$3
          )
        )
      );
    },
  },
  _sfc_main$6 = {
    __name: "index",
    props: {
      isHideSlot: {
        type: Boolean,
        default: !0,
      },
    },
    emits: ["onOpen", "onClose"],
    setup(s, { emit: e }) {
      const t = s,
        i = shallowRef(!0),
        o = useSlots(),
        n = () => {
          const a = [
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
            r = navigator.userAgent;
          for (let c of a)
            if (c.test(r))
              return {
                phone: !0,
                message: c,
              };
          return {
            phone: !1,
          };
        },
        l = (a) => {
          o.default && t.isHideSlot && (i.value = a);
        },
        h = () => {
          const a = window.innerHeight;
          n().message == "/iPhone/"
            ? (window.addEventListener("focusin", () => {
                e("open"), l(!1);
              }),
              window.addEventListener("focusout", () => {
                e("close"), l(!0);
              }))
            : window.addEventListener("resize", () => {
                const r = window.innerHeight;
                a > r ? (e("open"), l(!1)) : (e("close"), l(!0));
              });
        };
      return (
        onMounted(() => {
          h();
        }),
        (a, r) =>
          i.value
            ? renderSlot(a.$slots, "default", { key: 0 })
            : createCommentVNode("", !0)
      );
    },
  },
  _sfc_main$5 = {
    __name: "index",
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
      const e = s,
        t = ref(null),
        i = shallowRef(0),
        o = shallowRef(!1);
      let n = 0,
        l = 0;
      onMounted(() => {
        nextTick(() => {
          const r = t.value;
          if (
            ((t.value.style.overflow = "hidden"),
            e.direction == "Y" && ((n = r.children[0].clientHeight), a()),
            e.direction == "X")
          ) {
            r.style.display = "flex";
            for (let c = 0; c < r.children.length; c++) {
              const f = r.children[c];
              f.style["white-space"] = "nowrap";
            }
            (l = r.children[0].scrollWidth), h();
          }
        });
      });
      const h = (r) => {
          (t.value.children[0].style.transform = `translateX(-${i.value}px)`),
            (t.value.children[1].style.transform = `translateX(-${i.value}px)`),
            l <= r ? (i.value = 0) : (i.value += e.speed),
            o.value ||
              window.requestAnimationFrame(() => {
                h(i.value);
              });
        },
        a = (r) => {
          (t.value.children[0].style.transform = `translateY(-${i.value}px)`),
            (t.value.children[1].style.transform = `translateY(-${i.value}px)`),
            n <= r ? (i.value = 0) : (i.value += e.speed),
            o.value ||
              window.requestAnimationFrame(() => {
                a(i.value);
              });
        };
      return (r, c) => (
        openBlock(),
        createElementBlock(
          "div",
          {
            class: "yik-marquee",
            ref_key: "yikMarqueeRef",
            ref: t,
            onMouseenter: c[0] || (c[0] = (f) => (o.value = !0)),
            onMouseleave:
              c[1] ||
              (c[1] = () => {
                (o.value = !1),
                  s.direction == "Y" && a(),
                  s.direction == "X" && h();
              }),
          },
          [renderSlot(r.$slots, "default"), renderSlot(r.$slots, "default")],
          544
        )
      );
    },
  };
class Drag {
  /**
   * @description:
   * @param {*} isBody 是否挂在在body标签下
   * @param {*} watch 监听当前元素定位 回调 x,y,xMax,yMax
   * @param {*} boundWatch 监听当天元素是否碰到父元素边界
   * @return {*}
   */
  constructor({
    el: e,
    isBody: t = !1,
    watch: i = () => {},
    boundWatch: o = () => {},
    isBound: n = !0,
  }) {
    (this._el = e),
      (this._watch = i),
      (this._boundWatch = o),
      (this._isBody = t),
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
    let e = 0,
      t = 0;
    const i = (o) => {
      o.stopPropagation();
      const n = this.recursionParentNode(this._el.parentNode);
      let l = 0,
        h = 0;
      if (n.tagName == "BODY")
        (l = window.innerWidth), (h = window.innerHeight);
      else {
        const { width: d, height: u } = n.getBoundingClientRect();
        (l = d), (h = u);
      }
      const a = o.pageX - e,
        r = o.pageY - t,
        c = h - this._el.getBoundingClientRect().height,
        f = l - this._el.getBoundingClientRect().width;
      a >= 0 &&
        r >= 0 &&
        r <= c &&
        a <= f &&
        this._watch({
          x: a,
          y: r,
          yMax: c,
          xMax: f,
        }),
        a <= 0
          ? ((this._el.style.left = "0px"),
            r >= 0 && r <= c && (this._el.style.top = r + "px"),
            this._boundWatch("left"))
          : r <= 0
          ? ((this._el.style.top = "0px"),
            a >= 0 && a <= f && (this._el.style.left = a + "px"),
            this._boundWatch("top"))
          : a <= f
          ? ((this._el.style.top = c + "px"),
            a >= 0 && a <= f && (this._el.style.left = a + "px"),
            this._boundWatch("bottom"))
          : r <= c &&
            ((this._el.style.left = f + "px"),
            r >= 0 && r <= c && (this._el.style.top = r + "px"),
            this._boundWatch("right")),
        this._isBound
          ? a >= 0 &&
            r >= 0 &&
            r <= c &&
            a <= f &&
            ((this._el.style.left = a + "px"), (this._el.style.top = r + "px"))
          : ((this._el.style.left = a + "px"), (this._el.style.top = r + "px"));
    };
    this._el.addEventListener("mousedown", (o) => {
      o.preventDefault(),
        o.stopPropagation(),
        (e = o.pageX - this._el.offsetLeft),
        (t = o.pageY - this._el.offsetTop),
        document.addEventListener("mousemove", i);
    }),
      this._el.addEventListener("mouseup", (o) => {
        o.stopPropagation(), document.removeEventListener("mousemove", i);
      });
  }
  // 一直向上父元素查找，一直知道position ：relative style
  recursionParentNode(e) {
    return getComputedStyle(e) && getComputedStyle(e).position != "relative"
      ? this.recursionParentNode(e.parentNode)
      : e;
  }
}
const closeIcon =
    '<svg t="1680920604134" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3391" width="32" height="32"><path d="M570 510.8l254.9-255.1c16.4-16.5 16.4-43 0-59.5s-43-16.5-59.5 0L510.5 451.3 255.8 196.2c-16.4-16.5-43-16.5-59.5 0-16.4 16.5-16.4 43 0 59.5l254.9 255.1-254.9 255c-16.4 16.5-16.4 43 0 59.5 8.1 8.2 18.9 12.4 29.7 12.4s21.5-4.1 29.7-12.4l254.7-255 254.8 255c8.1 8.2 19 12.4 29.7 12.4 10.8 0 21.5-4.1 29.6-12.4 16.4-16.5 16.4-43 0-59.5L570 510.8z m0 0" p-id="3392" fill="#ffffff"></path></svg>',
  leftIcon =
    '<svg t="1680879453428" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3782" width="32" height="32"><path d="M358.997333 512l396.544-396.458667a42.666667 42.666667 0 1 0-60.416-60.416l-426.666666 426.666667a42.666667 42.666667 0 0 0 0 60.416l426.666666 426.666667a42.666667 42.666667 0 1 0 60.416-60.416L358.997333 512z" fill="#ffffff" p-id="3783"></path></svg>',
  rightIcon =
    '<svg t="1680879474772" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="970" width="32" height="32"><path d="M665.002667 512L268.458667 115.541333a42.666667 42.666667 0 1 1 60.416-60.416l426.666666 426.666667a42.666667 42.666667 0 0 1 0 60.416l-426.666666 426.666667a42.666667 42.666667 0 1 1-60.416-60.416L665.002667 512z" fill="#ffffff" p-id="971"></path></svg>',
  restoreIcon =
    '<svg t="1680969261988" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2989" width="27" height="27"><path d="M316 672h60c4.4 0 8-3.6 8-8V360c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v304c0 4.4 3.6 8 8 8zM512 622c22.1 0 40-17.9 40-39 0-23.1-17.9-41-40-41s-40 17.9-40 41c0 21.1 17.9 39 40 39zM512 482c22.1 0 40-17.9 40-39 0-23.1-17.9-41-40-41s-40 17.9-40 41c0 21.1 17.9 39 40 39z" p-id="2990" fill="#ffffff"></path><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32z m-40 728H184V184h656v656z" p-id="2991" fill="#ffffff"></path><path d="M648 672h60c4.4 0 8-3.6 8-8V360c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v304c0 4.4 3.6 8 8 8z" p-id="2992" fill="#ffffff"></path></svg>',
  rotateIcon =
    '<svg t="1681008988742" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8577" width="25" height="25"><path d="M909.1 209.3l-56.4 44.1C775.8 155.1 656.2 92 521.9 92 290 92 102.3 279.5 102 511.5 101.7 743.7 289.8 932 521.9 932c181.3 0 335.8-115 394.6-276.1 1.5-4.2-0.7-8.9-4.9-10.3l-56.7-19.5c-4.1-1.4-8.6 0.7-10.1 4.8-1.8 5-3.8 10-5.9 14.9-17.3 41-42.1 77.8-73.7 109.4-31.6 31.6-68.4 56.4-109.3 73.8-42.3 17.9-87.4 27-133.8 27-46.5 0-91.5-9.1-133.8-27-40.9-17.3-77.7-42.1-109.3-73.8-31.6-31.6-56.4-68.4-73.7-109.4-17.9-42.4-27-87.4-27-133.9s9.1-91.5 27-133.9c17.3-41 42.1-77.8 73.7-109.4 31.6-31.6 68.4-56.4 109.3-73.8 42.3-17.9 87.4-27 133.8-27 46.5 0 91.5 9.1 133.8 27 40.9 17.3 77.7 42.1 109.3 73.8 9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47c-5.3 4.1-3.5 12.5 3 14.1l175.6 43c5 1.2 9.9-2.6 9.9-7.7l0.8-180.9c-0.1-6.6-7.8-10.3-13-6.2z" p-id="8578" fill="#ffffff"></path></svg>',
  upAndDownIcon =
    '<svg t="1681024383164" class="icon" viewBox="0 0 1275 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2647" width="26" height="26"><path d="M434.01678069 96.35177165a94.289884 94.289884 0 0 0-133.25765214 0L123.48607034 273.6248307A40.38110706 40.38110706 0 0 0 180.5243836 331.26886006l146.48246438-146.98722794v683.24832532a40.38110706 40.38110706 0 0 0 80.76221328 0V184.28163212L554.25152647 331.26886006c0.60571692 0.70666946 1.31238556 1.31238556 2.01905503 2.01905585a40.38110706 40.38110706 0 0 0 55.01925824-59.15832165zM1151.48809462 650.58246162a40.38110706 40.38110706 0 0 0-57.03831326-2.01905503 19.08007305 19.08007305 0 0 0-2.01905503 2.01905503l-146.28055929 146.38151184V113.71564814a40.38110706 40.38110706 0 0 0-80.76221329 0v683.24832532l-146.38151184-146.38151184a40.38110706 40.38110706 0 0 0-59.15832166 55.01925824l2.01905502 2.01905503 177.37401161 177.27305822a93.98702554 93.98702554 0 0 0 133.15669958 0l177.27305823-177.27305822a40.38110706 40.38110706 0 0 0 1.81714993-57.03831327z" p-id="2648" fill="#ffffff"></path></svg>',
  leftAndRight =
    '<svg t="1681024308661" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2241" width="22" height="22"><path d="M356.67458 1012.46055a39.345183 39.345183 0 0 1-55.673434 0L127.783977 839.636832a91.77264 91.77264 0 0 1 0-129.740741l172.725354-172.725354a39.345183 39.345183 0 0 1 57.640694 53.607812c-0.688541 0.688541-1.278718 1.377081-1.96726 1.967259L213.458113 735.47046h665.7205a39.345183 39.345183 0 0 1 0 78.690366H213.458113L356.67458 956.787115a39.345183 39.345183 0 0 1 0 55.673435zM105.357223 250.147625a39.345183 39.345183 0 0 0 39.345183 39.345184h665.720499l-142.626289 142.724652a39.345183 39.345183 0 1 0 53.607812 57.54233l1.96726-1.967259L896.097042 314.772089a91.575914 91.575914 0 0 0 0-129.740742L723.371688 12.502719a39.345183 39.345183 0 1 0-57.542331 53.706175l1.967259 1.967259 142.626289 142.626289H144.702406a39.345183 39.345183 0 0 0-39.345183 39.345183z" p-id="2242" fill="#ffffff"></path></svg>',
  loadingColor = "#ffffff",
  createTag = ({ tagName: s, parentTag: e, style: t = {} }) => {
    const i = document.createElement(s);
    return (
      Object.keys(t).forEach((o) => {
        i.style[o] = t[o];
      }),
      e.appendChild(i),
      i
    );
  },
  styleInnerHTML = ({ zoom_reverse_scale: s = 1, zoom_scale: e = 1 }) => `
  @keyframes zoom {
      0% {
        transform: scale(0);
      }
      100% {
        transform: scale(${e});
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
class OptionsExtend {
  constructor(e) {
    (this.viewImage = e), (this._imgStyle = e._img.style), this.initOptions();
  }
  updateViewImage(e) {
    (this.viewImage = e),
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
    (this._optionTag = createTag({
      tagName: "div",
      parentTag: this.viewImage._el,
    })),
      (this._optionTag.onclick = (e) => {
        e.stopPropagation();
      }),
      (this._optionTag.className = "view-image-options-extend");
  }
  // 统计
  setTotal() {
    this._totalTag ||
      ((this._totalTag = createTag({
        tagName: "span",
        parentTag: this.viewImage._el,
      })),
      (this._totalTag.className = "view-image-options-total")),
      (this._totalTag.innerText =
        this.viewImage._index + 1 + " / " + this.viewImage._imgs.length);
  }
  // 还原图片大小
  setRestore() {
    this.createTagCommon("_restoreTag", restoreIcon, "还原图片原有尺寸", () => {
      this.viewImage._scale = 1;
    });
  }
  // 旋转功能
  setRotate() {
    this.createTagCommon("_rotateTag", rotateIcon, "图片旋转", () => {
      this._rotate += 90;
    });
  }
  // 上下对调
  setUpAndDown() {
    this.createTagCommon("_upAndDown", upAndDownIcon, "上下对调", () => {
      this._scaleY == -1 ? (this._scaleY = 1) : (this._scaleY = -1);
    });
  }
  // 左右对调
  setLeftAndRight() {
    this.createTagCommon("_leftAndRight", leftAndRight, "左右对调", () => {
      this._scaleX == -1 ? (this._scaleX = 1) : (this._scaleX = -1);
    });
  }
  createTagCommon(e, t, i, o) {
    this[e] ||
      ((this[e] = createTag({
        tagName: "span",
        style: {
          display: "flex",
          marginRight: "10px",
        },
        parentTag: this._optionTag,
      })),
      (this[e].innerHTML = t),
      (this[e].title = i),
      (this[e].onclick = (n) => {
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
class ViewImage {
  constructor(e) {
    const {
      isClickMask: t,
      isAutoSize: i,
      pct: o,
      watchClose: n,
    } = e || {
      isClickMask: !0,
      //是否开启点击蒙层关闭
      isAutoSize: !0,
      //是否开启自动计算图片宽高
      pct: 1,
      watchClose: () => {},
    };
    (this._isClickMask = t),
      (this._isAutoSize = i),
      (this._pct = o),
      (this._watchClose = n),
      (this.createTag = createTag),
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
      (this._style.innerHTML = styleInnerHTML({})),
      (this._el = this.createTag({
        tagName: "div",
        parentTag: document.body,
        style: {
          display: "none",
        },
      })),
      (this._el.className = "yik-view-image"),
      (this._el.onclick = (t) => {
        t.stopPropagation(),
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
    const e = this.createTag({
      tagName: "span",
      parentTag: this._el,
      style: {
        display: "inline-block",
      },
    });
    (e.innerHTML = closeIcon),
      (e.className = "yik-view-image_close"),
      (e.onclick = () => {
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
      (this._left.innerHTML = leftIcon),
      (this._left.onclick = (t) => {
        t.stopPropagation(),
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
      (this._right.innerHTML = rightIcon),
      (this._right.onclick = (t) => {
        t.stopPropagation(),
          this._index + 1 < this._imgs.length
            ? (this._index++, this.setSrc())
            : ((this._index = 0), this.setSrc());
      }),
      (this._img = this.createTag({
        tagName: "img",
        parentTag: this._el,
      })),
      (this._img.onclick = (t) => {
        t.stopPropagation();
      }),
      (this._img.onmousewheel = (t) => {
        t.preventDefault(),
          this._scale || (this._scale = 1),
          (this._img.style.transition = ""),
          t.deltaY > 0 && this._scale > 0.1 && (this._scale -= 8e-3),
          t.deltaY < 0 && (this._scale += 8e-3),
          this.showMsg((this._scale * 100).toFixed(0) + "%", !1),
          this._options.setTransform();
      }),
      (this._img.className = "yik-view-image_img"),
      (this._drag = new Drag({
        el: this._img,
        isBound: !1,
      })),
      (this._options = new OptionsExtend(this));
  }
  //消息提示
  showMsg(e, t = !0) {
    this._timeout && clearTimeout(this._timeout),
      (this._msg.style.display = "inline-block"),
      t &&
        ((this._msg.style.animation = "shake 0.1s linear 5"),
        setTimeout(() => {
          this._msg.style.animation = "";
        }, 500)),
      (this._msg.innerText = e),
      (this._timeout = setTimeout(() => {
        this._msg.style.display = "none";
      }, 3e3));
  }
  // 设置图片，数组
  setImg(e, t = 0) {
    (this._index = t),
      e instanceof Array
        ? (this._imgs = e)
        : e instanceof String && (this._imgs = [e]),
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
      (this._image.onload = (e) => {
        this.hideLoading();
        var t = this._image.width,
          i = this._image.height;
        if (
          ((this._img.style.left = ""),
          (this._img.style.top = ""),
          (this._img.src = this._imgs[this._index]),
          (this._img.style.width = t + "px"),
          (this._img.style.height = i + "px"),
          this._isAutoSize)
        ) {
          if (window.innerWidth < t) {
            const o = t / window.innerWidth;
            (this._scale = o / 8),
              (this._img.style.transform = `scale(${this._scale})`);
          } else if (window.innerHeight < i) {
            const o = i / window.innerHeight;
            (this._scale = o / 8),
              (this._img.style.transform = `scale(${this._scale})`);
          }
        } else this._img.style.transform = `scale(${this._scale})`;
        (this._style.innerHTML = styleInnerHTML({
          zoom_scale: this._scale,
        })),
          (this._img.style.animation = "zoom 0.5s"),
          (this._img.style.opacity = "1"),
          setTimeout(() => {
            this._img.style.animation = "";
          }, 400),
          this._options.updateViewImage(this);
      }),
      (this._image.onerror = (e) => {
        this.hideLoading(), this.showMsg("加载失败！");
      });
  }
  // 关闭
  close() {
    (this._style.innerHTML = styleInnerHTML({
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
            "border-top": "2px solid" + loadingColor,
            "border-left": "2px solid" + loadingColor,
            "border-bottom": "2px solid" + loadingColor,
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
const _sfc_main$4 = {
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
    setup(s, { emit: e }) {
      const t = s;
      let i = null;
      return (
        watch(
          () => t.show,
          (o) => {
            o &&
              nextTick(() => {
                (i = new ViewImage({
                  isClickMask: t.isClickMask,
                  isAutoSize: t.isAutoSize,
                  pct: t.pct / 100,
                  watchClose: () => {
                    e("update:show"),
                      e("closed"),
                      i._el && i._el.remove(),
                      (i = null);
                  },
                })),
                  i.setImg(t.imgs, t.index);
              });
          },
          {
            immediate: !0,
          }
        ),
        onBeforeUnmount(() => {
          i = null;
        }),
        () => {}
      );
    },
  },
  _sfc_main$3 = {
    setup(props, { slots, attrs, emit }) {
      ref(0);
      let str = attrs.strHtml;
      const html = document.createElement("div");
      html.innerHTML = str;
      let array = [],
        text = "";
      const strToObj_style = (s, e) => {
          s.getAttribute &&
            s.getAttribute("style") &&
            s
              .getAttribute("style")
              .split(";")
              .forEach((i) => {
                const o = i.split(":");
                e[o[0]] = o[1];
              });
        },
        strToObj_class = (s, e) => {
          s.getAttribute &&
            s.getAttribute("class") &&
            s
              .getAttribute("class")
              .split(" ")
              .forEach((t) => {
                e.push(t);
              });
        },
        strToObj_attr = (s, e) => {
          let t = ["id", "title", "src", "href"];
          s.getAttribute &&
            t.forEach((i, o) => {
              s.getAttribute(i) && (e[t[o]] = s.getAttribute(i));
            });
        },
        recurveHtml = (s, e) => {
          s.forEach((t) => {
            const i = [];
            let o = {},
              n = {},
              l = [],
              h = "",
              a = "";
            t.nodeName == "#text"
              ? ((a = "text"), (h = t.data))
              : (a = t.nodeName),
              strToObj_style(t, o),
              strToObj_class(t, l),
              strToObj_attr(t, n),
              e.push({
                h: {
                  start:
                    'h("' +
                    a +
                    '", {style:' +
                    JSON.stringify(o) +
                    ",class: " +
                    JSON.stringify(l) +
                    "},[",
                  h_array: h || i,
                  end: "])",
                },
              }),
              t.childNodes && recurveHtml(t.childNodes, i);
          });
        };
      recurveHtml(html.childNodes, array);
      const recurveVNode = (s) => {
        let e = "";
        return (
          s.forEach((t, i) => {
            let o = "";
            Array.isArray(t.h.h_array)
              ? (o = recurveVNode(t.h.h_array))
              : (o = t.h.h_array),
              (e +=
                t.h.start + o + t.h.end + `${s.length - 1 == i ? "" : ","}`);
          }),
          e
        );
      };
      return (text = recurveVNode(array)), () => eval(`[${text}]`);
    },
  },
  index_vue_vue_type_style_index_0_scope_true_lang = "",
  _hoisted_1$2 = { class: "yik-horizontal-screen" },
  _sfc_main$2 = {
    __name: "index",
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
      const e = s;
      useCssVars((i) => ({
        af501652: s.width,
        "48d7ac36": s.height,
      }));
      const t = ref(null);
      return (
        onMounted(() => {
          const i = t.value;
          switch (e.direction) {
            case "right":
              i.style.transform = "rotate(90deg)";
              break;
            case "left":
              i.style.transform = "rotate(-90deg)";
              break;
          }
        }),
        (i, o) => (
          openBlock(),
          createElementBlock("div", _hoisted_1$2, [
            createElementVNode(
              "div",
              {
                class: "yik-horizontal-screen-rotate",
                ref_key: "yikRotateRef",
                ref: t,
              },
              [renderSlot(i.$slots, "default")],
              512
            ),
          ])
        )
      );
    },
  },
  tabs_vue_vue_type_style_index_0_scoped_b58f9d68_lang = "",
  _export_sfc = (s, e) => {
    const t = s.__vccOpts || s;
    for (const [i, o] of e) t[i] = o;
    return t;
  },
  _hoisted_1$1 = { class: "yik-tabs" },
  _sfc_main$1 = {
    __name: "tabs",
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
    setup(s, { emit: e }) {
      const t = useSlots(),
        i = reactive({
          comps: [],
          activeItem: {},
        }),
        { comps: o, activeItem: n } = toRefs(i),
        l = (a) => {
          e("onclick", a), e("update:active", a.index);
        },
        h = (a) => {
          e("onchange", a), (i.activeItem = a);
        };
      return (
        onMounted(() => {
          let a = [];
          t.default().forEach((r) => {
            var c;
            switch ((c = r.type) == null ? void 0 : c.name) {
              case "YikTab":
                (r.uuid = Math.random().toString(16).slice(2, 8)), a.push(r);
                break;
            }
          }),
            (i.comps = a);
        }),
        (a, r) => (
          openBlock(),
          createElementBlock("div", _hoisted_1$1, [
            (openBlock(!0),
            createElementBlock(
              Fragment,
              null,
              renderList(
                unref(o),
                (c, f) => (
                  openBlock(),
                  createBlock(
                    resolveDynamicComponent(c),
                    {
                      key: c.uuid,
                      index: f,
                      active: s.active,
                      onOnclick: l,
                      onOnchange: h,
                    },
                    null,
                    40,
                    ["index", "active"]
                  )
                )
              ),
              128
            )),
            createElementVNode(
              "div",
              {
                class: normalizeClass(["yik-tabs-active", s.classNameActive]),
                style: normalizeStyle({
                  transform: `translateX(${unref(n).x}px)`,
                  height: `${unref(n).height}px`,
                  width: `${unref(n).width}px`,
                  transition: `transform ${s.duration / 1e4}s`,
                }),
              },
              [
                renderSlot(
                  a.$slots,
                  "active",
                  { row: unref(n) },
                  () => [
                    (openBlock(),
                    createBlock(
                      resolveDynamicComponent(unref(o)[unref(n).index]),
                      {
                        class: normalizeClass([s.classNameActive]),
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
  },
  YikTabs = /* @__PURE__ */ _export_sfc(_sfc_main$1, [
    ["__scopeId", "data-v-b58f9d68"],
  ]),
  tab_vue_vue_type_style_index_0_scoped_0d828ce8_lang = "",
  _sfc_main = {
    name: "YikTab",
    setup: (s, { attrs: e, emit: t, slots: i }) => {
      onMounted(() => {
        watch(
          () => e.active,
          (n, l) => {
            n == e.index &&
              o(
                {
                  target: document.getElementById("yikTabRef" + e.index),
                },
                "onchange"
              );
          },
          {
            immediate: !0,
          }
        );
      });
      const o = (n, l) => {
        const { height: h, width: a } = n.target.getBoundingClientRect(),
          r = n.target.offsetLeft;
        t(l, {
          index: e.index,
          x: r,
          height: h,
          width: a,
        });
      };
      return { handleYikTab: o, index: e.index };
    },
  },
  _hoisted_1 = ["id"];
function _sfc_render(s, e, t, i, o, n) {
  return (
    openBlock(),
    createElementBlock(
      "div",
      {
        class: "yik-tab",
        onClick:
          e[0] ||
          (e[0] = (l) => {
            s.handleYikTab(l, "onclick");
          }),
        id: "yikTabRef" + s.index,
      },
      [renderSlot(s.$slots, "default", {}, void 0, !0)],
      8,
      _hoisted_1
    )
  );
}
const YikTab = /* @__PURE__ */ _export_sfc(_sfc_main, [
    ["render", _sfc_render],
    ["__scopeId", "data-v-0d828ce8"],
  ]),
  yikLog = (s, e) => {
    let t = "";
    e == "error" ? (t = "#ff362b") : (t = "#1c8eff"),
      console.log(
        "%c" + s,
        `padding:4px 15px;background-color: ${t};color:#fff;border-radius: 10px;`
      );
  };
let components = [
    {
      name: "YikTabs",
      component: YikTabs,
    },
    {
      name: "YikTab",
      component: YikTab,
    },
    {
      name: "YikScroll",
      component: _sfc_main$9,
    },
    {
      name: "YikMaxView",
      component: _sfc_main$8,
    },
    {
      name: "YikSign",
      component: _sfc_main$7,
    },
    {
      name: "YikIsKeyboard",
      component: _sfc_main$6,
    },
    {
      name: "YikMarquee",
      component: _sfc_main$5,
    },
    {
      name: "YikViewImage",
      component: _sfc_main$4,
    },
    {
      name: "YikSupporterStrHtml",
      component: _sfc_main$3,
    },
    {
      name: "YikHorizontalScreen",
      component: _sfc_main$2,
    },
  ],
  directives = [
    {
      name: "YikPower",
      directive: YikPower,
    },
    {
      name: "YikLazy",
      directive: YikLazy,
    },
  ];
const install = (s) => {
    try {
      components.forEach((e) => {
        s.component(e.name, e.component);
      }),
        directives.forEach((e) => {
          s.directive(e.name, e.directive);
        }),
        yikLog("YikUi 指令和组件，已全局注册.");
    } catch {
      yikLog("YikUi 指令和组件，全局注册失败.", "error");
    }
  },
  YikUi = {
    install,
  },
  YikMaxView_ = _sfc_main$8,
  YikScroll_ = _sfc_main$9,
  YikSign_ = _sfc_main$7,
  YikMarquee_ = _sfc_main$5,
  YikIsKeyboard_ = _sfc_main$6,
  YikViewImage_ = _sfc_main$4,
  YikSupporterStrHtml_ = _sfc_main$3,
  YikHorizontalScreen_ = _sfc_main$2,
  YikTab_ = YikTab,
  YikTabs_ = YikTabs,
  useWatchDom_ = useWatchDom,
  useWatchViewArea_ = useWatchViewArea,
  useMitt_ = useMitt,
  useResize_ = useResize,
  useDebounce_ = useDebounce,
  useThrottle_ = useThrottle;
export {
  YikHorizontalScreen_,
  YikIsKeyboard_,
  YikMarquee_,
  YikMaxView_,
  YikScroll_,
  YikSign_,
  YikSupporterStrHtml_,
  YikTab_,
  YikTabs_,
  YikUi,
  YikViewImage_,
  useDebounce_,
  useMitt_,
  useResize_,
  useThrottle_,
  useWatchDom_,
  useWatchViewArea_,
};
