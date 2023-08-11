import {
  onUnmounted,
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
  watch,
} from "vue";
const YikPower = {
  mounted(el, binding) {
    const modifiers = binding.modifiers;
    const { values, value, callback } = binding.value;
    let count = 0;
    values.forEach((item) => {
      if (item == value) {
        count++;
      }
    });
    if (count == 0) {
      if (modifiers["v-show"]) {
        el.style.display = "none";
      } else if (modifiers["v-if"]) {
        el.remove();
      } else {
        el.remove();
      }
    }
    if (callback) callback(count);
  },
};
function parentNode(el) {
  const style = document.defaultView.getComputedStyle(el);
  if (style["overflow-y"] == "auto" || style["overflow"] == "auto") {
    return el;
  } else {
    return parentNode(el.parentNode);
  }
}
const YikLazy = {
  mounted(el, binding, vNode) {
    const _parentNode = parentNode(el.parentNode);
    const { arg, value, modifiers } = binding;
    const { height } = el.parentNode.getBoundingClientRect();
    _parentNode.addEventListener("scroll", function () {
      const { top } = el.getBoundingClientRect();
      if (modifiers.comp) {
        if (height > top) {
          vNode.ctx.props[arg] = value;
        }
      } else {
        if (height > top) {
          el[arg ? arg : "src"] = value;
        }
      }
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
  constructor({ el, watchTop, watchBottom, watch: watch2 }) {
    this._el = el;
    this._watchTop = watchTop;
    this._watchBottom = watchBottom;
    this._watch = watch2;
    this._direction = "";
    this.listening();
  }
  listening() {
    this._el.style["scroll-behavior"] = "smooth";
    let beforeScrollTop = this._el.scrollTop;
    this._el.addEventListener("scroll", (e) => {
      let delta = this._el.scrollTop - beforeScrollTop;
      delta >= 0 ? (this._direction = "down") : (this._direction = "up");
      beforeScrollTop = this._el.scrollTop;
      let height = this._el.scrollHeight - this._el.clientHeight;
      if (this._watch)
        this._watch({
          top: this._el.scrollTop,
          height,
          direction: this._direction,
          el: this._el,
        });
      if (this._el.scrollTop <= 0 && this._watchTop) {
        this._watchTop();
      }
      if (this._el.scrollTop >= height && this._watchBottom) {
        this._watchBottom();
      }
    });
  }
  // 设置滚动条值
  setTop(val) {
    if (typeof val == "number") {
      this._el.scrollTop = val;
    } else {
      throw new Error("setTop 形参必须是Number类型");
    }
  }
}
const yikLog = (message, type) => {
  let backgroundColor = "";
  if (type == "error") {
    backgroundColor = "#ff362b";
  } else {
    backgroundColor = "#1c8eff";
  }
  console.log(
    "%c" + message,
    `padding:4px 15px;background-color: ${backgroundColor};color:#fff;border-radius: 10px;`
  );
};
const useWatchDom = (callback, el, options = {}) => {
  let mutationObserver = new MutationObserver((mutationList, observer) => {
    if (callback) callback(mutationObserver, { mutationList, observer });
  });
  mutationObserver.observe(el, options);
  onUnmounted(() => {
    mutationObserver.disconnect();
    mutationObserver = null;
  });
};
const useWatchViewArea = (callback, el, options = {}) => {
  let intersectionObserver = new IntersectionObserver((entries, observer) => {
    if (callback) callback(intersectionObserver, { entries, observer });
  }, options);
  intersectionObserver.observe(el);
  onUnmounted(() => {
    intersectionObserver.disconnect();
    intersectionObserver = null;
  });
};
const index_vue_vue_type_style_index_0_scope_true_lang = "";
const _hoisted_1$1 = { class: "loading" };
const _hoisted_2 = /* @__PURE__ */ createElementVNode(
  "span",
  { class: "spin" },
  null,
  -1
);
const _hoisted_3 = { class: "loading" };
const _sfc_main$6 = {
  __name: "index",
  props: {
    loading: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["onBottom", "onTop", "onWatch", "autoLoadScrollEnd"],
  setup(__props, { expose: __expose, emit: emit2 }) {
    let scroll = null,
      useWatchDomCount = 0;
    const yikUiPageRef = ref(null),
      loadingRef = ref(null);
    onMounted(() => {
      const el = yikUiPageRef.value;
      el.style["overflow-y"] = "auto";
      scroll = new Scroll({
        el,
        watchTop: () => {
          emit2("onTop");
        },
        watch: (data) => {
          emit2("onWatch", data);
        },
      });
      useWatchViewArea(
        (observer, { entries }) => {
          if (entries[0].isIntersecting) {
            emit2("onBottom");
          }
        },
        loadingRef.value,
        {
          root: el,
        }
      );
    });
    const setScroll = (scrollValue, autoLoadScroll = false) => {
      useWatchDomCount++;
      if (useWatchDomCount == 1) {
        let scrollHeight = yikUiPageRef.value.scrollHeight;
        if (scrollHeight > scrollValue) {
          scroll.setTop(scrollValue);
          useWatchDomCount = 0;
        } else {
          if (autoLoadScroll) {
            emit2("onBottom");
            useWatchDom(
              (observer) => {
                scrollHeight = yikUiPageRef.value.scrollHeight;
                if (scrollHeight <= scrollValue) {
                  emit2("onBottom");
                } else {
                  observer.disconnect();
                  observer = null;
                  emit2("autoLoadScrollEnd");
                  useWatchDomCount = 0;
                  scroll.setTop(scrollValue);
                }
              },
              yikUiPageRef.value,
              {
                childList: true,
                // 观察目标子节点的变化，是否有添加或者删除
              }
            );
          }
        }
      }
    };
    const getScroll = () => {
      return yikUiPageRef.value.scrollTop;
    };
    __expose({
      setScroll,
      getScroll,
    });
    onUnmounted(() => {
      if (scroll) scroll = null;
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          "div",
          {
            class: "yik-ui-page",
            ref_key: "yikUiPageRef",
            ref: yikUiPageRef,
          },
          [
            renderSlot(_ctx.$slots, "default"),
            createElementVNode(
              "div",
              {
                ref_key: "loadingRef",
                ref: loadingRef,
              },
              [
                renderSlot(_ctx.$slots, "loading", {}, () => [
                  withDirectives(
                    createElementVNode(
                      "p",
                      _hoisted_1$1,
                      [_hoisted_2, createTextVNode("加载中... ")],
                      512
                    ),
                    [[vShow, __props.loading]]
                  ),
                ]),
              ],
              512
            ),
            renderSlot(_ctx.$slots, "finished", {}, () => [
              withDirectives(
                createElementVNode("p", _hoisted_3, "没有更多了", 512),
                [[vShow, !__props.loading]]
              ),
            ]),
          ],
          512
        )
      );
    };
  },
};
const _sfc_main$5 = {
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
      default: false,
    },
  },
  setup(__props) {
    const props2 = __props;
    const maxView = ref(null);
    let timeout = null;
    const that = getCurrentInstance();
    const zoomView = () => {
      const parentNode2 = that.refs.maxView.parentNode;
      let view = maxView.value,
        viewWidth = parseInt(view.style.width),
        viewHeight = parseInt(view.style.height);
      if (props2.isCover) {
        parentNode2.style.width = window.innerWidth + "px";
        parentNode2.style.height = window.innerHeight + "px";
        parentNode2.style.display = "flex";
        parentNode2.style.justifyContent = "center";
        const scale =
          window.innerWidth / window.innerHeight < viewWidth / viewHeight
            ? window.innerWidth / viewWidth
            : window.innerHeight / viewHeight;
        view.style.transform = `scale(${scale})`;
      } else {
        let w = window.innerWidth / viewWidth;
        let h = window.innerHeight / viewHeight;
        view.style.transform = `scale(${w},${h})`;
      }
    };
    onMounted(() => {
      document.body.style.overflow = "hidden";
      document.body.style.margin = "0";
      maxView.value.style.transition = "transform 0.5s";
      maxView.value.style["box-sizing"] = "border-box";
      zoomView();
      window.onresize = () => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
          zoomView();
        }, 500);
      };
    }),
      onBeforeUnmount(() => {
        window.onresize = null;
      });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          "div",
          {
            ref_key: "maxView",
            ref: maxView,
            class: "yik-ui-max-view",
            style: normalizeStyle({
              width: __props.width,
              height: __props.height,
              transformOrigin: (__props.isCover ? "center" : "left") + " top",
            }),
          },
          [renderSlot(_ctx.$slots, "default")],
          4
        )
      );
    };
  },
};
class Sign {
  constructor({
    el,
    // canvas dom
    lineWidth = 3,
    // 线条宽度
    color = "#0088ff",
    //线条颜色
    bg,
    // 背景颜色或者背景图片
    watch: watch2,
  }) {
    this.canvas = el;
    this.ctx = this.canvas.getContext("2d");
    this._watch = watch2;
    this.isDraw = false;
    this.lineWidth = lineWidth;
    this.color = color;
    this.bg = bg;
    this._array = [];
    this.onInit();
    this.drawing();
    this.initBg();
  }
  // 回显
  setEchoArr(echoArr) {
    if (echoArr && Array.isArray(echoArr)) {
      this._array.push(...echoArr);
      echoArr.forEach((item) => {
        if (item.length)
          item.forEach((_item) => {
            if (_item instanceof Object) {
              this.ctx.lineTo(_item.x, _item.y);
              this.ctx.lineJoin = "round";
              this.ctx.lineCap = "round";
              this.ctx.lineWidth = this.lineWidth;
              this.ctx.strokeStyle = this.color;
              this.ctx.stroke();
            }
          });
      });
    } else {
      console.error("不是集合！");
    }
  }
  //保存
  save() {
    return this.canvas.toDataURL("image/png");
  }
  //清楚绘制
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.initBg();
  }
  //设置背景色
  initBg() {
    if (this.bg)
      if (this.bg.indexOf("http") != -1) {
        const img = new Image();
        img.setAttribute("crossOrigin", "Anonymous");
        img.src = this.bg;
        img.onload = () => {
          this.ctx.drawImage(
            img,
            0,
            0,
            this.ctx.canvas.width,
            this.ctx.canvas.height
          );
        };
      } else {
        this.ctx.fillStyle = this.bg;
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      }
  }
  //开始绘制
  drawing() {
    const offsetLeft = this.recurveOffset(this.canvas, "offsetLeft", 0);
    const offsetTop = this.recurveOffset(this.canvas, "offsetTop", 0);
    this.canvas.onmousemove = (e) => {
      if (this.isDraw) {
        const x = e.pageX - offsetLeft;
        const y = e.pageY - offsetTop;
        this._array[this._array.length - 1].push({
          x,
          y,
        });
        this.ctx.lineTo(x, y);
        this.ctx.lineJoin = "round";
        this.ctx.lineCap = "round";
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.strokeStyle = this.color;
        this.ctx.stroke();
      }
    };
    this.canvas.ontouchmove = (e) => {
      if (this.isDraw) {
        const x = e.touches[0].pageX - this.canvas.offsetLeft;
        const y = e.touches[0].pageY - this.canvas.offsetTop;
        this._array[this._array.length - 1].push({
          x,
          y,
        });
        this.ctx.lineTo(x, y);
        this.ctx.lineJoin = "round";
        this.ctx.lineCap = "round";
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.strokeStyle = this.color;
        this.ctx.stroke();
      }
    };
  }
  recurveOffset(dom, key, value) {
    if (dom[key]) {
      value += dom[key];
    }
    if (dom.offsetParent && dom.tagName != "BODY") {
      value = this.recurveOffset(dom.offsetParent, key, value);
    }
    return value;
  }
  // 初始化
  onInit() {
    this.canvas.ontouchstart = () => {
      this._array.push([]);
      this.isDraw = true;
      this.ctx.beginPath();
    };
    this.canvas.ontouchend = () => {
      this.isDraw = false;
      this.ctx.closePath();
      if (this._watch) this._watch(this._array);
    };
    this.canvas.onmousedown = () => {
      this._array.push([]);
      this.isDraw = true;
      this.ctx.beginPath();
    };
    window.onmouseup = () => {
      this.isDraw = false;
      this.ctx.closePath();
    };
    this.canvas.onmouseup = () => {
      this.isDraw = false;
      this.ctx.closePath();
      if (this._watch) this._watch(this._array);
    };
  }
}
const _hoisted_1 = ["width", "height"];
const _sfc_main$4 = {
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
  setup(__props, { expose: __expose }) {
    const props2 = __props;
    const yikSignRef = ref(null);
    let lineList = [];
    let sign = null;
    let stop = null;
    onMounted(() => {
      stop = watchEffect(() => {
        if (props2.lineWidth && props2.color && props2.bg) {
          nextTick(() => {
            createSign();
          });
        }
      });
    });
    const createSign = () => {
      if (sign) {
        lineList = [];
        sign = null;
      }
      sign = new Sign({
        el: yikSignRef.value,
        color: props2.color,
        lineWidth: props2.lineWidth,
        bg: props2.bg,
        watch: (data) => {
          lineList = [...data];
        },
      });
      if (props2.value) {
        lineList = [...props2.value];
        sign.setEchoArr(props2.value);
      }
    };
    onUnmounted(() => {
      stop();
      if (sign) sign = null;
    });
    __expose({
      save: () => {
        return sign.save();
      },
      clear: () => {
        lineList = [];
        sign.clear();
      },
      getLine: () => {
        return lineList;
      },
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          "canvas",
          {
            width: __props.width,
            height: __props.height,
            ref_key: "yikSignRef",
            ref: yikSignRef,
          },
          null,
          8,
          _hoisted_1
        )
      );
    };
  },
};
const _sfc_main$3 = {
  __name: "index",
  props: {
    isHideSlot: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["onOpen", "onClose"],
  setup(__props, { emit: emit2 }) {
    const props2 = __props;
    const showSlot = shallowRef(true);
    const slots2 = useSlots();
    const isPhone = () => {
      const mobileFlags = [
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
      ];
      const ua = navigator.userAgent;
      for (let flag of mobileFlags) {
        if (flag.test(ua)) {
          return {
            phone: true,
            message: flag,
          };
        }
      }
      return {
        phone: false,
      };
    };
    const isSlotsHidden = (flag) => {
      if (slots2.default && props2.isHideSlot) {
        showSlot.value = flag;
      }
    };
    const isKeyboard = () => {
      const innerHeight = window.innerHeight;
      if (isPhone().message == "/iPhone/") {
        window.addEventListener("focusin", () => {
          emit2("open");
          isSlotsHidden(false);
        });
        window.addEventListener("focusout", () => {
          emit2("close");
          isSlotsHidden(true);
        });
      } else {
        window.addEventListener("resize", () => {
          const newInnerHeight = window.innerHeight;
          if (innerHeight > newInnerHeight) {
            emit2("open");
            isSlotsHidden(false);
          } else {
            emit2("close");
            isSlotsHidden(true);
          }
        });
      }
    };
    onMounted(() => {
      isKeyboard();
    });
    return (_ctx, _cache) => {
      return showSlot.value
        ? renderSlot(_ctx.$slots, "default", { key: 0 })
        : createCommentVNode("", true);
    };
  },
};
const _sfc_main$2 = {
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
  setup(__props) {
    const props2 = __props;
    const yikMarqueeRef = ref(null);
    const value = shallowRef(0);
    const isHovered = shallowRef(false);
    let boxHight = 0;
    let boxWidth = 0;
    onMounted(() => {
      nextTick(() => {
        const yikMarquee = yikMarqueeRef.value;
        yikMarqueeRef.value.style.overflow = "hidden";
        if (props2.direction == "Y") {
          boxHight = yikMarquee.children[0].clientHeight;
          startY();
        }
        if (props2.direction == "X") {
          yikMarquee.style.display = "flex";
          for (let index2 = 0; index2 < yikMarquee.children.length; index2++) {
            const element = yikMarquee.children[index2];
            element.style["white-space"] = "nowrap";
          }
          boxWidth = yikMarquee.children[0].scrollWidth;
          startX();
        }
      });
    });
    const startX = (_value) => {
      yikMarqueeRef.value.children[0].style.transform = `translateX(-${value.value}px)`;
      yikMarqueeRef.value.children[1].style.transform = `translateX(-${value.value}px)`;
      if (boxWidth <= _value) {
        value.value = 0;
      } else {
        value.value += props2.speed;
      }
      if (!isHovered.value)
        window.requestAnimationFrame(() => {
          startX(value.value);
        });
    };
    const startY = (_value) => {
      yikMarqueeRef.value.children[0].style.transform = `translateY(-${value.value}px)`;
      yikMarqueeRef.value.children[1].style.transform = `translateY(-${value.value}px)`;
      if (boxHight <= _value) {
        value.value = 0;
      } else {
        value.value += props2.speed;
      }
      if (!isHovered.value)
        window.requestAnimationFrame(() => {
          startY(value.value);
        });
    };
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          "div",
          {
            class: "yik-marquee",
            ref_key: "yikMarqueeRef",
            ref: yikMarqueeRef,
            onMouseenter:
              _cache[0] || (_cache[0] = ($event) => (isHovered.value = true)),
            onMouseleave:
              _cache[1] ||
              (_cache[1] = () => {
                isHovered.value = false;
                if (__props.direction == "Y") {
                  startY();
                }
                if (__props.direction == "X") {
                  startX();
                }
              }),
          },
          [
            renderSlot(_ctx.$slots, "default"),
            renderSlot(_ctx.$slots, "default"),
          ],
          544
        )
      );
    };
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
    el,
    isBody = false,
    watch: watch2 = () => {},
    boundWatch = () => {},
    isBound = true,
  }) {
    this._el = el;
    this._watch = watch2;
    this._boundWatch = boundWatch;
    this._isBody = isBody;
    this._isBound = isBound;
    this.initStyle();
    this.onEvent();
  }
  initStyle() {
    if (!this._boundWatch && typeof this._boundWatch != "function") {
      throw new Error("boundWatch形参,必须是回调函数");
    }
    if (!this._watch && typeof this._watch != "function") {
      throw new Error("watch形参,必须是回调函数");
    }
    if (this._isBody) document.body.appendChild(this._el);
    document.body.style.position = "relative";
    this._el.style.position = "absolute";
    this._el.style.cursor = "move";
    this._el.style["user-select"] = "none";
  }
  onEvent() {
    let x_temp = 0,
      y_temp = 0;
    const move = (e) => {
      e.stopPropagation();
      const parentNode2 = this.recursionParentNode(this._el.parentNode);
      let w = 0,
        h = 0;
      if (parentNode2.tagName == "BODY") {
        w = window.innerWidth;
        h = window.innerHeight;
      } else {
        const { width, height } = parentNode2.getBoundingClientRect();
        w = width;
        h = height;
      }
      const x = e.pageX - x_temp;
      const y = e.pageY - y_temp;
      const yMax = h - this._el.getBoundingClientRect().height;
      const xMax = w - this._el.getBoundingClientRect().width;
      if (x >= 0 && y >= 0 && y <= yMax && x <= xMax) {
        this._watch({
          x,
          y,
          yMax,
          xMax,
        });
      }
      if (x <= 0) {
        this._el.style.left = "0px";
        if (y >= 0 && y <= yMax) {
          this._el.style.top = y + "px";
        }
        this._boundWatch("left");
      } else if (y <= 0) {
        this._el.style.top = "0px";
        if (x >= 0 && x <= xMax) {
          this._el.style.left = x + "px";
        }
        this._boundWatch("top");
      } else if (x <= xMax) {
        this._el.style.top = yMax + "px";
        if (x >= 0 && x <= xMax) {
          this._el.style.left = x + "px";
        }
        this._boundWatch("bottom");
      } else if (y <= yMax) {
        this._el.style.left = xMax + "px";
        if (y >= 0 && y <= yMax) {
          this._el.style.top = y + "px";
        }
        this._boundWatch("right");
      }
      if (this._isBound) {
        if (x >= 0 && y >= 0 && y <= yMax && x <= xMax) {
          this._el.style.left = x + "px";
          this._el.style.top = y + "px";
        }
      } else {
        this._el.style.left = x + "px";
        this._el.style.top = y + "px";
      }
    };
    this._el.addEventListener("mousedown", (e) => {
      e.preventDefault();
      e.stopPropagation();
      x_temp = e.pageX - this._el.offsetLeft;
      y_temp = e.pageY - this._el.offsetTop;
      document.addEventListener("mousemove", move);
    });
    this._el.addEventListener("mouseup", (e) => {
      e.stopPropagation();
      document.removeEventListener("mousemove", move);
    });
  }
  // 一直向上父元素查找，一直知道position ：relative style
  recursionParentNode(el) {
    if (getComputedStyle(el) && getComputedStyle(el).position != "relative") {
      return this.recursionParentNode(el.parentNode);
    }
    return el;
  }
}
const closeIcon = `<svg t="1680920604134" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3391" width="32" height="32"><path d="M570 510.8l254.9-255.1c16.4-16.5 16.4-43 0-59.5s-43-16.5-59.5 0L510.5 451.3 255.8 196.2c-16.4-16.5-43-16.5-59.5 0-16.4 16.5-16.4 43 0 59.5l254.9 255.1-254.9 255c-16.4 16.5-16.4 43 0 59.5 8.1 8.2 18.9 12.4 29.7 12.4s21.5-4.1 29.7-12.4l254.7-255 254.8 255c8.1 8.2 19 12.4 29.7 12.4 10.8 0 21.5-4.1 29.6-12.4 16.4-16.5 16.4-43 0-59.5L570 510.8z m0 0" p-id="3392" fill="#ffffff"></path></svg>`;
const leftIcon = `<svg t="1680879453428" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3782" width="32" height="32"><path d="M358.997333 512l396.544-396.458667a42.666667 42.666667 0 1 0-60.416-60.416l-426.666666 426.666667a42.666667 42.666667 0 0 0 0 60.416l426.666666 426.666667a42.666667 42.666667 0 1 0 60.416-60.416L358.997333 512z" fill="#ffffff" p-id="3783"></path></svg>`;
const rightIcon = `<svg t="1680879474772" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="970" width="32" height="32"><path d="M665.002667 512L268.458667 115.541333a42.666667 42.666667 0 1 1 60.416-60.416l426.666666 426.666667a42.666667 42.666667 0 0 1 0 60.416l-426.666666 426.666667a42.666667 42.666667 0 1 1-60.416-60.416L665.002667 512z" fill="#ffffff" p-id="971"></path></svg>`;
const restoreIcon = `<svg t="1680969261988" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2989" width="27" height="27"><path d="M316 672h60c4.4 0 8-3.6 8-8V360c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v304c0 4.4 3.6 8 8 8zM512 622c22.1 0 40-17.9 40-39 0-23.1-17.9-41-40-41s-40 17.9-40 41c0 21.1 17.9 39 40 39zM512 482c22.1 0 40-17.9 40-39 0-23.1-17.9-41-40-41s-40 17.9-40 41c0 21.1 17.9 39 40 39z" p-id="2990" fill="#ffffff"></path><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32z m-40 728H184V184h656v656z" p-id="2991" fill="#ffffff"></path><path d="M648 672h60c4.4 0 8-3.6 8-8V360c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v304c0 4.4 3.6 8 8 8z" p-id="2992" fill="#ffffff"></path></svg>`;
const rotateIcon = `<svg t="1681008988742" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8577" width="25" height="25"><path d="M909.1 209.3l-56.4 44.1C775.8 155.1 656.2 92 521.9 92 290 92 102.3 279.5 102 511.5 101.7 743.7 289.8 932 521.9 932c181.3 0 335.8-115 394.6-276.1 1.5-4.2-0.7-8.9-4.9-10.3l-56.7-19.5c-4.1-1.4-8.6 0.7-10.1 4.8-1.8 5-3.8 10-5.9 14.9-17.3 41-42.1 77.8-73.7 109.4-31.6 31.6-68.4 56.4-109.3 73.8-42.3 17.9-87.4 27-133.8 27-46.5 0-91.5-9.1-133.8-27-40.9-17.3-77.7-42.1-109.3-73.8-31.6-31.6-56.4-68.4-73.7-109.4-17.9-42.4-27-87.4-27-133.9s9.1-91.5 27-133.9c17.3-41 42.1-77.8 73.7-109.4 31.6-31.6 68.4-56.4 109.3-73.8 42.3-17.9 87.4-27 133.8-27 46.5 0 91.5 9.1 133.8 27 40.9 17.3 77.7 42.1 109.3 73.8 9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47c-5.3 4.1-3.5 12.5 3 14.1l175.6 43c5 1.2 9.9-2.6 9.9-7.7l0.8-180.9c-0.1-6.6-7.8-10.3-13-6.2z" p-id="8578" fill="#ffffff"></path></svg>`;
const upAndDownIcon = `<svg t="1681024383164" class="icon" viewBox="0 0 1275 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2647" width="26" height="26"><path d="M434.01678069 96.35177165a94.289884 94.289884 0 0 0-133.25765214 0L123.48607034 273.6248307A40.38110706 40.38110706 0 0 0 180.5243836 331.26886006l146.48246438-146.98722794v683.24832532a40.38110706 40.38110706 0 0 0 80.76221328 0V184.28163212L554.25152647 331.26886006c0.60571692 0.70666946 1.31238556 1.31238556 2.01905503 2.01905585a40.38110706 40.38110706 0 0 0 55.01925824-59.15832165zM1151.48809462 650.58246162a40.38110706 40.38110706 0 0 0-57.03831326-2.01905503 19.08007305 19.08007305 0 0 0-2.01905503 2.01905503l-146.28055929 146.38151184V113.71564814a40.38110706 40.38110706 0 0 0-80.76221329 0v683.24832532l-146.38151184-146.38151184a40.38110706 40.38110706 0 0 0-59.15832166 55.01925824l2.01905502 2.01905503 177.37401161 177.27305822a93.98702554 93.98702554 0 0 0 133.15669958 0l177.27305823-177.27305822a40.38110706 40.38110706 0 0 0 1.81714993-57.03831327z" p-id="2648" fill="#ffffff"></path></svg>`;
const leftAndRight = `<svg t="1681024308661" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2241" width="22" height="22"><path d="M356.67458 1012.46055a39.345183 39.345183 0 0 1-55.673434 0L127.783977 839.636832a91.77264 91.77264 0 0 1 0-129.740741l172.725354-172.725354a39.345183 39.345183 0 0 1 57.640694 53.607812c-0.688541 0.688541-1.278718 1.377081-1.96726 1.967259L213.458113 735.47046h665.7205a39.345183 39.345183 0 0 1 0 78.690366H213.458113L356.67458 956.787115a39.345183 39.345183 0 0 1 0 55.673435zM105.357223 250.147625a39.345183 39.345183 0 0 0 39.345183 39.345184h665.720499l-142.626289 142.724652a39.345183 39.345183 0 1 0 53.607812 57.54233l1.96726-1.967259L896.097042 314.772089a91.575914 91.575914 0 0 0 0-129.740742L723.371688 12.502719a39.345183 39.345183 0 1 0-57.542331 53.706175l1.967259 1.967259 142.626289 142.626289H144.702406a39.345183 39.345183 0 0 0-39.345183 39.345183z" p-id="2242" fill="#ffffff"></path></svg>`;
const loadingColor = "#ffffff";
const createTag = ({ tagName, parentTag, style = {} }) => {
  const tag = document.createElement(tagName);
  Object.keys(style).forEach((key) => {
    tag.style[key] = style[key];
  });
  parentTag.appendChild(tag);
  return tag;
};
const styleInnerHTML = ({ zoom_reverse_scale = 1, zoom_scale = 1 }) => {
  return `
  @keyframes zoom {
      0% {
        transform: scale(0);
      }
      100% {
        transform: scale(${zoom_scale});
      }
    }
    @keyframes zoom_reverse {
      0% {
        transform: scale(${zoom_reverse_scale});
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
};
class OptionsExtend {
  constructor(that) {
    this.viewImage = that;
    this._imgStyle = that._img.style;
    this.initOptions();
  }
  updateViewImage(that) {
    this.viewImage = that;
    this._rotate = 0;
    this._scaleY = 1;
    this._scaleX = 1;
    this.setTotal();
    this.setRestore();
    this.setRotate();
    this.setUpAndDown();
    this.setLeftAndRight();
  }
  initOptions() {
    this._optionTag = createTag({
      tagName: "div",
      parentTag: this.viewImage._el,
    });
    this._optionTag.onclick = (e) => {
      e.stopPropagation();
    };
    this._optionTag.className = "view-image-options-extend";
  }
  // 统计
  setTotal() {
    if (!this._totalTag) {
      this._totalTag = createTag({
        tagName: "span",
        parentTag: this.viewImage._el,
      });
      this._totalTag.className = "view-image-options-total";
    }
    this._totalTag.innerText =
      this.viewImage._index + 1 + " / " + this.viewImage._imgs.length;
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
      if (this._scaleY == -1) {
        this._scaleY = 1;
      } else {
        this._scaleY = -1;
      }
    });
  }
  // 左右对调
  setLeftAndRight() {
    this.createTagCommon("_leftAndRight", leftAndRight, "左右对调", () => {
      if (this._scaleX == -1) {
        this._scaleX = 1;
      } else {
        this._scaleX = -1;
      }
    });
  }
  createTagCommon(_tag, icon, title, callback) {
    if (!this[_tag]) {
      this[_tag] = createTag({
        tagName: "span",
        style: {
          display: "flex",
          marginRight: "10px",
        },
        parentTag: this._optionTag,
      });
      this[_tag].innerHTML = icon;
      this[_tag].title = title;
      this[_tag].onclick = (e) => {
        e.stopPropagation();
        this._imgStyle.transition = "transform .3s";
        if (callback) callback();
        this.setTransform();
      };
    }
  }
  // 图片改变
  setTransform() {
    this._imgStyle.transform = `rotate(${this._rotate}deg) scale(${
      this.viewImage._scale || 1
    }) scaleY(${this._scaleY}) scaleX(${this._scaleX})`;
  }
}
class ViewImage {
  constructor(params) {
    const { isClickMask, isAutoSize, pct, watchClose } = params || {
      isClickMask: true,
      //是否开启点击蒙层关闭
      isAutoSize: true,
      //是否开启自动计算图片宽高
      pct: 1,
      watchClose: () => {},
    };
    this._isClickMask = isClickMask;
    this._isAutoSize = isAutoSize;
    this._pct = pct;
    this._watchClose = watchClose;
    this.createTag = createTag;
    this.init();
  }
  init() {
    window.document.onmouseover = () => {
      this.onmouseover();
    };
    this._style = this.createTag({
      tagName: "style",
      parentTag: document.head,
    });
    this._style.innerHTML = styleInnerHTML({});
    this._el = this.createTag({
      tagName: "div",
      parentTag: document.body,
      style: {
        display: "none",
      },
    });
    this._el.className = "yik-view-image";
    this._el.onclick = (e) => {
      e.stopPropagation();
      if (this._isClickMask) {
        this.close();
      } else {
        this.onmouseover();
      }
    };
    this._msg = this.createTag({
      tagName: "span",
      parentTag: this._el,
      style: {
        display: "none",
      },
    });
    this._msg.className = "yik-view-image_msg";
    const close = this.createTag({
      tagName: "span",
      parentTag: this._el,
      style: {
        display: "inline-block",
      },
    });
    close.innerHTML = closeIcon;
    close.className = "yik-view-image_close";
    close.onclick = () => {
      this.close();
    };
    this._left = this.createTag({
      tagName: "span",
      parentTag: this._el,
      style: {
        display: "none",
      },
    });
    this._left.className = "yik-view-image_left";
    this._left.innerHTML = leftIcon;
    this._left.onclick = (e) => {
      e.stopPropagation();
      if (this._index - 1 >= 0) {
        this._index--;
        this.setSrc();
      } else {
        this._index = this._imgs.length - 1;
        this.setSrc();
      }
    };
    this._right = this.createTag({
      tagName: "span",
      parentTag: this._el,
      style: {
        display: "none",
      },
    });
    this._right.className = "yik-view-image_right";
    this._right.innerHTML = rightIcon;
    this._right.onclick = (e) => {
      e.stopPropagation();
      if (this._index + 1 < this._imgs.length) {
        this._index++;
        this.setSrc();
      } else {
        this._index = 0;
        this.setSrc();
      }
    };
    this._img = this.createTag({
      tagName: "img",
      parentTag: this._el,
    });
    this._img.onclick = (e) => {
      e.stopPropagation();
    };
    this._img.onmousewheel = (e) => {
      e.preventDefault();
      if (!this._scale) this._scale = 1;
      this._img.style.transition = "";
      if (e.deltaY > 0 && this._scale > 0.1) {
        this._scale -= 8e-3;
      }
      if (e.deltaY < 0) {
        this._scale += 8e-3;
      }
      this.showMsg((this._scale * 100).toFixed(0) + "%", false);
      this._options.setTransform();
    };
    this._img.className = "yik-view-image_img";
    this._drag = new Drag({
      el: this._img,
      isBound: false,
    });
    this._options = new OptionsExtend(this);
  }
  //消息提示
  showMsg(msg, isAnimation = true) {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
    this._msg.style.display = "inline-block";
    if (isAnimation) {
      this._msg.style.animation = "shake 0.1s linear 5";
      setTimeout(() => {
        this._msg.style.animation = "";
      }, 500);
    }
    this._msg.innerText = msg;
    this._timeout = setTimeout(() => {
      this._msg.style.display = "none";
    }, 3e3);
  }
  // 设置图片，数组
  setImg(imgs, index2 = 0) {
    this._index = index2;
    if (imgs instanceof Array) {
      this._imgs = imgs;
    } else if (imgs instanceof String) {
      this._imgs = [imgs];
    }
    this._el.style.display = "flex";
    this._el.style.animation = "opacity 0.5s linear";
    this.setSrc();
  }
  // 把url给img标签
  setSrc() {
    {
      this._scale = this._pct;
      this._options._scaleY = 1;
      this._options._scaleX = 1;
      this._options._rotate = 0;
      this._options.setTransform();
    }
    if (this._timeoutMove) clearTimeout(this._timeoutMove);
    if (this._image) this._image = null;
    {
      this._image = new Image();
      this._image.src = this._imgs[this._index];
      this._img.style.opacity = "0";
      this.showLoading();
    }
    this._image.onload = (e) => {
      this.hideLoading();
      {
        var width = this._image.width;
        var height = this._image.height;
      }
      this._img.style.left = "";
      this._img.style.top = "";
      this._img.src = this._imgs[this._index];
      this._img.style.width = width + "px";
      this._img.style.height = height + "px";
      if (this._isAutoSize) {
        if (window.innerWidth < width) {
          const scale = width / window.innerWidth;
          console.log(width - window.innerWidth);
          this._scale = scale / 8;
          this._img.style.transform = `scale(${this._scale})`;
        } else {
          if (window.innerHeight < height) {
            const scale = height / window.innerHeight;
            this._scale = scale / 8;
            this._img.style.transform = `scale(${this._scale})`;
          }
        }
      } else {
        this._img.style.transform = `scale(${this._scale})`;
      }
      this._style.innerHTML = styleInnerHTML({
        zoom_scale: this._scale,
      });
      this._img.style.animation = "zoom 0.5s";
      this._img.style.opacity = "1";
      setTimeout(() => {
        this._img.style.animation = "";
      }, 400);
      this._options.updateViewImage(this);
    };
    this._image.onerror = (e) => {
      this.hideLoading();
      this.showMsg("加载失败！");
    };
  }
  // 关闭
  close() {
    this._style.innerHTML = styleInnerHTML({
      zoom_reverse_scale: this._scale,
    });
    this._msg.style.display = "none";
    this._img.style.animation = "zoom_reverse 0.5s";
    this._el.style.animation = "opacity_reverse 0.5s linear";
    setTimeout(() => {
      this._el.style.display = "none";
      this._img.style.animation = "";
      this._watchClose();
    }, 400);
  }
  // 显示加载动效
  showLoading() {
    if (!this._loading) {
      this._loading = this.createTag({
        tagName: "span",
        parentTag: this._el,
        style: {
          display: "inline-block",
          position: "fixed",
          top: "50%",
          left: "50%",
          width: "50px",
          height: "50px",
          ["border-top"]: "2px solid" + loadingColor,
          ["border-left"]: "2px solid" + loadingColor,
          ["border-bottom"]: "2px solid" + loadingColor,
          ["border-right"]: "2px solid rgba(0,0,0,0)",
          ["border-radius"]: "50%",
          animation: "rotate 0.5s linear infinite",
          transform: " translate(-50%,-50%)",
        },
      });
    } else {
      this._loading.style.display = "inline-block";
    }
  }
  // 隐藏加载动效
  hideLoading() {
    this._loading.style.display = "none";
  }
  // 悬浮形式左右切换按钮
  onmouseover() {
    if (this._timeoutMove) clearTimeout(this._timeoutMove);
    this._left.style.display = "flex";
    this._right.style.display = "flex";
    this._left.style.animation = "move 0.5s";
    this._right.style.animation = "move_reverse 0.5s";
    this._timeoutMove = setTimeout(() => {
      this._left.style.animation = "opacity_reverse 0.5s";
      this._right.style.animation = "opacity_reverse 0.5s";
      this._timeoutMove = setTimeout(() => {
        this._left.style.display = "none";
        this._right.style.display = "none";
      }, 400);
    }, 3e3);
  }
}
const _sfc_main$1 = {
  __name: "index",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    isClickMask: {
      type: Boolean,
      default: true,
    },
    isAutoSize: {
      type: Boolean,
      default: true,
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
  setup(__props, { emit: emit2 }) {
    const props2 = __props;
    let viewImage = null;
    watch(
      () => props2.show,
      (val) => {
        if (val)
          nextTick(() => {
            viewImage = new ViewImage({
              isClickMask: props2.isClickMask,
              isAutoSize: props2.isAutoSize,
              pct: props2.pct / 100,
              watchClose: () => {
                emit2("update:show");
                emit2("closed");
                if (viewImage._el) viewImage._el.remove();
                viewImage = null;
              },
            });
            viewImage.setImg(props2.imgs, props2.index);
          });
      },
      {
        immediate: true,
      }
    );
    onBeforeUnmount(() => {
      viewImage = null;
    });
    return () => {};
  },
};
const _sfc_main = {
  setup(props, { slots, attrs, emit }) {
    ref(0);
    let str = attrs.strHtml;
    const html = document.createElement("div");
    html.innerHTML = str;
    let array = [],
      text = "";
    const strToObj_style = (dom, style) => {
      if (dom.getAttribute) {
        if (dom.getAttribute("style")) {
          const array2 = dom.getAttribute("style").split(";");
          array2.forEach((item) => {
            const styleArray = item.split(":");
            style[styleArray[0]] = styleArray[1];
          });
        }
      }
    };
    const strToObj_class = (dom, classArray) => {
      if (dom.getAttribute) {
        if (dom.getAttribute("class")) {
          dom
            .getAttribute("class")
            .split(" ")
            .forEach((item) => {
              classArray.push(item);
            });
        }
      }
    };
    const strToObj_attr = (dom, attrs2) => {
      let attrsRule = ["id", "title", "src", "href"];
      if (dom.getAttribute) {
        attrsRule.forEach((rule, index2) => {
          if (dom.getAttribute(rule)) {
            attrs2[attrsRule[index2]] = dom.getAttribute(rule);
          }
        });
      }
    };
    const recurveHtml = (element, array2) => {
      element.forEach((dom) => {
        const h_array = [];
        let style = {};
        let attrs2 = {};
        let classArray = [];
        let text2 = "";
        let nodeName = "";
        if (dom.nodeName == "#text") {
          nodeName = "text";
          text2 = dom.data;
        } else {
          nodeName = dom.nodeName;
        }
        strToObj_style(dom, style);
        strToObj_class(dom, classArray);
        strToObj_attr(dom, attrs2);
        array2.push({
          h: {
            start:
              'h("' +
              nodeName +
              '", {style:' +
              JSON.stringify(style) +
              ",class: " +
              JSON.stringify(classArray) +
              "},[",
            h_array: text2 ? text2 : h_array,
            end: "])",
          },
        });
        if (dom.childNodes) recurveHtml(dom.childNodes, h_array);
      });
    };
    recurveHtml(html.childNodes, array);
    const recurveVNode = (list) => {
      let str2 = "";
      list.forEach((item, index2) => {
        let str_temp = "";
        if (Array.isArray(item.h.h_array)) {
          str_temp = recurveVNode(item.h.h_array);
        } else {
          str_temp = item.h.h_array;
        }
        str2 +=
          item.h.start +
          str_temp +
          item.h.end +
          `${list.length - 1 == index2 ? "" : ","}`;
      });
      return str2;
    };
    text = recurveVNode(array);
    return () => eval(`[${text}]`);
  },
};
let components = [
  {
    name: "YikScroll",
    component: _sfc_main$6,
  },
  {
    name: "YikMaxView",
    component: _sfc_main$5,
  },
  {
    name: "YikSign",
    component: _sfc_main$4,
  },
  {
    name: "YikIsKeyboard",
    component: _sfc_main$3,
  },
  {
    name: "YikMarquee",
    component: _sfc_main$2,
  },
  {
    name: "YikViewImage",
    component: _sfc_main$1,
  },
  {
    name: "YikSupporterStrHtml",
    component: _sfc_main,
  },
];
let directives = [
  {
    name: "YikPower",
    directive: YikPower,
  },
  {
    name: "YikLazy",
    directive: YikLazy,
  },
];
const install = (app) => {
  try {
    components.forEach((item) => {
      app.component(item.name, item.component);
    });
    directives.forEach((item) => {
      app.directive(item.name, item.directive);
    });
    yikLog("YikUi 指令和组件，已全局注册.");
  } catch (e) {
    yikLog("YikUi 指令和组件，全局注册失败.", "error");
  }
};
const index = {
  install,
  YikScroll: _sfc_main$6,
  YikMaxView: _sfc_main$5,
  YikSign: _sfc_main$4,
  YikMarquee: _sfc_main$2,
  YikIsKeyboard: _sfc_main$3,
  YikViewImage: _sfc_main$1,
  YikSupporterStrHtml: _sfc_main,
};
export { index as default };
